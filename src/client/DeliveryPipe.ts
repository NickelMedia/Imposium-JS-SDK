import API from './http/API';
import MessageConsumer, {IEmitData} from './tcp/MessageConsumer';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';
import {SocketError, HTTPError, ModerationError} from '../scaffolding/Exceptions';
import {AxiosError} from 'axios';

export type VoidDelegate = (...args) => void;
export type DelegateMap = Map<string, VoidDelegate>;

export interface IDeliveryPipeConfig {
    api: API;
    clientDelegates: DelegateMap;
    storyId: string;
    environment: string;
}

export interface ICreateConfig {
    storyId: string;
    inventory: any;
    render: boolean;
    uuid: string;
    uploadProgress: (n: number) => any;
}

export default class DeliveryPipe {
    private static readonly POLL_INTERVAL: number = 1000;
    private static readonly WS_MODE: string = 'ws';
    private static readonly POLL_MODE: string = 'poll';

    private mode: string = DeliveryPipe.WS_MODE;
    private storyId: string = '';
    private environment: string = '';
    private shortPollTimeout: number = -1;
    private api: API = null;
    private consumer: MessageConsumer = null;
    private clientDelegates: DelegateMap = null;
    private configCache: Map<string, ICreateConfig> = new Map();

    constructor(c: IDeliveryPipeConfig) {
        this.api = c.api;
        this.clientDelegates = c.clientDelegates;
        this.storyId = c.storyId;
        this.environment = c.environment;
    }

    /*
        Used to override the default WS mode if required
     */
    public setMode = (mode: string): void => { this.mode = mode; }

    /*
        Fetch an Experience from the Imposium API, kill poll on finished render if in poll mode
     */
    public doGetExperience = (experienceId: string): void => {
        this.api.getExperience(experienceId)
        .then((exp: IExperience) => {
            const {output, rendering} = exp;
            const hasOutput = (Object.keys(output).length > 0);

            if (hasOutput && !rendering) {
                clearTimeout(this.shortPollTimeout);
                this.clientDelegates.get('gotExperience')(exp);
            }

            if (!hasOutput && !rendering) {
                this.startRender(experienceId);
            }

            if (!hasOutput && rendering) {
                this.consumeOnRefresh(experienceId);
            }
        })
        .catch((e: AxiosError) => {
            const httpError = new HTTPError('httpFailure', experienceId, e);
            this.clientDelegates.get('internalError')(httpError)
        });
    }

    /*
        Run config for create call through delivery gateways
     */
    public createPrestep = (inventory: any, render: boolean, uploadProgress: (n: number) => any): void => {
        const {storyId} = this;
        const uuid: string = generateUUID();
        const config: ICreateConfig = {storyId, inventory, render, uuid, uploadProgress};

        clearTimeout(this.shortPollTimeout);

        if (!render) {
            this.doCreate(config);
        }

        if (render && this.mode === DeliveryPipe.POLL_MODE) {
            this.doCreate(config, true);
        }

        if (render && this.mode === DeliveryPipe.WS_MODE) {
            // Cache inventory temporarily incase socket connection fails
            this.configCache.set(uuid, config);

            this.startConsumer(uuid)
            .then(() => { this.doCreate(config); });
        }
    }

    /*
        Render once a resource is explicitly requested
     */
    private startRender = (experienceId: string): void => {
        if (this.mode === DeliveryPipe.WS_MODE) {
            this.startConsumer(experienceId)
            .then(() => {
                this.api.invokeStream(experienceId)
                .catch((e: AxiosError) => {
                    const httpError = new HTTPError('httpFailure', experienceId, e);

                    this.killConsumer();
                    this.clientDelegates.get('internalError')(httpError);
                });
            });
        } else {
            this.api.invokeStream(experienceId)
            .then(() => {
                this.doGetExperience(experienceId);
            })
            .catch((e: AxiosError) => {
                const httpError = new HTTPError('httpFailure', experienceId, e);
                this.clientDelegates.get('internalError')(httpError);
            });
        }
    }

    /*
        Start a consumer or short poll if an experience is requested mid-render
     */
    private consumeOnRefresh = (experienceId: string): void => {
        if (this.mode === DeliveryPipe.WS_MODE) {
            this.startConsumer(experienceId);
        } else {
            this.shortPollTimeout = <any>setTimeout(
                () => this.doGetExperience(experienceId),
                DeliveryPipe.POLL_INTERVAL
            );
        }
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
     */
    private doCreate = (config: ICreateConfig, startShortPoll: boolean = false, retryOnCollision: number = 0): void => {
        const {storyId, inventory, render, uuid, uploadProgress} = config;

        this.api.postExperience(storyId, inventory, render, uuid, uploadProgress)
        .then((e: IExperience) => {
            if (startShortPoll) {
                this.doGetExperience(e.id);
            }

            this.clientDelegates.get('experienceCreated')(e, render);
        })
        .catch((e: AxiosError) => {
            if (~e.message.indexOf('400') && retryOnCollision < 3) {
                retryOnCollision = retryOnCollision + 1;
                this.doCreate(config, startShortPoll, retryOnCollision);
            } else {
                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);
            }
        });
    }

    /*
        Defers client handlers to STOMP consumer for delivering message & experience
        data. An additional delegate is appended to handle total socket failures.
        At that point short polling will begin as a fallback to a WS.
     */
    private startConsumer = (experienceId: string): Promise<void> => {
        const {clientDelegates: cD, environment} = this;

        const deliveryDelegates: Map<string, VoidDelegate> = new Map();
        deliveryDelegates.set('gotExperience', (e: IExperience) => cD.get('gotExperience')(e));
        deliveryDelegates.set('gotMessage', (m: IEmitData) => cD.get('gotMessage')(m));
        deliveryDelegates.set('internalError', (e: SocketError | ModerationError) => cD.get('internalError')(e));
        deliveryDelegates.set('consumerFailure', (expId: string, e: SocketError) => this.consumerFailure(expId, e));

        return new Promise((resolve) => {
            this.killConsumer()
            .then(() => {
                this.consumer = new MessageConsumer({
                    experienceId,
                    environment,
                    deliveryDelegates
                });

                this.consumer.connect().then(() => { resolve(); });
            });
        });
    }

    /*
        Force STOMP handshake / WS connection
     */
    private killConsumer = (): Promise<void> => {
        return new Promise((resolve) => {
            if (!this.consumer) resolve();

            this.consumer.kill()
            .then(() => {
                this.consumer = null;
                resolve();
            });
        });
    }

    /*
        Special handler for total socket failures, falls back do doing a short poll.
        This can happen with aggressive firewalls / proxy servers.
     */
    private consumerFailure = (experienceId: string, e: SocketError): void => {
        const cachedConfig: ICreateConfig = this.configCache.get(experienceId);

        this.setMode(DeliveryPipe.POLL_MODE);
        this.clientDelegates.get('internalError')(e);

        if (typeof cachedConfig !== 'undefined') {
            this.configCache.delete(experienceId);
            this.doCreate(cachedConfig, true);
        } else {
            this.doGetExperience(experienceId);
        }
    }
}

import API from './http/API';
import MessageConsumer, {IEmitData} from './stomp/Consumer';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';
import {SocketError, HTTPError, ModerationError} from '../scaffolding/Exceptions';
import {AxiosError} from 'axios';

export type VoidDelegate = (...args) => void;
export type DelegateMap = Map<string, VoidDelegate>;

export interface IDeliveryPipeConfig {
    api: API;
    clientDelegates: DelegateMap;
    environment: string;
}

export interface ICreateConfig {
    inventory: any;
    render: boolean;
    uuid: string;
    uploadProgress: (n: number) => any;
}

export default class DeliveryPipe {
    private static readonly WS_MODE: string = 'ws';
    private static readonly POLL_MODE: string = 'poll';

    private mode: string = '';
    private environment: string = '';
    private shortPollTimeout: number = -1;
    private pollInterval: number = 5000;
    private api: API = null;
    private consumer: MessageConsumer = null;
    private clientDelegates: DelegateMap = null;
    private configCache: Map<string, ICreateConfig> = new Map();

    constructor(c: IDeliveryPipeConfig) {
        this.api = c.api;
        this.clientDelegates = c.clientDelegates;
        this.environment = c.environment;
    }

    /*
        Used to override the default WS mode if required
     */
    public setMode = (mode: string): void => {
        this.mode = mode;
    }

    /*
        Set poll interval time in seconds
     */
    public setTimeoutInterval = (interval: number): void => {
        this.pollInterval = interval;
    }

    /*
        Fetch an Experience from the Imposium API, kill poll on finished render if in poll mode
     */
    public doGetExperience = (experienceId: string): void => {
        this.api.get(experienceId)
        .then((exp: IExperience) => {
            const {output, rendering} = exp;
            const hasOutput = (typeof output !== 'undefined' && Object.keys(output).length > 0);

            // Rendered resource was requested
            if (hasOutput) {
                clearTimeout(this.shortPollTimeout);
                this.clientDelegates.get('gotExperience')(exp);
            }

            // Resource where rendering is deferred was first requested
            if (!hasOutput && !rendering) {
                this.startRender(experienceId);
            }

            // Resource was requested during render job
            if (!hasOutput && rendering) {
                this.consumeOnRefresh(experienceId);
            }
        })
        .catch((e: AxiosError) => {
            const httpError = new HTTPError('httpFailure', experienceId, e);
            this.clientDelegates.get('internalError')(httpError);
        });
    }

    /*
        Run config for create call through delivery gateways
     */
    public createPrestep = (
        inventory: any,
        render: boolean,
        uploadProgress: (n: number) => any,
        retryOnCollision: number = 0
    ): void => {
        const uuid: string = generateUUID();
        const config: ICreateConfig = {inventory, render, uuid, uploadProgress};

        clearTimeout(this.shortPollTimeout);

        if (!render) {
            this.doCreate(config, false, retryOnCollision);
        }

        if (render && this.mode === DeliveryPipe.POLL_MODE) {
            this.doCreate(config, true, retryOnCollision);
        }

        if (render && this.mode === DeliveryPipe.WS_MODE) {
            // Cache inventory temporarily incase socket connection fails
            this.configCache.set(uuid, config);

            this.startConsumer(uuid)
            .then(() => this.doCreate(config, false, retryOnCollision));
        }
    }

    /*
        Render once a resource is explicitly requested
     */
    private startRender = (experienceId: string): void => {
        if (this.mode === DeliveryPipe.WS_MODE) {
            this.startConsumer(experienceId)
            .then(() => {
                this.api.triggerRender(experienceId)
                .catch((e: AxiosError) => {
                    const httpError = new HTTPError('httpFailure', experienceId, e);

                    this.killConsumer();
                    this.clientDelegates.get('internalError')(httpError);
                });
            });
        } else {
            this.api.triggerRender(experienceId)
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
            clearTimeout(this.shortPollTimeout);

            this.shortPollTimeout = window.setTimeout(
                () => this.doGetExperience(experienceId),
                this.pollInterval
            );
        }
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
     */
    private doCreate = (config: ICreateConfig, startShortPoll: boolean = false, retried: number): void => {
        const {inventory, render, uuid, uploadProgress} = config;

        this.api.create(inventory, render, uuid, uploadProgress)
        .then((e: IExperience) => {
            this.configCache.delete(uuid);

            if (startShortPoll) {
                this.doGetExperience(e.id);
            }

            this.clientDelegates.get('experienceCreated')(e);
        })
        .catch((e: AxiosError) => {
            if (e.response && e.response.status === 400 && retried < 3) {
                this.configCache.delete(uuid);
                retried = retried + 1;

                this.killConsumer()
                .then(() => {
                    this.createPrestep(
                        config.inventory,
                        config.render,
                        config.uploadProgress,
                        retried
                    );
                });
            } else {
                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);
                this.killConsumer();
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

                this.consumer.connect()
                .then(() => {
                    resolve();
                });
            });
        });
    }

    /*
        Force STOMP handshake / WS connection
     */
    private killConsumer = (): Promise<void> => {
        return new Promise((resolve) => {
            if (!this.consumer) {
                return resolve();
            } else {
                this.consumer.destroy()
                .then(() => {
                    this.consumer = null;
                    return resolve();
                });
            }
        });
    }

    /*
        Special handler for total socket failures, falls back do doing a short poll.
        This can happen with aggressive firewalls / proxy servers.
     */
    private consumerFailure = (experienceId: string, e: SocketError): void => {
        const cachedConfig: ICreateConfig = this.configCache.get(experienceId);

        this.setMode(DeliveryPipe.POLL_MODE);

        if (e.wasConnected) {
            this.clientDelegates.get('internalError')(e);
        }

        if (typeof cachedConfig !== 'undefined') {
            this.configCache.delete(experienceId);
            this.createPrestep(cachedConfig.inventory, cachedConfig.render, cachedConfig.uploadProgress);
        } else {
            this.doGetExperience(experienceId);
        }
    }
}

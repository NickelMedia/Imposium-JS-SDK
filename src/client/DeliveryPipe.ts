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

export default class DeliveryPipe {
    private mode: string = 'ws';
    private storyId: string = '';
    private environment: string = '';
    private api: API = null;
    private consumer: MessageConsumer = null;
    private clientDelegates: DelegateMap = null;

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
        Fetch an Experience from the Imposium API, kill poll on success
     */
    public getExperience = (experienceId: string): void => {
        this.api.getExperience(experienceId)
        .then((exp: IExperience) => {
            // TO DO: Cancel poll timeout
            this.clientDelegates.get('gotExperience')(exp);
        })
        .catch((e: AxiosError) => {
            const httpError = new HTTPError('httpFailure', experienceId, e);
            this.clientDelegates.get('internalError')(httpError)
        });
    }

    /*
        Render once a resource is explicitly requested
     */
    public startRender = (experienceId: string): void => {
        if (this.mode === 'ws') {
            this.startConsumer(experienceId)
            .then(() => {
                this.api.invokeStream(experienceId)
                .catch((e: AxiosError) => {
                    const httpError = new HTTPError('httpFailure', experienceId, e);
                    this.clientDelegates.get('internalError')(httpError);
                });
            });
        } else {
            this.doShortPoll(experienceId);
        }
    }

    /*
        Run config for create call through delivery gateways
     */
    public createPrestep = (inventory: any, render: boolean, uploadProgress: (n: number) => any): void => {
        const {storyId} = this;
        const uuid: string = generateUUID();

        const config: any = {
            storyId,
            inventory,
            render,
            uuid,
            uploadProgress
        };

        if (!render) {
            this.doCreate(config);
        }

        if (render && this.mode === 'poll') {
            this.doCreate(config, true);
        }

        if (render && this.mode === 'ws') {
            this.startConsumer(uuid)
            .then(() => { this.doCreate(config); });
        }
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
     */
    private doCreate = (config: any, runPoll: boolean = false, retryOnCollision: number = 0): void => {
        const {storyId, inventory, render, uuid, uploadProgress} = config;

        this.api.postExperience(storyId, inventory, render, uuid, uploadProgress)
        .then((e: IExperience) => {
            if (runPoll) {
                this.doShortPoll(e.id);
            }

            this.clientDelegates.get('experienceCreated')(e, render);
        })
        .catch((e: AxiosError) => {
            if (~e.message.indexOf('400') && retryOnCollision < 3) {
                retryOnCollision = retryOnCollision + 1;
                this.doCreate(config, runPoll, retryOnCollision);
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
        deliveryDelegates.set('consumerFailure', (e: SocketError) => this.consumerFailure(e));

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

    private consumerFailure = (e: SocketError): void => {
        // TO DO: switch over to poll mode
    }

    private doShortPoll = (experienceId: string): Promise<void> => {
        // TO DO: implementation
        return Promise.resolve();
    }
}
import API from './http/API';
import MessageConsumer, {IEmitData} from './stomp/Consumer';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';
import {SocketError, HTTPError, ModerationError} from '../scaffolding/Exceptions';
import {AxiosError, AxiosResponse} from 'axios';

export type VoidDelegate = (...args) => void;
export type DelegateMap = Map<string, VoidDelegate>;

export interface IDirectDeliveryPipeConfig {
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

export interface IFetchConfig {
    inventory: any;
    uuid: string;
    uploadProgress: (n: number) => any;
}

export default class DirectDeliveryPipe {

    private pollInterval: number = 1000;
    private api: API = null;
    private clientDelegates: DelegateMap = null;
    private configCache: Map<string, ICreateConfig> = new Map();

    constructor(c: IDirectDeliveryPipeConfig) {
        this.api = c.api;
        this.clientDelegates = c.clientDelegates;
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
                this.clientDelegates.get('gotExperience')(exp);
            }

            // // Resource where rendering is deferred was first requested
            // if (!hasOutput && !rendering) {
            //     this.startRender(experienceId);
            // }

            // // Resource was requested during render job
            // if (!hasOutput && rendering) {
            //     this.consumeOnRefresh(experienceId);
            // }
        })
        .catch((e: AxiosError) => {
            const httpError = new HTTPError('httpFailure', experienceId, e);
            this.clientDelegates.get('internalError')(httpError);
        });
    }

    /*
        Run config for create call through delivery gateways
     */
    // public createPrestep = (
    //     inventory: any,
    //     render: boolean,
    //     uploadProgress: (n: number) => any,
    //     retryOnCollision: number = 0
    // ): void => {
    //     const uuid: string = generateUUID();
    //     const config: ICreateConfig = {inventory, render, uuid, uploadProgress};

    //     clearTimeout(this.shortPollTimeout);

    //     if (!render) {
    //         this.doCreate(config, false, retryOnCollision);
    //     }

    //     if (render && this.mode === DirectDeliveryPipe.POLL_MODE) {
    //         this.doCreate(config, true, retryOnCollision);
    //     }

    //     if (render && this.mode === DirectDeliveryPipe.WS_MODE) {
    //         // Cache inventory temporarily incase socket connection fails
    //         this.configCache.set(uuid, config);

    //         this.startConsumer(uuid)
    //         .then(() => this.doCreate(config, false, retryOnCollision));
    //     }
    // }

     /*
        Run config for create call through delivery gateways
     */
    public renderFetchExperience = (
        inventory: any,
        uploadProgress: (n: number) => any,
    ): void => {
        const uuid: string = generateUUID();
        const config: IFetchConfig = {inventory, uuid, uploadProgress};

        this.doFetch(config);
    }

    /*
        Start a consumer or short poll if an experience is requested mid-render
     */
    // private consumeOnRefresh = (experienceId: string): void => {
    //     if (this.mode === DirectDeliveryPipe.WS_MODE) {
    //         this.startConsumer(experienceId);
    //     } else {
    //         clearTimeout(this.shortPollTimeout);

    //         this.shortPollTimeout = window.setTimeout(
    //             () => this.doGetExperience(experienceId),
    //             this.pollInterval
    //         );
    //     }
    // }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
    */
    private doFetch = (config: IFetchConfig, retries:number = 0): void => {

        const {inventory, uuid, uploadProgress} = config;

        this.api.fetch(inventory, uuid, uploadProgress)

        .then((e: IExperience) => {
            this.configCache.delete(uuid);
            this.clientDelegates.get('gotExperience')(e);

            console.log("SUCCESS");
            console.log(e);
        })
        .catch((e: AxiosError) => {

            console.log("ERROR");
            console.log(e.response);

            //render took longer than a minute, revert to polling
            if (e.response && e.response.status === 408) {

                this.pollForExperience(uuid, (experience)=>{

                    this.clientDelegates.get('gotExperience')(experience);

                }, (e)=>{

                    console.log("error getting experience");
                    console.log(e);
                });

            //error on the fetch endpoint, retry up to 3 times
            }else if(retries < 3){

                retries = retries + 1;
                this.doFetch(config, retries);

            }else{
                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);
            }
        });
    }

    private pollForExperience(id, resolve, reject) {

        this.api.get(id)
        .then((res) => {

            //if it's not rendering anymore, it's done
            if(!res.rendering){
                resolve(res);
            }else{
                setTimeout(() => {
                    this.pollForExperience(id, resolve, reject);
                }, this.pollInterval);
            }
        })
        .catch((e : AxiosError) => {
            reject(e);
        });
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
     */
    // private doCreate = (config: ICreateConfig, startShortPoll: boolean = false, retried: number): void => {
    //     const {inventory, render, uuid, uploadProgress} = config;

    //     this.api.create(inventory, render, uuid, uploadProgress)
    //     .then((e: IExperience) => {
    //         this.configCache.delete(uuid);

    //         if (startShortPoll) {
    //             this.doGetExperience(e.id);
    //         }

    //         this.clientDelegates.get('experienceCreated')(e);
    //     })
    //     .catch((e: AxiosError) => {
    //         if (e.response && e.response.status === 400 && retried < 3) {
    //             this.configCache.delete(uuid);
    //             retried = retried + 1;
    //             this.createPrestep(
    //                 config.inventory,
    //                 config.render,
    //                 config.uploadProgress,
    //                 retried);
    //         } else {
    //             const httpError = new HTTPError('httpFailure', uuid, e);
    //             this.clientDelegates.get('internalError')(httpError);
    //         }
    //     });
    // }
}

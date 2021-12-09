import API from './http/API';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';
import {HTTPError, RenderError} from '../scaffolding/Exceptions';
import {AxiosError} from 'axios';

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

const MAX_RETRIES : number = 3;
const KILL_POLL_AFTER : number = 180000;
const POLL_INTERVAL : number = 5000;

export default class DirectDeliveryPipe {

    private pollTimeout: any;
    private killPollTimeout:any;
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
    public getExperience = (experienceId: string): void => {

        clearTimeout(this.killPollTimeout);
        this.killPollTimeout = setTimeout(()=>this.killPoll(experienceId), KILL_POLL_AFTER);
        this.pollForExperience(experienceId, (experience)=>{

            this.clientDelegates.get('gotExperience')(experience);

        }, (e)=>{
            const httpError = new HTTPError('httpFailure', experienceId, e);
            this.clientDelegates.get('internalError')(httpError);
        });
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
    */
    public fetchExperience = (
        inventory: any,
        uploadProgress: (n: number) => any,
        retries : number = 1
    ): void => {

        const uuid: string = generateUUID();

        this.api.fetch(inventory, uuid, uploadProgress)

        .then((res: IExperience) => {

            if(res.error){
                const httpError = new RenderError(res.error, uuid);
                this.clientDelegates.get('internalError')(httpError);
            }else{
                this.configCache.delete(uuid);
                this.clientDelegates.get('gotExperience')(res);
            }
        })
        .catch((e: AxiosError) => {

            //error during the render, return a render error
            if(e?.response?.data?.error){
                const httpError = new RenderError(e.response.data.error, uuid);
                this.clientDelegates.get('internalError')(httpError);      
            
            //render took longer than a minute, revert to polling
            } else if (e.response && e.response.status === 408) {

                //enter polling GET flow
                this.getExperience(uuid);

            //retry render if < max retries and the status is a 5xx
            }else if(e.response && e.response.status >= 500 && retries < MAX_RETRIES){

                retries = retries + 1;
                this.fetchExperience(inventory, uploadProgress, retries);

            }else{
                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);
            }
        });
    }

    /*
        POST data to Imposium server, create experience record, defer and or poll on success
    */
    public createExperience = (
        inventory: any,
        render : boolean,
        uploadProgress: (n: number) => any,
        retries : number = 0
    ): void => {

        const uuid: string = generateUUID();

        this.api.create(inventory, render, uuid, uploadProgress)

        .then((e: IExperience) => {
            this.configCache.delete(uuid);
            this.clientDelegates.get('gotExperience')(e);
        })
        .catch((e: AxiosError) => {
            
            //retry render if < max retries amd the status is 5xx
            if(e.response && e.response.status >= 500 && retries < MAX_RETRIES){

                retries = retries + 1;
                this.createExperience(inventory, render, uploadProgress, retries);

            }else{
                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);
            }
        });
    }
    
    /*
        Kill the GET /experience/{id} polling
    */
    private killPoll(experienceId : string){

        clearTimeout(this.pollTimeout);

        const httpError = new HTTPError('pollTimeout', experienceId);
        this.clientDelegates.get('internalError')(httpError);
    }

    /*
        Poll on the GET /experience/{id} endpoint until the render is complete, or we time out
    */
    private pollForExperience(id, resolve, reject, retries:number = 1) {

        this.api.get(id)
        .then((res) => {

            //if it's not rendering anymore, it's done
            if(!res.rendering){
                clearTimeout(this.pollTimeout);

                if(res.error){
                    const httpError = new RenderError(res.error, id);
                    this.clientDelegates.get('internalError')(httpError);
                }else{
                    resolve(res);
                }
            }else{
                clearTimeout(this.pollTimeout);
                this.pollTimeout = setTimeout(() => {
                    this.pollForExperience(id, resolve, reject, retries);
                }, POLL_INTERVAL);
            }
        })
        .catch((e : AxiosError) => {

            clearTimeout(this.pollTimeout);
            //if there is an error getting the experience, try again if < max retries
            if(e.response && e.response.status >= 500 && retries < MAX_RETRIES){
                retries = retries +1;
                this.pollForExperience(id, resolve, reject, retries);

            //else throw an error
            }else{
                reject(e);
            }
        });
    }
}

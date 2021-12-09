import API from './http/API';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';
import {HTTPError} from '../scaffolding/Exceptions';
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

const MAX_RETRIES : number = 4;
const KILL_POLL_AFTER : number = 300000;
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
        this.killPollTimeout = setTimeout(()=>this.killPoll(), KILL_POLL_AFTER);
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
        retries : number = 0
    ): void => {

        const uuid: string = generateUUID();

        this.api.fetch(inventory, uuid, uploadProgress)

        .then((e: IExperience) => {
            this.configCache.delete(uuid);
            this.clientDelegates.get('gotExperience')(e);
        })
        .catch((e: AxiosError) => {
            
            //render took longer than a minute, revert to polling
            if (e.response && e.response.status === 408) {

                //enter polling GET flow
                this.getExperience(uuid);

            //402 error (usage limit hit), throw an error without retrying
            }else if(e.response && e.response.status === 402){

                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);

            //retry render if < max retries
            }else if(retries < MAX_RETRIES){

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
            
            //402 error (usage limit hit), throw an error without retrying
            if(e.response && e.response.status === 402){

                const httpError = new HTTPError('httpFailure', uuid, e);
                this.clientDelegates.get('internalError')(httpError);

            //retry render if < max retries
            }else if(retries < MAX_RETRIES){

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
    private killPoll(){

        clearTimeout(this.pollTimeout);

        //TODO: throw an error through the error pipe
        // const httpError = new HTTPError('httpFailure', uuid, e);
        // this.clientDelegates.get('internalError')(httpError);
    }

    /*
        Poll on the GET /experience/{id} endpoint until the render is complete, or we time out
    */
    private pollForExperience(id, resolve, reject, retries:number = 0) {

        this.api.get(id)
        .then((res) => {

            //if it's not rendering anymore, it's done
            if(!res.rendering){
                resolve(res);
            }else{
                this.pollTimeout = setTimeout(() => {
                    this.pollForExperience(id, resolve, reject, retries);
                }, POLL_INTERVAL);
            }
        })
        .catch((e : AxiosError) => {

            //if there is an error getting the experience, try again if < max retries
            if(retries < MAX_RETRIES){
                retries = retries +1;
                this.pollForExperience(id, resolve, reject, retries);

            //else throw an error
            }else{
                reject(e);
            }
        });
    }
}

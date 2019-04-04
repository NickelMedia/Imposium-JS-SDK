import * as jwt_decode from 'jwt-decode';
import axiosRetry = require('axios-retry');
import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
import {IExperience} from '../Client';
import {inventoryToFormData} from '../../scaffolding/Helpers';

const {...settings} = require('../../conf/settings.json').api;

export interface ITrackingResponse {
    gaTrackingId: string;
}

export default class API {
    private static readonly retry: any = (axiosRetry as any);

    private http: AxiosInstance = null;
    private storyId: string = '';

    constructor(accessToken: string, env: string, storyId: string) {
        const {version, currentVersion} = settings;

        this.http = axios.create({
            baseURL: settings[env],
            headers: {
                ...this.getAuthHeader(accessToken),
                [version]: currentVersion
            }
        });

        this.storyId = storyId;

        // Adds exponential back off to requests
        API.retry(this.http, {retryDelay: API.retry.exponentialDelay});
    }

    /*
        Wait async for story ga tracking id
     */
    public getGAProperty = (): Promise<ITrackingResponse> => {
        return new Promise((resolve, reject) => {
            this.http.get(`/story/${this.storyId}/ga`)
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        resolve experience data
     */
    public get = (experienceId: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.http.get(`/experience/${experienceId}?r=${Math.random()}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        create a new experience record and resolve fresh experience data
     */
    public create = (inventory: any, render: boolean, uuid: string, progress: (p: number) => any = null): Promise<IExperience> => {
        const route: string  = (render) ? '/experience/render' : '/experience';
        const formData: FormData = inventoryToFormData(this.storyId, inventory);
        const config: AxiosRequestConfig = {onUploadProgress: (e) => this.uploadProgress(e, progress)};

        formData.append('id', uuid);

        return new Promise((resolve, reject) => {
            this.http.post(route, formData, config)
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        triggers a render job for an experience if deferred
     */
    public triggerRender = (experienceId: string): Promise<string> => {
        const {http: {post}} = this;

        return new Promise((resolve, reject) => {
            post(`/experience/${experienceId}/trigger-event`)
            .then((res: AxiosResponse) => {
                const {data: {job_id}} = res;
                resolve(job_id);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        Attempt to decode JWT format from authToken, fallback to hmac if call fails
     */
    private getAuthHeader = (accessToken: string): any => {
        const {jwt, hmac} = settings;

        try {
            jwt_decode(accessToken);
            return {[jwt]: accessToken};
        } catch (e) {
            return {[hmac]: accessToken};
        }
    }

    /*
        Emit a rounded upload progress metric, no support for progressEvent type in Axios
     */
    private uploadProgress = (evt: any, callback: (p: number) => any = null): void => {
        if (callback) {
            const {loaded, total} = evt;
            const perc = Math.round(loaded / total * 100);

            callback(perc);
        }
    }
}

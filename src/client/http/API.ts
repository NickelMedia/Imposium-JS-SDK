'use strict';

import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
import * as jwt_decode from 'jwt-decode';
import axiosRetry = require('axios-retry');

import Analytics from '../../analytics/Analytics';
import {IExperience} from '../Client';

import {inventoryToFormData, calculateMbps} from '../../scaffolding/Helpers';

const settings = require('../../conf/settings.json').api;

export interface ITrackingResponse {
    gaTrackingId: string;
}

export default class API {

    /*
        Wait async for GET-ing GA tracking pixel, resolve on success
     */
    public static getGATrackingPixel = (url: string): Promise<void> => {
        const {get} = axios;

        return new Promise((resolve, reject) => {
            get(url)
            .then((res: AxiosResponse) => {
                resolve();
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        Check users bandwidth
     */
    public static checkBandwidth = (): Promise<number> => {
        const {get} = axios;
        const url: string = `${API.testImage}?bust=${Math.random()}`;
        const config: AxiosRequestConfig = {responseType: 'blob', timeout: 1500};

        return new Promise((resolve, reject) => {
            const startTime: number = new Date().getTime();

            get(url, config)
            .then((res: AxiosResponse) => {
                const {data: {size}} = res;
                resolve(calculateMbps(startTime, size));
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    private static readonly testImage = settings.img;
    private static readonly retry: any = (axiosRetry as any);

    private http: AxiosInstance = null;

    constructor(accessToken: string, env: string) {
        this.configureClient(accessToken, env);
    }

    /*
        Set a new axios client
     */
    public configureClient = (accessToken: string, env: string): void => {
        const {version, currentVersion} = settings;

        this.http = axios.create({
            baseURL : settings[env],
            headers : {
                ...this.getAuthHeader(accessToken),
                [version]: currentVersion
            }
        });

        // Adds exponential back off to requests...
        API.retry(this.http, {retryDelay: API.retry.exponentialDelay});
    }

    /*
        Wait async for story ga tracking id
     */
    public getTrackingId = (storyId: string): Promise<ITrackingResponse> => {
        const {http: {get}} = this;

        return new Promise((resolve, reject) => {
            get(`/story/${storyId}/ga`)
            .then((res: AxiosResponse) => {
                const {data} = res;
                resolve(data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        Wait async for GET /experience, resolve response data
     */
    public getExperience = (experienceId: string): Promise<any> => {
        const {http: {get}} = this;

        return new Promise((resolve, reject) => {
            get(`/experience/${experienceId}`)
            .then((res) => {
                const {data} = res;
                resolve(data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        Wait async for POST /experience, resolve response data
     */
    public postExperience = (storyId: string, inventory: any, render: boolean, uuid: string, progress: (p: number) => any = null): Promise<IExperience> => {
        const {doPostExperience, uploadProgress} = this;
        const formData = inventoryToFormData(storyId, inventory);
        const config: AxiosRequestConfig = {
            onUploadProgress: (e) => uploadProgress(e, progress)
        };

        formData.append('id', uuid);

        return doPostExperience(render, formData, config);
    }

    /*
        Wait async for POST /experience/{expId}/trigger-event, resolve on success
     */
    public invokeStream = (experienceId: string): Promise<string> => {
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
            return {[jwt] : accessToken};
        } catch (e) {
            return {[hmac] : accessToken};
        }
    }

    /*
        Make create experience POST request and resolve
     */
    private doPostExperience = (render: boolean, formData: any, config: any): Promise<IExperience> => {
        const {http: {post}} = this;
        const route: string  = (render) ? '/experience/render' : '/experience';
        
        return new Promise((resolve, reject) => {
            post(route, formData, config)
            .then((res: AxiosResponse) => {
                const {data} = res;
                resolve(data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
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

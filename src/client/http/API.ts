'use strict';

import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import axiosRetry = require('axios-retry');

import Analytics from '../../analytics/Analytics';

import {inventoryToFormData, calculateMbps} from '../../scaffolding/Helpers';

const settings = require('../../conf/settings.json').api;

export default class API {

    /*
        Wait async for GET-ing GA tracking pixel, resolve on success
     */
    public static getGATrackingPixel = (url: string): Promise<null> => {
        const {get} = axios;

        return new Promise((resolve, reject) => {
            get(url)
            .then((res) => {
                resolve();
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    /*
        Check users bandwidth
     */
    public static checkBandwidth = (): Promise<number> => {
        const {get} = axios;
        const url = `${API.testImage}?bust=${Math.random()}`;
        const config = {responseType: 'blob', timeout: 1500};

        return new Promise((resolve, reject) => {
            const startTime = new Date().getTime();

            get(url, config)
            .then((res) => {
                const {data: {size}} = res;
                resolve(calculateMbps(startTime, size));
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    private static readonly testImage = settings.img;
    private static readonly retry: any = (axiosRetry as any);
    private http: any = null;

    constructor(accessToken: string, env: string) {
        this.configureClient(accessToken, env);
    }

    /*
        Set a new axios client
     */
    public configureClient = (accessToken: string, env: string) => {
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
        Wait async for story meta data, GA tracking property in particular (PLACEHOLDER)
     */
    public getStory = (storyId: string): Promise<any> => {
        const {http: {get}} = this;

        return new Promise((resolve, reject) => {
            get(`/story/${storyId}/ga`)
            .then((res) => {
                const {data} = res;
                resolve(data);
            })
            .catch((e) => {
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
            .catch((e) => {
                reject(e);
            });
        });
    }

    /*
        Wait async for POST /experience, resolve response data
     */
    public postExperience = (storyId: string, inventory: any, render: boolean, uuid: string, progress: (e) => any = null): Promise<any> => {
        const {doPostExperience, uploadProgress} = this;
        const formData = inventoryToFormData(storyId, inventory);

        const config = {
            headers: {},
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
            .then((res) => {
                const {data: {job_id}} = res;
                resolve(job_id);
            })
            .catch((e) => {
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
    private doPostExperience = (render: boolean, formData: any, config: any): Promise<any> => {
        const {http: {post}} = this;
        const route: string  = (render) ? '/experience/render' : '/experience';
        
        return new Promise((resolve, reject) => {
            post(route, formData, config)
            .then((res) => {
                const {data} = res;
                resolve(data);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    /*
        Emit a rounded upload progress metric
     */
    private uploadProgress = (e: any, callback: any = null): void => {
        if (callback) {
            const {loaded, total} = e;
            const perc = Math.round(loaded / total * 100);

            callback(perc);
        }
    }
}

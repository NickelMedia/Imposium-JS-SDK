import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

import Analytics from '../../analytics/Analytics';

import {InventoryToFormData, isNode} from '../../scaffolding/Helpers';

const settings = require('../../conf/settings.json').api;

export default class API {
	private http:any = null;

	constructor(authToken:string, env:string) {
		this.http = axios.create({
			baseURL : settings[env],
			headers : this.getHeaders(authToken)
		});
	}

	/*
		Attempt to decode JWT format from authToken, fallback to hmac if call fails
	 */
	private getHeaders = (authToken:string):any => {
		const {jwt, hmac} = settings;

		try {
			jwt_decode(authToken);
			return {[jwt] : authToken};
		} catch (e) {
			return {[hmac] : authToken};
		}
	}

	/*
		Wait async for story meta data, GA tracking property in particular (PLACEHOLDER)
	 */
	public getStory = (storyId:string):Promise<any> => {
		const {http: {get}} = this;

		return new Promise((resolve, reject) => {
			get(`/story/${storyId}`)
			.then((res) => {
				const {data} = res;
				resolve(data);
			})
			.catch((e) => {
				reject(e)
			});
		});
	}

	/*
		Wait async for GET /experience, resolve response data
	 */
	public getExperience = (expId:string):Promise<any> => {
		const {http: {get}} = this;

		return new Promise((resolve, reject) => {
			get(`/experience/${expId}`)
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
	public postExperience = (storyId:string, inventory:any, progress:(e)=>any = null):Promise<any> => {
		const {doPostExperience, uploadProgress} = this;
		const formData = InventoryToFormData(storyId, inventory);

		const config = {
			onUploadProgress : (e) => uploadProgress(e, progress),
			headers          : {}
		};

		if (!isNode()) {
			return doPostExperience(formData, config);
		} else {
			config.headers = formData.getHeaders();
			return doPostExperience(formData, config);
		}
	}

	/*
		Make create experience POST request and resolve
	 */
	private doPostExperience = (formData:any, config:any):Promise<any> => {
		const {http: {post}} = this;

		return new Promise((resolve, reject) => {
			post(`/experience`, formData, config)
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
		Wait async for POST /experience/{expId}/trigger-event, resolve on success
	 */
	public invokeStream = (expId:string, sceneId:string, actId:string):Promise<null> => {
		const {http: {post}} = this;

		return new Promise((resolve, reject) => {
			const body = {
				exp_id   : expId,
				scene_id : sceneId,
				act_id   : actId
			};

			post(`/experience/${expId}/trigger-event`)
			.then((res) => {
				resolve();
			})
			.catch((e) => {
				reject(e);
			});
		});
	}

	/*
		Wait async for GET-ing GA tracking pixel, resolve on success
	 */
	public static getGATrackingPixel = (url:string):Promise<null> => {
		return new Promise((resolve, reject) => {
			axios({
				url              : url,
				method           : 'GET',
			})
			.then((res) => {
				resolve();
			})
			.catch((e) => {
				reject(e);
			})
		});
	}

	/*
		Emit a rounded upload progress metric
	 */
	private uploadProgress = (e:any, callback:any = null):void => {
		if (callback) {
			const {loaded, total} = e;
			const perc = Math.round(loaded / total * 100);

			callback(perc);
		}
	}
}

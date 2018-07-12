import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import Analytics from '../../analytics/Analytics';
import {InventoryToFormData, isNode} from '../../scaffolding/Helpers';

const settings = require('../../conf/settings.json').api;

export default class API {
	private static baseURL:string = '';

	/*
		Setup HTTP client defaults
	 */
	public static setup = (authToken:string, env:string):void => {
		API.baseURL = (env === 'production') ? settings.prodBaseUrl : settings.stagingBaseUrl;

		// Attempt to decode JWT format from authToken, fallback to hmac if call fails
		try {
			jwt_decode(authToken);
			axios.defaults.headers.common[settings.jwt] = authToken;
		} catch (e) {
			axios.defaults.headers.common[settings.hmac] = authToken;
		}
	}

	/*
		Wait async for story meta data, GA tracking property in particular (PLACEHOLDER)
	 */
	public static getStory = (storyId:string):Promise<any> => {
		const {get} = axios;

		return new Promise((resolve, reject) => {
			get(`${API.baseURL}/story/${storyId}`)
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
	public static getExperience = (expId:string):Promise<any> => {
		const {get} = axios;

		return new Promise((resolve, reject) => {
			get(`${API.baseURL}/experience/${expId}`)
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
	public static postExperience = (storyId:string, inventory:any, progress:(e)=>any = null):Promise<any> => {
		const {doPostExperience} = API;
		const formData = InventoryToFormData(storyId, inventory);

		const config = {
			onUploadProgress: (progress) ? (e) => progress(e) : null,
			headers: {}
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
	private static doPostExperience = (formData:any, config:any):Promise<any> => {
		const {post} = axios;

		return new Promise((resolve, reject) => {
			post(`${API.baseURL}/experience`, formData, config)
			.then((res) => {
				const {send} = Analytics;
				const {data} = res;
				const {id} = data;

				send({
					t: 'event',
					ec: 'experience',
					ea: 'created',
					el: id
				});

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
	public static invokeStream = (expId:string, sceneId:string, actId:string):Promise<any> => {
		const {post} = axios;

		return new Promise((resolve, reject) => {
			const body = {
				exp_id: expId,
				scene_id: sceneId,
				act_id: actId
			};

			post(`${API.baseURL}/experience/${expId}/trigger-event`)
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
	public static getGATrackingPixel = (url:string):Promise<any> => {
		return new Promise((resolve, reject) => {
			axios({
				url: url,
				method: 'GET',
				transformRequest: [(data, headers) => {
					delete headers.common[settings.jwt];
					delete headers.common[settings.hmac];

					return data;
				}]
			})
			.then((res) => {
				resolve();
			})
			.catch((e) => {
				reject(e);
			})
		});
	}
}

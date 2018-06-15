import Analytics from './Analytics';
import {create} from 'apisauce';
import {InventoryToFormData, isNode} from './Helpers';
import * as jwt_decode from 'jwt-decode';

export default class API {
	public static http:any = null;
	private static readonly baseURL:string = 'https://api.imposium.com';
	
	/*
		Setup HTTP client defaults
	 */
	public static setupAuth = (authToken:string):void => {
		let headers = null;

		// Attempt to decode JWT format from authToken, fallback to hmac if call fails
		try {
			jwt_decode(authToken);
			headers = {'Authorization': authToken};
		} catch (e) {
			headers = {'X-Imposium-Access-Key': authToken};
		}

		API.http = create({baseURL: API.baseURL, headers: headers});
	}

	/*
		Wait async for GET /experience, resolve response data
	 */
	public static getExperience = (expId:string):Promise<any> => {
		const {http: {get}} = API;

		return new Promise((resolve, reject) => {
			get(`/experience/${expId}`)
			.then((res) => {
				const {ok, data} = res;

				if (ok) {
					resolve(data);
				} else {
					reject();
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	/*
		Wait async for POST /experience, resolve response data
	 */
	public static postExperience = (storyId:string, inventory:any, progress:(e)=>any = null):Promise<any> => {
		const {http: {post}} = API;
		const data = InventoryToFormData(storyId, inventory);
		const config = (progress) ? {onUploadProgress: (e) => progress(e)} : null;

		return new Promise((resolve, reject) => {
			post('/experience', data, config)
			.then((res) => {
				const {ok, data} = res;

				if (ok) {
					const {send} = Analytics;
					const {id} = data;

					send({
						t: 'event',
						ec: 'experience',
						ea: 'created',
						el: id
					});

					resolve(data);
				} else {
					reject();
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	/*
		Wait async for POST /experience/{expId}/trigger-event, resolve on success
	 */
	public static invokeStream = (expId:string, sceneId:string, actId:string):Promise<any> => {
		const {http: {post}} = API;

		return new Promise((resolve, reject) => {
			const body = {
				exp_id: expId,
				scene_id: sceneId,
				act_id: actId
			};

			post(`/experience/${expId}/trigger-event`)
			.then((res) => {
				const {ok} = res;

				if (ok) {
					resolve();
				} else {
					reject();
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	} 
}

import {create} from 'apisauce';
import * as EventEmitter from 'event-emitter';

import VideoRetriever from './VideoRetriever';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public videoRetriever:VideoRetriever;

	private stompConfig:any = {
		'stompEndpoint':'ws://127.0.0.1:15674/stomp/websocket',
		'stompUser': 'guest',
		'stompPass': 'guest',
		'exchangeRoute': '/exchange/imposium/'
	};
	private api:any;
	private xhrBaseURL:string = 'https://api.imposium.com/';
	private token:string;

	constructor(token, config = null) {
		EventEmitter(this);

		//set access token
		this.token = token;

		//overwrite default config values
		if (config) {
			for (let key in config) {
				if (config.hasOwnProperty(key)) {
					this.stompConfig[key] = config[key];
				}
			}
		}

		//create the api instance
		this.api = create({
			baseURL: this.xhrBaseURL,
			headers:{
				'X-Imposium-Access-Key':this.token
			}
		});
	}

	public getStory(storyId, success, error) {

		this.api.get(`/story/${storyId}`)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response.data);
				}
			});
	}

	public getExperience(expId, success, error) {

		this.api.get(`/experience/${expId}`)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response.data);
				}
			});
	}

	public createExperience(storyId, inventory, render, success, error, progress=null) {
		const data:any = {'story_id':storyId, 'inventory':inventory};

		this.api.post('/experience', data)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response.data);
				}
			});
	}

	public startEventProcessor(data:any, success:any, error:any) {
		const jobSpec:any = {
			'expId': data.expId, 
			'actId': data.actId, 
			'onSuccess': success, 
			'onError': error
		};

		if (!this.videoRetriever) {
			this.videoRetriever = new VideoRetriever(jobSpec, this, this.stompConfig);		
		} else {
			this.videoRetriever.setJob(jobSpec)
			this.videoRetriever.init(this.stompConfig);	
		}
	}
}

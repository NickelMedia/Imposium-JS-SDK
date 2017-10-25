import {create} from 'apisauce';
import * as EventEmitter from 'event-emitter';

import { MessageConsumer, Job } from './MessageConsumer';
import { StompConfig } from './StompClient';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public messageConsumer:MessageConsumer;

	private stompConfig:StompConfig = {
		'stompEndpoint':'ws://127.0.0.1:15674/ws',
		'stompUser': 'guest',
		'stompPass': 'guest',
		'exchangeRoute': '/exchange/imposium/',
		'onMessage': undefined,
		'onError': undefined
	};

	private xhrBaseURL:string = 'http://api/';
	private api:any;
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
		const jobSpec:Job = {
			'expId': data.expId, 
			'actId': data.actId, 
			'onSuccess': success, 
			'onError': error
		};

		if (!this.messageConsumer) {
			this.messageConsumer = new MessageConsumer(jobSpec, this, this.api, this.stompConfig);		
		} else {
			this.messageConsumer.setJob(jobSpec)
			this.messageConsumer.setContext(this);
			
			this.messageConsumer.reconnect(this.stompConfig);	
		}
	}
}

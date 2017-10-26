import {create} from 'apisauce';
import * as EventEmitter from 'event-emitter';

import { MessageConsumer, Job } from './MessageConsumer';
import { StompConfig } from './StompClient';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public messageConsumer:MessageConsumer;

	private xhrBaseURL:string = 'http://api/';
	private token:any;
	private api:any;

	static config:any = {
		xhrBaseURL: 'http://api/',
		auth: '',
		stompConfig: {
			'stompEndpoint':'ws://127.0.0.1:15674/ws',
			'stompUser': 'guest',
			'stompPass': 'guest',
			'exchangeRoute': '/exchange/imposium/',
			'onMessage': undefined,
			'onError': undefined
		}
	}

	constructor(token, config = null) {
		EventEmitter(this);

		//set access token
		this.token = token;

		//overwrite default config values
		if (config) {
			for (let key in config) {
				if (config.hasOwnProperty(key)) {
					ImposiumClient.config[key] = config[key];
				}
			}
		}

		//create the api instance
		this.api = create({
			baseURL:ImposiumClient.config.xhrBaseURL,
			headers:this.getHeaders()
		});
	}

	//set the proper headers, for both accessToken, and JWT authentication
	private getHeaders() {
		if (ImposiumClient.config.auth.toLowerCase() === 'jwt') {
			return {'Authorization': `Bearer ${this.token}`}
		} else {
			return {'X-Imposium-Access-Key': this.token};
		}
	}

	//Parse the inventory object and create a formData to pass into Imposium
	private formatData(storyId, inventory, error){
		const formData = new FormData();
		let files = {};

		//add the storyID
		formData.append('story_id', storyId);

		//pull any files from the inventory, add them to the top level
		for (let inventoryId in inventory) {
			let fileInput = inventory[inventoryId];

			if (fileInput instanceof HTMLInputElement 
				&& fileInput.type 
				&& fileInput.type === "file") {
				
				if (fileInput.files && fileInput.files[0]) {
					inventory[inventoryId] = '';
					formData.append(inventoryId, fileInput.files[0]);
				} else {
					if (error) {
						error(`[NO_FILE_DATA] A file input was specified for inventory 
							item ${inventoryId}, but no file data was found.`);
						return;
					}
				}
			}
		}

		//add the inventory
		for (let invKey in inventory) {
			formData.append(`inventory[${invKey}]`, inventory[invKey]);
		}

		return formData;
	}

	//Get a story based on the storyId
	public getStory(storyId, success, error) {

		this.api.get(`/story/${storyId}`)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response);
				}
			})
	}

	//Get a specific user experience
	public getExperience(expId, success, error) {

		this.api.get(`/experience/${expId}`)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response);
				}
			});
	}

	//Create a new user experience
	public createExperience(storyId, inventory, render, success, error, progress=null) {

		const data = this.formatData(storyId, inventory, error);
		const config = (progress) ? { onUploadProgress: (e)=>progress(e)} : {};

		this.api.post('/experience', data, config)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response);
				}
			});
	}

	public startEventProcessor(data:any, success:any, error:any) {
		const jobSpec:Job = {
			'expId': data.expId, 
			'actId': data.actId, 
			'onSuccess': success, 
			'onError': error
		},
		stompConfig:StompConfig = ImposiumClient.config.stompConfig;

		if (!this.messageConsumer) {
			this.messageConsumer = new MessageConsumer(jobSpec, this, this.api, stompConfig);		
		} else {
			this.messageConsumer.setJob(jobSpec)
			this.messageConsumer.setContext(this);
			
			this.messageConsumer.reconnect(stompConfig);	
		}
	}
}

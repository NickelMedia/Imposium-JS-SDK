import { create } from 'apisauce';
import * as EventEmitter from 'event-emitter';

import { MessageConsumer, Job } from './MessageConsumer';
import { StompConfig } from './StompClient';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public messageConsumer:MessageConsumer;
	private token:string;
	private api:any;
	private onError:(err)=>void;
	private onSuccess:(data)=>void;

	// Default configuration options, can be overridden by passing in a 
	// config object
	static config:any = {
		url: 'http://api/',
		auth: 'basic',
		stompConfig: {
			'stompEndpoint':'ws://127.0.0.1:15674/ws',
			'user': 'guest',
			'password': 'guest',
			'exchangeRoute': '/exchange/imposium/',
			'onMessage': undefined,
			'onError': undefined
		}
	}

	/**
	 * Set token, set config, initialize req factory
	 * @param {string} token access token
	 * @param {any =     null} config override options
	 */
	constructor(token:string, config:any = null) {
		EventEmitter(this);

		// set access token
		this.token = token;

		// overwrite default config values
		if (config) {
			for (let key in config) {
				if (config.hasOwnProperty(key)) {
					ImposiumClient.config[key] = config[key];
				}
			}
		}

		// create the api instance
		this.api = create({
			baseURL:ImposiumClient.config.url,
			headers:this.getHeaders()
		});
	}

	/**
	 * Return auth headers based on type of access token supplied by the user
	 * @return {any} formatted header object 
	 */
	private getHeaders():any {
		if (ImposiumClient.config.auth.toLowerCase() === 'jwt') {
			return {'Authorization': `Bearer ${this.token}`}
		} else {
			return {'X-Imposium-Access-Key': this.token};
		}
	}

	/**
	 * Get a story based on a storyId
	 * @param {string}     storyId Imposium story id
	 * @param {any)=>void} success success callback 
	 * @param {any)=>void} error   error callback
	 */
	public getStory(storyId:string, success:(data:any)=>void, error:(res:any)=>void):void {
		this.api.get(`/story/${storyId}`)
		.then(res => {
			if (res.ok) {
				success(res.data);
			} else {
				error(res);
			}
		});
	}

	/**
	 * Get a specific user experience
	 * @param {string}     expId   Imposium experience id
	 * @param {any)=>void} success success callback
	 * @param {any)=>void} error   error callback
	 */
	public getExperience(expId:string, success:(data:any)=>void, error:(res:any)=>void):void {
		this.api.get(`/experience/${expId}`)
		.then(res => {
			if (res.ok) {
				success(res.data);
			} else {
				error(res);
			}
		});
	}

	/**
	 * Create a new user experience
	 * @param {string}     storyId   Imposium storyId
	 * @param {any}        inventory job inputs
	 * @param {boolean}    render    (TO DO: Greg, clarify this option?)
	 * @param {any)=>void} success   success callback
	 * @param {any)=>void} error     error callback
	 * @param {any=null}   progress  progress callback
	 */
	public createExperience(storyId:string, inventory:any, render:boolean, success:(data:any)=>void, error:(res:any)=>void, progress:any=null):void {
		const data = this.formatData(storyId, inventory, error),
			config = (progress) ? { onUploadProgress: (e)=>progress(e)} : {};

		this.api.post('/experience', data, config)
		.then(res => {
			if (res.ok) {
				success(res.data);
			} else {
				error(res);
			}
		});
	}

	/**
	 * Parse the inventory object and return a FormData object to handle multipart
	 * inputs
	 * @param  {string}      storyId   Imposium story id
	 * @param  {any}         inventory job inputs
	 * @param  {(str)=>void} error     error callback
	 * @return {FormData}              payload object used in createExperience
	 */
	private formatData(storyId:string, inventory:any, error:(str)=>void):FormData {
		const formData:FormData = new FormData();
		let files:any = {};

		// add the storyID
		formData.append('story_id', storyId);
		// pull any files from the inventory, add them to the top level
		for (let inventoryId in inventory) {
			let fileInput = inventory[inventoryId];

			if (fileInput instanceof HTMLInputElement && fileInput.type === "file") {
				if (fileInput.files.length > 0) {
					inventory[inventoryId] = '';
					formData.append(inventoryId, fileInput.files[0]);
				}
			}
		}

		// add the inventory
		for (let invKey in inventory) {
			formData.append(`inventory[${invKey}]`, inventory[invKey]);
		}

		return formData;
	}

	/**
	 * Invokes a stream for fetching existing videos or for monitoring/fetching
	 * new renders
	 * @param {any}        job     object containing job specification details
	 * @param {any)=>void} success success callback
	 * @param {any)=>void} error   error callback
	 */
	public getVideo(job:any, success:(data:any)=>void, error:(data:any)=>void):void {
		const jobSpec:Job = {
			'expId': job.expId, 
			'actId': job.actId, 
			'onSuccess': success, 
			'onError': error
		},
		stompConfig:StompConfig = ImposiumClient.config.stompConfig;

		if (!this.messageConsumer) {
			this.messageConsumer = new MessageConsumer(jobSpec, stompConfig, this, this.api);		
		} else {
			this.messageConsumer.setJob(jobSpec)
			this.messageConsumer.setContext(this);
			this.messageConsumer.reconnect(stompConfig);	
		}
	}
}

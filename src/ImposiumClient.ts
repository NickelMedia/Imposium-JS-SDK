import VideoRetriever from './VideoRetriever';
import {create} from 'apisauce';
import * as EventEmitter from 'event-emitter';

export class ImposiumClient{

	//Default config options
	static config:any = 
	{
		'requestUrl':'https://api.imposium.com/',
		'socket':'https://cms.imposium.com',
		'auth':'accessKey'
	};

	//accessToken or JWT
	private token:string;

	//API Sauce instance
	private api:any;

	//Socket connection handler
	public videoRetriever:VideoRetriever;

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
			baseURL:ImposiumClient.config.requestUrl,
			headers:this.getHeaders()
		});
	}

	//set the proper headers, for both accessToken, and JWT authentication
	private getHeaders(){

		if(ImposiumClient.config.auth.toLowerCase() == 'jwt'){
			return {
				'Authorization':`Bearer ${this.token}`
			}
		}else{
			return {
				'X-Imposium-Access-Key':this.token
			};
		}
	}

	//Parse the inventory object and create a formData to pass into Imposium
	private formatData(storyId, inventory, error){

		var formData = new FormData();

		//add the storyID
		formData.append('story_id', storyId);

		//pull any files from the inventory, add them to the top level
		var files = {};
		for(var inventoryId in inventory){
			var fileInput = inventory[inventoryId];
			if(fileInput instanceof HTMLInputElement && fileInput.type && fileInput.type === "file"){
				if(fileInput.files && fileInput.files[0]){
					inventory[inventoryId] = '';
					formData.append(inventoryId, fileInput.files[0]);
				} else {
					if(error){
						error('[NO_FILE_DATA] A file input was specified for inventory item '+inventoryId+', but no file data was found.');
						return;
					}
				}
			}
		}

		//add the inventory
		for(var invKey in inventory){
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
			})
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

	//Start the event processor, to generate or get a video
	public startEventProcessor(data:any, success:any, error:any) {
		if (!this.videoRetriever) {
			const config:any = {
				'socket': ImposiumClient.config.socket,
				'onSuccess':success,
				'onError':error,
				"exp":data.expId,
				"act":data.actId,
			};

			this.videoRetriever = new VideoRetriever(config, this);		
		} else {
			this.videoRetriever.data.exp = data.expId;
			this.videoRetriever.data.act = data.actId;
			this.videoRetriever.data.onSuccess = success;
			this.videoRetriever.data.onError = error;
			this.videoRetriever.startEventProcessor();	
		}
	}
}

export class events {
	public static STATUS:string = "imposium_status_update";
}

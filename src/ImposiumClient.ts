import VideoRetriever from './VideoRetriever';
import {create} from 'apisauce';
import * as EventEmitter from 'event-emitter';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient{

	static config:any = 
	{
		'requestUrl':'https://api.imposium.com/',
		'socket':'https://cms.imposium.com'
	};

	private token:string;
	private api:any;
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

		// if (data['inventory']) {
		// 	for (let inventoryId in data['inventory']) {
		// 		let fileInput = data['inventory'][inventoryId];

		// 		if (fileInput instanceof HTMLInputElement && fileInput.type) {
		// 			const errorMessage = `
		// 				[NO_FILE_DATA] A file input was specified for inventory
		// 				item ${inventoryId}, but no file data was found.`;

		// 			if (fileInput.type === "file") {
		// 				if (fileInput.files && fileInput.files[0]) {
		// 					data['inventory'][inventoryId] = '';
		// 					files[inventoryId] = fileInput.files[0];
		// 				} else {
		// 					if (error) {
		// 						error(errorMessage);
		// 						return;
		// 					}
		// 				}
		// 			}	
		// 		}
		// 	}
		// }
		
		this.api.post('/experience', data)
			.then((response)=>{
				if(response.ok){
					success(response.data);
				}else{
					error(response.data);
				}
			});

		// const request:Request = new Request
		// (
		// 	route, 
		// 	ImposiumClient.config.requestUrl, 
		// 	this.jwt, 
		// 	data, 
		// 	success, 
		// 	error
		// );

		// if (Object.keys(files).length > 0) {
		// 	for (let fileKey in files) {
		// 		request.addFile(fileKey, files[fileKey]);
		// 	}

		// 	if (progress) request.onUploadProgress(progress);
		// }

		// RequestFactory.post(request);
	}

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

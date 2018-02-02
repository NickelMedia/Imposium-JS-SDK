import "babel-polyfill";
import * as EventEmitter from 'event-emitter';
import Analytics from './Analytics';
import { create } from 'apisauce';
import { StompConfig } from './StompClient';
import { MessageConsumer, Job } from './MessageConsumer';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public messageConsumer:MessageConsumer;
	private analytics:Analytics = null;
	private idRegExp:RegExp = /^ua-\d{4,9}-\d{1,4}$/i;
	private video:HTMLVideoElement = null;
	private progressCheckInterval:any;
	private evts:[number] = [0.25, 0.5, 0.75];
	private lastEvtFired:number = 0;
	private startSent:boolean = false;
	private finishedSent:boolean = false;
	private token:string;
	private api:any;
	private onError:(err)=>void;
	private onSuccess:(data)=>void;

	// Default configuration options, can be overridden by passing in a 
	// config object
	static config:any = {
		url: 'https://api.imposium.com',
		auth: 'basic',
		stompConfig: {
			'stompEndpoint':'wss://stomp.prod.k8s.nickel.media/ws',
			'user': 'imposium_stomp',
			'password': 'Teehe1ceeMe7Pe1d',
			'exchangeRoute': '/exchange/imposium/',
			'onMessage': undefined,
			'onError': undefined
		}
	}

	/**
	 * Set token, set config, initialize req factory
	 * @param {string} token access token
	 * @param {any = null} config override options
	 */
	constructor(token:string, trackingId = null, video:HTMLVideoElement = null, config:any = null) {
		EventEmitter(this);

		// set access token
		this.token = token;

		// set up analytics if tracking id was passed / is valid
		if (trackingId && (this.idRegExp).test(trackingId)) {
			this.analytics = new Analytics(trackingId);

			this.pageView();

			window.addEventListener('popstate', () => this.pageView());
		}

		// set up video event listeners if video is passed and analytics was
		// successfully instantiated
		if (video && this.analytics) {
			this.video = video;
			this.video.addEventListener('loadstart', () => this.onLoad());
			this.video.addEventListener('play', () => this.onPlay());
			this.video.addEventListener('pause', () => this.onPause());
			this.video.addEventListener('ended', () => this.onEnd());
		}

		// overwrite default config values
		if (config) {
			this.copy(ImposiumClient.config, config);
		}

		// create the api instance
		this.api = create({
			baseURL:ImposiumClient.config.url,
			headers:this.getHeaders()
		});
	}

	/*
		Record page view metric
	 */
	private pageView() {
		console.log('page view called')
		this.analytics.send({
			t: 'pageview', 
			dp: window.location.pathname
		});
	}

	/*
		Record video view hits
	 */
	private onLoad() {
		this.analytics.send({
			t: 'event',
			ec: 'video_player',
			ea: 'view'
		});
	}

	/*
		Start listening for playback progress when video starts playing
	 */
	private onPlay() {
		clearInterval(this.progressCheckInterval);
		this.progressCheckInterval = setInterval(() => this.checkProgress(), 100);
	}

	/*
		Measure video playback percentage record analytics at defined intervals 
	 */
	private checkProgress() {
        if (this.video) {
            const perc = this.video.currentTime / this.video.duration,
            	next = this.evts[this.lastEvtFired];

            if (perc > next) {                
                this.analytics.send({
                	t: 'event',
                	ec: 'video_player',
                	ea: 'playback',
                	ev: next
                });

                this.lastEvtFired++;
            }
        } else {
            clearInterval(this.progressCheckInterval);
        }
    }

	/*
		Clear progress interval on video pause
	 */
	private onPause() {
		clearInterval(this.progressCheckInterval);
	}

	/*
		Handle cleaning up once video finishes playing
	 */
	private onEnd() {
		clearInterval(this.progressCheckInterval);

		this.analytics.send({
			t: 'event',
			ec: 'video_player',
			ea: 'playback',
			ev: 1
		});

		this.lastEvtFired = 0;
	}

	/*
		Copy config objects recursively
	 */
	private copy(a:any, b:any):void {
		for (let key in b) {
			if (b.hasOwnProperty(key)) {
				if (typeof b[key] === 'object') {
					this.copy(a[key], b[key]);
					a[key] = b[key];
				} else {
					a[key] = b[key];
				}
			}
		}
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
		}).catch(err => {
			error(err);
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
		}).catch(err => {
			error(err);
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
				if (this.analytics) {
					this.analytics.send({
						t: 'event',
						ec: 'experience',
						ea: 'created',
						el: res.data.id
					});
				}

				success(res.data);
			} else {
				error(res);
			}
		}).catch(err => {
			error(err);
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
		const formData = new FormData();
		let files:any = {};

		// add the storyID
		formData.append('story_id', storyId);
		// pull any files from the inventory, add them to the top level
		
		for (let inventoryId in inventory) {
			let val = inventory[inventoryId];

			//input
			if (val && val.type === "file") {
				if (val.files.length > 0) {
					inventory[inventoryId] = '';
					formData.append(inventoryId, val.files[0]);
				}

			//blob
			}else if(val && val instanceof Blob || val instanceof File){
				inventory[inventoryId] = '';
				formData.append(inventoryId, val, "inventory.png");
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
	public getVideo(job:any, success:any, error:any):void {
		const jobSpec:Job = {
			'expId': job.expId, 
			'actId': job.actId, 
			'sceneId': job.sceneId,
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

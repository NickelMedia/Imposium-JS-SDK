import "babel-polyfill";

import API from './http/API';
import Stomp from './tcp/Stomp';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import ExceptionPipe from '../scaffolding/ExceptionPipe';
import ImposiumEvents from './ImposiumEvents';

import {
	ClientConfigurationError,
	EnvironmentError,
	NetworkError
} from '../scaffolding/Exceptions';

import {
	prepConfig,
	keyExists,
	isFunc,
	isNode
} from '../scaffolding/Helpers';

interface ClientConfig {
	accessToken : string;
	storyId     : string;
	actId       : string;
	sceneId     : string;
	environment : string;
}

const settings = require('../conf/settings.json').client;

export default class ImposiumClient {
	public events = {
		EXPERIENCE_CREATED : 'experienceCreated',
		UPLOAD_PROGRESS    : 'uploadProgress',
		GOT_EXPERIENCE     : 'gotExperience',
		STATUS_UPDATE      : 'statusUpdate',
		ERROR              : 'onError'
	};

	private api:API = null;
	private player:VideoPlayer = null;
	private consumer:MessageConsumer = null;
	private clientConfig:ClientConfig = null;

	/*
		Initialize Imposium client
	 */
	constructor(config:any) {
		this.assignConfigOpts(config);
	}

	/*
		Set current video player ref
	 */
	public setPlayer = (player:VideoPlayer) => {
		this.player = player;
	}

	/*
		Exposed for users who may want to re-use a client for n stories
	 */
	public setup = (config:any) => {
		this.assignConfigOpts(config);
	}

	/*
		Copies supplied config object to settings for sharing with sub components
	 */
	private assignConfigOpts = (config:any) => {
		const prevConfig = this.clientConfig;
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		this.clientConfig = {...defaultConfig, ...config};

		if (!this.api || (prevConfig.accessToken !== config.accessToken || prevConfig.environment !== config.environment)) {
			this.api = new API(this.clientConfig.accessToken, this.clientConfig.environment);
		}

		// Prep for analytics in browser
		if (!isNode()) {
			this.getAnalyticsProperty();
		}
	}

	/*
		Get the GA property per storyId passed in
	 */
	private getAnalyticsProperty = ():void => {
		const {api, clientConfig: {storyId}} = this;

		api.getStory(storyId)
		.then((story) => {
			// GA prop regExp if still needed down the line
			// RegExp(/^ua-\d{4,9}-\d{1,4}$/i) 
			const GaProp = 'UA-113079866-1';
			Analytics.setup(GaProp);
		})
		.catch((e) => {
			console.error(e);
		});
	}

	/*
		Sets a callback for an event
	 */
	public on = (eventName:string, callback:any):void => {
		try {
			if (isFunc(callback)) {
				if (keyExists(this.events, eventName)) {
					ImposiumEvents[eventName] = callback;
				} else {
					throw new ClientConfigurationError('invalidEventName', eventName);
				}
			} else {
				throw new ClientConfigurationError('invalidCallbackType', eventName);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Turns off a specific event or all events
	 */
	public off = (eventName:string = ''):void => {
		try {
			if (eventName !== '') {
				if (keyExists(this.events, eventName)) {
					ImposiumEvents[eventName] = null;
				} else {
					throw new ClientConfigurationError('invalidEventName', eventName);
				}
			} else {
				Object.keys(this.events).forEach((event) => {
					ImposiumEvents[event] = null;
				});
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Get experience data
	 */
	public getExperience = (experienceId:string):void => {
		const {api, player} = this;
		const {gotExperience} = ImposiumEvents;

		try {
			if (gotExperience) {
				api.getExperience(experienceId)
				.then((data) => {
					const {experience: {id, video_url_mp4_720}} = data;

					// START STUB
					if (player) {
						player.experienceGenerated({
							id       : id,
							url      : video_url_mp4_720,
							format   : 'mp4',
							width    : 720,
							height   : 1080,
							filesize : 1000000,
							duration : 4,
							rate     : 23.93
						}, '');
					}

					gotExperience(data);
				})
				.catch((e) => {
					const wrappedError = new NetworkError('httpFailure', experienceId, e);
					ExceptionPipe.trapError(wrappedError);
				});
			} else {
				throw new ClientConfigurationError('eventNotConfigured', this.events.GOT_EXPERIENCE);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Create new experience & return relevant meta
	 */
	public createExperience = (inventory:any, render:boolean):void => {
		const {gotExperience, experienceCreated, uploadProgress} = ImposiumEvents;
		const permitRender = (render && experienceCreated);
		const permitCreate = (!render && gotExperience);
 
		try {
			if (permitRender || permitCreate) {
				const {api, clientConfig: {storyId}} = this;

				api.postExperience(storyId, inventory, uploadProgress)
				.then((data) => {
					const {id} = data;
					const {clientConfig: {sceneId, actId}} = this;

					if (experienceCreated) {
						experienceCreated(data);
					}
					
					if (render) {
						this.renderExperience({
							expId   : id,
							sceneId : sceneId,
							actId   : actId
						});
					}
				})
				.catch((e) => {
					const wrappedError = new NetworkError('httpFailure', null, e);
					ExceptionPipe.trapError(wrappedError);
				});
			} else {
				let eventType = null;

				if (render && !gotExperience) {
					eventType = this.events.GOT_EXPERIENCE;
				} 

				if (!render && !experienceCreated) {
					eventType = this.events.EXPERIENCE_CREATED;
				}

				throw new ClientConfigurationError('eventNotConfigured', eventType);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Invokes the streaming process
	 */
	private startMessaging = (job:any):void => {
		const {api} = this;
		const {expId, sceneId, actId} = job;

		api.invokeStream(expId, sceneId, actId)
		.catch((e) => {
			const wrappedError = new NetworkError('httpFailure', expId, e);
			ExceptionPipe.trapError(wrappedError);
		});
	}

	/*
		Invokes rendering processes and starts listening for messages 
	 */
	public renderExperience = (job:any):void => {
		const {consumer, player, clientConfig: {environment}} = this;
		const startDelegate = (j:any) => this.startMessaging(j);

		if (!consumer) {
			this.consumer = new MessageConsumer(job, environment, startDelegate, player);
		} else {
			consumer.kill()
			.then(() => {
				this.consumer = new MessageConsumer(job, environment, startDelegate, player);
			});
		}
	}

	/*
		Sets up analytics using fallback video player wrapper class
	 */
	public captureAnalytics = (playerRef:HTMLVideoElement = null):void => {
		try {
			if (!isNode()) {
				this.setPlayer(new FallbackPlayer(playerRef));
			} else {
				throw new EnvironmentError('node');
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

}
import "babel-polyfill";

import API from './http/API';
import Stomp from './tcp/Stomp';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
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

const settings = require('../conf/settings.json').client;

export default class ImposiumClient {
	public cacheVideo:(video:any, poster?:string)=>void = null;

	public events = {
		EXPERIENCE_CREATED : 'experienceCreated',
		UPLOAD_PROGRESS    : 'uploadProgress',
		GOT_EXPERIENCE     : 'gotExperience',
		STATUS_UPDATE      : 'statusUpdate',
		ERROR              : 'onError'
	};

	private fallbackPlayer:FallbackPlayer = null;

	/*
		Initialize Imposium client
	 */
	constructor(config:any) {
		this.assignConfigOpts(config);
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
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		settings.activeConfig = {...defaultConfig, ...config};

		const {activeConfig: {accessToken, environment, storyId}} = settings;

		API.setup(accessToken, environment);
		Stomp.setEndpoint(environment);

		// Prep for analytics in browser
		if (!isNode()) {
			API.getStory(storyId)
			.then((story) => {
				// GA prop regExp
				// RegExp(/^ua-\d{4,9}-\d{1,4}$/i) 
				const GaProp = 'UA-113079866-1';
				Analytics.setup(GaProp);
			})
			.catch((e) => {
				console.error(e);
			});
		}
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
		const {gotExperience} = ImposiumEvents;

		try {
			if (gotExperience) {
				API.getExperience(experienceId)
				.then((data) => {
					const {experience: {id, video_url_mp4_720}} = data;

					if (this.cacheVideo) {
						this.cacheVideo({
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
				const {activeConfig: {storyId}} = settings;
				const {postExperience} = API;

				postExperience(storyId, inventory, uploadProgress)
				.then((data) => {
					const {id} = data;
					const {activeConfig: {sceneId, actId}} = settings;

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
		Invokes rendering processes and starts listening for messages 
	 */
	public renderExperience = (job:any):void => {
		const {expId} = job;

		if (!MessageConsumer.job) {
			MessageConsumer.init(job);
		} else {
			MessageConsumer.reconnect(job);
		}
	}

	/*
		Sets up analytics using 
	 */
	public captureAnalytics = (playerRef:HTMLVideoElement = null):void => {
		try {
			if (!isNode()) {
				this.fallbackPlayer = new FallbackPlayer(playerRef);
			} else {
				throw new EnvironmentError('node');
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}
}
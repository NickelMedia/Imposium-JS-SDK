import "babel-polyfill";

import API from './http/API';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

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

	private eventDelegateRefs:any = {
		experienceCreated : null,
		uploadProgress    : null,
		gotExperience     : null,
		statusUpdate      : null,
		onError           : null
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
		Exposed for users who may want to re-use a client for n stories
	 */
	public setup = (config:any) => {
		this.assignConfigOpts(config);
	}

	/*
		Set current video player ref
	 */
	public setPlayer = (player:VideoPlayer) => {
		this.player = player;
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
		Invokes the streaming process
	 */
	private startMessaging = (experienceId):void => {
		const {api, clientConfig: {actId, sceneId}, eventDelegateRefs: {onError}} = this;

		api.invokeStream(experienceId, actId, sceneId)
		.catch((e) => {
			const wrappedError = new NetworkError('httpFailure', experienceId, e);
			ExceptionPipe.trapError(wrappedError, onError);
		});
	}

	/*
		Make a new consumer w/ delegates
	 */
	private makeConsumer = (experienceId:string):void => {
		const {clientConfig: {environment}, eventDelegateRefs, player} = this;

		// Merge scoped startMessaging call with client events
		const delegates:any = {
			start: (id:string) => this.startMessaging(id),
			...eventDelegateRefs
		};

		this.consumer = new MessageConsumer(
			environment,
			experienceId,
			delegates,
			player
		);
	}

	/*
		Sets a callback for an event
	 */
	public on = (eventName:string, callback:any):void => {
		const {eventDelegateRefs, eventDelegateRefs: {onError}} = this;

		try {
			if (isFunc(callback)) {
				if (keyExists(this.events, eventName)) {
					eventDelegateRefs[eventName] = callback;
				} else {
					throw new ClientConfigurationError('invalidEventName', eventName);
				}
			} else {
				throw new ClientConfigurationError('invalidCallbackType', eventName);
			}
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Turns off a specific event or all events
	 */
	public off = (eventName:string = ''):void => {
		const {eventDelegateRefs, eventDelegateRefs: {onError}} = this;

		try {
			if (eventName !== '') {
				if (keyExists(this.events, eventName)) {
					eventDelegateRefs[eventName] = null;
				} else {
					throw new ClientConfigurationError('invalidEventName', eventName);
				}
			} else {
				Object.keys(this.events).forEach((event) => {
					eventDelegateRefs[event] = null;
				});
			}
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Get experience data
	 */
	public getExperience = (experienceId:string):void => {
		const {api, player, eventDelegateRefs: {gotExperience, onError}} = this;

		try {
			if (gotExperience || player) {
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
							filesize : 123456789,
							duration : 4,
							rate     : 23.93
						}, '');
					}

					if (gotExperience) {
						gotExperience(data);
					}
				})
				.catch((e) => {
					const wrappedError = new NetworkError('httpFailure', experienceId, e);
					ExceptionPipe.trapError(wrappedError, onError);
				});
			} else {
				throw new ClientConfigurationError('eventNotConfigured', this.events.GOT_EXPERIENCE);
			}
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Create new experience & return relevant meta
	 */
	public createExperience = (inventory:any, render:boolean = true):void => {
		const {player, eventDelegateRefs: {gotExperience, experienceCreated, uploadProgress, onError}} = this;
		const permitRender = (render && (player || experienceCreated));
		const permitCreate = (!render && gotExperience);
 
		try {
			if (permitRender || permitCreate) {
				const {api, clientConfig: {storyId}} = this;

				api.postExperience(storyId, inventory, uploadProgress)
				.then((data) => {
					const {clientConfig: {sceneId, actId}} = this;
					const {id} = data;

					if (experienceCreated) {
						experienceCreated(data);
					}
					
					if (render) {
						this.renderExperience(id);
					}
				})
				.catch((e) => {
					const wrappedError = new NetworkError('httpFailure', null, e);
					ExceptionPipe.trapError(wrappedError, onError);
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
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Invokes rendering processes and starts listening for messages 
	 */
	private renderExperience = (experienceId:string):void => {
		const {consumer} = this;
		
		if (!consumer) {
			this.makeConsumer(experienceId);
		} else {
			consumer.kill()
			.then(() => {
				this.makeConsumer(experienceId);
			});
		}
	}

	/*
		Sets up analytics using fallback video player wrapper class
	 */
	public captureAnalytics = (playerRef:HTMLVideoElement = null):void => {
		const {eventDelegateRefs: {onError}} = this;

		try {
			if (!isNode()) {
				this.setPlayer(new FallbackPlayer(playerRef));
			} else {
				throw new EnvironmentError('node');
			}
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

}
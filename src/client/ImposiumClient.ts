import "babel-polyfill";

import API from './http/API';
import Stomp from './tcp/Stomp';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import Playback from '../video/Playback';
import FallbackPlayer from '../video/FallbackPlayer';
import ImposiumEvents from './ImposiumEvents';

import {
	prepConfig,
	isFunc,
	keyExists,
	isNode,
	formatError,
	errorHandler,
	warnHandler
} from '../scaffolding/Helpers';

const errors   = require('../conf/errors.json').client;
const settings = require('../conf/settings.json').client;
const warnings = require('../conf/warnings.json').client;

export default class ImposiumClient {
	private fallbackPlayer:FallbackPlayer = null;

	public events = {
		EXPERIENCE_CREATED : 'experienceCreated',
		UPLOAD_PROGRESS    : 'uploadProgress',
		GOT_EXPERIENCE     : 'gotExperience',
		STATUS_UPDATE      : 'statusUpdate',
		ERROR              : 'onError'
	};

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
					const {invalidEvent} = errors;
					throw new Error(formatError(invalidEvent, eventName));
				}
			} else {
				const {badEventRef} = errors;
				throw new Error(formatError(badEventRef, eventName));
			}
		} catch (e) {
			errorHandler(e);
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
					const {invalidEvent} = errors;
					throw new Error(formatError(invalidEvent, eventName));
				}
			} else {
				Object.keys(this.events).forEach((event) => {
					ImposiumEvents[event] = null;
				});
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Get experience data
	 */
	public getExperience = (expId:string):void => {
		const {gotExperience} = ImposiumEvents;

		try {
			if (gotExperience) {
				API.getExperience(expId)
				.then((data) => {
					const {experience: {id}} = data;
					Playback.updateExperience(id);
					gotExperience(data);
				})
				.catch((e) => {
					errorHandler(e)
				});
			} else {
				const {noCallbackSet} = errors;
				throw new Error(formatError(noCallbackSet, this.events.GOT_EXPERIENCE));
			}
		} catch (e) {
			errorHandler(e);
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
					errorHandler(e);
				});
			} else {
				const {noCallbackSet} = errors;
				let eventType = null;

				if (render && !gotExperience) {
					eventType = this.events.GOT_EXPERIENCE;
				} 

				if (!render && !experienceCreated) {
					eventType = this.events.EXPERIENCE_CREATED;
				}

				throw new Error(formatError(noCallbackSet, eventType));
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Invokes rendering processes and starts listening for messages 
	 */
	public renderExperience = (job:any):void => {
		const {expId} = job;
		Playback.updateExperience(expId);

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
				if (playerRef) {
					this.fallbackPlayer = new FallbackPlayer(playerRef);
				} else {
					// throw no ref err
				}
			} else {
				const {nodeAnalytics} = warnings;
				warnHandler(nodeAnalytics);
			}
		} catch (e) {
			errorHandler(e, false);
		}
	}
}
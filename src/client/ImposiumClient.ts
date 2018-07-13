import "babel-polyfill";

import API from './http/API';
import Stomp from './tcp/Stomp';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../analytics/VideoPlayer';
import ImposiumEvents from '../scaffolding/Events';
import {prepConfig, warnHandler, formatError, errorHandler, isNode} from '../scaffolding/Helpers';

const errors   = require('../conf/errors.json').client;
const settings = require('../conf/settings.json').client;
const warnings = require('../conf/warnings.json').client;

export const Events = {
	EXPERIENCE_CREATED : 'experienceCreated',
	UPLOAD_PROGRESS    : 'uploadProgress',
	GOT_EXPERIENCE     : 'gotExperience',
	STATUS_UPDATE      : 'statusUpdate',
	ERROR              : 'onError'
};

export class ImposiumClient {
	private static readonly validEvents:string[] = Object.keys(Events).map(e => Events[e]);
	
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
	assignConfigOpts = (config:any) => {
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		settings.activeConfig = {...defaultConfig, ...config};

		const {activeConfig: {accessToken, environment}} = settings;

		API.setup(accessToken, environment);
		Stomp.setEndpoint(environment);
	}

	/*
		Sets a callback for an event
	 */
	public on = (eventName:string, callback:any):void => {
		try {
			if (Object.prototype.toString.call(callback) === '[object Function]') {
				const {validEvents} = ImposiumClient;

				if (~validEvents.indexOf(eventName)) {
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
		const {validEvents} = ImposiumClient;

		try {
			if (eventName !== '') {
				if (~validEvents.indexOf(eventName)) {
					ImposiumEvents[eventName] = null;
				} else {
					const {invalidEvent} = errors;
					throw new Error(formatError(invalidEvent, eventName));
				}
			} else {
				validEvents.forEach((event) => {
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
					gotExperience(data);
				})
				.catch((e) => {
					errorHandler(e)
				});
			} else {
				const {noCallbackSet} = errors;
				throw new Error(formatError(noCallbackSet, Events.GOT_EXPERIENCE));
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
					eventType = Events.GOT_EXPERIENCE;
				} 

				if (!render && !experienceCreated) {
					eventType = Events.EXPERIENCE_CREATED;
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
		if (VideoPlayer.updateId) {
			const {expId} = job;
			VideoPlayer.updateExperienceID(expId);
		}

		if (!MessageConsumer.job) {
			MessageConsumer.init(job);		
		} else {
			MessageConsumer.reconnect(job);
		}
	}

	/*
		Sets up analytics using 
	 */
	public captureAnalytics = (trackingId:string = '', playerRef:HTMLVideoElement = null):void => {
		try {
			if (!isNode()) {
				if (RegExp(/^ua-\d{4,9}-\d{1,4}$/i).test(trackingId)) {
					Analytics.setup(trackingId);

					if (playerRef) {
						VideoPlayer.setup(playerRef);
					}
				} else {
					const {badGaProp} = errors;
					throw new Error(formatError(badGaProp, trackingId));
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
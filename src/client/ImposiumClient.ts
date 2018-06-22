import "babel-polyfill";

import API from './http/API';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../analytics/VideoPlayer';
import ImposiumEvents from '../scaffolding/Events';
import {warnHandler, formatError, errorHandler, isNode} from '../scaffolding/Helpers';

const errors = require('../conf/errors.json').client;
const warnings = require('../conf/warnings.json').client;

export const Events = {
	EXPERIENCE_CREATED : 'experienceCreated',
	UPLOAD_PROGRESS    : 'uploadProgress',
	GOT_EXPERIENCE     : 'gotExperience',
	GOT_SCENE          : 'gotScene',
	GOT_MESSAGE        : 'gotMessage',
	ERROR              : 'onError'
};

export class ImposiumClient {
	private static readonly validEvents:string[] = Object.keys(Events).map(e => Events[e]);
	/*
		Initialize Imposium client
	 */
	constructor(token:string, config:any = null) {
		API.setupAuth(token);
	}

	/*
		Set up the analytics client and video tracking events
	 */
	public setupAnalytics = (trackingId:string = '', playerRef:HTMLVideoElement = null):void => {
		try {
			if (!isNode()) {
				if (RegExp(/^ua-\d{4,9}-\d{1,4}$/i).test(trackingId)) {
					Analytics.setup(trackingId);

					if (playerRef) {
						VideoPlayer.setup(playerRef);
					}
				} else {
					const {bad_ga_prop} = errors;
					throw new Error(formatError(bad_ga_prop, trackingId));
				}
			} else {
				const {node_analytics} = warnings;
				warnHandler(node_analytics);
			}
		} catch (e) {
			errorHandler(e, false);
		}
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
					const {invalid_event} = errors;
					throw new Error(formatError(invalid_event, eventName));
				}
			} else {
				const {bad_event_ref} = errors;
				throw new Error(formatError(bad_event_ref, eventName));
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
					const {invalid_event} = errors;
					throw new Error(formatError(invalid_event, eventName));
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
		Create new experience & return relevant meta
	 */
	public createExperience = (storyId:string, inventory:any, render:boolean):void => {
		const {experienceCreated, uploadProgress} = ImposiumEvents;

		try {
			if (experienceCreated) {
				const {postExperience} = API;

				postExperience(storyId, inventory, uploadProgress)
				.then((data) => {
					experienceCreated(data);
				})
				.catch((e) => {
					errorHandler(e);
				});
			} else {
				const {no_callback_set} = errors;
				throw new Error(formatError(no_callback_set, Events.EXPERIENCE_CREATED));
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
				const {no_callback_set} = errors;
				throw new Error(formatError(no_callback_set, Events.GOT_EXPERIENCE));
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Create a new experience and start listening for messages
	 */
	public renderVideo = (storyId:string, sceneId:string, actId:string, inventory:any) => {
		const {
			experienceCreated,
			uploadProgress, 
			gotScene, 
			gotMessage
		} = ImposiumEvents;

		try {
			if (gotScene) {
				const {postExperience} = API;

				postExperience(storyId, inventory, uploadProgress)
				.then((data) => {
					const {id} = data;

					if (experienceCreated) {
						experienceCreated(data);
					}

					this.initStomp({
						expId: id,
						sceneId: sceneId,
						actId: actId
					});
				})
				.catch((e) => {
					errorHandler(e);
				});
			} else {
				const {no_callback_set} = errors;
				throw new Error(formatError(no_callback_set, Events.GOT_SCENE));
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Open TDP connection with Imposium and get event based messages and/or
		video urls / meta
	 */
	private initStomp = (job:any):void => {
		const {gotScene} = ImposiumEvents;

		try {
			if (gotScene) {
				if (VideoPlayer.updateId) {
					const {expId} = job;
					VideoPlayer.updateExperienceID(expId);
				}

				if (!MessageConsumer.job) {
					MessageConsumer.init(job);		
				} else {
					MessageConsumer.reconnect(job);
				}
			} else {
				const {no_callback_set} = errors;
				throw new Error(formatError(no_callback_set, Events.GOT_SCENE));
			}
		} catch (e) {
			errorHandler(e)
		}
	}
}

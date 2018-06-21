import "babel-polyfill";

import API from './API';
import ImposiumEvents from './ImposiumEvents';
import MessageConsumer from './MessageConsumer';
import Analytics from '../util/Analytics';
import VideoPlayer from '../util/VideoPlayer';
import {errorHandler, isNode} from '../util/Helpers';

export class Events {
	public static EXPERIENCE_CREATED:string = 'experienceCreated';
	public static UPLOAD_PROGRESS:string = 'uploadProgress';
	public static GOT_EXPERIENCE:string = 'gotExperience';
	public static GOT_SCENE:string = 'gotScene';
	public static GOT_MESSAGE:string = 'gotMessage';
	public static ERROR:string = 'onError';
}

export class ImposiumClient {
	private static readonly GARegExp:RegExp = RegExp(/^ua-\d{4,9}-\d{1,4}$/i);
	private static readonly validEvents:string[] = [
		'experienceCreated',
		'uploadProgress',
		'gotExperience',
		'gotScene',
		'gotMessage',
		'onError'
	];

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
		const {GARegExp} = ImposiumClient;

		try {
			if (!isNode()) {
				if (GARegExp.test(trackingId)) {
					Analytics.setup(trackingId);

					if (playerRef) {
						VideoPlayer.setup(playerRef);
					}
				} else {
					throw new Error(`Tracking ID ${trackingId} is not a valid Google Analytics property.`);
				}
			} else {
				console.warn('Sorry, analytics are not currently available in NodeJS.');
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
					throw new Error(`${eventName} is not a valid Imposium event.`);
				}
			} else {
				throw new Error(`The callback reference passed to ${eventName} was not of type Function.`);
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
					throw new Error(`${eventName} is not a valid Imposium event.`);
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
				throw new Error('Please set the following callback: experienceCreated to call createExperience');
			}
		} catch (e) {
			errorHandler(e);
		}

	}

	/*
		Get experience data
	 */
	public getVideo = (expId:string):void => {
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
				throw new Error('Please set the following callback: gotExperience to call getExperience.');
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
				throw new Error('Please set the following callback: gotScene to call renderExperience.');
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Open TDP connection with Imposium and get event based messages and/or
		video urls / meta
	 */
	private initStomp(job:any):void {
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
				throw new Error('Please set the following callback: gotScene to call getVideo.');
			}
		} catch (e) {
			errorHandler(e)
		}
	}
}

import "babel-polyfill";

import API from './API';
import Analytics from './Analytics';
import VideoPlayer from './VideoPlayer';
import ImposiumEvents from './ImposiumEvents';
import MessageConsumer from './MessageConsumer';

import {errorHandler} from './Helpers';

export class Events {
	public static EXPERIENCE_CREATED:string = 'experienceCreated';
	public static UPLOAD_PROGRESS:string = 'uploadProgress';
	public static GOT_STORY:string = 'gotStory';
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
		'gotStory',
		'gotExperience',
		'gotScene',
		'gotMessage',
		'onError'
	];

	private messageConsumer:MessageConsumer;

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
			if (GARegExp.test(trackingId)) {
				Analytics.setup(trackingId);

				this.pageView();
				window.addEventListener('popstate', () => this.pageView());

				if (playerRef) {
					VideoPlayer.setup(playerRef);
				}
			} else {
				throw new Error(`Tracking ID ${trackingId} is not a valid Google Analytics property.`);
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Sets a callback for an event
	 */
	public on = (eventName:string, callback:any):void => {
		const {validEvents} = ImposiumClient;

		try {
			if (~validEvents.indexOf(eventName)) {
				ImposiumEvents[eventName] = callback;
			} else {
				throw new Error(`${eventName} is not a valid Imposium event.`);
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

		if (~validEvents.indexOf(eventName)) {
			ImposiumEvents[eventName] = null;
		} else {
			validEvents.forEach((event) => {
				ImposiumEvents[event] = null;
			});
		}
	}

	/*
		Record page view metric
		TO DO: move to analytics
	 */
	private pageView = ():void => {
		Analytics.send({
			t: 'pageview', 
			dp: window.location.pathname
		});
	}

	/*
		Get story meta by ID
	 */
	public getStory = (storyId:string, success:(data:any)=>void, error:(res:any)=>void):void => {
		API.getStory(storyId)
		.then((data) => {
			success(data);
		})
		.catch((err) => {
			error(err);
		});
	}

	/*
		Get experience data
	 */
	public getExperience = (expId:string, success:(data:any)=>void, error:(res:any)=>void):void => {
		API.getExperience(expId)
		.then((data) => {
			success(data);
		})
		.catch((err) => {

			error(err);
		});
	}

	/*
		Create new experience & return relevant meta
	 */
	public createExperience = (storyId:string, inventory:any, render:boolean):void => {
		const {experienceCreated, uploadProgress, onError} = ImposiumEvents;

		if (experienceCreated) {
			const {postExperience} = API;

			postExperience(storyId, inventory, uploadProgress)
			.then((data) => {
				const {send} = Analytics;
				const {id} = data;

				send({
					t: 'event',
					ec: 'experience',
					ea: 'created',
					el: id
				});

				experienceCreated(data);
			})
			.catch((err) => {
				onError(err);
			});
		} else {
			// TO DO: Add error handling
		}
	}

	private call

	/*
		Open TDP connection with Imposium and get event based messages and/or
		video urls / meta
	 */
	public getVideo(job:any):void {
		const {gotScene} = ImposiumEvents;

		if (gotScene) {
			const {updateId, updateExperienceID} = VideoPlayer;

			if (updateId) {
				const {expId} = job;
				updateExperienceID(expId);
			}

			if (!this.messageConsumer) {
				this.messageConsumer = new MessageConsumer(job);		
			} else {
				this.messageConsumer.reconnect(job);
			}
		} else {
			// TO DO: add error handling
		}
	}
}

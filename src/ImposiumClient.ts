import "babel-polyfill";
import * as EventEmitter from 'event-emitter';
import Analytics from './Analytics';
import { MessageConsumer, Job } from './MessageConsumer';

import API from './API';
import VideoPlayer from './VideoPlayer';

export class events {
	public static STATUS:string = "imposium_status_update";
}

export class ImposiumClient {
	public static player:VideoPlayer = null;	
	public messageConsumer:MessageConsumer;
	private onError:(err)=>void;
	private onSuccess:(data)=>void;

	/*
		Initialize Imposium client
	 */
	constructor(token:string, config:any = null) {
		EventEmitter(this);

		API.setupAuth(token);
	}

	public setupAnalytics = (trackingId:string = '', playerRef:HTMLVideoElement = null):void => {
		if (RegExp(/^ua-\d{4,9}-\d{1,4}$/i).test(trackingId)) {
			Analytics.setup(trackingId);

			this.pageView();
			window.addEventListener('popstate', () => this.pageView());

			if (playerRef) {
				VideoPlayer.setup(playerRef);
			}
		} else {
			console.warn('The tracking ID provided was invalid.');
		}
	}

	/*
		Record page view metric
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
	public createExperience = (storyId:string, inventory:any, render:boolean, success:(data:any)=>void, error:(res:any)=>void, progress:any=null):void => {
		API.postExperience(storyId, inventory, progress)
		.then((data) => {
			const {id} = data;

			Analytics.send({
				t: 'event',
				ec: 'experience',
				ea: 'created',
				el: id
			});

			success(data);
		})
		.catch((err) => {
			error(err);
		});
	}

	/*
		Open TDP connection with Imposium and get event based messages and/or
		video urls / meta
	 */
	public getVideo(job:any, success:any, error:any):void {
		const jobSpec:Job = {
			'expId': job.expId, 
			'actId': job.actId, 
			'sceneId': job.sceneId,
			'onSuccess': success, 
			'onError': error
		};

		if (VideoPlayer.updateId) {
			const {expId} = job;
			VideoPlayer.updateExperienceID(expId);
		}

		if (!this.messageConsumer) {
			this.messageConsumer = new MessageConsumer(jobSpec, this);		
		} else {
			this.messageConsumer.setJob(jobSpec)
			this.messageConsumer.setContext(this);
			this.messageConsumer.reconnect();
		}
	}
}

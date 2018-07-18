import API from '../http/API';
import Stomp from './Stomp';
import ImposiumEvents from '../ImposiumEvents';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';

import {
	EnvironmentError,
	ModerationError,
	NetworkError
} from '../../scaffolding/Exceptions';

const settings = require('../../conf/settings.json').messageConsumer;

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
	private static readonly MAX_RETRIES:number = settings.maxReconnects;

	private static readonly EVENT_NAMES:any = {
		scene    : 'gotScene',
		message  : 'gotMessage',
		complete : 'actComplete'
	};

	private delegates:any = {
		start : null,
		route : (m:any) => this.routeMessageData(m),
		error : (e:any) => this.stompError(e)
	}

	private job:any = null;
	private env:string = '';
	private stomp:Stomp = null;
	private cacheVideo:(video:any, poster?:string)=>void = null;
	private retried:number = settings.minReconnects;

	constructor(job:any, env:string, startDelegate:(j:any)=>void, doCacheVideo:(video:any, poster:string)=>void = null) {
		this.job = job;
		this.env = env;
		this.delegates.start = startDelegate;

		if (doCacheVideo) {
			this.cacheVideo = doCacheVideo;
		}

		this.establishConnection();
	}

	public kill = ():Promise<null> => {
		const {stomp} = this;

		return new Promise((resolve) => {
			stomp.disconnectAsync()
			.then(() => {
				resolve();
			});
		});
	}

	private establishConnection = ():void => {
		const {job: {expId}, env, delegates} = this;
		this.stomp = new Stomp(expId, delegates, env);
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private routeMessageData = (msg:any):void => {
		const {emitMessageData, emitSceneData, stomp} = this;
		const {EVENT_NAMES: {scene, message, complete}} = MessageConsumer;

		try {
			const payload = JSON.parse(msg.body);

			switch(payload.event) {
				case complete:
					stomp.disconnectAsync().then(() => {});
					break;
				case message:
					emitMessageData(payload);
					break;
				case scene:
					emitSceneData(payload);
					break;
				default: break;
			}
		} catch (e) {
			const {job: {expId}} = this;
			const wrappedError = new NetworkError('messageParseFailed', expId, e);
			ExceptionPipe.trapError(wrappedError);
		}
	}

	/*
		Fire the gotMessage callback if the user is listening for this event
	 */
	private emitMessageData = (messageData:any):void => {
		const {statusUpdate} = ImposiumEvents;
		const {msg} = messageData;

		try {
			if (msg === settings.errorOverTcp) {
				const {job: {expId}} = this;
				throw new NetworkError('errorOverTcp', expId, null);
			}

			if (statusUpdate) {
				statusUpdate(messageData);
			} 
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Parses the experience data into a prop delivered via gotScene
	 */
	private emitSceneData = (experienceData:any):void => {
		const {gotExperience} = ImposiumEvents
		const rejected = (experienceData || {}).error;

		try {
			if (!rejected) {
				// Shorthand idioms for checking if required nested JSON data exists
				const sceneId = ((  experienceData || {}).sceneData || {}).id;
				const hasUrls = ((( experienceData || {}).output    || {})[sceneId] || {}).mp4Url;
				const isVideo = ((( experienceData || {}).sceneData || {}).type === settings.videoSceneKey);

				if (isVideo && hasUrls) {
					// Merge up the scene data and the experience ID 
					const {id, output} = experienceData;
					const sceneData = {...output[sceneId], experience_id: id};

					delete sceneData.id;
					gotExperience(sceneData);
				} else {
					const {job: {expId}} = this;
					throw new NetworkError('messageParseFailed', expId, null);
				}
			} else {
				throw new ModerationError('rejection');
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Called on Stomp errors
	 */
	private stompError = (e:any):void => {
		const {retried, job: {expId}, stomp} = this;
		const {wasClean} = e;

		if (!e.wasClean) {
			++this.retried;

			if (retried < MessageConsumer.MAX_RETRIES) {
				ExceptionPipe.logWarning('network', 'tcpFailure');

				stomp.disconnectAsync()
				.then(() => {
					this.establishConnection();
				});
			} else {
				const wrappedError = new NetworkError('tcpFailure', expId, e);
				ExceptionPipe.trapError(wrappedError);
			}
		}
	}
}
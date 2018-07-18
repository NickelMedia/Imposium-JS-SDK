import API from '../http/API';
import Stomp from './Stomp';
import VideoPlayer from '../../video/VideoPlayer';
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

	private stompDelegates:any = {
		start : ()      => this.startConsuming(),
		route : (m:any) => this.routeMessageData(m),
		error : (e:any) => this.stompError(e)
	}

	private env:string = '';
	private experienceId:string = null;
	private clientDelegates:any = null;
	private stomp:Stomp = null;
	private player:VideoPlayer;
	private retried:number = settings.minReconnects;

	constructor(env:string, experienceId:string, clientDelegates:any, player:VideoPlayer) {
		this.env = env;
		this.experienceId = experienceId;
		this.clientDelegates = clientDelegates;

		if (player) {
			this.player = player;
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

	/*
		Initializes a stomp connection object
	 */
	private establishConnection = ():void => {
		const {experienceId, env, stompDelegates} = this;
		this.stomp = new Stomp(experienceId, stompDelegates, env);
	}

	/*
		Invoke delegate which starts message queueing on Imposium servers
	 */
	private startConsuming = ():void => {
		const {experienceId, clientDelegates: {start}} = this;
		start(experienceId);
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private routeMessageData = (msg:any):void => {
		const {EVENT_NAMES: {scene, message, complete}} = MessageConsumer;
		const {stomp, experienceId, clientDelegates: {onError}} = this;


		try {
			const payload = JSON.parse(msg.body);

			switch(payload.event) {
				case complete:
					stomp.disconnectAsync().then(() => {});
					break;
				case message:
					this.emitMessageData(payload);
					break;
				case scene:
					this.emitSceneData(payload);
					break;
				default: break;
			}
		} catch (e) {
			const wrappedError = new NetworkError('messageParseFailed', experienceId, e);
			ExceptionPipe.trapError(wrappedError, onError);
		}
	}

	/*
		Fire the gotMessage callback if the user is listening for this event
	 */
	private emitMessageData = (messageData:any):void => {
		const {experienceId, clientDelegates: {statusUpdate, onError}} = this;
		const {msg} = messageData;

		try {
			if (msg === settings.errorOverTcp) {
				throw new NetworkError('errorOverTcp', experienceId, null);
			}

			if (statusUpdate) {
				statusUpdate(messageData);
			} 
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Parses the experience data into a prop delivered via gotScene
	 */
	private emitSceneData = (experienceData:any):void => {
		const {experienceId, clientDelegates: {gotExperience, onError}} = this;
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
					const sceneData = {...output[sceneId], experience_id: id}
					delete sceneData.id;

					// START STUB
					const {player} = this;
					const {videoUrls: {mp4_720}, experience_id} = sceneData;

					if (player) {
						player.experienceGenerated({
							id       : experience_id,
							url      : mp4_720,
							format   : 'mp4',
							width    : 720,
							height   : 1080,
							filesize : 1000000,
							duration : 4,
							rate     : 23.93
						}, '');
					}
					// END STUB

					if (gotExperience) {
						gotExperience(sceneData);
					}
				} else {
					throw new NetworkError('messageParseFailed', experienceId, null);
				}
			} else {
				throw new ModerationError('rejection');
			}
		} catch (e) {
			ExceptionPipe.trapError(e, onError);
		}
	}

	/*
		Called on Stomp errors
	 */
	private stompError = (e:any):void => {
		const {retried, experienceId, stomp, clientDelegates: {onError}} = this;
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
				const wrappedError = new NetworkError('tcpFailure', experienceId, e);
				ExceptionPipe.trapError(wrappedError, onError);
			}
		}
	}
}
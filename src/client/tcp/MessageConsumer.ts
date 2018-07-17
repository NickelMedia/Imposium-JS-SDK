import API from '../http/API';
import Stomp from './Stomp';
import ImposiumEvents from '../ImposiumEvents';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';

import {
	EnvironmentError,
	ModerationError,
	NetworkError
} from '../../scaffolding/Exceptions';

import {
	warnHandler,
	formatError,
	errorHandler
} from '../../scaffolding/Helpers';

const warnings = require('../../conf/warnings.json').messageConsumer;
const settings = require('../../conf/settings.json').messageConsumer;

// Distinct message keys to listen for over RabbitMQ
class Messages {
	public static readonly ACT_COMPLETE:string = 'actComplete';
	public static readonly GOT_MESSAGE:string = 'gotMessage';
	public static readonly GOT_SCENE:string = 'gotScene';
}

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
	// Current imposium render job
	public static job:any = null;
	
	// Settings for retrying rabbitMQ connections
	private static readonly maxRetries:number = settings.maxReconnects;
	private static retried:number = settings.minReconnects;

	/*
		Initialize WebStomp
	 */
	public static init = (job:any):void => {
		const {attachStompEvents} = MessageConsumer;
		const {expId} = job;

		if (!Stomp.eventsBound) {
			attachStompEvents();
		}

		MessageConsumer.job = job;
		Stomp.init(expId);
	}

	/*
		Kills the current stomp connection and initates a new connection on closure
	 */
	public static reconnect = (job:any):void => {
		Stomp.disconnectAsync()
		.then(() => {
			MessageConsumer.init(job);	
		}).catch((e) => {
			const {job: {expId}} = MessageConsumer;
			const wrappedError = new NetworkError('tcpFailure', expId, e);
			ExceptionPipe.routeError(wrappedError);
		});
	}

	/*
		Bind the web stomp handlers on first job
	 */
	private static attachStompEvents = ():void => {
		const {invokeStreaming, routeMessageData, stompError} = MessageConsumer;

		Stomp.setEvents(
			()        => invokeStreaming(),
			(msg:any) => routeMessageData(msg),
			(e:any)   => stompError(e)
		);
	}

	/*
		Initiates the message queueing process on Imposium
	 */
	private static invokeStreaming = ():void => {
		const {job: {expId, sceneId, actId}} = MessageConsumer;

		API.invokeStream(expId, sceneId, actId)
		.catch((e) => {
			const wrappedError = new NetworkError('httpFailure', expId, e);
			ExceptionPipe.routeError(wrappedError);
		});
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private static routeMessageData = (msg:any):void => {
		const {ACT_COMPLETE, GOT_MESSAGE, GOT_SCENE} = Messages;
		const {emitMessageData, emitSceneData} = MessageConsumer;

		try {
			const payload = JSON.parse(msg.body);

			switch(payload.event) {
				case ACT_COMPLETE:
					Stomp.disconnect();
					break;
				case GOT_MESSAGE:
					emitMessageData(payload);
					break;
				case GOT_SCENE:
					emitSceneData(payload);
					break;
				default: break;
			}
		} catch (e) {
			const {job: {expId}} = MessageConsumer;
			const wrappedError = new NetworkError('messageParseFailed', expId, e);
			ExceptionPipe.routeError(wrappedError);
		}
	}

	/*
		Fire the gotMessage callback if the user is listening for this event
	 */
	private static emitMessageData = (messageData:any):void => {
		const {statusUpdate} = ImposiumEvents;
		const {msg} = messageData;

		try {
			if (msg === settings.errorOverTcp) {
				const {job: {expId}} = MessageConsumer;
				throw new NetworkError('errorOverTcp', expId, null);
			}

			if (statusUpdate) {
				statusUpdate(messageData);
			} 
		} catch (e) {
			ExceptionPipe.routeError(e);
		}
	}

	/*
		Parses the experience data into a prop delivered via gotScene
	 */
	private static emitSceneData = (experienceData:any):void => {
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
					const {job: {expId}} = MessageConsumer;
					throw new NetworkError('messageParseFailed', expId, null);
				}
			} else {
				throw new ModerationError('rejection');
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Called on Stomp errors
	 */
	private static stompError = (e:any):void => {
		const {retried, maxRetries, job: {expId}} = MessageConsumer;
		const {wasClean} = e;

		if (!e.wasClean) {
			++MessageConsumer.retried;

			if (retried < maxRetries) {
				const {tcpFailure} = warnings;

				Stomp.reconnect(expId);
				warnHandler(formatError(tcpFailure, retried + 1));
			} else {
				MessageConsumer.retried = settings.min_reconnects;

				const wrappedError = new NetworkError('tcpFailure', expId, e);
				ExceptionPipe.routeError(wrappedError);
			}
		}
	}
}
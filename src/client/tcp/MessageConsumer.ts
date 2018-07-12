import API from '../http/API';
import Stomp from './Stomp';
import ImposiumEvents from '../../scaffolding/Events';
import {warnHandler, formatError, errorHandler} from '../../scaffolding/Helpers';

const errors = require('../../conf/errors.json').message_consumer;
const warnings = require('../../conf/warnings.json').message_consumer;
const settings = require('../../conf/settings.json').message_consumer;

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
		}).catch(e => {
			errorHandler(e);
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
			errorHandler(e)
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
			errorHandler(e);
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
				const {server_failed} = errors;
				throw new Error(server_failed);
			}

			if (statusUpdate) {
				statusUpdate(messageData);
			} 
		} catch (e) {
			errorHandler(e);
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
					const {parse_failed} = errors;
					throw new Error(formatError(parse_failed, JSON.stringify(experienceData, null, 2)));
				}
			} else {
				const {rejected} = errors;
				throw new Error(rejected);
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
				const {tcp_failure} = warnings;

				Stomp.reconnect(expId);
				warnHandler(formatError(tcp_failure, retried + 1));
			} else {
				MessageConsumer.retried = settings.min_reconnects;
				errorHandler(e);
			}
		}
	}
}
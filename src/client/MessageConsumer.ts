import API from './API';
import Stomp from './Stomp';
import ImposiumEvents from './ImposiumEvents';
import {warnHandler, formatError, errorHandler} from '../util/Helpers';

const errors = require('../conf/errors.json').message_consumer;
const warnings = require('../conf/warnings.json').message_consumer;

class Messages {
	public static readonly ACT_COMPLETE:string = 'actComplete';
	public static readonly GOT_MESSAGE:string = 'gotMessage';
	public static readonly GOT_SCENE:string = 'gotScene';
}

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
	// Current imposium render job
	public static job:any = null;
	
	private static readonly maxRetries:number = 5;
	private static retried:number = 0;

	/*
		Initialize WebStomp
	 */
	public static init(job:any):void {
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
	public static reconnect(job:any):void {
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
	private static invokeStreaming():void {
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
	private static routeMessageData(msg:any):void {
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
	private static emitMessageData(messageData:any):void {
		const {gotMessage} = ImposiumEvents;
		const {msg} = messageData;

		try {
			if (msg === 'Server failure.') {
				const {server_failed} = errors;
				throw new Error(server_failed);
			}

			if (gotMessage) {
				gotMessage(messageData);
			} 
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Parses the experience data into a prop delivered via gotScene
	 */
	private static emitSceneData(experienceData:any):void {
		const {gotScene} = ImposiumEvents
		const rejected = (experienceData || {}).error;

		try {
			if (!rejected) {
				// Shorthand idioms for checking if required nested JSON data exists
				const sceneId = ((  experienceData || {}).sceneData || {}).id;
				const hasUrls = ((( experienceData || {}).output    || {})[sceneId] || {}).mp4Url;
				const isVideo = ((( experienceData || {}).sceneData || {}).type === 'VideoScene01');

				if (isVideo && hasUrls) {
					// Merge up the scene data and the experience ID 
					const {id, output} = experienceData;
					const sceneData = {...output[sceneId], experience_id: id};

					delete sceneData.id;
					gotScene(sceneData);
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
	private static stompError(e:any):void {
		const {retried, maxRetries, job: {expId}} = MessageConsumer;
		const {wasClean} = e;

		if (!e.wasClean) {
			++MessageConsumer.retried;

			if (retried < maxRetries) {
				const {tcp_failure} = warnings;

				Stomp.reconnect(expId);
				warnHandler(formatError(tcp_failure, retried));
			} else {
				errorHandler(e);
			}
		}
	}
}
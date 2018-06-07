import API from './API';
import Stomp from './Stomp';
import ImposiumEvents from './ImposiumEvents';

import {errorHandler} from './Helpers';

class Messages {
	public static readonly ACT_COMPLETE:string = 'actComplete';
	public static readonly GOT_MESSAGE:string = 'gotMessage';
	public static readonly GOT_SCENE:string = 'gotScene';
}

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
	private job:any = null;
	private retried:number = 0;
	private maxRetries:number = 5;

	public constructor(job:any) {
		this.job = job;
		this.init();
	}

	/*
		Initialize WebStomp
	 */
	public init():void {
		const {expId} = this.job;

		Stomp.setEvents(
			()        => this.invokeStreaming(),
			(msg:any) => this.routeMessageData(msg),
			(e:any)   => this.stompError(e)
		);

		Stomp.init(expId);
	}

	/*
		Kills the current stomp connection and initates a new connection on closure
	 */
	public reconnect(job:any):void {
		this.job = job;

		Stomp.disconnectAsync()
		.then(() => {
			this.init();	
		}).catch(e => {
			errorHandler(e);
		});
	}

	/*
		Initiates the message queueing process on Imposium
	 */
	private invokeStreaming():void {
		const {expId, sceneId, actId} = this.job;

		API.invokeStream(expId, sceneId, actId)
		.catch((e) => {
			errorHandler(e)
		});
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private routeMessageData(msg:any):void {
		try {
			const payload = JSON.parse(msg.body);

			const {
				ACT_COMPLETE,
				GOT_MESSAGE,
				GOT_SCENE
			} = Messages;

			switch(payload.event) {
				case ACT_COMPLETE:
					// Kills the Stomp connection without handlers
					Stomp.disconnect();
					break;
				case GOT_MESSAGE:
					this.emitMessageData(payload);
					break;
				case GOT_SCENE:
					this.emitSceneData(payload);
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
	private emitMessageData(messageData:any):void {
		const {gotMessage} = ImposiumEvents;
		const {msg} = messageData;

		try {
			if (msg === 'Server failure.') {
				throw new Error('Something went wrong processing your experience. Try reviewing your configuration.');
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
	private emitSceneData(experienceData:any):void {
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
					throw new Error(`Imposium failed to prepare your experience:\n${JSON.stringify(experienceData, null, 2)}`);
				}
			} else {
				throw new Error('Your experience was rejected.');
			}
		} catch (e) {
			errorHandler(e);
		}
	}

	/*
		Called on Stomp errors
	 */
	private stompError(e:any):void {
		const {wasClean} = e;

		if (!e.wasClean) {
			++this.retried;

			if (this.retried < this.maxRetries) {
				const {expId} = this.job;

				Stomp.reconnect(expId);
				console.warn(`Stomp over TCP failed (${this.retried}): Attempting to reconnect...`);
			} else {
				errorHandler(e);
			}
		}
	}
}
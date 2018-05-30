import {events} from './ImposiumClient';
import Stomp from './Stomp';
import API from './API';

export interface Job {
	expId: string;
	actId: string;
	sceneId: string;
	onSuccess: any;
	onError: any;
}

export class MessageConsumer {
	public delegate:any;
	private job:Job;
	private retried:number = 0;
	private maxRetries:number = 5;

	public constructor(job:Job, delegate:any) {
		this.job = job;
		this.delegate = delegate;

		this.init();
	}

	/*
		Copy the job object passed in
	 */
	public setJob(job:Job):void {
		this.retried = 0;
		this.job = { ...job };
	}

	/*
		Set the context for the event listener
	 */
	public setContext(ctx:any):void {
		this.delegate = ctx;
	}

	/*
		Initialize WebStomp
	 */
	public init():void {
		const {expId} = this.job;

		Stomp.setHandlers(
			() => {this.invokeStreaming()},
			(msg:any) => this.routeMessageData(msg),
			(e:any) => this.streamError(e)
		);

		Stomp.init(expId);
	}

	/*
		Sets up a websocket for the experience
	 */
	public reconnect():void {
		Stomp.kill()
		.then(() => {
			this.init();	
		}).catch(err => {
			console.error('something went wrong killing webstomp.');
		});
	}

	/*
		Call the event processor api route to let the server know
		it should begin to publish messages to queue: expId
	 */
	private invokeStreaming():void {
		const {expId, sceneId, actId} = this.job;

		API.invokeStream(expId, sceneId, actId)
		.catch((err) => {
			this.job.onError(err);
		});
	}

	private *observer() {
		yield null;
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private routeMessageData(msg:any):void {
		try {
			const payload = JSON.parse(msg.body);

			switch(payload.event) {
				case 'actComplete':
					Stomp.disconnect();
					break;
				case 'gotMessage':
					this.gotMessage(payload);
					break;
				case 'gotScene':
					this.gotScene(payload);
					break;
				default: break;
			}
		} catch (e) {
			// TO DO : propagate err
		}
	}

	/*
		Propagates event messages via event bus
	 */
	private gotMessage(payload:any):void {
		if (payload) this.delegate.emit(events.STATUS, payload);
	}

	/*
		Parse the scene data and propagate if there aren't errors.
		If any error occurs, propagate the error.
	 */
	private gotScene(payload:any):void {
		const {onSuccess, onError} = this.job;

		// TO DO: once the client architecture is decided on, we can get rid of this check and never call 
		// on the message consumer when callbacks aren't set. instead we should alert the user they they
		// set a null reference or that they didn't set the callback at all.
		if (onSuccess && onError) {
			const rejected = (payload || {}).error;

			if (!rejected) {
				// Shorthand idioms for checking if required nested JSON data exists
				const isVideo = (((payload || {}).sceneData || {}).type === 'VideoScene01');
				const sceneId = ((payload || {}).sceneData || {}).id;
				const hasUrls = (((payload || {}).output || {})[sceneId] || {}).mp4Url;

				if (isVideo && hasUrls) {
					const {id, output} = payload;

					// Merge the scene data & experience ID
					const sceneData = {
						...output[sceneId],
						experience_id: id
					};

					onSuccess(sceneData);
				} else {
					onError(payload);
				}
			} else {
				onError(new Error(rejected));
			}
		}
	}

	/*
		Invoked if there's an err in the WebStomp client. Retries n times
		based on config. 
	 */
	private streamError(err:any):void {
		if (!err.wasClean) {
			++this.retried;

			if (this.retried < this.maxRetries) {
				const {expId} = this.job;
				console.error(`WebStomp error: (retrying: ${this.retried})`, err);
				Stomp.reconnect(expId);
			} else {
				this.job.onError(err);
			}
		}
	}
}
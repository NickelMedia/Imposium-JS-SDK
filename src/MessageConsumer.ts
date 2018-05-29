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
			(msg:any) => this.router(msg),
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

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private router(msg:any):void {
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

		if(payload.sceneData){
			if(payload.sceneData.type == 'VideoScene01'){
				if(payload.output){
					if (payload.output[payload.sceneData.id].mp4Url) {
						let sceneData;

						if (payload.hasOwnProperty('output')) {
							if (typeof payload.output != 'undefined') {

								for (let key in payload.output) {
									sceneData = payload.output[key];
									sceneData.experience_id = payload.id;
									break;
								}
							}
						}

						if (sceneData != null) {
							if (this.job.onSuccess) {
								this.job.onSuccess(sceneData);
							}
						} else {
							if (this.job.onError) {
								this.job.onError(sceneData);
							}
						}			
					}else{
						if (this.job.onError){
							this.job.onError(payload);
						}
					}

				}else{
					if (this.job.onError){
						this.job.onError(payload);
					}
				}
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
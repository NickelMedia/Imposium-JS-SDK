import { events } from './ImposiumClient';
import { StompClient, StompConfig } from './StompClient';

export interface Job {
	expId: string;
	actId: string;
	sceneId: string;
	onSuccess: any;
	onError: any;
}

export class MessageConsumer {
	public delegate:any;
	private api:any;
	private job:Job;
	private stompClient:StompClient;
	private onMessage:(msg:any)=>void;
	private onError:(err:any)=>void;
	private streamErr:(err:any)=>void;
	private retried:number = 0;
	private maxRetries:number = 3;

	public constructor(job:Job, config:StompConfig, delegate:any, api:any) {
		this.job = job;
		this.delegate = delegate;
		this.api = api;

		this.init(config);
	}

	/*
		Copy the job object passed in
	 */
	public setJob(job:Job):void {
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
	public init(config:StompConfig):void {
		config.onError = this.onError = (e:any) => this.streamError(e);
		config.onMessage = this.onMessage = (msg:any) => this.router(msg);
		config.onConnect = ()=>{
			this.invokeStreaming();
		};
		this.stompClient = new StompClient(config, this.job.expId);
	}

	/*
		Sets up a websocket for the experience
	 */
	public reconnect(config:StompConfig):void {
		this.stompClient.kill()
		.then(() => {
			this.init(config);	
		}).catch(err => {
			console.error('something went wrong killing webstomp.');
		});
	}

	/*
		Call the event processor api route to let the server know
		it should begin to publish messages to queue: expId
	 */
	private invokeStreaming():void {
		const endpoint = `/experience/${this.job.expId}/trigger-event`,
			body = {
				exp_id: this.job.expId,
				scene_id: this.job.sceneId,
				act_id: this.job.actId
			};

		this.api.post(endpoint, body)
		.then(res => {
			if (!res.ok) this.job.onError(res.data);
		}).catch(err => {
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
				this.stompClient.disconnect();
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
				console.error(`WebStomp error: (retrying: ${this.retried})`, err);
				this.stompClient.reconnect();
			} else {
				this.job.onError(err);
			}
		}
	}
}
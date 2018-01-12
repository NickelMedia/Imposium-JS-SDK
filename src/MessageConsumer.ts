import { events } from './ImposiumClient';
import { StompClient, StompConfig } from './StompClient';

/**
 * Encapsulates the specification for a job
 */
export interface Job {
	expId: string;
	actId: string;
	sceneId: string;
	onSuccess: any;
	onError: any;
}

/**
 * Encapsulates WebStomp consumption functionality
 */
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

	/**
	 * Set job spec and parent context then initialize WebStomp
	 * @param {Job}         job      current job spec
	 * @param {any}         delegate parent scope
	 * @param {StompConfig} config   WebStomp config
	 */
	public constructor(job:Job, config:StompConfig, delegate:any, api:any) {
		this.job = job;
		this.delegate = delegate;
		this.api = api;

		this.init(config);
	}

	/**
	 * Sets a new job object
	 * @param {Job} job job spec data
	 */
	public setJob(job:Job):void {
		this.job = { ...job };
	}

	/**
	 * Sets parent context on new jobs
	 * @param {any} ctx context inherited from parent
	 */
	public setContext(ctx:any):void {
		this.delegate = ctx;
	}

	/**
	 * Set up a new StompClient object
	 * @param {StompConfig} config object containing WebStomp config
	 */
	public init(config:StompConfig):void {
		config.onError = this.onError = (e:any) => this.streamError(e);
		config.onMessage = this.onMessage = (msg:any) => this.router(msg);
		config.onConnect = ()=>{
			this.invokeStreaming();
		};
		this.stompClient = new StompClient(config, this.job.expId);
	}

	/**
	 * Sets up a new websocket
	 * @param {StompConfig} config object containing WebStomp config
	 */
	public reconnect(config:StompConfig):void {
		this.stompClient.kill()
		.then(() => {
			this.init(config);	
		}).catch(err => {
			console.error('something went wrong killing webstomp.');
		});
	}

	/**
	 * Call the event processor api route to let the server know
	 * it should begin to publish messages to queue: expId
	 */
	private invokeStreaming():void {
		// Calling this route with the following params will initiate streaming.
		// Messages will be sent to RabbitMQ from the backend as processing occurs
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

	/**
	 * Route incoming payloads
	 * @param {any} msg WebStomp message object
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

	/**
	 * Invoked on 'gotMessage' events, used for capturing job
	 * status updates
	 * @param {any} payload message body payload
	 */
	private gotMessage(payload:any):void {
		if (payload) this.delegate.emit(events.STATUS, payload);
	}

	/**
	 * Invoked on 'gotScene' events, used for parsing scene data
	 * and invoking callbacks to the UI
	 * @param {any} payload message body payload
	 */
	private gotScene(payload:any):void {
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
				if(this.job.onError){
					this.job.onError(payload);
				}
			}

		}else{
			if(this.job.onError){
				this.job.onError(payload);
			}
		}
	}

	/**
	 * Handle WebStomp errors, handle reconnection
	 * @param {any} err WebStomp client error 
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
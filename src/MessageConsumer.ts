import { events } from './ImposiumClient';
import { StompClient, StompConfig } from './StompClient';

/**
 * Encapsulates the specification for a job
 */
export interface Job {
	expId: string;
	actId: string;
	onSuccess: any;
	onError: any;
}

/**
 * Encapsualtes WebStomp consumption functionality
 */
export class MessageConsumer {
	public delegate:any;
	private api:any;
	private job:Job;
	private stompClient:StompClient;
	private onMessage:(msg:any)=>void;
	private onError:(err:any)=>void;

	/**
	 * Set job spec and parent context then initialize WebStomp
	 * @param {Job}         job      current job spec
	 * @param {any}         delegate parent scope
	 * @param {StompConfig} config   WebStomp config
	 */
	public constructor(job:Job, delegate:any, api:any, config:StompConfig) {
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
		config.onError = this.onError = (e) => this.errorHandler(e);
		config.onMessage = this.onMessage = (msg) => this.router(msg);

		this.stompClient = new StompClient(config, this.job.expId);

		this.startEventProcessor();
	}

	/**
	 * Sets up a new websocket
	 * @param {StompConfig} config object containing WebStomp config
	 */
	public reconnect(config:StompConfig):void {
		this.stompClient.kill();
		this.init(config);
	}

	/**
	 * Call the event processor api route to let the server know
	 * it should begin to publish messages to queue: expId
	 */
	private startEventProcessor():void {
		const body = {
			'expId': this.job.expId,
			'actId': this.job.actId
		};

		this.api.post(`/experience/${this.job.expId}/trigger-event`, body)
		.then(res => {
			if (!res.ok) console.error(res.data);
		});
	}

	/**
	 * Route incoming payloads
	 * @param {any} msg WebStomp message object
	 */
	private router(msg:any):void {
		const payload = JSON.parse(msg.body);

		switch(payload.event) {
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
	 * Handle WebStomp errors, handle reconnection
	 * @param {any} err WebStomp client error 
	 */
	private errorHandler(err:any):void {
		if (err.wasClean) {
			console.log('Stomp connection closed normally: ', err);
		} else {
			console.error('Stomp connection closed abruptly: ', err);
			// this.stompClient.reconnect();
		}
	}

	/**
	 * Invoked on 'gotMessage' events, used for capturing job
	 * status updates
	 * @param {any} data message body payload
	 */
	private gotMessage(data:any):void {
		const update = data;
		if (update) this.delegate.emit(events.STATUS, update);
	}

	/**
	 * Invoked on 'gotScene' events, used for parsing scene data
	 * and invoking callbacks to the UI
	 * @param {any} data message body payload
	 */
	private gotScene(data:any):void {
		let sceneData = null;

		if (data.hasOwnProperty('output')) {
			if (typeof data.output != 'undefined') {

				for (let key in data.output) {
					sceneData = data.output[key];
					sceneData.experience_id = data.id;
					break;
				}
			}
		}

		if (sceneData != null) {
			if (this.job.onSuccess) {
				this.delegate = () => this.job.onSuccess(sceneData);
				this.delegate();
			}
		} else {
			if (this.job.onError) {
				this.delegate = () => this.job.onError(sceneData);
				this.delegate();
			}
		}
	}
}
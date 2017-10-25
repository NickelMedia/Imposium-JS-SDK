import { events } from './ImposiumClient';
import StompClient from './StompClient';

export default class VideoRetriever {
	// Class level params
	public job:any;
	public delegate:any;

	private stompClient:any;
	private onError:any;
	private onMessage:any;

	constructor(job:any, delegate:any, config:any) {
		this.job = job;
		this.delegate = delegate;

		this.init(config);
	}

	/**
	 * Set up a new StompClient object
	 * @param {obj} config object containing WebStomp config
	 */
	init(config:any) {
		config.exchangeRoute += `${this.job.expId}`;
		config.onError = this.onError = (e) => this.errorHandler(e);
		config.onMessage = this.onMessage = (msg) => this.router(msg);

		this.stompClient = new StompClient(config);
	}

	/**
	 * Updates relevant job details
	 * @param {obj} data object containing job details
	 */
	setJob(job:any) {
		this.job = job;
	}

	/**
	 * Route incoming payloads
	 * @param {obj} msg WebStomp message object
	 */
	router(msg:any) {
		console.log(msg);
		
		const body = JSON.parse(msg.body);

		switch(body.event) {
			case 'gotMessage':
				this.gotMessage(body.data);
				break;
			case 'gotScene':
				this.gotScene(body.data);
				break;
			default: break;
		}
	}

	/**
	 * Handle WebStomp errors, handle reconnection
	 * @param {obj} err WebStomp client error 
	 */
	errorHandler(err:any) {
		if (err.wasClean) {
			console.log('Stomp connection closed normally: ', err);
		} else {
			console.error('Stomp connection closed abruptly: ', err);
			this.stompClient.reconnect();
		}
	}

	/**
	 * Invoked on 'gotMessage' events, used for capturing job
	 * status updates
	 * @param {obj} data message body payload
	 */
	public gotMessage(data) {
		const update = data;

		if (update) this.delegate.emit(events.STATUS, update);
	}

	/**
	 * Invoked on 'gotScene' events, used for parsing scene data
	 * and invoking callbacks to the UI
	 * @param {obj} data message body payload
	 */
	public gotScene(data) {
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
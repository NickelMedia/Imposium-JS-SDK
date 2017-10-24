import { events } from './ImposiumClient';
import * as io from 'socket.io-client';
import * as webstomp from 'webstomp-client';

export default class VideoRetriever {
	// Class level params
	public data:any;
	public delegate:any;

	// Stomp/MQ related config & properties
	private stompClient:webstomp.Client;
	private stompConfig:any = {
		url: 'ws://127.0.0.1:15674/ws',
		subscription: '',
		username: 'guest',
		password: 'guest'
	};

	// Socket.io related properties
	public socket:any;
	public waitingForVideo:boolean = false;

	private initialConnect:boolean = true;
	private error:boolean = false;
	private renderTimeout:any;
	private connectionTimeout:any;

	// Context placeholders
	private onSocketError:any;
	private onConnected:any;
	private onScene:any;
	private onMessage:any;
	private onSuccess:any;
	private stompOnConnect:any;
	private stompOnMessage:any;
	private stompOnError:any;

	constructor(data, delegate) {
		this.data = data;
		this.delegate = delegate;

		this.stompConfig.subscription = this.data.exp;
		this.stompClient = webstomp.client(this.stompConfig.url);

		clearTimeout(this.connectionTimeout);
		this.connectionTimeout = setTimeout(this.onSocketError = (e) => this.socketError(e), 5000);

		this.createSocket();
	}

	/**
	 * Subscribes to stomp client relevant job queue
	 */
	stompConnectionHandler() {
		this.stompClient.subscribe
		(
			this.stompConfig.subscription,
			this.stompOnMessage = (msg) => this.stompMessageHandler(msg)
		);
	}

	/**
	 * Route incoming stomp message payload 
	 * @param {Obj} msg rabbitMQ/stomp message object
	 */
	stompMessageHandler(msg:any) {
		const body = JSON.parse(msg.body);

		switch(body.event) {
			case 'error':
				this.socketError(body.data);
				break;
			case 'gotMessage':
				this.updateMessage(body.data);
				break;
			case 'gotScene':
				this.gotScene(body.data);
				break;
			default: break;
		}
	}

	stompErrorHandler(err) {
		console.log('Stomp err: ', err);
	}

	/**
	 * Sets up a client-side Socket.io instance and prepares event
	 * handlers
	 */
	private createSocket() {
		this.socket = io.connect(
			this.data.socket, 
			{
				'transports': ['websocket', 'polling']
			}
		);

		if (this.socket.connected) {
			this.connected();
		} else {
			this.socket.on('connect', this.onConnected = () => this.connected());
		}

		this.socket.on('error', this.onSocketError = (e) => this.socketError(e));
		this.socket.on('gotScene', this.onScene = (e) => this.gotScene(e));
		this.socket.on('gotMessage', this.onMessage = (e) => this.updateMessage(e));
	}

	/**
	 * Socket.io connection established, start emitting events
	 */
	private connected() {
		clearTimeout(this.connectionTimeout);
		this.socket.removeListener('connect', this.onConnected = () => this.connected());

		if (this.initialConnect) {
			this.startEventProcessor();	
			this.initialConnect = false;	
		}		
	}

	/**
	 * Start emitting data via Socket.io
	 */
	public startEventProcessor() {
		const data = {
			'expId': this.data.exp, 
			'actId': this.data.act, 
			'trigger': ''
		};

		clearTimeout(this.renderTimeout);

		// Start waiting for messages & render data
		this.stompClient.connect
		(
			this.stompConfig.username,
			this.stompConfig.password,
			this.stompOnConnect = () => this.stompConnectionHandler(),
			this.stompOnError = (e) => this.stompErrorHandler(e)
		);

		// Start the event chain via Socket.io
		this.socket.emit('sendSocket', data);
		this.waitingForVideo = true;
	}

	/**
	 * Updates the UI with the video transfer / processing status
	 * @param {Obj} data Contains status message and uuid for job
	 */
	public updateMessage(data) {
		const update = data;

		if (update) this.delegate.emit(events.STATUS, update);
	}

	public reconnect(id) {
		if (!this.error) {
			this.data.exp = id;
			this.startEventProcessor();
		} else {
			if (this.data.onError) {
				this.delegate = (e) => this.data.onError(e);
				this.delegate();
			}
		}
	}	

	/**
	 * Called on gotScene event, parses relevant scene data and
	 * propagates an onSuccess or onError event
	 * @param {obj} data Imposium scene data
	 */
	public gotScene(data) {
		let sceneData = null;
		this.waitingForVideo = false;

		clearTimeout(this.renderTimeout);

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
			if (this.data.onSuccess) {
				this.delegate = () => this.data.onSuccess(sceneData);
				this.delegate();
			}
		} else {
			if (this.data.onError) {
				this.delegate = () => this.data.onError(sceneData);
				this.delegate();
			}
		}
	}

	/**
	 * Propagates an error event on Socket.io exceptions
	 * @param {String} invId Inventory ID
	 */
	private socketError(invId) {
		this.error = true;

		clearTimeout(this.connectionTimeout);
		clearTimeout(this.renderTimeout);

		if (this.data.onError) {
			this.delegate = () => this.data.onError(invId);
			this.delegate();
		}	
	}

	/**
	 * Force kill the Socket.io connection
	 */
	public killSocket() {
		if (this.socket) {
			this.socket.removeAllListeners();
			this.socket.disconnect();
			this.socket = null;	
		}
	}
}
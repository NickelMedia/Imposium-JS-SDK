import { events } from './ImposiumClient';
import * as io from 'socket.io-client';

export default class SocketHandler {

	public waitingForVideo:boolean = false;
	public socket:any;

	private initialConnect:boolean = true;
	private error:boolean = false;
	private renderTimeout:any;
	private connectionTimeout:any;

	private onSocketError:any;
	private onConnected:any;
	private onScene:any;
	private onMessage:any;
	private onSuccess:any;

	public data:any;
	public delegate:any;

	constructor(data, delegate) {

		this.data = data;
		this.delegate = delegate;

		clearTimeout(this.connectionTimeout);
		this.connectionTimeout = setTimeout(this.onSocketError = (e) => this.socketError(e), 5000);

		this.createSocket();
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
			this.data.onError(invId);
		}	
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
	 * Updates the UI with the video transfer / processing status
	 * @param {Obj} data Contains status message and uuid for job
	 */
	public updateMessage(data) {

		const update = data;

		if(update){
			if(update.id == this.data.exp){
				this.delegate.emit(events.STATUS, update);
			}
		}
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

	public reconnect(id) {
		if (!this.error) {
			this.data.exp = id;
			this.startEventProcessor();
		} else {
			if (this.data.onError) {
				this.data.onError(id);
			}
		}
	}	

	/**
	 * Start emitting data via Socket.io
	 */
	public startEventProcessor() {

		clearTimeout(this.renderTimeout);

		var data = {
			'expId': this.data.exp, 
			'actId': this.data.act,
			'trigger': ''
		};

		this.socket.emit('sendSocket', data);
		this.waitingForVideo = true;
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
			if (this.data.onSuccess && sceneData.type == 'video' && data.id == this.data.exp) {
				this.data.onSuccess(sceneData);
			}
		} else {
			if (this.data.onError) {
				this.data.onError(sceneData);
			}
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
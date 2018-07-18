import * as WebStomp from 'webstomp-client';
import {isNode} from '../../scaffolding/Helpers';

const WebSocketShim = require('isomorphic-ws');
const settings = require('../../conf/settings.json').stomp;

export default class Stomp {
	// RabbitMQ creds
	private static readonly exchange:string = settings.exchange;
	private static readonly username:string = settings.username;
	private static readonly password:string = settings.password;

	// Experience id & delegate consumption handlers
	private experienceId:string;
	private delegates:any;

	// WS / Stomp objs
	private endpoint:string = '';
	private socket:WebSocket = null;
	private client:WebStomp.Client = null;
	private subscription:WebStomp.Subscription = null;

	constructor(experienceId:string, delegates:any, env:string) {
		this.experienceId = experienceId;
		this.delegates = delegates;
		this.endpoint = settings[env];
	}

	/*
		Initializes the WebStomp client w/ handlers.

		The debug method needs to be overridden as a rule of 
		this WebStomp library. 
	 */
	private init = ():void => {
		const {username, password,} = Stomp;
		const {endpoint, delegates: {error}} = this;

		this.socket = (!isNode()) ? new WebSocket(endpoint) : new WebSocketShim(endpoint);
		this.client = WebStomp.over(this.socket);
		this.client.debug = () => {};
		
		this.client.connect
		(
			username,
			password,
			() => this.establishSubscription(),
			error
		);
	}

	/*
		Triggers socketIO to emit & sets up a listener for messages
	 */
	private establishSubscription = ():void => {
		const {exchange} = Stomp;
		const {experienceId, client, delegates: {start, message}} = this;

		this.subscription = client.subscribe
		(
			`${exchange}${experienceId}`,
			message
		);
		
		start();
	}

	/*
		Kills the current connection gracefully and resolves on closure
	 */
	public disconnectAsync = ():any => {
		const {client, client: {connected}, subscription} = this;

		return new Promise((resolve) => {
			if (connected) {
				subscription.unsubscribe();

				client.disconnect(() => {
					resolve();
				});
			} else {
				resolve();
			}
		});
	}
}
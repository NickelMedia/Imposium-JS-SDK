import * as WebStomp from 'webstomp-client';
import {isNode} from '../../scaffolding/Helpers';

const WebSocketShim = require('isomorphic-ws');
const settings = require('../../conf/settings.json').stomp;

class SocketEvents {
	public static triggerEmit:()=>void = null;
	public static onMessage:(message:any)=>any = null;
	public static onError:(err:any)=>any = null;
}

export default class Stomp {
	// RabbitMQ creds
	private static endpoint:string = '';
	private static readonly exchange:string = settings.exchange;
	private static readonly username:string = settings.username;
	private static readonly password:string = settings.password;

	// Events configuration status
	public static eventsBound:boolean = false;

	// WS / Stomp objs
	private static expId:string;
	private static socket:WebSocket;
	private static client:WebStomp.Client;
	private static subscription:WebStomp.Subscription;

	public static setEndpoint = (env:string):void => {
		Stomp.endpoint = (env === 'production') ? settings.prodEndpoint : settings.stagingEndpoint;
	}

	/*
		Setup callbacks
	 */
	public static setEvents = (t:()=>void, m:(message:any)=>any, e:(err:any)=>any) => {
		SocketEvents.triggerEmit = t;
		SocketEvents.onMessage = m;
		SocketEvents.onError = e;
		Stomp.eventsBound = true;
	}

	/*
		Initializes the WebStomp client w/ handlers.

		The debug method needs to be overridden as a rule of 
		this WebStomp library. 
	 */
	public static init = (expId:string):void => {
		const {
			endpoint, 
			username, 
			password,
			establishSubscription
		} = Stomp;

		const {onError} = SocketEvents;

		Stomp.expId = expId;
		Stomp.socket = (!isNode()) ? new WebSocket(endpoint) : new WebSocketShim(endpoint);
		Stomp.client = WebStomp.over(Stomp.socket);
		Stomp.client.debug = () => {};
		
		Stomp.client.connect
		(
			username,
			password,
			() => establishSubscription(),
			onError
		);
	}

	/*
		Triggers socketIO to emit & sets up a listener for messages
	 */
	private static establishSubscription = ():void => {
		const {exchange, expId} = Stomp;
		const {triggerEmit, onMessage} = SocketEvents;

		Stomp.subscription = Stomp.client.subscribe
		(
			`${exchange}${expId}`,
			onMessage
		);
		
		triggerEmit();
	}

	/*
		Make sure previous socket & client get cleaned up 
		and set up a new connection
	 */
	public static reconnect = (expId:string):void => {
		Stomp.socket = null;
		Stomp.client = null;
		Stomp.init(expId);
	}

	/*
		Kills the current connection gracefully without handlers
	 */
	public static disconnect = ():void => {
		Stomp.subscription.unsubscribe();
		Stomp.client.disconnect();
	}

	/*
		Kills the current connection gracefully and resolves on closure
	 */
	public static disconnectAsync = ():any => {
		return new Promise((resolve) => {
			const {client, subscription} = Stomp;

			if (client.connected) {
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
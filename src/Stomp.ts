import * as WebStomp from 'webstomp-client';
// import * as WebSocket from 'ws';

class SocketEvents {
	public static triggerEmit:()=>void = null;
	public static onMessage:(message:any)=>any = null;
	public static onError:(err:any)=>any = null;
}

export default class Stomp {
	// RabbitMQ creds
	static readonly endpoint:string = 'wss://stomp.prod.k8s.nickel.media/ws';
	static readonly exchange:string = '/exchange/imposium/';
	static readonly username:string = 'imposium_stomp';
	static readonly password:string = 'Teehe1ceeMe7Pe1d';

	// WS / Stomp objs
	static expId:string;
	static socket:WebSocket;
	static client:WebStomp.Client;
	static subscription:WebStomp.Subscription;

	/*
		Setup callbacks
	 */
	public static setEvents = (t:()=>void, m:(message:any)=>any, e:(err:any)=>any) => {
		SocketEvents.triggerEmit = t;
		SocketEvents.onMessage = m;
		SocketEvents.onError = e;
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
		Stomp.socket = new WebSocket(endpoint);
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
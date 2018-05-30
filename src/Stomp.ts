import * as WebStomp from 'webstomp-client';
// import * as WebSocket from 'ws';

export default class Stomp {
	// RabbitMQ creds
	private static readonly endpoint:string = 'wss://stomp.prod.k8s.nickel.media/ws';
	private static readonly exchange:string = '/exchange/imposium/';
	private static readonly username:string = 'imposium_stomp';
	private static readonly password:string = 'Teehe1ceeMe7Pe1d';

	// WS / Stomp objs
	private static expId:string;
	private static socket:WebSocket;
	private static client:WebStomp.Client;
	private static subscription:WebStomp.Subscription;

	// Handlers / Callbacks
	private static triggerEmit:()=>void = null;
	private static onMessage:(message:any)=>any = null;
	private static onError:(err:any)=>any = null;

	// Set based on if handlers are established
	private static isEnabled:boolean = false;

	/*
		Setup callbacks
	 */
	public static setHandlers = (triggerEmit:()=>void, onMessage:(message:any)=>any, onError:(err:any)=>any) => {
		if (triggerEmit && onMessage && onError) {
			Stomp.triggerEmit = triggerEmit;
			Stomp.onMessage = onMessage;
			Stomp.onError = onError;
			Stomp.isEnabled = true;
		} else {
			console.warn('Failed to setup WebStomp handlers.');
		}

	}

	/*
		Initializes the WebStomp client w/ handlers.

		The debug method needs to be overridden as a rule of 
		this WebStomp library. 
	 */
	public static init = (expId:string):void => {
		const {
			isEnabled,
			endpoint, 
			username, 
			password,
			onError,
			establishSubscription
		} = Stomp;

		if (isEnabled) {
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
		} else {
			console.warn('WebStomp isn\'t enabled, are you sure you set up the correct handlers?');
		}
	}

	/*
		Triggers socketIO to emit & sets up a listener for messages
	 */
	private static establishSubscription = ():void => {
		const {
			exchange, 
			expId,
			onMessage,
			triggerEmit
		} = Stomp;

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
		Kills the active subscription then disconnects the
		client.
	 */
	public static disconnect = ():void => {
		Stomp.subscription.unsubscribe();
		Stomp.client.disconnect();
	}

	/*
		Kill the current socket and clear the class
		level references to the socket and client
	 */
	public static kill = ():any => {
		return new Promise((resolve, reject) => {
			const {client, subscription} = Stomp;

			if (client.connected) {
				subscription.unsubscribe();

				client.disconnect(() => {
					resolve();
				});
			} else {
				resolve();
			}
		})
		.catch(e => {});
	}
}
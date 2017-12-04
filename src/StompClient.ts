import * as WebStomp from 'webstomp-client';
// import * as WebSocket from 'ws';

/**
 * Encapsulates config required by the WebStomp client
 * and accepts lexically scoped functions from an invoking
 * class in onMessage and onError
 */
export interface StompConfig {
	stompEndpoint:string;
	user:string;
	password:string;
	exchangeRoute:string;
	onMessage:(msg:WebStomp.Message)=>void;
	onError:(err:any)=>void;
	onConnect:any;
}

/**
 * Encapsulates WebStomp client handling functionality
 */
export class StompClient {
	private client:WebStomp.Client;
	private subscription:WebStomp.Subscription;
	private config:StompConfig;
	private socket:WebSocket;
	private expId:string;
	private subscribe:()=>void;
	private onConnect:any;
	private onError:any;

	/**
	 * Set config and initialize the client
	 * @param {StompConfig} config WebStomp config
	 */
	public constructor(config:StompConfig, expId:string) {
		this.config = config;
		this.expId = expId;
		this.init();
	}

	/**
	 * Kill current socket and client definitions and 
	 * reconnect to RabbitMQ
	 */
	public reconnect():void {
		this.socket = null;
		this.client = null;
		this.init();
	}

	/**
	 * Disconnect the current client
	 */
	public disconnect():void {
		this.subscription.unsubscribe();
		this.client.disconnect();
	}

	/**
	 * Kill the current socket and clear the class
	 * level references to the socket and client
	 */
	public kill():any {
		return new Promise((resolve, reject) => {
			if (this.client.connected) {
				this.subscription.unsubscribe();

				this.client.disconnect(() => {
					resolve();
				});
			} else {
				resolve();
			}
		})
		.catch(e => {});
	}

	/**
	 * Initializes WebSocket and WebStomp client objects and 
	 * established a connection to the RabbitMQ server
	 */
	private init():void {
		this.socket = new WebSocket(this.config.stompEndpoint);
		this.client = WebStomp.over(this.socket);
		this.client.debug = () => {};

		this.client.connect
		(
			this.config.user,
			this.config.password,
			this.subscribe = () => this.establishSubscription(),
			this.config.onError
		);
	}

	/**
	 * Subscribes to a queue on the base imposium exchange
	 * then invokes message consumption
	 */
	private establishSubscription():void {

		this.subscription = this.client.subscribe
		(
			`${this.config.exchangeRoute}${this.expId}`,
			this.config.onMessage
		);
		
		this.config.onConnect();
	}
}
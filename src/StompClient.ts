import * as WebStomp from 'webstomp-client';

export default class StompClient {
	public client:WebStomp.Client;

	private config:any;
	private socket:WebSocket;
	private subscribe:any;

	constructor(config:any) {
		this.config = config;

		this.init();
	}

	init() {
		this.socket = new WebSocket(this.config.stompEndpoint);
		this.client = WebStomp.over(this.socket);

		this.client.connect
		(
			this.config.stompUser,
			this.config.stompPass,
			this.subscribe = () => this.establishSubscription(),
			this.config.onError
		);
	}

	establishSubscription() {
		this.client.subscribe
		(
			this.config.exchangeRoute,
			this.config.onMessage
		);
	}

	reconnect() {
		this.socket = null;
		this.client = null;
		this.init();
	}
}
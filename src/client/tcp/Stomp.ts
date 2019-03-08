import * as WebStomp from 'webstomp-client';

const {...settings} = require('../../conf/settings.json').stomp;

export interface IStompConfig {
    experienceId: string;
    environment: string;
    delegates: IConsumerDelegates;
}

export interface IConsumerDelegates {
    route: (f: WebStomp.Frame) => void;
    error: (e: CloseEvent) => void;
}

export default class Stomp {
    // Static RabbitMQ creds
    private static readonly EXCHANGE: string = settings.exchange;
    private static readonly USERNAME: string = settings.username;
    private static readonly PASSWORD: string = settings.password;

    // Ws open state
    private static readonly OPEN_STATE: number = 1;
    private static readonly DEBUG_OFF: () => void = () => { return; };

    // Experience id & delegate consumption handlers
    private experienceId: string;
    private delegates: IConsumerDelegates;

    // WS / Stomp client refs
    private socket: WebSocket = null;
    private client: WebStomp.Client = null;
    private subscription: WebStomp.Subscription = null;

    constructor(c: IStompConfig) {
        this.socket = new WebSocket(settings[c.environment]);
        this.experienceId = c.experienceId;
        this.delegates = c.delegates;
    }

    /*
        Initializes STOMP connection & tooling
     */
    public init = (): Promise<void> => {
        const {USERNAME: u, PASSWORD: p, DEBUG_OFF} = Stomp;
        const {socket, delegates: {error}} = this;

        this.client = WebStomp.over(socket);
        this.client.debug = DEBUG_OFF;

        return new Promise((resolve) => {
            const subscribed = () => this.doSubscribe(resolve);
            this.client.connect(u, p, subscribed, error);
        });
    }

    /*
        Triggers socketIO to emit & sets up a listener for messages
     */
    private doSubscribe = (resolve: () => void): void => {
        const {EXCHANGE: e} = Stomp;
        const {experienceId, client, delegates: {route}} = this;
        const queueLoc: string = `${e}${experienceId}`;

        this.subscription = client.subscribe(queueLoc, route);
        resolve();
    }

    /*
        Ends the current connection gracefully
     */
    public disconnectAsync = (): Promise<void> => {
        const {OPEN_STATE} = Stomp;
        const {client, client: {connected}, subscription} = this;

        return new Promise((resolve) => {
            const {ws: {readyState}} = client;

            if (readyState == OPEN_STATE) {
                if (subscription) {
                    subscription.unsubscribe();
                }

                client.disconnect(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

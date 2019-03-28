import * as WebStomp from 'webstomp-client';
import {DelegateMap} from '../DeliveryPipe';

const {...settings} = require('../../conf/settings.json').stomp;

export interface IStompConfig {
    experienceId: string;
    environment: string;
    consumerDelegates: DelegateMap;
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
    private consumerDelegates: DelegateMap;

    // WS / Stomp client refs
    private socket: WebSocket = null;
    private client: WebStomp.Client = null;
    private subscription: WebStomp.Subscription = null;

    constructor(c: IStompConfig) {
        this.socket = new WebSocket(settings[c.environment]);
        this.experienceId = c.experienceId;
        this.consumerDelegates = c.consumerDelegates;
    }

    /*
        Initializes STOMP connection & tooling
     */
    public init = (): Promise<void> => {
        const {USERNAME: u, PASSWORD: p, DEBUG_OFF} = Stomp;
        const {socket, consumerDelegates} = this;

        this.client = WebStomp.over(socket);
        this.client.debug = DEBUG_OFF;

        return new Promise((resolve) => {
            const subscribed = () => this.doSubscribe(resolve);
            this.client.connect(u, p, subscribed, consumerDelegates.get('error'));
        });
    }

    /*
        Triggers socketIO to emit & sets up a listener for messages
     */
    private doSubscribe = (resolve: () => void): void => {
        const {EXCHANGE} = Stomp;
        const {experienceId, client, consumerDelegates} = this;
        const queueLoc: string = `${EXCHANGE}${experienceId}`;

        this.subscription = client.subscribe(queueLoc, consumerDelegates.get('route'));
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

            if (readyState > OPEN_STATE) {
                return resolve();
            }

            if (subscription) {
                subscription.unsubscribe();
            }

            client.disconnect(() => { resolve(); });
        });
    }
}

import * as WebStomp from 'webstomp-client';

const settings = require('../../conf/settings.json').stomp;

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

    // Experience id & delegate consumption handlers
    private experienceId: string;
    private delegates: IConsumerDelegates;

    // WS / Stomp client refs
    private endpoint: string = '';
    private socket: WebSocket = null;
    private client: WebStomp.Client = null;
    private subscription: WebStomp.Subscription = null;

    constructor(c: IStompConfig) {
        this.experienceId = c.experienceId;
        this.endpoint = settings[c.environment];
        this.delegates = c.delegates;
    }

    /*
        Initializes the WebStomp client w/ handlers.

        The debug method needs to be overridden as a rule of
        this WebStomp library.
     */
    public init = (): Promise<undefined> => {
        const {USERNAME, PASSWORD} = Stomp;
        const {endpoint, delegates: {error}} = this;

        this.socket = new WebSocket(endpoint);
        this.client = WebStomp.over(this.socket);
        this.client.debug = () => { return; };

        return new Promise((resolve) => {
            const onConnect = () => {
                this.establishSubscription();
                resolve();
            };

            this.client.connect
            (
                USERNAME,
                PASSWORD,
                onConnect,
                error
            );
        });
    }

    /*
        Triggers socketIO to emit & sets up a listener for messages
     */
    private establishSubscription = (): void => {
        const {EXCHANGE} = Stomp;
        const {experienceId, client, delegates: {route}} = this;

        this.subscription = client.subscribe
        (
            `${EXCHANGE}${experienceId}`,
            route
        );
    }

    /*
        Ends the current connection gracefully
     */
    public disconnectAsync = (): Promise<undefined> => {
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

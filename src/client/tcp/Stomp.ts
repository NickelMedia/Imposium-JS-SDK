import * as WebStomp from 'webstomp-client';

const settings = require('../../conf/settings.json').stomp;

export default class Stomp {
    // Static RabbitMQ creds
    private static readonly exchange: string = settings.exchange;
    private static readonly username: string = settings.username;
    private static readonly password: string = settings.password;

    // Experience id & delegate consumption handlers
    private experienceId: string;
    private delegates: any;

    // WS / Stomp client refs
    private endpoint: string = '';
    private socket: WebSocket = null;
    private client: WebStomp.Client = null;
    private subscription: WebStomp.Subscription = null;

    constructor(experienceId: string, delegates: any, env: string) {
        this.experienceId = experienceId;
        this.delegates = delegates;
        this.endpoint = settings[env];
    }

    /*
        Initializes the WebStomp client w/ handlers.

        The debug method needs to be overridden as a rule of
        this WebStomp library.
     */
    public init = (): Promise<undefined> => {
        const {username, password} = Stomp;
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
                username,
                password,
                onConnect,
                error
            );
        });
    }

    /*
        Ends the current connection gracefully
     */
    public disconnectAsync = (): any => {
        const {client, client: {connected}, subscription} = this;

        return new Promise((resolve) => {
            if (client.ws.readyState == 1) {
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

    /*
        Triggers socketIO to emit & sets up a listener for messages
     */
    private establishSubscription = (): void => {
        const {exchange} = Stomp;
        const {experienceId, client, delegates: {start, route}} = this;

        this.subscription = client.subscribe
        (
            `${exchange}${experienceId}`,
            route
        );
    }
}

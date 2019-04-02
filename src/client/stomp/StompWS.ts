import * as WebStomp from 'webstomp-client';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';
import {DelegateMap} from '../DeliveryPipe';

const {...settings} = require('../../conf/settings.json').stomp;

export interface IStompConfig {
    experienceId: string;
    consumerDelegates: DelegateMap;
}

export default class StompWS {
    // RabbitMQ creds
    private static readonly EXCHANGE: string = settings.exchange;
    private static readonly USERNAME: string = settings.username;
    private static readonly PASSWORD: string = settings.password;

    private static readonly OPEN_STATE: number = 1; // WS OPEN
    private static readonly MAX_RETRIES: number = settings.maxRetries; // Max connection retries
    private static readonly DEBUG_OFF: () => void = () => { return; }; // Set null to see debug logs

    // Experience id & delegate consumption handlers
    private experienceId: string;
    private consumerDelegates: DelegateMap;

    // Props
    private socket: WebSocket = null;
    private client: WebStomp.Client = null;
    private subscription: WebStomp.Subscription = null;
    private currRetry: number = 0;

    constructor(c: IStompConfig) {
        this.experienceId = c.experienceId;
        this.consumerDelegates = c.consumerDelegates;
    }

    /*
        Initializes STOMP connection & tooling
     */
    public init = (environment: string): Promise<void> => {
        this.socket = new WebSocket(settings[environment]);
        this.client = WebStomp.over(this.socket);
        this.client.debug = StompWS.DEBUG_OFF;

        return new Promise((resolve) => {
            this.client.connect(
                StompWS.USERNAME,
                StompWS.PASSWORD,
                () => this.doSubscribe(resolve),
                (evt: CloseEvent) => this.onError(environment, evt)
            );
        });
    }

    /*
        Ends the current connection gracefully
     */
    public forceClose = (): Promise<void> => {
        const {OPEN_STATE} = StompWS;
        const {client, client: {connected}, subscription} = this;

        return new Promise((resolve) => {
            const {ws: {readyState}} = client;

            if (readyState > OPEN_STATE) {
                return resolve();
            }

            if (subscription) {
                subscription.unsubscribe();
            }

            client.disconnect(() => {
                this.socket = null;
                resolve();
            });
        });
    }

    /*
        Bind to queue for a given experience
     */
    private doSubscribe = (resolve: () => void): void => {
        const {EXCHANGE} = StompWS;
        const {experienceId, client, consumerDelegates} = this;
        const queueLoc: string = `${EXCHANGE}${experienceId}`;

        this.subscription = client.subscribe(
            queueLoc,
            consumerDelegates.get('validateFrameData')
        );

        resolve();
    }

    /*
        Fires on WS close events due to errors
     */
    private onError = (environment: string, evt: CloseEvent): void => {
        const {currRetry, consumerDelegates} = this;

        if (currRetry < StompWS.MAX_RETRIES) {
            ExceptionPipe.logWarning('network', 'tcpFailure');

            this.currRetry++;

            this.forceClose()
            .then(() => {
                this.init(environment);
            });
        } else {
            consumerDelegates.get('socketFailure')(evt);
        }
    }
}

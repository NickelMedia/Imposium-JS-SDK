import API from '../http/API';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';
import Stomp, {IStompConfig} from './Stomp';
import {IExperience, IExperienceOutput, IClientEvents} from '../Client';
import {DelegateMap} from '../DeliveryPipe';
import {Frame} from 'webstomp-client';

import {
    ModerationError,
    SocketError
} from '../../scaffolding/Exceptions';

const {...settings} = require('../../conf/settings.json').messageConsumer;

export interface IConsumerConfig {
    experienceId: string;
    environment: string;
    deliveryDelegates: DelegateMap;
}

export interface IEmitTypes {
    scene: string;
    message: string;
    complete: string;
}

export interface IEmitData {
    id: string;
    event?: string;
    status?: string;
    rendering?: boolean;
    date_created?: number;
    moderation_status?: string;
    output?: IExperienceOutput;
}

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
    private static readonly MAX_RETRIES: number = settings.maxReconnects;
    private static readonly EMITS: IEmitTypes = settings.emitTypes;

    private retried: number = settings.minReconnects;
    private environment: string = '';
    private experienceId: string = null;
    private deliveryDelegates: DelegateMap = null;
    private stomp: Stomp = null;

    constructor(c: IConsumerConfig) {
        this.experienceId = c.experienceId;
        this.environment = c.environment;
        this.deliveryDelegates = c.deliveryDelegates;
    }

    /*
        Initializes STOMP over WS so messaged pushed from rabbitMQ can be consumed
     */
    public connect = (): Promise<void> => {
        const {experienceId, environment} = this;

        const consumerDelegates: DelegateMap = new Map();
        consumerDelegates.set('route', (f: Frame) => this.validateFrame(f));
        consumerDelegates.set('error', (e: CloseEvent) => this.stompError(e));

        const stompConfig: IStompConfig = {
            experienceId,
            environment,
            consumerDelegates
        };

        this.stomp = new Stomp(stompConfig);

        return new Promise((resolve) => {
            this.stomp.init()
            .then(() => {
                resolve();
            });
        });
    }

    /*
        Force stop STOMP / ws connections
     */
    public kill = (): Promise<void> => {
        const {stomp} = this;

        return new Promise((resolve) => {
            if (stomp) {
                stomp.disconnectAsync()
                .then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /*
        Parse & defer incoming frames. Disconnect ws on actComplete.
     */
    private validateFrame = (frame: Frame): void => {
        const {EMITS: {scene, message, complete}} = MessageConsumer;
        const {stomp, experienceId, deliveryDelegates} = this;
        const {body} = frame;

        try {
            const emitData: IEmitData = JSON.parse(body);

            switch (emitData.event) {
                case complete:
                    stomp.disconnectAsync();
                    break;
                case message:
                    this.emitMessageData(emitData);
                    break;
                case scene:
                    delete emitData['event'];
                    this.emitSceneData((emitData as IExperience));
                    break;
                default:
                    break;
            }
        } catch (e) {
            const socketError = new SocketError('messageParseFailed', experienceId, e);
            deliveryDelegates.get('internalError')(socketError);
        }
    }

    /*
        Handle message data contained by frames other than gotScene
     */
    private emitMessageData = (emitData: IEmitData): void => {
        const {deliveryDelegates} = this;
        const {status, id} = emitData;

        try {
            if (status === settings.errorOverTcp) {
                throw new SocketError('errorOverTcp', id, null);
            }

            deliveryDelegates.get('gotMessage')(emitData);
        } catch (e) {
            deliveryDelegates.get('internalError')(e);
        }
    }

    /*
        Validate experience data contained by frame
     */
    private emitSceneData = (experience: IExperience): void => {
        const {deliveryDelegates} = this;
        const {id, moderation_status} = experience;

        if (moderation_status === 'rejected') {
            const moderationError = new ModerationError('rejection', id);
            deliveryDelegates.get('internalError')(moderationError);
        } else {
            deliveryDelegates.get('gotExperience')(experience);
        }
    }

    /*
        Called on ws[Close] events, retry
        TO DO: Exponential back-off
     */
    private stompError = (e: CloseEvent): void => {
        const {MAX_RETRIES} = MessageConsumer;
        const {retried, experienceId, deliveryDelegates} = this;

        if (!e.wasClean) {
            ++this.retried;

            if (retried < MAX_RETRIES) {
                ExceptionPipe.logWarning('network', 'tcpFailure');
                this.kill().then(() => { this.connect(); });
            } else {
                const socketError = new SocketError('tcpFailure', experienceId, e);
                
                this.stomp = null;
                deliveryDelegates.get('consumerFailure')(experienceId, socketError);
            }
        }
    }
}

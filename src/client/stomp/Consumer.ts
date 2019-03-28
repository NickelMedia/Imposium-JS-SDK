import API from '../http/API';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';
import StompWS, {IStompConfig} from './StompWS';
import {IExperience, IExperienceOutput, IClientEvents} from '../Client';
import {DelegateMap} from '../DeliveryPipe';
import {Frame} from 'webstomp-client';
import {ModerationError, SocketError} from '../../scaffolding/Exceptions';

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
    // Server side event names
    private static readonly EMITS: IEmitTypes = settings.emitTypes;

    // Props
    private environment: string = '';
    private experienceId: string = null;
    private deliveryDelegates: DelegateMap = null;
    private stomp: StompWS = null;

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

        consumerDelegates.set('validateFrameData', (f: Frame) => this.validateFrameData(f));
        consumerDelegates.set('socketFailure', (e: CloseEvent) => this.socketFailure(e));

        this.stomp = new StompWS({
            experienceId,
            environment,
            consumerDelegates
        });

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
    public destroy = (): Promise<void> => {
        return new Promise((resolve) => {
            if (!this.stomp) {
                return resolve();
            }

            this.stomp.forceClose()
            .then(() => {
                resolve();
            });
        });
    }

    /*
        Parse & defer incoming frame data. Disconnect on (event==='actComplete').
     */
    private validateFrameData = (frame: Frame): void => {
        const {EMITS: {scene, message, complete}} = MessageConsumer;
        const {stomp, experienceId, deliveryDelegates} = this;
        const {body} = frame;

        try {
            const emitData: IEmitData = JSON.parse(body);

            switch (emitData.event) {
                case complete:
                    this.destroy();
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
        Called on total socket failures (i.e: max retries exceeded)
     */
    private socketFailure = (e: CloseEvent): void => {
        const {experienceId, deliveryDelegates} = this;
        const socketError = new SocketError('tcpFailure', experienceId, e);
        
        this.stomp = null;
        deliveryDelegates.get('consumerFailure')(experienceId, socketError);
    }
}

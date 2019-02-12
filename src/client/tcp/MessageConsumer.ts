import API from '../http/API';
import VideoPlayer from '../../video/VideoPlayer';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';
import Stomp, {IStompConfig, IConsumerDelegates} from './Stomp';
import {IExperience, IExperienceOutput, IClientEvents} from '../Client';
import {Frame} from 'webstomp-client';

import {
    ModerationError,
    NetworkError
} from '../../scaffolding/Exceptions';

const settings = require('../../conf/settings.json').messageConsumer;

export interface IConsumerConfig {
    storyId: string;
    environment: string;
    experienceId: string;
    delegates: IClientDelegates;
    player?: VideoPlayer;
}

export interface IClientDelegates extends IClientEvents {
    updateHistory: (k: string, v: string) => void;
}

export interface IEmitTypes {
    scene: string;
    message: string;
    complete: string;
}

export interface IEmitData {
    id: string;
    event: string;
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

    private stompDelegates: IConsumerDelegates = {
        route: (f: Frame) => this.routeMessageData(f),
        error: (e: CloseEvent) => this.stompError(e)
    };

    private storyId: string = '';
    private environment: string = '';
    private experienceId: string = null;
    private clientDelegates: IClientDelegates = null;
    private player: VideoPlayer;
    private stomp: Stomp = null;
    private retried: number = settings.minReconnects;

    constructor(c: IConsumerConfig) {
        this.storyId = c.storyId;
        this.environment = c.environment;
        this.experienceId = c.experienceId;
        this.clientDelegates = c.delegates;

        if (c.player) {
            this.player = c.player;
        }
    }

    /*
        Initializes a stomp connection object
     */
    public connect = (): Promise<undefined> => {
        const {experienceId, environment, stompDelegates} = this;

        const stompConfig: IStompConfig = {
            experienceId,
            environment,
            delegates: stompDelegates
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
        Kill stomp connection
     */
    public kill = (): Promise<undefined> => {
        const {stomp} = this;

        return new Promise((resolve) => {
            stomp.disconnectAsync()
            .then(() => {
                resolve();
            });
        });
    }

    /*
        Manage incoming messages. Terminates stomp on actComplete.
     */
    private routeMessageData = (frame: Frame): void => {
        const {EMITS: {scene, message, complete}} = MessageConsumer;
        const {stomp, storyId, experienceId, clientDelegates: {ERROR}} = this;
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
            const wrappedError = new NetworkError('messageParseFailed', experienceId, e);
            ExceptionPipe.trapError(wrappedError, storyId, ERROR);
        }
    }

    /*
        Fire the gotMessage callback if the user is listening for this event
     */
    private emitMessageData = (emitData: IEmitData): void => {
        const {storyId, clientDelegates: {updateHistory, STATUS_UPDATE, ERROR}} = this;
        const {status, id} = emitData;

        try {
            if (status === settings.errorOverTcp) {
                throw new NetworkError('errorOverTcp', id, null);
            }

            if (STATUS_UPDATE) {
                STATUS_UPDATE(emitData);
                updateHistory('prevMessage', status);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Parses the experience data into a prop delivered via gotScene
     */
    private emitSceneData = (experience: IExperience): void => {
        const {player, storyId, clientDelegates: {GOT_EXPERIENCE, ERROR}} = this;
        const {id, moderation_status} = experience;

        if (moderation_status === 'rejected') {
            const moderationError = new ModerationError('rejection', id);
            ExceptionPipe.trapError(moderationError, storyId, ERROR);
        } else {
            if (player) {
                player.experienceGenerated(experience);
            }

            if (GOT_EXPERIENCE) {
                GOT_EXPERIENCE(experience);
            }
        }
    }

    /*
        Called on Stomp errors
     */
    private stompError = (e: CloseEvent): void => {
        const {MAX_RETRIES} = MessageConsumer;
        const {retried, storyId, experienceId, stomp, clientDelegates: {ERROR}} = this;

        if (!e.wasClean) {
            ++this.retried;

            if (retried < MAX_RETRIES) {
                ExceptionPipe.logWarning('network', 'tcpFailure');

                this.kill()
                .then(() => {
                    this.connect();
                });
            } else {
                const wrappedError = new NetworkError('tcpFailure', experienceId, e);
                
                this.stomp = null;
                ExceptionPipe.trapError(wrappedError, storyId, ERROR);
            }
        }
    }
}

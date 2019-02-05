import API from '../http/API';
import Stomp from './Stomp';
import VideoPlayer from '../../video/VideoPlayer';
import ExceptionPipe from '../../scaffolding/ExceptionPipe';

import {
    ModerationError,
    NetworkError
} from '../../scaffolding/Exceptions';

const settings = require('../../conf/settings.json').messageConsumer;

// Wraps around the Stomp client, providing the message handling
export default class MessageConsumer {
    private static readonly MAX_RETRIES: number = settings.maxReconnects;

    private static readonly EVENT_NAMES: any = {
        scene: 'gotScene',
        message: 'gotMessage',
        complete: 'actComplete'
    };

    private stompDelegates: any = {
        route : (m: any) => this.routeMessageData(m),
        error : (e: any) => this.stompError(e)
    };

    private env: string = '';
    private storyId: string = '';
    private experienceId: string = null;
    private clientDelegates: any = null;
    private stomp: Stomp = null;
    private player: VideoPlayer;
    private retried: number = settings.minReconnects;

    constructor(env: string, storyId: string, experienceId: string, clientDelegates: any, player: VideoPlayer) {
        this.env = env;
        this.storyId = storyId;
        this.experienceId = experienceId;
        this.clientDelegates = clientDelegates;

        if (player) {
            this.player = player;
        }
    }

    /*
        Initializes a stomp connection object
     */
    public connect = (): Promise<undefined> => {
        const {experienceId, env, stompDelegates, clientDelegates: {ready}} = this;

        this.stomp = new Stomp(experienceId, stompDelegates, env);

        return new Promise((resolve) => {
            this.stomp.init()
            .then(() => {
                resolve();
            });
        });
    }

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
        Manage incoming messages. Depending on their state the websocket
        may be terminated.
     */
    private routeMessageData = (msg: any): void => {
        const {EVENT_NAMES: {scene, message, complete}} = MessageConsumer;
        const {stomp, storyId, experienceId, clientDelegates: {ERROR}} = this;

        try {
            const payload = JSON.parse(msg.body);

            switch (payload.event) {
                case complete:
                    stomp.disconnectAsync().then(() => { return; });
                    break;
                case message:
                    this.emitMessageData(payload);
                    break;
                case scene:
                    this.emitSceneData(payload);
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
    private emitMessageData = (messageData: any): void => {
        const {storyId, clientDelegates: {STATUS_UPDATE, ERROR}} = this;
        const {status, id} = messageData;

        try {
            if (status === settings.errorOverTcp) {
                throw new NetworkError('errorOverTcp', id, null);
            }

            if (STATUS_UPDATE) {
                STATUS_UPDATE(messageData);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Parses the experience data into a prop delivered via gotScene
     */
    private emitSceneData = (experience: any): void => {
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
    private stompError = (e: any): void => {
        const {retried, storyId, experienceId, stomp, clientDelegates: {ERROR}} = this;
        const {wasClean} = e;

        if (!e.wasClean) {
            ++this.retried;

            if (retried < MessageConsumer.MAX_RETRIES) {
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

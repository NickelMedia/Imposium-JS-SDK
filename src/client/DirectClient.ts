import API from './http/API';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import GoogleAnalytics from '../scaffolding/GoogleAnalytics';
import ExceptionPipe from '../scaffolding/ExceptionPipe';
import DirectDeliveryPipe, {DelegateMap} from './DirectDeliveryPipe';
import {IEmitData} from './stomp/Consumer';

import {
    ClientConfigurationError,
    PlayerConfigurationError,
    ModerationError,
    HTTPError
} from '../scaffolding/Exceptions';

import {
    prepConfig,
    keyExists,
    cloneWithKeys,
    isFunc
} from '../scaffolding/Helpers';

export type ExperienceCreated = ((e: IExperience) => any);
export type GotExperience = ((e: IExperience) => any);
export type StatusUpdate = ((s: IEmitData) => any);
export type onError = ((e: Error) => any);
export type UploadProgress = ((n: number) => any);

export interface IDirectClientEvents {
    EXPERIENCE_CREATED?: ExperienceCreated & string;
    GOT_EXPERIENCE?: GotExperience & string;
    STATUS_UPDATE?: StatusUpdate & string;
    ERROR?: onError & string;
    UPLOAD_PROGRESS?: UploadProgress & string;
}

export interface IDirectClientConfig {
    accessToken: string;
    storyId: string;
    compositionId: string;
    environment: string;
    gaPlacement: string;
    deliveryMode: string;
    pollRate: number;
}

export interface IRenderHistory {
    prevExperienceId: string;
    prevMessage: string;
}

export interface IDirectClientEmits {
    adding: string;
    added: string;
    finishedPolling: string;
}

export interface IExperience {
    id: string;
    rendering: boolean;
    date_created: number;
    moderation_status: string;
    output: IExperienceOutput;
}

export interface IExperienceOutput {
    videos: IOutputVideos;
    images?: IOutputImages;
}

export interface IOutputImages {
    poster: string;
}

export interface IOutputVideos {
    m3u8?: IPlaylistOutput;
    mp4_480?: IVideoOutput;
    mp4_720?: IVideoOutput;
    mp4_1090?: IVideoOutput;
}

export interface IPlaylistOutput {
    format: string;
    duration: number;
    rate: number;
    url: string;
}

export interface IVideoOutput {
    url: string;
    format: string;
    rate: number;
    width: number;
    height: number;
    duration: number;
}

const {...settings} = require('../conf/settings.json').client;

export default class DirectClient {

    public static eventNames: IDirectClientEvents = settings.eventNames;
    public clientConfig: IDirectClientConfig = undefined;
    public gaProperty: string = '';
    private DirectDeliveryPipe: DirectDeliveryPipe = undefined;
    private player: VideoPlayer = undefined;
    private renderHistory: IRenderHistory = settings.emptyHistory;
    private emits: IDirectClientEmits = settings.clientEmits;
    private eventDelegateRefs: IDirectClientEvents = cloneWithKeys(DirectClient.eventNames);
    private playerIsFallback: boolean = false;

    /*
        Initialize Imposium client
     */
    constructor(config: IDirectClientConfig) {

        this.setup(config);
    }

    /*
        Exposed for users who may want to re-use a client for n stories
     */
    public setup = (config: IDirectClientConfig): void => {
        const {defaultConfig} = settings;
        const prevConfig = this.clientConfig || settings.defaultConfig;
        const clientDelegates: DelegateMap = new Map();
        let api: API = null;

        try {
            if (typeof config !== 'object') {
                throw new ClientConfigurationError('badConfig', null);
            }

            if (!config.hasOwnProperty('storyId') || typeof config.storyId !== 'string') {
                throw new ClientConfigurationError('storyId', null);
            }

            if (!config.hasOwnProperty('accessToken') || typeof config.accessToken !== 'string') {
                throw new ClientConfigurationError('accessToken', null);
            }

            prepConfig(config, defaultConfig);
            this.clientConfig = {...prevConfig, ...config};

            api = new API(
                this.clientConfig.accessToken,
                this.clientConfig.environment,
                this.clientConfig.storyId,
                this.clientConfig.compositionId
            );

            clientDelegates.set('experienceCreated', (e: IExperience) => this.experienceCreated(e));
            clientDelegates.set('gotExperience', (e: IExperience) => this.gotExperience(e));
            clientDelegates.set('gotMessage', (m: IEmitData) => this.gotMessage(m));
            clientDelegates.set('internalError', (e: any) => this.internalError(e));

            this.DirectDeliveryPipe = new DirectDeliveryPipe({
                api,
                clientDelegates,
                environment: this.clientConfig.environment,
            });

            api.getGAProperty()
            .then((story: any) => {
                const {gaTrackingId: property} = story;

                if (typeof property === 'string' && property.length > 0) {
                    GoogleAnalytics.initialize(this.clientConfig.gaPlacement);

                    this.gaProperty = property;
                    if (typeof this.player !== 'undefined') {
                        this.player.setGaProperty(property);
                    }
                }
            })
            .catch((e) => {
                const wrappedError = new HTTPError('httpFailure', null, e);
                ExceptionPipe.trapError(wrappedError, this.clientConfig.storyId, null);
            });
        } catch (e) {
            const storyId: string = (config && config.storyId) ? config.storyId : '';
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Bind player to client
     */
    public bindPlayer = (player: VideoPlayer, isFallback: boolean = false): void => {
        if (this.clientConfig) {
            const {clientConfig: {storyId}} = this;

            this.playerIsFallback = isFallback;
            this.player = player;

            player.setStoryId(storyId);
            if (this.gaProperty) {
                player.setGaProperty(this.gaProperty);
            }
        }
    }

    /*
        Sets a callback for an event
     */
    public on = (eventName: string, callback: any): void => {
        const {eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

        if (this.clientConfig) {
            const {clientConfig: {storyId}} = this;

            try {
                if (!isFunc(callback)) {
                    throw new ClientConfigurationError('invalidCallbackType', eventName);
                }

                if (!keyExists(DirectClient.eventNames, eventName)) {
                    throw new ClientConfigurationError('invalidEventName', eventName);
                }

                eventDelegateRefs[eventName] = callback;
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Turns off a specific event or all events
     */
    public off = (eventName: string = ''): void => {
        const {eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

        if (this.clientConfig) {
            const {clientConfig: {storyId}} = this;

            try {
                if (eventName) {
                    if (keyExists(DirectClient.eventNames, eventName)) {
                        eventDelegateRefs[eventName] = null;
                    } else {
                        throw new ClientConfigurationError('invalidEventName', eventName);
                    }
                } else {
                    Object.keys(DirectClient.eventNames).forEach((event) => {
                        eventDelegateRefs[event] = null;
                    });
                }
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Sets up analytics using fallback video player wrapper class
     */
    public captureAnalytics = (playerRef: HTMLVideoElement = null): void => {
        const {eventDelegateRefs: {ERROR}} = this;

        if (this.clientConfig) {
            const {clientConfig: {storyId}} = this;

            try {
                if (playerRef instanceof HTMLVideoElement) {
                    this.bindPlayer(new FallbackPlayer(playerRef), true);
                } else {
                    // Prop passed wasn't of type HTMLVideoElement
                    throw new PlayerConfigurationError('invalidPlayerRef', null);
                }
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Call exposed to users that fetches experience data
     */
    public getExperience = (experienceId: string): void => {
        if (this.clientConfig) {
            const {player, clientConfig: {storyId}, eventDelegateRefs: {GOT_EXPERIENCE, ERROR}} = this;

            try {
                if (player === null && !isFunc(GOT_EXPERIENCE)) {
                    throw new ClientConfigurationError('badConfigOnGet', DirectClient.eventNames.GOT_EXPERIENCE);
                }

                if (experienceId.length > settings.uuidLength) {
                    experienceId = experienceId.substring(0, settings.uuidLength);
                }

                // this.DirectDeliveryPipe.doFetchExperience(experienceId);
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Creates experiences and handles various render flows
     */
    // public createExperience = (inventory: any): void => {
    //     if (this.clientConfig) {
    //         const {
    //             player, playerIsFallback,
    //             clientConfig: {storyId}, emits: {adding},
    //             eventDelegateRefs: {GOT_EXPERIENCE, EXPERIENCE_CREATED, UPLOAD_PROGRESS, ERROR}
    //         } = this;

    //         try {

    //             // Ensures config error throws if not using our player / GOT_EXPERIENCE isn't set or set correctly
    //             if (((player === null || playerIsFallback) && !isFunc(GOT_EXPERIENCE))) {
    //                 throw new ClientConfigurationError('bagConfigOnPostRender', DirectClient.eventNames.GOT_EXPERIENCE);
    //             }

    //             // If rendering immediately, notify user the input was ingested
    //             this.gotMessage({id: undefined, status: adding});

    //             this.DirectDeliveryPipe.createPrestep(inventory, false, UPLOAD_PROGRESS);
    //         } catch (e) {
    //             ExceptionPipe.trapError(e, storyId, ERROR);
    //         }
    //     }
    // }

    public renderExperience = (inventory:any): void =>{
        
        if (this.clientConfig) {
            const {
                player, playerIsFallback,
                clientConfig: {storyId}, emits: {adding},
                eventDelegateRefs: {GOT_EXPERIENCE, EXPERIENCE_CREATED, UPLOAD_PROGRESS, ERROR}
            } = this;

            try {

                // Ensures config error throws if not using our player / GOT_EXPERIENCE isn't set or set correctly
                if (((player === null || playerIsFallback) && !isFunc(GOT_EXPERIENCE))) {
                    throw new ClientConfigurationError('bagConfigOnPostRender', DirectClient.eventNames.GOT_EXPERIENCE);
                }

                // If rendering immediately, notify user the input was ingested
                this.gotMessage({id: undefined, status: adding});

                this.DirectDeliveryPipe.renderFetchExperience(inventory, UPLOAD_PROGRESS);
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Update render history state, prevents storing duplicates
     */
    private updateHistory = (key: string, value: string): void => {
        if (this.renderHistory[key] !== value) {
            this.renderHistory[key] = value;
        }
    }

    /*
        Handler for emitting expereince data on first creation
     */
    private experienceCreated = (experience: IExperience): void => {
        const {
            emits: {adding, added}, renderHistory: {prevMessage},
            eventDelegateRefs: {EXPERIENCE_CREATED, STATUS_UPDATE}
        } = this;

        const {id} = experience;

        if (isFunc(EXPERIENCE_CREATED)) {
            EXPERIENCE_CREATED(experience);
        }

        if ((prevMessage === adding || !prevMessage)) {
            this.gotMessage({id, status: added});
        }

        this.updateHistory('prevExperienceId', id);
    }

    /*
        Handler for validating and deferring / emitting experience data after rendering is complete
     */
    private gotExperience = (experience: IExperience): void => {
        const {
            player, clientConfig: {storyId},
            eventDelegateRefs: {GOT_EXPERIENCE, ERROR},
            emits: {added, finishedPolling}, renderHistory: {prevMessage}
        } = this;

        const {id, output, rendering, moderation_status} = experience;

        try {
            if (moderation_status === 'rejected') {
                throw new ModerationError('rejection', id);
            }

            if (prevMessage === added) {
                this.gotMessage({id, status: finishedPolling});
            }

            if (isFunc(GOT_EXPERIENCE)) {
                GOT_EXPERIENCE(experience);
            }

            if (typeof player !== 'undefined') {
                player.experienceGenerated(experience);
            }

            this.updateHistory('prevExperienceId', id);
            this.updateHistory('prevMessage', '');
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }
   /*
        Handler for emitting message data
     */
 
    private gotMessage = (message: IEmitData): void => {
        const {eventDelegateRefs: {STATUS_UPDATE}} = this;

        if (isFunc(STATUS_UPDATE)) {
            STATUS_UPDATE(message);
            this.updateHistory('prevMessage', message.status);
        }
    }

    /*
        Handler for handling async internal errors
     */
    private internalError = (e: any): void => {
        const {clientConfig: {storyId}, eventDelegateRefs: {ERROR}} = this;

        ExceptionPipe.trapError(e, storyId, ERROR);
    }
}

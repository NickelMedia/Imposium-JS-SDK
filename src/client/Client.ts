import API from './http/API';
import MessageConsumer, {IConsumerConfig, IClientDelegates} from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {printVersion} from '../scaffolding/Version';

import {
    ClientConfigurationError,
    PlayerConfigurationError,
    ModerationError,
    HTTPError
} from '../scaffolding/Exceptions';

import {
    prepConfig,
    keyExists,
    generateUUID,
    cloneWithKeys,
    isFunc
} from '../scaffolding/Helpers';

export interface IClientConfig {
    accessToken: string;
    storyId: string;
    actId: string;
    sceneId: string;
    environment: string;
}

export interface IRenderHistory {
    prevExperienceId: string;
    prevMessage: string;
}

export interface IClientEmits {
    adding: string;
    added: string;
}

export interface IClientEvents {
    EXPERIENCE_CREATED?: (e: IExperience) => any | string;
    UPLOAD_PROGRESS?: (n: number) => any | string;
    GOT_EXPERIENCE?: (e: IExperience) => any | string;
    STATUS_UPDATE?: (m: any) => any | string;
    ERROR?: (e: Error) => any | string;
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

export default class Client {

    public static events = {
        EXPERIENCE_CREATED: 'EXPERIENCE_CREATED',
        UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
        GOT_EXPERIENCE: 'GOT_EXPERIENCE',
        STATUS_UPDATE: 'STATUS_UPDATE',
        ERROR: 'ERROR'
    };
    public clientConfig: IClientConfig = undefined;
    private eventDelegateRefs: IClientEvents = cloneWithKeys(Client.events);
    private api: API = null;
    private player: VideoPlayer = null;
    private consumer: MessageConsumer = null;
    private gaProperty: string = '';
    private playerIsFallback: boolean = false;
    private maxCreateRetries: number = settings.maxCreateRetries;
    private renderHistory: IRenderHistory = {
        prevExperienceId: '',
        prevMessage: ''
    };
    private emits: IClientEmits = {
        adding: 'Adding job to queue...',
        added: 'Added job to queue...'
    };

    /*
        Initialize Imposium client
     */
    constructor(config: IClientConfig) {
        printVersion();
        this.setup(config);
    }

    /*
        Exposed for users who may want to re-use a client for n stories
     */
    public setup = (config: IClientConfig): void => {
        try {
            if (typeof config !== 'object') {
                throw new ClientConfigurationError('badConfig', null);
            }

            if (!config.hasOwnProperty('storyId')) {
                throw new ClientConfigurationError('storyId', null);
            }

            if (!config.hasOwnProperty('accessToken')) {
                throw new ClientConfigurationError('accessToken', null);
            }

            this.mergeConfig(config);
        } catch (e) {
            const storyId: string = (config && config.storyId) ? config.storyId : ''; 
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Set current video player ref
     */
    public setPlayer = (player: VideoPlayer, isFallback: boolean = false): void => {
        const {clientConfig: {storyId}} = this;

        this.playerIsFallback = isFallback;
        this.player = player;

        player.setStoryId(storyId);
    }

    /*
        Sets a callback for an event
     */
    public on = (eventName: string, callback: any): void => {
        const {eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

        if (this.clientConfig) {
            const {clientConfig: {storyId}} = this;

            try {
                if (isFunc(callback)) {
                    if (keyExists(Client.events, eventName)) {
                        eventDelegateRefs[eventName] = callback;
                    } else {
                        throw new ClientConfigurationError('invalidEventName', eventName);
                    }
                } else {
                    throw new ClientConfigurationError('invalidCallbackType', eventName);
                }
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
            try {
                const {clientConfig: {storyId}} = this;

                if (eventName) {
                    if (keyExists(Client.events, eventName)) {
                        eventDelegateRefs[eventName] = null;
                    } else {
                        throw new ClientConfigurationError('invalidEventName', eventName);
                    }
                } else {
                    Object.keys(Client.events).forEach((event) => {
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
        const {clientConfig: {storyId}, eventDelegateRefs: {ERROR}} = this;

        try {
            if (playerRef instanceof HTMLVideoElement) {
                this.setPlayer(new FallbackPlayer(playerRef), true);
            } else {
                // Prop passed wasn't of type HTMLVideoElement
                throw new PlayerConfigurationError('invalidPlayerRef', null);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Get experience data
     */
    public getExperience = (experienceId: string): void => {
        if (this.clientConfig) {
            const {api, player, gaProperty, clientConfig: {storyId}, eventDelegateRefs: {GOT_EXPERIENCE, ERROR}} = this;

            try {
                if (player === null && !isFunc(GOT_EXPERIENCE)) {
                    throw new ClientConfigurationError('badConfigOnGet', Client.events.GOT_EXPERIENCE);
                }

                api.getExperience(experienceId)
                .then((experience: IExperience) => {
                    const {id, output, rendering, moderation_status} = experience;

                    this.updateHistory('prevExperienceId', id);

                    if (Object.keys(output).length > 0) {
                        if (player) {
                            player.experienceGenerated(experience);
                        }

                        if (GOT_EXPERIENCE) {
                            GOT_EXPERIENCE(experience);
                        }
                    } else {
                        if (moderation_status === 'rejected') {
                            const moderationError = new ModerationError('rejection', id);
                            ExceptionPipe.trapError(moderationError, storyId, ERROR);
                        } else {
                            this.warmConsumer(experienceId)
                            .then(() => {
                                if (!rendering) {
                                    api.invokeStream(experienceId)
                                    .catch((e) => {
                                        throw new HTTPError('httpFailure', experienceId, e);
                                    });
                                }
                            });
                        }
                    }
                })
                .catch((e) => {
                    const wrappedError = new HTTPError('httpFailure', experienceId, e);
                    ExceptionPipe.trapError(wrappedError, storyId, ERROR);
                });
            } catch (e) {
                ExceptionPipe.trapError(e, storyId, ERROR);
            }
        }
    }

    /*
        Creates a new experience, pre warms a socket if returning video on demand
     */
    public createExperience = (inventory: any, render: boolean = true, retry: number = 0): void => {
        const uuid: string = generateUUID();

        if (this.clientConfig) {
            if (render) {
                this.warmConsumer(uuid)
                .then(() => {
                    this.doCreateExperience(inventory, uuid, render, retry);
                });
            } else {
                this.doCreateExperience(inventory, uuid, render, retry);
            }
        }
    }

    /*
        Create new experience & return relevant meta
     */
    private doCreateExperience = (inventory: any, uuid: string, render: boolean, retry: number): void => {
        const {
            api,
            player,
            playerIsFallback,
            maxCreateRetries,
            clientConfig: {
                storyId
            },
            emits: {
                adding,
                added
            },
            eventDelegateRefs: {
                GOT_EXPERIENCE,
                EXPERIENCE_CREATED,
                STATUS_UPDATE,
                UPLOAD_PROGRESS,
                ERROR
            }
        } = this;

        try {
            // Ensures at least experience created is set if doing two stage render
            if (!render && !isFunc(EXPERIENCE_CREATED)) {
                throw new ClientConfigurationError('badConfigOnPostNoRender', Client.events.EXPERIENCE_CREATED);
            }

            // Ensures config error throws if not using our player / GOT experience isn't set
            if (render && ((player === null || playerIsFallback) || !isFunc(GOT_EXPERIENCE))) {
                throw new ClientConfigurationError('bagConfigOnPostRender', Client.events.GOT_EXPERIENCE);
            }

            // If the user has set up an event to consume messages, emit
            if (STATUS_UPDATE && render) {
                STATUS_UPDATE({id: undefined, status: adding});
                this.updateHistory('prevMessage', adding);
            }

            api.postExperience(storyId, inventory, render, uuid, UPLOAD_PROGRESS)
            .then((experience: IExperience) => {
                const {id} = experience;

                this.updateHistory('prevExperienceId', id);

                if (EXPERIENCE_CREATED) {
                    EXPERIENCE_CREATED(experience);
                }

                if (render && this.renderHistory.prevMessage === adding && STATUS_UPDATE) {
                    STATUS_UPDATE({id, status: added});
                    this.updateHistory('prevMessage', added);
                }
            })
            .catch((e) => {
                this.killConsumer()
                .then(() => {
                    // Retry if uuid collision
                    if (~e.message.indexOf('400') && retry < maxCreateRetries) {
                        retry = retry + 1;
                        this.createExperience(inventory, render, retry);
                    } else {
                        const wrappedError = new HTTPError('httpFailure', null, e);
                        ExceptionPipe.trapError(wrappedError, storyId, ERROR);
                    }
                });
            });
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Open stomp conn held by message consumer
     */
    private warmConsumer = (experienceId: string): Promise<void> => {
        const {player, eventDelegateRefs, clientConfig: {storyId, environment}} = this;

        return new Promise((resolve) => {
            this.killConsumer()
            .then(() => {
                const delegates: IClientDelegates = {
                    updateHistory: (k, v) => this.updateHistory(k, v),
                    ...eventDelegateRefs
                };

                const consumerConfig: IConsumerConfig = {
                    storyId,
                    experienceId,
                    environment,
                    delegates,
                    player
                };

                this.consumer = new MessageConsumer(consumerConfig);

                this.consumer.connect()
                .then(() => {
                    resolve();
                });
            });
        });
    }

    /*
        Kill stomp conn held by message consumer
     */
    private killConsumer = (): Promise<void> => {
        return new Promise((resolve) => {
            if (!this.consumer) {
                resolve();
            } else {
                this.consumer.kill()
                .then(() => {
                    this.consumer = null;
                    resolve();
                });
            }
        });
    }

    /*
        Copies supplied config object to settings for sharing with sub components
     */
    private mergeConfig = (config: IClientConfig): void => {
        const {defaultConfig} = settings;
        const prevConfig = this.clientConfig || defaultConfig;

        prepConfig(config, defaultConfig);
        this.clientConfig = {...prevConfig, ...config};

        if (!this.api) {
            this.api = new API(this.clientConfig.accessToken, this.clientConfig.environment);
        } else {
            this.api.configureClient(this.clientConfig.accessToken, this.clientConfig.environment);
        }

        this.getAnalyticsProperty();
    }

    /*
        Get the GA property per storyId passed in
     */
    private getAnalyticsProperty = (): void => {
        const {api, clientConfig: {storyId}, eventDelegateRefs: {ERROR}} = this;

        api.getTrackingId(storyId)
        .then((story: any) => {
            const {gaTrackingId} = story;

            if (gaTrackingId) {
                this.gaProperty = gaTrackingId;

                if (this.player) {
                    this.player.setGaProperty(gaTrackingId);
                }

                Analytics.setup();

                this.doPageView();
                window.addEventListener('popstate', () => this.doPageView());
            }
        })
        .catch((e) => {
            const wrappedError = new HTTPError('httpFailure', null, e);
            ExceptionPipe.trapError(wrappedError, storyId, ERROR);
        });
    }

    /*
        Emit a GA page view event each time popstate occurs or the ga prop gets set
     */
    private doPageView = (): void => {
        const {gaProperty} = this;

        Analytics.send({
            prp: gaProperty,
            t: 'pageview',
            dp: window.location.pathname
        });
    }

    /*
        Update render history state
     */
    private updateHistory = (key: string, value: string): void => {
        if (this.renderHistory[key] !== value) {
            this.renderHistory[key] = value;
        }
    }
}

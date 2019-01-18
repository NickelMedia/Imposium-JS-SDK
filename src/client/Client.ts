import API from './http/API';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {printVersion} from '../scaffolding/Version';

import {
    ClientConfigurationError,
    PlayerConfigurationError,
    ModerationError,
    NetworkError
} from '../scaffolding/Exceptions';

import {
    prepConfig,
    keyExists,
    cloneWithKeys,
    isFunc
} from '../scaffolding/Helpers';

export interface IClientConfig {
    accessToken: string;
    storyId: string;
    actId: string;
    sceneId: string;
    environment: string;
    pollLifetime: number;
}

const settings = require('../conf/settings.json').client;

export default class Client {

    public static events = {
        EXPERIENCE_CREATED: 'EXPERIENCE_CREATED',
        UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
        GOT_EXPERIENCE: 'GOT_EXPERIENCE',
        STATUS_UPDATE: 'STATUS_UPDATE',
        ERROR: 'ERROR'
    };

    public clientConfig: IClientConfig = null;

    private readonly defaultPollRate: number = settings.defaultPollRate;
    private readonly backoffAtInterval: number = settings.backoffAtInterval;
    private readonly maxPollFrequency: number = settings.maxPollFrequency;

    private eventDelegateRefs: any = cloneWithKeys(Client.events);
    private api: API = null;
    private player: VideoPlayer = null;
    private consumer: MessageConsumer = null;
    private gaProperty: string = '';
    private playerIsFallback: boolean = false;
    private getExperienceTimeout: any = null;
    private pollLifetimeTimeout: any = null;

    /*
        Initialize Imposium client
     */
    constructor(config: any) {
        printVersion();

        if (config.storyId && config.accessToken) {
            this.assignConfigOpts(config);
        } else {
            if (!config.storyId) {
                throw new ClientConfigurationError('storyId', null);
            }

            if (!config.accessToken) {
                throw new ClientConfigurationError('accessToken', null);
            }
        }
    }

    /*
        Exposed for users who may want to re-use a client for n stories
     */
    public setup = (config: any) => {
        this.assignConfigOpts(config);
    }

    /*
        Set current video player ref
     */
    public setPlayer = (player: VideoPlayer, isFallback: boolean = false) => {
        const {clientConfig: {storyId}} = this;

        this.playerIsFallback = isFallback;
        this.player = player;

        player.setStoryId(storyId);
    }

    /*
        Sets a callback for an event
     */
    public on = (eventName: string, callback: any): void => {
        const {clientConfig: {storyId}, eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

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

    /*
        Turns off a specific event or all events
     */
    public off = (eventName: string = ''): void => {
        const {clientConfig: {storyId}, eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

        try {
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

    /*
        Get experience data via http
     */
    public getExperience = (experienceId: string, interval: number = -1, frequency: number = -1): void => {
        const {
            api,
            player,
            gaProperty,
            clientConfig: {storyId},
            eventDelegateRefs: {GOT_EXPERIENCE, STATUS_UPDATE, ERROR}
        } = this;

        try {
            if (GOT_EXPERIENCE || player) {
                api.getExperience(experienceId)
                .then((experience: any) => {
                    const {id, output, rendering, moderation_status} = experience;

                    if (Object.keys(output).length > 0) {
                        if (player) {
                            player.experienceGenerated(experience);
                        }

                        if (STATUS_UPDATE) {
                            STATUS_UPDATE({status: 'Video ready for viewing.'});
                        }

                        if (GOT_EXPERIENCE) {
                            GOT_EXPERIENCE(experience);
                        }
                    } else {
                        if (moderation_status === 'rejected') {
                            throw new ModerationError('rejection', id);
                        }

                        if (interval < 0) {
                            this.renderExperience(id, rendering);
                        } else {
                            this.doPoll(experienceId, interval, frequency);
                        }
                    }
                })
                .catch((e) => {
                    const wrappedError = new NetworkError('httpFailure', experienceId, e);
                    ExceptionPipe.trapError(wrappedError, storyId, ERROR);
                });
            } else {
                throw new ClientConfigurationError('eventNotConfigured', Client.events.GOT_EXPERIENCE);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Create new experience & return relevant meta
     */
    public createExperience = (inventory: any, render: boolean = true): void => {
        const {
            player,
            playerIsFallback,
            clientConfig: {
                storyId
            },
            eventDelegateRefs: {
                GOT_EXPERIENCE,
                EXPERIENCE_CREATED,
                STATUS_UPDATE,
                UPLOAD_PROGRESS,
                ERROR
            }
        } = this;

        const permitRender: boolean = ((render && player !== null && !playerIsFallback) || isFunc(GOT_EXPERIENCE));
        const permitCreate: boolean = isFunc(EXPERIENCE_CREATED);

        try {
            if (permitRender || permitCreate) {
                const {api} = this;

                if (STATUS_UPDATE && render) {
                    STATUS_UPDATE({status: 'Adding job to queue...'});
                }

                api.postExperience(storyId, inventory, render, UPLOAD_PROGRESS)
                .then((experience: any) => {
                    const {clientConfig: {sceneId, actId}} = this;
                    const {id, rendering} = experience;

                    if (EXPERIENCE_CREATED) {
                        EXPERIENCE_CREATED(experience);
                    }

                    if (render) {
                        if (STATUS_UPDATE && render) {
                            STATUS_UPDATE({status: 'Added job to queue...'});
                        }

                        this.renderExperience(id, rendering);
                    }
                })
                .catch((e) => {
                    const wrappedError = new NetworkError('httpFailure', null, e);
                    ExceptionPipe.trapError(wrappedError, storyId, ERROR);
                });
            } else {
                let eventType = null;

                if (!EXPERIENCE_CREATED) {
                    eventType = Client.events.EXPERIENCE_CREATED;
                }

                if (render && !GOT_EXPERIENCE) {
                    eventType = Client.events.GOT_EXPERIENCE;
                }

                throw new ClientConfigurationError('eventNotConfigured', eventType);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId, ERROR);
        }
    }

    /*
        Invokes rendering processes and starts listening for messages
     */
    public renderExperience = (experienceId: string, isRendering: boolean): void => {
        const {consumer} = this;

        if (!consumer) {
            this.makeConsumer(experienceId, isRendering);
        } else {
            consumer.kill()
            .then(() => {
                this.makeConsumer(experienceId, isRendering);
            });
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
        Copies supplied config object to settings for sharing with sub components
     */
    private assignConfigOpts = (config: any) => {
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

        api.getStory(storyId)
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
            const wrappedError = new NetworkError('httpFailure', null, e);
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
        Runs a poll if STOMP / socket fails
     */
    private doPoll = (experienceId: string, interval: number, frequency: number) => {
        const {backoffAtInterval, maxPollFrequency, clientConfig: {pollLifetime}} = this;

        let adjustedFrequency: number = 0;

        if (interval <= backoffAtInterval) {
            adjustedFrequency = frequency;
        } else {
            const frequencyExpo: number = frequency * 2;
            adjustedFrequency = (frequencyExpo >= maxPollFrequency) ? frequency : frequencyExpo;
        }

        interval = interval + 1;

        if (!this.pollLifetimeTimeout) {
            this.pollLifetimeTimeout = setTimeout(
                () => this.killPoll(experienceId),
                pollLifetime
            );
        }

        if (this.pollLifetimeTimeout) {
            this.getExperienceTimeout = setTimeout(
                () => this.getExperience(experienceId, interval, adjustedFrequency),
                adjustedFrequency
            );
        }
    }

    private killPoll = (experienceId: string): void => {
        const {eventDelegateRefs: {ERROR}, clientConfig: {storyId}} = this;
        const wrappedError = new NetworkError('pollTimeout', experienceId, null);

        clearTimeout(this.getExperienceTimeout);
        ExceptionPipe.trapError(wrappedError, storyId, ERROR);
    }

    /*
        Invokes the streaming process
     */
    private startMessaging = (experienceId: string): void => {
        const {api, clientConfig: {storyId}, eventDelegateRefs: {ERROR, STATUS_UPDATE}} = this;

        api.invokeStream(experienceId)
        .then((jobId: string) => {
            if (jobId) {
                STATUS_UPDATE({status: 'Added job to queue...'});
            }
        })
        .catch((e) => {
            const wrappedError = new NetworkError('httpFailure', experienceId, e);
            ExceptionPipe.trapError(wrappedError, storyId, ERROR);
        });
    }

    /*
        Make a new consumer w/ delegates
     */
    private makeConsumer = (experienceId: string, isRendering: boolean): void => {
        const {defaultPollRate, clientConfig: {storyId, environment}, eventDelegateRefs, player} = this;
        const start = (!isRendering) ? () => this.startMessaging(experienceId) : null;
        const invokePolling = () => this.getExperience(experienceId, 0, defaultPollRate);

        // Merge scoped startMessaging call with client events
        const delegates: any = {
            start,
            invokePolling,
            ...eventDelegateRefs
        };

        this.consumer = new MessageConsumer(
            environment,
            storyId,
            experienceId,
            delegates,
            player
        );
    }
}

import 'babel-polyfill';

import API from './http/API';
import MessageConsumer from './tcp/MessageConsumer';
import Analytics from '../analytics/Analytics';
import VideoPlayer from '../video/VideoPlayer';
import FallbackPlayer from '../video/FallbackPlayer';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {
    ClientConfigurationError,
    EnvironmentError,
    NetworkError
} from '../scaffolding/Exceptions';

import {
    prepConfig,
    keyExists,
    cloneWithKeys,
    isFunc,
    isNode
} from '../scaffolding/Helpers';

interface IClientConfig {
    accessToken: string;
    storyId: string;
    actId: string;
    sceneId: string;
    environment: string;
}

const settings = require('../conf/settings.json').client;

/*
    Log out Imposium.js Version in the console
 */
const version = '[AIV]{version}[/AIV]';
console.log(`%cPowered By%c Imposium%c v${version}%c https: //imposium.com`,
    'text-transform: uppercase; padding: 5px 0px 5px 5px; background-color: black; color: white;',
    'text-transform: uppercase; padding: 5px 0px 5px 0px; background-color: black; color: #a1b83a;',
    'padding: 5px 5px 5px 0px; background-color: black; color: white;',
    'padding: 5px 5px 5px 0px;');

export default class Client {

    public static events = {
        EXPERIENCE_CREATED: 'EXPERIENCE_CREATED',
        UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
        GOT_EXPERIENCE: 'GOT_EXPERIENCE',
        STATUS_UPDATE: 'STATUS_UPDATE',
        ERROR: 'ERROR'
    };

    private eventDelegateRefs: any = cloneWithKeys(Client.events);
    private api: API = null;
    private player: VideoPlayer = null;
    private consumer: MessageConsumer = null;
    private clientConfig: IClientConfig = null;
    private gaProperty: string = '';

    /*
        Initialize Imposium client
     */
    constructor(config: any) {
        if (config.accessToken && config.storyId) {
            this.assignConfigOpts(config);
        } else {
            // do throw setup err, make new one for this that spits our creds??
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
    public setPlayer = (player: VideoPlayer) => {
        this.player = player;
    }

    /*
        Sets a callback for an event
     */
    public on = (eventName: string, callback: any): void => {
        const {eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

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
            ExceptionPipe.trapError(e, ERROR);
        }
    }

    /*
        Turns off a specific event or all events
     */
    public off = (eventName: string = ''): void => {
        const {eventDelegateRefs, eventDelegateRefs: {ERROR}} = this;

        try {
            if (eventName !== '') {
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
            ExceptionPipe.trapError(e, ERROR);
        }
    }

    /*
        Get experience data
     */
    public getExperience = (experienceId: string): void => {
        const {api, player, gaProperty, eventDelegateRefs: {GOT_EXPERIENCE, ERROR}} = this;

        try {
            if (GOT_EXPERIENCE || player) {
                api.getExperience(experienceId)
                .then((experience: any) => {
                    const {output, id} = experience;

                    if (Object.keys(output).length > 0) {
                        if (player) {
                            player.experienceGenerated(experience);
                        }

                        if (GOT_EXPERIENCE) {
                            GOT_EXPERIENCE(experience);
                        }
                    } else {
                        this.renderExperience(id);
                    }
                })
                .catch((e) => {
                    const wrappedError = new NetworkError('httpFailure', experienceId, e);
                    ExceptionPipe.trapError(wrappedError, ERROR);
                });
            } else {
                throw new ClientConfigurationError('eventNotConfigured', Client.events.GOT_EXPERIENCE);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, ERROR);
        }
    }

    /*
        Create new experience & return relevant meta
     */
    public createExperience = (inventory: any, render: boolean = true): void => {
        const {
            player,
            eventDelegateRefs: {
                GOT_EXPERIENCE,
                EXPERIENCE_CREATED,
                UPLOAD_PROGRESS,
                ERROR
            }
        } = this;

        const permitRender = (render && (player || EXPERIENCE_CREATED));
        const permitCreate = (!render && GOT_EXPERIENCE);
        try {
            if (permitRender || permitCreate) {
                const {api, clientConfig: {storyId}} = this;

                api.postExperience(storyId, inventory, UPLOAD_PROGRESS)
                .then((experience: any) => {
                    const {clientConfig: {sceneId, actId}} = this;
                    const {id} = experience;

                    if (EXPERIENCE_CREATED) {
                        EXPERIENCE_CREATED(experience);
                    }
                    if (render) {
                        this.renderExperience(id);
                    }
                })
                .catch((e) => {
                    const wrappedError = new NetworkError('httpFailure', null, e);
                    ExceptionPipe.trapError(wrappedError, ERROR);
                });
            } else {
                let eventType = null;

                if (render && !GOT_EXPERIENCE) {
                    eventType = Client.events.GOT_EXPERIENCE;
                }
                if (!render && !EXPERIENCE_CREATED) {
                    eventType = Client.events.EXPERIENCE_CREATED;
                }

                throw new ClientConfigurationError('eventNotConfigured', eventType);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, ERROR);
        }
    }

    /*
        Sets up analytics using fallback video player wrapper class
     */
    public captureAnalytics = (playerRef: HTMLVideoElement = null): void => {
        const {eventDelegateRefs: {onError}} = this;

        try {
            if (!isNode()) {
                this.setPlayer(new FallbackPlayer(playerRef));
            } else {
                throw new EnvironmentError('node');
            }
        } catch (e) {
            ExceptionPipe.trapError(e, onError);
        }
    }

    /*
        Copies supplied config object to settings for sharing with sub components
     */
    private assignConfigOpts = (config: any) => {
        const prevConfig = this.clientConfig;
        const {defaultConfig} = settings;

        prepConfig(config, defaultConfig);
        this.clientConfig = {...defaultConfig, ...config};

        if (!this.api) {
            this.api = new API(this.clientConfig.accessToken, this.clientConfig.environment);
        } else {
            this.api.configureClient(this.clientConfig.accessToken, this.clientConfig.environment);
        }

        // Prep for analytics in browser
        if (!isNode()) {
            this.getAnalyticsProperty();
        }
    }

    /*
        Get the GA property per storyId passed in
     */
    private getAnalyticsProperty = (): void => {
        const {api, player, clientConfig: {storyId}, eventDelegateRefs: {ERROR}} = this;

        api.getStory(storyId)
        .then((story: any) => {
            const {gaTrackingId} = story;

            this.gaProperty = gaTrackingId;
            if (player) {
                player.setGaProperty(gaTrackingId);
            }

            Analytics.setup();

            this.doPageView();
            window.addEventListener('popstate', () => this.doPageView());
        })
        .catch((e) => {
            const wrappedError = new NetworkError('httpFailure', null, e);
            ExceptionPipe.trapError(wrappedError, ERROR);
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
        Invokes the streaming process
     */
    private startMessaging = (experienceId): void => {
        const {api, eventDelegateRefs: {ERROR}} = this;

        api.invokeStream(experienceId)
        .catch((e) => {
            const wrappedError = new NetworkError('httpFailure', experienceId, e);
            ExceptionPipe.trapError(wrappedError, ERROR);
        });
    }

    /*
        Make a new consumer w/ delegates
     */
    private makeConsumer = (experienceId: string): void => {
        const {clientConfig: {environment}, eventDelegateRefs, player} = this;

        // Merge scoped startMessaging call with client events
        const delegates: any = {
            start: (id: string) => this.startMessaging(id),
            ...eventDelegateRefs
        };

        this.consumer = new MessageConsumer(
            environment,
            experienceId,
            delegates,
            player
        );
    }

    /*
        Invokes rendering processes and starts listening for messages
     */
    private renderExperience = (experienceId: string): void => {
        const {consumer} = this;
        if (!consumer) {
            this.makeConsumer(experienceId);
        } else {
            consumer.kill()
            .then(() => {
                this.makeConsumer(experienceId);
            });
        }
    }
}
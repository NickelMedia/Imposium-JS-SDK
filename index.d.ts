declare module 'Imposium-JS-SDK/scaffolding/Exceptions' {
	export abstract class ImposiumError extends Error {
	    log: () => void;
	    protected prefix: string;
	    protected type: string;
	    constructor(message: string, type: string);
	}
	export class EnvironmentError extends ImposiumError {
	    constructor(messageKey: string, type?: string);
	    log: () => void;
	}
	export class ModerationError extends ImposiumError {
	    private experienceId;
	    constructor(messageKey: string, experienceId: string, type?: string);
	    log: () => void;
	}
	export class ClientConfigurationError extends ImposiumError {
	    private eventName;
	    constructor(messageKey: string, eventName: string, type?: string);
	    log: () => void;
	}
	export class PlayerConfigurationError extends ImposiumError {
	    private eventName;
	    constructor(messageKey: string, eventName: string, type?: string);
	    log: () => void;
	}
	export class NetworkError extends ImposiumError {
	    private experienceId;
	    private networkError;
	    constructor(messageKey: string, experienceId: string, e: Error, type?: string);
	    log: () => void;
	}
	export class UncaughtError extends ImposiumError {
	    private uncaughtError;
	    constructor(messageKey: string, e: Error, type?: string);
	    log: () => void;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/Version' {
	export const version = "[AIV]{version}[/AIV]";
	export const printVersion: () => void;

}
declare module 'Imposium-JS-SDK/scaffolding/ExceptionPipe' {
	export default class ExceptionPipe {
	    static logWarning: (type: string, messageKey: string) => void;
	    static trapError: (e: any, storyId: string, errorEvent?: (e: any) => any) => void;
	    private static readonly errorsProperty;
	    private static logError;
	    private static traceError;
	}

}
declare module 'Imposium-JS-SDK/analytics/Analytics' {
	export default class Analytics {
	    static setup: () => void;
	    static send: (event: any) => void;
	    private static emitter;
	    private static retryTimeout;
	    private static request;
	    private static checkCache;
	    private static setCache;
	    private static s4;
	    private static generateGuid;
	    private static getRandom;
	    private static concatParams;
	    private static makeRequest;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/Helpers' {
	export const isNode: () => boolean;
	export const prepConfig: (config: any, defaults: any) => void;
	export const inRangeNumeric: (n: number, min: number, max: number) => boolean;
	export const isFunc: (f: any) => boolean;
	export const keyExists: (o: any, key: string) => number;
	export const cloneWithKeys: (o: any) => {};
	export const calculateMbps: (startTime: number, filesize: number) => number;
	export const calculateAverageMbps: (speeds: number[]) => number;
	export const inventoryToFormData: (s: string, i: any) => any;
	export const generateUUID: () => string;

}
declare module 'Imposium-JS-SDK/client/http/API' {
	export default class API {
	    static getGATrackingPixel: (url: string) => Promise<null>;
	    static checkBandwidth: () => Promise<number>;
	    private static readonly testImage;
	    private static readonly retry;
	    private http;
	    constructor(accessToken: string, env: string);
	    configureClient: (accessToken: string, env: string) => void;
	    getStory: (storyId: string) => Promise<any>;
	    getExperience: (experienceId: string) => Promise<any>;
	    postExperience: (storyId: string, inventory: any, render: boolean, uuid: string, progress?: (e: any) => any) => Promise<any>;
	    invokeStream: (experienceId: string) => Promise<string>;
	    private getAuthHeader;
	    private doPostExperience;
	    private uploadProgress;
	}

}
declare module 'Imposium-JS-SDK/client/tcp/Stomp' {
	export default class Stomp {
	    private static readonly exchange;
	    private static readonly username;
	    private static readonly password;
	    private experienceId;
	    private delegates;
	    private endpoint;
	    private socket;
	    private client;
	    private subscription;
	    constructor(experienceId: string, delegates: any, env: string);
	    init: () => Promise<undefined>;
	    disconnectAsync: () => any;
	    private establishSubscription;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/Queue' {
	export default class Queue {
	    private q;
	    constructor();
	    enqueue: (item: any) => void;
	    pop: () => void;
	    reset: () => void;
	    peek: () => any;
	    isEmpty: () => boolean;
	    getLength: () => number;
	}

}
declare module 'Imposium-JS-SDK/video/VideoPlayer' {
	export interface IVideo {
	    id: string;
	    url: string;
	    format: string;
	    width: number;
	    height: number;
	    filesize: number;
	    duration: number;
	    rate: number;
	}
	export default abstract class VideoPlayer {
	    private static readonly intervalRate;
	    private static readonly playbackEvents;
	    experienceGenerated: (exp: IVideo) => void;
	    protected node: HTMLVideoElement;
	    protected storyId: string;
	    private readonly mediaEvents;
	    private experienceId;
	    private gaProperty;
	    private prevPlaybackEvent;
	    private playbackInterval;
	    private deferredGaCalls;
	    constructor(node: HTMLVideoElement);
	    remove: () => void;
	    setGaProperty: (gaProperty: string) => void;
	    setStoryId: (storyId: string) => void;
	    protected setExperienceId: (experienceId: string) => void;
	    private onLoad;
	    private onPlay;
	    private onPause;
	    private checkPlayback;
	    private onEnd;
	}

}
declare module 'Imposium-JS-SDK/client/tcp/MessageConsumer' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	export default class MessageConsumer {
	    private static readonly MAX_RETRIES;
	    private static readonly EVENT_NAMES;
	    private stompDelegates;
	    private env;
	    private storyId;
	    private experienceId;
	    private clientDelegates;
	    private stomp;
	    private player;
	    private retried;
	    constructor(env: string, storyId: string, experienceId: string, clientDelegates: any, player: VideoPlayer);
	    connect: () => Promise<undefined>;
	    kill: () => Promise<undefined>;
	    private routeMessageData;
	    private emitMessageData;
	    private emitSceneData;
	    private stompError;
	}

}
declare module 'Imposium-JS-SDK/video/FallbackPlayer' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	export default class FallbackPlayer extends VideoPlayer {
	    constructor(node: HTMLVideoElement);
	    experienceGenerated: (experience: any) => void;
	}

}
declare module 'Imposium-JS-SDK/client/Client' {
	import 'babel-polyfill';
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	export interface IClientConfig {
	    accessToken: string;
	    storyId: string;
	    actId: string;
	    sceneId: string;
	    environment: string;
	}
	export default class Client {
	    static events: {
	        EXPERIENCE_CREATED: string;
	        UPLOAD_PROGRESS: string;
	        GOT_EXPERIENCE: string;
	        STATUS_UPDATE: string;
	        ERROR: string;
	    };
	    clientConfig: IClientConfig;
	    private maxCreateRetries;
	    private eventDelegateRefs;
	    private api;
	    private player;
	    private consumer;
	    private gaProperty;
	    private playerIsFallback;
	    constructor(config: any);
	    setup: (config: any) => void;
	    setPlayer: (player: VideoPlayer, isFallback?: boolean) => void;
	    on: (eventName: string, callback: any) => void;
	    off: (eventName?: string) => void;
	    getExperience: (experienceId: string) => void;
	    createExperience: (inventory: any, render?: boolean, retry?: number) => void;
	    captureAnalytics: (playerRef?: HTMLVideoElement) => void;
	    private assignConfigOpts;
	    private getAnalyticsProperty;
	    private doPageView;
	    private doCreateExperience;
	    private warmConsumer;
	    private killConsumer;
	}

}
declare module 'Imposium-JS-SDK/video/Player' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	import Client from 'Imposium-JS-SDK/client/Client';
	export interface IPlayerConfig {
	    volume: number;
	    preload: string;
	    loop: boolean;
	    muted: boolean;
	    autoLoad: boolean;
	    autoPlay: boolean;
	    controls: boolean;
	    qualityOverride: string;
	}
	export default class ImposiumPlayer extends VideoPlayer {
	    static events: {
	        PLAY: string;
	        PAUSE: string;
	        COMPLETE: string;
	        ERROR: string;
	        SEEK: string;
	        TIME: string;
	        VOLUME: string;
	        MUTE: string;
	        CONTROLS: string;
	    };
	    private static readonly STREAM_TYPE;
	    private static readonly BANDWIDTH_SAMPLES;
	    private static readonly bandwidthRatings;
	    private static readonly compressionLevels;
	    private static readonly hlsSupportLevels;
	    private eventDelegateRefs;
	    private hlsSupport;
	    private hlsPlayer;
	    private experienceCache;
	    private clientRef;
	    private imposiumPlayerConfig;
	    constructor(node: HTMLVideoElement, client: Client, config?: IPlayerConfig);
	    init: (config: IPlayerConfig) => void;
	    experienceGenerated: (experience: any) => void;
	    on: (eventName: string, callback: any) => void;
	    off: (eventName: string) => void;
	    play: () => void;
	    pause: () => void;
	    getPlaybackState: () => string;
	    getPosition: () => number;
	    getDuration: () => number;
	    seek: (seekTo: number) => void;
	    getMute: () => boolean;
	    setMute: (mute: boolean) => void;
	    getVolume: () => number;
	    setVolume: (volume: number) => void;
	    getControls: () => boolean;
	    setControls: (controls: boolean) => void;
	    replay: () => void;
	    remove: () => void;
	    private setupHls;
	    private doQualityOverride;
	    private doQualityAssessment;
	    private checkBandwidth;
	    private setPlayerData;
	    private pauseIfPlaying;
	}

}
declare module 'Imposium-JS-SDK/entry' {
	import Client from 'Imposium-JS-SDK/client/Client';
	import Player from 'Imposium-JS-SDK/video/Player';
	export { Client, Player, clientEvents as Events, playerEvents as PlayerEvents };

}

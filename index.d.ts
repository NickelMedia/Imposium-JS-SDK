declare module 'Imposium-JS-SDK/scaffolding/Exceptions' {
	export abstract class ImposiumError extends Error {
	    log: () => void;
	    protected prefix: string;
	    protected type: string;
	    constructor(message: string, type: string);
	}
	export class ModerationError extends ImposiumError {
	    private experienceId;
	    constructor(messageKey: string, experienceId: string);
	    log: () => void;
	}
	export class ClientConfigurationError extends ImposiumError {
	    private eventName;
	    constructor(messageKey: string, eventName: string);
	    log: () => void;
	}
	export class PlayerConfigurationError extends ImposiumError {
	    private eventName;
	    constructor(messageKey: string, eventName: string);
	    log: () => void;
	}
	export class NetworkError extends ImposiumError {
	    private experienceId;
	    private networkError;
	    private lazy;
	    constructor(messageKey: string, experienceId: string, e: Error | CloseEvent, lazy?: boolean);
	    log: () => void;
	}
	export class UncaughtError extends ImposiumError {
	    private uncaughtError;
	    constructor(messageKey: string, e: Error);
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
	export const prepConfig: (config: any, defaults: any) => void;
	export const inRangeNumeric: (n: number, min: number, max: number) => boolean;
	export const isFunc: (f: any) => boolean;
	export const keyExists: (o: any, key: string) => number;
	export const cloneWithKeys: (o: any) => {};
	export const calculateMbps: (startTime: number, filesize: number) => number;
	export const calculateAverageMbps: (speeds: number[]) => number;
	export const generateUUID: () => string;
	export const inventoryToFormData: (storyId: string, inventory: any) => any;

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
	import * as WebStomp from 'webstomp-client';
	export interface IStompConfig {
	    experienceId: string;
	    environment: string;
	    delegates: IConsumerDelegates;
	}
	export interface IConsumerDelegates {
	    route: (f: WebStomp.Frame) => void;
	    error: (e: CloseEvent) => void;
	}
	export default class Stomp {
	    private static readonly EXCHANGE;
	    private static readonly USERNAME;
	    private static readonly PASSWORD;
	    private static readonly OPEN_STATE;
	    private experienceId;
	    private delegates;
	    private endpoint;
	    private socket;
	    private client;
	    private subscription;
	    constructor(c: IStompConfig);
	    init: () => Promise<undefined>;
	    private establishSubscription;
	    disconnectAsync: () => Promise<undefined>;
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
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	export default abstract class VideoPlayer {
	    private static readonly intervalRate;
	    private static readonly playbackEvents;
	    experienceGenerated: (exp: IExperience) => void;
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
	import { IExperienceOutput, IClientEvents } from 'Imposium-JS-SDK/client/Client';
	export interface IConsumerConfig {
	    environment: string;
	    storyId: string;
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
	export default class MessageConsumer {
	    private static readonly MAX_RETRIES;
	    private static readonly EVENT_NAMES;
	    private stompDelegates;
	    private environment;
	    private storyId;
	    private experienceId;
	    private retried;
	    private stomp;
	    private player;
	    private clientDelegates;
	    constructor(c: IConsumerConfig);
	    connect: () => Promise<undefined>;
	    kill: () => Promise<undefined>;
	    private routeMessageData;
	    private emitMessageData;
	    private emitSceneData;
	    private stompError;
	}

}
declare module 'Imposium-JS-SDK/video/FallbackPlayer' {
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	export default class FallbackPlayer extends VideoPlayer {
	    constructor(node: HTMLVideoElement);
	    experienceGenerated: (experience: IExperience) => void;
	}

}
declare module 'Imposium-JS-SDK/client/Client' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
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
	export default class Client {
	    static events: {
	        EXPERIENCE_CREATED: string;
	        UPLOAD_PROGRESS: string;
	        GOT_EXPERIENCE: string;
	        STATUS_UPDATE: string;
	        ERROR: string;
	    };
	    clientConfig: IClientConfig;
	    private eventDelegateRefs;
	    private api;
	    private player;
	    private consumer;
	    private gaProperty;
	    private playerIsFallback;
	    private maxCreateRetries;
	    private renderHistory;
	    private emits;
	    constructor(config: IClientConfig);
	    setup: (config: IClientConfig) => void;
	    setPlayer: (player: VideoPlayer, isFallback?: boolean) => void;
	    on: (eventName: string, callback: any) => void;
	    off: (eventName?: string) => void;
	    getExperience: (experienceId: string) => void;
	    createExperience: (inventory: any, render?: boolean, retry?: number) => void;
	    captureAnalytics: (playerRef?: HTMLVideoElement) => void;
	    private mergeConfig;
	    private getAnalyticsProperty;
	    private doPageView;
	    private doCreateExperience;
	    private warmConsumer;
	    private killConsumer;
	    private updateHistory;
	}

}
declare module 'Imposium-JS-SDK/video/Player' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	import Client, { IExperience } from 'Imposium-JS-SDK/client/Client';
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
	    experienceGenerated: (experience: IExperience) => void;
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
	import 'core-js/es6/promise';
	import 'core-js/fn/symbol/key-for';
	import 'core-js/fn/object/assign';
	import Client from 'Imposium-JS-SDK/client/Client';
	import Player from 'Imposium-JS-SDK/video/Player';
	export { Client, Player, clientEvents as Events, playerEvents as PlayerEvents };

}

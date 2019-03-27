declare module 'Imposium-JS-SDK/scaffolding/Version' {
	export const version = "[AIV]{version}[/AIV]";
	export const printVersion: () => void;

}
declare module 'Imposium-JS-SDK/scaffolding/Exceptions' {
	import { AxiosError } from 'axios';
	export abstract class ImposiumError extends Error {
	    log: () => void;
	    protected type: string;
	    protected version: string;
	    protected storyId: string;
	    protected logHeader: string;
	    constructor(message: string, type: string);
	    setStoryId: (s: string) => void;
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
	export class HTTPError extends ImposiumError {
	    private experienceId;
	    private axiosError;
	    constructor(messageKey: string, experienceId: string, e: AxiosError);
	    log: () => void;
	}
	export class SocketError extends ImposiumError {
	    private experienceId;
	    private closeEvent;
	    constructor(messageKey: string, experienceId: string, evt: CloseEvent);
	    log: () => void;
	}
	export class UncaughtError extends ImposiumError {
	    private uncaughtError;
	    constructor(messageKey: string, e: Error);
	    log: () => void;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/ExceptionPipe' {
	import { ImposiumError } from 'Imposium-JS-SDK/scaffolding/Exceptions';
	export default class ExceptionPipe {
	    static logWarning: (type: string, messageKey: string) => void;
	    static trapError: (e: any, storyId: string, callback?: (e: ImposiumError) => () => any) => void;
	    private static sentryClient;
	    private static hub;
	    private static projectName;
	    private static cleanDucktype;
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
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	export interface ITrackingResponse {
	    gaTrackingId: string;
	}
	export default class API {
	    private static readonly retry;
	    private http;
	    private storyId;
	    constructor(accessToken: string, env: string, storyId: string);
	    getTrackingId: () => Promise<ITrackingResponse>;
	    getExperience: (experienceId: string) => Promise<any>;
	    postExperience: (inventory: any, render: boolean, uuid: string, progress?: (p: number) => any) => Promise<IExperience>;
	    triggerRender: (experienceId: string) => Promise<string>;
	    private getAuthHeader;
	    private uploadProgress;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/GoogleAnalytics' {
	export interface IGAProtocol {
	    v?: string;
	    tid?: string;
	    z?: string;
	    cid?: string;
	    t: string;
	    ec: string;
	    ea: string;
	    el: string;
	    ev?: string;
	}
	export interface IGACache {
	    uuid: string;
	    expiry: number;
	}
	export default class GoogleAnalytics {
	    static pullClientId: (now?: Date) => void;
	    static send: (event: IGAProtocol) => void;
	    private static readonly BASE_URL;
	    private static readonly CACHE_KEY;
	    private static CLIENT_ID;
	}

}
declare module 'Imposium-JS-SDK/video/VideoPlayer' {
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	export interface IBaseMediaEvents {
	    play: () => void;
	    pause: () => void;
	    ended: () => void;
	    loadeddata: () => void;
	}
	export default abstract class VideoPlayer {
	    private static readonly intervalRate;
	    private static readonly playbackEvents;
	    private static readonly GA_EMIT_TYPE;
	    private static readonly GA_EMIT_CATEGORY;
	    experienceGenerated: (exp: IExperience) => void;
	    protected node: HTMLVideoElement;
	    protected storyId: string;
	    private readonly baseMediaEvents;
	    private gaProperty;
	    private experienceId;
	    private prevPlaybackEvent;
	    private playbackInterval;
	    private queuedGACalls;
	    constructor(node: HTMLVideoElement);
	    remove: () => void;
	    setGaProperty: (gaProperty: string) => void;
	    setStoryId: (storyId: string) => void;
	    protected setExperienceId: (experienceId: string) => void;
	    private emitGAEvent;
	    private onLoad;
	    private onPlay;
	    private onPause;
	    private checkPlayback;
	    private onEnd;
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
declare module 'Imposium-JS-SDK/client/stomp/Client' {
	import { DelegateMap } from 'Imposium-JS-SDK/client/DeliveryPipe';
	export interface IStompConfig {
	    experienceId: string;
	    environment: string;
	    consumerDelegates: DelegateMap;
	}
	export default class Stomp {
	    private static readonly EXCHANGE;
	    private static readonly USERNAME;
	    private static readonly PASSWORD;
	    private static readonly OPEN_STATE;
	    private static readonly DEBUG_OFF;
	    private experienceId;
	    private consumerDelegates;
	    private socket;
	    private client;
	    private subscription;
	    constructor(c: IStompConfig);
	    init: () => Promise<void>;
	    private doSubscribe;
	    disconnectAsync: () => Promise<void>;
	}

}
declare module 'Imposium-JS-SDK/client/stomp/Consumer' {
	import { IExperienceOutput } from 'Imposium-JS-SDK/client/Client';
	import { DelegateMap } from 'Imposium-JS-SDK/client/DeliveryPipe';
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
	export default class MessageConsumer {
	    private static readonly MAX_RETRIES;
	    private static readonly EMITS;
	    private retried;
	    private environment;
	    private experienceId;
	    private deliveryDelegates;
	    private stomp;
	    constructor(c: IConsumerConfig);
	    connect: () => Promise<void>;
	    kill: () => Promise<void>;
	    private validateFrame;
	    private emitMessageData;
	    private emitSceneData;
	    private stompError;
	}

}
declare module 'Imposium-JS-SDK/client/DeliveryPipe' {
	import API from 'Imposium-JS-SDK/client/http/API';
	export type VoidDelegate = (...args) => void;
	export type DelegateMap = Map<string, VoidDelegate>;
	export interface IDeliveryPipeConfig {
	    api: API;
	    clientDelegates: DelegateMap;
	    environment: string;
	}
	export interface ICreateConfig {
	    inventory: any;
	    render: boolean;
	    uuid: string;
	    uploadProgress: (n: number) => any;
	}
	export default class DeliveryPipe {
	    private static readonly POLL_INTERVAL;
	    private static readonly WS_MODE;
	    private static readonly POLL_MODE;
	    private mode;
	    private environment;
	    private shortPollTimeout;
	    private api;
	    private consumer;
	    private clientDelegates;
	    private configCache;
	    constructor(c: IDeliveryPipeConfig);
	    setMode: (mode: string) => void;
	    doGetExperience: (experienceId: string) => void;
	    createPrestep: (inventory: any, render: boolean, uploadProgress: (n: number) => any) => void;
	    private startRender;
	    private consumeOnRefresh;
	    private doCreate;
	    private startConsumer;
	    private killConsumer;
	    private consumerFailure;
	}

}
declare module 'Imposium-JS-SDK/client/Client' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	import { IEmitData } from 'Imposium-JS-SDK/client/stomp/Consumer';
	export type ExperienceCreated = ((e: IExperience) => any);
	export type GotExperience = ((e: IExperience) => any);
	export type StatusUpdate = ((m: IEmitData) => any);
	export type onError = ((e: Error) => any);
	export type UploadProgress = ((n: number) => any);
	export interface IClientEvents {
	    EXPERIENCE_CREATED?: ExperienceCreated & string;
	    GOT_EXPERIENCE?: GotExperience & string;
	    STATUS_UPDATE?: StatusUpdate & string;
	    ERROR?: onError & string;
	    UPLOAD_PROGRESS?: UploadProgress & string;
	}
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
	    static eventNames: IClientEvents;
	    clientConfig: IClientConfig;
	    private eventDelegateRefs;
	    private deliveryPipe;
	    private player;
	    private renderHistory;
	    private emits;
	    private gaProperty;
	    private playerIsFallback;
	    constructor(config: IClientConfig);
	    setup: (config: IClientConfig) => void;
	    bindPlayer: (player: VideoPlayer, isFallback?: boolean) => void;
	    on: (eventName: string, callback: any) => void;
	    off: (eventName?: string) => void;
	    captureAnalytics: (playerRef?: HTMLVideoElement) => void;
	    getExperience: (experienceId: string) => void;
	    createExperience: (inventory: any, render?: boolean) => void;
	    private updateHistory;
	    private experienceCreated;
	    private gotExperience;
	    private gotMessage;
	    private internalError;
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
	    private static readonly TEST_IMAGE;
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
	    private sampleBandwidth;
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

declare module 'Imposium-JS-SDK/scaffolding/Helpers' {
	export const prepConfig: (config: any, defaults: any) => void;
	export const inRangeNumeric: (n: number, min: number, max: number) => boolean;
	export const isFunc: (f: any) => boolean;
	export const keyExists: (o: any, key: string) => number;
	export const cloneWithKeys: (o: any) => any;
	export const calculateMbps: (startTime: number, filesize: number) => number;
	export const calculateAverageMbps: (speeds: number[]) => number;
	export const generateUUID: () => string;
	export const inventoryToFormData: (storyId: string, inventory: any, compositionId?: string) => any;

}
declare module 'Imposium-JS-SDK/client/http/API' {
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	export interface ITrackingResponse {
	    gaTrackingId: string;
	}
	export default class API {
	    private http;
	    private storyId;
	    private compositionId;
	    constructor(accessToken: string, env: string, storyId: string, compositionId?: string);
	    getGAProperty: () => Promise<ITrackingResponse>;
	    get: (experienceId: string) => Promise<any>;
	    fetch: (inventory: any, uuid: string, progress?: (p: number) => any, experienceId?: string) => Promise<IExperience>;
	    create: (inventory: any, render: boolean, uuid: string, progress?: (p: number) => any) => Promise<IExperience>;
	    private getAuthHeader;
	    private uploadProgress;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/Version' {
	export const version: any;
	export const printVersion: () => void;

}
declare module 'Imposium-JS-SDK/scaffolding/Exceptions' {
	import { AxiosError } from 'Imposium-JS-SDK/axios';
	export abstract class ImposiumError extends Error {
	    log: () => void;
	    protected type: string;
	    protected version: string;
	    protected storyId: string;
	    protected logHeader: string;
	    constructor(message: string, type: string);
	    setStoryId: (s: string) => void;
	}
	export class RenderError extends ImposiumError {
	    private experienceId;
	    constructor(message: any, experienceId: string);
	    log: () => void;
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
	    constructor(messageKey: string, experienceId: string, e?: AxiosError);
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
	    static trapError: (e: any, storyId: string, callback?: (evt: ImposiumError) => () => any) => void;
	    private static sentryClient;
	    private static hub;
	    private static cleanDucktype;
	}

}
declare module 'Imposium-JS-SDK/scaffolding/GoogleAnalytics' {
	export interface IGAProtocol {
	    v?: string;
	    ds?: string;
	    tid?: string;
	    dr?: string;
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
	    static gaPlacement: string;
	    static initialize: (placement: string) => void;
	    static send: (event: IGAProtocol) => void;
	    private static readonly BASE_URL;
	    private static readonly CACHE_KEY;
	    private static CLIENT_ID;
	}

}
declare module 'Imposium-JS-SDK/video/VideoPlayer' {
	import { IExperience } from 'Imposium-JS-SDK/client/Client';
	export default abstract class VideoPlayer {
	    private static readonly INTERVAL_RATE;
	    private static readonly PLAYBACK_EVENTS;
	    private static readonly GA_EMIT_TYPE;
	    private static readonly GA_EMIT_CATEGORY;
	    abstract experienceGenerated: (exp: IExperience) => void;
	    protected node: HTMLVideoElement;
	    protected storyId: string;
	    protected gaProperty: string;
	    private readonly playbackHandlers;
	    private queuedGACalls;
	    private experienceId;
	    private prevPlaybackEvent;
	    private playbackInterval;
	    private muted;
	    constructor(node: HTMLVideoElement);
	    remove: () => void;
	    setGaProperty: (gaProperty: string) => void;
	    setStoryId: (storyId: string) => void;
	    protected setExperienceId: (experienceId: string) => void;
	    private emitGAEventAction;
	    private onLoad;
	    private onVolumeChange;
	    private onPlay;
	    private onPause;
	    private onEnded;
	    private checkPlayback;
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
declare module 'Imposium-JS-SDK/client/DirectDeliveryPipe' {
	import API from 'Imposium-JS-SDK/client/http/API';
	export type VoidDelegate = (...args: any[]) => void;
	export type DelegateMap = Map<string, VoidDelegate>;
	export interface IDirectDeliveryPipeConfig {
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
	export interface IFetchConfig {
	    inventory: any;
	    uuid: string;
	    uploadProgress: (n: number) => any;
	}
	export default class DirectDeliveryPipe {
	    private pollTimeout;
	    private killPollTimeout;
	    private api;
	    private clientDelegates;
	    private configCache;
	    constructor(c: IDirectDeliveryPipeConfig);
	    getExperience: (experienceId: string) => void;
	    fetchExperience: (inventory: any, uploadProgress: (n: number) => any, retries?: number, experienceId?: string) => void;
	    createExperience: (inventory: any, render: boolean, uploadProgress: (n: number) => any, retries?: number) => void;
	    private killPoll;
	    private pollForExperience;
	}

}
declare module 'Imposium-JS-SDK/client/Client' {
	import VideoPlayer from 'Imposium-JS-SDK/video/VideoPlayer';
	export type ExperienceCreated = ((e: IExperience) => any);
	export type GotExperience = ((e: IExperience) => any);
	export type onError = ((e: Error) => any);
	export type UploadProgress = ((n: number) => any);
	export interface IClientEvents {
	    EXPERIENCE_CREATED?: ExperienceCreated & string;
	    GOT_EXPERIENCE?: GotExperience & string;
	    ERROR?: onError & string;
	    UPLOAD_PROGRESS?: UploadProgress & string;
	}
	export interface IClientConfig {
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
	export interface IExperience {
	    id: string;
	    rendering: boolean;
	    date_created: number;
	    moderation_status: string;
	    error?: string;
	    input: any;
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
	    gaProperty: string;
	    private directDeliveryPipe;
	    private player;
	    private renderHistory;
	    private eventDelegateRefs;
	    private playerIsFallback;
	    constructor(config: IClientConfig);
	    setup: (config: IClientConfig) => void;
	    bindPlayer: (player: VideoPlayer, isFallback?: boolean) => void;
	    on: (eventName: string, callback: any) => void;
	    off: (eventName?: string) => void;
	    captureAnalytics: (playerRef?: HTMLVideoElement) => void;
	    getExperience: (experienceId: string) => void;
	    createExperience: (inventory: any, render?: boolean) => void;
	    renderExperience: (inventory: any) => void;
	    renderExperienceFromId: (experienceId: any) => void;
	    private updateHistory;
	    private experienceCreated;
	    private gotExperience;
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
declare module 'Imposium-JS-SDK/Entry' {
	import 'Imposium-JS-SDK/core-js/es/promise';
	import 'Imposium-JS-SDK/core-js/features/symbol/key-for';
	import 'Imposium-JS-SDK/core-js/features/map/of';
	import 'Imposium-JS-SDK/core-js/features/object/assign';
	import Client from 'Imposium-JS-SDK/client/Client';
	import Player from 'Imposium-JS-SDK/video/Player'; const clientEvents: {
	    EXPERIENCE_CREATED?: import("./client/Client").ExperienceCreated & string;
	    GOT_EXPERIENCE?: import("./client/Client").GotExperience & string;
	    ERROR?: import("./client/Client").onError & string;
	    UPLOAD_PROGRESS?: import("./client/Client").UploadProgress & string;
	}, playerEvents: {
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
	export { Client, Player, clientEvents as Events, playerEvents as PlayerEvents };

}

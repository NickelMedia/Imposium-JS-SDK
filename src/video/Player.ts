import API from '../client/http/API';
import VideoPlayer, {IVideo} from './VideoPlayer';
import Client from '../client/Client';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {
    calculateAverageMbps,
    inRangeNumeric,
    prepConfig,
    isFunc,
    isNode,
    keyExists
} from '../scaffolding/Helpers';

import {
    EnvironmentError,
    PlayerConfigurationError
} from '../scaffolding/Exceptions';

interface IPlayerConfig {
    volume: number;
    preload: string;
    loop: boolean;
    muted: boolean;
    autoLoad: boolean;
    autoPlay: boolean;
    controls: boolean;
}

const settings = require('../conf/settings.json').videoPlayer;

let Hls = null;

if (!isNode()) {
    Hls = require('hls.js/dist/hls.light.min');
}

export default class ImposiumPlayer extends VideoPlayer {

    private static readonly STREAM_TYPE = settings.streamType;
    private static readonly BANDWIDTH_SAMPLES: number = settings.bandwidthSamples;

    private static readonly bandwidthRatings: any = {
        LOW: settings.bandwidth.low,
        MID: settings.bandwidth.mid,
    };

    private static readonly compressionLevels: any = {
        STREAM: settings.compression.stream,
        LOW: settings.compression.low,
        MID: settings.compression.mid,
        HIGH: settings.compression.high
    };

    private static readonly hlsSupportLevels: any = {
        NATIVE : settings.hlsSupportLevels.native,
        HLSJS  : settings.hlsSupportLevels.hlsjs
    };

    public events = {
        PLAY: 'play',
        PAUSE: 'pause',
        COMPLETE: 'ended',
        ERROR: 'error',
        SEEK: 'seeked',
        TIME: 'timeupdate',
        VOLUME: 'volumechange',
        MUTE: 'muted',
        CONTROLS: 'controlsset'
    };

    private eventDelegateRefs: any = {
        play: {callback: null, native: true},
        pause: {callback: null, native: true},
        ended: {callback: null, native: true},
        error: {callback: null, native: true},
        seeked: {callback: null, native: true},
        timeupdated: {callback: null, native: true},
        volumechanged: {callback: null, native: true},
        muted: {callback: null, native: false},
        controlsset: {callback: null, native: false}
    };

    private hlsSupport: string = '';
    private singleFile: boolean = false;
    private hlsPlayer: any = null;
    private experienceCache: any[] = [];
    private clientRef: Client = null;
    private ImposiumPlayerConfig: IPlayerConfig = null;

    constructor(node: HTMLVideoElement, client: Client, config: IPlayerConfig = settings.defaultConfig) {
        super(node);

        try {
            if (client) {
                client.setPlayer(this);
                this.init(config);
                this.setupHls();
            } else {
                const {storyId} = this;
                throw new PlayerConfigurationError('noClient', storyId, null);
            }
        } catch (e) {
            ExceptionPipe.trapError(e);
        }
    }

    /*
        Assigns config
     */
    public init = (config: IPlayerConfig): void => {
        const {defaultConfig} = settings;

        prepConfig(config, defaultConfig);
        this.ImposiumPlayerConfig = {...defaultConfig, ...config};

        for (const key in this.ImposiumPlayerConfig) {
            if (this.ImposiumPlayerConfig[key]) {
                this.node[key] = this.ImposiumPlayerConfig[key];
            }
        }
    }

    /*
        Set a live stream or fallback to bandwidth checking / auto assigning a file
     */
    public experienceGenerated = (experience: any): void => {
        const {experienceCache, hlsSupport, node} = this;
        const {compressionLevels: {STREAM}} = ImposiumPlayer;
        const {id, output: {videos}} = experience;
        const hasStream = videos.hasOwnProperty(STREAM);
        let poster;

        if (experience.output.images) {
            poster = experience.output.images.poster;
        }

        this.singleFile = false;
        this.setExperienceId(id);
        experienceCache.push(experience);

        if (hasStream && hlsSupport) {
            this.setPlayerData(videos[STREAM].url, poster);
        } else {
            const compressionKeys = Object.keys(videos);

            if (compressionKeys.length === 1) {
                this.singleFile = true;
                this.setPlayerData(videos[compressionKeys[0]].url, poster);
            } else {
                this.checkBandwidth(videos)
                .then((compression: string) => {
                    this.setPlayerData(videos[compression].url, poster);
                })
                .catch((fallbackCompression: string) => {
                    this.setPlayerData(videos[fallbackCompression].url, poster);
                });
            }
        }
    }

    /*
        Enable native or custom ImposiumPlayer events
     */
    public on = (eventName: string, callback: any): void => {
        const {storyId, eventDelegateRefs} = this;

        try {
            if (isFunc(callback)) {
                if (keyExists(this.events, eventName)) {
                    const event = eventDelegateRefs[eventName];

                    // Add ptr for future removal
                    event.callback = callback;

                    // If the event type is a valid media event, assign to ImposiumPlayer node
                    if (event.native) {
                        this.node.addEventListener(eventName, event.callback);
                    }
                } else {
                    throw new PlayerConfigurationError('invalidEventName', storyId, eventName);
                }
            } else {
                throw new PlayerConfigurationError('invalidCallbackType', storyId, eventName);
            }
        } catch (e) {
            ExceptionPipe.trapError(e);
        }
    }

    /*
        Disable native or custom ImposiumPlayer events
     */
    public off = (eventName: string): void => {
        const {storyId, eventDelegateRefs} = this;

        try {
            if (keyExists(this.events, eventName)) {
                const event = eventDelegateRefs[eventName];

                // Remove node based event listener
                if (event.native) {
                    this.node.removeEventListener(eventName, event.callback);
                }

                event.callback = null;
            } else {
                throw new PlayerConfigurationError('invalidEventName', storyId, eventName);
            }
        } catch (e) {
            ExceptionPipe.trapError(e);
        }
    }

    /*
        Play video
     */
    public play = (): void => {
        this.node.play();
    }

    /*
        Pause video
     */
    public pause = (): void => {
        this.node.pause();
    }

    /*
        TO DO: Clarify what this is with Greg
     */
    public getPlaybackState = (): string => {
        return (this.node.paused) ? 'paused' : 'playing';
    }

    /*
        Get current playback time (s)
     */
    public getPosition = (): number => {
        return this.node.currentTime;
    }

    /*
        Get duration of video (s)
     */
    public getDuration = (): number => {
        return this.node.duration;
    }

    /*
        Seek to a point in the video (s)
     */
    public seek = (seekTo: number, retry: number = -1): void => {
        const {node: {duration}} = this;

        if (!isNaN(duration)) {
            if (inRangeNumeric(seekTo, 0, duration)) {
                this.node.currentTime = seekTo;
            } else {
                ExceptionPipe.logWarning('playerFailure', 'invalidSeekTime');
            }
        } else {
            ExceptionPipe.logWarning('playerFailure', 'seekNotReady');
        }
    }

    /*
        Get mute state
     */
    public getMute = (): boolean => {
        return this.node.muted;
    }

    /*
        Set mute state
     */
    public setMute = (mute: boolean): void => {
        const {eventDelegateRefs: {muted}} = this;

        this.node.muted = mute;

        if (muted) {
            muted.callback();
        }
    }

    /*
        Get volume state
     */
    public getVolume = (): number => {
        return this.node.volume;
    }

    /*
        Set volume set, valid range: 0.0 -> 1.0
     */
    public setVolume = (volume: number): void => {
        const {volumeMin, volumeMax} = settings;

        if (inRangeNumeric(volume, volumeMin, volumeMax)) {
            this.node.volume = volume;
        } else {
            ExceptionPipe.logWarning('playerFailure', 'invalidVolume');
        }
    }

    /*
        Get controls state
     */
    public getControls = (): boolean => {
        return this.node.controls;
    }

    /*
        Set controls state
     */
    public setControls = (controls: boolean): void => {
        const {eventDelegateRefs: {controlsset}} = this;

        this.node.controls = controls;

        if (controlsset) {
            controlsset.callback();
        }
    }

    /*
        Replay video
     */
    public replay = (): void => {
        this.pauseIfPlaying();
        this.node.currentTime = 0;
        this.node.play();
    }

    /*
        Remove all Imposium ImposiumPlayer scaffolding and break ref to video node
     */
    public remove = (): void => {
        const {eventDelegateRefs} = this;
        const {defaultConfig} = settings;

        this.pauseIfPlaying();

        for (const key of Object.keys(eventDelegateRefs)) {
            this.off(eventDelegateRefs[key]);
        }

        this.ImposiumPlayerConfig = {...defaultConfig};
        this.node = null;
    }

    /*
        Determine if browser can natively support media source extensions, if not
        use hls-js if possible, if hls-js is not supported do nothing.
     */
    private setupHls = (): void => {
        const {hlsSupportLevels: {NATIVE, HLSJS}} = ImposiumPlayer;

        if (this.node.canPlayType(ImposiumPlayer.STREAM_TYPE)) {
            this.hlsSupport = NATIVE;
        } else if (Hls.isSupported()) {
            this.hlsSupport = HLSJS;
        }
    }

    /*
        Adapt quality manually if HLS cannot be supported
     */
    private checkBandwidth = (videos: any): Promise<string> => {
        const {bandwidthRatings, compressionLevels, BANDWIDTH_SAMPLES} = ImposiumPlayer;
        const testPromises: Array<Promise<number>> = [];

        for (let i = 0; i < BANDWIDTH_SAMPLES; i++) {
            testPromises.push(API.checkBandwidth());
        }

        return new Promise((resolve, reject) => {
            Promise.all(testPromises)
            .then((speeds: number[]) => {
                const speed = calculateAverageMbps(speeds);
                const has1080 = (videos.hasOwnProperty(compressionLevels.HIGH));

                if (speed >= bandwidthRatings.LOW && speed <= bandwidthRatings.MID) {
                    resolve(compressionLevels.MID);
                } else if (speed >= bandwidthRatings.MID && !has1080) {
                    resolve(compressionLevels.MID);
                } else if (speed >= bandwidthRatings.MID && has1080) {
                    resolve(compressionLevels.HIGH);
                }
            })
            .catch((e) => {
                reject(compressionLevels.LOW);
            });
        });
    }

    /*
        Set player data once video file was selected
     */
    private setPlayerData = (videoSrc: string, posterSrc: string = null): void => {
        const {hlsSupport, singleFile} = this;
        const {hlsSupportLevels: {NATIVE, HLSJS}} = ImposiumPlayer;

        if (hlsSupport === NATIVE || !hlsSupport || singleFile) {
            this.node.src = videoSrc;
        } else if (hlsSupport === HLSJS) {
            if (this.hlsPlayer) {
                this.hlsPlayer.destroy();
            }

            this.hlsPlayer = new Hls();
            this.hlsPlayer.attachMedia(this.node);
            this.hlsPlayer.loadSource(videoSrc);
        }

        if (posterSrc) {
            this.node.poster = posterSrc;
        }
    }

    /*
        Pause the media stream if playing
     */
    private pauseIfPlaying = (): void => {
        if (!this.node.paused) {
            this.node.pause();
        }
    }
}

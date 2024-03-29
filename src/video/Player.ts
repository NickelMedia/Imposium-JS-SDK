import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import VideoPlayer from './VideoPlayer';
import Client, {IExperience} from '../client/Client';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {PlayerConfigurationError} from '../scaffolding/Exceptions';

import {
    calculateMbps,
    calculateAverageMbps,
    inRangeNumeric,
    prepConfig,
    isFunc,
    keyExists
} from '../scaffolding/Helpers';

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

const settings = require('../conf/settings.json').videoPlayer;

const hls = (window as any).hls;

export default class ImposiumPlayer extends VideoPlayer {

    public static events = {
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

    private static readonly STREAM_TYPE = settings.streamType;
    private static readonly BANDWIDTH_SAMPLES: number = settings.bandwidthSamples;
    private static readonly TEST_IMAGE: string = settings.testImage;

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
        NATIVE: settings.hlsSupportLevels.native,
        HLSJS: settings.hlsSupportLevels.hlsjs
    };

    private eventDelegateRefs: any = {
        play: {callback: null, native: true},
        pause: {callback: null, native: true},
        ended: {callback: null, native: true},
        error: {callback: null, native: true},
        seeked: {callback: null, native: true},
        timeupdate: {callback: null, native: true},
        volumechanged: {callback: null, native: true},
        muted: {callback: null, native: false},
        controlsset: {callback: null, native: false}
    };

    private hlsSupport: string = '';
    private hlsPlayer: any = null;
    private imposiumPlayerConfig: IPlayerConfig = null;

    constructor(node: HTMLVideoElement, client: Client, config: IPlayerConfig = settings.defaultConfig) {
        super(node);

        const validClient: boolean = !!(client && client.clientConfig);

        try {
            if (!validClient) {
                throw new PlayerConfigurationError('badClient', null);
            }

            if (node instanceof HTMLVideoElement) {
                client.bindPlayer(this);
                this.init(config);
                this.setupHls();
            }
        } catch (e) {
            const storyId: string = (validClient) ? client.clientConfig.storyId : '';
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Assigns config
     */
    public init = (config: IPlayerConfig): void => {
        const {defaultConfig} = settings;

        prepConfig(config, defaultConfig);
        this.imposiumPlayerConfig = {...defaultConfig, ...config};

        for (const key in this.imposiumPlayerConfig) {
            if (this.imposiumPlayerConfig[key]) {
                this.node[key] = this.imposiumPlayerConfig[key];
            }
        }
    }

    /*
        Set a live stream or fallback to bandwidth checking / auto assigning a file
     */
    public experienceGenerated = (experience: IExperience): void => {
        const {qualityOverride} = this.imposiumPlayerConfig;

        const {id, output: {videos, images}} = experience;
        let poster = '';

        this.setExperienceId(id);

        if (images && images.hasOwnProperty('poster')) {
            poster = images.poster;
        }

        if (qualityOverride) {
            this.doQualityOverride(videos, poster);
        } else {
            this.doQualityAssessment(videos, poster);
        }
    }

    /*
        Enable native or custom ImposiumPlayer events
     */
    public on = (eventName: string, callback: any): void => {
        const {storyId, eventDelegateRefs} = this;

        try {
            if (isFunc(callback)) {
                if (keyExists(ImposiumPlayer.events, eventName)) {
                    const event = eventDelegateRefs[eventName];

                    // Add ptr for future removal
                    event.callback = callback;

                    // If the event type is a valid media event, assign to ImposiumPlayer node
                    if (event.native) {
                        this.node.addEventListener(eventName, event.callback);
                    }
                } else {
                    throw new PlayerConfigurationError('invalidEventName', eventName);
                }
            } else {
                throw new PlayerConfigurationError('invalidCallbackType', eventName);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Disable native or custom ImposiumPlayer events
     */
    public off = (eventName: string): void => {
        const {storyId, eventDelegateRefs} = this;

        try {
            if (keyExists(ImposiumPlayer.events, eventName)) {
                const event = eventDelegateRefs[eventName];

                // Remove node based event listener
                if (event.native) {
                    this.node.removeEventListener(eventName, event.callback);
                }

                event.callback = null;
            } else {
                throw new PlayerConfigurationError('invalidEventName', eventName);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Play video
     */
    public play = (): void => {
        this.node.play().catch(()=>{
            console.error('Error playing video');
        });
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
    public seek = (seekTo: number): void => {
        const {node: {duration}} = this;

        if (!isNaN(duration)) {
            seekTo = Math.floor(seekTo);

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
        const {eventDelegateRefs: {muted: {callback}}} = this;

        this.node.muted = mute;

        if (callback) {
            callback();
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

        volume = Math.round(volume * 10) / 10;

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
        this.play();
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

        this.imposiumPlayerConfig = {...defaultConfig};
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
        } else if (typeof hls !== 'undefined') {
            if (hls.isSupported()) {
                this.hlsSupport = HLSJS;
            }
        }
    }

    /*
        If the user has set a quality override string, serve the video
        at the setting provided
     */
    private doQualityOverride = (videos: any, poster: string): void => {
        const {storyId} = this;
        const {qualityOverride} = this.imposiumPlayerConfig;

        try {
            if (videos.hasOwnProperty(qualityOverride)) {
                this.setPlayerData(videos[qualityOverride].url, true, poster);
            } else {
                throw new PlayerConfigurationError('badQualityOverride', null);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, storyId);
        }
    }

    /*
        Determine if adaptive streaming can be used, if not do a manual bandwidth check
        to try and get a best guess of what quality setting to serve.
     */
    private doQualityAssessment = (videos: any, poster: string): void => {
        const {hlsSupport} = this;
        const {compressionLevels: {STREAM}} = ImposiumPlayer;
        const hasStream = videos.hasOwnProperty(STREAM);

        if (hasStream && hlsSupport) {
            this.setPlayerData(videos[STREAM].url, true, poster);
        } else {
            const formatKeys = Object.keys(videos);

            if (formatKeys.length === 1) {
                this.setPlayerData(videos[formatKeys[0]].url, false, poster);
            } else {
                this.checkBandwidth(videos)
                .then((format: string) => {
                    this.setPlayerData(videos[format].url, false, poster);
                })
                .catch((lowestQuality: string) => {
                    this.setPlayerData(videos[lowestQuality].url, false, poster);
                });
            }
        }
    }

    /*
        Take a sample in mbs of the users bandwidth
     */
    private sampleBandwidth = (): Promise<number> => {
        const url: string = `${ImposiumPlayer.TEST_IMAGE}?bust=${Math.random()}`;
        const config: AxiosRequestConfig = {responseType: 'blob', timeout: 1500};

        return new Promise((resolve, reject) => {
            const startTime: number = new Date().getTime();

            axios.get(url, config)
            .then((res: AxiosResponse) => {
                const {data: {size}} = res;
                resolve(calculateMbps(startTime, size));
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    /*
        Adapt quality manually if HLS cannot be supported
     */
    private checkBandwidth = (videos: any): Promise<string> => {
        const {BANDWIDTH_SAMPLES} = ImposiumPlayer;
        const testPromises: Promise<number>[] = [];
        const mp4FormatList: string[] = Object.keys(videos).filter((f) => f !== 'm3u8');

        for (let i = 0; i < BANDWIDTH_SAMPLES; i++) {
            testPromises.push(this.sampleBandwidth());
        }

        return new Promise((resolve, reject) => {
            Promise.all(testPromises)
            .then((speeds: number[]) => {
                // Get sampled mbps value
                const speed = calculateAverageMbps(speeds);
                const scaleMap = {};

                // Calculate n pixels (downscaled) for each format and map
                mp4FormatList.forEach((key) => {
                    const {width, height} = videos[key];
                    const scaledPixels = (width * height) / 100000;

                    scaleMap[scaledPixels] = key;
                });

                // Convert scaled pixel values to arr of float vals and get closest val to mbps
                const bestFit = Object.keys(scaleMap)
                    .map((key) => parseFloat(key))
                    .reduce((c, p) => (Math.abs(c - speed) < Math.abs(p - speed)) ? c : p);

                resolve(scaleMap[bestFit]);
            })
            .catch(() => {
                reject(mp4FormatList.slice(-1).pop());
            });
        });
    }

    /*
        Set player data once video file was selected
     */
    private setPlayerData = (videoSrc: string, invokeHls: boolean, posterSrc: string = null): void => {
        const {hlsSupport} = this;
        const {hlsSupportLevels: {HLSJS}} = ImposiumPlayer;

        if (invokeHls && hlsSupport === HLSJS) {
            if (this.hlsPlayer) {
                this.hlsPlayer.destroy();
            }

            this.hlsPlayer = new hls();
            this.hlsPlayer.attachMedia(this.node);
            this.hlsPlayer.loadSource(videoSrc);
        } else {
            this.node.src = videoSrc;
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

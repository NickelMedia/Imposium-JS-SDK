import ExceptionPipe from '../scaffolding/ExceptionPipe';
import GoogleAnalytics, {IGAProtocol} from '../scaffolding/GoogleAnalytics';
import {IExperience} from '../client/Client';
import {PlayerConfigurationError} from '../scaffolding/Exceptions';

const settings = require('../conf/settings.json').videoPlayer;

export interface IBaseMediaEvents {
    play: () => void;
    pause: () => void;
    ended: () => void;
    loadeddata: () => void;
}

export default abstract class VideoPlayer {

    // Playback event constants
    private static readonly intervalRate: number = settings.checkPlaybackRateMs;
    private static readonly playbackEvents: number[] = settings.playbackEvents;
    private static readonly GA_EMIT_TYPE: string = 'event';
    private static readonly GA_EMIT_CATEGORY: string = 'video_player';

    // Delegate placeholder
    public experienceGenerated: (exp: IExperience) => void;

    // HTML Video element ref, active storyId on client
    protected node: HTMLVideoElement = null;
    protected storyId: string = '';

    private readonly baseMediaEvents: IBaseMediaEvents = {
        play: () => this.onPlay(),
        pause: () => this.onPause(),
        ended: () => this.onEnd(),
        loadeddata: () => this.onLoad()
    };

    private gaProperty: string = '';
    private experienceId: string = '';
    private prevPlaybackEvent: number = 0;
    private playbackInterval: number = -1;
    private queuedGACalls: IGAProtocol[] = [];

    /*
        Basis of Imposum/Fallback video player objects
     */
    constructor(node: HTMLVideoElement) {
        try {
            if (node instanceof HTMLVideoElement) {
                const {baseMediaEvents, storyId} = this;

                this.node = node;

                for (const key of Object.keys(baseMediaEvents)) {
                    this.node.addEventListener(key, this.baseMediaEvents[key]);
                }
            } else {
                throw new PlayerConfigurationError('invalidPlayerRef', null);
            }
        } catch (e) {
            ExceptionPipe.trapError(e, '');
        }
    }

    /*
        Remove set events set on the supplied player reference
     */
    public remove = (): void => {
        const {baseMediaEvents, node} = this;

        for (const key of Object.keys(baseMediaEvents)) {
            node.removeEventListener(key, baseMediaEvents[key]);
        }
    }

    /*
        Set the current GA property and flush the pre mature GA calls
     */
    public setGaProperty = (gaProperty: string): void => {
        // Clear out queued GA requests if the user changes a story
        if (this.gaProperty && this.gaProperty !== gaProperty && this.queuedGACalls.length > 0) {
            this.queuedGACalls = [];
        }

        this.gaProperty = gaProperty;

        while (this.queuedGACalls.length) {
            GoogleAnalytics.send(this.queuedGACalls.pop());
        }
    }

    /*
        Set the current story id per client
     */
    public setStoryId = (storyId: string): void => {
        this.storyId = storyId;
    }

    /*
        Set the current experience id per job that gets passed to analytics calls
     */
    protected setExperienceId = (experienceId: string): void => {
        this.experienceId = experienceId;
    }

    /*
        Emit or queue a GA event call,
     */
    private emitGAEvent = (eventAction: string): void => {
        const call: IGAProtocol = {
            tid: this.gaProperty,
            t: VideoPlayer.GA_EMIT_TYPE,
            ec: VideoPlayer.GA_EMIT_CATEGORY,
            el: this.experienceId,
            ea: eventAction
        };

        if (this.gaProperty) {
            GoogleAnalytics.send(call);
        } else {
            this.queuedGACalls.push(call);
        }
    }

    /*
        Record a video "view" event when the player loads metadata successfully
     */
    private onLoad = (): void => {
        this.emitGAEvent('loaded');
    }

    /*
        Start an interval that runs during playback which triggers playback
        analytics calls
     */
    private onPlay = (): void => {
        const {setInterval} = window;

        clearInterval(this.playbackInterval);
        this.playbackInterval = setInterval(
            () => this.checkPlayback(),
            VideoPlayer.intervalRate
        );

        this.emitGAEvent('play');
    }

    /*
        Clear the interval on pause to ensure no false analytics calls occur
     */
    private onPause = (): void => {
        clearInterval(this.playbackInterval);

        if (this.node.duration !== this.node.currentTime) {
            this.emitGAEvent('pause');
        }
    }

    /*
        Logic that checks to see what playback event should be fire based
        on the current playback progress, clears the interval if the node
        is / becomes un set to prevent bad calls
     */
    private checkPlayback = (): void => {
        if (this.node) {
            const {currentTime, duration} = this.node;
            const perc: number = currentTime / duration;
            const next: number = VideoPlayer.playbackEvents[this.prevPlaybackEvent];

            if (perc > next) {
                this.emitGAEvent(`playback_${next}`);
                this.prevPlaybackEvent++;
            }
        } else {
            clearInterval(this.playbackInterval);
        }
    }

    /*
        Clear the playback interval and emit a final playback analytics call
     */
    private onEnd = (): void => {
        clearInterval(this.playbackInterval);

        this.emitGAEvent('playback_1');
        this.prevPlaybackEvent = 0;
    }
}

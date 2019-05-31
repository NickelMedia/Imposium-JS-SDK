import ExceptionPipe from '../scaffolding/ExceptionPipe';
import GoogleAnalytics, {IGAProtocol} from '../scaffolding/GoogleAnalytics';
import {IExperience} from '../client/Client';
import {PlayerConfigurationError} from '../scaffolding/Exceptions';

const settings = require('../conf/settings.json').videoPlayer;

type BaseMediaEvent = (...args) => void;
type BaseMediaEvents = Map<string, BaseMediaEvent>;

export default abstract class VideoPlayer {
    private static readonly INTERVAL_RATE: number = settings.checkPlaybackRateMs;
    private static readonly PLAYBACK_EVENTS: number[] = settings.playbackEvents;
    private static readonly GA_EMIT_TYPE: string = 'event';
    private static readonly GA_EMIT_CATEGORY: string = 'video_player';

    // Called when client gets experience data
    public abstract experienceGenerated: (exp: IExperience) => void;

    // HTML Video element ref, active storyId on client
    protected node: HTMLVideoElement = null;
    protected storyId: string = '';
    protected deviceType: string = '';

    // Base callbacks required in order to collect / measue. Add by media event name
    private readonly playbackHandlers: BaseMediaEvents = new Map(
        [
            ['play', () => this.onPlay()],
            ['pause', () => this.onPause()],
            ['ended', () => this.onEnded()],
            ['loadeddata', () => this.onLoad()],
            ['volumechange', () => this.onVolumeChange()]
        ],
    );

    private queuedGACalls: IGAProtocol[] = [];
    private gaProperty: string = '';
    private experienceId: string = '';
    private prevPlaybackEvent: number = 0;
    private playbackInterval: number = -1;
    private muted: boolean = false;

    /*
        Basis of Imposum / Fallback video player objects
     */
    constructor(node: HTMLVideoElement) {
        try {
            if (!(node instanceof HTMLVideoElement)) {
                throw new PlayerConfigurationError('invalidPlayerRef', null);
            }

            for (const [key, event] of this.playbackHandlers.entries()) {
                node.addEventListener(key, event);
            }

            this.node = node;
            this.muted = node.muted;
        } catch (e) {
            ExceptionPipe.trapError(e, this.storyId);
        }
    }

    /*
        Remove any callbacks bound to video player events
     */
    public remove = (): void => {
        for (const [key, event] of this.playbackHandlers.entries()) {
            this.node.removeEventListener(key, event);
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
        Set device type for dupont only
     */
    public setDeviceType = (deviceType: string): void => {
        this.deviceType = deviceType;
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
    private emitGAEventAction = (ea: string): void => {
        const {GA_EMIT_TYPE: t, GA_EMIT_CATEGORY: ec} = VideoPlayer;
        const {gaProperty: tid, experienceId: el} = this;
        const call: IGAProtocol = {t, tid, ec, el, ea};

        if (this.gaProperty) {
            // GoogleAnalytics.send(call);
            GoogleAnalytics.sendMatomoEvent({e_c: ec, e_a: ea, e_n: el}, this.storyId, this.deviceType);
        } else {
            this.queuedGACalls.push(call);
        }
    }

    /*
        Record loaded event
     */
    private onLoad = (): void => {
        this.emitGAEventAction('load');
    }

    /*
        Record mute events
     */
    private onVolumeChange = (): void => {
        if (!this.muted && this.node.muted) {
            this.emitGAEventAction('muted');
            this.muted = true;
        }

        if (this.muted && !this.node.muted) {
            this.emitGAEventAction('unmuted');
            this.muted = false;
        }
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
            VideoPlayer.INTERVAL_RATE
        );

        this.emitGAEventAction('play');
    }

    /*
        Clear the interval on pause to prevent false positives
     */
    private onPause = (): void => {
        clearInterval(this.playbackInterval);

        if (this.node.duration !== this.node.currentTime) {
            this.emitGAEventAction('pause');
        }
    }

    /*
        Clean up the timer and emit the final playback event
     */
    private onEnded = (): void => {
        clearInterval(this.playbackInterval);

        this.emitGAEventAction('playback_1');
        this.prevPlaybackEvent = 0;
    }

    /*
        Logic that checks to see what playback event should be fired based
        on the current playback progress, clears timer if markup context
        is lost.
     */
    private checkPlayback = (): void => {
        if (this.node) {
            const {currentTime, duration} = this.node;
            const perc: number = currentTime / duration;
            const next: number = VideoPlayer.PLAYBACK_EVENTS[this.prevPlaybackEvent];

            if (perc > next) {
                this.emitGAEventAction(`playback_${next}`);
                this.prevPlaybackEvent++;
            }
        } else {
            clearInterval(this.playbackInterval);
        }
    }
}

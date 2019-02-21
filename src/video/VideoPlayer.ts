import Queue from '../scaffolding/Queue';
import Analytics from '../analytics/Analytics';
import ExceptionPipe from '../scaffolding/ExceptionPipe';
import {IExperience} from '../client/Client';

import {PlayerConfigurationError} from '../scaffolding/Exceptions';

const settings = require('../conf/settings.json').videoPlayer;

export interface IBaseMediaEvents {
    play: () => void;
    pause: () => void;
    ended: () => void;
    loadStart: () => void;
}

export default abstract class VideoPlayer {

    // Playback event constants
    private static readonly intervalRate: number = settings.checkPlaybackRateMs;
    private static readonly playbackEvents: number[] = settings.playbackEvents;

    // Delegate placeholder
    public experienceGenerated: (exp: IExperience) => void;

    // HTML Video element ref, active storyId on client
    protected node: HTMLVideoElement = null;
    protected storyId: string = '';

    private readonly baseMediaEvents: IBaseMediaEvents = {
        play: () => this.onPlay(),
        pause: () => this.onPause(),
        ended: () => this.onEnd(),
        loadStart: () => this.onLoad()
    };
    
    private gaProperty: string = '';
    private experienceId: string = '';
    private prevPlaybackEvent: number = 0;
    private playbackInterval: number = -1;
    private deferredGaCalls: Queue = new Queue();

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
        const {deferredGaCalls} = this;

        // Flush out pending requests if the user changes a story
        if (this.gaProperty && this.gaProperty !== gaProperty && !deferredGaCalls.isEmpty()) {
            deferredGaCalls.reset();
        }

        this.gaProperty = gaProperty;

        while (deferredGaCalls.peek()) {
            Analytics.send(deferredGaCalls.peek());
            deferredGaCalls.pop();
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
        Record a video "view" event when the player loads metadata successfully
     */
    private onLoad = (): void => {
        const {gaProperty, experienceId, deferredGaCalls} = this;

        const call = {
            prp: gaProperty,
            t: 'event',
            ec: 'video_player',
            ea: 'view',
            el: experienceId
        };

        if (gaProperty) {
            Analytics.send(call);
        } else {
            deferredGaCalls.enqueue(call);
        }
    }

    /*
        Start an interval that runs during playback which triggers playback
        analytics calls
     */
    private onPlay = (): void => {
        const {gaProperty, experienceId, deferredGaCalls} = this;
        const {setInterval} = window;

        const call = {
            prp: gaProperty,
            t: 'event',
            ec: 'video_player',
            ea: 'play',
            el: experienceId
        };

        clearInterval(this.playbackInterval);

        this.playbackInterval = setInterval(
            () => this.checkPlayback(),
            VideoPlayer.intervalRate
        );

        if (gaProperty) {
            Analytics.send(call);
        } else {
            deferredGaCalls.enqueue(call);
        }
    }

    /*
        Clear the interval on pause to ensure no false analytics calls occur
     */
    private onPause = (): void => {
        const {gaProperty, experienceId, deferredGaCalls, playbackInterval, node} = this;

        const call = {
            prp: gaProperty,
            t: 'event',
            ec: 'video_player',
            ea: 'pause',
            el: experienceId
        };

        clearInterval(playbackInterval);

        if (node.duration !== node.currentTime) {
            if (gaProperty) {
                Analytics.send(call);
            } else {
                deferredGaCalls.enqueue(call);
            }
        }
    }

    /*
        Logic that checks to see what playback event should be fire based
        on the current playback progress, clears the interval if the node
        is / becomes un set to prevent bad calls
     */
    private checkPlayback = (): void => {
        const {
            node,
            prevPlaybackEvent,
            gaProperty,
            experienceId,
            deferredGaCalls,
            playbackInterval
        } = this;

        if (node) {
            const {currentTime, duration} = node;
            const perc: number = currentTime / duration;
            const next: number = VideoPlayer.playbackEvents[prevPlaybackEvent];

            if (perc > next) {
                const call = {
                    prp: gaProperty,
                    t: 'event',
                    ec: 'video_player',
                    ea: `playback_${next}`,
                    el: experienceId
                };

                if (gaProperty) {
                    Analytics.send(call);
                } else {
                    deferredGaCalls.enqueue(call);
                }

                this.prevPlaybackEvent++;
            }
        } else {
            clearInterval(playbackInterval);
        }
    }

    /*
        Clear the playback interval and emit a final playback analytics call
     */
    private onEnd = (): void => {
        const {gaProperty, experienceId, deferredGaCalls, playbackInterval} = this;

        clearInterval(playbackInterval);

        const call = {
            prp: gaProperty,
            t: 'event',
            ec: 'video_player',
            ea: 'playback_1',
            el: experienceId
        };

        if (gaProperty) {
            Analytics.send(call);
        } else {
            deferredGaCalls.enqueue(call);
        }

        this.prevPlaybackEvent = 0;
    }
}

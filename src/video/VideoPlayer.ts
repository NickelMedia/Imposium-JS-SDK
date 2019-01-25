import Queue from '../scaffolding/Queue';
import Analytics from '../analytics/Analytics';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {isNode} from '../scaffolding/Helpers';
import {EnvironmentError, PlayerConfigurationError} from '../scaffolding/Exceptions';

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

const settings = require('../conf/settings.json').videoPlayer;

export default abstract class VideoPlayer {

    private static readonly intervalRate: number = settings.checkPlaybackRateMs;
    private static readonly playbackEvents: number[] = settings.playbackEvents;
    public experienceGenerated: (exp: IVideo) => void;
    protected node: HTMLVideoElement = null;
    protected storyId: string = '';
    private readonly mediaEvents: any = {
        loadstart : () => this.onLoad(),
        play      : () => this.onPlay(),
        pause     : () => this.onPause(),
        ended     : () => this.onEnd()
    };
    private experienceId: string = '';
    private gaProperty: string = '';
    private prevPlaybackEvent: number = 0;
    private playbackInterval: any;
    private deferredGaCalls: Queue = new Queue();

    /*
        Basis of Imposum/Fallback video player objects
     */
    constructor(node: HTMLVideoElement) {
        const {mediaEvents, storyId} = this;

        this.node = node;

        for (const key of Object.keys(mediaEvents)) {
            try {
                this.node.addEventListener(key, this.mediaEvents[key]);
            } catch (e) {
                throw new PlayerConfigurationError('invalidPlayerRef', null);
            }
        }
    }

    /*
        Remove set events set on the supplied player reference
     */
    public remove = (): void => {
        const {mediaEvents, node} = this;

        for (const key of Object.keys(mediaEvents)) {
            node.removeEventListener(key, mediaEvents[key]);
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
            const perc = currentTime / duration;
            const next = VideoPlayer.playbackEvents[prevPlaybackEvent];

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

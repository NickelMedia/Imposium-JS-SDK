import Analytics from '../analytics/Analytics';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {isNode} from '../scaffolding/Helpers';
import {EnvironmentError, PlayerConfigurationError} from '../scaffolding/Exceptions';

export interface Video {
	id       : string;
	url      : string;
	format   : string;
	width    : number;
	height   : number;
	filesize : number;
	duration : number;
	rate     : number;
}

export interface VideoConfig {
	poster : string;
	videos : Video[];
}

const settings = require('../conf/settings.json').videoPlayer;

export default abstract class VideoPlayer {
	protected node:HTMLVideoElement = null;

	private static readonly intervalRate:number = settings.checkPlaybackRateMs;
	private static readonly playbackEvents:number[] = settings.playbackEvents;

	private readonly mediaEvents:any = {
		loadstart : () => this.onLoad(),
		play      : () => this.onPlay(),
		pause     : () => this.onPause(),
		ended     : () => this.onEnd()
	};

	private experienceId:string = '';
	private prevPlaybackEvent:number = 0;
	private playbackInterval:any;

	/*
		Basis of Imposum/Fallback video player objects
	 */
	constructor(node:HTMLVideoElement) {
		if (!isNode()) {
			if (node instanceof HTMLVideoElement) {
				const {mediaEvents} = this;

				this.node = node;

				for (const key of Object.keys(mediaEvents)) {
					this.node.addEventListener(key, this.mediaEvents[key]);
				}
			} else {
				// Prop passed wasn't of type HTMLVideoElement
				throw new PlayerConfigurationError('invalidPlayerRef', null);
			}
		} else {
			// Cancels out initialization in NodeJS
			throw new EnvironmentError('node');
		}
	}

	/*
		Set the current experience id per job that gets passed to analytics calls
	 */
	protected setExperienceId = (experienceId:string) => {
		this.experienceId = experienceId;
	}

	/*
		Placeholder, called when experiences get generated if a
		player ref is set on a client instance
	 */
	public experienceGenerated = (experience:any):void => {}


	/*
		Record a video "view" event when the player loads metadata successfully
	 */
	private onLoad = ():void => {
		const {experienceId} = this;

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'view',
			el : experienceId
		});
	}

	/*
		Start an interval that runs during playback which triggers playback
		analytics calls
	 */
	private onPlay = ():void => {
		clearInterval(this.playbackInterval);

		this.playbackInterval = setInterval(
			() => this.checkPlayback(), 
			VideoPlayer.intervalRate
		);
	}

	/*
		Clear the interval on pause to ensure no false analytics calls occur
	 */
	private onPause = ():void => {
		const {playbackInterval} = this;
		clearInterval(playbackInterval);
	}

	/*
		Clear the playback interval and emit a final playback analytics call
	 */
	private onEnd = ():void => {
		const {experienceId, playbackInterval} = this;

		clearInterval(playbackInterval);

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'playback_1',
			el : experienceId
		});

		this.prevPlaybackEvent = 0;
	}

	/*
		Logic that checks to see what playback event should be fire based
		on the current playback progress, clears the interval if the node
		is / becomes un set to prevent bad calls
	 */
	private checkPlayback = ():void => {
		const {
			node,
			prevPlaybackEvent,
			experienceId, 
			playbackInterval
		} = this;

        if (node) {
        	const {currentTime, duration} = node;
            const perc = currentTime / duration;
           	const next = VideoPlayer.playbackEvents[prevPlaybackEvent];

            if (perc > next) {                
                Analytics.send({
                	t  : 'event',
                	ec : 'video_player',
                	ea : `playback_${next}`,
					el : experienceId
                });

                this.prevPlaybackEvent++;
            }
        } else {
            clearInterval(playbackInterval);
        }
	}

	/*
		Remove set events set on the supplied player reference
	 */
	public remove = ():void => {
		const {mediaEvents, node} = this;

		for (const key of Object.keys(mediaEvents)) {
			node.removeEventListener(key, mediaEvents[key]);
		}
	}
}
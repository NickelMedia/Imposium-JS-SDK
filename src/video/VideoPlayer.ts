import Analytics from '../analytics/Analytics';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {isNode} from '../scaffolding/Helpers';
import {EnvironmentError, PlayerConfigurationError} from '../scaffolding/Exceptions';

const settings = require('../conf/settings.json').videoPlayer;

export default abstract class VideoPlayer {
	private static readonly intervalRate:number = settings.checkPlaybackRateMs;
	private static readonly playbackEvents:number[] = settings.playbackEvents;

	private readonly mediaEvents:any = {
		loadstart : () => this.onLoad(),
		play      : () => this.onPlay(),
		pause     : () => this.onPause(),
		ended     : () => this.onEnd()
	};

	protected static node:HTMLVideoElement = null;

	private static experienceId:string = '';
	private static prevPlaybackEvent:number = 0;
	private static playbackInterval:any;

	/*
		Basis of Imposum/Fallback video player objects
	 */
	constructor(node:HTMLVideoElement) {
		if (!isNode()) {
			if (node instanceof HTMLVideoElement) {
				VideoPlayer.node = node;

				for (const key in this.mediaEvents) {
					VideoPlayer.node.addEventListener(key, this.mediaEvents[key]);
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

	private onLoad = ():void => {
		const {experienceId} = VideoPlayer;

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'view',
			el : experienceId
		});
	}

	private onPlay = ():void => {
		const {
			intervalRate,
			playbackInterval
		} = VideoPlayer;

		clearInterval(playbackInterval);

		VideoPlayer.playbackInterval = setInterval(
			() => this.checkPlayback(), 
			intervalRate
		);
	}

	private onPause = ():void => {
		const {playbackInterval} = VideoPlayer;
		clearInterval(playbackInterval);
	}

	private onEnd = ():void => {
		const {
			experienceId,
			playbackInterval
		} = VideoPlayer;

		clearInterval(playbackInterval);

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'playback_1',
			el : experienceId
		});

		VideoPlayer.prevPlaybackEvent = 0;
	}

	private checkPlayback = ():void => {
		const {
			node, 
			playbackEvents,
			prevPlaybackEvent,
			experienceId, 
			playbackInterval
		} = VideoPlayer;

        if (node) {
        	const {currentTime, duration} = node;
            const perc = currentTime / duration;
           	const next = playbackEvents[prevPlaybackEvent];

            if (perc > next) {                
                Analytics.send({
                	t  : 'event',
                	ec : 'video_player',
                	ea : `playback_${next}`,
					el : experienceId
                });

                VideoPlayer.prevPlaybackEvent++;
            }
        } else {
            clearInterval(playbackInterval);
        }
	}

	public remove = ():void => {
		// do Remove
	}
}
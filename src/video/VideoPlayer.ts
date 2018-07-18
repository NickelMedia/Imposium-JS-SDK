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

	private experienceId:string = '';
	private prevPlaybackEvent:number = 0;
	private playbackInterval:any;

	protected node:HTMLVideoElement = null;

	/*
		Basis of Imposum/Fallback video player objects
	 */
	constructor(node:HTMLVideoElement) {
		if (!isNode()) {
			if (node instanceof HTMLVideoElement) {
				this.node = node;

				for (const key in this.mediaEvents) {
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

	private onLoad = ():void => {
		const {experienceId} = this;

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'view',
			el : experienceId
		});
	}

	private onPlay = ():void => {
		clearInterval(this.playbackInterval);

		this.playbackInterval = setInterval(
			() => this.checkPlayback(), 
			VideoPlayer.intervalRate
		);
	}

	private onPause = ():void => {
		clearInterval(this.playbackInterval);
	}

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

	public remove = ():void => {
		// do Remove
	}
}
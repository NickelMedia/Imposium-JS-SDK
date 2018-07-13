import Analytics from '../analytics/Analytics';

const settings = require('../conf/settings.json').videoPlayer;

export default class Playback {
	private static readonly mediaEvents:any = {
		loadstart : () => Playback.onLoad(),
		play      : () => Playback.onPlay(),
		pause     : () => Playback.onPause(),
		ended     : () => Playback.onEnd()
	};

	private static readonly playbackEvents:number[] = settings.playbackEvents;
	private static readonly intervalRate:number = settings.checkPlaybackRateMs;

	private static prevPlaybackEvent:number = 0;
	private static playbackInterval:any;
	private static playerRef:HTMLVideoElement = null;
	private static experienceId:string = '';

	public static setPlayerRef = (ref:HTMLVideoElement) => {
		Playback.playerRef = ref;

		for (const key in Playback.mediaEvents) {
			Playback.playerRef.addEventListener(key, Playback.mediaEvents[key]);
		}
	}

	public static updateExperience = (experienceId:string) => {
		Playback.experienceId = experienceId;
	}

	public static onLoad = ():void => {
		const {experienceId} = Playback;

		Analytics.send({
			t  : 'event',
			ec : 'video_player',
			ea : 'view',
			el : experienceId
		});
	}

	public static onPlay = ():void => {
		const {
			intervalRate,
			playbackInterval
		} = Playback;

		clearInterval(playbackInterval);

		Playback.playbackInterval = setInterval(
			() => Playback.checkPlayback(), 
			intervalRate
		);
	}

	public static onPause = ():void => {
		const {playbackInterval} = Playback;
		clearInterval(playbackInterval);
	}

	public static onEnd = ():void => {
		const {
			experienceId,
			playbackInterval
		} = Playback;

		clearInterval(playbackInterval);

		Analytics.send({
			t: 'event',
			ec: 'video_player',
			ea: 'playback_1',
			el: experienceId
		});

		Playback.prevPlaybackEvent = 0;
	}

	public static checkPlayback = ():void => {
		const {
			playerRef, 
			playbackEvents,
			prevPlaybackEvent,
			experienceId, 
			playbackInterval
		} = Playback;

        if (playerRef) {
        	const {currentTime, duration} = playerRef;
            const perc = currentTime / duration;
           	const next = playbackEvents[prevPlaybackEvent];

            if (perc > next) {                
                Analytics.send({
                	t  : 'event',
                	ec : 'video_player',
                	ea : 'playback_' + next,
					el : experienceId
                });

                Playback.prevPlaybackEvent++;
            }
        } else {
            clearInterval(playbackInterval);
        }
	}
}
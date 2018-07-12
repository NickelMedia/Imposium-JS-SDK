import Analytics from './Analytics';
import {errorHandler} from '../scaffolding/Helpers';

const errors = require('../conf/errors.json').video_player;
const settings = require('../conf/settings.json').video_player;

export default class VideoPlayer {
	// Allows playback events to be recorded
	public static updateId:boolean = false;

	// Interval data
	private static readonly evts:number[] = settings.playbackEvents;
	private static readonly checkRate:number = settings.checkPlaybackRateMs;
	
	private static ref:HTMLVideoElement = null;
	private static currExp:string = '';
	private static lastEvtFired:number = 0;
	private static startSent:boolean = false;
	private static finishedSent:boolean = false;
	private static progressCheckInterval:any;

	/*
		Assign the tracking events to a video player reference
	 */
	public static setup = (ref:HTMLVideoElement) => {
		if (ref instanceof HTMLVideoElement) {
			VideoPlayer.ref = ref;
			VideoPlayer.updateId = true;
			VideoPlayer.ref.addEventListener('loadstart', () => VideoPlayer.onLoad());
			VideoPlayer.ref.addEventListener('play',      () => VideoPlayer.onPlay());
			VideoPlayer.ref.addEventListener('pause',     () => VideoPlayer.onPause());
			VideoPlayer.ref.addEventListener('ended',     () => VideoPlayer.onEnd());
		} else {
			const {badRef} = errors;
			throw new Error(badRef);
		}
	}

	/*
		Store the experience ID related to the video currently being displayed
	 */
	public static updateExperienceID = (id:string) => {
		VideoPlayer.currExp = id;
	}

	/*
		Record video view hits
	 */
	private static onLoad = ():void => {
		const {currExp} = VideoPlayer;

		Analytics.send({
			t: 'event',
			ec: 'video_player',
			ea: 'view',
			el: currExp
		});
	}

	/*
		Start listening for playback progress when video starts playing
	 */
	private static onPlay = ():void => {
		const {
			checkRate,
			checkProgress,
			progressCheckInterval
		} = VideoPlayer;

		clearInterval(progressCheckInterval);

		VideoPlayer.progressCheckInterval = setInterval(
			() => checkProgress(), 
			checkRate
		);
	}

	/*
		Measure video playback percentage record analytics at defined intervals 
	 */
	private static checkProgress = ():void => {
		const {
			ref, 
			evts,
			lastEvtFired,
			currExp, 
			progressCheckInterval
		} = VideoPlayer;

        if (ref) {
        	const {currentTime, duration} = ref;
            const perc = currentTime / duration;
           	const next = evts[lastEvtFired];

            if (perc > next) {                
                Analytics.send({
                	t: 'event',
                	ec: 'video_player',
                	ea: 'playback_' + next,
					el: currExp
                });

                VideoPlayer.lastEvtFired++;
            }
        } else {
            clearInterval(progressCheckInterval);
        }
    }

	/*
		Clear progress interval on video pause
	 */
	private static onPause = () => {
		const {progressCheckInterval} = VideoPlayer;
		clearInterval(progressCheckInterval);
	}

	/*
		Handle cleaning up once video finishes playing
	 */
	private static onEnd = () => {
		const {
			currExp,
			progressCheckInterval
		} = VideoPlayer;

		clearInterval(progressCheckInterval);

		Analytics.send({
			t: 'event',
			ec: 'video_player',
			ea: 'playback_1',
			el: currExp
		});

		VideoPlayer.lastEvtFired = 0;
	}
}
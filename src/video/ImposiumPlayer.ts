import VideoPlayer from './VideoPlayer';
import {inRangeNumeric, prepConfig, isFunc, keyExists, warnHandler, errorHandler} from '../scaffolding/Helpers';

const settings = require('../conf/settings.json').videoPlayer;

interface ImposiumPlayerConfig {
	volume   : number;
	preload  : string;
	loop     : boolean;
	muted    : boolean;
	autoLoad : boolean;
	autoPlay : boolean;
	controls : boolean;
}

interface VideoConfig {
	poster : string;
	videos : any;
}

interface Video {
	url      : string;
	format   : string;
	width    : number;
	height   : number;
	filesize : number;
	duration : number;
	rate     : number;
}

export const ImposiumPlayerEvents = {
	play          : {callback: null, native: true},
	pause         : {callback: null, native: true},
	ended         : {callback: null, native: true},
	error         : {callback: null, native: true},
	seeked        : {callback: null, native: true},
	timeupdated   : {callback: null, native: true},
	volumechanged : {callback: null, native: true},
	muted         : {callback: null, native: false},
	controlsset   : {callback: null, native: false}
};

export default class ImposiumPlayer extends VideoPlayer {
	private static ImposiumPlayerConfig:ImposiumPlayerConfig = null;

	public events = {
		PLAY     : 'play',
		PAUSE    : 'pause',
		COMPLETE : 'ended',
		ERROR    : 'error',
		SEEK     : 'seeked',
		TIME     : 'timeupdate',
		VOLUME   : 'volumechange',
		MUTE     : 'muted',
		CONTROLS : 'controlsset'
	};

	constructor(node:HTMLVideoElement, config:ImposiumPlayerConfig = settings.defaultConfig) {
		super(node);
		this.init(config);
	}

	public init = (config:ImposiumPlayerConfig):void => {
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		ImposiumPlayer.ImposiumPlayerConfig = {...defaultConfig, ...config};

		for (const key in ImposiumPlayer.ImposiumPlayerConfig) {
			ImposiumPlayer.node[key] = ImposiumPlayer.ImposiumPlayerConfig[key];
		}
	}

	/*
		Enable native or custom ImposiumPlayer events
	 */
	public on = (eventName:string, callback:any):void => {
		try {
			if (isFunc(callback)) {
				if (keyExists(this.events, eventName)) {
					const event = ImposiumPlayerEvents[eventName];

					// Add ptr for future removal
					event.callback = callback;

					// If the event type is a valid media event, assign to ImposiumPlayer node
					if (event.native) {
						ImposiumPlayer.node.addEventListener(eventName, event.callback);
					}
				} else {
					// throw invalid evt err
				}
			} else {
				// throw bad func err
			}
		} catch (e) {
			// handle err
		}
	}

	/*
		Disable native or custom ImposiumPlayer events
	 */
	public off = (eventName:string):void => {
		try {
			if (keyExists(this.events, eventName)) {
				const event = ImposiumPlayerEvents[eventName];

				// Remove node based event listener
				if (event.native) {
					ImposiumPlayer.node.removeEventListener(eventName, event.callback)
				}

				event.callback = null;
			} else {
				// throw invalid evt err
			}
		} catch (e) {
			// handle err
		}
	}

	/*
		Play video
	 */
	public play = ():void => {
		ImposiumPlayer.node.play();
	}

	/*
		Pause video
	 */
	public pause = ():void => {
		ImposiumPlayer.node.pause();
	}

	/*
		TO DO: Clarify what this is with Greg
	 */
	public getPlaybackState = ():string => {
		return (ImposiumPlayer.node.paused) ? 'paused' : 'playing';
	}

	/*
		Get current playback time (s)
	 */
	public getPosition = ():number => {
		return ImposiumPlayer.node.currentTime;
	}

	/*
		Get duration of video (s)
	 */
	public getDuration = ():number => {
		return ImposiumPlayer.node.duration;
	}

	/*
		Seek to a point in the video (s)
	 */
	public seek = (seekTo:number):void => {
		const {node: {duration}} = ImposiumPlayer;

		if (inRangeNumeric(seekTo, 0, duration)) {
			ImposiumPlayer.node.currentTime = seekTo;
		} else {
			// do warning
		}
	}

	/*
		Get mute state
	 */
	public getMute = ():boolean => {
		return ImposiumPlayer.node.muted;
	}

	/*
		Set mute state
	 */
	public setMute = (mute:boolean):void => {
		const {muted} = ImposiumPlayerEvents;

		ImposiumPlayer.node.muted = mute;

		if (muted) {
			muted.callback();
		}
	}

	/*
		Get volume state
	 */
	public getVolume = ():number => {
		return ImposiumPlayer.node.volume;
	}

	/*
		Set volume set, valid range: 0.0 -> 1.0
	 */
	public setVolume = (volume:number):void => {
		const {volumeMin, volumeMax} = settings;

		if (inRangeNumeric(volume, volumeMin, volumeMax)) {
			ImposiumPlayer.node.volume = volume;
		} else {
			// do warning
		}
	}

	/*
		Get controls state
	 */
	public getControls = ():boolean => {
		return ImposiumPlayer.node.controls;
	}

	/*
		Set controls state
	 */
	public setControls = (controls:boolean):void => {
		const {controlsset} = ImposiumPlayerEvents;

		ImposiumPlayer.node.controls = controls;

		if (controlsset) {
			controlsset.callback();
		}
	}

	/*
		Replay video
	 */
	public replay = ():void => {
		this.pauseIfPlaying();
		ImposiumPlayer.node.currentTime = 0;
		ImposiumPlayer.node.play();
	}

	/*
		Remove all Imposium ImposiumPlayer scaffolding and break ref to video node
	 */
	public remove = ():void => {
		const {defaultConfig} = settings;

		this.pauseIfPlaying();

		for (const key in ImposiumPlayerEvents) {
			this.off(ImposiumPlayerEvents[key]);
		}

		ImposiumPlayer.ImposiumPlayerConfig = {...defaultConfig};
		ImposiumPlayer.node = null;
	}

	private pauseIfPlaying = ():void => {
		if (!ImposiumPlayer.node.paused) {
			ImposiumPlayer.node.pause();
		}
	}
}
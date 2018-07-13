import {inRangeNumeric, prepConfig, isFunc, keyExists, warnHandler, errorHandler} from '../scaffolding/Helpers';

const settings = require('../conf/settings.json').videoPlayer;

interface PlayerConfig {
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

export const PlayerEvents = {
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

export class Player {
	public static events = {
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

	private static node:HTMLVideoElement = null;
	private static playerConfig:PlayerConfig = null;

	constructor(node:HTMLVideoElement, config:PlayerConfig = settings.defaultConfig) {
		this.init(config);
	}

	public init = (config:PlayerConfig):void => {
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		Player.playerConfig = {...defaultConfig, ...config};

		for (const key in Player.playerConfig) {
			Player.node[key] = Player.playerConfig[key];
		}
	}

	/*
		Enable native or custom player events
	 */
	public on = (eventName:string, callback:any):void => {
		try {
			if (isFunc(callback)) {
				if (keyExists(Player.events, eventName)) {
					const event = PlayerEvents[eventName];

					// Add ptr for future removal
					event.callback = callback;

					// If the event type is a valid media event, assign to player node
					if (event.native) {
						Player.node.addEventListener(eventName, event.callback);
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
		Disable native or custom player events
	 */
	public off = (eventName:string):void => {
		try {
			if (keyExists(Player.events, eventName)) {
				const event = PlayerEvents[eventName];

				// Remove node based event listener
				if (event.native) {
					Player.node.removeEventListener(eventName, event.callback)
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
		Player.node.play();
	}

	/*
		Pause video
	 */
	public pause = ():void => {
		Player.node.pause();
	}

	/*
		TO DO: Clarify what this is with Greg
	 */
	public getPlaybackState = ():string => {
		return (Player.node.paused) ? 'paused' : 'playing';
	}

	/*
		Get current playback time (s)
	 */
	public getPosition = ():number => {
		return Player.node.currentTime;
	}

	/*
		Get duration of video (s)
	 */
	public getDuration = ():number => {
		return Player.node.duration;
	}

	/*
		Seek to a point in the video (s)
	 */
	public seek = (seekTo:number):void => {
		const {node: {duration}} = Player;

		if (inRangeNumeric(seekTo, 0, duration)) {
			Player.node.currentTime = seekTo;
		} else {
			// do warning
		}
	}

	/*
		Get mute state
	 */
	public getMute = ():boolean => {
		return Player.node.muted;
	}

	/*
		Set mute state
	 */
	public setMute = (mute:boolean):void => {
		const {muted} = PlayerEvents;

		Player.node.muted = mute;

		if (muted) {
			muted.callback();
		}
	}

	/*
		Get volume state
	 */
	public getVolume = ():number => {
		return Player.node.volume;
	}

	/*
		Set volume set, valid range: 0.0 -> 1.0
	 */
	public setVolume = (volume:number):void => {
		const {volumeMin, volumeMax} = settings;

		if (inRangeNumeric(volume, volumeMin, volumeMax)) {
			Player.node.volume = volume;
		} else {
			// do warning
		}
	}

	/*
		Get controls state
	 */
	public getControls = ():boolean => {
		return Player.node.controls;
	}

	/*
		Set controls state
	 */
	public setControls = (controls:boolean):void => {
		const {controlsset} = PlayerEvents;

		Player.node.controls = controls;

		if (controlsset) {
			controlsset.callback();
		}
	}

	/*
		Replay video
	 */
	public replay = ():void => {
		this.pauseIfPlaying();
		Player.node.currentTime = 0;
		Player.node.play();
	}

	/*
		Remove all Imposium player scaffolding and break ref to video node
	 */
	public remove = ():void => {
		const {defaultConfig} = settings;

		this.pauseIfPlaying();

		for (const key in PlayerEvents) {
			this.off(PlayerEvents[key]);
		}

		Player.playerConfig = {...defaultConfig};
		Player.node = null;
	}

	private pauseIfPlaying = ():void => {
		if (!Player.node.paused) {
			Player.node.pause();
		}
	}
}
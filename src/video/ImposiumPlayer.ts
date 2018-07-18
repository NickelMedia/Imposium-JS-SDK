import VideoPlayer, {VideoConfig, Video} from './VideoPlayer';
import ImposiumClient from '../client/ImposiumClient';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {
	inRangeNumeric, 
	prepConfig, 
	isFunc, 
	keyExists
} from '../scaffolding/Helpers';

import {
	EnvironmentError,
	PlayerConfigurationError
} from '../scaffolding/Exceptions';

interface ImposiumPlayerConfig {
	volume   : number;
	preload  : string;
	loop     : boolean;
	muted    : boolean;
	autoLoad : boolean;
	autoPlay : boolean;
	controls : boolean;
}

const settings = require('../conf/settings.json').videoPlayer;

export default class ImposiumPlayer extends VideoPlayer {
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

	private eventDelegateRefs:any = {
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

	private videoConfig:VideoConfig = {
		poster: '',
		videos: []
	};

	private clientRef:ImposiumClient = null;
	private ImposiumPlayerConfig:ImposiumPlayerConfig = null;

	constructor(node:HTMLVideoElement, client:ImposiumClient, config:ImposiumPlayerConfig = settings.defaultConfig) {
		super(node);

		try {
			if (client) {
				client.setPlayer(this);
				this.init(config);
			} else {
				throw new PlayerConfigurationError("noClient", null);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Assigns config
	 */
	public init = (config:ImposiumPlayerConfig):void => {
		const {defaultConfig} = settings;

		prepConfig(config, defaultConfig);
		this.ImposiumPlayerConfig = {...defaultConfig, ...config};

		for (const key in this.ImposiumPlayerConfig) {
			this.node[key] = this.ImposiumPlayerConfig[key];
		}
	}

	/*
		Caches a video object and also 
	 */
	public experienceGenerated = (video:Video, poster:string = ''):void => {
		const {videoConfig, videoConfig: {videos}, node} = this;
		const {url, id} = video;

		videos.push(video);
		this.setExperienceId(id);

		if (poster !== this.videoConfig.poster) {
			this.videoConfig.poster = poster;
		}

		node.src = url;
	}

	/*
		Enable native or custom ImposiumPlayer events
	 */
	public on = (eventName:string, callback:any):void => {
		const {eventDelegateRefs} = this;

		try {
			if (isFunc(callback)) {
				if (keyExists(this.events, eventName)) {
					const event = eventDelegateRefs[eventName];

					// Add ptr for future removal
					event.callback = callback;

					// If the event type is a valid media event, assign to ImposiumPlayer node
					if (event.native) {
						this.node.addEventListener(eventName, event.callback);
					}
				} else {
					throw new PlayerConfigurationError('invalidEventName', eventName);
				}
			} else {
				throw new PlayerConfigurationError('invalidCallbackType', eventName);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Disable native or custom ImposiumPlayer events
	 */
	public off = (eventName:string):void => {
		const {eventDelegateRefs} = this;

		try {
			if (keyExists(this.events, eventName)) {
				const event = eventDelegateRefs[eventName];

				// Remove node based event listener
				if (event.native) {
					this.node.removeEventListener(eventName, event.callback)
				}

				event.callback = null;
			} else {
				throw new PlayerConfigurationError('invalidEventName', eventName);
			}
		} catch (e) {
			ExceptionPipe.trapError(e);
		}
	}

	/*
		Play video
	 */
	public play = ():void => {
		this.node.play();
	}

	/*
		Pause video
	 */
	public pause = ():void => {
		this.node.pause();
	}

	/*
		TO DO: Clarify what this is with Greg
	 */
	public getPlaybackState = ():string => {
		return (this.node.paused) ? 'paused' : 'playing';
	}

	/*
		Get current playback time (s)
	 */
	public getPosition = ():number => {
		return this.node.currentTime;
	}

	/*
		Get duration of video (s)
	 */
	public getDuration = ():number => {
		return this.node.duration;
	}

	/*
		Seek to a point in the video (s)
	 */
	public seek = (seekTo:number, retry:number = -1):void => {
		const {node: {duration}} = this;

		if (!isNaN(duration)) {
			if (inRangeNumeric(seekTo, 0, duration)) {
				this.node.currentTime = seekTo;
			} else {
				ExceptionPipe.logWarning('playerFailure', 'invalidSeekTime');
			}
		} else {
			ExceptionPipe.logWarning('playerFailure', 'seekNotReady');
		}
	}

	/*
		Get mute state
	 */
	public getMute = ():boolean => {
		return this.node.muted;
	}

	/*
		Set mute state
	 */
	public setMute = (mute:boolean):void => {
		const {eventDelegateRefs: {muted}} = this;

		this.node.muted = mute;

		if (muted) {
			muted.callback();
		}
	}

	/*
		Get volume state
	 */
	public getVolume = ():number => {
		return this.node.volume;
	}

	/*
		Set volume set, valid range: 0.0 -> 1.0
	 */
	public setVolume = (volume:number):void => {
		const {volumeMin, volumeMax} = settings;

		if (inRangeNumeric(volume, volumeMin, volumeMax)) {
			this.node.volume = volume;
		} else {
			ExceptionPipe.logWarning('playerFailure', 'invalidVolume');
		}
	}

	/*
		Get controls state
	 */
	public getControls = ():boolean => {
		return this.node.controls;
	}

	/*
		Set controls state
	 */
	public setControls = (controls:boolean):void => {
		const {eventDelegateRefs: {controlsset}} = this;

		this.node.controls = controls;

		if (controlsset) {
			controlsset.callback();
		}
	}

	/*
		Replay video
	 */
	public replay = ():void => {
		this.pauseIfPlaying();
		this.node.currentTime = 0;
		this.node.play();
	}

	/*
		Remove all Imposium ImposiumPlayer scaffolding and break ref to video node
	 */
	public remove = ():void => {
		const {eventDelegateRefs} = this;
		const {defaultConfig} = settings;

		this.pauseIfPlaying();

		for (const key of Object.keys(eventDelegateRefs)) {
			this.off(eventDelegateRefs[key]);
		}

		this.ImposiumPlayerConfig = {...defaultConfig};
		this.node = null;
	}

	private pauseIfPlaying = ():void => {
		if (!this.node.paused) {
			this.node.pause();
		}
	}
}
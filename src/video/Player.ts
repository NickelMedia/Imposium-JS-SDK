import {inRangeNumeric, prepConfig} from '../scaffolding/Helpers';

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
	PLAY     : {name: 'play',         native: true},
	PAUSE    : {name: 'pause',        native: true},
	COMPLETE : {name: 'ended',        native: true},
	ERROR    : {name: 'error',        native: true},
	SEEK     : {name: 'seeked',       native: true},
	TIME     : {name: 'timeupdate',   native: true},
	VOLUME   : {name: 'volumechange', native: true},
	MUTE     : {name: 'muted',        native: false},
	CONTROLS : {name: 'controlsset',  native: false}
}

export class Player {
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

	public on = (eventName:string, callback:any):void => {
		// add event 
	}

	public off = (eventName:string, callback:any):void => {
		// remove event
	}

	public play = ():void => {
		Player.node.play();
	}

	public pause = ():void => {
		Player.node.pause();
	}

	public getPlaybackState = ():string => {
		return '';
	}

	public getPosition = ():number => {
		return Player.node.currentTime;
	}

	public getDuration = ():number => {
		return Player.node.duration;
	}

	public seek = (seekTo:number):void => {
		const {node: {duration}} = Player;

		if (inRangeNumeric(seekTo, 0, duration)) {
			Player.node.currentTime = seekTo;
		} else {
			// do warning
		}
	}

	public getMute = ():boolean => {
		return Player.node.muted;
	}

	public setMute = (toggle:boolean):void => {
		Player.node.muted = toggle;
	}

	public getVolume = ():number => {
		return Player.node.volume;
	}

	public setVolume = (volume:number):void => {
		const {volumeMin, volumeMax} = settings;

		if (inRangeNumeric(volume, volumeMin, volumeMax)) {
			Player.node.volume = volume;
		} else {
			// do warning
		}
	}

	public getControls = ():boolean => {
		return Player.node.controls;
	}

	public setControls = (controls:boolean):void => {
		Player.node.controls = controls;
	}

	public replay = ():void => {
		Player.node.pause();
		Player.node.currentTime = 0;
		Player.node.play();
	}

	public remove = ():void => {
		// remnove all events // config // refs to player
	}
}
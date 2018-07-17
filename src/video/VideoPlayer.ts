import Playback from './Playback';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

import {
	EnvironmentError,
	PlayerConfigurationError
} from '../scaffolding/Exceptions';

import {
	isNode, 
	warnHandler, 
	errorHandler
} from '../scaffolding/Helpers';

export default abstract class VideoPlayer {
	protected static node:HTMLVideoElement = null;

	/*
		Basis of Imposum/Fallback video player objects
	 */
	constructor(node:HTMLVideoElement) {
		if (!isNode()) {
			if (node instanceof HTMLVideoElement) {
				VideoPlayer.node = node;
				Playback.setPlayerRef(VideoPlayer.node);
			} else {
				// Prop passed wasn't of type HTMLVideoElement
				throw new PlayerConfigurationError('invalidPlayerRef', null);
			}
		} else {
			// Cancels out initialization in NodeJS
			throw new EnvironmentError('node');
		}
	}

	public remove = ():void => {
		// do Remove
	}
}
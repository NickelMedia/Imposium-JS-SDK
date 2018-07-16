import Playback from './Playback';
import ExceptionPipe from '../scaffolding/ExceptionPipe';
import {isNode, warnHandler, errorHandler} from '../scaffolding/Helpers';

const errors = require('../conf/errors.json').videoPlayer;

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
				throw ExceptionPipe.createError({
					type        : 'configuration',
					messageKey  : 'invalidPlayerRef'
				});
			}
		} else {
			// Cancels out initialization in NodeJS
			throw ExceptionPipe.createError({
				type        : 'environment',
				messageKey  : 'node'
			});
		}
	}

	public remove = ():void => {
		// do Remove
	}
}
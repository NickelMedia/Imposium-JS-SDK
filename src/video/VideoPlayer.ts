import Playback from './Playback';
import {errorHandler} from '../scaffolding/Helpers';

const errors = require('../conf/errors.json').videoPlayer;

export default abstract class VideoPlayer {
	protected static node:HTMLVideoElement = null;

	constructor(node:HTMLVideoElement) {
		if (node instanceof HTMLVideoElement) {
			VideoPlayer.node = node;
			Playback.setPlayerRef(VideoPlayer.node);
		} else {
			const {badRef} = errors;
			throw new Error(badRef);
		}
	}
}
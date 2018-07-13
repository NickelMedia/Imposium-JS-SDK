import Playback from './Playback';
import {errorHandler} from '../scaffolding/Helpers';

const errors = require('../conf/errors.json').videoPlayer;

export default class FallbackPlayer {
	private static ref:HTMLVideoElement = null;

	/*
		Set up fallback analytics scenario for non Imposium video player refs
	 */
	public static setup = (ref:HTMLVideoElement) => {
		if (ref instanceof HTMLVideoElement) {
			FallbackPlayer.ref = ref;
			Playback.setPlayerRef(FallbackPlayer.ref);
		} else {
			const {badRef} = errors;
			throw new Error(badRef);
		}
	}
}
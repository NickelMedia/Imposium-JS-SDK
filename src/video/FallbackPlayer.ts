import VideoPlayer, {Video} from './VideoPlayer';

export default class FallbackPlayer extends VideoPlayer {

	constructor(node:HTMLVideoElement) {
		super(node);
	}

	/*
		Set the experience id for analytics purposes
	 */
	public experienceGenerated = (video:Video, poster:string = ''):void => {
		const {id} = video;
		this.setExperienceId(id);
	}
}
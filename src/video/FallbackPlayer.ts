import {IExperience} from '../client/Client';
import VideoPlayer from './VideoPlayer';

export default class FallbackPlayer extends VideoPlayer {

    constructor(node: HTMLVideoElement) {
        super(node);
    }

    /*
        Set the experience id for analytics purposes
     */
    public experienceGenerated = (experience: IExperience): void => {
        const {id} = experience;
        this.setExperienceId(id);
    }
}

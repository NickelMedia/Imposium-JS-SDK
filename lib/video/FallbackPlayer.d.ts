import VideoPlayer from './VideoPlayer';
export default class FallbackPlayer extends VideoPlayer {
    constructor(node: HTMLVideoElement);
    experienceGenerated: (experience: any) => void;
}

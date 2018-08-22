export interface IVideo {
    id: string;
    url: string;
    format: string;
    width: number;
    height: number;
    filesize: number;
    duration: number;
    rate: number;
}
export default abstract class VideoPlayer {
    private static readonly intervalRate;
    private static readonly playbackEvents;
    experienceGenerated: (exp: IVideo) => void;
    protected node: HTMLVideoElement;
    protected storyId: string;
    private readonly mediaEvents;
    private experienceId;
    private gaProperty;
    private prevPlaybackEvent;
    private playbackInterval;
    private deferredGaCalls;
    constructor(node: HTMLVideoElement);
    remove: () => void;
    setGaProperty: (gaProperty: string) => void;
    setStoryId: (storyId: string) => void;
    protected setExperienceId: (experienceId: string) => void;
    private onLoad;
    private onPlay;
    private onPause;
    private checkPlayback;
    private onEnd;
}

import VideoPlayer from '../../video/VideoPlayer';
export default class MessageConsumer {
    private static readonly MAX_RETRIES;
    private static readonly EVENT_NAMES;
    private stompDelegates;
    private env;
    private storyId;
    private experienceId;
    private clientDelegates;
    private stomp;
    private player;
    private retried;
    constructor(env: string, storyId: string, experienceId: string, clientDelegates: any, player: VideoPlayer);
    kill: () => Promise<null>;
    private establishConnection;
    private startConsuming;
    private routeMessageData;
    private emitMessageData;
    private emitSceneData;
    private stompError;
}

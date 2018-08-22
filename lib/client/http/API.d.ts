export default class API {
    static getGATrackingPixel: (url: string) => Promise<null>;
    static checkBandwidth: () => Promise<number>;
    private static readonly testImage;
    private static readonly retry;
    private http;
    constructor(accessToken: string, env: string);
    configureClient: (accessToken: string, env: string) => void;
    getStory: (storyId: string) => Promise<any>;
    getExperience: (experienceId: string) => Promise<any>;
    postExperience: (storyId: string, inventory: any, progress?: (e: any) => any) => Promise<any>;
    invokeStream: (experienceId: string) => Promise<null>;
    private getAuthHeader;
    private doPostExperience;
    private uploadProgress;
}

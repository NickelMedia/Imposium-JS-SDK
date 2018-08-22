export default class Analytics {
    static setup: () => void;
    static send: (event: any) => void;
    private static emitter;
    private static retryTimeout;
    private static request;
    private static broker;
    private static checkCache;
    private static setCache;
    private static s4;
    private static generateGuid;
    private static getRandom;
    private static concatParams;
    private static emit;
    private static addToQueue;
    private static scrapeDeferred;
    private static setRequestUrl;
    private static makeRequest;
}

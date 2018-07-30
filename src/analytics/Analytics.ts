import API from '../client/http/API';
import Queue from './Queue';

const settings = require('../conf/settings.json').analytics;


/*
    Manually handles calls to GA, Analytics was developed to avoid having to ask
    clients to include the GA/GTM snippets if they didn't want them.

    for information on the request protocol:
    https://developers.google.com/analytics/devguides/collection/protocol/v1/reference

    for information on the query parameter options:
    https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */

// Holds default request settings
interface Request {
    baseUrl  : string;
    cacheKey : string;
    clientId : string;
 }

// Holds settings related to rate limiting
interface Broker {
    concurrency : number;
    frequency   : number;
    enqueued    : number;
    defer       : boolean;
    active      : Queue;
    deferred    : Queue;
}

export default class Analytics {
    private static emitter:any = null;
    private static retryTimeout:any = null;

    private static request:Request = {
        baseUrl  : settings.baseUrl,
        cacheKey : settings.lsLookup,
        clientId : settings.cidPlaceholder
    };

    private static broker:Broker = {
        concurrency : settings.concurrency, 
        frequency   : settings.frequency, 
        enqueued    : 0, 
        defer       : false, 
        active      : new Queue(), 
        deferred    : new Queue()
    };

    /*
        Enable GA calls
     */
    public static setup = () => {
        Analytics.request.clientId = Analytics.checkCache();
    }

    /*
        Sends events off to the GA collect API
     */
    public static send = (event:any):void => {
        const {emit, addToQueue, concatParams} = Analytics;
        const {defer, active} = Analytics.broker;

        if (active.isEmpty() && !defer) {
            emit();
        }

        addToQueue(concatParams(event));
    }

    /*
        Checks to see if a user has a cached GA client id
        in their localStorage
     */
    private static checkCache = ():string => {
        const {setCache, generateGuid} = Analytics;
        const {cacheKey} = Analytics.request;

        try {
            const cache = JSON.parse(localStorage.getItem(cacheKey));

            // Check ref val
            if (cache) {
                const {expiry, guid} = cache;

                // check guid expiry
                if (expiry > new Date()) {
                    return guid;
                } else {
                    // Set new creds if expired 
                    localStorage.removeItem(cacheKey);
                }
            }
            
            return setCache(generateGuid());
        } catch (e) {
            // If any operations fail, return a guid for Analytics session
            return generateGuid();
        }
    }

    /*
        Sets new user creds in localStorage
     */
    private static setCache = (guid:string):string => {
        try {
            const {cacheKey} = Analytics.request;
            const expiry = new Date();

            const cache:any = {
                guid   : guid, 
                expiry : expiry.setFullYear(expiry.getFullYear() + 2)
            };

            localStorage.setItem(cacheKey, JSON.stringify(cache));
        } catch (e) {
            
        }

        return guid;
    }

    /*
        Generate random sequence 
     */
    private static s4 = ():string => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    /*
        Concatenate a new guid
     */
    private static generateGuid = ():string => {
        const {s4} = Analytics;
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    /*
        Get a random number to supply the caching buster parameter
     */
    private static getRandom = ():string => {
        return `${Math.round(new Date().getTime() / 1000)}`;
    }

    /*
        Concatenates the default and event supplied parameters into a query string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    private static concatParams = (event:any):string => {
        const {getRandom} = Analytics;
        const {baseUrl, clientId} = Analytics.request;
        const gaProperty = event.prp;

        delete event.prp;

        let queryString = `${baseUrl}?v=1&tid=${gaProperty}&z=${getRandom()}&cid=${clientId}`;

        for (const param of Object.keys(event)) {
            queryString += `&${encodeURIComponent(param)}=${encodeURIComponent(event[param])}`;
        }

        return queryString;
    }

    /*
        Set request emitting interval
     */
    private static emit = () => {
        const {setRequestUrl} = Analytics;
        const {frequency} = Analytics.broker;

        Analytics.emitter = setInterval(
            () => setRequestUrl(), 
            frequency
        );
    }

    /*
        Determine if request needs to be deferred during a burst
     */
    private static addToQueue = (url:string):void => {
        let {concurrency, defer, active, deferred} = Analytics.broker;

        if (!defer) {
            active.enqueue(url);
            defer = !active.isFull(concurrency);
        } else {
            deferred.enqueue(url);
        }
    }

    /*
        If the deferral queue has urls in it, take 10 or queue length
        and pass them to the active queue
     */
    private static scrapeDeferred = ():void => {
        const {emit} = Analytics;
        let {concurrency, enqueued, defer, active, deferred} = Analytics.broker;

        if (!deferred.isEmpty()) {
            let limit = 0;

            enqueued = deferred.getLength();

            if (enqueued > concurrency) {
                limit = concurrency;
            } else {
                limit = enqueued;
            }

            for (let i = 0; i < limit; i++) {
                active.enqueue(deferred.peek());
                deferred.pop();
            }

            defer = false;
            emit();
        } else {
            defer = false;
        }
    }

    /*
        Determine if the request is fresh, if so pop the request
        off the head of the queue. Otherwise call scrapeDeferred.
        Failed urls can also be passed as an optional param to
        enable retries. 
     */
    private static setRequestUrl = (failedUrl:any = null) => {
        const {makeRequest, scrapeDeferred, broker, emitter} = Analytics;

        if (failedUrl) {
            makeRequest(failedUrl);
        } else {
            const {active} = broker;
            const url = active.peek();

            if (url) {
                active.pop();
                makeRequest(url);
            } else {
                clearInterval(emitter);
                scrapeDeferred();
            }
        }
    }

    /*
        Makes GET request to GA collect API with formatted query string, retrying 
        is handled by axios-retry with exponential decay
     */
    private static makeRequest = (url:string):void => {
        const {broker, emit, emitter} = Analytics;
        const {active} = broker;

        API.getGATrackingPixel(url)
        .then(() => {
            if (active.isEmpty()) {
                clearInterval(emitter);
            }
        })
        .catch((e) => {
            clearInterval(emitter);
            active.pop();
            emit();
        });
    }
}


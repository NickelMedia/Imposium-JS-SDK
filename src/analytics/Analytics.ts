import API from '../client/http/API';
import ExceptionPipe from '../scaffolding/ExceptionPipe';

const {...settings} = require('../conf/settings.json').analytics;

/*
    Manually handles calls to GA, Analytics was developed to avoid having to ask
    clients to include the GA/GTM snippets if they didn't want them.

    for information on the request protocol:
    https: //developers.google.com/analytics/devguides/collection/protocol/v1/reference

    for information on the query parameter options:
    https: //developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */

// Holds default request settings
interface IRequest {
    baseUrl: string;
    cacheKey: string;
    clientId: string;
}

export default class Analytics {

    /*
        Enable GA calls
     */
    public static setup = () => {
        Analytics.request.clientId = Analytics.checkCache();
    }

    /*
        Sends events off to the GA collect API
     */
    public static send = (event: any): void => {
        const {makeRequest, concatParams} = Analytics;
        makeRequest(concatParams(event));
    }

    private static emitter: any = null;
    private static retryTimeout: any = null;

    private static request: IRequest = {
        baseUrl: settings.baseUrl,
        cacheKey: settings.lsLookup,
        clientId: settings.cidPlaceholder
    };

    /*
        Checks to see if a user has a cached GA client id
        in their localStorage
     */
    private static checkCache = (): string => {
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
    private static setCache = (guid: string): string => {
        try {
            const {cacheKey} = Analytics.request;
            const expiry = new Date();

            const cache: any = {
                guid,
                expiry: expiry.setFullYear(expiry.getFullYear() + 2)
            };

            localStorage.setItem(cacheKey, JSON.stringify(cache));
        } catch (e) {
            // TODO, throw warning
            return guid;
        }

        return guid;
    }

    /*
        Generate random sequence
     */
    private static s4 = (): string => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    /*
        Concatenate a new guid
     */
    private static generateGuid = (): string => {
        const {s4} = Analytics;
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    /*
        Get a random number to supply the caching buster parameter
     */
    private static getRandom = (): string => {
        return `${Math.round(new Date().getTime() / 1000)}`;
    }

    /*
        Concatenates the default and event supplied parameters into a query string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    private static concatParams = (event: any): string => {
        const {getRandom, request: {baseUrl, clientId}} = Analytics;
        const gaProperty = event.prp;

        delete event.prp;

        let queryString = `${baseUrl}?v=1&tid=${gaProperty}&z=${getRandom()}&cid=${clientId}`;

        for (const param of Object.keys(event)) {
            queryString += `&${encodeURIComponent(param)}=${encodeURIComponent(event[param])}`;
        }

        return queryString;
    }

    /*
        Makes GET request to GA collect API with formatted query string, retrying
        is handled by axios-retry with exponential decay
     */
    private static makeRequest = (url: string): void => {
        API.getGATrackingPixel(url)
        .catch((e) => {
            ExceptionPipe.logWarning('analytics', 'requestFailed');
        });
    }
}

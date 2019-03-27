import ExceptionPipe from '../scaffolding/ExceptionPipe';
import axios, {AxiosError} from 'axios';
import {generateUUID} from '../scaffolding/Helpers';

const {...settings} = require('../conf/settings.json').analytics;

/*
    Manually handles calls to GA, Analytics was developed to avoid having to ask
    clients to include the GA/GTM snippets if they didn't want them.

    for information on the request protocol:
    https: //developers.google.com/analytics/devguides/collection/protocol/v1/reference

    for information on the query parameter options:
    https: //developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */

export interface IGAProtocol {
    v?: string; // Protocol version
    tid?: string; // Web property
    z?: string; // cache buster
    cid?: string; // client id
    t: string; // emit type
    ec: string; // event category
    ea: string; // event action
    el: string; // event label
    ev?: string; // event value
}

export interface IGACache {
    uuid: string;
    expiry: number;
}

export default class GoogleAnalytics {

    /*
        Pull a client ID from localstorage or generate a fresh one.
        This essentially intializes the GA event bus
     */
    public static pullClientId = (now: Date = new Date()): void => {
        try {
            const cache: IGACache = JSON.parse(localStorage.getItem(GoogleAnalytics.CACHE_KEY)) || {};

            // If cache isn't expired, use cached GUID to help provide more accurate metrics
            if (cache.uuid && cache.expiry >= new Date().valueOf()) {
                GoogleAnalytics.CLIENT_ID = cache.uuid;
                return;
            }

            // Generate a fresh cache if the previous was expired
            cache.uuid = generateUUID();
            cache.expiry = now.setFullYear(now.getFullYear() + 2);
            localStorage.setItem(GoogleAnalytics.CACHE_KEY, JSON.stringify(cache));

            // Cache a fresh client id
            GoogleAnalytics.CLIENT_ID = cache.uuid;
        } catch (e) {
            // if LS fails for some reason, generate a guid for the session
            GoogleAnalytics.CLIENT_ID = generateUUID();
        }

        return;
    }

    /*
        Concatenates the default and event supplied parameters into a url string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    public static send = (event: IGAProtocol): void => {
        let pixelUrl: string = GoogleAnalytics.BASE_URL;

        // merge event data with base GA params
        event = {
            v: '1', // GA version
            z: `${Math.round(new Date().getTime() / 1000)}`, // unique prop for the emit
            cid: GoogleAnalytics.CLIENT_ID,
            ...event
        };

        for (const paramName of Object.keys(event)) {
            const seperator: string = (pixelUrl === GoogleAnalytics.BASE_URL) ? '?' : '&';
            pixelUrl += `${seperator}${paramName}=${encodeURIComponent(event[paramName])}`;
        }

        axios.get(pixelUrl)
        .catch((e: AxiosError) => {
            ExceptionPipe.logWarning('analytics', 'requestFailed');
        });
    }

    private static readonly BASE_URL: string = settings.baseUrl;
    private static readonly CACHE_KEY: string = settings.cacheKey;

    // Unique id for user
    private static CLIENT_ID: string = settings.cidPlaceholder;
}

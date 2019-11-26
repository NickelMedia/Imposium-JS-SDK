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
    ds?: string; // data source
    tid?: string; // Web property
    dr? : string; //Referrer
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

    public static gaPlacement: string = '';

    /*
        Pull a client ID from localstorage or generate a fresh one.
        This essentially intializes the GA event bus & assign a placement
     */
    public static initialize = (placement: string): void => {
        try {
            const now: Date = new Date();
            const cache: IGACache = JSON.parse(localStorage.getItem(GoogleAnalytics.CACHE_KEY)) || {};

            // Assign placement, generally it's just web but for special ad tech cases we can override
            GoogleAnalytics.gaPlacement = placement;

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
        const ref = (document as any).referrer;

        // merge event data with base GA params
        event = {
            v: '1', // GA version
            ds: GoogleAnalytics.gaPlacement,
            cid: GoogleAnalytics.CLIENT_ID,
            z: `${Math.round(new Date().getTime() / 1000)}`, // bust cache on IE, etc
            ...event
        };

        //only set the referrer if it's not empty
        if(ref !== ''){
            event['dr'] = ref;
        }

        for (const paramName of Object.keys(event)) {
            const separator: string = (pixelUrl === GoogleAnalytics.BASE_URL) ? '?' : '&';
            pixelUrl += `${separator}${paramName}=${encodeURIComponent(event[paramName])}`;
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

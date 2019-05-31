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

/*
    Matomo media request structure

    https://imposium.matomo.cloud/piwik.php?idsite={SITE_ID}&rec=1&action_name={DATA_SOURCE / PLACEMENT_NAME}&uid={UUIDv4}&rand={RANDOM_NUM}&ma_id={EXPERIENCE_ID}&ma_mt=video
    
    action_name = data source name followed by a placement name (if set) so "web / quartz" or "vast / dupontdotcom" for example
    uid = user id (uuidv4)
    rand = cache buster for IE, etc.
    ma_id = unique id for the media so experience id works here
    ma_mt = media type
 */

export interface IGAProtocol {
    v?: string; // Protocol version
    ds?: string; // data source
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

    public static gaPlacement: string = '';
    public static campaignName: string = '';

    /*
        Pull a client ID from localstorage or generate a fresh one.
        This essentially intializes the GA event bus & assign a placement
     */
    public static initialize = (placement: string, campaignName: string): void => {
        try {
            const now: Date = new Date();
            const cache: IGACache = JSON.parse(localStorage.getItem(GoogleAnalytics.CACHE_KEY)) || {};

            // Assign placement, generally it's just web but for special ad tech cases we can override
            GoogleAnalytics.gaPlacement = placement;
            GoogleAnalytics.campaignName = campaignName;

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
            ds: GoogleAnalytics.gaPlacement,
            cid: GoogleAnalytics.CLIENT_ID,
            z: `${Math.round(new Date().getTime() / 1000)}`, // bust cache on IE, etc
            ...event
        };

        for (const paramName of Object.keys(event)) {
            const separator: string = (pixelUrl === GoogleAnalytics.BASE_URL) ? '?' : '&';
            pixelUrl += `${separator}${paramName}=${encodeURIComponent(event[paramName])}`;
        }

        axios.get(pixelUrl)
        .catch((e: AxiosError) => {
            ExceptionPipe.logWarning('analytics', 'requestFailed');
        });
    }

    public static sendMatomoEvent = (params: any, storyId: string, deviceType: string) => {
        // const customVars: string = JSON.stringify({
        //     '1': ['story_id', storyId],
        //     '2': ['device', deviceType],
        //     '3': ['placement', GoogleAnalytics.gaPlacement]
        // });

        let matomoUrl = 'https://imposium.matomo.cloud/matomo.php';

        const event = {
            idsite: '1',
            rec: '1',
            dimension3: storyId,
            dimension4: deviceType,
            dimension5: GoogleAnalytics.gaPlacement,
            // cvar: customVars,
            _rcn: GoogleAnalytics.campaignName,
            uid: GoogleAnalytics.CLIENT_ID,
            rand: Math.round((new Date().getTime() / 1000)).toString(),
            ...params
        };
        
        const eventKeys = Object.keys(event);

        for (const param of eventKeys) {
            const separator: string = (eventKeys.indexOf(param) === 0) ? '?' : '&';
            matomoUrl += `${separator}${param}=${encodeURIComponent(event[param])}`;
        }

        axios.get(matomoUrl)
        .catch((e) => {
            console.error('failed to send matomo req');
        });
    };

    private static readonly BASE_URL: string = settings.baseUrl;
    private static readonly CACHE_KEY: string = settings.cacheKey;

    // Unique id for user
    private static CLIENT_ID: string = settings.cidPlaceholder;
}

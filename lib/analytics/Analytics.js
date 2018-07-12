"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("../client/http/API");
var Queue_1 = require("./Queue");
var settings = require('../conf/settings.json').analytics;
var Analytics = /** @class */ (function () {
    function Analytics() {
    }
    Analytics.isSetup = false;
    Analytics.emitter = null;
    Analytics.retryTimeout = null;
    Analytics.request = {
        baseUrl: settings.base_url,
        cacheKey: settings.ls_lookup,
        appId: null,
        clientId: null
    };
    Analytics.broker = {
        concurrency: settings.concurrency,
        frequency: settings.frequency,
        enqueued: 0,
        defer: false,
        active: new Queue_1.default(),
        deferred: new Queue_1.default()
    };
    Analytics.retries = {
        current: settings.min_retries,
        max: settings.max_retries,
        delay: settings.min_delay
    };
    Analytics.setup = function (trackingId) {
        Analytics.request.appId = trackingId;
        Analytics.request.clientId = Analytics.checkCache();
        if (!Analytics.isSetup) {
            Analytics.isSetup = true;
            Analytics.pageView();
            window.addEventListener('popstate', function () { return Analytics.pageView(); });
        }
    };
    /*
        Sends events off to the GA collect API
     */
    Analytics.send = function (event) {
        var isSetup = Analytics.isSetup;
        if (isSetup) {
            var emit = Analytics.emit, addToQueue = Analytics.addToQueue, concatParams = Analytics.concatParams;
            var _a = Analytics.broker, defer = _a.defer, active = _a.active;
            if (active.isEmpty() && !defer) {
                emit();
            }
            addToQueue(concatParams(event));
        }
    };
    /*
        Record page view metric
     */
    Analytics.pageView = function () {
        var send = Analytics.send;
        send({
            t: 'pageview',
            dp: window.location.pathname
        });
    };
    /*
        Checks to see if a user has a cached GA client id
        in their localStorage
     */
    Analytics.checkCache = function () {
        var setCache = Analytics.setCache, generateGuid = Analytics.generateGuid;
        var cacheKey = Analytics.request.cacheKey;
        try {
            var cache = JSON.parse(localStorage.getItem(cacheKey));
            // Check ref val
            if (cache) {
                var expiry = cache.expiry, guid = cache.guid;
                // check guid expiry
                if (expiry > new Date()) {
                    return guid;
                }
                else {
                    // Set new creds if expired 
                    localStorage.removeItem(cacheKey);
                }
            }
            return setCache(generateGuid());
        }
        catch (e) {
            // If any operations fail, return a guid for Analytics session
            return generateGuid();
        }
    };
    /*
        Sets new user creds in localStorage
     */
    Analytics.setCache = function (guid) {
        try {
            var cacheKey = Analytics.request.cacheKey;
            var expiry = new Date();
            var cache = {
                guid: null,
                expiry: null
            };
            cache.guid = guid;
            cache.expiry = expiry.setFullYear(expiry.getFullYear() + 2);
            localStorage.setItem(cacheKey, JSON.stringify(cache));
        }
        catch (e) {
        }
        return guid;
    };
    // TO DO: use more robust uuid solution (?) 
    /*
        Generate random sequence
     */
    Analytics.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    /*
        Concatenate a new guid
     */
    Analytics.generateGuid = function () {
        var s4 = Analytics.s4;
        return "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    };
    /*
        Get a random number to supply the caching buster parameter
     */
    Analytics.getRandom = function () {
        return Math.round(new Date().getTime() / 1000).toString();
    };
    /*
        Concatenates the default and event supplied parameters into a query string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    Analytics.concatParams = function (event) {
        var getRandom = Analytics.getRandom;
        var _a = Analytics.request, baseUrl = _a.baseUrl, appId = _a.appId, clientId = _a.clientId;
        var queryString = baseUrl + "?v=1&tid=" + appId + "&z=" + getRandom() + "&cid=" + clientId;
        for (var _i = 0, _b = Object.keys(event); _i < _b.length; _i++) {
            var param = _b[_i];
            queryString += "&" + encodeURIComponent(param) + "=" + encodeURIComponent(event[param]);
        }
        return queryString;
    };
    /*
        Set request emitting interval
     */
    Analytics.emit = function () {
        var setRequestUrl = Analytics.setRequestUrl;
        var frequency = Analytics.broker.frequency;
        Analytics.emitter = setInterval(function () { return setRequestUrl(); }, frequency);
    };
    /*
        Determine if request needs to be deferred during a burst
     */
    Analytics.addToQueue = function (url) {
        var _a = Analytics.broker, concurrency = _a.concurrency, defer = _a.defer, active = _a.active, deferred = _a.deferred;
        if (!defer) {
            active.enqueue(url);
            defer = !active.isFull(concurrency);
        }
        else {
            deferred.enqueue(url);
        }
    };
    /*
        If the deferral queue has urls in it, take 10 or queue length
        and pass them to the active queue
     */
    Analytics.scrapeDeferred = function () {
        var emit = Analytics.emit;
        var _a = Analytics.broker, concurrency = _a.concurrency, enqueued = _a.enqueued, defer = _a.defer, active = _a.active, deferred = _a.deferred;
        if (!deferred.isEmpty()) {
            var limit = 0;
            enqueued = deferred.getLength();
            if (enqueued > concurrency) {
                limit = concurrency;
            }
            else {
                limit = enqueued;
            }
            for (var i = 0; i < limit; i++) {
                active.enqueue(deferred.peek());
                deferred.pop();
            }
            defer = false;
            emit();
        }
        else {
            defer = false;
        }
    };
    /*
        Determine if the request is fresh, if so pop the request
        off the head of the queue. Otherwise call scrapeDeferred.
        Failed urls can also be passed as an optional param to
        enable retries.
     */
    Analytics.setRequestUrl = function (failedUrl) {
        if (failedUrl === void 0) { failedUrl = null; }
        var makeRequest = Analytics.makeRequest, scrapeDeferred = Analytics.scrapeDeferred, broker = Analytics.broker, emitter = Analytics.emitter;
        if (failedUrl) {
            makeRequest(failedUrl);
        }
        else {
            var active = broker.active;
            var url = active.peek();
            if (url) {
                active.pop();
                makeRequest(url);
            }
            else {
                clearInterval(emitter);
                scrapeDeferred();
            }
        }
    };
    /*
        Makes GET request to GA collect API with formatted query string
     */
    Analytics.makeRequest = function (url) {
        var retry = Analytics.retry, broker = Analytics.broker, emitter = Analytics.emitter;
        API_1.default.getGATrackingPixel(url)
            .then(function () {
            var active = broker.active;
            if (active.isEmpty()) {
                clearInterval(emitter);
            }
        })
            .catch(function (err) {
            clearInterval(emitter);
            retry(url);
        });
    };
    /*
        Retry requests recursively based on settings defined in
        Retry interface.
     */
    Analytics.retry = function (url) {
        var setRequestUrl = Analytics.setRequestUrl, emit = Analytics.emit, retryTimeout = Analytics.retryTimeout;
        var _a = Analytics.retries, current = _a.current, max = _a.max, delay = _a.delay;
        var active = Analytics.broker.active;
        Analytics.retryTimeout = setTimeout(function () {
            if (current < max) {
                Analytics.retries.delay *= 2;
                Analytics.retries.current++;
                setRequestUrl(url);
            }
            else {
                clearTimeout(retryTimeout);
                active.pop();
                emit();
                Analytics.retries.delay = settings.min_delay;
                Analytics.retries.current = settings.min_retries;
                // add a check here to do a long poll if 
                // n number of requests fail after retrying
            }
        }, delay);
    };
    return Analytics;
}());
exports.default = Analytics;
//# sourceMappingURL=Analytics.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
var API_1 = require("./http/API");
var MessageConsumer_1 = require("./tcp/MessageConsumer");
var Analytics_1 = require("../analytics/Analytics");
var VideoPlayer_1 = require("../analytics/VideoPlayer");
var Events_1 = require("../scaffolding/Events");
var Helpers_1 = require("../scaffolding/Helpers");
var settings = require('../conf/settings.json').client;
var errors = require('../conf/errors.json').client;
var warnings = require('../conf/warnings.json').client;
exports.Events = {
    EXPERIENCE_CREATED: 'experienceCreated',
    UPLOAD_PROGRESS: 'uploadProgress',
    GOT_EXPERIENCE: 'gotExperience',
    STATUS_UPDATE: 'statusUpdate',
    ERROR: 'onError'
};
var ImposiumClient = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function ImposiumClient(config) {
        var _this = this;
        /*
            Allows users to redeclare a
         */
        this.setup = function (config) {
        };
        /*
            Set up the analytics client and video tracking events
         */
        this.setupAnalytics = function (trackingId, playerRef) {
            if (trackingId === void 0) { trackingId = ''; }
            if (playerRef === void 0) { playerRef = null; }
            try {
                if (!Helpers_1.isNode()) {
                    if (RegExp(/^ua-\d{4,9}-\d{1,4}$/i).test(trackingId)) {
                        Analytics_1.default.setup(trackingId);
                        if (playerRef) {
                            VideoPlayer_1.default.setup(playerRef);
                        }
                    }
                    else {
                        var bad_ga_prop = errors.bad_ga_prop;
                        throw new Error(Helpers_1.formatError(bad_ga_prop, trackingId));
                    }
                }
                else {
                    var node_analytics = warnings.node_analytics;
                    Helpers_1.warnHandler(node_analytics);
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e, false);
            }
        };
        /*
            Sets a callback for an event
         */
        this.on = function (eventName, callback) {
            try {
                if (Object.prototype.toString.call(callback) === '[object Function]') {
                    var validEvents = ImposiumClient.validEvents;
                    if (~validEvents.indexOf(eventName)) {
                        Events_1.default[eventName] = callback;
                    }
                    else {
                        var invalid_event = errors.invalid_event;
                        throw new Error(Helpers_1.formatError(invalid_event, eventName));
                    }
                }
                else {
                    var bad_event_ref = errors.bad_event_ref;
                    throw new Error(Helpers_1.formatError(bad_event_ref, eventName));
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Turns off a specific event or all events
         */
        this.off = function (eventName) {
            if (eventName === void 0) { eventName = ''; }
            var validEvents = ImposiumClient.validEvents;
            try {
                if (eventName !== '') {
                    if (~validEvents.indexOf(eventName)) {
                        Events_1.default[eventName] = null;
                    }
                    else {
                        var invalid_event = errors.invalid_event;
                        throw new Error(Helpers_1.formatError(invalid_event, eventName));
                    }
                }
                else {
                    validEvents.forEach(function (event) {
                        Events_1.default[event] = null;
                    });
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Create new experience & return relevant meta
         */
        this.createExperience = function (storyId, inventory, render) {
            var experienceCreated = Events_1.default.experienceCreated, uploadProgress = Events_1.default.uploadProgress;
            try {
                if (experienceCreated) {
                    var postExperience = API_1.default.postExperience;
                    postExperience(storyId, inventory, uploadProgress)
                        .then(function (data) {
                        experienceCreated(data);
                    })
                        .catch(function (e) {
                        Helpers_1.errorHandler(e);
                    });
                }
                else {
                    var no_callback_set = errors.no_callback_set;
                    throw new Error(Helpers_1.formatError(no_callback_set, exports.Events.EXPERIENCE_CREATED));
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Get experience data
         */
        this.getExperience = function (expId) {
            var gotExperience = Events_1.default.gotExperience;
            try {
                if (gotExperience) {
                    API_1.default.getExperience(expId)
                        .then(function (data) {
                        gotExperience(data);
                    })
                        .catch(function (e) {
                        Helpers_1.errorHandler(e);
                    });
                }
                else {
                    var no_callback_set = errors.no_callback_set;
                    throw new Error(Helpers_1.formatError(no_callback_set, exports.Events.GOT_EXPERIENCE));
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Create a new experience and start listening for messages
         */
        this.renderVideo = function (storyId, sceneId, actId, inventory) {
            var experienceCreated = Events_1.default.experienceCreated, uploadProgress = Events_1.default.uploadProgress, gotExperience = Events_1.default.gotExperience;
            try {
                if (gotExperience) {
                    var postExperience = API_1.default.postExperience;
                    postExperience(storyId, inventory, uploadProgress)
                        .then(function (data) {
                        var id = data.id;
                        if (experienceCreated) {
                            experienceCreated(data);
                        }
                        _this.initStomp({
                            expId: id,
                            sceneId: sceneId,
                            actId: actId
                        });
                    })
                        .catch(function (e) {
                        Helpers_1.errorHandler(e);
                    });
                }
                else {
                    var no_callback_set = errors.no_callback_set;
                    throw new Error(Helpers_1.formatError(no_callback_set, exports.Events.GOT_EXPERIENCE));
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Open TDP connection with Imposium and get event based messages and/or
            video urls / meta
         */
        this.initStomp = function (job) {
            var gotExperience = Events_1.default.gotExperience;
            try {
                if (gotExperience) {
                    if (VideoPlayer_1.default.updateId) {
                        var expId = job.expId;
                        VideoPlayer_1.default.updateExperienceID(expId);
                    }
                    if (!MessageConsumer_1.default.job) {
                        MessageConsumer_1.default.init(job);
                    }
                    else {
                        MessageConsumer_1.default.reconnect(job);
                    }
                }
                else {
                    var no_callback_set = errors.no_callback_set;
                    throw new Error(Helpers_1.formatError(no_callback_set, exports.Events.GOT_EXPERIENCE));
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        Helpers_1.prepConfig(config);
        var accessToken = config.accessToken;
        if (accessToken) {
            API_1.default.setupAuth(token);
        }
        else {
        }
    }
    ImposiumClient.validEvents = Object.keys(exports.Events).map(function (e) { return exports.Events[e]; });
    return ImposiumClient;
}());
exports.ImposiumClient = ImposiumClient;
//# sourceMappingURL=ImposiumClient.js.map
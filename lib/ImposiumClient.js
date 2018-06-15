"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
var API_1 = require("./API");
var Analytics_1 = require("./Analytics");
var VideoPlayer_1 = require("./VideoPlayer");
var ImposiumEvents_1 = require("./ImposiumEvents");
var MessageConsumer_1 = require("./MessageConsumer");
var Helpers_1 = require("./Helpers");
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.EXPERIENCE_CREATED = 'experienceCreated';
    Events.UPLOAD_PROGRESS = 'uploadProgress';
    Events.GOT_EXPERIENCE = 'gotExperience';
    Events.GOT_SCENE = 'gotScene';
    Events.GOT_MESSAGE = 'gotMessage';
    Events.ERROR = 'onError';
    return Events;
}());
exports.Events = Events;
var ImposiumClient = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function ImposiumClient(token, config) {
        if (config === void 0) { config = null; }
        var _this = this;
        /*
            Set up the analytics client and video tracking events
         */
        this.setupAnalytics = function (trackingId, playerRef) {
            if (trackingId === void 0) { trackingId = ''; }
            if (playerRef === void 0) { playerRef = null; }
            var GARegExp = ImposiumClient.GARegExp;
            try {
                if (GARegExp.test(trackingId)) {
                    Analytics_1.default.setup(trackingId);
                    _this.pageView();
                    window.addEventListener('popstate', function () { return _this.pageView(); });
                    if (playerRef) {
                        VideoPlayer_1.default.setup(playerRef);
                    }
                }
                else {
                    throw new Error("Tracking ID " + trackingId + " is not a valid Google Analytics property.");
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
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
                        ImposiumEvents_1.default[eventName] = callback;
                    }
                    else {
                        throw new Error(eventName + " is not a valid Imposium event.");
                    }
                }
                else {
                    throw new Error("The callback reference passed to " + eventName + " was not of type Function.");
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
                        ImposiumEvents_1.default[eventName] = null;
                    }
                    else {
                        throw new Error(eventName + " is not a valid Imposium event.");
                    }
                }
                else {
                    validEvents.forEach(function (event) {
                        ImposiumEvents_1.default[event] = null;
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
            var experienceCreated = ImposiumEvents_1.default.experienceCreated, uploadProgress = ImposiumEvents_1.default.uploadProgress;
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
                    throw new Error('Please set the following callback: experienceCreated to call createExperience');
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Get experience data
         */
        this.getVideo = function (expId) {
            var gotExperience = ImposiumEvents_1.default.gotExperience;
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
                    throw new Error('Please set the following callback: gotExperience to call getExperience.');
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
            var experienceCreated = ImposiumEvents_1.default.experienceCreated, uploadProgress = ImposiumEvents_1.default.uploadProgress, gotScene = ImposiumEvents_1.default.gotScene, gotMessage = ImposiumEvents_1.default.gotMessage;
            try {
                if (gotScene) {
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
                    throw new Error('Please set the following callback: gotScene to call renderExperience.');
                }
            }
            catch (e) {
                Helpers_1.errorHandler(e);
            }
        };
        /*
            Record page view metric
         */
        this.pageView = function () {
            Analytics_1.default.send({
                t: 'pageview',
                dp: window.location.pathname
            });
        };
        API_1.default.setupAuth(token);
    }
    /*
        Open TDP connection with Imposium and get event based messages and/or
        video urls / meta
     */
    ImposiumClient.prototype.initStomp = function (job) {
        var gotScene = ImposiumEvents_1.default.gotScene;
        try {
            if (gotScene) {
                var updateId = VideoPlayer_1.default.updateId, updateExperienceID = VideoPlayer_1.default.updateExperienceID;
                if (updateId) {
                    var expId = job.expId;
                    updateExperienceID(expId);
                }
                if (!this.messageConsumer) {
                    this.messageConsumer = new MessageConsumer_1.default(job);
                }
                else {
                    this.messageConsumer.reconnect(job);
                }
            }
            else {
                throw new Error('Please set the following callback: gotScene to call getVideo.');
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    ImposiumClient.GARegExp = RegExp(/^ua-\d{4,9}-\d{1,4}$/i);
    ImposiumClient.validEvents = [
        'experienceCreated',
        'uploadProgress',
        'gotExperience',
        'gotScene',
        'gotMessage',
        'onError'
    ];
    return ImposiumClient;
}());
exports.ImposiumClient = ImposiumClient;
//# sourceMappingURL=ImposiumClient.js.map
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
var Stomp_1 = require("./Stomp");
var ImposiumEvents_1 = require("./ImposiumEvents");
var Helpers_1 = require("./Helpers");
var Messages = /** @class */ (function () {
    function Messages() {
    }
    Messages.ACT_COMPLETE = 'actComplete';
    Messages.GOT_MESSAGE = 'gotMessage';
    Messages.GOT_SCENE = 'gotScene';
    return Messages;
}());
// Wraps around the Stomp client, providing the message handling
var MessageConsumer = /** @class */ (function () {
    function MessageConsumer(job) {
        this.job = null;
        this.retried = 0;
        this.maxRetries = 5;
        this.job = job;
        this.init();
    }
    /*
        Initialize WebStomp
     */
    MessageConsumer.prototype.init = function () {
        var _this = this;
        var expId = this.job.expId;
        Stomp_1.default.setEvents(function () { return _this.invokeStreaming(); }, function (msg) { return _this.routeMessageData(msg); }, function (e) { return _this.stompError(e); });
        Stomp_1.default.init(expId);
    };
    /*
        Kills the current stomp connection and initates a new connection on closure
     */
    MessageConsumer.prototype.reconnect = function (job) {
        var _this = this;
        this.job = job;
        Stomp_1.default.disconnectAsync()
            .then(function () {
            _this.init();
        }).catch(function (e) {
            Helpers_1.errorHandler(e);
        });
    };
    /*
        Initiates the message queueing process on Imposium
     */
    MessageConsumer.prototype.invokeStreaming = function () {
        var _a = this.job, expId = _a.expId, sceneId = _a.sceneId, actId = _a.actId;
        API_1.default.invokeStream(expId, sceneId, actId)
            .catch(function (e) {
            Helpers_1.errorHandler(e);
        });
    };
    /*
        Manage incoming messages. Depending on their state the websocket
        may be terminated.
     */
    MessageConsumer.prototype.routeMessageData = function (msg) {
        try {
            var payload = JSON.parse(msg.body);
            var ACT_COMPLETE = Messages.ACT_COMPLETE, GOT_MESSAGE = Messages.GOT_MESSAGE, GOT_SCENE = Messages.GOT_SCENE;
            switch (payload.event) {
                case ACT_COMPLETE:
                    // Kills the Stomp connection without handlers
                    Stomp_1.default.disconnect();
                    break;
                case GOT_MESSAGE:
                    this.emitMessageData(payload);
                    break;
                case GOT_SCENE:
                    this.emitSceneData(payload);
                    break;
                default: break;
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    /*
        Fire the gotMessage callback if the user is listening for this event
     */
    MessageConsumer.prototype.emitMessageData = function (messageData) {
        var gotMessage = ImposiumEvents_1.default.gotMessage;
        var msg = messageData.msg;
        try {
            if (msg === 'Server failure.') {
                throw new Error('Something went wrong processing your experience. Try reviewing your configuration.');
            }
            if (gotMessage) {
                gotMessage(messageData);
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    /*
        Parses the experience data into a prop delivered via gotScene
     */
    MessageConsumer.prototype.emitSceneData = function (experienceData) {
        var gotScene = ImposiumEvents_1.default.gotScene;
        var rejected = (experienceData || {}).error;
        try {
            if (!rejected) {
                // Shorthand idioms for checking if required nested JSON data exists
                var sceneId = ((experienceData || {}).sceneData || {}).id;
                var hasUrls = (((experienceData || {}).output || {})[sceneId] || {}).mp4Url;
                var isVideo = (((experienceData || {}).sceneData || {}).type === 'VideoScene01');
                if (isVideo && hasUrls) {
                    // Merge up the scene data and the experience ID 
                    var id = experienceData.id, output = experienceData.output;
                    var sceneData = __assign({}, output[sceneId], { experience_id: id });
                    delete sceneData.id;
                    gotScene(sceneData);
                }
                else {
                    throw new Error("Imposium failed to prepare your experience:\n" + JSON.stringify(experienceData, null, 2));
                }
            }
            else {
                throw new Error('Your experience was rejected.');
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    /*
        Called on Stomp errors
     */
    MessageConsumer.prototype.stompError = function (e) {
        var wasClean = e.wasClean;
        if (!e.wasClean) {
            ++this.retried;
            if (this.retried < this.maxRetries) {
                var expId = this.job.expId;
                Stomp_1.default.reconnect(expId);
                console.warn("Stomp over TCP failed (" + this.retried + "): Attempting to reconnect...");
            }
            else {
                Helpers_1.errorHandler(e);
            }
        }
    };
    return MessageConsumer;
}());
exports.default = MessageConsumer;
//# sourceMappingURL=MessageConsumer.js.map
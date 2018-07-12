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
var API_1 = require("../http/API");
var Stomp_1 = require("./Stomp");
var Events_1 = require("../../scaffolding/Events");
var Helpers_1 = require("../../scaffolding/Helpers");
var errors = require('../../conf/errors.json').message_consumer;
var warnings = require('../../conf/warnings.json').message_consumer;
var settings = require('../../conf/settings.json').message_consumer;
// Distinct message keys to listen for over RabbitMQ
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
    function MessageConsumer() {
    }
    // Current imposium render job
    MessageConsumer.job = null;
    // Settings for retrying rabbitMQ connections
    MessageConsumer.maxRetries = settings.max_reconnect_attempts;
    MessageConsumer.retried = settings.min_reconnects;
    /*
        Initialize WebStomp
     */
    MessageConsumer.init = function (job) {
        var attachStompEvents = MessageConsumer.attachStompEvents;
        var expId = job.expId;
        if (!Stomp_1.default.eventsBound) {
            attachStompEvents();
        }
        MessageConsumer.job = job;
        Stomp_1.default.init(expId);
    };
    /*
        Kills the current stomp connection and initates a new connection on closure
     */
    MessageConsumer.reconnect = function (job) {
        Stomp_1.default.disconnectAsync()
            .then(function () {
            MessageConsumer.init(job);
        }).catch(function (e) {
            Helpers_1.errorHandler(e);
        });
    };
    /*
        Bind the web stomp handlers on first job
     */
    MessageConsumer.attachStompEvents = function () {
        var invokeStreaming = MessageConsumer.invokeStreaming, routeMessageData = MessageConsumer.routeMessageData, stompError = MessageConsumer.stompError;
        Stomp_1.default.setEvents(function () { return invokeStreaming(); }, function (msg) { return routeMessageData(msg); }, function (e) { return stompError(e); });
    };
    /*
        Initiates the message queueing process on Imposium
     */
    MessageConsumer.invokeStreaming = function () {
        var _a = MessageConsumer.job, expId = _a.expId, sceneId = _a.sceneId, actId = _a.actId;
        API_1.default.invokeStream(expId, sceneId, actId)
            .catch(function (e) {
            Helpers_1.errorHandler(e);
        });
    };
    /*
        Manage incoming messages. Depending on their state the websocket
        may be terminated.
     */
    MessageConsumer.routeMessageData = function (msg) {
        var ACT_COMPLETE = Messages.ACT_COMPLETE, GOT_MESSAGE = Messages.GOT_MESSAGE, GOT_SCENE = Messages.GOT_SCENE;
        var emitMessageData = MessageConsumer.emitMessageData, emitSceneData = MessageConsumer.emitSceneData;
        try {
            var payload = JSON.parse(msg.body);
            switch (payload.event) {
                case ACT_COMPLETE:
                    Stomp_1.default.disconnect();
                    break;
                case GOT_MESSAGE:
                    emitMessageData(payload);
                    break;
                case GOT_SCENE:
                    emitSceneData(payload);
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
    MessageConsumer.emitMessageData = function (messageData) {
        var statusUpdate = Events_1.default.statusUpdate;
        var msg = messageData.msg;
        try {
            if (msg === settings.error_over_tcp) {
                var server_failed = errors.server_failed;
                throw new Error(server_failed);
            }
            if (statusUpdate) {
                statusUpdate(messageData);
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    /*
        Parses the experience data into a prop delivered via gotScene
     */
    MessageConsumer.emitSceneData = function (experienceData) {
        var gotExperience = Events_1.default.gotExperience;
        var rejected = (experienceData || {}).error;
        try {
            if (!rejected) {
                // Shorthand idioms for checking if required nested JSON data exists
                var sceneId = ((experienceData || {}).sceneData || {}).id;
                var hasUrls = (((experienceData || {}).output || {})[sceneId] || {}).mp4Url;
                var isVideo = (((experienceData || {}).sceneData || {}).type === settings.video_scene);
                if (isVideo && hasUrls) {
                    // Merge up the scene data and the experience ID 
                    var id = experienceData.id, output = experienceData.output;
                    var sceneData = __assign({}, output[sceneId], { experience_id: id });
                    delete sceneData.id;
                    gotExperience(sceneData);
                }
                else {
                    var parse_failed = errors.parse_failed;
                    throw new Error(Helpers_1.formatError(parse_failed, JSON.stringify(experienceData, null, 2)));
                }
            }
            else {
                var rejected_1 = errors.rejected;
                throw new Error(rejected_1);
            }
        }
        catch (e) {
            Helpers_1.errorHandler(e);
        }
    };
    /*
        Called on Stomp errors
     */
    MessageConsumer.stompError = function (e) {
        var retried = MessageConsumer.retried, maxRetries = MessageConsumer.maxRetries, expId = MessageConsumer.job.expId;
        var wasClean = e.wasClean;
        if (!e.wasClean) {
            ++MessageConsumer.retried;
            if (retried < maxRetries) {
                var tcp_failure = warnings.tcp_failure;
                Stomp_1.default.reconnect(expId);
                Helpers_1.warnHandler(Helpers_1.formatError(tcp_failure, retried + 1));
            }
            else {
                MessageConsumer.retried = settings.min_reconnects;
                Helpers_1.errorHandler(e);
            }
        }
    };
    return MessageConsumer;
}());
exports.default = MessageConsumer;
//# sourceMappingURL=MessageConsumer.js.map
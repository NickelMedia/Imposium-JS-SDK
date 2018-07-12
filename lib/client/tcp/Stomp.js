"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebStomp = require("webstomp-client");
var Helpers_1 = require("../../scaffolding/Helpers");
var WebSocketShim = require('isomorphic-ws');
var settings = require('../../conf/settings.json').stomp;
var SocketEvents = /** @class */ (function () {
    function SocketEvents() {
    }
    SocketEvents.triggerEmit = null;
    SocketEvents.onMessage = null;
    SocketEvents.onError = null;
    return SocketEvents;
}());
var Stomp = /** @class */ (function () {
    function Stomp() {
    }
    // RabbitMQ creds
    Stomp.endpoint = settings.endpoint;
    Stomp.exchange = settings.exchange;
    Stomp.username = settings.username;
    Stomp.password = settings.password;
    // Events configuration status
    Stomp.eventsBound = false;
    /*
        Setup callbacks
     */
    Stomp.setEvents = function (t, m, e) {
        SocketEvents.triggerEmit = t;
        SocketEvents.onMessage = m;
        SocketEvents.onError = e;
        Stomp.eventsBound = true;
    };
    /*
        Initializes the WebStomp client w/ handlers.

        The debug method needs to be overridden as a rule of
        this WebStomp library.
     */
    Stomp.init = function (expId) {
        var endpoint = Stomp.endpoint, username = Stomp.username, password = Stomp.password, establishSubscription = Stomp.establishSubscription;
        var onError = SocketEvents.onError;
        Stomp.expId = expId;
        Stomp.socket = (!Helpers_1.isNode()) ? new WebSocket(endpoint) : new WebSocketShim(endpoint);
        Stomp.client = WebStomp.over(Stomp.socket);
        Stomp.client.debug = function () { };
        Stomp.client.connect(username, password, function () { return establishSubscription(); }, onError);
    };
    /*
        Triggers socketIO to emit & sets up a listener for messages
     */
    Stomp.establishSubscription = function () {
        var exchange = Stomp.exchange, expId = Stomp.expId;
        var triggerEmit = SocketEvents.triggerEmit, onMessage = SocketEvents.onMessage;
        Stomp.subscription = Stomp.client.subscribe("" + exchange + expId, onMessage);
        triggerEmit();
    };
    /*
        Make sure previous socket & client get cleaned up
        and set up a new connection
     */
    Stomp.reconnect = function (expId) {
        Stomp.socket = null;
        Stomp.client = null;
        Stomp.init(expId);
    };
    /*
        Kills the current connection gracefully without handlers
     */
    Stomp.disconnect = function () {
        Stomp.subscription.unsubscribe();
        Stomp.client.disconnect();
    };
    /*
        Kills the current connection gracefully and resolves on closure
     */
    Stomp.disconnectAsync = function () {
        return new Promise(function (resolve) {
            var client = Stomp.client, subscription = Stomp.subscription;
            if (client.connected) {
                subscription.unsubscribe();
                client.disconnect(function () {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    };
    return Stomp;
}());
exports.default = Stomp;
//# sourceMappingURL=Stomp.js.map
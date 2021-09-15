/*! IMPOSIUM-JS-SDK | Version 2.4.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Imposium", [], factory);
	else if(typeof exports === 'object')
		exports["Imposium"] = factory();
	else
		root["Imposium"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sentry/browser/esm/backend.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/backend.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserBackend": () => (/* binding */ BrowserBackend)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/basebackend.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _eventbuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventbuilder */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports */ "./node_modules/@sentry/browser/esm/transports/fetch.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transports */ "./node_modules/@sentry/browser/esm/transports/xhr.js");






/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */
var BrowserBackend = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(BrowserBackend, _super);
    function BrowserBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype._setupTransport = function () {
        if (!this._options.dsn) {
            // We return the noop transport here in case there is no Dsn.
            return _super.prototype._setupTransport.call(this);
        }
        var transportOptions = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._options.transportOptions, { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.supportsFetch)()) {
            return new _transports__WEBPACK_IMPORTED_MODULE_2__.FetchTransport(transportOptions);
        }
        return new _transports__WEBPACK_IMPORTED_MODULE_3__.XHRTransport(transportOptions);
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromException = function (exception, hint) {
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_4__.eventFromUnknownInput)(exception, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.addExceptionMechanism)(event, {
            handled: true,
            type: 'generic',
        });
        event.level = _sentry_types__WEBPACK_IMPORTED_MODULE_6__.Severity.Error;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.SyncPromise.resolve(event);
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = _sentry_types__WEBPACK_IMPORTED_MODULE_6__.Severity.Info; }
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_4__.eventFromString)(message, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        event.level = level;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.SyncPromise.resolve(event);
    };
    return BrowserBackend;
}(_sentry_core__WEBPACK_IMPORTED_MODULE_8__.BaseBackend));

//# sourceMappingURL=backend.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/client.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/client.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserClient": () => (/* binding */ BrowserClient)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/baseclient.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backend */ "./node_modules/@sentry/browser/esm/backend.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version */ "./node_modules/@sentry/browser/esm/version.js");





/**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var BrowserClient = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(BrowserClient, _super);
    /**
     * Creates a new Browser SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    function BrowserClient(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, _backend__WEBPACK_IMPORTED_MODULE_1__.BrowserBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserClient.prototype._prepareEvent = function (event, scope, hint) {
        event.platform = event.platform || 'javascript';
        event.sdk = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event.sdk, { name: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_NAME, packages: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(((event.sdk && event.sdk.packages) || []), [
                {
                    name: 'npm:@sentry/browser',
                    version: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_VERSION,
                },
            ]), version: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_VERSION });
        return _super.prototype._prepareEvent.call(this, event, scope, hint);
    };
    /**
     * Show a report dialog to the user to send feedback to a specific event.
     *
     * @param options Set individual options for the dialog
     */
    BrowserClient.prototype.showReportDialog = function (options) {
        if (options === void 0) { options = {}; }
        // doesn't work without a document (React Native)
        var document = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.getGlobalObject)().document;
        if (!document) {
            return;
        }
        if (!this._isEnabled()) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Trying to call showReportDialog with Sentry Client is disabled');
            return;
        }
        var dsn = options.dsn || this.getDsn();
        if (!options.eventId) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Missing `eventId` option in showReportDialog call');
            return;
        }
        if (!dsn) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Missing `Dsn` option in showReportDialog call');
            return;
        }
        var script = document.createElement('script');
        script.async = true;
        script.src = new _sentry_core__WEBPACK_IMPORTED_MODULE_5__.API(dsn).getReportDialogEndpoint(options);
        if (options.onLoad) {
            script.onload = options.onLoad;
        }
        (document.head || document.body).appendChild(script);
    };
    return BrowserClient;
}(_sentry_core__WEBPACK_IMPORTED_MODULE_6__.BaseClient));

//# sourceMappingURL=client.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/eventbuilder.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/eventbuilder.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventFromUnknownInput": () => (/* binding */ eventFromUnknownInput),
/* harmony export */   "eventFromString": () => (/* binding */ eventFromString)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsers */ "./node_modules/@sentry/browser/esm/parsers.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");



/** JSDoc */
function eventFromUnknownInput(exception, syntheticException, options) {
    if (options === void 0) { options = {}; }
    var event;
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isErrorEvent)(exception) && exception.error) {
        // If it is an ErrorEvent with `error` property, extract it to get actual Error
        var errorEvent = exception;
        exception = errorEvent.error; // tslint:disable-line:no-parameter-reassignment
        event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromStacktrace)((0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(exception));
        return event;
    }
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMError)(exception) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMException)(exception)) {
        // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
        // then we just extract the name and message, as they don't provide anything else
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
        var domException = exception;
        var name_1 = domException.name || ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMError)(domException) ? 'DOMError' : 'DOMException');
        var message = domException.message ? name_1 + ": " + domException.message : name_1;
        event = eventFromString(message, syntheticException, options);
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionTypeValue)(event, message);
        return event;
    }
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isError)(exception)) {
        // we have a real Error object, do nothing
        event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromStacktrace)((0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(exception));
        return event;
    }
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(exception) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isEvent)(exception)) {
        // If it is plain Object or Event, serialize it manually and extract options
        // This will allow us to group events based on top-level keys
        // which is much better than creating new group when any key/value change
        var objectException = exception;
        event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromPlainObject)(objectException, syntheticException, options.rejection);
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionMechanism)(event, {
            synthetic: true,
        });
        return event;
    }
    // If none of previous checks were valid, then it means that it's not:
    // - an instance of DOMError
    // - an instance of DOMException
    // - an instance of Event
    // - an instance of Error
    // - a valid ErrorEvent (one with an error property)
    // - a plain Object
    //
    // So bail out and capture it as a simple message:
    event = eventFromString(exception, syntheticException, options);
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionTypeValue)(event, "" + exception, undefined);
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionMechanism)(event, {
        synthetic: true,
    });
    return event;
}
// this._options.attachStacktrace
/** JSDoc */
function eventFromString(input, syntheticException, options) {
    if (options === void 0) { options = {}; }
    var event = {
        message: input,
    };
    if (options.attachStacktrace && syntheticException) {
        var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(syntheticException);
        var frames_1 = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.prepareFramesForEvent)(stacktrace.stack);
        event.stacktrace = {
            frames: frames_1,
        };
    }
    return event;
}
//# sourceMappingURL=eventbuilder.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/exports.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/exports.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Severity": () => (/* reexport safe */ _sentry_types__WEBPACK_IMPORTED_MODULE_0__.Severity),
/* harmony export */   "Status": () => (/* reexport safe */ _sentry_types__WEBPACK_IMPORTED_MODULE_1__.Status),
/* harmony export */   "addGlobalEventProcessor": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_2__.addGlobalEventProcessor),
/* harmony export */   "addBreadcrumb": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.addBreadcrumb),
/* harmony export */   "captureException": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.captureException),
/* harmony export */   "captureEvent": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.captureEvent),
/* harmony export */   "captureMessage": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.captureMessage),
/* harmony export */   "configureScope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.configureScope),
/* harmony export */   "getHubFromCarrier": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_4__.getHubFromCarrier),
/* harmony export */   "getCurrentHub": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub),
/* harmony export */   "Hub": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_4__.Hub),
/* harmony export */   "Scope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_2__.Scope),
/* harmony export */   "setContext": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setContext),
/* harmony export */   "setExtra": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setExtra),
/* harmony export */   "setExtras": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setExtras),
/* harmony export */   "setTag": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setTag),
/* harmony export */   "setTags": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setTags),
/* harmony export */   "setUser": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.setUser),
/* harmony export */   "withScope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.withScope),
/* harmony export */   "BrowserClient": () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_5__.BrowserClient),
/* harmony export */   "defaultIntegrations": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.defaultIntegrations),
/* harmony export */   "forceLoad": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.forceLoad),
/* harmony export */   "init": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.init),
/* harmony export */   "lastEventId": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.lastEventId),
/* harmony export */   "onLoad": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.onLoad),
/* harmony export */   "showReportDialog": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.showReportDialog),
/* harmony export */   "flush": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.flush),
/* harmony export */   "close": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.close),
/* harmony export */   "wrap": () => (/* reexport safe */ _sdk__WEBPACK_IMPORTED_MODULE_6__.wrap),
/* harmony export */   "SDK_NAME": () => (/* reexport safe */ _version__WEBPACK_IMPORTED_MODULE_7__.SDK_NAME),
/* harmony export */   "SDK_VERSION": () => (/* reexport safe */ _version__WEBPACK_IMPORTED_MODULE_7__.SDK_VERSION)
/* harmony export */ });
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/minimal/esm/index.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./client */ "./node_modules/@sentry/browser/esm/client.js");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sdk */ "./node_modules/@sentry/browser/esm/sdk.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./version */ "./node_modules/@sentry/browser/esm/version.js");





//# sourceMappingURL=exports.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/helpers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouldIgnoreOnError": () => (/* binding */ shouldIgnoreOnError),
/* harmony export */   "ignoreNextOnError": () => (/* binding */ ignoreNextOnError),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/minimal/esm/index.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");



var ignoreOnError = 0;
/**
 * @hidden
 */
function shouldIgnoreOnError() {
    return ignoreOnError > 0;
}
/**
 * @hidden
 */
function ignoreNextOnError() {
    // onerror should trigger before setTimeout
    ignoreOnError += 1;
    setTimeout(function () {
        ignoreOnError -= 1;
    });
}
/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap.
 * @returns The wrapped function.
 * @hidden
 */
function wrap(fn, options, before) {
    if (options === void 0) { options = {}; }
    // tslint:disable-next-line:strict-type-predicates
    if (typeof fn !== 'function') {
        return fn;
    }
    try {
        // We don't wanna wrap it twice
        if (fn.__sentry__) {
            return fn;
        }
        // If this has already been wrapped in the past, return that wrapped function
        if (fn.__sentry_wrapped__) {
            return fn.__sentry_wrapped__;
        }
    }
    catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        // Bail on wrapping and return the function as-is (defers to window.onerror).
        return fn;
    }
    var sentryWrapped = function () {
        var args = Array.prototype.slice.call(arguments);
        // tslint:disable:no-unsafe-any
        try {
            // tslint:disable-next-line:strict-type-predicates
            if (before && typeof before === 'function') {
                before.apply(this, arguments);
            }
            var wrappedArguments = args.map(function (arg) { return wrap(arg, options); });
            if (fn.handleEvent) {
                // Attempt to invoke user-land function
                // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
                //       means the sentry.javascript SDK caught an error invoking your application code. This
                //       is expected behavior and NOT indicative of a bug with sentry.javascript.
                return fn.handleEvent.apply(this, wrappedArguments);
            }
            // Attempt to invoke user-land function
            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
            //       means the sentry.javascript SDK caught an error invoking your application code. This
            //       is expected behavior and NOT indicative of a bug with sentry.javascript.
            return fn.apply(this, wrappedArguments);
            // tslint:enable:no-unsafe-any
        }
        catch (ex) {
            ignoreNextOnError();
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.withScope)(function (scope) {
                scope.addEventProcessor(function (event) {
                    var processedEvent = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event);
                    if (options.mechanism) {
                        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.addExceptionTypeValue)(processedEvent, undefined, undefined);
                        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(processedEvent, options.mechanism);
                    }
                    processedEvent.extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, processedEvent.extra, { arguments: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(args, 3) });
                    return processedEvent;
                });
                (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.captureException)(ex);
            });
            throw ex;
        }
    };
    // Accessing some objects may throw
    // ref: https://github.com/getsentry/sentry-javascript/issues/1168
    try {
        for (var property in fn) {
            if (Object.prototype.hasOwnProperty.call(fn, property)) {
                sentryWrapped[property] = fn[property];
            }
        }
    }
    catch (_oO) { } // tslint:disable-line:no-empty
    fn.prototype = fn.prototype || {};
    sentryWrapped.prototype = fn.prototype;
    Object.defineProperty(fn, '__sentry_wrapped__', {
        enumerable: false,
        value: sentryWrapped,
    });
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    Object.defineProperties(sentryWrapped, {
        __sentry__: {
            enumerable: false,
            value: true,
        },
        __sentry_original__: {
            enumerable: false,
            value: fn,
        },
    });
    // Restore original function name (not all browsers allow that)
    try {
        var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
        if (descriptor.configurable) {
            Object.defineProperty(sentryWrapped, 'name', {
                get: function () {
                    return fn.name;
                },
            });
        }
    }
    catch (_oO) {
        /*no-empty*/
    }
    return sentryWrapped;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserClient": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.BrowserClient),
/* harmony export */   "Hub": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.Hub),
/* harmony export */   "SDK_NAME": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.SDK_NAME),
/* harmony export */   "SDK_VERSION": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.SDK_VERSION),
/* harmony export */   "Scope": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.Scope),
/* harmony export */   "Severity": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.Severity),
/* harmony export */   "Status": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.Status),
/* harmony export */   "addBreadcrumb": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.addBreadcrumb),
/* harmony export */   "addGlobalEventProcessor": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor),
/* harmony export */   "captureEvent": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.captureEvent),
/* harmony export */   "captureException": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.captureException),
/* harmony export */   "captureMessage": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.captureMessage),
/* harmony export */   "close": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.close),
/* harmony export */   "configureScope": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.configureScope),
/* harmony export */   "defaultIntegrations": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.defaultIntegrations),
/* harmony export */   "flush": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.flush),
/* harmony export */   "forceLoad": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.forceLoad),
/* harmony export */   "getCurrentHub": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub),
/* harmony export */   "getHubFromCarrier": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.getHubFromCarrier),
/* harmony export */   "init": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.init),
/* harmony export */   "lastEventId": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.lastEventId),
/* harmony export */   "onLoad": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.onLoad),
/* harmony export */   "setContext": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setContext),
/* harmony export */   "setExtra": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setExtra),
/* harmony export */   "setExtras": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setExtras),
/* harmony export */   "setTag": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setTag),
/* harmony export */   "setTags": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setTags),
/* harmony export */   "setUser": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.setUser),
/* harmony export */   "showReportDialog": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.showReportDialog),
/* harmony export */   "withScope": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.withScope),
/* harmony export */   "wrap": () => (/* reexport safe */ _exports__WEBPACK_IMPORTED_MODULE_1__.wrap),
/* harmony export */   "Integrations": () => (/* binding */ INTEGRATIONS),
/* harmony export */   "Transports": () => (/* reexport module object */ _transports__WEBPACK_IMPORTED_MODULE_5__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exports */ "./node_modules/@sentry/browser/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/index.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/index.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transports */ "./node_modules/@sentry/browser/esm/transports/index.js");






var windowIntegrations = {};
// This block is needed to add compatibility with the integrations packages when used with a CDN
// tslint:disable: no-unsafe-any
var _window = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getGlobalObject)();
if (_window.Sentry && _window.Sentry.Integrations) {
    windowIntegrations = _window.Sentry.Integrations;
}
// tslint:enable: no-unsafe-any
var INTEGRATIONS = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, windowIntegrations, _sentry_core__WEBPACK_IMPORTED_MODULE_3__, _integrations__WEBPACK_IMPORTED_MODULE_4__);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Breadcrumbs": () => (/* binding */ Breadcrumbs)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/instrument.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");




/**
 * Default Breadcrumbs instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */
var Breadcrumbs = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Breadcrumbs(options) {
        /**
         * @inheritDoc
         */
        this.name = Breadcrumbs.id;
        this._options = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
    }
    /**
     * Creates breadcrumbs from console API calls
     */
    Breadcrumbs.prototype._consoleBreadcrumb = function (handlerData) {
        var breadcrumb = {
            category: 'console',
            data: {
                extra: {
                    arguments: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalize)(handlerData.args, 3),
                },
                logger: 'console',
            },
            level: _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.fromString(handlerData.level),
            message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.safeJoin)(handlerData.args, ' '),
        };
        if (handlerData.level === 'assert') {
            if (handlerData.args[0] === false) {
                breadcrumb.message = "Assertion failed: " + ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.safeJoin)(handlerData.args.slice(1), ' ') || 'console.assert');
                breadcrumb.data.extra.arguments = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalize)(handlerData.args.slice(1), 3);
            }
            else {
                // Don't capture a breadcrumb for passed assertions
                return;
            }
        }
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb(breadcrumb, {
            input: handlerData.args,
            level: handlerData.level,
        });
    };
    /**
     * Creates breadcrumbs from DOM API calls
     */
    Breadcrumbs.prototype._domBreadcrumb = function (handlerData) {
        var target;
        // Accessing event.target can throw (see getsentry/raven-js#838, #768)
        try {
            target = handlerData.event.target
                ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.htmlTreeAsString)(handlerData.event.target)
                : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.htmlTreeAsString)(handlerData.event);
        }
        catch (e) {
            target = '<unknown>';
        }
        if (target.length === 0) {
            return;
        }
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
            category: "ui." + handlerData.name,
            message: target,
        }, {
            event: event,
            name: handlerData.name,
        });
    };
    /**
     * Creates breadcrumbs from XHR API calls
     */
    Breadcrumbs.prototype._xhrBreadcrumb = function (handlerData) {
        if (handlerData.endTimestamp) {
            // We only capture complete, non-sentry requests
            if (handlerData.xhr.__sentry_own_request__) {
                return;
            }
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
                category: 'xhr',
                data: handlerData.xhr.__sentry_xhr__,
                type: 'http',
            }, {
                xhr: handlerData.xhr,
            });
            return;
        }
        // We only capture issued sentry requests
        if (handlerData.xhr.__sentry_own_request__) {
            addSentryBreadcrumb(handlerData.args[0]);
        }
    };
    /**
     * Creates breadcrumbs from fetch API calls
     */
    Breadcrumbs.prototype._fetchBreadcrumb = function (handlerData) {
        // We only capture complete fetch requests
        if (!handlerData.endTimestamp) {
            return;
        }
        var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().getClient();
        var dsn = client && client.getDsn();
        if (dsn) {
            var filterUrl = new _sentry_core__WEBPACK_IMPORTED_MODULE_6__.API(dsn).getStoreEndpoint();
            // if Sentry key appears in URL, don't capture it as a request
            // but rather as our own 'sentry' type breadcrumb
            if (filterUrl &&
                handlerData.fetchData.url.indexOf(filterUrl) !== -1 &&
                handlerData.fetchData.method === 'POST' &&
                handlerData.args[1] &&
                handlerData.args[1].body) {
                addSentryBreadcrumb(handlerData.args[1].body);
                return;
            }
        }
        if (handlerData.error) {
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
                category: 'fetch',
                data: tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, handlerData.fetchData, { status_code: handlerData.response.status }),
                level: _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.Error,
                type: 'http',
            }, {
                data: handlerData.error,
                input: handlerData.args,
            });
        }
        else {
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
                category: 'fetch',
                data: tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, handlerData.fetchData, { status_code: handlerData.response.status }),
                type: 'http',
            }, {
                input: handlerData.args,
                response: handlerData.response,
            });
        }
    };
    /**
     * Creates breadcrumbs from history API calls
     */
    Breadcrumbs.prototype._historyBreadcrumb = function (handlerData) {
        var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.getGlobalObject)();
        var from = handlerData.from;
        var to = handlerData.to;
        var parsedLoc = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(global.location.href);
        var parsedFrom = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(from);
        var parsedTo = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(to);
        // Initial pushState doesn't provide `from` information
        if (!parsedFrom.path) {
            parsedFrom = parsedLoc;
        }
        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
            // tslint:disable-next-line:no-parameter-reassignment
            to = parsedTo.relative;
        }
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
            // tslint:disable-next-line:no-parameter-reassignment
            from = parsedFrom.relative;
        }
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
            category: 'navigation',
            data: {
                from: from,
                to: to,
            },
        });
    };
    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - Console API
     *  - DOM API (click/typing)
     *  - XMLHttpRequest API
     *  - Fetch API
     *  - History API
     */
    Breadcrumbs.prototype.setupOnce = function () {
        var _this = this;
        if (this._options.console) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
                callback: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._consoleBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
                },
                type: 'console',
            });
        }
        if (this._options.dom) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
                callback: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._domBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
                },
                type: 'dom',
            });
        }
        if (this._options.xhr) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
                callback: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._xhrBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
                },
                type: 'xhr',
            });
        }
        if (this._options.fetch) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
                callback: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._fetchBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
                },
                type: 'fetch',
            });
        }
        if (this._options.history) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
                callback: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this._historyBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
                },
                type: 'history',
            });
        }
    };
    /**
     * @inheritDoc
     */
    Breadcrumbs.id = 'Breadcrumbs';
    return Breadcrumbs;
}());

/**
 * Create a breadcrumb of `sentry` from the events themselves
 */
function addSentryBreadcrumb(serializedData) {
    // There's always something that can go wrong with deserialization...
    try {
        var event_1 = JSON.parse(serializedData);
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
            category: 'sentry',
            event_id: event_1.event_id,
            level: event_1.level || _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.fromString('error'),
            message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.getEventDescription)(event_1),
        }, {
            event: event_1,
        });
    }
    catch (_oO) {
        _sentry_utils__WEBPACK_IMPORTED_MODULE_8__.logger.error('Error while adding sentry type breadcrumb');
    }
}
//# sourceMappingURL=breadcrumbs.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/globalhandlers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalHandlers": () => (/* binding */ GlobalHandlers)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _eventbuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../eventbuilder */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./node_modules/@sentry/browser/esm/helpers.js");






/** Global handlers */
var GlobalHandlers = /** @class */ (function () {
    /** JSDoc */
    function GlobalHandlers(options) {
        /**
         * @inheritDoc
         */
        this.name = GlobalHandlers.id;
        /** JSDoc */
        this._global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
        /** JSDoc */
        this._oldOnErrorHandler = null;
        /** JSDoc */
        this._oldOnUnhandledRejectionHandler = null;
        /** JSDoc */
        this._onErrorHandlerInstalled = false;
        /** JSDoc */
        this._onUnhandledRejectionHandlerInstalled = false;
        this._options = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({ onerror: true, onunhandledrejection: true }, options);
    }
    /**
     * @inheritDoc
     */
    GlobalHandlers.prototype.setupOnce = function () {
        Error.stackTraceLimit = 50;
        if (this._options.onerror) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log('Global Handler attached: onerror');
            this._installGlobalOnErrorHandler();
        }
        if (this._options.onunhandledrejection) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log('Global Handler attached: onunhandledrejection');
            this._installGlobalOnUnhandledRejectionHandler();
        }
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
        if (this._onErrorHandlerInstalled) {
            return;
        }
        var self = this; // tslint:disable-line:no-this-assignment
        this._oldOnErrorHandler = this._global.onerror;
        this._global.onerror = function (msg, url, line, column, error) {
            var currentHub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)();
            var hasIntegration = currentHub.getIntegration(GlobalHandlers);
            var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
            if (!hasIntegration || (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.shouldIgnoreOnError)() || isFailedOwnDelivery) {
                if (self._oldOnErrorHandler) {
                    return self._oldOnErrorHandler.apply(this, arguments);
                }
                return false;
            }
            var client = currentHub.getClient();
            var event = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isPrimitive)(error)
                ? self._eventFromIncompleteOnError(msg, url, line, column)
                : self._enhanceEventWithInitialFrame((0,_eventbuilder__WEBPACK_IMPORTED_MODULE_6__.eventFromUnknownInput)(error, undefined, {
                    attachStacktrace: client && client.getOptions().attachStacktrace,
                    rejection: false,
                }), url, line, column);
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.addExceptionMechanism)(event, {
                handled: false,
                type: 'onerror',
            });
            currentHub.captureEvent(event, {
                originalException: error,
            });
            if (self._oldOnErrorHandler) {
                return self._oldOnErrorHandler.apply(this, arguments);
            }
            return false;
        };
        this._onErrorHandlerInstalled = true;
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnUnhandledRejectionHandler = function () {
        if (this._onUnhandledRejectionHandlerInstalled) {
            return;
        }
        var self = this; // tslint:disable-line:no-this-assignment
        this._oldOnUnhandledRejectionHandler = this._global.onunhandledrejection;
        this._global.onunhandledrejection = function (e) {
            var error = e;
            try {
                error = e && 'reason' in e ? e.reason : e;
            }
            catch (_oO) {
                // no-empty
            }
            var currentHub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)();
            var hasIntegration = currentHub.getIntegration(GlobalHandlers);
            var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
            if (!hasIntegration || (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.shouldIgnoreOnError)() || isFailedOwnDelivery) {
                if (self._oldOnUnhandledRejectionHandler) {
                    return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
                }
                return true;
            }
            var client = currentHub.getClient();
            var event = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isPrimitive)(error)
                ? self._eventFromIncompleteRejection(error)
                : (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_6__.eventFromUnknownInput)(error, undefined, {
                    attachStacktrace: client && client.getOptions().attachStacktrace,
                    rejection: true,
                });
            event.level = _sentry_types__WEBPACK_IMPORTED_MODULE_7__.Severity.Error;
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.addExceptionMechanism)(event, {
                handled: false,
                type: 'onunhandledrejection',
            });
            currentHub.captureEvent(event, {
                originalException: error,
            });
            if (self._oldOnUnhandledRejectionHandler) {
                return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
            }
            return true;
        };
        this._onUnhandledRejectionHandlerInstalled = true;
    };
    /**
     * This function creates a stack from an old, error-less onerror handler.
     */
    GlobalHandlers.prototype._eventFromIncompleteOnError = function (msg, url, line, column) {
        var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
        // If 'message' is ErrorEvent, get real message from inside
        var message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isErrorEvent)(msg) ? msg.message : msg;
        var name;
        if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isString)(message)) {
            var groups = message.match(ERROR_TYPES_RE);
            if (groups) {
                name = groups[1];
                message = groups[2];
            }
        }
        var event = {
            exception: {
                values: [
                    {
                        type: name || 'Error',
                        value: message,
                    },
                ],
            },
        };
        return this._enhanceEventWithInitialFrame(event, url, line, column);
    };
    /**
     * This function creates an Event from an TraceKitStackTrace that has part of it missing.
     */
    GlobalHandlers.prototype._eventFromIncompleteRejection = function (error) {
        return {
            exception: {
                values: [
                    {
                        type: 'UnhandledRejection',
                        value: "Non-Error promise rejection captured with value: " + error,
                    },
                ],
            },
        };
    };
    /** JSDoc */
    GlobalHandlers.prototype._enhanceEventWithInitialFrame = function (event, url, line, column) {
        event.exception = event.exception || {};
        event.exception.values = event.exception.values || [];
        event.exception.values[0] = event.exception.values[0] || {};
        event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {};
        event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];
        var colno = isNaN(parseInt(column, 10)) ? undefined : column;
        var lineno = isNaN(parseInt(line, 10)) ? undefined : line;
        var filename = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isString)(url) && url.length > 0 ? url : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getLocationHref)();
        if (event.exception.values[0].stacktrace.frames.length === 0) {
            event.exception.values[0].stacktrace.frames.push({
                colno: colno,
                filename: filename,
                function: '?',
                in_app: true,
                lineno: lineno,
            });
        }
        return event;
    };
    /**
     * @inheritDoc
     */
    GlobalHandlers.id = 'GlobalHandlers';
    return GlobalHandlers;
}());

//# sourceMappingURL=globalhandlers.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalHandlers": () => (/* reexport safe */ _globalhandlers__WEBPACK_IMPORTED_MODULE_0__.GlobalHandlers),
/* harmony export */   "TryCatch": () => (/* reexport safe */ _trycatch__WEBPACK_IMPORTED_MODULE_1__.TryCatch),
/* harmony export */   "Breadcrumbs": () => (/* reexport safe */ _breadcrumbs__WEBPACK_IMPORTED_MODULE_2__.Breadcrumbs),
/* harmony export */   "LinkedErrors": () => (/* reexport safe */ _linkederrors__WEBPACK_IMPORTED_MODULE_3__.LinkedErrors),
/* harmony export */   "UserAgent": () => (/* reexport safe */ _useragent__WEBPACK_IMPORTED_MODULE_4__.UserAgent)
/* harmony export */ });
/* harmony import */ var _globalhandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalhandlers */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _trycatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trycatch */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _breadcrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./breadcrumbs */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _linkederrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linkederrors */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _useragent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useragent */ "./node_modules/@sentry/browser/esm/integrations/useragent.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/linkederrors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkedErrors": () => (/* binding */ LinkedErrors)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parsers */ "./node_modules/@sentry/browser/esm/parsers.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");





var DEFAULT_KEY = 'cause';
var DEFAULT_LIMIT = 5;
/** Adds SDK info to an event. */
var LinkedErrors = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function LinkedErrors(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = LinkedErrors.id;
        this._key = options.key || DEFAULT_KEY;
        this._limit = options.limit || DEFAULT_LIMIT;
    }
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype.setupOnce = function () {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor)(function (event, hint) {
            var self = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().getIntegration(LinkedErrors);
            if (self) {
                return self._handler(event, hint);
            }
            return event;
        });
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype._handler = function (event, hint) {
        if (!event.exception || !event.exception.values || !hint || !(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.isInstanceOf)(hint.originalException, Error)) {
            return event;
        }
        var linkedErrors = this._walkErrorTree(hint.originalException, this._key);
        event.exception.values = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(linkedErrors, event.exception.values);
        return event;
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype._walkErrorTree = function (error, key, stack) {
        if (stack === void 0) { stack = []; }
        if (!(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.isInstanceOf)(error[key], Error) || stack.length + 1 >= this._limit) {
            return stack;
        }
        var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_4__.computeStackTrace)(error[key]);
        var exception = (0,_parsers__WEBPACK_IMPORTED_MODULE_5__.exceptionFromStacktrace)(stacktrace);
        return this._walkErrorTree(error[key], key, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread([exception], stack));
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.id = 'LinkedErrors';
    return LinkedErrors;
}());

//# sourceMappingURL=linkederrors.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/trycatch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/trycatch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TryCatch": () => (/* binding */ TryCatch)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./node_modules/@sentry/browser/esm/helpers.js");


/** Wrap timer functions and event targets to catch errors and provide better meta data */
var TryCatch = /** @class */ (function () {
    function TryCatch() {
        /** JSDoc */
        this._ignoreOnError = 0;
        /**
         * @inheritDoc
         */
        this.name = TryCatch.id;
    }
    /** JSDoc */
    TryCatch.prototype._wrapTimeFunction = function (original) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var originalCallback = args[0];
            args[0] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(originalCallback, {
                mechanism: {
                    data: { function: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original) },
                    handled: true,
                    type: 'instrument',
                },
            });
            return original.apply(this, args);
        };
    };
    /** JSDoc */
    TryCatch.prototype._wrapRAF = function (original) {
        return function (callback) {
            return original((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(callback, {
                mechanism: {
                    data: {
                        function: 'requestAnimationFrame',
                        handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original),
                    },
                    handled: true,
                    type: 'instrument',
                },
            }));
        };
    };
    /** JSDoc */
    TryCatch.prototype._wrapEventTarget = function (target) {
        var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
        var proto = global[target] && global[target].prototype;
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
            return;
        }
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(proto, 'addEventListener', function (original) {
            return function (eventName, fn, options) {
                try {
                    // tslint:disable-next-line:no-unbound-method strict-type-predicates
                    if (typeof fn.handleEvent === 'function') {
                        fn.handleEvent = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(fn.handleEvent.bind(fn), {
                            mechanism: {
                                data: {
                                    function: 'handleEvent',
                                    handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(fn),
                                    target: target,
                                },
                                handled: true,
                                type: 'instrument',
                            },
                        });
                    }
                }
                catch (err) {
                    // can sometimes get 'Permission denied to access property "handle Event'
                }
                return original.call(this, eventName, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(fn, {
                    mechanism: {
                        data: {
                            function: 'addEventListener',
                            handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(fn),
                            target: target,
                        },
                        handled: true,
                        type: 'instrument',
                    },
                }), options);
            };
        });
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(proto, 'removeEventListener', function (original) {
            return function (eventName, fn, options) {
                var callback = fn;
                try {
                    callback = callback && (callback.__sentry_wrapped__ || callback);
                }
                catch (e) {
                    // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                }
                return original.call(this, eventName, callback, options);
            };
        });
    };
    /** JSDoc */
    TryCatch.prototype._wrapXHR = function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var xhr = this; // tslint:disable-line:no-this-assignment
            var xmlHttpRequestProps = ['onload', 'onerror', 'onprogress'];
            xmlHttpRequestProps.forEach(function (prop) {
                if (prop in _this && typeof _this[prop] === 'function') {
                    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(_this, prop, function (original) {
                        return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(original, {
                            mechanism: {
                                data: {
                                    function: prop,
                                    handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original),
                                },
                                handled: true,
                                type: 'instrument',
                            },
                        });
                    });
                }
            });
            if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
                (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(xhr, 'onreadystatechange', function (original) {
                    var wrapOptions = {
                        mechanism: {
                            data: {
                                function: 'onreadystatechange',
                                handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original),
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    };
                    // If Instrument integration has been called before TryCatch, get the name of original function
                    if (original.__sentry_original__) {
                        wrapOptions.mechanism.data.handler = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original.__sentry_original__);
                    }
                    // Otherwise wrap directly
                    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(original, wrapOptions);
                });
            }
            return originalSend.apply(this, args);
        };
    };
    /**
     * Wrap timer functions and event targets to catch errors
     * and provide better metadata.
     */
    TryCatch.prototype.setupOnce = function () {
        this._ignoreOnError = this._ignoreOnError;
        var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'setTimeout', this._wrapTimeFunction.bind(this));
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'setInterval', this._wrapTimeFunction.bind(this));
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'requestAnimationFrame', this._wrapRAF.bind(this));
        if ('XMLHttpRequest' in global) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(XMLHttpRequest.prototype, 'send', this._wrapXHR.bind(this));
        }
        [
            'EventTarget',
            'Window',
            'Node',
            'ApplicationCache',
            'AudioTrackList',
            'ChannelMergerNode',
            'CryptoOperation',
            'EventSource',
            'FileReader',
            'HTMLUnknownElement',
            'IDBDatabase',
            'IDBRequest',
            'IDBTransaction',
            'KeyOperation',
            'MediaController',
            'MessagePort',
            'ModalWindow',
            'Notification',
            'SVGElementInstance',
            'Screen',
            'TextTrack',
            'TextTrackCue',
            'TextTrackList',
            'WebSocket',
            'WebSocketWorker',
            'Worker',
            'XMLHttpRequest',
            'XMLHttpRequestEventTarget',
            'XMLHttpRequestUpload',
        ].forEach(this._wrapEventTarget.bind(this));
    };
    /**
     * @inheritDoc
     */
    TryCatch.id = 'TryCatch';
    return TryCatch;
}());

//# sourceMappingURL=trycatch.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/useragent.js":
/*!********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/useragent.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgent": () => (/* binding */ UserAgent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");



var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/** UserAgent */
var UserAgent = /** @class */ (function () {
    function UserAgent() {
        /**
         * @inheritDoc
         */
        this.name = UserAgent.id;
    }
    /**
     * @inheritDoc
     */
    UserAgent.prototype.setupOnce = function () {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addGlobalEventProcessor)(function (event) {
            if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)().getIntegration(UserAgent)) {
                if (!global.navigator || !global.location) {
                    return event;
                }
                // Request Interface: https://docs.sentry.io/development/sdk-dev/event-payloads/request/
                var request = event.request || {};
                request.url = request.url || global.location.href;
                request.headers = request.headers || {};
                request.headers['User-Agent'] = global.navigator.userAgent;
                return tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event, { request: request });
            }
            return event;
        });
    };
    /**
     * @inheritDoc
     */
    UserAgent.id = 'UserAgent';
    return UserAgent;
}());

//# sourceMappingURL=useragent.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/parsers.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/parsers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exceptionFromStacktrace": () => (/* binding */ exceptionFromStacktrace),
/* harmony export */   "eventFromPlainObject": () => (/* binding */ eventFromPlainObject),
/* harmony export */   "eventFromStacktrace": () => (/* binding */ eventFromStacktrace),
/* harmony export */   "prepareFramesForEvent": () => (/* binding */ prepareFramesForEvent)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");


var STACKTRACE_LIMIT = 50;
/**
 * This function creates an exception from an TraceKitStackTrace
 * @param stacktrace TraceKitStackTrace that will be converted to an exception
 * @hidden
 */
function exceptionFromStacktrace(stacktrace) {
    var frames = prepareFramesForEvent(stacktrace.stack);
    var exception = {
        type: stacktrace.name,
        value: stacktrace.message,
    };
    if (frames && frames.length) {
        exception.stacktrace = { frames: frames };
    }
    // tslint:disable-next-line:strict-type-predicates
    if (exception.type === undefined && exception.value === '') {
        exception.value = 'Unrecoverable error caught';
    }
    return exception;
}
/**
 * @hidden
 */
function eventFromPlainObject(exception, syntheticException, rejection) {
    var event = {
        exception: {
            values: [
                {
                    type: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isEvent)(exception) ? exception.constructor.name : rejection ? 'UnhandledRejection' : 'Error',
                    value: "Non-Error " + (rejection ? 'promise rejection' : 'exception') + " captured with keys: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.extractExceptionKeysForMessage)(exception),
                },
            ],
        },
        extra: {
            __serialized__: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalizeToSize)(exception),
        },
    };
    if (syntheticException) {
        var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(syntheticException);
        var frames_1 = prepareFramesForEvent(stacktrace.stack);
        event.stacktrace = {
            frames: frames_1,
        };
    }
    return event;
}
/**
 * @hidden
 */
function eventFromStacktrace(stacktrace) {
    var exception = exceptionFromStacktrace(stacktrace);
    return {
        exception: {
            values: [exception],
        },
    };
}
/**
 * @hidden
 */
function prepareFramesForEvent(stack) {
    if (!stack || !stack.length) {
        return [];
    }
    var localStack = stack;
    var firstFrameFunction = localStack[0].func || '';
    var lastFrameFunction = localStack[localStack.length - 1].func || '';
    // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
    if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
        localStack = localStack.slice(1);
    }
    // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
    if (lastFrameFunction.indexOf('sentryWrapped') !== -1) {
        localStack = localStack.slice(0, -1);
    }
    // The frame where the crash happened, should be the last entry in the array
    return localStack
        .map(function (frame) { return ({
        colno: frame.column === null ? undefined : frame.column,
        filename: frame.url || localStack[0].url,
        function: frame.func || '?',
        in_app: true,
        lineno: frame.line === null ? undefined : frame.line,
    }); })
        .slice(0, STACKTRACE_LIMIT)
        .reverse();
}
//# sourceMappingURL=parsers.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/sdk.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/sdk.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultIntegrations": () => (/* binding */ defaultIntegrations),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "showReportDialog": () => (/* binding */ showReportDialog),
/* harmony export */   "lastEventId": () => (/* binding */ lastEventId),
/* harmony export */   "forceLoad": () => (/* binding */ forceLoad),
/* harmony export */   "onLoad": () => (/* binding */ onLoad),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/sdk.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client */ "./node_modules/@sentry/browser/esm/client.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers */ "./node_modules/@sentry/browser/esm/helpers.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/useragent.js");





var defaultIntegrations = [
    new _sentry_core__WEBPACK_IMPORTED_MODULE_0__.InboundFilters(),
    new _sentry_core__WEBPACK_IMPORTED_MODULE_1__.FunctionToString(),
    new _integrations__WEBPACK_IMPORTED_MODULE_2__.TryCatch(),
    new _integrations__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs(),
    new _integrations__WEBPACK_IMPORTED_MODULE_4__.GlobalHandlers(),
    new _integrations__WEBPACK_IMPORTED_MODULE_5__.LinkedErrors(),
    new _integrations__WEBPACK_IMPORTED_MODULE_6__.UserAgent(),
];
/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 *
 * ```
 *
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { configureScope } from '@sentry/browser';
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 *
 * ```
 *
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BrowserOptions} for documentation on configuration options.
 */
function init(options) {
    if (options === void 0) { options = {}; }
    if (options.defaultIntegrations === undefined) {
        options.defaultIntegrations = defaultIntegrations;
    }
    if (options.release === undefined) {
        var window_1 = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.getGlobalObject)();
        // This supports the variable that sentry-webpack-plugin injects
        if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
            options.release = window_1.SENTRY_RELEASE.id;
        }
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.initAndBind)(_client__WEBPACK_IMPORTED_MODULE_9__.BrowserClient, options);
}
/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
function showReportDialog(options) {
    if (options === void 0) { options = {}; }
    if (!options.eventId) {
        options.eventId = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().lastEventId();
    }
    var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();
    if (client) {
        client.showReportDialog(options);
    }
}
/**
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 */
function lastEventId() {
    return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().lastEventId();
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */
function forceLoad() {
    // Noop
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */
function onLoad(callback) {
    callback();
}
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */
function flush(timeout) {
    var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();
    if (client) {
        return client.flush(timeout);
    }
    return _sentry_utils__WEBPACK_IMPORTED_MODULE_11__.SyncPromise.reject(false);
}
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */
function close(timeout) {
    var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();
    if (client) {
        return client.close(timeout);
    }
    return _sentry_utils__WEBPACK_IMPORTED_MODULE_11__.SyncPromise.reject(false);
}
/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */
function wrap(fn) {
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.wrap)(fn)(); // tslint:disable-line:no-unsafe-any
}
//# sourceMappingURL=sdk.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/tracekit.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/tracekit.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeStackTrace": () => (/* binding */ computeStackTrace)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// tslint:disable:object-literal-sort-keys

// global reference to slice
var UNKNOWN_FUNCTION = '?';
// Chromium based browsers: Chrome, Brave, new Opera, new Edge
var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
// gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.
var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i;
var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
/** JSDoc */
function computeStackTrace(ex) {
    // tslint:disable:no-unsafe-any
    var stack = null;
    var popSize = ex && ex.framesToPop;
    try {
        // This must be tried first because Opera 10 *destroys*
        // its stacktrace property if you try to access the stack
        // property first!!
        stack = computeStackTraceFromStacktraceProp(ex);
        if (stack) {
            return popFrames(stack, popSize);
        }
    }
    catch (e) {
        // no-empty
    }
    try {
        stack = computeStackTraceFromStackProp(ex);
        if (stack) {
            return popFrames(stack, popSize);
        }
    }
    catch (e) {
        // no-empty
    }
    return {
        message: extractMessage(ex),
        name: ex && ex.name,
        stack: [],
        failed: true,
    };
}
/** JSDoc */
// tslint:disable-next-line:cyclomatic-complexity
function computeStackTraceFromStackProp(ex) {
    // tslint:disable:no-conditional-assignment
    if (!ex || !ex.stack) {
        return null;
    }
    var stack = [];
    var lines = ex.stack.split('\n');
    var isEval;
    var submatch;
    var parts;
    var element;
    for (var i = 0; i < lines.length; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
            isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                // throw out eval line/column and use top-most line/column number
                parts[2] = submatch[1]; // url
                parts[3] = submatch[2]; // line
                parts[4] = submatch[3]; // column
            }
            element = {
                url: parts[2],
                func: parts[1] || UNKNOWN_FUNCTION,
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null,
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || UNKNOWN_FUNCTION,
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null,
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                // throw out eval line/column and use top-most line number
                parts[1] = parts[1] || "eval";
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = ''; // no column when eval
            }
            else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
                // FireFox uses this awesome columnNumber property for its top frame
                // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                // so adding 1
                // NOTE: this hack doesn't work if top-most frame is eval
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || UNKNOWN_FUNCTION,
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null,
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = UNKNOWN_FUNCTION;
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return {
        message: extractMessage(ex),
        name: ex.name,
        stack: stack,
    };
}
/** JSDoc */
function computeStackTraceFromStacktraceProp(ex) {
    if (!ex || !ex.stacktrace) {
        return null;
    }
    // Access and store the stacktrace property before doing ANYTHING
    // else to it because Opera is not very good at providing it
    // reliably in other circumstances.
    var stacktrace = ex.stacktrace;
    var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
    var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
    var lines = stacktrace.split('\n');
    var stack = [];
    var parts;
    for (var line = 0; line < lines.length; line += 2) {
        // tslint:disable:no-conditional-assignment
        var element = null;
        if ((parts = opera10Regex.exec(lines[line]))) {
            element = {
                url: parts[2],
                func: parts[3],
                args: [],
                line: +parts[1],
                column: null,
            };
        }
        else if ((parts = opera11Regex.exec(lines[line]))) {
            element = {
                url: parts[6],
                func: parts[3] || parts[4],
                args: parts[5] ? parts[5].split(',') : [],
                line: +parts[1],
                column: +parts[2],
            };
        }
        if (element) {
            if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
            }
            stack.push(element);
        }
    }
    if (!stack.length) {
        return null;
    }
    return {
        message: extractMessage(ex),
        name: ex.name,
        stack: stack,
    };
}
/** Remove N number of frames from the stack */
function popFrames(stacktrace, popSize) {
    try {
        return tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, stacktrace, { stack: stacktrace.stack.slice(popSize) });
    }
    catch (e) {
        return stacktrace;
    }
}
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */
function extractMessage(ex) {
    var message = ex && ex.message;
    if (!message) {
        return 'No error message';
    }
    if (message.error && typeof message.error.message === 'string') {
        return message.error.message;
    }
    return message;
}
//# sourceMappingURL=tracekit.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/base.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransport": () => (/* binding */ BaseTransport)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/promisebuffer.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");


/** Base Transport class implementation */
var BaseTransport = /** @class */ (function () {
    function BaseTransport(options) {
        this.options = options;
        /** A simple buffer holding all requests. */
        this._buffer = new _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.PromiseBuffer(30);
        this.url = new _sentry_core__WEBPACK_IMPORTED_MODULE_1__.API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
    }
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.sendEvent = function (_) {
        throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Transport Class has to implement `sendEvent` method');
    };
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.close = function (timeout) {
        return this._buffer.drain(timeout);
    };
    return BaseTransport;
}());

//# sourceMappingURL=base.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/fetch.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/fetch.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchTransport": () => (/* binding */ FetchTransport)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base */ "./node_modules/@sentry/browser/esm/transports/base.js");




var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/** `fetch` based transport */
var FetchTransport = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(FetchTransport, _super);
    function FetchTransport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Locks transport after receiving 429 response */
        _this._disabledUntil = new Date(Date.now());
        return _this;
    }
    /**
     * @inheritDoc
     */
    FetchTransport.prototype.sendEvent = function (event) {
        var _this = this;
        if (new Date(Date.now()) < this._disabledUntil) {
            return Promise.reject({
                event: event,
                reason: "Transport locked till " + this._disabledUntil + " due to too many requests.",
                status: 429,
            });
        }
        var defaultOptions = {
            body: JSON.stringify(event),
            method: 'POST',
            // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
            // https://caniuse.com/#feat=referrer-policy
            // It doesn't. And it throw exception instead of ignoring this parameter...
            // REF: https://github.com/getsentry/raven-js/issues/1233
            referrerPolicy: ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.supportsReferrerPolicy)() ? 'origin' : ''),
        };
        if (this.options.headers !== undefined) {
            defaultOptions.headers = this.options.headers;
        }
        return this._buffer.add(new _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.SyncPromise(function (resolve, reject) {
            global
                .fetch(_this.url, defaultOptions)
                .then(function (response) {
                var status = _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.fromHttpCode(response.status);
                if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.Success) {
                    resolve({ status: status });
                    return;
                }
                if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.RateLimit) {
                    var now = Date.now();
                    _this._disabledUntil = new Date(now + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.parseRetryAfterHeader)(now, response.headers.get('Retry-After')));
                    _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.logger.warn("Too many requests, backing off till: " + _this._disabledUntil);
                }
                reject(response);
            })
                .catch(reject);
        }));
    };
    return FetchTransport;
}(_base__WEBPACK_IMPORTED_MODULE_6__.BaseTransport));

//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransport": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_0__.BaseTransport),
/* harmony export */   "FetchTransport": () => (/* reexport safe */ _fetch__WEBPACK_IMPORTED_MODULE_1__.FetchTransport),
/* harmony export */   "XHRTransport": () => (/* reexport safe */ _xhr__WEBPACK_IMPORTED_MODULE_2__.XHRTransport)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./node_modules/@sentry/browser/esm/transports/base.js");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch */ "./node_modules/@sentry/browser/esm/transports/fetch.js");
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./xhr */ "./node_modules/@sentry/browser/esm/transports/xhr.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/xhr.js":
/*!************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/xhr.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XHRTransport": () => (/* binding */ XHRTransport)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./node_modules/@sentry/browser/esm/transports/base.js");




/** `XHR` based transport */
var XHRTransport = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(XHRTransport, _super);
    function XHRTransport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Locks transport after receiving 429 response */
        _this._disabledUntil = new Date(Date.now());
        return _this;
    }
    /**
     * @inheritDoc
     */
    XHRTransport.prototype.sendEvent = function (event) {
        var _this = this;
        if (new Date(Date.now()) < this._disabledUntil) {
            return Promise.reject({
                event: event,
                reason: "Transport locked till " + this._disabledUntil + " due to too many requests.",
                status: 429,
            });
        }
        return this._buffer.add(new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.SyncPromise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState !== 4) {
                    return;
                }
                var status = _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.fromHttpCode(request.status);
                if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.Success) {
                    resolve({ status: status });
                    return;
                }
                if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.RateLimit) {
                    var now = Date.now();
                    _this._disabledUntil = new Date(now + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.parseRetryAfterHeader)(now, request.getResponseHeader('Retry-After')));
                    _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.warn("Too many requests, backing off till: " + _this._disabledUntil);
                }
                reject(request);
            };
            request.open('POST', _this.url);
            for (var header in _this.options.headers) {
                if (_this.options.headers.hasOwnProperty(header)) {
                    request.setRequestHeader(header, _this.options.headers[header]);
                }
            }
            request.send(JSON.stringify(event));
        }));
    };
    return XHRTransport;
}(_base__WEBPACK_IMPORTED_MODULE_5__.BaseTransport));

//# sourceMappingURL=xhr.js.map

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/version.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/version.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SDK_NAME": () => (/* binding */ SDK_NAME),
/* harmony export */   "SDK_VERSION": () => (/* binding */ SDK_VERSION)
/* harmony export */ });
var SDK_NAME = 'sentry.javascript.browser';
var SDK_VERSION = '5.11.1';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/api.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/api.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API": () => (/* binding */ API)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");

var SENTRY_API_VERSION = '7';
/** Helper class to provide urls to different Sentry endpoints. */
var API = /** @class */ (function () {
    /** Create a new instance of API */
    function API(dsn) {
        this.dsn = dsn;
        this._dsnObject = new _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.Dsn(dsn);
    }
    /** Returns the Dsn object. */
    API.prototype.getDsn = function () {
        return this._dsnObject;
    };
    /** Returns a string with auth headers in the url to the store endpoint. */
    API.prototype.getStoreEndpoint = function () {
        return "" + this._getBaseUrl() + this.getStoreEndpointPath();
    };
    /** Returns the store endpoint with auth added in url encoded. */
    API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
        var dsn = this._dsnObject;
        var auth = {
            sentry_key: dsn.user,
            sentry_version: SENTRY_API_VERSION,
        };
        // Auth is intentionally sent as part of query string (NOT as custom HTTP header)
        // to avoid preflight CORS requests
        return this.getStoreEndpoint() + "?" + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.urlEncode)(auth);
    };
    /** Returns the base path of the url including the port. */
    API.prototype._getBaseUrl = function () {
        var dsn = this._dsnObject;
        var protocol = dsn.protocol ? dsn.protocol + ":" : '';
        var port = dsn.port ? ":" + dsn.port : '';
        return protocol + "//" + dsn.host + port;
    };
    /** Returns only the path component for the store endpoint. */
    API.prototype.getStoreEndpointPath = function () {
        var dsn = this._dsnObject;
        return (dsn.path ? "/" + dsn.path : '') + "/api/" + dsn.projectId + "/store/";
    };
    /** Returns an object that can be used in request headers. */
    API.prototype.getRequestHeaders = function (clientName, clientVersion) {
        var dsn = this._dsnObject;
        var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
        header.push("sentry_timestamp=" + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.timestampWithMs)()); // TODO: This can be removed
        header.push("sentry_client=" + clientName + "/" + clientVersion);
        header.push("sentry_key=" + dsn.user);
        if (dsn.pass) {
            header.push("sentry_secret=" + dsn.pass);
        }
        return {
            'Content-Type': 'application/json',
            'X-Sentry-Auth': header.join(', '),
        };
    };
    /** Returns the url to the report dialog endpoint. */
    API.prototype.getReportDialogEndpoint = function (dialogOptions) {
        if (dialogOptions === void 0) { dialogOptions = {}; }
        var dsn = this._dsnObject;
        var endpoint = "" + this._getBaseUrl() + (dsn.path ? "/" + dsn.path : '') + "/api/embed/error-page/";
        var encodedOptions = [];
        encodedOptions.push("dsn=" + dsn.toString());
        for (var key in dialogOptions) {
            if (key === 'user') {
                if (!dialogOptions.user) {
                    continue;
                }
                if (dialogOptions.user.name) {
                    encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
                }
                if (dialogOptions.user.email) {
                    encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
                }
            }
            else {
                encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
            }
        }
        if (encodedOptions.length) {
            return endpoint + "?" + encodedOptions.join('&');
        }
        return endpoint;
    };
    return API;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/basebackend.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/core/esm/basebackend.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseBackend": () => (/* binding */ BaseBackend)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _transports_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transports/noop */ "./node_modules/@sentry/core/esm/transports/noop.js");


/**
 * This is the base implemention of a Backend.
 * @hidden
 */
var BaseBackend = /** @class */ (function () {
    /** Creates a new backend instance. */
    function BaseBackend(options) {
        this._options = options;
        if (!this._options.dsn) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn('No DSN provided, backend will not do anything.');
        }
        this._transport = this._setupTransport();
    }
    /**
     * Sets up the transport so it can be used later to send requests.
     */
    BaseBackend.prototype._setupTransport = function () {
        return new _transports_noop__WEBPACK_IMPORTED_MODULE_1__.NoopTransport();
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.eventFromException = function (_exception, _hint) {
        throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Backend has to implement `eventFromException` method');
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
        throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Backend has to implement `eventFromMessage` method');
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.sendEvent = function (event) {
        this._transport.sendEvent(event).then(null, function (reason) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.error("Error while sending event: " + reason);
        });
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.getTransport = function () {
        return this._transport;
    };
    return BaseBackend;
}());

//# sourceMappingURL=basebackend.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/baseclient.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/core/esm/baseclient.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseClient": () => (/* binding */ BaseClient)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integration */ "./node_modules/@sentry/core/esm/integration.js");



/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link BaseClient.prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
var BaseClient = /** @class */ (function () {
    /**
     * Initializes this client instance.
     *
     * @param backendClass A constructor function to create the backend.
     * @param options Options for the client.
     */
    function BaseClient(backendClass, options) {
        /** Array of used integrations. */
        this._integrations = {};
        /** Is the client still processing a call? */
        this._processing = false;
        this._backend = new backendClass(options);
        this._options = options;
        if (options.dsn) {
            this._dsn = new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.Dsn(options.dsn);
        }
        if (this._isEnabled()) {
            this._integrations = (0,_integration__WEBPACK_IMPORTED_MODULE_2__.setupIntegrations)(this._options);
        }
    }
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureException = function (exception, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        this._processing = true;
        this._getBackend()
            .eventFromException(exception, hint)
            .then(function (event) { return _this._processEvent(event, hint, scope); })
            .then(function (finalEvent) {
            // We need to check for finalEvent in case beforeSend returned null
            eventId = finalEvent && finalEvent.event_id;
            _this._processing = false;
        })
            .then(null, function (reason) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
            _this._processing = false;
        });
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        this._processing = true;
        var promisedEvent = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isPrimitive)(message)
            ? this._getBackend().eventFromMessage("" + message, level, hint)
            : this._getBackend().eventFromException(message, hint);
        promisedEvent
            .then(function (event) { return _this._processEvent(event, hint, scope); })
            .then(function (finalEvent) {
            // We need to check for finalEvent in case beforeSend returned null
            eventId = finalEvent && finalEvent.event_id;
            _this._processing = false;
        })
            .then(null, function (reason) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
            _this._processing = false;
        });
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureEvent = function (event, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        this._processing = true;
        this._processEvent(event, hint, scope)
            .then(function (finalEvent) {
            // We need to check for finalEvent in case beforeSend returned null
            eventId = finalEvent && finalEvent.event_id;
            _this._processing = false;
        })
            .then(null, function (reason) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
            _this._processing = false;
        });
        return eventId;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getDsn = function () {
        return this._dsn;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getOptions = function () {
        return this._options;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.flush = function (timeout) {
        var _this = this;
        return this._isClientProcessing(timeout).then(function (status) {
            clearInterval(status.interval);
            return _this._getBackend()
                .getTransport()
                .close(timeout)
                .then(function (transportFlushed) { return status.ready && transportFlushed; });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.close = function (timeout) {
        var _this = this;
        return this.flush(timeout).then(function (result) {
            _this.getOptions().enabled = false;
            return result;
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getIntegrations = function () {
        return this._integrations || {};
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getIntegration = function (integration) {
        try {
            return this._integrations[integration.id] || null;
        }
        catch (_oO) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
            return null;
        }
    };
    /** Waits for the client to be done with processing. */
    BaseClient.prototype._isClientProcessing = function (timeout) {
        var _this = this;
        return new _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise(function (resolve) {
            var ticked = 0;
            var tick = 1;
            var interval = 0;
            clearInterval(interval);
            interval = setInterval(function () {
                if (!_this._processing) {
                    resolve({
                        interval: interval,
                        ready: true,
                    });
                }
                else {
                    ticked += tick;
                    if (timeout && ticked >= timeout) {
                        resolve({
                            interval: interval,
                            ready: false,
                        });
                    }
                }
            }, tick);
        });
    };
    /** Returns the current backend. */
    BaseClient.prototype._getBackend = function () {
        return this._backend;
    };
    /** Determines whether this SDK is enabled and a valid Dsn is present. */
    BaseClient.prototype._isEnabled = function () {
        return this.getOptions().enabled !== false && this._dsn !== undefined;
    };
    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`,
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param hint May contain additional informartion about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    BaseClient.prototype._prepareEvent = function (event, scope, hint) {
        var _a = this.getOptions(), environment = _a.environment, release = _a.release, dist = _a.dist, _b = _a.maxValueLength, maxValueLength = _b === void 0 ? 250 : _b;
        var prepared = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event);
        if (prepared.environment === undefined && environment !== undefined) {
            prepared.environment = environment;
        }
        if (prepared.release === undefined && release !== undefined) {
            prepared.release = release;
        }
        if (prepared.dist === undefined && dist !== undefined) {
            prepared.dist = dist;
        }
        if (prepared.message) {
            prepared.message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(prepared.message, maxValueLength);
        }
        var exception = prepared.exception && prepared.exception.values && prepared.exception.values[0];
        if (exception && exception.value) {
            exception.value = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(exception.value, maxValueLength);
        }
        var request = prepared.request;
        if (request && request.url) {
            request.url = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(request.url, maxValueLength);
        }
        if (prepared.event_id === undefined) {
            prepared.event_id = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.uuid4)();
        }
        this._addIntegrations(prepared.sdk);
        // We prepare the result here with a resolved Event.
        var result = _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.resolve(prepared);
        // This should be the last thing called, since we want that
        // {@link Hub.addEventProcessor} gets the finished prepared event.
        if (scope) {
            // In case we have a hub we reassign it.
            result = scope.applyToEvent(prepared, hint);
        }
        return result;
    };
    /**
     * This function adds all used integrations to the SDK info in the event.
     * @param sdkInfo The sdkInfo of the event that will be filled with all integrations.
     */
    BaseClient.prototype._addIntegrations = function (sdkInfo) {
        var integrationsArray = Object.keys(this._integrations);
        if (sdkInfo && integrationsArray.length > 0) {
            sdkInfo.integrations = integrationsArray;
        }
    };
    /**
     * Processes an event (either error or message) and sends it to Sentry.
     *
     * This also adds breadcrumbs and context information to the event. However,
     * platform specific meta data (such as the User's IP address) must be added
     * by the SDK implementor.
     *
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional informartion about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
     */
    BaseClient.prototype._processEvent = function (event, hint, scope) {
        var _this = this;
        var _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
        if (!this._isEnabled()) {
            return _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.reject('SDK not enabled, will not send event.');
        }
        // 1.0 === 100% events are sent
        // 0.0 === 0% events are sent
        if (typeof sampleRate === 'number' && Math.random() > sampleRate) {
            return _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.reject('This event has been sampled, will not send event.');
        }
        return new _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise(function (resolve, reject) {
            _this._prepareEvent(event, scope, hint)
                .then(function (prepared) {
                if (prepared === null) {
                    reject('An event processor returned null, will not send event.');
                    return;
                }
                var finalEvent = prepared;
                try {
                    var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
                    if (isInternalException || !beforeSend) {
                        _this._getBackend().sendEvent(finalEvent);
                        resolve(finalEvent);
                        return;
                    }
                    var beforeSendResult = beforeSend(prepared, hint);
                    // tslint:disable-next-line:strict-type-predicates
                    if (typeof beforeSendResult === 'undefined') {
                        _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error('`beforeSend` method has to return `null` or a valid event.');
                    }
                    else if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isThenable)(beforeSendResult)) {
                        _this._handleAsyncBeforeSend(beforeSendResult, resolve, reject);
                    }
                    else {
                        finalEvent = beforeSendResult;
                        if (finalEvent === null) {
                            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.log('`beforeSend` returned `null`, will not send event.');
                            resolve(null);
                            return;
                        }
                        // From here on we are really async
                        _this._getBackend().sendEvent(finalEvent);
                        resolve(finalEvent);
                    }
                }
                catch (exception) {
                    _this.captureException(exception, {
                        data: {
                            __sentry__: true,
                        },
                        originalException: exception,
                    });
                    reject('`beforeSend` threw an error, will not send event.');
                }
            })
                .then(null, function () {
                reject('`beforeSend` threw an error, will not send event.');
            });
        });
    };
    /**
     * Resolves before send Promise and calls resolve/reject on parent SyncPromise.
     */
    BaseClient.prototype._handleAsyncBeforeSend = function (beforeSend, resolve, reject) {
        var _this = this;
        beforeSend
            .then(function (processedEvent) {
            if (processedEvent === null) {
                reject('`beforeSend` returned `null`, will not send event.');
                return;
            }
            // From here on we are really async
            _this._getBackend().sendEvent(processedEvent);
            resolve(processedEvent);
        })
            .then(null, function (e) {
            reject("beforeSend rejected with " + e);
        });
    };
    return BaseClient;
}());

//# sourceMappingURL=baseclient.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/integration.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integration.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "installedIntegrations": () => (/* binding */ installedIntegrations),
/* harmony export */   "getIntegrationsToSetup": () => (/* binding */ getIntegrationsToSetup),
/* harmony export */   "setupIntegration": () => (/* binding */ setupIntegration),
/* harmony export */   "setupIntegrations": () => (/* binding */ setupIntegrations)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");



var installedIntegrations = [];
/** Gets integration to install */
function getIntegrationsToSetup(options) {
    var defaultIntegrations = (options.defaultIntegrations && tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(options.defaultIntegrations)) || [];
    var userIntegrations = options.integrations;
    var integrations = [];
    if (Array.isArray(userIntegrations)) {
        var userIntegrationsNames_1 = userIntegrations.map(function (i) { return i.name; });
        var pickedIntegrationsNames_1 = [];
        // Leave only unique default integrations, that were not overridden with provided user integrations
        defaultIntegrations.forEach(function (defaultIntegration) {
            if (userIntegrationsNames_1.indexOf(defaultIntegration.name) === -1 &&
                pickedIntegrationsNames_1.indexOf(defaultIntegration.name) === -1) {
                integrations.push(defaultIntegration);
                pickedIntegrationsNames_1.push(defaultIntegration.name);
            }
        });
        // Don't add same user integration twice
        userIntegrations.forEach(function (userIntegration) {
            if (pickedIntegrationsNames_1.indexOf(userIntegration.name) === -1) {
                integrations.push(userIntegration);
                pickedIntegrationsNames_1.push(userIntegration.name);
            }
        });
    }
    else if (typeof userIntegrations === 'function') {
        integrations = userIntegrations(defaultIntegrations);
        integrations = Array.isArray(integrations) ? integrations : [integrations];
    }
    else {
        integrations = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(defaultIntegrations);
    }
    // Make sure that if present, `Debug` integration will always run last
    var integrationsNames = integrations.map(function (i) { return i.name; });
    var alwaysLastToRun = 'Debug';
    if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
        integrations.push.apply(integrations, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
    }
    return integrations;
}
/** Setup given integration */
function setupIntegration(integration) {
    if (installedIntegrations.indexOf(integration.name) !== -1) {
        return;
    }
    integration.setupOnce(_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor, _sentry_hub__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub);
    installedIntegrations.push(integration.name);
    _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.log("Integration installed: " + integration.name);
}
/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
function setupIntegrations(options) {
    var integrations = {};
    getIntegrationsToSetup(options).forEach(function (integration) {
        integrations[integration.name] = integration;
        setupIntegration(integration);
    });
    return integrations;
}
//# sourceMappingURL=integration.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/functiontostring.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/functiontostring.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionToString": () => (/* binding */ FunctionToString)
/* harmony export */ });
var originalFunctionToString;
/** Patch toString calls to return proper name for wrapped functions */
var FunctionToString = /** @class */ (function () {
    function FunctionToString() {
        /**
         * @inheritDoc
         */
        this.name = FunctionToString.id;
    }
    /**
     * @inheritDoc
     */
    FunctionToString.prototype.setupOnce = function () {
        originalFunctionToString = Function.prototype.toString;
        Function.prototype.toString = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var context = this.__sentry_original__ || this;
            // tslint:disable-next-line:no-unsafe-any
            return originalFunctionToString.apply(context, args);
        };
    };
    /**
     * @inheritDoc
     */
    FunctionToString.id = 'FunctionToString';
    return FunctionToString;
}());

//# sourceMappingURL=functiontostring.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/inboundfilters.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InboundFilters": () => (/* binding */ InboundFilters)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");



// "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.
var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
/** Inbound filters configurable by the user */
var InboundFilters = /** @class */ (function () {
    function InboundFilters(_options) {
        if (_options === void 0) { _options = {}; }
        this._options = _options;
        /**
         * @inheritDoc
         */
        this.name = InboundFilters.id;
    }
    /**
     * @inheritDoc
     */
    InboundFilters.prototype.setupOnce = function () {
        (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor)(function (event) {
            var hub = (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)();
            if (!hub) {
                return event;
            }
            var self = hub.getIntegration(InboundFilters);
            if (self) {
                var client = hub.getClient();
                var clientOptions = client ? client.getOptions() : {};
                var options = self._mergeOptions(clientOptions);
                if (self._shouldDropEvent(event, options)) {
                    return null;
                }
            }
            return event;
        });
    };
    /** JSDoc */
    InboundFilters.prototype._shouldDropEvent = function (event, options) {
        if (this._isSentryError(event, options)) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
            return true;
        }
        if (this._isIgnoredError(event, options)) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
            return true;
        }
        if (this._isBlacklistedUrl(event, options)) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event) + ".\nUrl: " + this._getEventFilterUrl(event));
            return true;
        }
        if (!this._isWhitelistedUrl(event, options)) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event) + ".\nUrl: " + this._getEventFilterUrl(event));
            return true;
        }
        return false;
    };
    /** JSDoc */
    InboundFilters.prototype._isSentryError = function (event, options) {
        if (options === void 0) { options = {}; }
        if (!options.ignoreInternal) {
            return false;
        }
        try {
            return ((event &&
                event.exception &&
                event.exception.values &&
                event.exception.values[0] &&
                event.exception.values[0].type === 'SentryError') ||
                false);
        }
        catch (_oO) {
            return false;
        }
    };
    /** JSDoc */
    InboundFilters.prototype._isIgnoredError = function (event, options) {
        if (options === void 0) { options = {}; }
        if (!options.ignoreErrors || !options.ignoreErrors.length) {
            return false;
        }
        return this._getPossibleEventMessages(event).some(function (message) {
            // Not sure why TypeScript complains here...
            return options.ignoreErrors.some(function (pattern) { return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(message, pattern); });
        });
    };
    /** JSDoc */
    InboundFilters.prototype._isBlacklistedUrl = function (event, options) {
        if (options === void 0) { options = {}; }
        // TODO: Use Glob instead?
        if (!options.blacklistUrls || !options.blacklistUrls.length) {
            return false;
        }
        var url = this._getEventFilterUrl(event);
        return !url ? false : options.blacklistUrls.some(function (pattern) { return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(url, pattern); });
    };
    /** JSDoc */
    InboundFilters.prototype._isWhitelistedUrl = function (event, options) {
        if (options === void 0) { options = {}; }
        // TODO: Use Glob instead?
        if (!options.whitelistUrls || !options.whitelistUrls.length) {
            return true;
        }
        var url = this._getEventFilterUrl(event);
        return !url ? true : options.whitelistUrls.some(function (pattern) { return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(url, pattern); });
    };
    /** JSDoc */
    InboundFilters.prototype._mergeOptions = function (clientOptions) {
        if (clientOptions === void 0) { clientOptions = {}; }
        return {
            blacklistUrls: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread((this._options.blacklistUrls || []), (clientOptions.blacklistUrls || [])),
            ignoreErrors: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread((this._options.ignoreErrors || []), (clientOptions.ignoreErrors || []), DEFAULT_IGNORE_ERRORS),
            ignoreInternal: typeof this._options.ignoreInternal !== 'undefined' ? this._options.ignoreInternal : true,
            whitelistUrls: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread((this._options.whitelistUrls || []), (clientOptions.whitelistUrls || [])),
        };
    };
    /** JSDoc */
    InboundFilters.prototype._getPossibleEventMessages = function (event) {
        if (event.message) {
            return [event.message];
        }
        if (event.exception) {
            try {
                var _a = (event.exception.values && event.exception.values[0]) || {}, _b = _a.type, type = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? '' : _c;
                return ["" + value, type + ": " + value];
            }
            catch (oO) {
                _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error("Cannot extract message for event " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
                return [];
            }
        }
        return [];
    };
    /** JSDoc */
    InboundFilters.prototype._getEventFilterUrl = function (event) {
        try {
            if (event.stacktrace) {
                var frames_1 = event.stacktrace.frames;
                return (frames_1 && frames_1[frames_1.length - 1].filename) || null;
            }
            if (event.exception) {
                var frames_2 = event.exception.values && event.exception.values[0].stacktrace && event.exception.values[0].stacktrace.frames;
                return (frames_2 && frames_2[frames_2.length - 1].filename) || null;
            }
            return null;
        }
        catch (oO) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error("Cannot extract url for event " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
            return null;
        }
    };
    /**
     * @inheritDoc
     */
    InboundFilters.id = 'InboundFilters';
    return InboundFilters;
}());

//# sourceMappingURL=inboundfilters.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionToString": () => (/* reexport safe */ _functiontostring__WEBPACK_IMPORTED_MODULE_0__.FunctionToString),
/* harmony export */   "InboundFilters": () => (/* reexport safe */ _inboundfilters__WEBPACK_IMPORTED_MODULE_1__.InboundFilters)
/* harmony export */ });
/* harmony import */ var _functiontostring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functiontostring */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _inboundfilters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inboundfilters */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/sdk.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/sdk.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initAndBind": () => (/* binding */ initAndBind)
/* harmony export */ });
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");


/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param clientClass The client class to instanciate.
 * @param options Options to pass to the client.
 */
function initAndBind(clientClass, options) {
    if (options.debug === true) {
        _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.enable();
    }
    (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)().bindClient(new clientClass(options));
}
//# sourceMappingURL=sdk.js.map

/***/ }),

/***/ "./node_modules/@sentry/core/esm/transports/noop.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/core/esm/transports/noop.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoopTransport": () => (/* binding */ NoopTransport)
/* harmony export */ });
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");


/** Noop transport */
var NoopTransport = /** @class */ (function () {
    function NoopTransport() {
    }
    /**
     * @inheritDoc
     */
    NoopTransport.prototype.sendEvent = function (_) {
        return _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.resolve({
            reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: _sentry_types__WEBPACK_IMPORTED_MODULE_1__.Status.Skipped,
        });
    };
    /**
     * @inheritDoc
     */
    NoopTransport.prototype.close = function (_) {
        return _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.resolve(true);
    };
    return NoopTransport;
}());

//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/@sentry/hub/esm/hub.js":
/*!*********************************************!*\
  !*** ./node_modules/@sentry/hub/esm/hub.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_VERSION": () => (/* binding */ API_VERSION),
/* harmony export */   "Hub": () => (/* binding */ Hub),
/* harmony export */   "getMainCarrier": () => (/* binding */ getMainCarrier),
/* harmony export */   "makeMain": () => (/* binding */ makeMain),
/* harmony export */   "getCurrentHub": () => (/* binding */ getCurrentHub),
/* harmony export */   "getHubFromCarrier": () => (/* binding */ getHubFromCarrier),
/* harmony export */   "setHubOnCarrier": () => (/* binding */ setHubOnCarrier)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scope */ "./node_modules/@sentry/hub/esm/scope.js");
/* module decorator */ module = __webpack_require__.hmd(module);



/**
 * API compatibility version of this hub.
 *
 * WARNING: This number should only be incresed when the global interface
 * changes a and new methods are introduced.
 *
 * @hidden
 */
var API_VERSION = 3;
/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */
var DEFAULT_BREADCRUMBS = 100;
/**
 * Absolute maximum number of breadcrumbs added to an event. The
 * `maxBreadcrumbs` option cannot be higher than this value.
 */
var MAX_BREADCRUMBS = 100;
/**
 * @inheritDoc
 */
var Hub = /** @class */ (function () {
    /**
     * Creates a new instance of the hub, will push one {@link Layer} into the
     * internal stack on creation.
     *
     * @param client bound to the hub.
     * @param scope bound to the hub.
     * @param version number, higher number means higher priority.
     */
    function Hub(client, scope, _version) {
        if (scope === void 0) { scope = new _scope__WEBPACK_IMPORTED_MODULE_1__.Scope(); }
        if (_version === void 0) { _version = API_VERSION; }
        this._version = _version;
        /** Is a {@link Layer}[] containing the client and scope */
        this._stack = [];
        this._stack.push({ client: client, scope: scope });
    }
    /**
     * Internal helper function to call a method on the top client if it exists.
     *
     * @param method The method to call on the client.
     * @param args Arguments to pass to the client function.
     */
    Hub.prototype._invokeClient = function (method) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var top = this.getStackTop();
        if (top && top.client && top.client[method]) {
            (_a = top.client)[method].apply(_a, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args, [top.scope]));
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.isOlderThan = function (version) {
        return this._version < version;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.bindClient = function (client) {
        var top = this.getStackTop();
        top.client = client;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.pushScope = function () {
        // We want to clone the content of prev scope
        var stack = this.getStack();
        var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
        var scope = _scope__WEBPACK_IMPORTED_MODULE_1__.Scope.clone(parentScope);
        this.getStack().push({
            client: this.getClient(),
            scope: scope,
        });
        return scope;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.popScope = function () {
        return this.getStack().pop() !== undefined;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.withScope = function (callback) {
        var scope = this.pushScope();
        try {
            callback(scope);
        }
        finally {
            this.popScope();
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.getClient = function () {
        return this.getStackTop().client;
    };
    /** Returns the scope of the top stack. */
    Hub.prototype.getScope = function () {
        return this.getStackTop().scope;
    };
    /** Returns the scope stack for domains or the process. */
    Hub.prototype.getStack = function () {
        return this._stack;
    };
    /** Returns the topmost scope layer in the order domain > local > process. */
    Hub.prototype.getStackTop = function () {
        return this._stack[this._stack.length - 1];
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureException = function (exception, hint) {
        var eventId = (this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)());
        var finalHint = hint;
        // If there's no explicit hint provided, mimick the same thing that would happen
        // in the minimal itself to create a consistent behavior.
        // We don't do this in the client, as it's the lowest level API, and doing this,
        // would prevent user from having full control over direct calls.
        if (!hint) {
            var syntheticException = void 0;
            try {
                throw new Error('Sentry syntheticException');
            }
            catch (exception) {
                syntheticException = exception;
            }
            finalHint = {
                originalException: exception,
                syntheticException: syntheticException,
            };
        }
        this._invokeClient('captureException', exception, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, finalHint, { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureMessage = function (message, level, hint) {
        var eventId = (this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)());
        var finalHint = hint;
        // If there's no explicit hint provided, mimick the same thing that would happen
        // in the minimal itself to create a consistent behavior.
        // We don't do this in the client, as it's the lowest level API, and doing this,
        // would prevent user from having full control over direct calls.
        if (!hint) {
            var syntheticException = void 0;
            try {
                throw new Error(message);
            }
            catch (exception) {
                syntheticException = exception;
            }
            finalHint = {
                originalException: message,
                syntheticException: syntheticException,
            };
        }
        this._invokeClient('captureMessage', message, level, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, finalHint, { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.captureEvent = function (event, hint) {
        var eventId = (this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)());
        this._invokeClient('captureEvent', event, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, hint, { event_id: eventId }));
        return eventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.lastEventId = function () {
        return this._lastEventId;
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
        var top = this.getStackTop();
        if (!top.scope || !top.client) {
            return;
        }
        var _a = (top.client.getOptions && top.client.getOptions()) || {}, _b = _a.beforeBreadcrumb, beforeBreadcrumb = _b === void 0 ? null : _b, _c = _a.maxBreadcrumbs, maxBreadcrumbs = _c === void 0 ? DEFAULT_BREADCRUMBS : _c;
        if (maxBreadcrumbs <= 0) {
            return;
        }
        var timestamp = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.timestampWithMs)();
        var mergedBreadcrumb = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({ timestamp: timestamp }, breadcrumb);
        var finalBreadcrumb = beforeBreadcrumb
            ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.consoleSandbox)(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })
            : mergedBreadcrumb;
        if (finalBreadcrumb === null) {
            return;
        }
        top.scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setUser = function (user) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setUser(user);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setTags = function (tags) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setTags(tags);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setExtras = function (extras) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setExtras(extras);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setTag = function (key, value) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setTag(key, value);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setExtra = function (key, extra) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setExtra(key, extra);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.setContext = function (name, context) {
        var top = this.getStackTop();
        if (!top.scope) {
            return;
        }
        top.scope.setContext(name, context);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.configureScope = function (callback) {
        var top = this.getStackTop();
        if (top.scope && top.client) {
            callback(top.scope);
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.run = function (callback) {
        var oldHub = makeMain(this);
        try {
            callback(this);
        }
        finally {
            makeMain(oldHub);
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.getIntegration = function (integration) {
        var client = this.getClient();
        if (!client) {
            return null;
        }
        try {
            return client.getIntegration(integration);
        }
        catch (_oO) {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
            return null;
        }
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.startSpan = function (spanOrSpanContext, forceNoChild) {
        if (forceNoChild === void 0) { forceNoChild = false; }
        return this._callExtensionMethod('startSpan', spanOrSpanContext, forceNoChild);
    };
    /**
     * @inheritDoc
     */
    Hub.prototype.traceHeaders = function () {
        return this._callExtensionMethod('traceHeaders');
    };
    /**
     * Calls global extension method and binding current instance to the function call
     */
    // @ts-ignore
    Hub.prototype._callExtensionMethod = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var carrier = getMainCarrier();
        var sentry = carrier.__SENTRY__;
        // tslint:disable-next-line: strict-type-predicates
        if (sentry && sentry.extensions && typeof sentry.extensions[method] === 'function') {
            return sentry.extensions[method].apply(this, args);
        }
        _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
    };
    return Hub;
}());

/** Returns the global shim registry. */
function getMainCarrier() {
    var carrier = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getGlobalObject)();
    carrier.__SENTRY__ = carrier.__SENTRY__ || {
        extensions: {},
        hub: undefined,
    };
    return carrier;
}
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */
function makeMain(hub) {
    var registry = getMainCarrier();
    var oldHub = getHubFromCarrier(registry);
    setHubOnCarrier(registry, hub);
    return oldHub;
}
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */
function getCurrentHub() {
    // Get main carrier (global for every environment)
    var registry = getMainCarrier();
    // If there's no hub, or its an old API, assign a new one
    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
        setHubOnCarrier(registry, new Hub());
    }
    // Prefer domains over global if they are there (applicable only to Node environment)
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isNodeEnv)()) {
        return getHubFromActiveDomain(registry);
    }
    // Return hub that lives on a global object
    return getHubFromCarrier(registry);
}
/**
 * Try to read the hub from an active domain, fallback to the registry if one doesnt exist
 * @returns discovered hub
 */
function getHubFromActiveDomain(registry) {
    try {
        // We need to use `dynamicRequire` because `require` on it's own will be optimized by webpack.
        // We do not want this to happen, we need to try to `require` the domain node module and fail if we are in browser
        // for example so we do not have to shim it and use `getCurrentHub` universally.
        var domain = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.dynamicRequire)(module, 'domain');
        var activeDomain = domain.active;
        // If there no active domain, just return global hub
        if (!activeDomain) {
            return getHubFromCarrier(registry);
        }
        // If there's no hub on current domain, or its an old API, assign a new one
        if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
            var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
            setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, _scope__WEBPACK_IMPORTED_MODULE_1__.Scope.clone(registryHubTopStack.scope)));
        }
        // Return hub that lives on a domain
        return getHubFromCarrier(activeDomain);
    }
    catch (_Oo) {
        // Return hub that lives on a global object
        return getHubFromCarrier(registry);
    }
}
/**
 * This will tell whether a carrier has a hub on it or not
 * @param carrier object
 */
function hasHubOnCarrier(carrier) {
    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
        return true;
    }
    return false;
}
/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 * @hidden
 */
function getHubFromCarrier(carrier) {
    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
        return carrier.__SENTRY__.hub;
    }
    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    carrier.__SENTRY__.hub = new Hub();
    return carrier.__SENTRY__.hub;
}
/**
 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
 * @param carrier object
 * @param hub Hub
 */
function setHubOnCarrier(carrier, hub) {
    if (!carrier) {
        return false;
    }
    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    carrier.__SENTRY__.hub = hub;
    return true;
}
//# sourceMappingURL=hub.js.map

/***/ }),

/***/ "./node_modules/@sentry/hub/esm/scope.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/hub/esm/scope.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scope": () => (/* binding */ Scope),
/* harmony export */   "addGlobalEventProcessor": () => (/* binding */ addGlobalEventProcessor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");


/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
var Scope = /** @class */ (function () {
    function Scope() {
        /** Flag if notifiying is happening. */
        this._notifyingListeners = false;
        /** Callback for client to receive scope changes. */
        this._scopeListeners = [];
        /** Callback list that will be called after {@link applyToEvent}. */
        this._eventProcessors = [];
        /** Array of breadcrumbs. */
        this._breadcrumbs = [];
        /** User */
        this._user = {};
        /** Tags */
        this._tags = {};
        /** Extra */
        this._extra = {};
        /** Contexts */
        this._context = {};
    }
    /**
     * Add internal on change listener. Used for sub SDKs that need to store the scope.
     * @hidden
     */
    Scope.prototype.addScopeListener = function (callback) {
        this._scopeListeners.push(callback);
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.addEventProcessor = function (callback) {
        this._eventProcessors.push(callback);
        return this;
    };
    /**
     * This will be called on every set call.
     */
    Scope.prototype._notifyScopeListeners = function () {
        var _this = this;
        if (!this._notifyingListeners) {
            this._notifyingListeners = true;
            setTimeout(function () {
                _this._scopeListeners.forEach(function (callback) {
                    callback(_this);
                });
                _this._notifyingListeners = false;
            });
        }
    };
    /**
     * This will be called after {@link applyToEvent} is finished.
     */
    Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        return new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.SyncPromise(function (resolve, reject) {
            var processor = processors[index];
            // tslint:disable-next-line:strict-type-predicates
            if (event === null || typeof processor !== 'function') {
                resolve(event);
            }
            else {
                var result = processor(tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event), hint);
                if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isThenable)(result)) {
                    result
                        .then(function (final) { return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve); })
                        .then(null, reject);
                }
                else {
                    _this._notifyEventProcessors(processors, result, hint, index + 1)
                        .then(resolve)
                        .then(null, reject);
                }
            }
        });
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setUser = function (user) {
        this._user = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(user);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTags = function (tags) {
        this._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(tags));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTag = function (key, value) {
        var _a;
        this._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, (_a = {}, _a[key] = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(value), _a));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setExtras = function (extra) {
        this._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(extra));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setExtra = function (key, extra) {
        var _a;
        this._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, (_a = {}, _a[key] = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(extra), _a));
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setFingerprint = function (fingerprint) {
        this._fingerprint = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(fingerprint);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setLevel = function (level) {
        this._level = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(level);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setTransaction = function (transaction) {
        this._transaction = transaction;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setContext = function (name, context) {
        this._context[name] = context ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(context) : undefined;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.setSpan = function (span) {
        this._span = span;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * Internal getter for Span, used in Hub.
     * @hidden
     */
    Scope.prototype.getSpan = function () {
        return this._span;
    };
    /**
     * Inherit values from the parent scope.
     * @param scope to clone.
     */
    Scope.clone = function (scope) {
        var newScope = new Scope();
        if (scope) {
            newScope._breadcrumbs = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(scope._breadcrumbs);
            newScope._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._tags);
            newScope._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._extra);
            newScope._context = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._context);
            newScope._user = scope._user;
            newScope._level = scope._level;
            newScope._span = scope._span;
            newScope._transaction = scope._transaction;
            newScope._fingerprint = scope._fingerprint;
            newScope._eventProcessors = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(scope._eventProcessors);
        }
        return newScope;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.clear = function () {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._context = {};
        this._level = undefined;
        this._transaction = undefined;
        this._fingerprint = undefined;
        this._span = undefined;
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
        var timestamp = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.timestampWithMs)();
        var mergedBreadcrumb = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({ timestamp: timestamp }, breadcrumb);
        this._breadcrumbs =
            maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
                ? tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._breadcrumbs, [(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(mergedBreadcrumb)]).slice(-maxBreadcrumbs)
                : tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._breadcrumbs, [(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(mergedBreadcrumb)]);
        this._notifyScopeListeners();
        return this;
    };
    /**
     * @inheritDoc
     */
    Scope.prototype.clearBreadcrumbs = function () {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
    };
    /**
     * Applies fingerprint from the scope to the event if there's one,
     * uses message if there's one instead or get rid of empty fingerprint
     */
    Scope.prototype._applyFingerprint = function (event) {
        // Make sure it's an array first and we actually have something in place
        event.fingerprint = event.fingerprint
            ? Array.isArray(event.fingerprint)
                ? event.fingerprint
                : [event.fingerprint]
            : [];
        // If we have something on the scope, then merge it with event
        if (this._fingerprint) {
            event.fingerprint = event.fingerprint.concat(this._fingerprint);
        }
        // If we have no data at all, remove empty array default
        if (event.fingerprint && !event.fingerprint.length) {
            delete event.fingerprint;
        }
    };
    /**
     * Applies the current context and fingerprint to the event.
     * Note that breadcrumbs will be added by the client.
     * Also if the event has already breadcrumbs on it, we do not merge them.
     * @param event Event
     * @param hint May contain additional informartion about the original exception.
     * @hidden
     */
    Scope.prototype.applyToEvent = function (event, hint) {
        if (this._extra && Object.keys(this._extra).length) {
            event.extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, event.extra);
        }
        if (this._tags && Object.keys(this._tags).length) {
            event.tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, event.tags);
        }
        if (this._user && Object.keys(this._user).length) {
            event.user = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._user, event.user);
        }
        if (this._context && Object.keys(this._context).length) {
            event.contexts = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._context, event.contexts);
        }
        if (this._level) {
            event.level = this._level;
        }
        if (this._transaction) {
            event.transaction = this._transaction;
        }
        this._applyFingerprint(event);
        event.breadcrumbs = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread((event.breadcrumbs || []), this._breadcrumbs);
        event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;
        return this._notifyEventProcessors(tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
    };
    return Scope;
}());

/**
 * Retruns the global event processors.
 */
function getGlobalEventProcessors() {
    var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getGlobalObject)();
    global.__SENTRY__ = global.__SENTRY__ || {};
    global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [];
    return global.__SENTRY__.globalEventProcessors;
}
/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
function addGlobalEventProcessor(callback) {
    getGlobalEventProcessors().push(callback);
}
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/@sentry/minimal/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/minimal/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureException": () => (/* binding */ captureException),
/* harmony export */   "captureMessage": () => (/* binding */ captureMessage),
/* harmony export */   "captureEvent": () => (/* binding */ captureEvent),
/* harmony export */   "configureScope": () => (/* binding */ configureScope),
/* harmony export */   "addBreadcrumb": () => (/* binding */ addBreadcrumb),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "setExtras": () => (/* binding */ setExtras),
/* harmony export */   "setTags": () => (/* binding */ setTags),
/* harmony export */   "setExtra": () => (/* binding */ setExtra),
/* harmony export */   "setTag": () => (/* binding */ setTag),
/* harmony export */   "setUser": () => (/* binding */ setUser),
/* harmony export */   "withScope": () => (/* binding */ withScope),
/* harmony export */   "_callOnClient": () => (/* binding */ _callOnClient)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");


/**
 * This calls a function on the current hub.
 * @param method function to call on hub.
 * @param args to pass to function.
 */
function callOnHub(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var hub = (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)();
    if (hub && hub[method]) {
        // tslint:disable-next-line:no-unsafe-any
        return hub[method].apply(hub, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
    }
    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
}
/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */
function captureException(exception) {
    var syntheticException;
    try {
        throw new Error('Sentry syntheticException');
    }
    catch (exception) {
        syntheticException = exception;
    }
    return callOnHub('captureException', exception, {
        originalException: exception,
        syntheticException: syntheticException,
    });
}
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param level Define the level of the message.
 * @returns The generated eventId.
 */
function captureMessage(message, level) {
    var syntheticException;
    try {
        throw new Error(message);
    }
    catch (exception) {
        syntheticException = exception;
    }
    return callOnHub('captureMessage', message, level, {
        originalException: message,
        syntheticException: syntheticException,
    });
}
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */
function captureEvent(event) {
    return callOnHub('captureEvent', event);
}
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */
function configureScope(callback) {
    callOnHub('configureScope', callback);
}
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
function addBreadcrumb(breadcrumb) {
    callOnHub('addBreadcrumb', breadcrumb);
}
/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normailzed.
 */
function setContext(name, context) {
    callOnHub('setContext', name, context);
}
/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */
function setExtras(extras) {
    callOnHub('setExtras', extras);
}
/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */
function setTags(tags) {
    callOnHub('setTags', tags);
}
/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normailzed.
 */
function setExtra(key, extra) {
    callOnHub('setExtra', key, extra);
}
/**
 * Set key:value that will be sent as tags data with the event.
 * @param key String key of tag
 * @param value String value of tag
 */
function setTag(key, value) {
    callOnHub('setTag', key, value);
}
/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */
function setUser(user) {
    callOnHub('setUser', user);
}
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
function withScope(callback) {
    callOnHub('withScope', callback);
}
/**
 * Calls a function on the latest client. Use this with caution, it's meant as
 * in "internal" helper so we don't need to expose every possible function in
 * the shim. It is not guaranteed that the client actually implements the
 * function.
 *
 * @param method The method to call on the client/client.
 * @param args Arguments to pass to the client/fontend.
 * @hidden
 */
function _callOnClient(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    callOnHub.apply(void 0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(['_invokeClient', method], args));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sentry/types/esm/severity.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/types/esm/severity.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Severity": () => (/* binding */ Severity)
/* harmony export */ });
/** JSDoc */
var Severity;
(function (Severity) {
    /** JSDoc */
    Severity["Fatal"] = "fatal";
    /** JSDoc */
    Severity["Error"] = "error";
    /** JSDoc */
    Severity["Warning"] = "warning";
    /** JSDoc */
    Severity["Log"] = "log";
    /** JSDoc */
    Severity["Info"] = "info";
    /** JSDoc */
    Severity["Debug"] = "debug";
    /** JSDoc */
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
// tslint:disable:completed-docs
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Severity) {
    /**
     * Converts a string-based level into a {@link Severity}.
     *
     * @param level string representation of Severity
     * @returns Severity
     */
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case 'error':
                return Severity.Error;
            case 'fatal':
                return Severity.Fatal;
            case 'critical':
                return Severity.Critical;
            case 'log':
            default:
                return Severity.Log;
        }
    }
    Severity.fromString = fromString;
})(Severity || (Severity = {}));
//# sourceMappingURL=severity.js.map

/***/ }),

/***/ "./node_modules/@sentry/types/esm/status.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/types/esm/status.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Status": () => (/* binding */ Status)
/* harmony export */ });
/** The status of an event. */
var Status;
(function (Status) {
    /** The status could not be determined. */
    Status["Unknown"] = "unknown";
    /** The event was skipped due to configuration or callbacks. */
    Status["Skipped"] = "skipped";
    /** The event was sent to Sentry successfully. */
    Status["Success"] = "success";
    /** The client is currently rate limited and will try again later. */
    Status["RateLimit"] = "rate_limit";
    /** The event could not be processed. */
    Status["Invalid"] = "invalid";
    /** A server-side error ocurred during submission. */
    Status["Failed"] = "failed";
})(Status || (Status = {}));
// tslint:disable:completed-docs
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Status) {
    /**
     * Converts a HTTP status code into a {@link Status}.
     *
     * @param code The HTTP response status code.
     * @returns The send status or {@link Status.Unknown}.
     */
    function fromHttpCode(code) {
        if (code >= 200 && code < 300) {
            return Status.Success;
        }
        if (code === 429) {
            return Status.RateLimit;
        }
        if (code >= 400 && code < 500) {
            return Status.Invalid;
        }
        if (code >= 500) {
            return Status.Failed;
        }
        return Status.Unknown;
    }
    Status.fromHttpCode = fromHttpCode;
})(Status || (Status = {}));
//# sourceMappingURL=status.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/dsn.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/dsn.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dsn": () => (/* binding */ Dsn)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@sentry/utils/esm/error.js");


/** Regular expression used to parse a Dsn. */
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
/** Error message */
var ERROR_MESSAGE = 'Invalid Dsn';
/** The Sentry Dsn, identifying a Sentry instance and project. */
var Dsn = /** @class */ (function () {
    /** Creates a new Dsn component */
    function Dsn(from) {
        if (typeof from === 'string') {
            this._fromString(from);
        }
        else {
            this._fromComponents(from);
        }
        this._validate();
    }
    /**
     * Renders the string representation of this Dsn.
     *
     * By default, this will render the public representation without the password
     * component. To get the deprecated private _representation, set `withPassword`
     * to true.
     *
     * @param withPassword When set to true, the password will be included.
     */
    Dsn.prototype.toString = function (withPassword) {
        if (withPassword === void 0) { withPassword = false; }
        // tslint:disable-next-line:no-this-assignment
        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, user = _a.user;
        return (protocol + "://" + user + (withPassword && pass ? ":" + pass : '') +
            ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
    };
    /** Parses a string into this Dsn. */
    Dsn.prototype._fromString = function (str) {
        var match = DSN_REGEX.exec(str);
        if (!match) {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
        }
        var _a = tslib__WEBPACK_IMPORTED_MODULE_0__.__read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
        var path = '';
        var projectId = lastPath;
        var split = projectId.split('/');
        if (split.length > 1) {
            path = split.slice(0, -1).join('/');
            projectId = split.pop();
        }
        this._fromComponents({ host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, user: user });
    };
    /** Maps Dsn components into this instance. */
    Dsn.prototype._fromComponents = function (components) {
        this.protocol = components.protocol;
        this.user = components.user;
        this.pass = components.pass || '';
        this.host = components.host;
        this.port = components.port || '';
        this.path = components.path || '';
        this.projectId = components.projectId;
    };
    /** Validates this Dsn and throws on error. */
    Dsn.prototype._validate = function () {
        var _this = this;
        ['protocol', 'user', 'host', 'projectId'].forEach(function (component) {
            if (!_this[component]) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
            }
        });
        if (this.protocol !== 'http' && this.protocol !== 'https') {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
        }
        if (this.port && isNaN(parseInt(this.port, 10))) {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
        }
    };
    return Dsn;
}());

//# sourceMappingURL=dsn.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/error.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/error.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SentryError": () => (/* binding */ SentryError)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfill */ "./node_modules/@sentry/utils/esm/polyfill.js");


/** An error emitted by Sentry SDKs and related utilities. */
var SentryError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(SentryError, _super);
    function SentryError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        // tslint:disable:no-unsafe-any
        _this.name = _newTarget.prototype.constructor.name;
        (0,_polyfill__WEBPACK_IMPORTED_MODULE_1__.setPrototypeOf)(_this, _newTarget.prototype);
        return _this;
    }
    return SentryError;
}(Error));

//# sourceMappingURL=error.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/instrument.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/instrument.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInstrumentationHandler": () => (/* binding */ addInstrumentationHandler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./object */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _supports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supports */ "./node_modules/@sentry/utils/esm/supports.js");
/* tslint:disable:only-arrow-functions no-unsafe-any */






var global = (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/**
 * Instrument native APIs to call handlers that can be used to create breadcrumbs, APM spans etc.
 *  - Console API
 *  - Fetch API
 *  - XHR API
 *  - History API
 *  - DOM API (click/typing)
 */
var handlers = {};
var instrumented = {};
/** Instruments given API */
function instrument(type) {
    if (instrumented[type]) {
        return;
    }
    instrumented[type] = true;
    switch (type) {
        case 'console':
            instrumentConsole();
            break;
        case 'dom':
            instrumentDOM();
            break;
        case 'xhr':
            instrumentXHR();
            break;
        case 'fetch':
            instrumentFetch();
            break;
        case 'history':
            instrumentHistory();
            break;
        default:
            _logger__WEBPACK_IMPORTED_MODULE_2__.logger.warn('unknown instrumentation type:', type);
    }
}
/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */
function addInstrumentationHandler(handler) {
    // tslint:disable-next-line:strict-type-predicates
    if (!handler || typeof handler.type !== 'string' || typeof handler.callback !== 'function') {
        return;
    }
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type].push(handler.callback);
    instrument(handler.type);
}
/** JSDoc */
function triggerHandlers(type, data) {
    var e_1, _a;
    if (!type || !handlers[type]) {
        return;
    }
    try {
        for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__.__values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
            var handler = _c.value;
            try {
                handler(data);
            }
            catch (e) {
                _logger__WEBPACK_IMPORTED_MODULE_2__.logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(handler) + "\nError: " + e);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
/** JSDoc */
function instrumentConsole() {
    if (!('console' in global)) {
        return;
    }
    ['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(function (level) {
        if (!(level in global.console)) {
            return;
        }
        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.console, level, function (originalConsoleLevel) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                triggerHandlers('console', { args: args, level: level });
                // this fails for some browsers. :(
                if (originalConsoleLevel) {
                    Function.prototype.apply.call(originalConsoleLevel, global.console, args);
                }
            };
        });
    });
}
/** JSDoc */
function instrumentFetch() {
    if (!(0,_supports__WEBPACK_IMPORTED_MODULE_4__.supportsNativeFetch)()) {
        return;
    }
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global, 'fetch', function (originalFetch) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var commonHandlerData = {
                args: args,
                fetchData: {
                    method: getFetchMethod(args),
                    url: getFetchUrl(args),
                },
                startTimestamp: Date.now(),
            };
            triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData));
            return originalFetch.apply(global, args).then(function (response) {
                triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, { endTimestamp: Date.now(), response: response }));
                return response;
            }, function (error) {
                triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, { endTimestamp: Date.now(), error: error }));
                throw error;
            });
        };
    });
}
/** Extract `method` from fetch call arguments */
function getFetchMethod(fetchArgs) {
    if (fetchArgs === void 0) { fetchArgs = []; }
    if ('Request' in global && (0,_is__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request) && fetchArgs[0].method) {
        return String(fetchArgs[0].method).toUpperCase();
    }
    if (fetchArgs[1] && fetchArgs[1].method) {
        return String(fetchArgs[1].method).toUpperCase();
    }
    return 'GET';
}
/** Extract `url` from fetch call arguments */
function getFetchUrl(fetchArgs) {
    if (fetchArgs === void 0) { fetchArgs = []; }
    if (typeof fetchArgs[0] === 'string') {
        return fetchArgs[0];
    }
    if ('Request' in global && (0,_is__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request)) {
        return fetchArgs[0].url;
    }
    return String(fetchArgs[0]);
}
/** JSDoc */
function instrumentXHR() {
    if (!('XMLHttpRequest' in global)) {
        return;
    }
    var xhrproto = XMLHttpRequest.prototype;
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var url = args[1];
            this.__sentry_xhr__ = {
                method: (0,_is__WEBPACK_IMPORTED_MODULE_5__.isString)(args[0]) ? args[0].toUpperCase() : args[0],
                url: args[1],
            };
            // if Sentry key appears in URL, don't capture it as a request
            if ((0,_is__WEBPACK_IMPORTED_MODULE_5__.isString)(url) && this.__sentry_xhr__.method === 'POST' && url.match(/sentry_key/)) {
                this.__sentry_own_request__ = true;
            }
            return originalOpen.apply(this, args);
        };
    });
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'send', function (originalSend) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var xhr = this; // tslint:disable-line:no-this-assignment
            var commonHandlerData = {
                args: args,
                startTimestamp: Date.now(),
                xhr: xhr,
            };
            triggerHandlers('xhr', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData));
            /**
             * @hidden
             */
            function onreadystatechangeHandler() {
                if (xhr.readyState === 4) {
                    try {
                        // touching statusCode in some platforms throws
                        // an exception
                        if (xhr.__sentry_xhr__) {
                            xhr.__sentry_xhr__.status_code = xhr.status;
                        }
                    }
                    catch (e) {
                        /* do nothing */
                    }
                    triggerHandlers('xhr', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, { endTimestamp: Date.now() }));
                }
            }
            if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
                (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhr, 'onreadystatechange', function (original) {
                    return function () {
                        var readyStateArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            readyStateArgs[_i] = arguments[_i];
                        }
                        onreadystatechangeHandler();
                        return original.apply(xhr, readyStateArgs);
                    };
                });
            }
            else {
                // if onreadystatechange wasn't actually set by the page on this xhr, we
                // are free to set our own and capture the breadcrumb
                xhr.onreadystatechange = onreadystatechangeHandler;
            }
            return originalSend.apply(this, args);
        };
    });
}
var lastHref;
/** JSDoc */
function instrumentHistory() {
    if (!(0,_supports__WEBPACK_IMPORTED_MODULE_4__.supportsHistory)()) {
        return;
    }
    var oldOnPopState = global.onpopstate;
    global.onpopstate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var to = global.location.href;
        // keep track of the current URL state, as we always receive only the updated state
        var from = lastHref;
        lastHref = to;
        triggerHandlers('history', {
            from: from,
            to: to,
        });
        if (oldOnPopState) {
            return oldOnPopState.apply(this, args);
        }
    };
    /** @hidden */
    function historyReplacementFunction(originalHistoryFunction) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var url = args.length > 2 ? args[2] : undefined;
            if (url) {
                // coerce to string (this is what pushState does)
                var from = lastHref;
                var to = String(url);
                // keep track of the current URL state, as we always receive only the updated state
                lastHref = to;
                triggerHandlers('history', {
                    from: from,
                    to: to,
                });
            }
            return originalHistoryFunction.apply(this, args);
        };
    }
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.history, 'pushState', historyReplacementFunction);
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.history, 'replaceState', historyReplacementFunction);
}
/** JSDoc */
function instrumentDOM() {
    if (!('document' in global)) {
        return;
    }
    // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
    // to the document. Do this before we instrument addEventListener.
    global.document.addEventListener('click', domEventHandler('click', triggerHandlers.bind(null, 'dom')), false);
    global.document.addEventListener('keypress', keypressEventHandler(triggerHandlers.bind(null, 'dom')), false);
    // After hooking into document bubbled up click and keypresses events, we also hook into user handled click & keypresses.
    ['EventTarget', 'Node'].forEach(function (target) {
        var proto = global[target] && global[target].prototype;
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
            return;
        }
        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(proto, 'addEventListener', function (original) {
            return function (eventName, fn, options) {
                if (fn && fn.handleEvent) {
                    if (eventName === 'click') {
                        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(fn, 'handleEvent', function (innerOriginal) {
                            return function (event) {
                                domEventHandler('click', triggerHandlers.bind(null, 'dom'))(event);
                                return innerOriginal.call(this, event);
                            };
                        });
                    }
                    if (eventName === 'keypress') {
                        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(fn, 'handleEvent', function (innerOriginal) {
                            return function (event) {
                                keypressEventHandler(triggerHandlers.bind(null, 'dom'))(event);
                                return innerOriginal.call(this, event);
                            };
                        });
                    }
                }
                else {
                    if (eventName === 'click') {
                        domEventHandler('click', triggerHandlers.bind(null, 'dom'), true)(this);
                    }
                    if (eventName === 'keypress') {
                        keypressEventHandler(triggerHandlers.bind(null, 'dom'))(this);
                    }
                }
                return original.call(this, eventName, fn, options);
            };
        });
        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(proto, 'removeEventListener', function (original) {
            return function (eventName, fn, options) {
                var callback = fn;
                try {
                    callback = callback && (callback.__sentry_wrapped__ || callback);
                }
                catch (e) {
                    // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                }
                return original.call(this, eventName, callback, options);
            };
        });
    });
}
var debounceDuration = 1000;
var debounceTimer = 0;
var keypressTimeout;
var lastCapturedEvent;
/**
 * Wraps addEventListener to capture UI breadcrumbs
 * @param name the event name (e.g. "click")
 * @param handler function that will be triggered
 * @param debounce decides whether it should wait till another event loop
 * @returns wrapped breadcrumb events handler
 * @hidden
 */
function domEventHandler(name, handler, debounce) {
    if (debounce === void 0) { debounce = false; }
    return function (event) {
        // reset keypress timeout; e.g. triggering a 'click' after
        // a 'keypress' will reset the keypress debounce so that a new
        // set of keypresses can be recorded
        keypressTimeout = undefined;
        // It's possible this handler might trigger multiple times for the same
        // event (e.g. event propagation through node ancestors). Ignore if we've
        // already captured the event.
        if (!event || lastCapturedEvent === event) {
            return;
        }
        lastCapturedEvent = event;
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        if (debounce) {
            debounceTimer = setTimeout(function () {
                handler({ event: event, name: name });
            });
        }
        else {
            handler({ event: event, name: name });
        }
    };
}
/**
 * Wraps addEventListener to capture keypress UI events
 * @param handler function that will be triggered
 * @returns wrapped keypress events handler
 * @hidden
 */
function keypressEventHandler(handler) {
    // TODO: if somehow user switches keypress target before
    //       debounce timeout is triggered, we will only capture
    //       a single breadcrumb from the FIRST target (acceptable?)
    return function (event) {
        var target;
        try {
            target = event.target;
        }
        catch (e) {
            // just accessing event properties can throw an exception in some rare circumstances
            // see: https://github.com/getsentry/raven-js/issues/838
            return;
        }
        var tagName = target && target.tagName;
        // only consider keypress events on actual input elements
        // this will disregard keypresses targeting body (e.g. tabbing
        // through elements, hotkeys, etc)
        if (!tagName || (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)) {
            return;
        }
        // record first keypress in a series, but ignore subsequent
        // keypresses until debounce clears
        if (!keypressTimeout) {
            domEventHandler('input', handler)(event);
        }
        clearTimeout(keypressTimeout);
        keypressTimeout = setTimeout(function () {
            keypressTimeout = undefined;
        }, debounceDuration);
    };
}
//# sourceMappingURL=instrument.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/is.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/is.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isError": () => (/* binding */ isError),
/* harmony export */   "isErrorEvent": () => (/* binding */ isErrorEvent),
/* harmony export */   "isDOMError": () => (/* binding */ isDOMError),
/* harmony export */   "isDOMException": () => (/* binding */ isDOMException),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isPrimitive": () => (/* binding */ isPrimitive),
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isEvent": () => (/* binding */ isEvent),
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isRegExp": () => (/* binding */ isRegExp),
/* harmony export */   "isThenable": () => (/* binding */ isThenable),
/* harmony export */   "isSyntheticEvent": () => (/* binding */ isSyntheticEvent),
/* harmony export */   "isInstanceOf": () => (/* binding */ isInstanceOf)
/* harmony export */ });
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError(wat) {
    switch (Object.prototype.toString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isErrorEvent(wat) {
    return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMError(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMError]';
}
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMException(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMException]';
}
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString(wat) {
    return Object.prototype.toString.call(wat) === '[object String]';
}
/**
 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPrimitive(wat) {
    return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
}
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPlainObject(wat) {
    return Object.prototype.toString.call(wat) === '[object Object]';
}
/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isEvent(wat) {
    // tslint:disable-next-line:strict-type-predicates
    return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
}
/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isElement(wat) {
    // tslint:disable-next-line:strict-type-predicates
    return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
}
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isRegExp(wat) {
    return Object.prototype.toString.call(wat) === '[object RegExp]';
}
/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */
function isThenable(wat) {
    // tslint:disable:no-unsafe-any
    return Boolean(wat && wat.then && typeof wat.then === 'function');
    // tslint:enable:no-unsafe-any
}
/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isSyntheticEvent(wat) {
    // tslint:disable-next-line:no-unsafe-any
    return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */
function isInstanceOf(wat, base) {
    try {
        // tslint:disable-next-line:no-unsafe-any
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}
//# sourceMappingURL=is.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/logger.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/logger.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");

// TODO: Implement different loggers for different environments
var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
/** Prefix for logging strings */
var PREFIX = 'Sentry Logger ';
/** JSDoc */
var Logger = /** @class */ (function () {
    /** JSDoc */
    function Logger() {
        this._enabled = false;
    }
    /** JSDoc */
    Logger.prototype.disable = function () {
        this._enabled = false;
    };
    /** JSDoc */
    Logger.prototype.enable = function () {
        this._enabled = true;
    };
    /** JSDoc */
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._enabled) {
            return;
        }
        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
            global.console.log(PREFIX + "[Log]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._enabled) {
            return;
        }
        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
            global.console.warn(PREFIX + "[Warn]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._enabled) {
            return;
        }
        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
            global.console.error(PREFIX + "[Error]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    return Logger;
}());
// Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used
global.__SENTRY__ = global.__SENTRY__ || {};
var logger = global.__SENTRY__.logger || (global.__SENTRY__.logger = new Logger());

//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/memo.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/memo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memo": () => (/* binding */ Memo)
/* harmony export */ });
// tslint:disable:no-unsafe-any
/**
 * Memo class used for decycle json objects. Uses WeakSet if available otherwise array.
 */
var Memo = /** @class */ (function () {
    function Memo() {
        // tslint:disable-next-line
        this._hasWeakSet = typeof WeakSet === 'function';
        this._inner = this._hasWeakSet ? new WeakSet() : [];
    }
    /**
     * Sets obj to remember.
     * @param obj Object to remember
     */
    Memo.prototype.memoize = function (obj) {
        if (this._hasWeakSet) {
            if (this._inner.has(obj)) {
                return true;
            }
            this._inner.add(obj);
            return false;
        }
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < this._inner.length; i++) {
            var value = this._inner[i];
            if (value === obj) {
                return true;
            }
        }
        this._inner.push(obj);
        return false;
    };
    /**
     * Removes object from internal storage.
     * @param obj Object to forget
     */
    Memo.prototype.unmemoize = function (obj) {
        if (this._hasWeakSet) {
            this._inner.delete(obj);
        }
        else {
            for (var i = 0; i < this._inner.length; i++) {
                if (this._inner[i] === obj) {
                    this._inner.splice(i, 1);
                    break;
                }
            }
        }
    };
    return Memo;
}());

//# sourceMappingURL=memo.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/misc.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/misc.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dynamicRequire": () => (/* binding */ dynamicRequire),
/* harmony export */   "isNodeEnv": () => (/* binding */ isNodeEnv),
/* harmony export */   "getGlobalObject": () => (/* binding */ getGlobalObject),
/* harmony export */   "uuid4": () => (/* binding */ uuid4),
/* harmony export */   "parseUrl": () => (/* binding */ parseUrl),
/* harmony export */   "getEventDescription": () => (/* binding */ getEventDescription),
/* harmony export */   "consoleSandbox": () => (/* binding */ consoleSandbox),
/* harmony export */   "addExceptionTypeValue": () => (/* binding */ addExceptionTypeValue),
/* harmony export */   "addExceptionMechanism": () => (/* binding */ addExceptionMechanism),
/* harmony export */   "getLocationHref": () => (/* binding */ getLocationHref),
/* harmony export */   "htmlTreeAsString": () => (/* binding */ htmlTreeAsString),
/* harmony export */   "timestampWithMs": () => (/* binding */ timestampWithMs),
/* harmony export */   "parseSemver": () => (/* binding */ parseSemver),
/* harmony export */   "parseRetryAfterHeader": () => (/* binding */ parseRetryAfterHeader),
/* harmony export */   "getFunctionName": () => (/* binding */ getFunctionName),
/* harmony export */   "addContextToFrame": () => (/* binding */ addContextToFrame)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string */ "./node_modules/@sentry/utils/esm/string.js");


/**
 * Requires a module which is protected _against bundler minification.
 *
 * @param request The module path to resolve
 */
function dynamicRequire(mod, request) {
    // tslint:disable-next-line: no-unsafe-any
    return mod.require(request);
}
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
function isNodeEnv() {
    // tslint:disable:strict-type-predicates
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
var fallbackGlobalObject = {};
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
function getGlobalObject() {
    return (isNodeEnv()
        ? __webpack_require__.g
        : typeof window !== 'undefined'
            ? window
            : typeof self !== 'undefined'
                ? self
                : fallbackGlobalObject);
}
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4() {
    var global = getGlobalObject();
    var crypto = global.crypto || global.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);
        // set 4 in byte 7
        // tslint:disable-next-line:no-bitwise
        arr[3] = (arr[3] & 0xfff) | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        // tslint:disable-next-line:no-bitwise
        arr[4] = (arr[4] & 0x3fff) | 0x8000;
        var pad = function (num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = "0" + v;
            }
            return v;
        };
        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
    }
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise
        var r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
function parseUrl(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    // coerce to undefined values to empty string so we don't get 'undefined'
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment,
    };
}
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
function getEventDescription(event) {
    if (event.message) {
        return event.message;
    }
    if (event.exception && event.exception.values && event.exception.values[0]) {
        var exception = event.exception.values[0];
        if (exception.type && exception.value) {
            return exception.type + ": " + exception.value;
        }
        return exception.type || exception.value || event.event_id || '<unknown>';
    }
    return event.event_id || '<unknown>';
}
/** JSDoc */
function consoleSandbox(callback) {
    var global = getGlobalObject();
    var levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];
    if (!('console' in global)) {
        return callback();
    }
    var originalConsole = global.console;
    var wrappedLevels = {};
    // Restore all wrapped console methods
    levels.forEach(function (level) {
        if (level in global.console && originalConsole[level].__sentry_original__) {
            wrappedLevels[level] = originalConsole[level];
            originalConsole[level] = originalConsole[level].__sentry_original__;
        }
    });
    // Perform callback manipulations
    var result = callback();
    // Revert restoration to wrapped state
    Object.keys(wrappedLevels).forEach(function (level) {
        originalConsole[level] = wrappedLevels[level];
    });
    return result;
}
/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */
function addExceptionTypeValue(event, value, type) {
    event.exception = event.exception || {};
    event.exception.values = event.exception.values || [];
    event.exception.values[0] = event.exception.values[0] || {};
    event.exception.values[0].value = event.exception.values[0].value || value || '';
    event.exception.values[0].type = event.exception.values[0].type || type || 'Error';
}
/**
 * Adds exception mechanism to a given event.
 * @param event The event to modify.
 * @param mechanism Mechanism of the mechanism.
 * @hidden
 */
function addExceptionMechanism(event, mechanism) {
    if (mechanism === void 0) { mechanism = {}; }
    // TODO: Use real type with `keyof Mechanism` thingy and maybe make it better?
    try {
        // @ts-ignore
        // tslint:disable:no-non-null-assertion
        event.exception.values[0].mechanism = event.exception.values[0].mechanism || {};
        Object.keys(mechanism).forEach(function (key) {
            // @ts-ignore
            event.exception.values[0].mechanism[key] = mechanism[key];
        });
    }
    catch (_oO) {
        // no-empty
    }
}
/**
 * A safe form of location.href
 */
function getLocationHref() {
    try {
        return document.location.href;
    }
    catch (oO) {
        return '';
    }
}
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlTreeAsString(elem) {
    // try/catch both:
    // - accessing event.target (see getsentry/raven-js#838, #768)
    // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
    // - can throw an exception in some circumstances.
    try {
        var currentElem = elem;
        var MAX_TRAVERSE_HEIGHT = 5;
        var MAX_OUTPUT_LEN = 80;
        var out = [];
        var height = 0;
        var len = 0;
        var separator = ' > ';
        var sepLength = separator.length;
        var nextStr = void 0;
        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
            nextStr = _htmlElementAsString(currentElem);
            // bail out if
            // - nextStr is the 'html' element
            // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
            //   (ignore this limit if we are on the first iteration)
            if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
                break;
            }
            out.push(nextStr);
            len += nextStr.length;
            currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
    }
    catch (_oO) {
        return '<unknown>';
    }
}
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function _htmlElementAsString(el) {
    var elem = el;
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
        return '';
    }
    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
        out.push("#" + elem.id);
    }
    className = elem.className;
    if (className && (0,_is__WEBPACK_IMPORTED_MODULE_0__.isString)(className)) {
        classes = className.split(/\s+/);
        for (i = 0; i < classes.length; i++) {
            out.push("." + classes[i]);
        }
    }
    var attrWhitelist = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < attrWhitelist.length; i++) {
        key = attrWhitelist[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push("[" + key + "=\"" + attr + "\"]");
        }
    }
    return out.join('');
}
/**
 * Returns a timestamp in seconds with milliseconds precision.
 */
function timestampWithMs() {
    return new Date().getTime() / 1000;
}
// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */
function parseSemver(input) {
    var match = input.match(SEMVER_REGEXP) || [];
    var major = parseInt(match[1], 10);
    var minor = parseInt(match[2], 10);
    var patch = parseInt(match[3], 10);
    return {
        buildmetadata: match[5],
        major: isNaN(major) ? undefined : major,
        minor: isNaN(minor) ? undefined : minor,
        patch: isNaN(patch) ? undefined : patch,
        prerelease: match[4],
    };
}
var defaultRetryAfter = 60 * 1000; // 60 seconds
/**
 * Extracts Retry-After value from the request header or returns default value
 * @param now current unix timestamp
 * @param header string representation of 'Retry-After' header
 */
function parseRetryAfterHeader(now, header) {
    if (!header) {
        return defaultRetryAfter;
    }
    var headerDelay = parseInt("" + header, 10);
    if (!isNaN(headerDelay)) {
        return headerDelay * 1000;
    }
    var headerDate = Date.parse("" + header);
    if (!isNaN(headerDate)) {
        return headerDate - now;
    }
    return defaultRetryAfter;
}
var defaultFunctionName = '<anonymous>';
/**
 * Safely extract function name from itself
 */
function getFunctionName(fn) {
    try {
        if (!fn || typeof fn !== 'function') {
            return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
    }
    catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        return defaultFunctionName;
    }
}
/**
 * This function adds context (pre/post/line) lines to the provided frame
 *
 * @param lines string[] containing all lines
 * @param frame StackFrame that will be mutated
 * @param linesOfContext number of context lines we want to add pre/post
 */
function addContextToFrame(lines, frame, linesOfContext) {
    if (linesOfContext === void 0) { linesOfContext = 5; }
    var lineno = frame.lineno || 0;
    var maxLines = lines.length;
    var sourceLine = Math.max(Math.min(maxLines, lineno - 1), 0);
    frame.pre_context = lines
        .slice(Math.max(0, sourceLine - linesOfContext), sourceLine)
        .map(function (line) { return (0,_string__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0); });
    frame.context_line = (0,_string__WEBPACK_IMPORTED_MODULE_1__.snipLine)(lines[Math.min(maxLines - 1, sourceLine)], frame.colno || 0);
    frame.post_context = lines
        .slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext)
        .map(function (line) { return (0,_string__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0); });
}
//# sourceMappingURL=misc.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/object.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/object.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "urlEncode": () => (/* binding */ urlEncode),
/* harmony export */   "normalizeToSize": () => (/* binding */ normalizeToSize),
/* harmony export */   "walk": () => (/* binding */ walk),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "extractExceptionKeysForMessage": () => (/* binding */ extractExceptionKeysForMessage)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _memo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memo */ "./node_modules/@sentry/utils/esm/memo.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string */ "./node_modules/@sentry/utils/esm/string.js");




/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */
function fill(source, name, replacement) {
    if (!(name in source)) {
        return;
    }
    var original = source[name];
    var wrapped = replacement(original);
    // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
    // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
    // tslint:disable-next-line:strict-type-predicates
    if (typeof wrapped === 'function') {
        try {
            wrapped.prototype = wrapped.prototype || {};
            Object.defineProperties(wrapped, {
                __sentry_original__: {
                    enumerable: false,
                    value: original,
                },
            });
        }
        catch (_Oo) {
            // This can throw if multiple fill happens on a global object like XMLHttpRequest
            // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
        }
    }
    source[name] = wrapped;
}
/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */
function urlEncode(object) {
    return Object.keys(object)
        .map(
    // tslint:disable-next-line:no-unsafe-any
    function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
        .join('&');
}
/**
 * Transforms any object into an object literal with all it's attributes
 * attached to it.
 *
 * @param value Initial source that we have to transform in order to be usable by the serializer
 */
function getWalkSource(value) {
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isError)(value)) {
        var error = value;
        var err = {
            message: error.message,
            name: error.name,
            stack: error.stack,
        };
        for (var i in error) {
            if (Object.prototype.hasOwnProperty.call(error, i)) {
                err[i] = error[i];
            }
        }
        return err;
    }
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isEvent)(value)) {
        var event_1 = value;
        var source = {};
        source.type = event_1.type;
        // Accessing event.target can throw (see getsentry/raven-js#838, #768)
        try {
            source.target = (0,_is__WEBPACK_IMPORTED_MODULE_0__.isElement)(event_1.target)
                ? (0,_misc__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(event_1.target)
                : Object.prototype.toString.call(event_1.target);
        }
        catch (_oO) {
            source.target = '<unknown>';
        }
        try {
            source.currentTarget = (0,_is__WEBPACK_IMPORTED_MODULE_0__.isElement)(event_1.currentTarget)
                ? (0,_misc__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(event_1.currentTarget)
                : Object.prototype.toString.call(event_1.currentTarget);
        }
        catch (_oO) {
            source.currentTarget = '<unknown>';
        }
        // tslint:disable-next-line:strict-type-predicates
        if (typeof CustomEvent !== 'undefined' && (0,_is__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(value, CustomEvent)) {
            source.detail = event_1.detail;
        }
        for (var i in event_1) {
            if (Object.prototype.hasOwnProperty.call(event_1, i)) {
                source[i] = event_1;
            }
        }
        return source;
    }
    return value;
}
/** Calculates bytes size of input string */
function utf8Length(value) {
    // tslint:disable-next-line:no-bitwise
    return ~-encodeURI(value).split(/%..|./).length;
}
/** Calculates bytes size of input object */
function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
}
/** JSDoc */
function normalizeToSize(object, 
// Default Node.js REPL depth
depth, 
// 100kB, as 200kB is max payload size, so half sounds reasonable
maxSize) {
    if (depth === void 0) { depth = 3; }
    if (maxSize === void 0) { maxSize = 100 * 1024; }
    var serialized = normalize(object, depth);
    if (jsonSize(serialized) > maxSize) {
        return normalizeToSize(object, depth - 1, maxSize);
    }
    return serialized;
}
/** Transforms any input value into a string form, either primitive value or a type of the input */
function serializeValue(value) {
    var type = Object.prototype.toString.call(value);
    // Node.js REPL notation
    if (typeof value === 'string') {
        return value;
    }
    if (type === '[object Object]') {
        return '[Object]';
    }
    if (type === '[object Array]') {
        return '[Array]';
    }
    var normalized = normalizeValue(value);
    return (0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(normalized) ? normalized : type;
}
/**
 * normalizeValue()
 *
 * Takes unserializable input and make it serializable friendly
 *
 * - translates undefined/NaN values to "[undefined]"/"[NaN]" respectively,
 * - serializes Error objects
 * - filter global objects
 */
// tslint:disable-next-line:cyclomatic-complexity
function normalizeValue(value, key) {
    if (key === 'domain' && value && typeof value === 'object' && value._events) {
        return '[Domain]';
    }
    if (key === 'domainEmitter') {
        return '[DomainEmitter]';
    }
    if (typeof __webpack_require__.g !== 'undefined' && value === __webpack_require__.g) {
        return '[Global]';
    }
    if (typeof window !== 'undefined' && value === window) {
        return '[Window]';
    }
    if (typeof document !== 'undefined' && value === document) {
        return '[Document]';
    }
    // React's SyntheticEvent thingy
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSyntheticEvent)(value)) {
        return '[SyntheticEvent]';
    }
    // tslint:disable-next-line:no-tautology-expression
    if (typeof value === 'number' && value !== value) {
        return '[NaN]';
    }
    if (value === void 0) {
        return '[undefined]';
    }
    if (typeof value === 'function') {
        return "[Function: " + (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(value) + "]";
    }
    return value;
}
/**
 * Walks an object to perform a normalization on it
 *
 * @param key of object that's walked in current iteration
 * @param value object to be walked
 * @param depth Optional number indicating how deep should walking be performed
 * @param memo Optional Memo class handling decycling
 */
function walk(key, value, depth, memo) {
    if (depth === void 0) { depth = +Infinity; }
    if (memo === void 0) { memo = new _memo__WEBPACK_IMPORTED_MODULE_2__.Memo(); }
    // If we reach the maximum depth, serialize whatever has left
    if (depth === 0) {
        return serializeValue(value);
    }
    // If value implements `toJSON` method, call it and return early
    // tslint:disable:no-unsafe-any
    if (value !== null && value !== undefined && typeof value.toJSON === 'function') {
        return value.toJSON();
    }
    // tslint:enable:no-unsafe-any
    // If normalized value is a primitive, there are no branches left to walk, so we can just bail out, as theres no point in going down that branch any further
    var normalized = normalizeValue(value, key);
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(normalized)) {
        return normalized;
    }
    // Create source that we will use for next itterations, either objectified error object (Error type with extracted keys:value pairs) or the input itself
    var source = getWalkSource(value);
    // Create an accumulator that will act as a parent for all future itterations of that branch
    var acc = Array.isArray(value) ? [] : {};
    // If we already walked that branch, bail out, as it's circular reference
    if (memo.memoize(value)) {
        return '[Circular ~]';
    }
    // Walk all keys of the source
    for (var innerKey in source) {
        // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
        if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
            continue;
        }
        // Recursively walk through all the child nodes
        acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
    }
    // Once walked through all the branches, remove the parent from memo storage
    memo.unmemoize(value);
    // Return accumulated values
    return acc;
}
/**
 * normalize()
 *
 * - Creates a copy to prevent original input mutation
 * - Skip non-enumerablers
 * - Calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializeable values (undefined/NaN/Functions) to serializable format
 * - Translates known global objects/Classes to a string representations
 * - Takes care of Error objects serialization
 * - Optionally limit depth of final output
 */
function normalize(input, depth) {
    try {
        // tslint:disable-next-line:no-unsafe-any
        return JSON.parse(JSON.stringify(input, function (key, value) { return walk(key, value, depth); }));
    }
    catch (_oO) {
        return '**non-serializable**';
    }
}
/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */
function extractExceptionKeysForMessage(exception, maxLength) {
    if (maxLength === void 0) { maxLength = 40; }
    // tslint:disable:strict-type-predicates
    var keys = Object.keys(getWalkSource(exception));
    keys.sort();
    if (!keys.length) {
        return '[object has no keys]';
    }
    if (keys[0].length >= maxLength) {
        return (0,_string__WEBPACK_IMPORTED_MODULE_3__.truncate)(keys[0], maxLength);
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        var serialized = keys.slice(0, includedKeys).join(', ');
        if (serialized.length > maxLength) {
            continue;
        }
        if (includedKeys === keys.length) {
            return serialized;
        }
        return (0,_string__WEBPACK_IMPORTED_MODULE_3__.truncate)(serialized, maxLength);
    }
    return '';
}
//# sourceMappingURL=object.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/polyfill.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/polyfill.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setPrototypeOf": () => (/* binding */ setPrototypeOf)
/* harmony export */ });
var setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties); // tslint:disable-line:no-unbound-method
/**
 * setPrototypeOf polyfill using __proto__
 */
function setProtoOf(obj, proto) {
    // @ts-ignore
    obj.__proto__ = proto;
    return obj;
}
/**
 * setPrototypeOf polyfill using mixin
 */
function mixinProperties(obj, proto) {
    for (var prop in proto) {
        if (!obj.hasOwnProperty(prop)) {
            // @ts-ignore
            obj[prop] = proto[prop];
        }
    }
    return obj;
}
//# sourceMappingURL=polyfill.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/promisebuffer.js":
/*!*********************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/promisebuffer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromiseBuffer": () => (/* binding */ PromiseBuffer)
/* harmony export */ });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _syncpromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syncpromise */ "./node_modules/@sentry/utils/esm/syncpromise.js");


/** A simple queue that holds promises. */
var PromiseBuffer = /** @class */ (function () {
    function PromiseBuffer(_limit) {
        this._limit = _limit;
        /** Internal set of queued Promises */
        this._buffer = [];
    }
    /**
     * Says if the buffer is ready to take more requests
     */
    PromiseBuffer.prototype.isReady = function () {
        return this._limit === undefined || this.length() < this._limit;
    };
    /**
     * Add a promise to the queue.
     *
     * @param task Can be any PromiseLike<T>
     * @returns The original promise.
     */
    PromiseBuffer.prototype.add = function (task) {
        var _this = this;
        if (!this.isReady()) {
            return _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.reject(new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError('Not adding Promise due to buffer limit reached.'));
        }
        if (this._buffer.indexOf(task) === -1) {
            this._buffer.push(task);
        }
        task
            .then(function () { return _this.remove(task); })
            .then(null, function () {
            return _this.remove(task).then(null, function () {
                // We have to add this catch here otherwise we have an unhandledPromiseRejection
                // because it's a new Promise chain.
            });
        });
        return task;
    };
    /**
     * Remove a promise to the queue.
     *
     * @param task Can be any PromiseLike<T>
     * @returns Removed promise.
     */
    PromiseBuffer.prototype.remove = function (task) {
        var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];
        return removedTask;
    };
    /**
     * This function returns the number of unresolved promises in the queue.
     */
    PromiseBuffer.prototype.length = function () {
        return this._buffer.length;
    };
    /**
     * This will drain the whole queue, returns true if queue is empty or drained.
     * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
     *
     * @param timeout Number in ms to wait until it resolves with false.
     */
    PromiseBuffer.prototype.drain = function (timeout) {
        var _this = this;
        return new _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise(function (resolve) {
            var capturedSetTimeout = setTimeout(function () {
                if (timeout && timeout > 0) {
                    resolve(false);
                }
            }, timeout);
            _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.all(_this._buffer)
                .then(function () {
                clearTimeout(capturedSetTimeout);
                resolve(true);
            })
                .then(null, function () {
                resolve(true);
            });
        });
    };
    return PromiseBuffer;
}());

//# sourceMappingURL=promisebuffer.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/string.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/string.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "snipLine": () => (/* binding */ snipLine),
/* harmony export */   "safeJoin": () => (/* binding */ safeJoin),
/* harmony export */   "isMatchingPattern": () => (/* binding */ isMatchingPattern)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");

/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function truncate(str, max) {
    if (max === void 0) { max = 0; }
    // tslint:disable-next-line:strict-type-predicates
    if (typeof str !== 'string' || max === 0) {
        return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "...";
}
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function snipLine(line, colno) {
    var newLine = line;
    var ll = newLine.length;
    if (ll <= 150) {
        return newLine;
    }
    if (colno > ll) {
        colno = ll; // tslint:disable-line:no-parameter-reassignment
    }
    var start = Math.max(colno - 60, 0);
    if (start < 5) {
        start = 0;
    }
    var end = Math.min(start + 140, ll);
    if (end > ll - 5) {
        end = ll;
    }
    if (end === ll) {
        start = Math.max(end - 140, 0);
    }
    newLine = newLine.slice(start, end);
    if (start > 0) {
        newLine = "'{snip} " + newLine;
    }
    if (end < ll) {
        newLine += ' {snip}';
    }
    return newLine;
}
/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */
function safeJoin(input, delimiter) {
    if (!Array.isArray(input)) {
        return '';
    }
    var output = [];
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < input.length; i++) {
        var value = input[i];
        try {
            output.push(String(value));
        }
        catch (e) {
            output.push('[value cannot be serialized]');
        }
    }
    return output.join(delimiter);
}
/**
 * Checks if the value matches a regex or includes the string
 * @param value The string value to be checked against
 * @param pattern Either a regex or a string that must be contained in value
 */
function isMatchingPattern(value, pattern) {
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isRegExp)(pattern)) {
        return pattern.test(value);
    }
    if (typeof pattern === 'string') {
        return value.indexOf(pattern) !== -1;
    }
    return false;
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/supports.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/supports.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "supportsErrorEvent": () => (/* binding */ supportsErrorEvent),
/* harmony export */   "supportsDOMError": () => (/* binding */ supportsDOMError),
/* harmony export */   "supportsDOMException": () => (/* binding */ supportsDOMException),
/* harmony export */   "supportsFetch": () => (/* binding */ supportsFetch),
/* harmony export */   "supportsNativeFetch": () => (/* binding */ supportsNativeFetch),
/* harmony export */   "supportsReportingObserver": () => (/* binding */ supportsReportingObserver),
/* harmony export */   "supportsReferrerPolicy": () => (/* binding */ supportsReferrerPolicy),
/* harmony export */   "supportsHistory": () => (/* binding */ supportsHistory)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");


/**
 * Tells whether current environment supports ErrorEvent objects
 * {@link supportsErrorEvent}.
 *
 * @returns Answer to the given question.
 */
function supportsErrorEvent() {
    try {
        // tslint:disable:no-unused-expression
        new ErrorEvent('');
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Tells whether current environment supports DOMError objects
 * {@link supportsDOMError}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMError() {
    try {
        // It really needs 1 argument, not 0.
        // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
        // 1 argument required, but only 0 present.
        // @ts-ignore
        // tslint:disable:no-unused-expression
        new DOMError('');
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Tells whether current environment supports DOMException objects
 * {@link supportsDOMException}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMException() {
    try {
        // tslint:disable:no-unused-expression
        new DOMException('');
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Tells whether current environment supports Fetch API
 * {@link supportsFetch}.
 *
 * @returns Answer to the given question.
 */
function supportsFetch() {
    if (!('fetch' in (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)())) {
        return false;
    }
    try {
        // tslint:disable-next-line:no-unused-expression
        new Headers();
        // tslint:disable-next-line:no-unused-expression
        new Request('');
        // tslint:disable-next-line:no-unused-expression
        new Response();
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * isNativeFetch checks if the given function is a native implementation of fetch()
 */
function isNativeFetch(func) {
    return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
/**
 * Tells whether current environment supports Fetch API natively
 * {@link supportsNativeFetch}.
 *
 * @returns true if `window.fetch` is natively implemented, false otherwise
 */
function supportsNativeFetch() {
    if (!supportsFetch()) {
        return false;
    }
    var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
    // Fast path to avoid DOM I/O
    // tslint:disable-next-line:no-unbound-method
    if (isNativeFetch(global.fetch)) {
        return true;
    }
    // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
    // so create a "pure" iframe to see if that has native fetch
    var result = false;
    var doc = global.document;
    if (doc) {
        var sandbox = doc.createElement('iframe');
        sandbox.hidden = true;
        try {
            doc.head.appendChild(sandbox);
            if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
                // tslint:disable-next-line:no-unbound-method
                result = isNativeFetch(sandbox.contentWindow.fetch);
            }
            doc.head.removeChild(sandbox);
        }
        catch (err) {
            _logger__WEBPACK_IMPORTED_MODULE_1__.logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
        }
    }
    return result;
}
/**
 * Tells whether current environment supports ReportingObserver API
 * {@link supportsReportingObserver}.
 *
 * @returns Answer to the given question.
 */
function supportsReportingObserver() {
    // tslint:disable-next-line: no-unsafe-any
    return 'ReportingObserver' in (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
}
/**
 * Tells whether current environment supports Referrer Policy API
 * {@link supportsReferrerPolicy}.
 *
 * @returns Answer to the given question.
 */
function supportsReferrerPolicy() {
    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
    // https://caniuse.com/#feat=referrer-policy
    // It doesn't. And it throw exception instead of ignoring this parameter...
    // REF: https://github.com/getsentry/raven-js/issues/1233
    if (!supportsFetch()) {
        return false;
    }
    try {
        // tslint:disable:no-unused-expression
        new Request('_', {
            referrerPolicy: 'origin',
        });
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Tells whether current environment supports History API
 * {@link supportsHistory}.
 *
 * @returns Answer to the given question.
 */
function supportsHistory() {
    // NOTE: in Chrome App environment, touching history.pushState, *even inside
    //       a try/catch block*, will cause Chrome to output an error to console.error
    // borrowed from: https://github.com/angular/angular.js/pull/13945/files
    var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
    var chrome = global.chrome;
    // tslint:disable-next-line:no-unsafe-any
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}
//# sourceMappingURL=supports.js.map

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/syncpromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/syncpromise.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncPromise": () => (/* binding */ SyncPromise)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");

/** SyncPromise internal states */
var States;
(function (States) {
    /** Pending */
    States["PENDING"] = "PENDING";
    /** Resolved / OK */
    States["RESOLVED"] = "RESOLVED";
    /** Rejected / Error */
    States["REJECTED"] = "REJECTED";
})(States || (States = {}));
/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */
var SyncPromise = /** @class */ (function () {
    function SyncPromise(executor) {
        var _this = this;
        this._state = States.PENDING;
        this._handlers = [];
        /** JSDoc */
        this._resolve = function (value) {
            _this._setResult(States.RESOLVED, value);
        };
        /** JSDoc */
        this._reject = function (reason) {
            _this._setResult(States.REJECTED, reason);
        };
        /** JSDoc */
        this._setResult = function (state, value) {
            if (_this._state !== States.PENDING) {
                return;
            }
            if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isThenable)(value)) {
                value.then(_this._resolve, _this._reject);
                return;
            }
            _this._state = state;
            _this._value = value;
            _this._executeHandlers();
        };
        // TODO: FIXME
        /** JSDoc */
        this._attachHandler = function (handler) {
            _this._handlers = _this._handlers.concat(handler);
            _this._executeHandlers();
        };
        /** JSDoc */
        this._executeHandlers = function () {
            if (_this._state === States.PENDING) {
                return;
            }
            if (_this._state === States.REJECTED) {
                _this._handlers.forEach(function (handler) {
                    if (handler.onrejected) {
                        handler.onrejected(_this._value);
                    }
                });
            }
            else {
                _this._handlers.forEach(function (handler) {
                    if (handler.onfulfilled) {
                        // tslint:disable-next-line:no-unsafe-any
                        handler.onfulfilled(_this._value);
                    }
                });
            }
            _this._handlers = [];
        };
        try {
            executor(this._resolve, this._reject);
        }
        catch (e) {
            this._reject(e);
        }
    }
    /** JSDoc */
    SyncPromise.prototype.toString = function () {
        return '[object SyncPromise]';
    };
    /** JSDoc */
    SyncPromise.resolve = function (value) {
        return new SyncPromise(function (resolve) {
            resolve(value);
        });
    };
    /** JSDoc */
    SyncPromise.reject = function (reason) {
        return new SyncPromise(function (_, reject) {
            reject(reason);
        });
    };
    /** JSDoc */
    SyncPromise.all = function (collection) {
        return new SyncPromise(function (resolve, reject) {
            if (!Array.isArray(collection)) {
                reject(new TypeError("Promise.all requires an array as input."));
                return;
            }
            if (collection.length === 0) {
                resolve([]);
                return;
            }
            var counter = collection.length;
            var resolvedCollection = [];
            collection.forEach(function (item, index) {
                SyncPromise.resolve(item)
                    .then(function (value) {
                    resolvedCollection[index] = value;
                    counter -= 1;
                    if (counter !== 0) {
                        return;
                    }
                    resolve(resolvedCollection);
                })
                    .then(null, reject);
            });
        });
    };
    /** JSDoc */
    SyncPromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        return new SyncPromise(function (resolve, reject) {
            _this._attachHandler({
                onfulfilled: function (result) {
                    if (!onfulfilled) {
                        // TODO: ¯\_(ツ)_/¯
                        // TODO: FIXME
                        resolve(result);
                        return;
                    }
                    try {
                        resolve(onfulfilled(result));
                        return;
                    }
                    catch (e) {
                        reject(e);
                        return;
                    }
                },
                onrejected: function (reason) {
                    if (!onrejected) {
                        reject(reason);
                        return;
                    }
                    try {
                        resolve(onrejected(reason));
                        return;
                    }
                    catch (e) {
                        reject(e);
                        return;
                    }
                },
            });
        });
    };
    /** JSDoc */
    SyncPromise.prototype.catch = function (onrejected) {
        return this.then(function (val) { return val; }, onrejected);
    };
    /** JSDoc */
    SyncPromise.prototype.finally = function (onfinally) {
        var _this = this;
        return new SyncPromise(function (resolve, reject) {
            var val;
            var isRejected;
            return _this.then(function (value) {
                isRejected = false;
                val = value;
                if (onfinally) {
                    onfinally();
                }
            }, function (reason) {
                isRejected = true;
                val = reason;
                if (onfinally) {
                    onfinally();
                }
            }).then(function () {
                if (isRejected) {
                    reject(val);
                    return;
                }
                // tslint:disable-next-line:no-unsafe-any
                resolve(val);
            });
        });
    };
    return SyncPromise;
}());

//# sourceMappingURL=syncpromise.js.map

/***/ }),

/***/ "./node_modules/axios-retry/index.js":
/*!*******************************************!*\
  !*** ./node_modules/axios-retry/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/axios-retry/lib/index.js")["default"];

/***/ }),

/***/ "./node_modules/axios-retry/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/axios-retry/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isNetworkError = isNetworkError;
exports.isRetryableError = isRetryableError;
exports.isSafeRequestError = isSafeRequestError;
exports.isIdempotentRequestError = isIdempotentRequestError;
exports.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
exports.exponentialDelay = exponentialDelay;
exports["default"] = axiosRetry;

var _isRetryAllowed = __webpack_require__(/*! is-retry-allowed */ "./node_modules/is-retry-allowed/index.js");

var _isRetryAllowed2 = _interopRequireDefault(_isRetryAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = 'axios-retry';

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isNetworkError(error) {
  return !error.response && Boolean(error.code) && // Prevents retrying cancelled requests
  error.code !== 'ECONNABORTED' && // Prevents retrying timed out requests
  (0, _isRetryAllowed2.default)(error); // Prevents retrying unsafe errors
}

var SAFE_HTTP_METHODS = ['get', 'head', 'options'];
var IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete']);

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isRetryableError(error) {
  return error.code !== 'ECONNABORTED' && (!error.response || error.response.status >= 500 && error.response.status <= 599);
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isSafeRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error.config.method) !== -1;
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isIdempotentRequestError(error) {
  if (!error.config) {
    // Cannot determine if the request can be retried
    return false;
  }

  return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError(error) || isIdempotentRequestError(error);
}

/**
 * @return {number} - delay in milliseconds, always 0
 */
function noDelay() {
  return 0;
}

/**
 * @param  {number} [retryNumber=0]
 * @return {number} - delay in milliseconds
 */
function exponentialDelay() {
  var retryNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var delay = Math.pow(2, retryNumber) * 100;
  var randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
  return delay + randomSum;
}

/**
 * Initializes and returns the retry state for the given request/config
 * @param  {AxiosRequestConfig} config
 * @return {Object}
 */
function getCurrentState(config) {
  var currentState = config[namespace] || {};
  currentState.retryCount = currentState.retryCount || 0;
  config[namespace] = currentState;
  return currentState;
}

/**
 * Returns the axios-retry options for the current request
 * @param  {AxiosRequestConfig} config
 * @param  {AxiosRetryConfig} defaultOptions
 * @return {AxiosRetryConfig}
 */
function getRequestOptions(config, defaultOptions) {
  return Object.assign({}, defaultOptions, config[namespace]);
}

/**
 * @param  {Axios} axios
 * @param  {AxiosRequestConfig} config
 */
function fixConfig(axios, config) {
  if (axios.defaults.agent === config.agent) {
    delete config.agent;
  }
  if (axios.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axios.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}

/**
 * Adds response interceptors to an axios instance to retry requests failed due to network issues
 *
 * @example
 *
 * import axios from 'axios';
 *
 * axiosRetry(axios, { retries: 3 });
 *
 * axios.get('http://example.com/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Exponential back-off retry delay between requests
 * axiosRetry(axios, { retryDelay : axiosRetry.exponentialDelay});
 *
 * // Custom retry delay
 * axiosRetry(axios, { retryDelay : (retryCount) => {
 *   return retryCount * 1000;
 * }});
 *
 * // Also works with custom axios instances
 * const client = axios.create({ baseURL: 'http://example.com' });
 * axiosRetry(client, { retries: 3 });
 *
 * client.get('/test') // The first request fails and the second returns 'ok'
 *   .then(result => {
 *     result.data; // 'ok'
 *   });
 *
 * // Allows request-specific configuration
 * client
 *   .get('/test', {
 *     'axios-retry': {
 *       retries: 0
 *     }
 *   })
 *   .catch(error => { // The first request fails
 *     error !== undefined
 *   });
 *
 * @param {Axios} axios An axios instance (the axios object or one created from axios.create)
 * @param {Object} [defaultOptions]
 * @param {number} [defaultOptions.retries=3] Number of retries
 * @param {boolean} [defaultOptions.shouldResetTimeout=false]
 *        Defines if the timeout should be reset between retries
 * @param {Function} [defaultOptions.retryCondition=isNetworkOrIdempotentRequestError]
 *        A function to determine if the error can be retried
 * @param {Function} [defaultOptions.retryDelay=noDelay]
 *        A function to determine the delay between retry requests
 */
function axiosRetry(axios, defaultOptions) {
  axios.interceptors.request.use(function (config) {
    var currentState = getCurrentState(config);
    currentState.lastRequestTime = Date.now();
    return config;
  });

  axios.interceptors.response.use(null, function (error) {
    var config = error.config;

    // If we have no information to retry the request
    if (!config) {
      return Promise.reject(error);
    }

    var _getRequestOptions = getRequestOptions(config, defaultOptions),
        _getRequestOptions$re = _getRequestOptions.retries,
        retries = _getRequestOptions$re === undefined ? 3 : _getRequestOptions$re,
        _getRequestOptions$re2 = _getRequestOptions.retryCondition,
        retryCondition = _getRequestOptions$re2 === undefined ? isNetworkOrIdempotentRequestError : _getRequestOptions$re2,
        _getRequestOptions$re3 = _getRequestOptions.retryDelay,
        retryDelay = _getRequestOptions$re3 === undefined ? noDelay : _getRequestOptions$re3,
        _getRequestOptions$sh = _getRequestOptions.shouldResetTimeout,
        shouldResetTimeout = _getRequestOptions$sh === undefined ? false : _getRequestOptions$sh;

    var currentState = getCurrentState(config);

    var shouldRetry = retryCondition(error) && currentState.retryCount < retries;

    if (shouldRetry) {
      currentState.retryCount += 1;
      var delay = retryDelay(currentState.retryCount, error);

      // Axios fails merging this configuration to the default configuration because it has an issue
      // with circular structures: https://github.com/mzabriskie/axios/issues/370
      fixConfig(axios, config);

      if (!shouldResetTimeout && config.timeout && currentState.lastRequestTime) {
        var lastRequestDuration = Date.now() - currentState.lastRequestTime;
        // Minimum 1ms timeout (passing 0 or less to XHR means no timeout)
        config.timeout = Math.max(config.timeout - lastRequestDuration - delay, 1);
      }

      config.transformRequest = [function (data) {
        return data;
      }];

      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(axios(config));
        }, delay);
      });
    }

    return Promise.reject(error);
  });
}

// Compatibility with CommonJS
axiosRetry.isNetworkError = isNetworkError;
axiosRetry.isSafeRequestError = isSafeRequestError;
axiosRetry.isIdempotentRequestError = isIdempotentRequestError;
axiosRetry.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
axiosRetry.exponentialDelay = exponentialDelay;
axiosRetry.isRetryableError = isRetryableError;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/core-js/es/object/assign.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/object/assign.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../modules/es.object.assign */ "./node_modules/core-js/modules/es.object.assign.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Object.assign;


/***/ }),

/***/ "./node_modules/core-js/es/promise/index.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/promise/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../modules/es.aggregate-error */ "./node_modules/core-js/modules/es.aggregate-error.js");
__webpack_require__(/*! ../../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! ../../modules/es.promise.all-settled */ "./node_modules/core-js/modules/es.promise.all-settled.js");
__webpack_require__(/*! ../../modules/es.promise.any */ "./node_modules/core-js/modules/es.promise.any.js");
__webpack_require__(/*! ../../modules/es.promise.finally */ "./node_modules/core-js/modules/es.promise.finally.js");
__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Promise;


/***/ }),

/***/ "./node_modules/core-js/es/symbol/key-for.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/es/symbol/key-for.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Symbol.keyFor;


/***/ }),

/***/ "./node_modules/core-js/features/map/of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/features/map/of.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! ../../modules/es.map */ "./node_modules/core-js/modules/es.map.js");
__webpack_require__(/*! ../../modules/esnext.map.of */ "./node_modules/core-js/modules/esnext.map.of.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

var Map = path.Map;
var mapOf = Map.of;

module.exports = function of() {
  return mapOf.apply(typeof this === 'function' ? this : Map, arguments);
};


/***/ }),

/***/ "./node_modules/core-js/features/object/assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/features/object/assign.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../stable/object/assign */ "./node_modules/core-js/stable/object/assign.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js/features/symbol/key-for.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/features/symbol/key-for.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../stable/symbol/key-for */ "./node_modules/core-js/stable/symbol/key-for.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-constructor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-constructor.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "./node_modules/core-js/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection-of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/collection-of.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function of() {
  var length = arguments.length;
  var A = new Array(length);
  while (length--) A[length] = arguments[length];
  return new this(A);
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection-strong.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/collection-strong.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fastKey = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").fastKey;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/collection.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-well-known-symbol.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-browser.js ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = typeof window == 'object';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios-pebble.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios-pebble.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-webos-webkit.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/freezing.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/freezing.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

module.exports = function (it, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(it) : usingIterator;
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-metadata.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/internal-metadata.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternalModule = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "./node_modules/core-js/internals/object-get-own-property-names-external.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "./node_modules/core-js/internals/freezing.js");

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = [].splice;
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice.call(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterator-close.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-close.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = iterator['return'];
    if (innerResult === undefined) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_IOS_PEBBLE = __webpack_require__(/*! ../internals/engine-is-ios-pebble */ "./node_modules/core-js/internals/engine-is-ios-pebble.js");
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "./node_modules/core-js/internals/engine-is-webos-webkit.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-promise-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/native-promise-constructor.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global.Promise;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names-external.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var $getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.17.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.codePointAt` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;
  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

module.exports = function (argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol-wrapped.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol-wrapped.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.aggregate-error.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.aggregate-error.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', toString(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true }, {
  AggregateError: $AggregateError
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es.map.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/es.map.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js");
var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "./node_modules/core-js/internals/collection-strong.js");

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
module.exports = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.all-settled.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.all-settled.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.any.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.any.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.finally.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.finally.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && typeof NativePromise == 'function') {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "./node_modules/core-js/internals/engine-is-browser.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var $toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "./node_modules/core-js/internals/object-get-own-property-names-external.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "./node_modules/core-js/modules/esnext.map.of.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.map.of.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var of = __webpack_require__(/*! ../internals/collection-of */ "./node_modules/core-js/internals/collection-of.js");

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true }, {
  of: of
});


/***/ }),

/***/ "./node_modules/core-js/stable/object/assign.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/stable/object/assign.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/object/assign */ "./node_modules/core-js/es/object/assign.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js/stable/symbol/key-for.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/stable/symbol/key-for.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/symbol/key-for */ "./node_modules/core-js/es/symbol/key-for.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/is-retry-allowed/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-retry-allowed/index.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


var WHITELIST = [
	'ETIMEDOUT',
	'ECONNRESET',
	'EADDRINUSE',
	'ESOCKETTIMEDOUT',
	'ECONNREFUSED',
	'EPIPE',
	'EHOSTUNREACH',
	'EAI_AGAIN'
];

var BLACKLIST = [
	'ENOTFOUND',
	'ENETUNREACH',

	// SSL errors from https://github.com/nodejs/node/blob/ed3d8b13ee9a705d89f9e0397d9e96519e7e47ac/src/node_crypto.cc#L1950
	'UNABLE_TO_GET_ISSUER_CERT',
	'UNABLE_TO_GET_CRL',
	'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
	'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
	'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
	'CERT_SIGNATURE_FAILURE',
	'CRL_SIGNATURE_FAILURE',
	'CERT_NOT_YET_VALID',
	'CERT_HAS_EXPIRED',
	'CRL_NOT_YET_VALID',
	'CRL_HAS_EXPIRED',
	'ERROR_IN_CERT_NOT_BEFORE_FIELD',
	'ERROR_IN_CERT_NOT_AFTER_FIELD',
	'ERROR_IN_CRL_LAST_UPDATE_FIELD',
	'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
	'OUT_OF_MEM',
	'DEPTH_ZERO_SELF_SIGNED_CERT',
	'SELF_SIGNED_CERT_IN_CHAIN',
	'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
	'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
	'CERT_CHAIN_TOO_LONG',
	'CERT_REVOKED',
	'INVALID_CA',
	'PATH_LENGTH_EXCEEDED',
	'INVALID_PURPOSE',
	'CERT_UNTRUSTED',
	'CERT_REJECTED'
];

module.exports = function (err) {
	if (!err || !err.code) {
		return true;
	}

	if (WHITELIST.indexOf(err.code) !== -1) {
		return true;
	}

	if (BLACKLIST.indexOf(err.code) !== -1) {
		return false;
	}

	return true;
};


/***/ }),

/***/ "./node_modules/jwt-decode/lib/atob.js":
/*!*********************************************!*\
  !*** ./node_modules/jwt-decode/lib/atob.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),

/***/ "./node_modules/jwt-decode/lib/base64_url_decode.js":
/*!**********************************************************!*\
  !*** ./node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var atob = __webpack_require__(/*! ./atob */ "./node_modules/jwt-decode/lib/atob.js");

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),

/***/ "./node_modules/jwt-decode/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jwt-decode/lib/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ "./node_modules/jwt-decode/lib/base64_url_decode.js");

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ "./src/Entry.ts":
/*!**********************!*\
  !*** ./src/Entry.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*
    MIT License

    Copyright (c) 2019 Imposium

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerEvents = exports.Events = exports.Player = exports.DirectClient = exports.Client = void 0;
__webpack_require__(/*! core-js/es/promise */ "./node_modules/core-js/es/promise/index.js");
__webpack_require__(/*! core-js/features/symbol/key-for */ "./node_modules/core-js/features/symbol/key-for.js");
__webpack_require__(/*! core-js/features/map/of */ "./node_modules/core-js/features/map/of.js");
__webpack_require__(/*! core-js/features/object/assign */ "./node_modules/core-js/features/object/assign.js");
var Client_1 = __webpack_require__(/*! ./client/Client */ "./src/client/Client.ts");
exports.Client = Client_1.default;
var DirectClient_1 = __webpack_require__(/*! ./client/DirectClient */ "./src/client/DirectClient.ts");
exports.DirectClient = DirectClient_1.default;
var Player_1 = __webpack_require__(/*! ./video/Player */ "./src/video/Player.ts");
exports.Player = Player_1.default;
var Version_1 = __webpack_require__(/*! ./scaffolding/Version */ "./src/scaffolding/Version.ts");
Version_1.printVersion();
var _a = __read([__assign({}, Client_1.default.eventNames), __assign({}, Player_1.default.events)], 2), clientEvents = _a[0], playerEvents = _a[1];
exports.Events = clientEvents;
exports.PlayerEvents = playerEvents;


/***/ }),

/***/ "./src/client/Client.ts":
/*!******************************!*\
  !*** ./src/client/Client.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var API_1 = __webpack_require__(/*! ./http/API */ "./src/client/http/API.ts");
var FallbackPlayer_1 = __webpack_require__(/*! ../video/FallbackPlayer */ "./src/video/FallbackPlayer.ts");
var GoogleAnalytics_1 = __webpack_require__(/*! ../scaffolding/GoogleAnalytics */ "./src/scaffolding/GoogleAnalytics.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var DeliveryPipe_1 = __webpack_require__(/*! ./DeliveryPipe */ "./src/client/DeliveryPipe.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __rest(__webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").client, []);
var Client = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function Client(config) {
        var _this = this;
        this.clientConfig = undefined;
        this.gaProperty = '';
        this.deliveryPipe = undefined;
        this.player = undefined;
        this.renderHistory = settings.emptyHistory;
        this.emits = settings.clientEmits;
        this.eventDelegateRefs = Helpers_1.cloneWithKeys(Client.eventNames);
        this.playerIsFallback = false;
        /*
            Exposed for users who may want to re-use a client for n stories
         */
        this.setup = function (config) {
            var defaultConfig = settings.defaultConfig;
            var prevConfig = _this.clientConfig || settings.defaultConfig;
            var clientDelegates = new Map();
            var api = null;
            try {
                if (typeof config !== 'object') {
                    throw new Exceptions_1.ClientConfigurationError('badConfig', null);
                }
                if (!config.hasOwnProperty('storyId') || typeof config.storyId !== 'string') {
                    throw new Exceptions_1.ClientConfigurationError('storyId', null);
                }
                if (!config.hasOwnProperty('accessToken') || typeof config.accessToken !== 'string') {
                    throw new Exceptions_1.ClientConfigurationError('accessToken', null);
                }
                Helpers_1.prepConfig(config, defaultConfig);
                _this.clientConfig = __assign(__assign({}, prevConfig), config);
                api = new API_1.default(_this.clientConfig.accessToken, _this.clientConfig.environment, _this.clientConfig.storyId, _this.clientConfig.compositionId);
                clientDelegates.set('experienceCreated', function (e) { return _this.experienceCreated(e); });
                clientDelegates.set('gotExperience', function (e) { return _this.gotExperience(e); });
                clientDelegates.set('gotMessage', function (m) { return _this.gotMessage(m); });
                clientDelegates.set('internalError', function (e) { return _this.internalError(e); });
                _this.deliveryPipe = new DeliveryPipe_1.default({
                    api: api,
                    clientDelegates: clientDelegates,
                    environment: _this.clientConfig.environment,
                });
                _this.deliveryPipe.setMode(_this.clientConfig.deliveryMode);
                _this.deliveryPipe.setTimeoutInterval(_this.clientConfig.pollRate);
                api.getGAProperty()
                    .then(function (story) {
                    var property = story.gaTrackingId;
                    if (typeof property === 'string' && property.length > 0) {
                        GoogleAnalytics_1.default.initialize(_this.clientConfig.gaPlacement);
                        _this.gaProperty = property;
                        if (typeof _this.player !== 'undefined') {
                            _this.player.setGaProperty(property);
                        }
                    }
                })
                    .catch(function (e) {
                    var wrappedError = new Exceptions_1.HTTPError('httpFailure', null, e);
                    ExceptionPipe_1.default.trapError(wrappedError, _this.clientConfig.storyId, null);
                });
            }
            catch (e) {
                var storyId = (config && config.storyId) ? config.storyId : '';
                ExceptionPipe_1.default.trapError(e, storyId);
            }
        };
        /*
            Bind player to client
         */
        this.bindPlayer = function (player, isFallback) {
            if (isFallback === void 0) { isFallback = false; }
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                _this.playerIsFallback = isFallback;
                _this.player = player;
                player.setStoryId(storyId);
                if (_this.gaProperty) {
                    player.setGaProperty(_this.gaProperty);
                }
            }
        };
        /*
            Sets a callback for an event
         */
        this.on = function (eventName, callback) {
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (!Helpers_1.isFunc(callback)) {
                        throw new Exceptions_1.ClientConfigurationError('invalidCallbackType', eventName);
                    }
                    if (!Helpers_1.keyExists(Client.eventNames, eventName)) {
                        throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                    }
                    eventDelegateRefs[eventName] = callback;
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Turns off a specific event or all events
         */
        this.off = function (eventName) {
            if (eventName === void 0) { eventName = ''; }
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (eventName) {
                        if (Helpers_1.keyExists(Client.eventNames, eventName)) {
                            eventDelegateRefs[eventName] = null;
                        }
                        else {
                            throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                        }
                    }
                    else {
                        Object.keys(Client.eventNames).forEach(function (event) {
                            eventDelegateRefs[event] = null;
                        });
                    }
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Sets up analytics using fallback video player wrapper class
         */
        this.captureAnalytics = function (playerRef) {
            if (playerRef === void 0) { playerRef = null; }
            var ERROR = _this.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (playerRef instanceof HTMLVideoElement) {
                        _this.bindPlayer(new FallbackPlayer_1.default(playerRef), true);
                    }
                    else {
                        // Prop passed wasn't of type HTMLVideoElement
                        throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
                    }
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Call exposed to users that fetches experience data
         */
        this.getExperience = function (experienceId) {
            if (_this.clientConfig) {
                var _a = _this, player = _a.player, storyId = _a.clientConfig.storyId, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
                try {
                    if (player === null && !Helpers_1.isFunc(GOT_EXPERIENCE)) {
                        throw new Exceptions_1.ClientConfigurationError('badConfigOnGet', Client.eventNames.GOT_EXPERIENCE);
                    }
                    if (experienceId.length > settings.uuidLength) {
                        experienceId = experienceId.substring(0, settings.uuidLength);
                    }
                    _this.deliveryPipe.doGetExperience(experienceId);
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Creates exposed to users that creates experiences and handles various render flows
         */
        this.createExperience = function (inventory, render) {
            if (render === void 0) { render = true; }
            if (_this.clientConfig) {
                var _a = _this, player = _a.player, playerIsFallback = _a.playerIsFallback, storyId = _a.clientConfig.storyId, adding = _a.emits.adding, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, EXPERIENCE_CREATED = _b.EXPERIENCE_CREATED, UPLOAD_PROGRESS = _b.UPLOAD_PROGRESS, ERROR = _b.ERROR;
                try {
                    // Ensures at least experience created is set if doing two stage render
                    if (!render && !Helpers_1.isFunc(EXPERIENCE_CREATED)) {
                        throw new Exceptions_1.ClientConfigurationError('badConfigOnPostNoRender', Client.eventNames.EXPERIENCE_CREATED);
                    }
                    // Ensures config error throws if not using our player / GOT_EXPERIENCE isn't set or set correctly
                    if (render && ((player === null || playerIsFallback) && !Helpers_1.isFunc(GOT_EXPERIENCE))) {
                        throw new Exceptions_1.ClientConfigurationError('bagConfigOnPostRender', Client.eventNames.GOT_EXPERIENCE);
                    }
                    // If rendering immediately, notify user the input was ingested
                    if (render) {
                        _this.gotMessage({ id: undefined, status: adding });
                    }
                    _this.deliveryPipe.createPrestep(inventory, render, UPLOAD_PROGRESS);
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Update render history state, prevents storing duplicates
         */
        this.updateHistory = function (key, value) {
            if (_this.renderHistory[key] !== value) {
                _this.renderHistory[key] = value;
            }
        };
        /*
            Handler for emitting expereince data on first creation
         */
        this.experienceCreated = function (experience) {
            var _a = _this, _b = _a.emits, adding = _b.adding, added = _b.added, prevMessage = _a.renderHistory.prevMessage, _c = _a.eventDelegateRefs, EXPERIENCE_CREATED = _c.EXPERIENCE_CREATED, STATUS_UPDATE = _c.STATUS_UPDATE;
            var id = experience.id;
            if (Helpers_1.isFunc(EXPERIENCE_CREATED)) {
                EXPERIENCE_CREATED(experience);
            }
            if ((prevMessage === adding || !prevMessage)) {
                _this.gotMessage({ id: id, status: added });
            }
            _this.updateHistory('prevExperienceId', id);
        };
        /*
            Handler for validating and deferring / emitting experience data after rendering is complete
         */
        this.gotExperience = function (experience) {
            var _a = _this, player = _a.player, storyId = _a.clientConfig.storyId, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR, _c = _a.emits, added = _c.added, finishedPolling = _c.finishedPolling, prevMessage = _a.renderHistory.prevMessage;
            var id = experience.id, output = experience.output, rendering = experience.rendering, moderation_status = experience.moderation_status;
            try {
                if (moderation_status === 'rejected') {
                    throw new Exceptions_1.ModerationError('rejection', id);
                }
                if (prevMessage === added) {
                    _this.gotMessage({ id: id, status: finishedPolling });
                }
                if (Helpers_1.isFunc(GOT_EXPERIENCE)) {
                    GOT_EXPERIENCE(experience);
                }
                if (typeof player !== 'undefined') {
                    player.experienceGenerated(experience);
                }
                _this.updateHistory('prevExperienceId', id);
                _this.updateHistory('prevMessage', '');
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Handler for emitting message data
         */
        this.gotMessage = function (message) {
            var STATUS_UPDATE = _this.eventDelegateRefs.STATUS_UPDATE;
            if (Helpers_1.isFunc(STATUS_UPDATE)) {
                STATUS_UPDATE(message);
                _this.updateHistory('prevMessage', message.status);
            }
        };
        /*
            Handler for handling async internal errors
         */
        this.internalError = function (e) {
            var _a = _this, storyId = _a.clientConfig.storyId, ERROR = _a.eventDelegateRefs.ERROR;
            ExceptionPipe_1.default.trapError(e, storyId, ERROR);
        };
        this.setup(config);
    }
    Client.eventNames = settings.eventNames;
    return Client;
}());
exports["default"] = Client;


/***/ }),

/***/ "./src/client/DeliveryPipe.ts":
/*!************************************!*\
  !*** ./src/client/DeliveryPipe.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Consumer_1 = __webpack_require__(/*! ./stomp/Consumer */ "./src/client/stomp/Consumer.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var DeliveryPipe = /** @class */ (function () {
    function DeliveryPipe(c) {
        var _this = this;
        this.mode = '';
        this.environment = '';
        this.shortPollTimeout = -1;
        this.pollInterval = 5000;
        this.api = null;
        this.consumer = null;
        this.clientDelegates = null;
        this.configCache = new Map();
        /*
            Used to override the default WS mode if required
         */
        this.setMode = function (mode) {
            _this.mode = mode;
        };
        /*
            Set poll interval time in seconds
         */
        this.setTimeoutInterval = function (interval) {
            _this.pollInterval = interval;
        };
        /*
            Fetch an Experience from the Imposium API, kill poll on finished render if in poll mode
         */
        this.doGetExperience = function (experienceId) {
            _this.api.get(experienceId)
                .then(function (exp) {
                var output = exp.output, rendering = exp.rendering;
                var hasOutput = (typeof output !== 'undefined' && Object.keys(output).length > 0);
                // Rendered resource was requested
                if (hasOutput) {
                    clearTimeout(_this.shortPollTimeout);
                    _this.clientDelegates.get('gotExperience')(exp);
                }
                // Resource where rendering is deferred was first requested
                if (!hasOutput && !rendering) {
                    _this.startRender(experienceId);
                }
                // Resource was requested during render job
                if (!hasOutput && rendering) {
                    _this.consumeOnRefresh(experienceId);
                }
            })
                .catch(function (e) {
                var httpError = new Exceptions_1.HTTPError('httpFailure', experienceId, e);
                _this.clientDelegates.get('internalError')(httpError);
            });
        };
        /*
            Run config for create call through delivery gateways
         */
        this.createPrestep = function (inventory, render, uploadProgress, retryOnCollision) {
            if (retryOnCollision === void 0) { retryOnCollision = 0; }
            var uuid = Helpers_1.generateUUID();
            var config = { inventory: inventory, render: render, uuid: uuid, uploadProgress: uploadProgress };
            clearTimeout(_this.shortPollTimeout);
            if (!render) {
                _this.doCreate(config, false, retryOnCollision);
            }
            if (render && _this.mode === DeliveryPipe.POLL_MODE) {
                _this.doCreate(config, true, retryOnCollision);
            }
            if (render && _this.mode === DeliveryPipe.WS_MODE) {
                // Cache inventory temporarily incase socket connection fails
                _this.configCache.set(uuid, config);
                _this.startConsumer(uuid)
                    .then(function () { return _this.doCreate(config, false, retryOnCollision); });
            }
        };
        /*
            Render once a resource is explicitly requested
         */
        this.startRender = function (experienceId) {
            if (_this.mode === DeliveryPipe.WS_MODE) {
                _this.startConsumer(experienceId)
                    .then(function () {
                    _this.api.triggerRender(experienceId)
                        .catch(function (e) {
                        var httpError = new Exceptions_1.HTTPError('httpFailure', experienceId, e);
                        _this.killConsumer();
                        _this.clientDelegates.get('internalError')(httpError);
                    });
                });
            }
            else {
                _this.api.triggerRender(experienceId)
                    .then(function () {
                    _this.doGetExperience(experienceId);
                })
                    .catch(function (e) {
                    var httpError = new Exceptions_1.HTTPError('httpFailure', experienceId, e);
                    _this.clientDelegates.get('internalError')(httpError);
                });
            }
        };
        /*
            Start a consumer or short poll if an experience is requested mid-render
         */
        this.consumeOnRefresh = function (experienceId) {
            if (_this.mode === DeliveryPipe.WS_MODE) {
                _this.startConsumer(experienceId);
            }
            else {
                clearTimeout(_this.shortPollTimeout);
                _this.shortPollTimeout = window.setTimeout(function () { return _this.doGetExperience(experienceId); }, _this.pollInterval);
            }
        };
        /*
            POST data to Imposium server, create experience record, defer and or poll on success
         */
        this.doCreate = function (config, startShortPoll, retried) {
            if (startShortPoll === void 0) { startShortPoll = false; }
            var inventory = config.inventory, render = config.render, uuid = config.uuid, uploadProgress = config.uploadProgress;
            _this.api.create(inventory, render, uuid, uploadProgress)
                .then(function (e) {
                _this.configCache.delete(uuid);
                if (startShortPoll) {
                    _this.doGetExperience(e.id);
                }
                _this.clientDelegates.get('experienceCreated')(e);
            })
                .catch(function (e) {
                if (e.response && e.response.status === 400 && retried < 3) {
                    _this.configCache.delete(uuid);
                    retried = retried + 1;
                    _this.killConsumer()
                        .then(function () {
                        _this.createPrestep(config.inventory, config.render, config.uploadProgress, retried);
                    });
                }
                else {
                    var httpError = new Exceptions_1.HTTPError('httpFailure', uuid, e);
                    _this.clientDelegates.get('internalError')(httpError);
                    _this.killConsumer();
                }
            });
        };
        /*
            Defers client handlers to STOMP consumer for delivering message & experience
            data. An additional delegate is appended to handle total socket failures.
            At that point short polling will begin as a fallback to a WS.
         */
        this.startConsumer = function (experienceId) {
            var _a = _this, cD = _a.clientDelegates, environment = _a.environment;
            var deliveryDelegates = new Map();
            deliveryDelegates.set('gotExperience', function (e) { return cD.get('gotExperience')(e); });
            deliveryDelegates.set('gotMessage', function (m) { return cD.get('gotMessage')(m); });
            deliveryDelegates.set('internalError', function (e) { return cD.get('internalError')(e); });
            deliveryDelegates.set('consumerFailure', function (expId, e) { return _this.consumerFailure(expId, e); });
            return new Promise(function (resolve) {
                _this.killConsumer()
                    .then(function () {
                    _this.consumer = new Consumer_1.default({
                        experienceId: experienceId,
                        environment: environment,
                        deliveryDelegates: deliveryDelegates
                    });
                    _this.consumer.connect()
                        .then(function () {
                        resolve();
                    });
                });
            });
        };
        /*
            Force STOMP handshake / WS connection
         */
        this.killConsumer = function () {
            return new Promise(function (resolve) {
                if (!_this.consumer) {
                    return resolve();
                }
                else {
                    _this.consumer.destroy()
                        .then(function () {
                        _this.consumer = null;
                        return resolve();
                    });
                }
            });
        };
        /*
            Special handler for total socket failures, falls back do doing a short poll.
            This can happen with aggressive firewalls / proxy servers.
         */
        this.consumerFailure = function (experienceId, e) {
            var cachedConfig = _this.configCache.get(experienceId);
            _this.setMode(DeliveryPipe.POLL_MODE);
            if (e.wasConnected) {
                _this.clientDelegates.get('internalError')(e);
            }
            if (typeof cachedConfig !== 'undefined') {
                _this.configCache.delete(experienceId);
                _this.createPrestep(cachedConfig.inventory, cachedConfig.render, cachedConfig.uploadProgress);
            }
            else {
                _this.doGetExperience(experienceId);
            }
        };
        this.api = c.api;
        this.clientDelegates = c.clientDelegates;
        this.environment = c.environment;
    }
    DeliveryPipe.WS_MODE = 'ws';
    DeliveryPipe.POLL_MODE = 'poll';
    return DeliveryPipe;
}());
exports["default"] = DeliveryPipe;


/***/ }),

/***/ "./src/client/DirectClient.ts":
/*!************************************!*\
  !*** ./src/client/DirectClient.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var API_1 = __webpack_require__(/*! ./http/API */ "./src/client/http/API.ts");
var FallbackPlayer_1 = __webpack_require__(/*! ../video/FallbackPlayer */ "./src/video/FallbackPlayer.ts");
var GoogleAnalytics_1 = __webpack_require__(/*! ../scaffolding/GoogleAnalytics */ "./src/scaffolding/GoogleAnalytics.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var DirectDeliveryPipe_1 = __webpack_require__(/*! ./DirectDeliveryPipe */ "./src/client/DirectDeliveryPipe.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __rest(__webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").client, []);
var DirectClient = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function DirectClient(config) {
        var _this = this;
        this.clientConfig = undefined;
        this.gaProperty = '';
        this.DirectDeliveryPipe = undefined;
        this.player = undefined;
        this.renderHistory = settings.emptyHistory;
        this.emits = settings.clientEmits;
        this.eventDelegateRefs = Helpers_1.cloneWithKeys(DirectClient.eventNames);
        this.playerIsFallback = false;
        /*
            Exposed for users who may want to re-use a client for n stories
         */
        this.setup = function (config) {
            var defaultConfig = settings.defaultConfig;
            var prevConfig = _this.clientConfig || settings.defaultConfig;
            var clientDelegates = new Map();
            var api = null;
            try {
                if (typeof config !== 'object') {
                    throw new Exceptions_1.ClientConfigurationError('badConfig', null);
                }
                if (!config.hasOwnProperty('storyId') || typeof config.storyId !== 'string') {
                    throw new Exceptions_1.ClientConfigurationError('storyId', null);
                }
                if (!config.hasOwnProperty('accessToken') || typeof config.accessToken !== 'string') {
                    throw new Exceptions_1.ClientConfigurationError('accessToken', null);
                }
                Helpers_1.prepConfig(config, defaultConfig);
                _this.clientConfig = __assign(__assign({}, prevConfig), config);
                api = new API_1.default(_this.clientConfig.accessToken, _this.clientConfig.environment, _this.clientConfig.storyId, _this.clientConfig.compositionId);
                clientDelegates.set('experienceCreated', function (e) { return _this.experienceCreated(e); });
                clientDelegates.set('gotExperience', function (e) { return _this.gotExperience(e); });
                clientDelegates.set('gotMessage', function (m) { return _this.gotMessage(m); });
                clientDelegates.set('internalError', function (e) { return _this.internalError(e); });
                _this.DirectDeliveryPipe = new DirectDeliveryPipe_1.default({
                    api: api,
                    clientDelegates: clientDelegates,
                    environment: _this.clientConfig.environment,
                });
                api.getGAProperty()
                    .then(function (story) {
                    var property = story.gaTrackingId;
                    if (typeof property === 'string' && property.length > 0) {
                        GoogleAnalytics_1.default.initialize(_this.clientConfig.gaPlacement);
                        _this.gaProperty = property;
                        if (typeof _this.player !== 'undefined') {
                            _this.player.setGaProperty(property);
                        }
                    }
                })
                    .catch(function (e) {
                    var wrappedError = new Exceptions_1.HTTPError('httpFailure', null, e);
                    ExceptionPipe_1.default.trapError(wrappedError, _this.clientConfig.storyId, null);
                });
            }
            catch (e) {
                var storyId = (config && config.storyId) ? config.storyId : '';
                ExceptionPipe_1.default.trapError(e, storyId);
            }
        };
        /*
            Bind player to client
         */
        this.bindPlayer = function (player, isFallback) {
            if (isFallback === void 0) { isFallback = false; }
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                _this.playerIsFallback = isFallback;
                _this.player = player;
                player.setStoryId(storyId);
                if (_this.gaProperty) {
                    player.setGaProperty(_this.gaProperty);
                }
            }
        };
        /*
            Sets a callback for an event
         */
        this.on = function (eventName, callback) {
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (!Helpers_1.isFunc(callback)) {
                        throw new Exceptions_1.ClientConfigurationError('invalidCallbackType', eventName);
                    }
                    if (!Helpers_1.keyExists(DirectClient.eventNames, eventName)) {
                        throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                    }
                    eventDelegateRefs[eventName] = callback;
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Turns off a specific event or all events
         */
        this.off = function (eventName) {
            if (eventName === void 0) { eventName = ''; }
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (eventName) {
                        if (Helpers_1.keyExists(DirectClient.eventNames, eventName)) {
                            eventDelegateRefs[eventName] = null;
                        }
                        else {
                            throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                        }
                    }
                    else {
                        Object.keys(DirectClient.eventNames).forEach(function (event) {
                            eventDelegateRefs[event] = null;
                        });
                    }
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Sets up analytics using fallback video player wrapper class
         */
        this.captureAnalytics = function (playerRef) {
            if (playerRef === void 0) { playerRef = null; }
            var ERROR = _this.eventDelegateRefs.ERROR;
            if (_this.clientConfig) {
                var storyId = _this.clientConfig.storyId;
                try {
                    if (playerRef instanceof HTMLVideoElement) {
                        _this.bindPlayer(new FallbackPlayer_1.default(playerRef), true);
                    }
                    else {
                        // Prop passed wasn't of type HTMLVideoElement
                        throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
                    }
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Call exposed to users that fetches experience data
         */
        this.getExperience = function (experienceId) {
            if (_this.clientConfig) {
                var _a = _this, player = _a.player, storyId = _a.clientConfig.storyId, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
                try {
                    if (player === null && !Helpers_1.isFunc(GOT_EXPERIENCE)) {
                        throw new Exceptions_1.ClientConfigurationError('badConfigOnGet', DirectClient.eventNames.GOT_EXPERIENCE);
                    }
                    if (experienceId.length > settings.uuidLength) {
                        experienceId = experienceId.substring(0, settings.uuidLength);
                    }
                    // this.DirectDeliveryPipe.doFetchExperience(experienceId);
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Creates experiences and handles various render flows
         */
        // public createExperience = (inventory: any): void => {
        //     if (this.clientConfig) {
        //         const {
        //             player, playerIsFallback,
        //             clientConfig: {storyId}, emits: {adding},
        //             eventDelegateRefs: {GOT_EXPERIENCE, EXPERIENCE_CREATED, UPLOAD_PROGRESS, ERROR}
        //         } = this;
        //         try {
        //             // Ensures config error throws if not using our player / GOT_EXPERIENCE isn't set or set correctly
        //             if (((player === null || playerIsFallback) && !isFunc(GOT_EXPERIENCE))) {
        //                 throw new ClientConfigurationError('bagConfigOnPostRender', DirectClient.eventNames.GOT_EXPERIENCE);
        //             }
        //             // If rendering immediately, notify user the input was ingested
        //             this.gotMessage({id: undefined, status: adding});
        //             this.DirectDeliveryPipe.createPrestep(inventory, false, UPLOAD_PROGRESS);
        //         } catch (e) {
        //             ExceptionPipe.trapError(e, storyId, ERROR);
        //         }
        //     }
        // }
        this.renderExperience = function (inventory) {
            if (_this.clientConfig) {
                var _a = _this, player = _a.player, playerIsFallback = _a.playerIsFallback, storyId = _a.clientConfig.storyId, adding = _a.emits.adding, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, EXPERIENCE_CREATED = _b.EXPERIENCE_CREATED, UPLOAD_PROGRESS = _b.UPLOAD_PROGRESS, ERROR = _b.ERROR;
                try {
                    // Ensures config error throws if not using our player / GOT_EXPERIENCE isn't set or set correctly
                    if (((player === null || playerIsFallback) && !Helpers_1.isFunc(GOT_EXPERIENCE))) {
                        throw new Exceptions_1.ClientConfigurationError('bagConfigOnPostRender', DirectClient.eventNames.GOT_EXPERIENCE);
                    }
                    // If rendering immediately, notify user the input was ingested
                    _this.gotMessage({ id: undefined, status: adding });
                    _this.DirectDeliveryPipe.renderFetchExperience(inventory, UPLOAD_PROGRESS);
                }
                catch (e) {
                    ExceptionPipe_1.default.trapError(e, storyId, ERROR);
                }
            }
        };
        /*
            Update render history state, prevents storing duplicates
         */
        this.updateHistory = function (key, value) {
            if (_this.renderHistory[key] !== value) {
                _this.renderHistory[key] = value;
            }
        };
        /*
            Handler for emitting expereince data on first creation
         */
        this.experienceCreated = function (experience) {
            var _a = _this, _b = _a.emits, adding = _b.adding, added = _b.added, prevMessage = _a.renderHistory.prevMessage, _c = _a.eventDelegateRefs, EXPERIENCE_CREATED = _c.EXPERIENCE_CREATED, STATUS_UPDATE = _c.STATUS_UPDATE;
            var id = experience.id;
            if (Helpers_1.isFunc(EXPERIENCE_CREATED)) {
                EXPERIENCE_CREATED(experience);
            }
            if ((prevMessage === adding || !prevMessage)) {
                _this.gotMessage({ id: id, status: added });
            }
            _this.updateHistory('prevExperienceId', id);
        };
        /*
            Handler for validating and deferring / emitting experience data after rendering is complete
         */
        this.gotExperience = function (experience) {
            var _a = _this, player = _a.player, storyId = _a.clientConfig.storyId, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR, _c = _a.emits, added = _c.added, finishedPolling = _c.finishedPolling, prevMessage = _a.renderHistory.prevMessage;
            var id = experience.id, output = experience.output, rendering = experience.rendering, moderation_status = experience.moderation_status;
            try {
                if (moderation_status === 'rejected') {
                    throw new Exceptions_1.ModerationError('rejection', id);
                }
                if (prevMessage === added) {
                    _this.gotMessage({ id: id, status: finishedPolling });
                }
                if (Helpers_1.isFunc(GOT_EXPERIENCE)) {
                    GOT_EXPERIENCE(experience);
                }
                if (typeof player !== 'undefined') {
                    player.experienceGenerated(experience);
                }
                _this.updateHistory('prevExperienceId', id);
                _this.updateHistory('prevMessage', '');
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
             Handler for emitting message data
          */
        this.gotMessage = function (message) {
            var STATUS_UPDATE = _this.eventDelegateRefs.STATUS_UPDATE;
            if (Helpers_1.isFunc(STATUS_UPDATE)) {
                STATUS_UPDATE(message);
                _this.updateHistory('prevMessage', message.status);
            }
        };
        /*
            Handler for handling async internal errors
         */
        this.internalError = function (e) {
            var _a = _this, storyId = _a.clientConfig.storyId, ERROR = _a.eventDelegateRefs.ERROR;
            ExceptionPipe_1.default.trapError(e, storyId, ERROR);
        };
        this.setup(config);
    }
    DirectClient.eventNames = settings.eventNames;
    return DirectClient;
}());
exports["default"] = DirectClient;


/***/ }),

/***/ "./src/client/DirectDeliveryPipe.ts":
/*!******************************************!*\
  !*** ./src/client/DirectDeliveryPipe.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var DirectDeliveryPipe = /** @class */ (function () {
    function DirectDeliveryPipe(c) {
        var _this = this;
        this.pollInterval = 1000;
        this.api = null;
        this.clientDelegates = null;
        this.configCache = new Map();
        /*
            Fetch an Experience from the Imposium API, kill poll on finished render if in poll mode
         */
        this.doGetExperience = function (experienceId) {
            _this.api.get(experienceId)
                .then(function (exp) {
                var output = exp.output, rendering = exp.rendering;
                var hasOutput = (typeof output !== 'undefined' && Object.keys(output).length > 0);
                // Rendered resource was requested
                if (hasOutput) {
                    _this.clientDelegates.get('gotExperience')(exp);
                }
                // // Resource where rendering is deferred was first requested
                // if (!hasOutput && !rendering) {
                //     this.startRender(experienceId);
                // }
                // // Resource was requested during render job
                // if (!hasOutput && rendering) {
                //     this.consumeOnRefresh(experienceId);
                // }
            })
                .catch(function (e) {
                var httpError = new Exceptions_1.HTTPError('httpFailure', experienceId, e);
                _this.clientDelegates.get('internalError')(httpError);
            });
        };
        /*
            Run config for create call through delivery gateways
         */
        // public createPrestep = (
        //     inventory: any,
        //     render: boolean,
        //     uploadProgress: (n: number) => any,
        //     retryOnCollision: number = 0
        // ): void => {
        //     const uuid: string = generateUUID();
        //     const config: ICreateConfig = {inventory, render, uuid, uploadProgress};
        //     clearTimeout(this.shortPollTimeout);
        //     if (!render) {
        //         this.doCreate(config, false, retryOnCollision);
        //     }
        //     if (render && this.mode === DirectDeliveryPipe.POLL_MODE) {
        //         this.doCreate(config, true, retryOnCollision);
        //     }
        //     if (render && this.mode === DirectDeliveryPipe.WS_MODE) {
        //         // Cache inventory temporarily incase socket connection fails
        //         this.configCache.set(uuid, config);
        //         this.startConsumer(uuid)
        //         .then(() => this.doCreate(config, false, retryOnCollision));
        //     }
        // }
        /*
           Run config for create call through delivery gateways
        */
        this.renderFetchExperience = function (inventory, uploadProgress) {
            var uuid = Helpers_1.generateUUID();
            var config = { inventory: inventory, uuid: uuid, uploadProgress: uploadProgress };
            _this.doFetch(config);
        };
        /*
            Start a consumer or short poll if an experience is requested mid-render
         */
        // private consumeOnRefresh = (experienceId: string): void => {
        //     if (this.mode === DirectDeliveryPipe.WS_MODE) {
        //         this.startConsumer(experienceId);
        //     } else {
        //         clearTimeout(this.shortPollTimeout);
        //         this.shortPollTimeout = window.setTimeout(
        //             () => this.doGetExperience(experienceId),
        //             this.pollInterval
        //         );
        //     }
        // }
        /*
            POST data to Imposium server, create experience record, defer and or poll on success
        */
        this.doFetch = function (config, retries) {
            if (retries === void 0) { retries = 0; }
            var inventory = config.inventory, uuid = config.uuid, uploadProgress = config.uploadProgress;
            _this.api.fetch(inventory, uuid, uploadProgress)
                .then(function (e) {
                _this.configCache.delete(uuid);
                _this.clientDelegates.get('gotExperience')(e);
                console.log("SUCCESS");
                console.log(e);
            })
                .catch(function (e) {
                console.log("ERROR");
                console.log(e.response);
                //render took longer than a minute, revert to polling
                if (e.response && e.response.status === 408) {
                    _this.pollForExperience(uuid, function (experience) {
                        _this.clientDelegates.get('gotExperience')(experience);
                    }, function (e) {
                        console.log("error getting experience");
                        console.log(e);
                    });
                    //error on the fetch endpoint, retry up to 3 times
                }
                else if (retries < 3) {
                    retries = retries + 1;
                    _this.doFetch(config, retries);
                }
                else {
                    var httpError = new Exceptions_1.HTTPError('httpFailure', uuid, e);
                    _this.clientDelegates.get('internalError')(httpError);
                }
            });
        };
        this.api = c.api;
        this.clientDelegates = c.clientDelegates;
    }
    DirectDeliveryPipe.prototype.pollForExperience = function (id, resolve, reject) {
        var _this = this;
        this.api.get(id)
            .then(function (res) {
            //if it's not rendering anymore, it's done
            if (!res.rendering) {
                resolve(res);
            }
            else {
                setTimeout(function () {
                    _this.pollForExperience(id, resolve, reject);
                }, _this.pollInterval);
            }
        })
            .catch(function (e) {
            reject(e);
        });
    };
    return DirectDeliveryPipe;
}());
exports["default"] = DirectDeliveryPipe;


/***/ }),

/***/ "./src/client/http/API.ts":
/*!********************************!*\
  !*** ./src/client/http/API.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var jwt_decode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
var axiosRetry = __webpack_require__(/*! axios-retry */ "./node_modules/axios-retry/index.js");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var Helpers_1 = __webpack_require__(/*! ../../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __rest(__webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").api, []);
var API = /** @class */ (function () {
    function API(accessToken, env, storyId, compositionId) {
        var _a;
        var _this = this;
        if (compositionId === void 0) { compositionId = null; }
        this.http = null;
        this.storyId = '';
        this.compositionId = '';
        /*
            Wait async for story ga tracking id
         */
        this.getGAProperty = function () {
            return new Promise(function (resolve, reject) {
                _this.http.get("/story/" + _this.storyId + "/property")
                    .then(function (res) {
                    resolve(res.data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            resolve experience data
         */
        this.get = function (experienceId) {
            return new Promise(function (resolve, reject) {
                _this.http.get("/experience/" + experienceId + "?r=" + Math.random())
                    .then(function (res) {
                    resolve(res.data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            create a new experience record and resolve fresh experience data
         */
        this.fetch = function (inventory, uuid, progress) {
            if (progress === void 0) { progress = null; }
            var route = '/experience/fetch';
            var formData = Helpers_1.inventoryToFormData(_this.storyId, inventory, _this.compositionId);
            var config = { onUploadProgress: function (e) { return _this.uploadProgress(e, progress); } };
            formData.append('id', uuid);
            return new Promise(function (resolve, reject) {
                _this.http.post(route, formData, config)
                    .then(function (res) {
                    resolve(res.data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            create a new experience record and resolve fresh experience data
         */
        this.create = function (inventory, render, uuid, progress) {
            if (progress === void 0) { progress = null; }
            var route = (render) ? '/experience/render' : '/experience';
            var formData = Helpers_1.inventoryToFormData(_this.storyId, inventory, _this.compositionId);
            var config = { onUploadProgress: function (e) { return _this.uploadProgress(e, progress); } };
            formData.append('id', uuid);
            return new Promise(function (resolve, reject) {
                _this.http.post(route, formData, config)
                    .then(function (res) {
                    resolve(res.data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            triggers a render job for an experience if deferred
         */
        this.triggerRender = function (experienceId) {
            var post = _this.http.post;
            return new Promise(function (resolve, reject) {
                post("/experience/" + experienceId + "/trigger-event")
                    .then(function (res) {
                    var job_id = res.data.job_id;
                    resolve(job_id);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            Attempt to decode JWT format from authToken, fallback to hmac if call fails
         */
        this.getAuthHeader = function (accessToken) {
            var _a, _b;
            var jwt = settings.jwt, hmac = settings.hmac;
            try {
                jwt_decode(accessToken);
                return _a = {}, _a[jwt] = accessToken, _a;
            }
            catch (e) {
                return _b = {}, _b[hmac] = accessToken, _b;
            }
        };
        /*
            Emit a rounded upload progress metric, no support for progressEvent type in Axios
         */
        this.uploadProgress = function (evt, callback) {
            if (callback === void 0) { callback = null; }
            if (callback) {
                var loaded = evt.loaded, total = evt.total;
                var perc = Math.round(loaded / total * 100);
                callback(perc);
            }
        };
        this.shouldRequestBeRetried = function (e) {
            if (typeof e.config === 'object' &&
                e.config.hasOwnProperty('url') &&
                e.config.url === '/experience/render') {
                return false;
            }
            return axiosRetry.isNetworkOrIdempotentRequestError(e);
        };
        var version = settings.version, currentVersion = settings.currentVersion;
        var retryConfig = {
            retryDelay: API.retry.exponentialDelay,
            retryCondition: this.shouldRequestBeRetried
        };
        this.storyId = storyId;
        this.compositionId = compositionId;
        this.http = axios_1.default.create({
            baseURL: settings[env],
            headers: __assign(__assign({}, this.getAuthHeader(accessToken)), (_a = {}, _a[version] = currentVersion, _a))
        });
        // Adds exponential back off to requests
        API.retry(this.http, retryConfig);
    }
    API.retry = axiosRetry;
    return API;
}());
exports["default"] = API;


/***/ }),

/***/ "./src/client/stomp/Consumer.ts":
/*!**************************************!*\
  !*** ./src/client/stomp/Consumer.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var StompWS_1 = __webpack_require__(/*! ./StompWS */ "./src/client/stomp/StompWS.ts");
var Exceptions_1 = __webpack_require__(/*! ../../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __rest(__webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").messageConsumer, []);
// Wraps around the Stomp client, providing the message handling
var MessageConsumer = /** @class */ (function () {
    function MessageConsumer(c) {
        var _this = this;
        // Props
        this.environment = '';
        this.experienceId = null;
        this.deliveryDelegates = null;
        this.stomp = null;
        /*
            Initializes STOMP over WS so messaged pushed from rabbitMQ can be consumed
         */
        this.connect = function () {
            var _a = _this, experienceId = _a.experienceId, environment = _a.environment;
            var consumerDelegates = new Map();
            consumerDelegates.set('validateFrameData', function (f) { return _this.validateFrameData(f); });
            consumerDelegates.set('socketFailure', function (e, wasConnected) { return _this.socketFailure(e, wasConnected); });
            _this.stomp = new StompWS_1.default({
                experienceId: experienceId,
                consumerDelegates: consumerDelegates
            });
            return new Promise(function (resolve) {
                _this.stomp.init(environment)
                    .then(function () {
                    resolve();
                });
            });
        };
        /*
            Force stop STOMP / ws connections
         */
        this.destroy = function () {
            return new Promise(function (resolve) {
                if (!_this.stomp) {
                    return resolve();
                }
                _this.stomp.forceClose()
                    .then(function () {
                    resolve();
                });
            });
        };
        /*
            Parse & defer incoming frame data. Disconnect on (event==='actComplete').
         */
        this.validateFrameData = function (frame) {
            var _a = MessageConsumer.EMITS, scene = _a.scene, message = _a.message, complete = _a.complete;
            var _b = _this, stomp = _b.stomp, experienceId = _b.experienceId, deliveryDelegates = _b.deliveryDelegates;
            var body = frame.body;
            try {
                var emitData = JSON.parse(body);
                switch (emitData.event) {
                    case complete:
                        _this.destroy();
                        break;
                    case message:
                        _this.emitMessageData(emitData);
                        break;
                    case scene:
                        delete emitData['event'];
                        _this.emitSceneData(emitData);
                        break;
                    default:
                        break;
                }
            }
            catch (e) {
                var socketError = new Exceptions_1.SocketError('messageParseFailed', experienceId, e, true);
                deliveryDelegates.get('internalError')(socketError);
            }
        };
        /*
            Handle message data contained by frames other than gotScene
         */
        this.emitMessageData = function (emitData) {
            var deliveryDelegates = _this.deliveryDelegates;
            var status = emitData.status, id = emitData.id;
            try {
                if (status === settings.errorOverTcp) {
                    throw new Exceptions_1.SocketError('errorOverTcp', id, null, true);
                }
                deliveryDelegates.get('gotMessage')(emitData);
            }
            catch (e) {
                deliveryDelegates.get('internalError')(e);
            }
        };
        /*
            Validate experience data contained by frame
         */
        this.emitSceneData = function (experience) {
            var deliveryDelegates = _this.deliveryDelegates;
            var id = experience.id, moderation_status = experience.moderation_status;
            if (moderation_status === 'rejected') {
                var moderationError = new Exceptions_1.ModerationError('rejection', id);
                deliveryDelegates.get('internalError')(moderationError);
            }
            else {
                deliveryDelegates.get('gotExperience')(experience);
            }
        };
        /*
            Called on total socket failures (i.e: max retries exceeded)
         */
        this.socketFailure = function (e, wasConnected) {
            var _a = _this, experienceId = _a.experienceId, deliveryDelegates = _a.deliveryDelegates;
            var socketError = new Exceptions_1.SocketError('tcpFailure', experienceId, e, wasConnected);
            _this.stomp = null;
            deliveryDelegates.get('consumerFailure')(experienceId, socketError);
        };
        this.experienceId = c.experienceId;
        this.environment = c.environment;
        this.deliveryDelegates = c.deliveryDelegates;
    }
    // Server side event names
    MessageConsumer.EMITS = settings.emitTypes;
    return MessageConsumer;
}());
exports["default"] = MessageConsumer;


/***/ }),

/***/ "./src/client/stomp/StompWS.ts":
/*!*************************************!*\
  !*** ./src/client/stomp/StompWS.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var WebStomp = __webpack_require__(/*! webstomp-client */ "./node_modules/webstomp-client/dist/webstomp.js");
var ExceptionPipe_1 = __webpack_require__(/*! ../../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var settings = __rest(__webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").stomp, []);
var StompWS = /** @class */ (function () {
    function StompWS(c) {
        var _this = this;
        // Props
        this.socket = null;
        this.client = null;
        this.subscription = null;
        this.currRetry = 0;
        this.didConnect = false;
        /*
            Initializes STOMP connection & tooling
         */
        this.init = function (environment) {
            _this.socket = new WebSocket(settings[environment]);
            _this.client = WebStomp.over(_this.socket);
            _this.client.debug = StompWS.DEBUG_OFF;
            return new Promise(function (resolve) {
                _this.client.connect(StompWS.USERNAME, StompWS.PASSWORD, function () { return _this.doSubscribe(resolve); }, function (evt) { return _this.onError(environment, evt); });
            });
        };
        /*
            Ends the current connection gracefully
         */
        this.forceClose = function () {
            var OPEN_STATE = StompWS.OPEN_STATE;
            var _a = _this, client = _a.client, connected = _a.client.connected, subscription = _a.subscription;
            return new Promise(function (resolve) {
                var readyState = client.ws.readyState;
                if (readyState > OPEN_STATE) {
                    return resolve();
                }
                if (subscription) {
                    subscription.unsubscribe();
                }
                client.disconnect(function () {
                    _this.socket = null;
                    resolve();
                });
            });
        };
        /*
            Bind to queue for a given experience
         */
        this.doSubscribe = function (resolve) {
            var EXCHANGE = StompWS.EXCHANGE;
            var _a = _this, experienceId = _a.experienceId, client = _a.client, consumerDelegates = _a.consumerDelegates;
            var queueLoc = "" + EXCHANGE + experienceId;
            _this.didConnect = true;
            _this.subscription = client.subscribe(queueLoc, consumerDelegates.get('validateFrameData'));
            resolve();
        };
        /*
            Fires on WS close events due to errors
         */
        this.onError = function (environment, evt) {
            var _a = _this, currRetry = _a.currRetry, consumerDelegates = _a.consumerDelegates;
            if (currRetry < StompWS.MAX_RETRIES) {
                ExceptionPipe_1.default.logWarning('network', 'tcpFailure');
                _this.currRetry++;
                _this.forceClose()
                    .then(function () {
                    _this.init(environment);
                });
            }
            else {
                consumerDelegates.get('socketFailure')(evt, _this.didConnect);
            }
        };
        this.experienceId = c.experienceId;
        this.consumerDelegates = c.consumerDelegates;
    }
    // RabbitMQ creds
    StompWS.EXCHANGE = settings.exchange;
    StompWS.USERNAME = settings.username;
    StompWS.PASSWORD = settings.password;
    StompWS.OPEN_STATE = 1; // WS OPEN
    StompWS.MAX_RETRIES = settings.maxRetries; // Max connection retries
    StompWS.DEBUG_OFF = function () { return; }; // Set null to see debug logs
    return StompWS;
}());
exports["default"] = StompWS;


/***/ }),

/***/ "./src/scaffolding/ExceptionPipe.ts":
/*!******************************************!*\
  !*** ./src/scaffolding/ExceptionPipe.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var browser_1 = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/index.js");
var Exceptions_1 = __webpack_require__(/*! ./Exceptions */ "./src/scaffolding/Exceptions.ts");
var Version_1 = __webpack_require__(/*! ./Version */ "./src/scaffolding/Version.ts");
var warnings = __rest(__webpack_require__(/*! ../conf/warnings.json */ "./src/conf/warnings.json"), []);
var sentry = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").sentry;
var ExceptionPipe = /** @class */ (function () {
    function ExceptionPipe() {
    }
    /*
        Log out warnings
     */
    ExceptionPipe.logWarning = function (type, messageKey) {
        console.warn("IMPOSIUM\n" + warnings[type][messageKey]);
    };
    /*
        Process the exception and trace
     */
    ExceptionPipe.trapError = function (e, storyId, callback) {
        if (callback === void 0) { callback = null; }
        // If the error isn't a duck typed Imposium error, wrap with uncaught type to keep log formatting streamlined
        e = (!e.log) ? new Exceptions_1.UncaughtError('generic', e) : e;
        // Store storyId if available to assist in debugging network & uncaught exceptions
        if (storyId) {
            e.setStoryId(storyId);
        }
        // If a client error event delegate is set, propagate it
        if (callback) {
            callback(e);
        }
        // Log to browser console
        e.log();
        // Trace err with Sentry.io
        ExceptionPipe.hub.run(function (currentHub) {
            currentHub.configureScope(function (scope) {
                scope.setTag('type', e.type);
                scope.setTag('version', e.version);
                scope.setTag('storyId', (storyId) ? storyId : '<not_set>');
                if (e.experienceId) {
                    scope.setTag('experienceId', e.experienceId);
                }
                // Grab available axios error details
                if (e.axiosError) {
                    if (typeof e.axiosError.response === 'object') {
                        scope.setExtra('response', e.axiosError.response);
                    }
                    else if (typeof e.axiosError.request === 'object') {
                        scope.setExtra('request', e.axiosError.request);
                        scope.setExtra('reuqestConfig', e.axiosError.config);
                    }
                    else {
                        scope.setExtra('axiosErrorMessage', e.axiosError.message);
                        scope.setExtra('reuqestConfig', e.axiosError.config);
                    }
                }
                // Grab anything that can be helpful from the socket CloseEvent
                if (e.closeEvent) {
                    scope.setExtra('socketCloseEvent', {
                        code: e.closeEvent.code,
                        type: e.closeEvent.type,
                        timestamp: e.closeEvent.timeStamp,
                        wsUrl: e.closeEvent.target.url,
                        wsBufferedAmount: e.closeEvent.target.bufferedAmount
                    });
                }
                currentHub.captureException(e);
            });
        });
    };
    ExceptionPipe.sentryClient = new browser_1.BrowserClient({
        debug: false,
        dsn: sentry.dsn,
        integrations: [new browser_1.Integrations.UserAgent()],
        beforeSend: function (e) { return ExceptionPipe.cleanDucktype(e); },
        release: sentry.projectName + "@" + Version_1.version
    });
    ExceptionPipe.hub = new browser_1.Hub(ExceptionPipe.sentryClient);
    /*
        Clean up sentry payloads before capturing exceptions
     */
    ExceptionPipe.cleanDucktype = function (evt) {
        // Delete irrelevant default values from duck-typed errs to cut down on clutter in reports
        if (typeof evt.extra === 'undefined') {
            return evt;
        }
        if (evt.extra['Error']) {
            delete evt.extra['Error']['log'];
            delete evt.extra['Error']['logHeader'];
            delete evt.extra['Error']['setStoryId'];
            if (evt.extra['Error']['axiosError']) {
                delete evt.extra['Error']['axiosError'];
            }
            if (evt.extra['Error']['closeEvent']) {
                delete evt.extra['Error']['closeEvent'];
            }
        }
        return evt;
    };
    return ExceptionPipe;
}());
exports["default"] = ExceptionPipe;


/***/ }),

/***/ "./src/scaffolding/Exceptions.ts":
/*!***************************************!*\
  !*** ./src/scaffolding/Exceptions.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UncaughtError = exports.SocketError = exports.HTTPError = exports.PlayerConfigurationError = exports.ClientConfigurationError = exports.ModerationError = exports.ImposiumError = void 0;
var Version_1 = __webpack_require__(/*! ./Version */ "./src/scaffolding/Version.ts");
var errors = __rest(__webpack_require__(/*! ../conf/errors.json */ "./src/conf/errors.json"), []);
var types = {
    ENV: 'environment',
    MODERATION: 'moderation',
    CLIENT_CONFIG: 'clientConfiguration',
    PLAYER_CONFIG: 'playerConfiguration',
    NETWORK: 'network',
    UNCAUGHT: 'uncaught'
};
var ImposiumError = /** @class */ (function (_super) {
    __extends(ImposiumError, _super);
    function ImposiumError(message, type) {
        var _this = _super.call(this, message) || this;
        _this.type = '';
        _this.version = Version_1.version;
        _this.storyId = '<not_set>';
        _this.logHeader = '[IMPOSIUM ERROR]';
        _this.setStoryId = function (s) { _this.storyId = s; };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ImposiumError);
        }
        _this.type = type;
        return _this;
    }
    return ImposiumError;
}(Error));
exports.ImposiumError = ImposiumError;
var ModerationError = /** @class */ (function (_super) {
    __extends(ModerationError, _super);
    function ModerationError(messageKey, experienceId) {
        var _this = _super.call(this, errors[types.MODERATION][messageKey], types.MODERATION) || this;
        _this.experienceId = null;
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: Failed to pass moderation\n            \nExperience ID: " + _this.experienceId + "\n            \nMessage: " + _this.message);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ModerationError);
        }
        _this.experienceId = experienceId || '<not_set>';
        return _this;
    }
    return ModerationError;
}(ImposiumError));
exports.ModerationError = ModerationError;
var ClientConfigurationError = /** @class */ (function (_super) {
    __extends(ClientConfigurationError, _super);
    function ClientConfigurationError(messageKey, eventName) {
        var _this = _super.call(this, errors[types.CLIENT_CONFIG][messageKey], types.CLIENT_CONFIG) || this;
        _this.eventName = '';
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: Invalid client configuration\n            \nMessage: " + _this.message + "\n            \nEvent name: " + _this.eventName);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ClientConfigurationError);
        }
        _this.eventName = eventName || '<not_set>';
        return _this;
    }
    return ClientConfigurationError;
}(ImposiumError));
exports.ClientConfigurationError = ClientConfigurationError;
var PlayerConfigurationError = /** @class */ (function (_super) {
    __extends(PlayerConfigurationError, _super);
    function PlayerConfigurationError(messageKey, eventName) {
        var _this = _super.call(this, errors[types.PLAYER_CONFIG][messageKey], types.PLAYER_CONFIG) || this;
        _this.eventName = '';
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: Invalid player configuration\n            \nMessage: " + _this.message + "\n            \nEvent name: " + _this.eventName);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, PlayerConfigurationError);
        }
        _this.eventName = eventName || '<not_set>';
        return _this;
    }
    return PlayerConfigurationError;
}(ImposiumError));
exports.PlayerConfigurationError = PlayerConfigurationError;
var HTTPError = /** @class */ (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(messageKey, experienceId, e) {
        var _this = _super.call(this, errors[types.NETWORK][messageKey], types.NETWORK) || this;
        _this.experienceId = null;
        _this.axiosError = null;
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: HTTP error\n            \nMessage: " + _this.message + "\n            \nExperience ID: " + _this.experienceId + "\n            \nNetwork Error: ", _this.axiosError);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, HTTPError);
        }
        if (e.hasOwnProperty('message')) {
            _this.message = e.message;
        }
        _this.experienceId = experienceId || '<not_set>';
        _this.axiosError = e;
        return _this;
    }
    return HTTPError;
}(ImposiumError));
exports.HTTPError = HTTPError;
var SocketError = /** @class */ (function (_super) {
    __extends(SocketError, _super);
    function SocketError(messageKey, experienceId, evt, wasConnected) {
        var _this = _super.call(this, errors[types.NETWORK][messageKey] + " Code: " + evt.code, types.NETWORK) || this;
        _this.wasConnected = false;
        _this.experienceId = null;
        _this.closeEvent = null;
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: WebSocket error\n            \nMessage: " + _this.message + "\n            \nExperience ID: " + _this.experienceId + "\n            \nClose event: ", _this.closeEvent);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, SocketError);
        }
        _this.experienceId = experienceId || '<not_set>';
        _this.closeEvent = evt;
        _this.wasConnected = wasConnected;
        return _this;
    }
    return SocketError;
}(ImposiumError));
exports.SocketError = SocketError;
var UncaughtError = /** @class */ (function (_super) {
    __extends(UncaughtError, _super);
    function UncaughtError(messageKey, e) {
        var _this = _super.call(this, errors[types.UNCAUGHT][messageKey], types.UNCAUGHT) || this;
        _this.uncaughtError = null;
        _this.log = function () {
            console.error(_this.logHeader + "\n            \nReason: Unknown\n            \nMessage: " + _this.message + "\n            \nError: ", _this.uncaughtError);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, UncaughtError);
        }
        _this.uncaughtError = e;
        return _this;
    }
    return UncaughtError;
}(ImposiumError));
exports.UncaughtError = UncaughtError;


/***/ }),

/***/ "./src/scaffolding/GoogleAnalytics.ts":
/*!********************************************!*\
  !*** ./src/scaffolding/GoogleAnalytics.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __rest(__webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").analytics, []);
var GoogleAnalytics = /** @class */ (function () {
    function GoogleAnalytics() {
    }
    GoogleAnalytics.gaPlacement = '';
    /*
        Pull a client ID from localstorage or generate a fresh one.
        This essentially intializes the GA event bus & assign a placement
     */
    GoogleAnalytics.initialize = function (placement) {
        try {
            var now = new Date();
            var cache = JSON.parse(localStorage.getItem(GoogleAnalytics.CACHE_KEY)) || {};
            // Assign placement, generally it's just web but for special ad tech cases we can override
            GoogleAnalytics.gaPlacement = placement;
            // If cache isn't expired, use cached GUID to help provide more accurate metrics
            if (cache.uuid && cache.expiry >= new Date().valueOf()) {
                GoogleAnalytics.CLIENT_ID = cache.uuid;
                return;
            }
            // Generate a fresh cache if the previous was expired
            cache.uuid = Helpers_1.generateUUID();
            cache.expiry = now.setFullYear(now.getFullYear() + 2);
            localStorage.setItem(GoogleAnalytics.CACHE_KEY, JSON.stringify(cache));
            // Cache a fresh client id
            GoogleAnalytics.CLIENT_ID = cache.uuid;
        }
        catch (e) {
            // if LS fails for some reason, generate a guid for the session
            GoogleAnalytics.CLIENT_ID = Helpers_1.generateUUID();
        }
        return;
    };
    /*
        Concatenates the default and event supplied parameters into a url string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    GoogleAnalytics.send = function (event) {
        var e_1, _a;
        var pixelUrl = GoogleAnalytics.BASE_URL;
        var ref = document.referrer;
        // merge event data with base GA params
        event = __assign({ v: '1', ds: GoogleAnalytics.gaPlacement, cid: GoogleAnalytics.CLIENT_ID, z: "" + Math.round(new Date().getTime() / 1000) }, event);
        // only set the referrer if it's not empty
        if (ref !== '') {
            event['dr'] = ref;
        }
        try {
            for (var _b = __values(Object.keys(event)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var paramName = _c.value;
                var separator = (pixelUrl === GoogleAnalytics.BASE_URL) ? '?' : '&';
                pixelUrl += "" + separator + paramName + "=" + encodeURIComponent(event[paramName]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        axios_1.default.get(pixelUrl)
            .catch(function (e) {
            ExceptionPipe_1.default.logWarning('analytics', 'requestFailed');
        });
    };
    GoogleAnalytics.BASE_URL = settings.baseUrl;
    GoogleAnalytics.CACHE_KEY = settings.cacheKey;
    // Unique id for user
    GoogleAnalytics.CLIENT_ID = settings.cidPlaceholder;
    return GoogleAnalytics;
}());
exports["default"] = GoogleAnalytics;


/***/ }),

/***/ "./src/scaffolding/Helpers.ts":
/*!************************************!*\
  !*** ./src/scaffolding/Helpers.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inventoryToFormData = exports.generateUUID = exports.calculateAverageMbps = exports.calculateMbps = exports.cloneWithKeys = exports.keyExists = exports.isFunc = exports.inRangeNumeric = exports.prepConfig = void 0;
// Pull out unneeded keys
exports.prepConfig = function (config, defaults) {
    var validKeys = Object.keys(defaults);
    for (var key in config) {
        if (validKeys.indexOf(key) === -1) {
            delete config[key];
        }
    }
};
// Validates if a number is within a range of min -> max
exports.inRangeNumeric = function (n, min, max) {
    return ((n - min) * (n - max) <= 0);
};
// Validates if object has function type literal
exports.isFunc = function (f) {
    return (Object.prototype.toString.call(f) === '[object Function]');
};
// Check if key exists in an obj
exports.keyExists = function (o, key) {
    return (~Object.keys(o).map(function (i) { return o[i]; }).indexOf(key));
};
// Return a new object containing the same keys as the ref passed in
exports.cloneWithKeys = function (o) {
    return Object.keys(o).reduce(function (p, c) { p[c] = null; return p; }, {});
};
// Calcuate megabits per second based on request duration in s and size of file downloaded
exports.calculateMbps = function (startTime, filesize) {
    var durationSeconds = (new Date().getTime() - startTime) / 1000;
    var filesizeBits = filesize * 8;
    return (filesizeBits / durationSeconds) / Math.pow(1024, 2);
};
// Calculate average mbps rate based on set of download times in mbps
exports.calculateAverageMbps = function (speeds) {
    var sum = speeds.reduce(function (p, c) { return p + c; });
    return parseFloat((sum / speeds.length).toFixed(2));
};
// Generate uuidv4
exports.generateUUID = function () {
    var p = window.performance;
    var d = new Date().getTime();
    if (typeof p !== 'undefined' && typeof p.now === 'function') {
        d += p.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};
// Convert inventory map to form data object
exports.inventoryToFormData = function (storyId, inventory, compositionId) {
    if (compositionId === void 0) { compositionId = null; }
    var formData = new FormData();
    formData.append('story_id', storyId);
    if (compositionId) {
        formData.append('composition_id', compositionId);
    }
    for (var key in inventory) {
        if (inventory[key]) {
            var data = inventory[key];
            if (data && data.type === 'file') {
                // Deal with HTML5 File inputs, only accept one currently
                var files = data.files;
                if (files.length > 0) {
                    inventory[key] = '';
                    formData.append(key, files[0]);
                }
                else {
                    inventory[key] = '';
                }
            }
            else if (data && data instanceof File) {
                // Only accept Files (need filename)
                inventory[key] = '';
                formData.append(key, data, data.name);
            }
            // Add other inputs, for files this will just be a key that our API uses for a look up
            formData.append("inventory[" + key + "]", inventory[key]);
        }
    }
    return formData;
};


/***/ }),

/***/ "./src/scaffolding/Version.ts":
/*!************************************!*\
  !*** ./src/scaffolding/Version.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.printVersion = exports.version = void 0;
exports.version = "2.4.0";
exports.printVersion = function () {
    console.log("%cPowered By%c Imposium%c v" + "2.4.0" + "%c https://imposium.com", 'text-transform: uppercase; padding: 5px 0px 5px 5px; background-color: black; color: white;', 'text-transform: uppercase; padding: 5px 0px 5px 0px; background-color: black; color: #a1b83a;', 'padding: 5px 5px 5px 0px; background-color: black; color: white;', 'padding: 5px 5px 5px 0px;');
};


/***/ }),

/***/ "./src/video/FallbackPlayer.ts":
/*!*************************************!*\
  !*** ./src/video/FallbackPlayer.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var VideoPlayer_1 = __webpack_require__(/*! ./VideoPlayer */ "./src/video/VideoPlayer.ts");
var FallbackPlayer = /** @class */ (function (_super) {
    __extends(FallbackPlayer, _super);
    function FallbackPlayer(node) {
        var _this = _super.call(this, node) || this;
        /*
            Set the experience id for analytics purposes
         */
        _this.experienceGenerated = function (experience) {
            var id = experience.id;
            _this.setExperienceId(id);
        };
        return _this;
    }
    return FallbackPlayer;
}(VideoPlayer_1.default));
exports["default"] = FallbackPlayer;


/***/ }),

/***/ "./src/video/Player.ts":
/*!*****************************!*\
  !*** ./src/video/Player.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var VideoPlayer_1 = __webpack_require__(/*! ./VideoPlayer */ "./src/video/VideoPlayer.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").videoPlayer;
var hls = window.hls;
var ImposiumPlayer = /** @class */ (function (_super) {
    __extends(ImposiumPlayer, _super);
    function ImposiumPlayer(node, client, config) {
        if (config === void 0) { config = settings.defaultConfig; }
        var _this = _super.call(this, node) || this;
        _this.eventDelegateRefs = {
            play: { callback: null, native: true },
            pause: { callback: null, native: true },
            ended: { callback: null, native: true },
            error: { callback: null, native: true },
            seeked: { callback: null, native: true },
            timeupdate: { callback: null, native: true },
            volumechanged: { callback: null, native: true },
            muted: { callback: null, native: false },
            controlsset: { callback: null, native: false }
        };
        _this.hlsSupport = '';
        _this.hlsPlayer = null;
        _this.experienceCache = [];
        _this.clientRef = null;
        _this.imposiumPlayerConfig = null;
        /*
            Assigns config
         */
        _this.init = function (config) {
            var defaultConfig = settings.defaultConfig;
            Helpers_1.prepConfig(config, defaultConfig);
            _this.imposiumPlayerConfig = __assign(__assign({}, defaultConfig), config);
            for (var key in _this.imposiumPlayerConfig) {
                if (_this.imposiumPlayerConfig[key]) {
                    _this.node[key] = _this.imposiumPlayerConfig[key];
                }
            }
        };
        /*
            Set a live stream or fallback to bandwidth checking / auto assigning a file
         */
        _this.experienceGenerated = function (experience) {
            var experienceCache = _this.experienceCache;
            var qualityOverride = _this.imposiumPlayerConfig.qualityOverride;
            var id = experience.id, _a = experience.output, videos = _a.videos, images = _a.images;
            var poster = '';
            _this.setExperienceId(id);
            /*
                Will be used in upcoming features
                experienceCache.push(experience);
             */
            if (images && images.hasOwnProperty('poster')) {
                poster = images.poster;
            }
            if (qualityOverride) {
                _this.doQualityOverride(videos, poster);
            }
            else {
                _this.doQualityAssessment(videos, poster);
            }
        };
        /*
            Enable native or custom ImposiumPlayer events
         */
        _this.on = function (eventName, callback) {
            var _a = _this, storyId = _a.storyId, eventDelegateRefs = _a.eventDelegateRefs;
            try {
                if (Helpers_1.isFunc(callback)) {
                    if (Helpers_1.keyExists(ImposiumPlayer.events, eventName)) {
                        var event_1 = eventDelegateRefs[eventName];
                        // Add ptr for future removal
                        event_1.callback = callback;
                        // If the event type is a valid media event, assign to ImposiumPlayer node
                        if (event_1.native) {
                            _this.node.addEventListener(eventName, event_1.callback);
                        }
                    }
                    else {
                        throw new Exceptions_1.PlayerConfigurationError('invalidEventName', eventName);
                    }
                }
                else {
                    throw new Exceptions_1.PlayerConfigurationError('invalidCallbackType', eventName);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId);
            }
        };
        /*
            Disable native or custom ImposiumPlayer events
         */
        _this.off = function (eventName) {
            var _a = _this, storyId = _a.storyId, eventDelegateRefs = _a.eventDelegateRefs;
            try {
                if (Helpers_1.keyExists(ImposiumPlayer.events, eventName)) {
                    var event_2 = eventDelegateRefs[eventName];
                    // Remove node based event listener
                    if (event_2.native) {
                        _this.node.removeEventListener(eventName, event_2.callback);
                    }
                    event_2.callback = null;
                }
                else {
                    throw new Exceptions_1.PlayerConfigurationError('invalidEventName', eventName);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId);
            }
        };
        /*
            Play video
         */
        _this.play = function () {
            _this.node.play();
        };
        /*
            Pause video
         */
        _this.pause = function () {
            _this.node.pause();
        };
        /*
            TO DO: Clarify what this is with Greg
         */
        _this.getPlaybackState = function () {
            return (_this.node.paused) ? 'paused' : 'playing';
        };
        /*
            Get current playback time (s)
         */
        _this.getPosition = function () {
            return _this.node.currentTime;
        };
        /*
            Get duration of video (s)
         */
        _this.getDuration = function () {
            return _this.node.duration;
        };
        /*
            Seek to a point in the video (s)
         */
        _this.seek = function (seekTo) {
            var duration = _this.node.duration;
            if (!isNaN(duration)) {
                seekTo = Math.floor(seekTo);
                if (Helpers_1.inRangeNumeric(seekTo, 0, duration)) {
                    _this.node.currentTime = seekTo;
                }
                else {
                    ExceptionPipe_1.default.logWarning('playerFailure', 'invalidSeekTime');
                }
            }
            else {
                ExceptionPipe_1.default.logWarning('playerFailure', 'seekNotReady');
            }
        };
        /*
            Get mute state
         */
        _this.getMute = function () {
            return _this.node.muted;
        };
        /*
            Set mute state
         */
        _this.setMute = function (mute) {
            var callback = _this.eventDelegateRefs.muted.callback;
            _this.node.muted = mute;
            if (callback) {
                callback();
            }
        };
        /*
            Get volume state
         */
        _this.getVolume = function () {
            return _this.node.volume;
        };
        /*
            Set volume set, valid range: 0.0 -> 1.0
         */
        _this.setVolume = function (volume) {
            var volumeMin = settings.volumeMin, volumeMax = settings.volumeMax;
            volume = Math.round(volume * 10) / 10;
            if (Helpers_1.inRangeNumeric(volume, volumeMin, volumeMax)) {
                _this.node.volume = volume;
            }
            else {
                ExceptionPipe_1.default.logWarning('playerFailure', 'invalidVolume');
            }
        };
        /*
            Get controls state
         */
        _this.getControls = function () {
            return _this.node.controls;
        };
        /*
            Set controls state
         */
        _this.setControls = function (controls) {
            var controlsset = _this.eventDelegateRefs.controlsset;
            _this.node.controls = controls;
            if (controlsset) {
                controlsset.callback();
            }
        };
        /*
            Replay video
         */
        _this.replay = function () {
            _this.pauseIfPlaying();
            _this.node.currentTime = 0;
            _this.node.play();
        };
        /*
            Remove all Imposium ImposiumPlayer scaffolding and break ref to video node
         */
        _this.remove = function () {
            var e_1, _a;
            var eventDelegateRefs = _this.eventDelegateRefs;
            var defaultConfig = settings.defaultConfig;
            _this.pauseIfPlaying();
            try {
                for (var _b = __values(Object.keys(eventDelegateRefs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _this.off(eventDelegateRefs[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.imposiumPlayerConfig = __assign({}, defaultConfig);
            _this.node = null;
        };
        /*
            Determine if browser can natively support media source extensions, if not
            use hls-js if possible, if hls-js is not supported do nothing.
         */
        _this.setupHls = function () {
            var _a = ImposiumPlayer.hlsSupportLevels, NATIVE = _a.NATIVE, HLSJS = _a.HLSJS;
            if (_this.node.canPlayType(ImposiumPlayer.STREAM_TYPE)) {
                _this.hlsSupport = NATIVE;
            }
            else if (typeof hls !== 'undefined') {
                if (hls.isSupported()) {
                    _this.hlsSupport = HLSJS;
                }
            }
        };
        /*
            If the user has set a quality override string, serve the video
            at the setting provided
         */
        _this.doQualityOverride = function (videos, poster) {
            var storyId = _this.storyId;
            var qualityOverride = _this.imposiumPlayerConfig.qualityOverride;
            try {
                if (videos.hasOwnProperty(qualityOverride)) {
                    _this.setPlayerData(videos[qualityOverride].url, true, poster);
                }
                else {
                    throw new Exceptions_1.PlayerConfigurationError('badQualityOverride', null);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId);
            }
        };
        /*
            Determine if adaptive streaming can be used, if not do a manual bandwidth check
            to try and get a best guess of what quality setting to serve.
         */
        _this.doQualityAssessment = function (videos, poster) {
            var hlsSupport = _this.hlsSupport;
            var STREAM = ImposiumPlayer.compressionLevels.STREAM;
            var hasStream = videos.hasOwnProperty(STREAM);
            if (hasStream && hlsSupport) {
                _this.setPlayerData(videos[STREAM].url, true, poster);
            }
            else {
                var formatKeys = Object.keys(videos);
                if (formatKeys.length === 1) {
                    _this.setPlayerData(videos[formatKeys[0]].url, false, poster);
                }
                else {
                    _this.checkBandwidth(videos)
                        .then(function (format) {
                        _this.setPlayerData(videos[format].url, false, poster);
                    })
                        .catch(function (lowestQuality) {
                        _this.setPlayerData(videos[lowestQuality].url, false, poster);
                    });
                }
            }
        };
        /*
            Take a sample in mbs of the users bandwidth
         */
        _this.sampleBandwidth = function () {
            var url = ImposiumPlayer.TEST_IMAGE + "?bust=" + Math.random();
            var config = { responseType: 'blob', timeout: 1500 };
            return new Promise(function (resolve, reject) {
                var startTime = new Date().getTime();
                axios_1.default.get(url, config)
                    .then(function (res) {
                    var size = res.data.size;
                    resolve(Helpers_1.calculateMbps(startTime, size));
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            Adapt quality manually if HLS cannot be supported
         */
        _this.checkBandwidth = function (videos) {
            var bandwidthRatings = ImposiumPlayer.bandwidthRatings, compressionLevels = ImposiumPlayer.compressionLevels, BANDWIDTH_SAMPLES = ImposiumPlayer.BANDWIDTH_SAMPLES;
            var testPromises = [];
            var mp4FormatList = Object.keys(videos).filter(function (f) { return f !== 'm3u8'; });
            for (var i = 0; i < BANDWIDTH_SAMPLES; i++) {
                testPromises.push(_this.sampleBandwidth());
            }
            return new Promise(function (resolve, reject) {
                Promise.all(testPromises)
                    .then(function (speeds) {
                    // Get sampled mbps value
                    var speed = Helpers_1.calculateAverageMbps(speeds);
                    var scaleMap = {};
                    // Calculate n pixels (downscaled) for each format and map
                    mp4FormatList.forEach(function (key) {
                        var _a = videos[key], width = _a.width, height = _a.height;
                        var scaledPixels = (width * height) / 100000;
                        scaleMap[scaledPixels] = key;
                    });
                    // Convert scaled pixel values to arr of float vals and get closest val to mbps
                    var bestFit = Object.keys(scaleMap)
                        .map(function (key) { return parseFloat(key); })
                        .reduce(function (c, p) { return (Math.abs(c - speed) < Math.abs(p - speed)) ? c : p; });
                    resolve(scaleMap[bestFit]);
                })
                    .catch(function (e) {
                    reject(mp4FormatList.slice(-1).pop());
                });
            });
        };
        /*
            Set player data once video file was selected
         */
        _this.setPlayerData = function (videoSrc, invokeHls, posterSrc) {
            if (posterSrc === void 0) { posterSrc = null; }
            var hlsSupport = _this.hlsSupport;
            var HLSJS = ImposiumPlayer.hlsSupportLevels.HLSJS;
            if (invokeHls && hlsSupport === HLSJS) {
                if (_this.hlsPlayer) {
                    _this.hlsPlayer.destroy();
                }
                _this.hlsPlayer = new hls();
                _this.hlsPlayer.attachMedia(_this.node);
                _this.hlsPlayer.loadSource(videoSrc);
            }
            else {
                _this.node.src = videoSrc;
            }
            if (posterSrc) {
                _this.node.poster = posterSrc;
            }
        };
        /*
            Pause the media stream if playing
         */
        _this.pauseIfPlaying = function () {
            if (!_this.node.paused) {
                _this.node.pause();
            }
        };
        var validClient = !!(client && client.clientConfig);
        try {
            if (!validClient) {
                throw new Exceptions_1.PlayerConfigurationError('badClient', null);
            }
            if (node instanceof HTMLVideoElement) {
                client.bindPlayer(_this);
                _this.init(config);
                _this.setupHls();
            }
        }
        catch (e) {
            var storyId = (validClient) ? client.clientConfig.storyId : '';
            ExceptionPipe_1.default.trapError(e, storyId);
        }
        return _this;
    }
    ImposiumPlayer.events = {
        PLAY: 'play',
        PAUSE: 'pause',
        COMPLETE: 'ended',
        ERROR: 'error',
        SEEK: 'seeked',
        TIME: 'timeupdate',
        VOLUME: 'volumechange',
        MUTE: 'muted',
        CONTROLS: 'controlsset'
    };
    ImposiumPlayer.STREAM_TYPE = settings.streamType;
    ImposiumPlayer.BANDWIDTH_SAMPLES = settings.bandwidthSamples;
    ImposiumPlayer.TEST_IMAGE = settings.testImage;
    ImposiumPlayer.bandwidthRatings = {
        LOW: settings.bandwidth.low,
        MID: settings.bandwidth.mid,
    };
    ImposiumPlayer.compressionLevels = {
        STREAM: settings.compression.stream,
        LOW: settings.compression.low,
        MID: settings.compression.mid,
        HIGH: settings.compression.high
    };
    ImposiumPlayer.hlsSupportLevels = {
        NATIVE: settings.hlsSupportLevels.native,
        HLSJS: settings.hlsSupportLevels.hlsjs
    };
    return ImposiumPlayer;
}(VideoPlayer_1.default));
exports["default"] = ImposiumPlayer;


/***/ }),

/***/ "./src/video/VideoPlayer.ts":
/*!**********************************!*\
  !*** ./src/video/VideoPlayer.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var GoogleAnalytics_1 = __webpack_require__(/*! ../scaffolding/GoogleAnalytics */ "./src/scaffolding/GoogleAnalytics.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").videoPlayer;
var VideoPlayer = /** @class */ (function () {
    /*
        Basis of Imposum / Fallback video player objects
     */
    function VideoPlayer(node) {
        var e_1, _a;
        var _this = this;
        // HTML Video element ref, active storyId on client
        this.node = null;
        this.storyId = '';
        this.gaProperty = '';
        // Base callbacks required in order to collect / measue. Add by media event name
        this.playbackHandlers = new Map([
            ['play', function () { return _this.onPlay(); }],
            ['pause', function () { return _this.onPause(); }],
            ['ended', function () { return _this.onEnded(); }],
            ['loaded', function () { return _this.onLoad(); }],
            ['volumechange', function () { return _this.onVolumeChange(); }]
        ]);
        this.queuedGACalls = [];
        this.experienceId = '';
        this.prevPlaybackEvent = 0;
        this.playbackInterval = -1;
        this.muted = false;
        /*
            Remove any callbacks bound to video player events
         */
        this.remove = function () {
            var e_2, _a;
            try {
                for (var _b = __values(_this.playbackHandlers.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], event_1 = _d[1];
                    _this.node.removeEventListener(key, event_1);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        /*
            Set the current GA property and flush the pre mature GA calls
         */
        this.setGaProperty = function (gaProperty) {
            // Clear out queued GA requests if the user changes a story
            if (_this.gaProperty && _this.gaProperty !== gaProperty && _this.queuedGACalls.length > 0) {
                _this.queuedGACalls = [];
            }
            _this.gaProperty = gaProperty;
            while (_this.queuedGACalls.length) {
                GoogleAnalytics_1.default.send(_this.queuedGACalls.pop());
            }
        };
        /*
            Set the current story id per client
         */
        this.setStoryId = function (storyId) {
            _this.storyId = storyId;
        };
        /*
            Set the current experience id per job that gets passed to analytics calls
         */
        this.setExperienceId = function (experienceId) {
            _this.experienceId = experienceId;
        };
        /*
            Emit or queue a GA event call,
         */
        this.emitGAEventAction = function (ea) {
            var t = VideoPlayer.GA_EMIT_TYPE, ec = VideoPlayer.GA_EMIT_CATEGORY;
            var _a = _this, tid = _a.gaProperty, el = _a.experienceId;
            var call = { t: t, tid: tid, ec: ec, el: el, ea: ea };
            if (_this.gaProperty) {
                GoogleAnalytics_1.default.send(call);
            }
            else {
                _this.queuedGACalls.push(call);
            }
        };
        /*
            Record loaded event
         */
        this.onLoad = function () {
            _this.emitGAEventAction('loaded');
        };
        /*
            Record mute events
         */
        this.onVolumeChange = function () {
            if (!_this.muted && _this.node.muted) {
                _this.emitGAEventAction('muted');
                _this.muted = true;
            }
            if (_this.muted && !_this.node.muted) {
                _this.emitGAEventAction('unmuted');
                _this.muted = false;
            }
        };
        /*
            Start an interval that runs during playback which triggers playback
            analytics calls
         */
        this.onPlay = function () {
            var setInterval = window.setInterval;
            clearInterval(_this.playbackInterval);
            _this.playbackInterval = setInterval(function () { return _this.checkPlayback(); }, VideoPlayer.INTERVAL_RATE);
            _this.emitGAEventAction('play');
        };
        /*
            Clear the interval on pause to prevent false positives
         */
        this.onPause = function () {
            clearInterval(_this.playbackInterval);
            if (_this.node.duration !== _this.node.currentTime) {
                _this.emitGAEventAction('pause');
            }
        };
        /*
            Clean up the timer and emit the final playback event
         */
        this.onEnded = function () {
            clearInterval(_this.playbackInterval);
            _this.emitGAEventAction('playback_1');
            _this.prevPlaybackEvent = 0;
        };
        /*
            Logic that checks to see what playback event should be fired based
            on the current playback progress, clears timer if markup context
            is lost.
         */
        this.checkPlayback = function () {
            if (_this.node) {
                var _a = _this.node, currentTime = _a.currentTime, duration = _a.duration;
                var perc = currentTime / duration;
                var next = VideoPlayer.PLAYBACK_EVENTS[_this.prevPlaybackEvent];
                if (perc > next) {
                    _this.emitGAEventAction("playback_" + next);
                    _this.prevPlaybackEvent++;
                }
            }
            else {
                clearInterval(_this.playbackInterval);
            }
        };
        try {
            if (!(node instanceof HTMLVideoElement)) {
                throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
            }
            try {
                for (var _b = __values(this.playbackHandlers.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], event_2 = _d[1];
                    node.addEventListener(key, event_2);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.node = node;
            this.muted = node.muted;
        }
        catch (e) {
            ExceptionPipe_1.default.trapError(e, this.storyId);
        }
    }
    VideoPlayer.INTERVAL_RATE = settings.checkPlaybackRateMs;
    VideoPlayer.PLAYBACK_EVENTS = settings.playbackEvents;
    VideoPlayer.GA_EMIT_TYPE = 'event';
    VideoPlayer.GA_EMIT_CATEGORY = 'video_player';
    return VideoPlayer;
}());
exports["default"] = VideoPlayer;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./node_modules/webstomp-client/dist/webstomp.js":
/*!*******************************************************!*\
  !*** ./node_modules/webstomp-client/dist/webstomp.js ***!
  \*******************************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var VERSIONS = {
      V1_0: '1.0',
      V1_1: '1.1',
      V1_2: '1.2',
      // Versions of STOMP specifications supported
      supportedVersions: function supportedVersions() {
          return '1.2,1.1,1.0';
      },
      supportedProtocols: function supportedProtocols() {
          return ['v10.stomp', 'v11.stomp', 'v12.stomp'];
      }
  };

  var PROTOCOLS_VERSIONS = {
      'v10.stomp': VERSIONS.V1_0,
      'v11.stomp': VERSIONS.V1_1,
      'v12.stomp': VERSIONS.V1_2
  };

  function getSupportedVersion(protocol, debug) {
      var knownVersion = PROTOCOLS_VERSIONS[protocol];
      if (!knownVersion && debug) {
          debug('DEPRECATED: ' + protocol + ' is not a recognized STOMP version. In next major client version, this will close the connection.');
      }
      // 2nd temporary fallback if the protocol
      // does not match a supported STOMP version
      // This fallback will be removed in next major version
      return knownVersion || VERSIONS.V1_2;
  }

  // Define constants for bytes used throughout the code.
  var BYTES = {
      // LINEFEED byte (octet 10)
      LF: '\x0A',
      // NULL byte (octet 0)
      NULL: '\x00'
  };

  // utility function to trim any whitespace before and after a string
  var trim = function trim(str) {
      return str.replace(/^\s+|\s+$/g, '');
  };

  // from https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
  function unicodeStringToTypedArray(s) {
      var escstr = encodeURIComponent(s);
      var binstr = escstr.replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode('0x' + p1);
      });
      var arr = Array.prototype.map.call(binstr, function (c) {
          return c.charCodeAt(0);
      });
      return new Uint8Array(arr);
  }

  // from https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
  function typedArrayToUnicodeString(ua) {
      var binstr = String.fromCharCode.apply(String, toConsumableArray(ua));
      var escstr = binstr.replace(/(.)/g, function (m, p) {
          var code = p.charCodeAt(0).toString(16).toUpperCase();
          if (code.length < 2) {
              code = '0' + code;
          }
          return '%' + code;
      });
      return decodeURIComponent(escstr);
  }

  // Compute the size of a UTF-8 string by counting its number of bytes
  // (and not the number of characters composing the string)
  function sizeOfUTF8(s) {
      if (!s) return 0;
      return encodeURIComponent(s).match(/%..|./g).length;
  }

  function createId() {
      var ts = new Date().getTime();
      var rand = Math.floor(Math.random() * 1000);
      return ts + '-' + rand;
  }

  // [STOMP Frame](http://stomp.github.com/stomp-specification-1.1.html#STOMP_Frames) Class

  var Frame = function () {

      // Frame constructor
      function Frame(command) {
          var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          classCallCheck(this, Frame);

          this.command = command;
          this.headers = headers;
          this.body = body;
      }

      // Provides a textual representation of the frame
      // suitable to be sent to the server


      createClass(Frame, [{
          key: 'toString',
          value: function toString() {
              var _this = this;

              var lines = [this.command],
                  skipContentLength = this.headers['content-length'] === false;
              if (skipContentLength) delete this.headers['content-length'];

              Object.keys(this.headers).forEach(function (name) {
                  var value = _this.headers[name];
                  lines.push(name + ':' + value);
              });

              if (this.body && !skipContentLength) {
                  lines.push('content-length:' + sizeOfUTF8(this.body));
              }

              lines.push(BYTES.LF + this.body);

              return lines.join(BYTES.LF);
          }

          // Unmarshall a single STOMP frame from a `data` string

      }], [{
          key: 'unmarshallSingle',
          value: function unmarshallSingle(data) {
              // search for 2 consecutives LF byte to split the command
              // and headers from the body
              var divider = data.search(new RegExp(BYTES.LF + BYTES.LF)),
                  headerLines = data.substring(0, divider).split(BYTES.LF),
                  command = headerLines.shift(),
                  headers = {},
                  body = '',

              // skip the 2 LF bytes that divides the headers from the body
              bodyIndex = divider + 2;

              // Parse headers in reverse order so that for repeated headers, the 1st
              // value is used
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                  for (var _iterator = headerLines.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var line = _step.value;

                      var idx = line.indexOf(':');
                      headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
                  }
                  // Parse body
                  // check for content-length or topping at the first NULL byte found.
              } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                      }
                  } finally {
                      if (_didIteratorError) {
                          throw _iteratorError;
                      }
                  }
              }

              if (headers['content-length']) {
                  var len = parseInt(headers['content-length'], 10);
                  body = ('' + data).substring(bodyIndex, bodyIndex + len);
              } else {
                  var chr = null;
                  for (var i = bodyIndex; i < data.length; i++) {
                      chr = data.charAt(i);
                      if (chr === BYTES.NULL) break;
                      body += chr;
                  }
              }

              return new Frame(command, headers, body);
          }

          // Split the data before unmarshalling every single STOMP frame.
          // Web socket servers can send multiple frames in a single websocket message.
          // If the message size exceeds the websocket message size, then a single
          // frame can be fragmented across multiple messages.
          //
          // `datas` is a string.
          //
          // returns an *array* of Frame objects

      }, {
          key: 'unmarshall',
          value: function unmarshall(datas) {
              // split and unmarshall *multiple STOMP frames* contained in a *single WebSocket frame*.
              // The data is split when a NULL byte (followed by zero or many LF bytes) is found
              var frames = datas.split(new RegExp(BYTES.NULL + BYTES.LF + '*')),
                  firstFrames = frames.slice(0, -1),
                  lastFrame = frames.slice(-1)[0],
                  r = {
                  frames: firstFrames.map(function (f) {
                      return Frame.unmarshallSingle(f);
                  }),
                  partial: ''
              };

              // If this contains a final full message or just a acknowledgement of a PING
              // without any other content, process this frame, otherwise return the
              // contents of the buffer to the caller.
              if (lastFrame === BYTES.LF || lastFrame.search(RegExp(BYTES.NULL + BYTES.LF + '*$')) !== -1) {
                  r.frames.push(Frame.unmarshallSingle(lastFrame));
              } else {
                  r.partial = lastFrame;
              }

              return r;
          }

          // Marshall a Stomp frame

      }, {
          key: 'marshall',
          value: function marshall(command, headers, body) {
              var frame = new Frame(command, headers, body);
              return frame.toString() + BYTES.NULL;
          }
      }]);
      return Frame;
  }();

  // STOMP Client Class
  //
  // All STOMP protocol is exposed as methods of this class (`connect()`,
  // `send()`, etc.)

  var Client = function () {
      function Client(ws) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          classCallCheck(this, Client);

          // cannot have default options object + destructuring in the same time in method signature
          var _options$binary = options.binary,
              binary = _options$binary === undefined ? false : _options$binary,
              _options$heartbeat = options.heartbeat,
              heartbeat = _options$heartbeat === undefined ? { outgoing: 10000, incoming: 10000 } : _options$heartbeat,
              _options$debug = options.debug,
              debug = _options$debug === undefined ? true : _options$debug,
              _options$protocols = options.protocols,
              protocols = _options$protocols === undefined ? [] : _options$protocols;


          this.ws = ws;
          this.ws.binaryType = 'arraybuffer';
          this.isBinary = !!binary;
          this.hasDebug = !!debug;
          this.connected = false;
          // Heartbeat properties of the client
          // outgoing: send heartbeat every 10s by default (value is in ms)
          // incoming: expect to receive server heartbeat at least every 10s by default
          // falsy value means no heartbeat hence 0,0
          this.heartbeat = heartbeat || { outgoing: 0, incoming: 0 };
          // maximum *WebSocket* frame size sent by the client. If the STOMP frame
          // is bigger than this value, the STOMP frame will be sent using multiple
          // WebSocket frames (default is 16KiB)
          this.maxWebSocketFrameSize = 16 * 1024;
          // subscription callbacks indexed by subscriber's ID
          this.subscriptions = {};
          this.partialData = '';
          this.protocols = protocols;
      }

      // //// Debugging
      //
      // By default, debug messages are logged in the window's console if it is defined.
      // This method is called for every actual transmission of the STOMP frames over the
      // WebSocket.
      //
      // It is possible to set a `debug(message, data)` method
      // on a client instance to handle differently the debug messages:
      //
      //     client.debug = function(str) {
      //         // append the debug log to a #debug div
      //         $("#debug").append(str + "\n");
      //     };


      createClass(Client, [{
          key: 'debug',
          value: function debug() {
              var _console;

              if (this.hasDebug) (_console = console).log.apply(_console, arguments);
          }

          // [CONNECT Frame](http://stomp.github.com/stomp-specification-1.1.html#CONNECT_or_STOMP_Frame)
          //
          // The `connect` method accepts different number of arguments and types:
          //
          // * `connect(headers, connectCallback)`
          // * `connect(headers, connectCallback, errorCallback)`
          // * `connect(login, passcode, connectCallback)`
          // * `connect(login, passcode, connectCallback, errorCallback)`
          // * `connect(login, passcode, connectCallback, errorCallback, host)`
          //
          // The errorCallback is optional and the 2 first forms allow to pass other
          // headers in addition to `client`, `passcode` and `host`.

      }, {
          key: 'connect',
          value: function connect() {
              var _this = this;

              var _parseConnect2 = this._parseConnect.apply(this, arguments),
                  _parseConnect3 = slicedToArray(_parseConnect2, 3),
                  headers = _parseConnect3[0],
                  connectCallback = _parseConnect3[1],
                  errorCallback = _parseConnect3[2];

              this.connectCallback = connectCallback;
              this.debug('Opening Web Socket...');
              this.ws.onmessage = function (evt) {
                  var data = evt.data;
                  if (evt.data instanceof ArrayBuffer) {
                      data = typedArrayToUnicodeString(new Uint8Array(evt.data));
                  }
                  _this.serverActivity = Date.now();
                  // heartbeat
                  if (data === BYTES.LF) {
                      _this.debug('<<< PONG');
                      return;
                  }
                  _this.debug('<<< ' + data);
                  // Handle STOMP frames received from the server
                  // The unmarshall function returns the frames parsed and any remaining
                  // data from partial frames.
                  var unmarshalledData = Frame.unmarshall(_this.partialData + data);
                  _this.partialData = unmarshalledData.partial;
                  unmarshalledData.frames.forEach(function (frame) {
                      switch (frame.command) {
                          // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.1.html#CONNECTED_Frame)
                          case 'CONNECTED':
                              _this.debug('connected to server ' + frame.headers.server);
                              _this.connected = true;
                              _this.version = frame.headers.version;
                              _this._setupHeartbeat(frame.headers);
                              if (connectCallback) connectCallback(frame);
                              break;
                          // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.1.html#MESSAGE)
                          case 'MESSAGE':
                              // the `onreceive` callback is registered when the client calls
                              // `subscribe()`.
                              // If there is registered subscription for the received message,
                              // we used the default `onreceive` method that the client can set.
                              // This is useful for subscriptions that are automatically created
                              // on the browser side (e.g. [RabbitMQ's temporary
                              // queues](http://www.rabbitmq.com/stomp.html)).
                              var subscription = frame.headers.subscription;
                              var onreceive = _this.subscriptions[subscription] || _this.onreceive;
                              if (onreceive) {
                                  // 1.2 define ack header if ack is set to client
                                  // and this header must be used for ack/nack
                                  var messageID = _this.version === VERSIONS.V1_2 && frame.headers.ack || frame.headers['message-id'];
                                  // add `ack()` and `nack()` methods directly to the returned frame
                                  // so that a simple call to `message.ack()` can acknowledge the message.
                                  frame.ack = _this.ack.bind(_this, messageID, subscription);
                                  frame.nack = _this.nack.bind(_this, messageID, subscription);
                                  onreceive(frame);
                              } else {
                                  _this.debug('Unhandled received MESSAGE: ' + frame);
                              }
                              break;
                          // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.1.html#RECEIPT)
                          //
                          // The client instance can set its `onreceipt` field to a function taking
                          // a frame argument that will be called when a receipt is received from
                          // the server:
                          //
                          //     client.onreceipt = function(frame) {
                          //       receiptID = frame.headers['receipt-id'];
                          //       ...
                          //     }
                          case 'RECEIPT':
                              if (_this.onreceipt) _this.onreceipt(frame);
                              break;
                          // [ERROR Frame](http://stomp.github.com/stomp-specification-1.1.html#ERROR)
                          case 'ERROR':
                              if (errorCallback) errorCallback(frame);
                              break;
                          default:
                              _this.debug('Unhandled frame: ' + frame);
                      }
                  });
              };
              this.ws.onclose = function (event) {
                  _this.debug('Whoops! Lost connection to ' + _this.ws.url + ':', { event: event });
                  _this._cleanUp();
                  if (errorCallback) errorCallback(event);
              };
              this.ws.onopen = function () {
                  _this.debug('Web Socket Opened...');
                  // 1st protocol fallback on user 1st protocols options
                  // to prevent edge case where server does not comply and respond with a choosen protocol
                  // or when ws client does not handle protocol property very well
                  headers['accept-version'] = getSupportedVersion(_this.ws.protocol || _this.protocols[0], _this.debug.bind(_this));
                  // Check if we already have heart-beat in headers before adding them
                  if (!headers['heart-beat']) {
                      headers['heart-beat'] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
                  }
                  _this._transmit('CONNECT', headers);
              };
              if (this.ws.readyState === this.ws.OPEN) {
                  this.ws.onopen();
              }
          }

          // [DISCONNECT Frame](http://stomp.github.com/stomp-specification-1.1.html#DISCONNECT)

      }, {
          key: 'disconnect',
          value: function disconnect(disconnectCallback) {
              var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

              this._transmit('DISCONNECT', headers);
              // Discard the onclose callback to avoid calling the errorCallback when
              // the client is properly disconnected.
              this.ws.onclose = null;
              this.ws.close();
              this._cleanUp();
              // TODO: what's the point of this callback disconnect is not async
              if (disconnectCallback) disconnectCallback();
          }

          // [SEND Frame](http://stomp.github.com/stomp-specification-1.1.html#SEND)
          //
          // * `destination` is MANDATORY.

      }, {
          key: 'send',
          value: function send(destination) {
              var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
              var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              var hdrs = Object.assign({}, headers);
              hdrs.destination = destination;
              this._transmit('SEND', hdrs, body);
          }

          // [BEGIN Frame](http://stomp.github.com/stomp-specification-1.1.html#BEGIN)
          //
          // If no transaction ID is passed, one will be created automatically

      }, {
          key: 'begin',
          value: function begin() {
              var transaction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tx-' + createId();

              this._transmit('BEGIN', { transaction: transaction });
              return {
                  id: transaction,
                  commit: this.commit.bind(this, transaction),
                  abort: this.abort.bind(this, transaction)
              };
          }

          // [COMMIT Frame](http://stomp.github.com/stomp-specification-1.1.html#COMMIT)
          //
          // * `transaction` is MANDATORY.
          //
          // It is preferable to commit a transaction by calling `commit()` directly on
          // the object returned by `client.begin()`:
          //
          //     var tx = client.begin(txid);
          //     ...
          //     tx.commit();

      }, {
          key: 'commit',
          value: function commit(transaction) {
              this._transmit('COMMIT', { transaction: transaction });
          }

          // [ABORT Frame](http://stomp.github.com/stomp-specification-1.1.html#ABORT)
          //
          // * `transaction` is MANDATORY.
          //
          // It is preferable to abort a transaction by calling `abort()` directly on
          // the object returned by `client.begin()`:
          //
          //     var tx = client.begin(txid);
          //     ...
          //     tx.abort();

      }, {
          key: 'abort',
          value: function abort(transaction) {
              this._transmit('ABORT', { transaction: transaction });
          }

          // [ACK Frame](http://stomp.github.com/stomp-specification-1.1.html#ACK)
          //
          // * `messageID` & `subscription` are MANDATORY.
          //
          // It is preferable to acknowledge a message by calling `ack()` directly
          // on the message handled by a subscription callback:
          //
          //     client.subscribe(destination,
          //       function(message) {
          //         // process the message
          //         // acknowledge it
          //         message.ack();
          //       },
          //       {'ack': 'client'}
          //     );

      }, {
          key: 'ack',
          value: function ack(messageID, subscription) {
              var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              var hdrs = Object.assign({}, headers);
              // 1.2 change id header name from message-id to id
              var idAttr = this.version === VERSIONS.V1_2 ? 'id' : 'message-id';
              hdrs[idAttr] = messageID;
              hdrs.subscription = subscription;
              this._transmit('ACK', hdrs);
          }

          // [NACK Frame](http://stomp.github.com/stomp-specification-1.1.html#NACK)
          //
          // * `messageID` & `subscription` are MANDATORY.
          //
          // It is preferable to nack a message by calling `nack()` directly on the
          // message handled by a subscription callback:
          //
          //     client.subscribe(destination,
          //       function(message) {
          //         // process the message
          //         // an error occurs, nack it
          //         message.nack();
          //       },
          //       {'ack': 'client'}
          //     );

      }, {
          key: 'nack',
          value: function nack(messageID, subscription) {
              var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              var hdrs = Object.assign({}, headers);
              // 1.2 change id header name from message-id to id
              var idAttr = this.version === VERSIONS.V1_2 ? 'id' : 'message-id';
              hdrs[idAttr] = messageID;
              hdrs.subscription = subscription;
              this._transmit('NACK', hdrs);
          }

          // [SUBSCRIBE Frame](http://stomp.github.com/stomp-specification-1.1.html#SUBSCRIBE)

      }, {
          key: 'subscribe',
          value: function subscribe(destination, callback) {
              var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              var hdrs = Object.assign({}, headers);
              // for convenience if the `id` header is not set, we create a new one for this client
              // that will be returned to be able to unsubscribe this subscription
              if (!hdrs.id) hdrs.id = 'sub-' + createId();
              hdrs.destination = destination;
              this.subscriptions[hdrs.id] = callback;
              this._transmit('SUBSCRIBE', hdrs);
              return {
                  id: hdrs.id,
                  unsubscribe: this.unsubscribe.bind(this, hdrs.id)
              };
          }

          // [UNSUBSCRIBE Frame](http://stomp.github.com/stomp-specification-1.1.html#UNSUBSCRIBE)
          //
          // * `id` is MANDATORY.
          //
          // It is preferable to unsubscribe from a subscription by calling
          // `unsubscribe()` directly on the object returned by `client.subscribe()`:
          //
          //     var subscription = client.subscribe(destination, onmessage);
          //     ...
          //     subscription.unsubscribe(headers);

      }, {
          key: 'unsubscribe',
          value: function unsubscribe(id) {
              var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

              var hdrs = Object.assign({}, headers);
              delete this.subscriptions[id];
              hdrs.id = id;
              this._transmit('UNSUBSCRIBE', hdrs);
          }

          // Clean up client resources when it is disconnected or the server did not
          // send heart beats in a timely fashion

      }, {
          key: '_cleanUp',
          value: function _cleanUp() {
              this.connected = false;
              clearInterval(this.pinger);
              clearInterval(this.ponger);
          }

          // Base method to transmit any stomp frame

      }, {
          key: '_transmit',
          value: function _transmit(command, headers, body) {
              var out = Frame.marshall(command, headers, body);
              this.debug('>>> ' + out, { frame: { command: command, headers: headers, body: body } });
              this._wsSend(out);
          }
      }, {
          key: '_wsSend',
          value: function _wsSend(data) {
              if (this.isBinary) data = unicodeStringToTypedArray(data);
              this.debug('>>> length ' + data.length);
              // if necessary, split the *STOMP* frame to send it on many smaller
              // *WebSocket* frames
              while (true) {
                  if (data.length > this.maxWebSocketFrameSize) {
                      this.ws.send(data.slice(0, this.maxWebSocketFrameSize));
                      data = data.slice(this.maxWebSocketFrameSize);
                      this.debug('remaining = ' + data.length);
                  } else {
                      return this.ws.send(data);
                  }
              }
          }

          // Heart-beat negotiation

      }, {
          key: '_setupHeartbeat',
          value: function _setupHeartbeat(headers) {
              var _this2 = this;

              if (this.version !== VERSIONS.V1_1 && this.version !== VERSIONS.V1_2) return;

              // heart-beat header received from the server looks like:
              //
              //     heart-beat: sx, sy

              var _split$map = (headers['heart-beat'] || '0,0').split(',').map(function (v) {
                  return parseInt(v, 10);
              }),
                  _split$map2 = slicedToArray(_split$map, 2),
                  serverOutgoing = _split$map2[0],
                  serverIncoming = _split$map2[1];

              if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
                  var ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
                  this.debug('send PING every ' + ttl + 'ms');
                  this.pinger = setInterval(function () {
                      _this2._wsSend(BYTES.LF);
                      _this2.debug('>>> PING');
                  }, ttl);
              }

              if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
                  var _ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
                  this.debug('check PONG every ' + _ttl + 'ms');
                  this.ponger = setInterval(function () {
                      var delta = Date.now() - _this2.serverActivity;
                      // We wait twice the TTL to be flexible on window's setInterval calls
                      if (delta > _ttl * 2) {
                          _this2.debug('did not receive server activity for the last ' + delta + 'ms');
                          _this2.ws.close();
                      }
                  }, _ttl);
              }
          }

          // parse the arguments number and type to find the headers, connectCallback and
          // (eventually undefined) errorCallback

      }, {
          key: '_parseConnect',
          value: function _parseConnect() {
              var headers = {},
                  connectCallback = void 0,
                  errorCallback = void 0;

              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
              }

              switch (args.length) {
                  case 2:
                      headers = args[0];
                      connectCallback = args[1];

                      break;
                  case 3:
                      if (args[1] instanceof Function) {
                          headers = args[0];
                          connectCallback = args[1];
                          errorCallback = args[2];
                      } else {
                          headers.login = args[0];
                          headers.passcode = args[1];
                          connectCallback = args[2];
                      }
                      break;
                  case 4:
                      headers.login = args[0];
                      headers.passcode = args[1];
                      connectCallback = args[2];
                      errorCallback = args[3];

                      break;
                  default:
                      headers.login = args[0];
                      headers.passcode = args[1];
                      connectCallback = args[2];
                      errorCallback = args[3];
                      headers.host = args[4];

              }

              return [headers, connectCallback, errorCallback];
          }
      }]);
      return Client;
  }();

  // The `webstomp` Object
  var webstomp = {
      Frame: Frame,
      VERSIONS: VERSIONS,
      // This method creates a WebSocket client that is connected to
      // the STOMP server located at the url.
      client: function client(url) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var ws = new WebSocket(url, options.protocols || VERSIONS.supportedProtocols());
          return new Client(ws, options);
      },

      // This method is an alternative to `webstomp.client()` to let the user
      // specify the WebSocket to use (either a standard HTML5 WebSocket or
      // a similar object).
      over: function over() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
          }

          return new (Function.prototype.bind.apply(Client, [null].concat(args)))();
      }
  };

  return webstomp;

})));


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz","_integrity":"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==","_from":"axios@0.21.4"}');

/***/ }),

/***/ "./src/conf/errors.json":
/*!******************************!*\
  !*** ./src/conf/errors.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"moderation":{"rejection":"This experience was rejected."},"clientConfiguration":{"badConfig":"Your Imposium configuration is an invalid type.","storyId":"An undefined or invalid storyId was set in your Imposium configuration.","accessToken":"An undefined or invalid accessToken was set in your Imposium configuration.","invalidEventName":"Invalid client event name.","invalidCallbackType":"The callback reference set for this client event is not of type function.","badConfigOnGet":"You cannot call client.getExperience(...) without using the Imposium player or setting the GOT_EXPERIENCE event.","bagConfigOnPostRender":"You cannot call client.createExperience({...}) without using the Imposium player or setting the GOT_EXPERIENCE event.","badConfigOnPostNoRender":"You cannot call client.createExperience({...}, false) without setting the EXPERIENCE_CREATED event."},"playerConfiguration":{"badClient":"You must provide a valid Imposium client reference to the player.","invalidPlayerRef":"No reference to an HTML5 video element was detected.","invalidEventName":"Invalid player event name.","invalidCallbackType":"The callback reference set for this player event is not of type function.","eventNotConfigured":"You cannot invoke this player event without a callback set.","badQualityOverride":"The quality specified does not exist for this experience."},"network":{"httpFailure":"Unable to process request to the Imposium API.","tcpFailure":"Socket connection failed while processing the experience.","errorOverTcp":"An error occured on the Imposium web servers while processing the experience.","messageParseFailure":"Message data from Imposium was malformed."},"uncaught":{"generic":"Something unexpected went wrong."}}');

/***/ }),

/***/ "./src/conf/settings.json":
/*!********************************!*\
  !*** ./src/conf/settings.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"client":{"uuidLength":36,"defaultConfig":{"accessToken":"","storyId":"","compositionId":"","actId":"","sceneId":"","environment":"production","gaPlacement":"web","deliveryMode":"ws","pollRate":5000},"emptyHistory":{"prevExperienceId":"","prevMessage":""},"clientEmits":{"adding":"Adding job to queue...","added":"Added job to queue...","finishedPolling":"Video ready for viewing."},"eventNames":{"EXPERIENCE_CREATED":"EXPERIENCE_CREATED","UPLOAD_PROGRESS":"UPLOAD_PROGRESS","GOT_EXPERIENCE":"GOT_EXPERIENCE","STATUS_UPDATE":"STATUS_UPDATE","ERROR":"ERROR"}},"api":{"production":"https://api.imposium.com","staging":"https://api.staging.imposium.com","local":"https://api","currentVersion":"2.0.0","version":"X-Imposium-Api-Version","hmac":"X-Imposium-Access-Key","jwt":"Authorization"},"stomp":{"production":"wss://stomp.prod.k8s.nickel.media/ws","staging":"wss://stomp.staging.k8s.nickel.media/ws","local":"ws://127.0.0.1:15674/ws","exchange":"/exchange/imposium/","username":"imposium_stomp","password":"Teehe1ceeMe7Pe1d","maxRetries":0},"sentry":{"dsn":"https://17ffe982179e4d60a1df2062198d7ade@sentry.io/1411258","projectName":"imposium-js-sdk"},"messageConsumer":{"errorOverTcp":"Server failure.","videoSceneKey":"VideoScene01","emitTypes":{"scene":"gotScene","message":"gotMessage","complete":"actComplete"}},"analytics":{"exceptionProp":"UA-123315989-1","baseUrl":"https://ssl.google-analytics.com/collect","lsLookup":"imposium_js_ga_cid","gaPropPlaceholder":"[id_placeholder]","cidPlaceholder":"[cid_placeholder]"},"videoPlayer":{"defaultConfig":{"volume":1,"preload":"auto","loop":false,"muted":false,"autoLoad":true,"autoPlay":true,"controls":true,"crossOrigin":"anonymous","qualityOverride":null},"testImage":"https://cdn.imposium.com/SampleJPGImage_1mb.jpg","playbackEvents":[0,0.25,0.5,0.75],"checkPlaybackRateMs":100,"volumeMin":0,"volumeMax":1,"bandwidth":{"low":2.4,"mid":8},"compression":{"stream":"m3u8","low":"mp4_480","mid":"mp4_720","high":"mp4_1080"},"bandwidthSamples":5,"hlsSupportLevels":{"native":"native","hlsjs":"hls-js"},"streamType":"application/vnd.apple.mpegurl"}}');

/***/ }),

/***/ "./src/conf/warnings.json":
/*!********************************!*\
  !*** ./src/conf/warnings.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"client":{"nodeAnalytics":"Sorry, analytics are not currently available in NodeJS."},"network":{"tcpFailure":"Unable to reach Imposium while processing this experience, retrying..."},"playerFailure":{"seekNotReady":"Seek can\'t be called until the video metadata has loaded, please try again shortly.","invalidSeekTime":"Could not seek to time outside of current video duration.","invalidVolume":"Could not set volume outside of range (double) 0.0 - 1.0."},"analytics":{"requestFailed":"Failed to record Imposium metric."}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Entry.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=imposium.js.map
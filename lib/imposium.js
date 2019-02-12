// [IMPOSIUM-JS-SDK]  Version: 2.1.0  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Imposium", [], factory);
	else if(typeof exports === 'object')
		exports["Imposium"] = factory();
	else
		root["Imposium"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios-retry/index.js":
/*!*******************************************!*\
  !*** ./node_modules/axios-retry/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index */ "./node_modules/axios-retry/lib/index.js").default;

/***/ }),

/***/ "./node_modules/axios-retry/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/axios-retry/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNetworkError = isNetworkError;
exports.isRetryableError = isRetryableError;
exports.isSafeRequestError = isSafeRequestError;
exports.isIdempotentRequestError = isIdempotentRequestError;
exports.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
exports.exponentialDelay = exponentialDelay;
exports.default = axiosRetry;

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

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
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
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
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
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

    if (requestData === undefined) {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
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
  return createInstance(utils.merge(defaults, instanceConfig));
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

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

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
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
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

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

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

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
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
    response.data = transformData(
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
        reason.response.data = transformData(
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
  // Note: status is not exposed by XDomainRequest
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

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
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
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
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
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
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

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
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
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
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
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
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
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

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
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
  trim: trim
};


/***/ }),

/***/ "./node_modules/core-js/es6/promise.js":
/*!*********************************************!*\
  !*** ./node_modules/core-js/es6/promise.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/core-js/modules/es6.promise.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/core-js/fn/object/assign.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/object/assign.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/core-js/fn/symbol/key-for.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/fn/symbol/key-for.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Symbol.keyFor;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.4' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_invoke.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_microtask.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
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

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_new-promise-capability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_perform.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_promise-resolve.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_species-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_task.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_user-agent.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.promise.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
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
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/is-retry-allowed/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-retry-allowed/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WHITELIST = [
	'ETIMEDOUT',
	'ECONNRESET',
	'EADDRINUSE',
	'ESOCKETTIMEDOUT',
	'ECONNREFUSED',
	'EPIPE'
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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webstomp-client/dist/webstomp.js":
/*!*******************************************************!*\
  !*** ./node_modules/webstomp-client/dist/webstomp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
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

/***/ "./src/Entry.ts":
/*!**********************!*\
  !*** ./src/Entry.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
    MIT License

    Copyright (c) 2018 Imposium

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! core-js/es6/promise */ "./node_modules/core-js/es6/promise.js");
__webpack_require__(/*! core-js/fn/symbol/key-for */ "./node_modules/core-js/fn/symbol/key-for.js");
__webpack_require__(/*! core-js/fn/object/assign */ "./node_modules/core-js/fn/object/assign.js");
var Client_1 = __webpack_require__(/*! ./client/Client */ "./src/client/Client.ts");
exports.Client = Client_1.default;
var Player_1 = __webpack_require__(/*! ./video/Player */ "./src/video/Player.ts");
exports.Player = Player_1.default;
var _a = [__assign({}, Client_1.default.events), __assign({}, Player_1.default.events)], clientEvents = _a[0], playerEvents = _a[1];
exports.Events = clientEvents;
exports.PlayerEvents = playerEvents;


/***/ }),

/***/ "./src/analytics/Analytics.ts":
/*!************************************!*\
  !*** ./src/analytics/Analytics.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = __webpack_require__(/*! ../client/http/API */ "./src/client/http/API.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").analytics;
var Analytics = /** @class */ (function () {
    function Analytics() {
    }
    /*
        Enable GA calls
     */
    Analytics.setup = function () {
        Analytics.request.clientId = Analytics.checkCache();
    };
    /*
        Sends events off to the GA collect API
     */
    Analytics.send = function (event) {
        var makeRequest = Analytics.makeRequest, concatParams = Analytics.concatParams;
        makeRequest(concatParams(event));
    };
    Analytics.emitter = null;
    Analytics.retryTimeout = null;
    Analytics.request = {
        baseUrl: settings.baseUrl,
        cacheKey: settings.lsLookup,
        clientId: settings.cidPlaceholder
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
                guid: guid,
                expiry: expiry.setFullYear(expiry.getFullYear() + 2)
            };
            localStorage.setItem(cacheKey, JSON.stringify(cache));
        }
        catch (e) {
            // TODO, throw warning
            return guid;
        }
        return guid;
    };
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
        return "" + Math.round(new Date().getTime() / 1000);
    };
    /*
        Concatenates the default and event supplied parameters into a query string that
        can be digested by the GA collect API. Any event provided params need to be
        url encoded to prevent errors.
     */
    Analytics.concatParams = function (event) {
        var getRandom = Analytics.getRandom, _a = Analytics.request, baseUrl = _a.baseUrl, clientId = _a.clientId;
        var gaProperty = event.prp;
        delete event.prp;
        var queryString = baseUrl + "?v=1&tid=" + gaProperty + "&z=" + getRandom() + "&cid=" + clientId;
        for (var _i = 0, _b = Object.keys(event); _i < _b.length; _i++) {
            var param = _b[_i];
            queryString += "&" + encodeURIComponent(param) + "=" + encodeURIComponent(event[param]);
        }
        return queryString;
    };
    /*
        Makes GET request to GA collect API with formatted query string, retrying
        is handled by axios-retry with exponential decay
     */
    Analytics.makeRequest = function (url) {
        API_1.default.getGATrackingPixel(url)
            .catch(function (e) {
            ExceptionPipe_1.default.logWarning('analytics', 'requestFailed');
        });
    };
    return Analytics;
}());
exports.default = Analytics;


/***/ }),

/***/ "./src/client/Client.ts":
/*!******************************!*\
  !*** ./src/client/Client.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var API_1 = __webpack_require__(/*! ./http/API */ "./src/client/http/API.ts");
var MessageConsumer_1 = __webpack_require__(/*! ./tcp/MessageConsumer */ "./src/client/tcp/MessageConsumer.ts");
var Analytics_1 = __webpack_require__(/*! ../analytics/Analytics */ "./src/analytics/Analytics.ts");
var FallbackPlayer_1 = __webpack_require__(/*! ../video/FallbackPlayer */ "./src/video/FallbackPlayer.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var Version_1 = __webpack_require__(/*! ../scaffolding/Version */ "./src/scaffolding/Version.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").client;
var Client = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function Client(config) {
        var _this = this;
        this.clientConfig = null;
        this.eventDelegateRefs = Helpers_1.cloneWithKeys(Client.events);
        this.api = null;
        this.player = null;
        this.consumer = null;
        this.gaProperty = '';
        this.playerIsFallback = false;
        this.maxCreateRetries = settings.maxCreateRetries;
        this.renderHistory = {
            prevExperienceId: '',
            prevMessage: ''
        };
        this.emits = {
            adding: 'Adding job to queue...',
            added: 'Added job to queue...'
        };
        /*
            Exposed for users who may want to re-use a client for n stories
         */
        this.setup = function (config) {
            _this.mergeConfig(config);
        };
        /*
            Set current video player ref
         */
        this.setPlayer = function (player, isFallback) {
            if (isFallback === void 0) { isFallback = false; }
            var storyId = _this.clientConfig.storyId;
            _this.playerIsFallback = isFallback;
            _this.player = player;
            player.setStoryId(storyId);
        };
        /*
            Sets a callback for an event
         */
        this.on = function (eventName, callback) {
            var _a = _this, storyId = _a.clientConfig.storyId, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            try {
                if (Helpers_1.isFunc(callback)) {
                    if (Helpers_1.keyExists(Client.events, eventName)) {
                        eventDelegateRefs[eventName] = callback;
                    }
                    else {
                        throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                    }
                }
                else {
                    throw new Exceptions_1.ClientConfigurationError('invalidCallbackType', eventName);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Turns off a specific event or all events
         */
        this.off = function (eventName) {
            if (eventName === void 0) { eventName = ''; }
            var _a = _this, storyId = _a.clientConfig.storyId, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            try {
                if (eventName) {
                    if (Helpers_1.keyExists(Client.events, eventName)) {
                        eventDelegateRefs[eventName] = null;
                    }
                    else {
                        throw new Exceptions_1.ClientConfigurationError('invalidEventName', eventName);
                    }
                }
                else {
                    Object.keys(Client.events).forEach(function (event) {
                        eventDelegateRefs[event] = null;
                    });
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Get experience data
         */
        this.getExperience = function (experienceId) {
            var _a = _this, api = _a.api, player = _a.player, gaProperty = _a.gaProperty, storyId = _a.clientConfig.storyId, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
            try {
                if (GOT_EXPERIENCE || player) {
                    api.getExperience(experienceId)
                        .then(function (experience) {
                        var id = experience.id, output = experience.output, rendering = experience.rendering, moderation_status = experience.moderation_status;
                        _this.updateHistory('prevExperienceId', id);
                        if (Object.keys(output).length > 0) {
                            if (player) {
                                player.experienceGenerated(experience);
                            }
                            if (GOT_EXPERIENCE) {
                                GOT_EXPERIENCE(experience);
                            }
                        }
                        else {
                            if (moderation_status === 'rejected') {
                                var moderationError = new Exceptions_1.ModerationError('rejection', id);
                                ExceptionPipe_1.default.trapError(moderationError, storyId, ERROR);
                            }
                            else {
                                _this.warmConsumer(experienceId)
                                    .then(function () {
                                    if (!rendering) {
                                        api.invokeStream(experienceId)
                                            .catch(function (e) {
                                            throw new Exceptions_1.NetworkError('httpFailure', experienceId, e);
                                        });
                                    }
                                });
                            }
                        }
                    })
                        .catch(function (e) {
                        var wrappedError = new Exceptions_1.NetworkError('httpFailure', experienceId, e);
                        ExceptionPipe_1.default.trapError(wrappedError, storyId, ERROR);
                    });
                }
                else {
                    throw new Exceptions_1.ClientConfigurationError('eventNotConfigured', Client.events.GOT_EXPERIENCE);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Creates a new experience, pre warms a socket if returning video on demand
         */
        this.createExperience = function (inventory, render, retry) {
            if (render === void 0) { render = true; }
            if (retry === void 0) { retry = 0; }
            var uuid = Helpers_1.generateUUID();
            if (render) {
                _this.warmConsumer(uuid)
                    .then(function () {
                    _this.doCreateExperience(inventory, uuid, render, retry);
                });
            }
            else {
                _this.doCreateExperience(inventory, uuid, render, retry);
            }
        };
        /*
            Sets up analytics using fallback video player wrapper class
         */
        this.captureAnalytics = function (playerRef) {
            if (playerRef === void 0) { playerRef = null; }
            var _a = _this, storyId = _a.clientConfig.storyId, ERROR = _a.eventDelegateRefs.ERROR;
            try {
                if (playerRef instanceof HTMLVideoElement) {
                    _this.setPlayer(new FallbackPlayer_1.default(playerRef), true);
                }
                else {
                    // Prop passed wasn't of type HTMLVideoElement
                    throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Copies supplied config object to settings for sharing with sub components
         */
        this.mergeConfig = function (config) {
            var defaultConfig = settings.defaultConfig;
            var prevConfig = _this.clientConfig || defaultConfig;
            Helpers_1.prepConfig(config, defaultConfig);
            _this.clientConfig = __assign({}, prevConfig, config);
            if (!_this.api) {
                _this.api = new API_1.default(_this.clientConfig.accessToken, _this.clientConfig.environment);
            }
            else {
                _this.api.configureClient(_this.clientConfig.accessToken, _this.clientConfig.environment);
            }
            _this.getAnalyticsProperty();
        };
        /*
            Get the GA property per storyId passed in
         */
        this.getAnalyticsProperty = function () {
            var _a = _this, api = _a.api, storyId = _a.clientConfig.storyId, ERROR = _a.eventDelegateRefs.ERROR;
            api.getStory(storyId)
                .then(function (story) {
                var gaTrackingId = story.gaTrackingId;
                if (gaTrackingId) {
                    _this.gaProperty = gaTrackingId;
                    if (_this.player) {
                        _this.player.setGaProperty(gaTrackingId);
                    }
                    Analytics_1.default.setup();
                    _this.doPageView();
                    window.addEventListener('popstate', function () { return _this.doPageView(); });
                }
            })
                .catch(function (e) {
                var wrappedError = new Exceptions_1.NetworkError('httpFailure', null, e);
                ExceptionPipe_1.default.trapError(wrappedError, storyId, ERROR);
            });
        };
        /*
            Emit a GA page view event each time popstate occurs or the ga prop gets set
         */
        this.doPageView = function () {
            var gaProperty = _this.gaProperty;
            Analytics_1.default.send({
                prp: gaProperty,
                t: 'pageview',
                dp: window.location.pathname
            });
        };
        /*
            Create new experience & return relevant meta
         */
        this.doCreateExperience = function (inventory, uuid, render, retry) {
            var _a = _this, player = _a.player, playerIsFallback = _a.playerIsFallback, maxCreateRetries = _a.maxCreateRetries, storyId = _a.clientConfig.storyId, _b = _a.emits, adding = _b.adding, added = _b.added, _c = _a.eventDelegateRefs, GOT_EXPERIENCE = _c.GOT_EXPERIENCE, EXPERIENCE_CREATED = _c.EXPERIENCE_CREATED, STATUS_UPDATE = _c.STATUS_UPDATE, UPLOAD_PROGRESS = _c.UPLOAD_PROGRESS, ERROR = _c.ERROR;
            var permitRender = ((render && player !== null && !playerIsFallback) || Helpers_1.isFunc(GOT_EXPERIENCE));
            var permitCreate = Helpers_1.isFunc(EXPERIENCE_CREATED);
            try {
                if (permitRender || permitCreate) {
                    var api = _this.api;
                    if (STATUS_UPDATE && render) {
                        STATUS_UPDATE({ id: undefined, status: adding });
                        _this.updateHistory('prevMessage', adding);
                    }
                    api.postExperience(storyId, inventory, render, uuid, UPLOAD_PROGRESS)
                        .then(function (experience) {
                        var id = experience.id;
                        _this.updateHistory('prevExperienceId', id);
                        if (EXPERIENCE_CREATED) {
                            EXPERIENCE_CREATED(experience);
                        }
                        if (render && _this.renderHistory.prevMessage === adding && STATUS_UPDATE) {
                            STATUS_UPDATE({ id: id, status: added });
                            _this.updateHistory('prevMessage', added);
                        }
                    })
                        .catch(function (e) {
                        _this.killConsumer()
                            .then(function () {
                            if (~e.message.indexOf('400') && retry < maxCreateRetries) {
                                retry = retry + 1;
                                _this.createExperience(inventory, render, retry);
                            }
                            else {
                                var wrappedError = new Exceptions_1.NetworkError('httpFailure', null, e);
                                ExceptionPipe_1.default.trapError(wrappedError, storyId, ERROR);
                            }
                        });
                    });
                }
                else {
                    var eventType = null;
                    if (!EXPERIENCE_CREATED) {
                        eventType = Client.events.EXPERIENCE_CREATED;
                    }
                    if (render && !GOT_EXPERIENCE) {
                        eventType = Client.events.GOT_EXPERIENCE;
                    }
                    throw new Exceptions_1.ClientConfigurationError('eventNotConfigured', eventType);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Open stomp conn held by message consumer
         */
        this.warmConsumer = function (experienceId) {
            var _a = _this, player = _a.player, eventDelegateRefs = _a.eventDelegateRefs, _b = _a.clientConfig, storyId = _b.storyId, environment = _b.environment;
            return new Promise(function (resolve) {
                _this.killConsumer()
                    .then(function () {
                    var delegates = __assign({ updateHistory: function (k, v) { return _this.updateHistory(k, v); } }, eventDelegateRefs);
                    var consumerConfig = {
                        storyId: storyId,
                        experienceId: experienceId,
                        environment: environment,
                        delegates: delegates,
                        player: player
                    };
                    _this.consumer = new MessageConsumer_1.default(consumerConfig);
                    _this.consumer.connect()
                        .then(function () {
                        resolve();
                    });
                });
            });
        };
        /*
            Kill stomp conn held by message consumer
         */
        this.killConsumer = function () {
            return new Promise(function (resolve) {
                if (!_this.consumer) {
                    resolve();
                }
                else {
                    _this.consumer.kill()
                        .then(function () {
                        _this.consumer = null;
                        resolve();
                    });
                }
            });
        };
        /*
            Update render history state
         */
        this.updateHistory = function (key, value) {
            if (_this.renderHistory[key] !== value) {
                _this.renderHistory[key] = value;
            }
        };
        Version_1.printVersion();
        if (config.storyId && config.accessToken) {
            this.mergeConfig(config);
        }
        else {
            if (!config.storyId) {
                throw new Exceptions_1.ClientConfigurationError('storyId', null);
            }
            if (!config.accessToken) {
                throw new Exceptions_1.ClientConfigurationError('accessToken', null);
            }
        }
    }
    Client.events = {
        EXPERIENCE_CREATED: 'EXPERIENCE_CREATED',
        UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
        GOT_EXPERIENCE: 'GOT_EXPERIENCE',
        STATUS_UPDATE: 'STATUS_UPDATE',
        ERROR: 'ERROR'
    };
    return Client;
}());
exports.default = Client;


/***/ }),

/***/ "./src/client/http/API.ts":
/*!********************************!*\
  !*** ./src/client/http/API.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var jwt_decode = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
var axiosRetry = __webpack_require__(/*! axios-retry */ "./node_modules/axios-retry/index.js");
var Helpers_1 = __webpack_require__(/*! ../../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").api;
var API = /** @class */ (function () {
    function API(accessToken, env) {
        var _this = this;
        this.http = null;
        /*
            Set a new axios client
         */
        this.configureClient = function (accessToken, env) {
            var version = settings.version, currentVersion = settings.currentVersion;
            _this.http = axios_1.default.create({
                baseURL: settings[env],
                headers: __assign({}, _this.getAuthHeader(accessToken), (_a = {}, _a[version] = currentVersion, _a))
            });
            // Adds exponential back off to requests...
            API.retry(_this.http, { retryDelay: API.retry.exponentialDelay });
            var _a;
        };
        /*
            Wait async for story meta data, GA tracking property in particular (PLACEHOLDER)
         */
        this.getStory = function (storyId) {
            var get = _this.http.get;
            return new Promise(function (resolve, reject) {
                get("/story/" + storyId + "/ga")
                    .then(function (res) {
                    var data = res.data;
                    resolve(data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            Wait async for GET /experience, resolve response data
         */
        this.getExperience = function (experienceId) {
            var get = _this.http.get;
            return new Promise(function (resolve, reject) {
                get("/experience/" + experienceId)
                    .then(function (res) {
                    var data = res.data;
                    resolve(data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            Wait async for POST /experience, resolve response data
         */
        this.postExperience = function (storyId, inventory, render, uuid, progress) {
            if (progress === void 0) { progress = null; }
            var _a = _this, doPostExperience = _a.doPostExperience, uploadProgress = _a.uploadProgress;
            var formData = Helpers_1.inventoryToFormData(storyId, inventory);
            var config = {
                headers: {},
                onUploadProgress: function (e) { return uploadProgress(e, progress); }
            };
            formData.append('id', uuid);
            return doPostExperience(render, formData, config);
        };
        /*
            Wait async for POST /experience/{expId}/trigger-event, resolve on success
         */
        this.invokeStream = function (experienceId) {
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
            var jwt = settings.jwt, hmac = settings.hmac;
            try {
                jwt_decode(accessToken);
                return _a = {}, _a[jwt] = accessToken, _a;
            }
            catch (e) {
                return _b = {}, _b[hmac] = accessToken, _b;
            }
            var _a, _b;
        };
        /*
            Make create experience POST request and resolve
         */
        this.doPostExperience = function (render, formData, config) {
            var post = _this.http.post;
            var route = (render) ? '/experience/render' : '/experience';
            return new Promise(function (resolve, reject) {
                post(route, formData, config)
                    .then(function (res) {
                    var data = res.data;
                    resolve(data);
                })
                    .catch(function (e) {
                    reject(e);
                });
            });
        };
        /*
            Emit a rounded upload progress metric
         */
        this.uploadProgress = function (e, callback) {
            if (callback === void 0) { callback = null; }
            if (callback) {
                var loaded = e.loaded, total = e.total;
                var perc = Math.round(loaded / total * 100);
                callback(perc);
            }
        };
        this.configureClient(accessToken, env);
    }
    /*
        Wait async for GET-ing GA tracking pixel, resolve on success
     */
    API.getGATrackingPixel = function (url) {
        var get = axios_1.default.get;
        return new Promise(function (resolve, reject) {
            get(url)
                .then(function (res) {
                resolve();
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /*
        Check users bandwidth
     */
    API.checkBandwidth = function () {
        var get = axios_1.default.get;
        var url = API.testImage + "?bust=" + Math.random();
        var config = { responseType: 'blob', timeout: 1500 };
        return new Promise(function (resolve, reject) {
            var startTime = new Date().getTime();
            get(url, config)
                .then(function (res) {
                var size = res.data.size;
                resolve(Helpers_1.calculateMbps(startTime, size));
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    API.testImage = settings.img;
    API.retry = axiosRetry;
    return API;
}());
exports.default = API;


/***/ }),

/***/ "./src/client/tcp/MessageConsumer.ts":
/*!*******************************************!*\
  !*** ./src/client/tcp/MessageConsumer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExceptionPipe_1 = __webpack_require__(/*! ../../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var Stomp_1 = __webpack_require__(/*! ./Stomp */ "./src/client/tcp/Stomp.ts");
var Exceptions_1 = __webpack_require__(/*! ../../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").messageConsumer;
// Wraps around the Stomp client, providing the message handling
var MessageConsumer = /** @class */ (function () {
    function MessageConsumer(c) {
        var _this = this;
        this.stompDelegates = {
            route: function (f) { return _this.routeMessageData(f); },
            error: function (e) { return _this.stompError(e); }
        };
        this.storyId = '';
        this.environment = '';
        this.experienceId = null;
        this.clientDelegates = null;
        this.stomp = null;
        this.retried = settings.minReconnects;
        /*
            Initializes a stomp connection object
         */
        this.connect = function () {
            var _a = _this, experienceId = _a.experienceId, environment = _a.environment, stompDelegates = _a.stompDelegates;
            var stompConfig = {
                experienceId: experienceId,
                environment: environment,
                delegates: stompDelegates
            };
            _this.stomp = new Stomp_1.default(stompConfig);
            return new Promise(function (resolve) {
                _this.stomp.init()
                    .then(function () {
                    resolve();
                });
            });
        };
        /*
            Kill stomp connection
         */
        this.kill = function () {
            var stomp = _this.stomp;
            return new Promise(function (resolve) {
                stomp.disconnectAsync()
                    .then(function () {
                    resolve();
                });
            });
        };
        /*
            Manage incoming messages. Terminates stomp on actComplete.
         */
        this.routeMessageData = function (frame) {
            var _a = MessageConsumer.EMITS, scene = _a.scene, message = _a.message, complete = _a.complete;
            var _b = _this, stomp = _b.stomp, storyId = _b.storyId, experienceId = _b.experienceId, ERROR = _b.clientDelegates.ERROR;
            var body = frame.body;
            try {
                var emitData = JSON.parse(body);
                switch (emitData.event) {
                    case complete:
                        stomp.disconnectAsync();
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
                var wrappedError = new Exceptions_1.NetworkError('messageParseFailed', experienceId, e);
                ExceptionPipe_1.default.trapError(wrappedError, storyId, ERROR);
            }
        };
        /*
            Fire the gotMessage callback if the user is listening for this event
         */
        this.emitMessageData = function (emitData) {
            var _a = _this, storyId = _a.storyId, _b = _a.clientDelegates, updateHistory = _b.updateHistory, STATUS_UPDATE = _b.STATUS_UPDATE, ERROR = _b.ERROR;
            var status = emitData.status, id = emitData.id;
            try {
                if (status === settings.errorOverTcp) {
                    throw new Exceptions_1.NetworkError('errorOverTcp', id, null);
                }
                if (STATUS_UPDATE) {
                    STATUS_UPDATE(emitData);
                    updateHistory('prevMessage', status);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, storyId, ERROR);
            }
        };
        /*
            Parses the experience data into a prop delivered via gotScene
         */
        this.emitSceneData = function (experience) {
            var _a = _this, player = _a.player, storyId = _a.storyId, _b = _a.clientDelegates, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
            var id = experience.id, moderation_status = experience.moderation_status;
            if (moderation_status === 'rejected') {
                var moderationError = new Exceptions_1.ModerationError('rejection', id);
                ExceptionPipe_1.default.trapError(moderationError, storyId, ERROR);
            }
            else {
                if (player) {
                    player.experienceGenerated(experience);
                }
                if (GOT_EXPERIENCE) {
                    GOT_EXPERIENCE(experience);
                }
            }
        };
        /*
            Called on Stomp errors
         */
        this.stompError = function (e) {
            var MAX_RETRIES = MessageConsumer.MAX_RETRIES;
            var _a = _this, retried = _a.retried, storyId = _a.storyId, experienceId = _a.experienceId, stomp = _a.stomp, ERROR = _a.clientDelegates.ERROR;
            if (!e.wasClean) {
                ++_this.retried;
                if (retried < MAX_RETRIES) {
                    ExceptionPipe_1.default.logWarning('network', 'tcpFailure');
                    _this.kill()
                        .then(function () {
                        _this.connect();
                    });
                }
                else {
                    var wrappedError = new Exceptions_1.NetworkError('tcpFailure', experienceId, e);
                    _this.stomp = null;
                    ExceptionPipe_1.default.trapError(wrappedError, storyId, ERROR);
                }
            }
        };
        this.storyId = c.storyId;
        this.environment = c.environment;
        this.experienceId = c.experienceId;
        this.clientDelegates = c.delegates;
        if (c.player) {
            this.player = c.player;
        }
    }
    MessageConsumer.MAX_RETRIES = settings.maxReconnects;
    MessageConsumer.EMITS = settings.emitTypes;
    return MessageConsumer;
}());
exports.default = MessageConsumer;


/***/ }),

/***/ "./src/client/tcp/Stomp.ts":
/*!*********************************!*\
  !*** ./src/client/tcp/Stomp.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WebStomp = __webpack_require__(/*! webstomp-client */ "./node_modules/webstomp-client/dist/webstomp.js");
var settings = __webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").stomp;
var Stomp = /** @class */ (function () {
    function Stomp(c) {
        var _this = this;
        // WS / Stomp client refs
        this.socket = null;
        this.client = null;
        this.subscription = null;
        /*
            Initializes STOMP connection & tooling
         */
        this.init = function () {
            var u = Stomp.USERNAME, p = Stomp.PASSWORD, DEBUG_OFF = Stomp.DEBUG_OFF;
            var _a = _this, socket = _a.socket, error = _a.delegates.error;
            _this.client = WebStomp.over(socket);
            _this.client.debug = DEBUG_OFF;
            return new Promise(function (resolve) {
                var subscribed = function () { return _this.doSubscribe(resolve); };
                _this.client.connect(u, p, subscribed, error);
            });
        };
        /*
            Triggers socketIO to emit & sets up a listener for messages
         */
        this.doSubscribe = function (resolve) {
            var e = Stomp.EXCHANGE;
            var _a = _this, experienceId = _a.experienceId, client = _a.client, route = _a.delegates.route;
            var queueLoc = "" + e + experienceId;
            _this.subscription = client.subscribe(queueLoc, route);
            resolve();
        };
        /*
            Ends the current connection gracefully
         */
        this.disconnectAsync = function () {
            var OPEN_STATE = Stomp.OPEN_STATE;
            var _a = _this, client = _a.client, connected = _a.client.connected, subscription = _a.subscription;
            return new Promise(function (resolve) {
                var readyState = client.ws.readyState;
                if (readyState == OPEN_STATE) {
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                    client.disconnect(function () {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        };
        this.socket = new WebSocket(settings[c.environment]);
        this.experienceId = c.experienceId;
        this.delegates = c.delegates;
    }
    // Static RabbitMQ creds
    Stomp.EXCHANGE = settings.exchange;
    Stomp.USERNAME = settings.username;
    Stomp.PASSWORD = settings.password;
    // Ws open state
    Stomp.OPEN_STATE = 1;
    Stomp.DEBUG_OFF = function () { return; };
    return Stomp;
}());
exports.default = Stomp;


/***/ }),

/***/ "./src/conf/errors.json":
/*!******************************!*\
  !*** ./src/conf/errors.json ***!
  \******************************/
/*! exports provided: moderation, clientConfiguration, playerConfiguration, network, uncaught, default */
/***/ (function(module) {

module.exports = {"moderation":{"rejection":"This experience was rejected."},"clientConfiguration":{"storyId":"No storyId was set in your Imposium configuration.","accessToken":"No accessToken was set in your Imposium configuration.","invalidEventName":"Invalid client event name.","invalidCallbackType":"The callback reference set for this client event is not of type function.","eventNotConfigured":"You cannot invoke this client event without a callback set."},"playerConfiguration":{"noClient":"You must provide an Imposium client reference to the player.","invalidPlayerRef":"No reference to an HTML5 video element was detected.","invalidEventName":"Invalid player event name.","invalidCallbackType":"The callback reference set for this player event is not of type function.","eventNotConfigured":"You cannot invoke this player event without a callback set.","badQualityOverride":"The quality specified does not exist for this experience."},"network":{"httpFailure":"Unable to process request to the Imposium API.","tcpFailure":"Unable to reach Imposium while processing this experience.","errorOverTcp":"Something went wrong while processing this experience.","messageParseFailure":"Message data from Imposium was malformed."},"uncaught":{"generic":"Something unexpected went wrong."}};

/***/ }),

/***/ "./src/conf/settings.json":
/*!********************************!*\
  !*** ./src/conf/settings.json ***!
  \********************************/
/*! exports provided: client, api, stomp, messageConsumer, analytics, videoPlayer, default */
/***/ (function(module) {

module.exports = {"client":{"defaultConfig":{"accessToken":"","storyId":"","actId":"","sceneId":"","environment":"production"},"maxCreateRetries":3},"api":{"production":"https://api.imposium.com","staging":"https://api.staging.imposium.com","local":"https://api","currentVersion":"2.0.0","version":"X-Imposium-Api-Version","hmac":"X-Imposium-Access-Key","jwt":"Authorization","img":"https://cdn.imposium.com/SampleJPGImage_1mb.jpg"},"stomp":{"production":"wss://stomp.prod.k8s.nickel.media/ws","staging":"wss://stomp.staging.k8s.nickel.media/ws","local":"ws://127.0.0.1:15674/ws","exchange":"/exchange/imposium/","username":"imposium_stomp","password":"Teehe1ceeMe7Pe1d"},"messageConsumer":{"maxReconnects":5,"minReconnects":0,"errorOverTcp":"Server failure.","videoSceneKey":"VideoScene01","emitTypes":{"scene":"gotScene","message":"gotMessage","complete":"actComplete"}},"analytics":{"exceptionProp":"UA-123315989-1","baseUrl":"https://ssl.google-analytics.com/collect","lsLookup":"imposium_js_ga_cid","gaPropPlaceholder":"[id_placeholder]","cidPlaceholder":"[cid_placeholder]"},"videoPlayer":{"defaultConfig":{"volume":1,"preload":"auto","loop":false,"muted":false,"autoLoad":true,"autoPlay":true,"controls":true,"crossOrigin":"anonymous","qualityOverride":null},"playbackEvents":[0,0.25,0.5,0.75],"checkPlaybackRateMs":100,"volumeMin":0,"volumeMax":1,"bandwidth":{"low":2.4,"mid":8},"compression":{"stream":"m3u8","low":"mp4_480","mid":"mp4_720","high":"mp4_1080"},"bandwidthSamples":5,"hlsSupportLevels":{"native":"native","hlsjs":"hls-js"},"streamType":"application/vnd.apple.mpegurl"}};

/***/ }),

/***/ "./src/conf/warnings.json":
/*!********************************!*\
  !*** ./src/conf/warnings.json ***!
  \********************************/
/*! exports provided: client, network, playerFailure, analytics, default */
/***/ (function(module) {

module.exports = {"client":{"nodeAnalytics":"Sorry, analytics are not currently available in NodeJS."},"network":{"tcpFailure":"Unable to reach Imposium while processing this experience, retrying..."},"playerFailure":{"seekNotReady":"Seek can't be called until the video metadata has loaded, please try again shortly.","invalidSeekTime":"Could not seek to time outside of current video duration.","invalidVolume":"Could not set volume outside of range (double) 0.0 - 1.0."},"analytics":{"requestFailed":"Failed to record Imposium metric."}};

/***/ }),

/***/ "./src/scaffolding/ExceptionPipe.ts":
/*!******************************************!*\
  !*** ./src/scaffolding/ExceptionPipe.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Analytics_1 = __webpack_require__(/*! ../analytics/Analytics */ "./src/analytics/Analytics.ts");
var Exceptions_1 = __webpack_require__(/*! ./Exceptions */ "./src/scaffolding/Exceptions.ts");
var Version_1 = __webpack_require__(/*! ./Version */ "./src/scaffolding/Version.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").analytics;
var warnings = __webpack_require__(/*! ../conf/warnings.json */ "./src/conf/warnings.json");
var ExceptionPipe = /** @class */ (function () {
    function ExceptionPipe() {
    }
    ExceptionPipe.logWarning = function (type, messageKey) {
        console.warn("IMPOSIUM\n" + warnings[type][messageKey]);
    };
    ExceptionPipe.trapError = function (e, storyId, errorEvent) {
        if (errorEvent === void 0) { errorEvent = null; }
        if (errorEvent) {
            errorEvent(e);
        }
        if (e.log) {
            if (!e.networkError) {
                ExceptionPipe.logError(e, storyId);
            }
            else {
                if (e.networkError.hasOwnProperty('config')) {
                    ExceptionPipe.logError(e, storyId);
                }
                else if (e.lazy) {
                    ExceptionPipe.logError(e, storyId);
                }
                else {
                    var u = new Exceptions_1.UncaughtError('generic', e.networkError);
                    ExceptionPipe.logError(u, storyId);
                }
            }
        }
        else {
            var u = new Exceptions_1.UncaughtError('generic', e);
            ExceptionPipe.logError(u, storyId);
        }
    };
    ExceptionPipe.errorsProperty = settings.exceptionProp;
    ExceptionPipe.logError = function (e, storyId) {
        e.log();
        ExceptionPipe.traceError(e, storyId);
    };
    ExceptionPipe.traceError = function (e, storyId) {
        var errorsProperty = ExceptionPipe.errorsProperty;
        var eventAction = "Version: " + Version_1.version + "*";
        if (e.eventName) {
            eventAction += "Event name: " + e.eventName + "*";
        }
        if (e.experienceId) {
            eventAction += "Experience ID: " + e.experienceId + "*";
        }
        if (e.networkError) {
            var url = (e.networkError.config) ? e.networkError.config.url : 'stomp connection';
            eventAction += "Url: " + url + "*Stack: " + e.networkError;
        }
        else if (e.uncaughtError) {
            eventAction += "Stack: " + e.uncaughtError;
        }
        else {
            eventAction += "Stack: " + e.stack;
        }
        Analytics_1.default.send({
            prp: errorsProperty,
            t: 'event',
            ec: e.type,
            ea: eventAction,
            el: storyId,
            ev: 0
        });
    };
    return ExceptionPipe;
}());
exports.default = ExceptionPipe;


/***/ }),

/***/ "./src/scaffolding/Exceptions.ts":
/*!***************************************!*\
  !*** ./src/scaffolding/Exceptions.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors = __webpack_require__(/*! ../conf/errors.json */ "./src/conf/errors.json");
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
        _this.prefix = '[IMPOSIUM ERROR]';
        _this.type = '';
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
            console.error(_this.prefix + "\n            \nReason: Moderation Issue\n            \nExperience ID: " + _this.experienceId + "\n            \nMessage: " + _this.message);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ModerationError);
        }
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
            console.error(_this.prefix + "\n            \nReason: Invalid client configuration\n            \nMessage: " + _this.message + "\n            \nEvent name: " + _this.eventName);
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
            console.error(_this.prefix + "\n            \nReason: Invalid player configuration\n            \nMessage: " + _this.message + "\n            \nEvent name: " + _this.eventName);
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
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError(messageKey, experienceId, e, lazy) {
        if (lazy === void 0) { lazy = false; }
        var _this = _super.call(this, errors[types.NETWORK][messageKey], types.NETWORK) || this;
        _this.experienceId = null;
        _this.networkError = null;
        _this.lazy = false;
        _this.log = function () {
            console.error(_this.prefix + "\n            \nReason: Network related error\n            \nMessage: " + _this.message + "\n            \nExperience ID: " + _this.experienceId + "\n            \nNetwork Error: ", _this.networkError);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, NetworkError);
        }
        _this.experienceId = experienceId || '<not_set>';
        _this.networkError = e;
        _this.lazy = lazy;
        return _this;
    }
    return NetworkError;
}(ImposiumError));
exports.NetworkError = NetworkError;
var UncaughtError = /** @class */ (function (_super) {
    __extends(UncaughtError, _super);
    function UncaughtError(messageKey, e) {
        var _this = _super.call(this, errors[types.UNCAUGHT][messageKey], types.UNCAUGHT) || this;
        _this.uncaughtError = null;
        _this.log = function () {
            console.error(_this.prefix + "\n            \nReason: Unknown\n            \nMessage: " + _this.message + "\n            \nError: ", _this.uncaughtError);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, NetworkError);
        }
        _this.uncaughtError = e;
        return _this;
    }
    return UncaughtError;
}(ImposiumError));
exports.UncaughtError = UncaughtError;


/***/ }),

/***/ "./src/scaffolding/Helpers.ts":
/*!************************************!*\
  !*** ./src/scaffolding/Helpers.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.inventoryToFormData = function (storyId, inventory) {
    var formData = new FormData();
    formData.append('story_id', storyId);
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
            else if (data && data instanceof Blob || data instanceof File) {
                // Deal with blobs && pre-parsed HTML5 File objects
                inventory[key] = '';
                formData.append(key, data, 'inventory.png');
            }
            // Add other inputs, for files this will just be a key that our API uses for a look up
            formData.append("inventory[" + key + "]", inventory[key]);
        }
    }
    return formData;
};


/***/ }),

/***/ "./src/scaffolding/Queue.ts":
/*!**********************************!*\
  !*** ./src/scaffolding/Queue.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        var _this = this;
        this.enqueue = function (item) {
            _this.q.push(item);
        };
        this.pop = function () {
            _this.q.splice(0, 1);
        };
        this.reset = function () {
            _this.q = [];
        };
        this.peek = function () {
            return _this.q[0];
        };
        this.isEmpty = function () {
            return (_this.q.length === 0);
        };
        this.getLength = function () {
            return _this.q.length;
        };
        this.q = [];
    }
    return Queue;
}());
exports.default = Queue;


/***/ }),

/***/ "./src/scaffolding/Version.ts":
/*!************************************!*\
  !*** ./src/scaffolding/Version.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = '2.1.0';
exports.printVersion = function () {
    console.log("%cPowered By%c Imposium%c v" + exports.version + "%c https://imposium.com", 'text-transform: uppercase; padding: 5px 0px 5px 5px; background-color: black; color: white;', 'text-transform: uppercase; padding: 5px 0px 5px 0px; background-color: black; color: #a1b83a;', 'padding: 5px 5px 5px 0px; background-color: black; color: white;', 'padding: 5px 5px 5px 0px;');
};


/***/ }),

/***/ "./src/video/FallbackPlayer.ts":
/*!*************************************!*\
  !*** ./src/video/FallbackPlayer.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = FallbackPlayer;


/***/ }),

/***/ "./src/video/Player.ts":
/*!*****************************!*\
  !*** ./src/video/Player.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import ShakaPlayer from 'shaka-player';
// console.log(ShakaPlayer)
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = __webpack_require__(/*! ../client/http/API */ "./src/client/http/API.ts");
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
            _this.imposiumPlayerConfig = __assign({}, defaultConfig, config);
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
            var eventDelegateRefs = _this.eventDelegateRefs;
            var defaultConfig = settings.defaultConfig;
            _this.pauseIfPlaying();
            for (var _i = 0, _a = Object.keys(eventDelegateRefs); _i < _a.length; _i++) {
                var key = _a[_i];
                _this.off(eventDelegateRefs[key]);
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
            Adapt quality manually if HLS cannot be supported
         */
        _this.checkBandwidth = function (videos) {
            var bandwidthRatings = ImposiumPlayer.bandwidthRatings, compressionLevels = ImposiumPlayer.compressionLevels, BANDWIDTH_SAMPLES = ImposiumPlayer.BANDWIDTH_SAMPLES;
            var testPromises = [];
            var mp4FormatList = Object.keys(videos).filter(function (f) { return f !== 'm3u8'; });
            for (var i = 0; i < BANDWIDTH_SAMPLES; i++) {
                testPromises.push(API_1.default.checkBandwidth());
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
        try {
            if (node instanceof HTMLVideoElement) {
                if (client) {
                    client.setPlayer(_this);
                    _this.init(config);
                    _this.setupHls();
                }
                else {
                    throw new Exceptions_1.PlayerConfigurationError('noClient', null);
                }
            }
            else {
                throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
            }
        }
        catch (e) {
            ExceptionPipe_1.default.trapError(e, client.clientConfig.storyId);
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
exports.default = ImposiumPlayer;


/***/ }),

/***/ "./src/video/VideoPlayer.ts":
/*!**********************************!*\
  !*** ./src/video/VideoPlayer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = __webpack_require__(/*! ../scaffolding/Queue */ "./src/scaffolding/Queue.ts");
var Analytics_1 = __webpack_require__(/*! ../analytics/Analytics */ "./src/analytics/Analytics.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").videoPlayer;
var VideoPlayer = /** @class */ (function () {
    /*
        Basis of Imposum/Fallback video player objects
     */
    function VideoPlayer(node) {
        var _this = this;
        // HTML Video element ref, active storyId on client
        this.node = null;
        this.storyId = '';
        this.baseMediaEvents = {
            play: function () { return _this.onPlay(); },
            pause: function () { return _this.onPause(); },
            ended: function () { return _this.onEnd(); },
            loadStart: function () { return _this.onLoad(); }
        };
        this.gaProperty = '';
        this.experienceId = '';
        this.prevPlaybackEvent = 0;
        this.playbackInterval = -1;
        this.deferredGaCalls = new Queue_1.default();
        /*
            Remove set events set on the supplied player reference
         */
        this.remove = function () {
            var _a = _this, baseMediaEvents = _a.baseMediaEvents, node = _a.node;
            for (var _i = 0, _b = Object.keys(baseMediaEvents); _i < _b.length; _i++) {
                var key = _b[_i];
                node.removeEventListener(key, baseMediaEvents[key]);
            }
        };
        /*
            Set the current GA property and flush the pre mature GA calls
         */
        this.setGaProperty = function (gaProperty) {
            var deferredGaCalls = _this.deferredGaCalls;
            // Flush out pending requests if the user changes a story
            if (_this.gaProperty && _this.gaProperty !== gaProperty && !deferredGaCalls.isEmpty()) {
                deferredGaCalls.reset();
            }
            _this.gaProperty = gaProperty;
            while (deferredGaCalls.peek()) {
                Analytics_1.default.send(deferredGaCalls.peek());
                deferredGaCalls.pop();
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
            Record a video "view" event when the player loads metadata successfully
         */
        this.onLoad = function () {
            var _a = _this, gaProperty = _a.gaProperty, experienceId = _a.experienceId, deferredGaCalls = _a.deferredGaCalls;
            var call = {
                prp: gaProperty,
                t: 'event',
                ec: 'video_player',
                ea: 'view',
                el: experienceId
            };
            if (gaProperty) {
                Analytics_1.default.send(call);
            }
            else {
                deferredGaCalls.enqueue(call);
            }
        };
        /*
            Start an interval that runs during playback which triggers playback
            analytics calls
         */
        this.onPlay = function () {
            var _a = _this, gaProperty = _a.gaProperty, experienceId = _a.experienceId, deferredGaCalls = _a.deferredGaCalls;
            var setInterval = window.setInterval;
            var call = {
                prp: gaProperty,
                t: 'event',
                ec: 'video_player',
                ea: 'play',
                el: experienceId
            };
            clearInterval(_this.playbackInterval);
            _this.playbackInterval = setInterval(function () { return _this.checkPlayback(); }, VideoPlayer.intervalRate);
            if (gaProperty) {
                Analytics_1.default.send(call);
            }
            else {
                deferredGaCalls.enqueue(call);
            }
        };
        /*
            Clear the interval on pause to ensure no false analytics calls occur
         */
        this.onPause = function () {
            var _a = _this, gaProperty = _a.gaProperty, experienceId = _a.experienceId, deferredGaCalls = _a.deferredGaCalls, playbackInterval = _a.playbackInterval, node = _a.node;
            var call = {
                prp: gaProperty,
                t: 'event',
                ec: 'video_player',
                ea: 'pause',
                el: experienceId
            };
            clearInterval(playbackInterval);
            if (node.duration !== node.currentTime) {
                if (gaProperty) {
                    Analytics_1.default.send(call);
                }
                else {
                    deferredGaCalls.enqueue(call);
                }
            }
        };
        /*
            Logic that checks to see what playback event should be fire based
            on the current playback progress, clears the interval if the node
            is / becomes un set to prevent bad calls
         */
        this.checkPlayback = function () {
            var _a = _this, node = _a.node, prevPlaybackEvent = _a.prevPlaybackEvent, gaProperty = _a.gaProperty, experienceId = _a.experienceId, deferredGaCalls = _a.deferredGaCalls, playbackInterval = _a.playbackInterval;
            if (node) {
                var currentTime = node.currentTime, duration = node.duration;
                var perc = currentTime / duration;
                var next = VideoPlayer.playbackEvents[prevPlaybackEvent];
                if (perc > next) {
                    var call = {
                        prp: gaProperty,
                        t: 'event',
                        ec: 'video_player',
                        ea: "playback_" + next,
                        el: experienceId
                    };
                    if (gaProperty) {
                        Analytics_1.default.send(call);
                    }
                    else {
                        deferredGaCalls.enqueue(call);
                    }
                    _this.prevPlaybackEvent++;
                }
            }
            else {
                clearInterval(playbackInterval);
            }
        };
        /*
            Clear the playback interval and emit a final playback analytics call
         */
        this.onEnd = function () {
            var _a = _this, gaProperty = _a.gaProperty, experienceId = _a.experienceId, deferredGaCalls = _a.deferredGaCalls, playbackInterval = _a.playbackInterval;
            clearInterval(playbackInterval);
            var call = {
                prp: gaProperty,
                t: 'event',
                ec: 'video_player',
                ea: 'playback_1',
                el: experienceId
            };
            if (gaProperty) {
                Analytics_1.default.send(call);
            }
            else {
                deferredGaCalls.enqueue(call);
            }
            _this.prevPlaybackEvent = 0;
        };
        var _a = this, baseMediaEvents = _a.baseMediaEvents, storyId = _a.storyId;
        this.node = node;
        for (var _i = 0, _b = Object.keys(baseMediaEvents); _i < _b.length; _i++) {
            var key = _b[_i];
            try {
                this.node.addEventListener(key, this.baseMediaEvents[key]);
            }
            catch (e) {
                throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
            }
        }
    }
    // Playback event constants
    VideoPlayer.intervalRate = settings.checkPlaybackRateMs;
    VideoPlayer.playbackEvents = settings.playbackEvents;
    return VideoPlayer;
}());
exports.default = VideoPlayer;


/***/ })

/******/ });
});
//# sourceMappingURL=imposium.js.map 
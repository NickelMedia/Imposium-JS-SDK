// [IMPOSIUM-JS-SDK]  Version: 1.4.2  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("form-data"), require("isomorphic-ws"));
	else if(typeof define === 'function' && define.amd)
		define("Imposium", ["form-data", "isomorphic-ws"], factory);
	else if(typeof exports === 'object')
		exports["Imposium"] = factory(require("form-data"), require("isomorphic-ws"));
	else
		root["Imposium"] = factory(root["form-data"], root["isomorphic-ws"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_form_data__, __WEBPACK_EXTERNAL_MODULE_isomorphic_ws__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.ts");
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

/***/ "./node_modules/axios/lib/adapters/http.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/adapters/http.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = new Buffer(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = new Buffer(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttps ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};


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
    if (undefined !== 'test' &&
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
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/http.js");
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

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, bundlesize, dependencies, deprecated, description, devDependencies, homepage, keywords, license, main, name, repository, scripts, typings, version, default */
/***/ (function(module) {

module.exports = {"_from":"axios","_id":"axios@0.18.0","_inBundle":false,"_integrity":"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=","_location":"/axios","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"axios","name":"axios","escapedName":"axios","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/","/apisauce"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.18.0.tgz","_shasum":"32d53e4851efdc0a11993b6cd000789d70c05102","_spec":"axios","_where":"/Users/patrickchisholm/Documents/work/Imposium-JS-SDK","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.5.7","coveralls":"^2.11.9","es6-promise":"^4.0.5","grunt":"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","sinon":"^1.17.4","typescript":"^2.0.3","url-search-params":"^0.6.1","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","version":"0.18.0"};

/***/ }),

/***/ "./node_modules/babel-polyfill/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/shim */ "./node_modules/core-js/shim.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");

__webpack_require__(/*! core-js/fn/regexp/escape */ "./node_modules/core-js/fn/regexp/escape.js");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

/***/ }),

/***/ "./node_modules/core-js/fn/regexp/escape.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ "./node_modules/core-js/modules/core.regexp.escape.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").RegExp.escape;


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

/***/ "./node_modules/core-js/modules/_a-number-value.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
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

/***/ "./node_modules/core-js/modules/_array-copy-within.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-fill.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
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

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-reduce.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_bind.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
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

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-to-json.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-weak.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


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

/***/ "./node_modules/core-js/modules/_date-to-iso-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),

/***/ "./node_modules/core-js/modules/_date-to-primitive.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
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

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


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

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flatten-into-array.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


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

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


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

/***/ "./node_modules/core-js/modules/_is-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
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

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
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
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
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
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
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
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
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

/***/ "./node_modules/core-js/modules/_math-expm1.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ "./node_modules/core-js/modules/_math-fround.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-log1p.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-scale.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-sign.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


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

/***/ "./node_modules/core-js/modules/_metadata.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ "./node_modules/core-js/modules/es6.map.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
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
    var promise = Promise.resolve();
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

/***/ "./node_modules/core-js/modules/_object-forced-pam.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js")[K];
});


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

/***/ "./node_modules/core-js/modules/_object-sap.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-to-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_own-keys.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Reflect = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-float.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js") + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-int.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var ws = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


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
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
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

/***/ "./node_modules/core-js/modules/_replacer.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_same-value.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-from.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


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

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


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

/***/ "./node_modules/core-js/modules/_strict-method.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
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

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-html.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-pad.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var repeat = __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-trim.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var spaces = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "./node_modules/core-js/modules/_string-ws.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


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

/***/ "./node_modules/core-js/modules/_to-index.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
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

/***/ "./node_modules/core-js/modules/_typed-array.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js")) {
  var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
  var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
  var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
  var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
  var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js");
  var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
  var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
  var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
  var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
  var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
  var toIndex = __webpack_require__(/*! ./_to-index */ "./node_modules/core-js/modules/_to-index.js");
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
  var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
  var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
  var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
  var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
  var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
  var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
  var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
  var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js");
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
  var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
  var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
  var arrayFill = __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js");
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ "./node_modules/core-js/modules/_array-copy-within.js");
  var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/modules/_typed-buffer.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toIndex = __webpack_require__(/*! ./_to-index */ "./node_modules/core-js/modules/_to-index.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ "./node_modules/core-js/modules/_typed.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
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

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


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

/***/ "./node_modules/core-js/modules/core.regexp.escape.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $re = __webpack_require__(/*! ./_replacer */ "./node_modules/core-js/modules/_replacer.js")(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.copy-within.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ "./node_modules/core-js/modules/_array-copy-within.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('copyWithin');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.every.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $every = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.fill.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('fill');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.filter.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $filter = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.for-each.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $forEach = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.index-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $indexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.is-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js") });


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

/***/ "./node_modules/core-js/modules/es6.array.join.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js") != Object || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.last-index-of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.map.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $map = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.of.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce-right.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.slice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.some.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $some = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.sort.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.species.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('Array');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.now.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-iso-string.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ "./node_modules/core-js/modules/_date-to-iso-string.js");

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-json.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ "./node_modules/core-js/modules/_date-to-primitive.js"));


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.bind.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.has-instance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.name.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.acosh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var log1p = __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js");
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.asinh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.atanh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cbrt.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.clz32.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cosh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.expm1.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.fround.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ "./node_modules/core-js/modules/_math-fround.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.hypot.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.imul.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log10.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log1p.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log2.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sign.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sinh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.tanh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.trunc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, NUMBER, $Number);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.epsilon.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-finite.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var _isFinite = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-nan.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-safe-integer.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isInteger = __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js");
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.max-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.min-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-float.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-int.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-fixed.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var repeat = __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js");
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-precision.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


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

/***/ "./node_modules/core-js/modules/es6.object.create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.freeze.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-names.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js").f;
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-extensible.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-frozen.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-sealed.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ "./node_modules/core-js/modules/_same-value.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.prevent-extensions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.seal.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set });


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

/***/ "./node_modules/core-js/modules/es6.parse-float.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.parse-int.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


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
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
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
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
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
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
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

/***/ "./node_modules/core-js/modules/es6.reflect.apply.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var rApply = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var bind = __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js");
var rConstruct = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.define-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.delete-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.enumerate.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js")(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var getProto = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.has.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.is-extensible.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.own-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var setProto = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('RegExp');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.match.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.search.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.anchor.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.big.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.blink.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.bold.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.code-point-at.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.ends-with.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fixed.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontcolor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontsize.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.from-code-point.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.includes.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.italics.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
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

/***/ "./node_modules/core-js/modules/es6.string.link.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.raw.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.small.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.strike.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sub.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sup.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.trim.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
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

/***/ "./node_modules/core-js/modules/es6.typed.array-buffer.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
var buffer = __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var ArrayBuffer = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")(ARRAY_BUFFER);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.data-view.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js").ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js").DataView
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.float32-array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.float64-array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int16-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int32-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int8-array.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint16-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint32-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint8-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-set.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.flat-map.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ "./node_modules/core-js/modules/_flatten-into-array.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('flatMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.flatten.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ "./node_modules/core-js/modules/_flatten-into-array.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('flatten');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $includes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.asap.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var process = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").process;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.error.is-error.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.global.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.G, { global: __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Map') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.clamp.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.deg-per-rad.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.degrees.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.fscale.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var scale = __webpack_require__(/*! ./_math-scale */ "./node_modules/core-js/modules/_math-scale.js");
var fround = __webpack_require__(/*! ./_math-fround */ "./node_modules/core-js/modules/_math-fround.js");

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.iaddh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.imulh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.isubh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.rad-per-deg.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.radians.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.scale.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ "./node_modules/core-js/modules/_math-scale.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.signbit.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.umulh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.entries.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var ownKeys = __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.values.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $values = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.observable.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('Observable');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.finally.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.try.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.define-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ "./node_modules/core-js/modules/es6.set.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.metadata.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Set') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.at.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.match-all.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var getFlags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js")($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.pad-end.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__(/*! ./_string-pad */ "./node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.pad-start.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__(/*! ./_string-pad */ "./node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.trim-left.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.trim-right.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.observable.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.system.global.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-map.from.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('WeakMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-map.of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('WeakMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-set.from.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('WeakSet');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-set.of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('WeakSet');


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

/***/ "./node_modules/core-js/modules/web.immediate.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js");
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.timers.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "./node_modules/core-js/shim.js":
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ./modules/es6.object.create */ "./node_modules/core-js/modules/es6.object.create.js");
__webpack_require__(/*! ./modules/es6.object.define-property */ "./node_modules/core-js/modules/es6.object.define-property.js");
__webpack_require__(/*! ./modules/es6.object.define-properties */ "./node_modules/core-js/modules/es6.object.define-properties.js");
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ "./node_modules/core-js/modules/es6.object.get-prototype-of.js");
__webpack_require__(/*! ./modules/es6.object.keys */ "./node_modules/core-js/modules/es6.object.keys.js");
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ "./node_modules/core-js/modules/es6.object.get-own-property-names.js");
__webpack_require__(/*! ./modules/es6.object.freeze */ "./node_modules/core-js/modules/es6.object.freeze.js");
__webpack_require__(/*! ./modules/es6.object.seal */ "./node_modules/core-js/modules/es6.object.seal.js");
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ "./node_modules/core-js/modules/es6.object.prevent-extensions.js");
__webpack_require__(/*! ./modules/es6.object.is-frozen */ "./node_modules/core-js/modules/es6.object.is-frozen.js");
__webpack_require__(/*! ./modules/es6.object.is-sealed */ "./node_modules/core-js/modules/es6.object.is-sealed.js");
__webpack_require__(/*! ./modules/es6.object.is-extensible */ "./node_modules/core-js/modules/es6.object.is-extensible.js");
__webpack_require__(/*! ./modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
__webpack_require__(/*! ./modules/es6.object.is */ "./node_modules/core-js/modules/es6.object.is.js");
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ "./node_modules/core-js/modules/es6.object.set-prototype-of.js");
__webpack_require__(/*! ./modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ./modules/es6.function.bind */ "./node_modules/core-js/modules/es6.function.bind.js");
__webpack_require__(/*! ./modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
__webpack_require__(/*! ./modules/es6.function.has-instance */ "./node_modules/core-js/modules/es6.function.has-instance.js");
__webpack_require__(/*! ./modules/es6.parse-int */ "./node_modules/core-js/modules/es6.parse-int.js");
__webpack_require__(/*! ./modules/es6.parse-float */ "./node_modules/core-js/modules/es6.parse-float.js");
__webpack_require__(/*! ./modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
__webpack_require__(/*! ./modules/es6.number.to-fixed */ "./node_modules/core-js/modules/es6.number.to-fixed.js");
__webpack_require__(/*! ./modules/es6.number.to-precision */ "./node_modules/core-js/modules/es6.number.to-precision.js");
__webpack_require__(/*! ./modules/es6.number.epsilon */ "./node_modules/core-js/modules/es6.number.epsilon.js");
__webpack_require__(/*! ./modules/es6.number.is-finite */ "./node_modules/core-js/modules/es6.number.is-finite.js");
__webpack_require__(/*! ./modules/es6.number.is-integer */ "./node_modules/core-js/modules/es6.number.is-integer.js");
__webpack_require__(/*! ./modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ "./node_modules/core-js/modules/es6.number.is-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ "./node_modules/core-js/modules/es6.number.max-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ "./node_modules/core-js/modules/es6.number.min-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.parse-float */ "./node_modules/core-js/modules/es6.number.parse-float.js");
__webpack_require__(/*! ./modules/es6.number.parse-int */ "./node_modules/core-js/modules/es6.number.parse-int.js");
__webpack_require__(/*! ./modules/es6.math.acosh */ "./node_modules/core-js/modules/es6.math.acosh.js");
__webpack_require__(/*! ./modules/es6.math.asinh */ "./node_modules/core-js/modules/es6.math.asinh.js");
__webpack_require__(/*! ./modules/es6.math.atanh */ "./node_modules/core-js/modules/es6.math.atanh.js");
__webpack_require__(/*! ./modules/es6.math.cbrt */ "./node_modules/core-js/modules/es6.math.cbrt.js");
__webpack_require__(/*! ./modules/es6.math.clz32 */ "./node_modules/core-js/modules/es6.math.clz32.js");
__webpack_require__(/*! ./modules/es6.math.cosh */ "./node_modules/core-js/modules/es6.math.cosh.js");
__webpack_require__(/*! ./modules/es6.math.expm1 */ "./node_modules/core-js/modules/es6.math.expm1.js");
__webpack_require__(/*! ./modules/es6.math.fround */ "./node_modules/core-js/modules/es6.math.fround.js");
__webpack_require__(/*! ./modules/es6.math.hypot */ "./node_modules/core-js/modules/es6.math.hypot.js");
__webpack_require__(/*! ./modules/es6.math.imul */ "./node_modules/core-js/modules/es6.math.imul.js");
__webpack_require__(/*! ./modules/es6.math.log10 */ "./node_modules/core-js/modules/es6.math.log10.js");
__webpack_require__(/*! ./modules/es6.math.log1p */ "./node_modules/core-js/modules/es6.math.log1p.js");
__webpack_require__(/*! ./modules/es6.math.log2 */ "./node_modules/core-js/modules/es6.math.log2.js");
__webpack_require__(/*! ./modules/es6.math.sign */ "./node_modules/core-js/modules/es6.math.sign.js");
__webpack_require__(/*! ./modules/es6.math.sinh */ "./node_modules/core-js/modules/es6.math.sinh.js");
__webpack_require__(/*! ./modules/es6.math.tanh */ "./node_modules/core-js/modules/es6.math.tanh.js");
__webpack_require__(/*! ./modules/es6.math.trunc */ "./node_modules/core-js/modules/es6.math.trunc.js");
__webpack_require__(/*! ./modules/es6.string.from-code-point */ "./node_modules/core-js/modules/es6.string.from-code-point.js");
__webpack_require__(/*! ./modules/es6.string.raw */ "./node_modules/core-js/modules/es6.string.raw.js");
__webpack_require__(/*! ./modules/es6.string.trim */ "./node_modules/core-js/modules/es6.string.trim.js");
__webpack_require__(/*! ./modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ./modules/es6.string.code-point-at */ "./node_modules/core-js/modules/es6.string.code-point-at.js");
__webpack_require__(/*! ./modules/es6.string.ends-with */ "./node_modules/core-js/modules/es6.string.ends-with.js");
__webpack_require__(/*! ./modules/es6.string.includes */ "./node_modules/core-js/modules/es6.string.includes.js");
__webpack_require__(/*! ./modules/es6.string.repeat */ "./node_modules/core-js/modules/es6.string.repeat.js");
__webpack_require__(/*! ./modules/es6.string.starts-with */ "./node_modules/core-js/modules/es6.string.starts-with.js");
__webpack_require__(/*! ./modules/es6.string.anchor */ "./node_modules/core-js/modules/es6.string.anchor.js");
__webpack_require__(/*! ./modules/es6.string.big */ "./node_modules/core-js/modules/es6.string.big.js");
__webpack_require__(/*! ./modules/es6.string.blink */ "./node_modules/core-js/modules/es6.string.blink.js");
__webpack_require__(/*! ./modules/es6.string.bold */ "./node_modules/core-js/modules/es6.string.bold.js");
__webpack_require__(/*! ./modules/es6.string.fixed */ "./node_modules/core-js/modules/es6.string.fixed.js");
__webpack_require__(/*! ./modules/es6.string.fontcolor */ "./node_modules/core-js/modules/es6.string.fontcolor.js");
__webpack_require__(/*! ./modules/es6.string.fontsize */ "./node_modules/core-js/modules/es6.string.fontsize.js");
__webpack_require__(/*! ./modules/es6.string.italics */ "./node_modules/core-js/modules/es6.string.italics.js");
__webpack_require__(/*! ./modules/es6.string.link */ "./node_modules/core-js/modules/es6.string.link.js");
__webpack_require__(/*! ./modules/es6.string.small */ "./node_modules/core-js/modules/es6.string.small.js");
__webpack_require__(/*! ./modules/es6.string.strike */ "./node_modules/core-js/modules/es6.string.strike.js");
__webpack_require__(/*! ./modules/es6.string.sub */ "./node_modules/core-js/modules/es6.string.sub.js");
__webpack_require__(/*! ./modules/es6.string.sup */ "./node_modules/core-js/modules/es6.string.sup.js");
__webpack_require__(/*! ./modules/es6.date.now */ "./node_modules/core-js/modules/es6.date.now.js");
__webpack_require__(/*! ./modules/es6.date.to-json */ "./node_modules/core-js/modules/es6.date.to-json.js");
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ "./node_modules/core-js/modules/es6.date.to-iso-string.js");
__webpack_require__(/*! ./modules/es6.date.to-string */ "./node_modules/core-js/modules/es6.date.to-string.js");
__webpack_require__(/*! ./modules/es6.date.to-primitive */ "./node_modules/core-js/modules/es6.date.to-primitive.js");
__webpack_require__(/*! ./modules/es6.array.is-array */ "./node_modules/core-js/modules/es6.array.is-array.js");
__webpack_require__(/*! ./modules/es6.array.from */ "./node_modules/core-js/modules/es6.array.from.js");
__webpack_require__(/*! ./modules/es6.array.of */ "./node_modules/core-js/modules/es6.array.of.js");
__webpack_require__(/*! ./modules/es6.array.join */ "./node_modules/core-js/modules/es6.array.join.js");
__webpack_require__(/*! ./modules/es6.array.slice */ "./node_modules/core-js/modules/es6.array.slice.js");
__webpack_require__(/*! ./modules/es6.array.sort */ "./node_modules/core-js/modules/es6.array.sort.js");
__webpack_require__(/*! ./modules/es6.array.for-each */ "./node_modules/core-js/modules/es6.array.for-each.js");
__webpack_require__(/*! ./modules/es6.array.map */ "./node_modules/core-js/modules/es6.array.map.js");
__webpack_require__(/*! ./modules/es6.array.filter */ "./node_modules/core-js/modules/es6.array.filter.js");
__webpack_require__(/*! ./modules/es6.array.some */ "./node_modules/core-js/modules/es6.array.some.js");
__webpack_require__(/*! ./modules/es6.array.every */ "./node_modules/core-js/modules/es6.array.every.js");
__webpack_require__(/*! ./modules/es6.array.reduce */ "./node_modules/core-js/modules/es6.array.reduce.js");
__webpack_require__(/*! ./modules/es6.array.reduce-right */ "./node_modules/core-js/modules/es6.array.reduce-right.js");
__webpack_require__(/*! ./modules/es6.array.index-of */ "./node_modules/core-js/modules/es6.array.index-of.js");
__webpack_require__(/*! ./modules/es6.array.last-index-of */ "./node_modules/core-js/modules/es6.array.last-index-of.js");
__webpack_require__(/*! ./modules/es6.array.copy-within */ "./node_modules/core-js/modules/es6.array.copy-within.js");
__webpack_require__(/*! ./modules/es6.array.fill */ "./node_modules/core-js/modules/es6.array.fill.js");
__webpack_require__(/*! ./modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
__webpack_require__(/*! ./modules/es6.array.find-index */ "./node_modules/core-js/modules/es6.array.find-index.js");
__webpack_require__(/*! ./modules/es6.array.species */ "./node_modules/core-js/modules/es6.array.species.js");
__webpack_require__(/*! ./modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
__webpack_require__(/*! ./modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
__webpack_require__(/*! ./modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
__webpack_require__(/*! ./modules/es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
__webpack_require__(/*! ./modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
__webpack_require__(/*! ./modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
__webpack_require__(/*! ./modules/es6.regexp.search */ "./node_modules/core-js/modules/es6.regexp.search.js");
__webpack_require__(/*! ./modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
__webpack_require__(/*! ./modules/es6.promise */ "./node_modules/core-js/modules/es6.promise.js");
__webpack_require__(/*! ./modules/es6.map */ "./node_modules/core-js/modules/es6.map.js");
__webpack_require__(/*! ./modules/es6.set */ "./node_modules/core-js/modules/es6.set.js");
__webpack_require__(/*! ./modules/es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js");
__webpack_require__(/*! ./modules/es6.weak-set */ "./node_modules/core-js/modules/es6.weak-set.js");
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ "./node_modules/core-js/modules/es6.typed.array-buffer.js");
__webpack_require__(/*! ./modules/es6.typed.data-view */ "./node_modules/core-js/modules/es6.typed.data-view.js");
__webpack_require__(/*! ./modules/es6.typed.int8-array */ "./node_modules/core-js/modules/es6.typed.int8-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ "./node_modules/core-js/modules/es6.typed.uint8-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ "./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js");
__webpack_require__(/*! ./modules/es6.typed.int16-array */ "./node_modules/core-js/modules/es6.typed.int16-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ "./node_modules/core-js/modules/es6.typed.uint16-array.js");
__webpack_require__(/*! ./modules/es6.typed.int32-array */ "./node_modules/core-js/modules/es6.typed.int32-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ "./node_modules/core-js/modules/es6.typed.uint32-array.js");
__webpack_require__(/*! ./modules/es6.typed.float32-array */ "./node_modules/core-js/modules/es6.typed.float32-array.js");
__webpack_require__(/*! ./modules/es6.typed.float64-array */ "./node_modules/core-js/modules/es6.typed.float64-array.js");
__webpack_require__(/*! ./modules/es6.reflect.apply */ "./node_modules/core-js/modules/es6.reflect.apply.js");
__webpack_require__(/*! ./modules/es6.reflect.construct */ "./node_modules/core-js/modules/es6.reflect.construct.js");
__webpack_require__(/*! ./modules/es6.reflect.define-property */ "./node_modules/core-js/modules/es6.reflect.define-property.js");
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ "./node_modules/core-js/modules/es6.reflect.delete-property.js");
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ "./node_modules/core-js/modules/es6.reflect.enumerate.js");
__webpack_require__(/*! ./modules/es6.reflect.get */ "./node_modules/core-js/modules/es6.reflect.get.js");
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js");
__webpack_require__(/*! ./modules/es6.reflect.has */ "./node_modules/core-js/modules/es6.reflect.has.js");
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ "./node_modules/core-js/modules/es6.reflect.is-extensible.js");
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ "./node_modules/core-js/modules/es6.reflect.own-keys.js");
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js");
__webpack_require__(/*! ./modules/es6.reflect.set */ "./node_modules/core-js/modules/es6.reflect.set.js");
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js");
__webpack_require__(/*! ./modules/es7.array.includes */ "./node_modules/core-js/modules/es7.array.includes.js");
__webpack_require__(/*! ./modules/es7.array.flat-map */ "./node_modules/core-js/modules/es7.array.flat-map.js");
__webpack_require__(/*! ./modules/es7.array.flatten */ "./node_modules/core-js/modules/es7.array.flatten.js");
__webpack_require__(/*! ./modules/es7.string.at */ "./node_modules/core-js/modules/es7.string.at.js");
__webpack_require__(/*! ./modules/es7.string.pad-start */ "./node_modules/core-js/modules/es7.string.pad-start.js");
__webpack_require__(/*! ./modules/es7.string.pad-end */ "./node_modules/core-js/modules/es7.string.pad-end.js");
__webpack_require__(/*! ./modules/es7.string.trim-left */ "./node_modules/core-js/modules/es7.string.trim-left.js");
__webpack_require__(/*! ./modules/es7.string.trim-right */ "./node_modules/core-js/modules/es7.string.trim-right.js");
__webpack_require__(/*! ./modules/es7.string.match-all */ "./node_modules/core-js/modules/es7.string.match-all.js");
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ "./node_modules/core-js/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ./modules/es7.symbol.observable */ "./node_modules/core-js/modules/es7.symbol.observable.js");
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js");
__webpack_require__(/*! ./modules/es7.object.values */ "./node_modules/core-js/modules/es7.object.values.js");
__webpack_require__(/*! ./modules/es7.object.entries */ "./node_modules/core-js/modules/es7.object.entries.js");
__webpack_require__(/*! ./modules/es7.object.define-getter */ "./node_modules/core-js/modules/es7.object.define-getter.js");
__webpack_require__(/*! ./modules/es7.object.define-setter */ "./node_modules/core-js/modules/es7.object.define-setter.js");
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ "./node_modules/core-js/modules/es7.object.lookup-getter.js");
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ "./node_modules/core-js/modules/es7.object.lookup-setter.js");
__webpack_require__(/*! ./modules/es7.map.to-json */ "./node_modules/core-js/modules/es7.map.to-json.js");
__webpack_require__(/*! ./modules/es7.set.to-json */ "./node_modules/core-js/modules/es7.set.to-json.js");
__webpack_require__(/*! ./modules/es7.map.of */ "./node_modules/core-js/modules/es7.map.of.js");
__webpack_require__(/*! ./modules/es7.set.of */ "./node_modules/core-js/modules/es7.set.of.js");
__webpack_require__(/*! ./modules/es7.weak-map.of */ "./node_modules/core-js/modules/es7.weak-map.of.js");
__webpack_require__(/*! ./modules/es7.weak-set.of */ "./node_modules/core-js/modules/es7.weak-set.of.js");
__webpack_require__(/*! ./modules/es7.map.from */ "./node_modules/core-js/modules/es7.map.from.js");
__webpack_require__(/*! ./modules/es7.set.from */ "./node_modules/core-js/modules/es7.set.from.js");
__webpack_require__(/*! ./modules/es7.weak-map.from */ "./node_modules/core-js/modules/es7.weak-map.from.js");
__webpack_require__(/*! ./modules/es7.weak-set.from */ "./node_modules/core-js/modules/es7.weak-set.from.js");
__webpack_require__(/*! ./modules/es7.global */ "./node_modules/core-js/modules/es7.global.js");
__webpack_require__(/*! ./modules/es7.system.global */ "./node_modules/core-js/modules/es7.system.global.js");
__webpack_require__(/*! ./modules/es7.error.is-error */ "./node_modules/core-js/modules/es7.error.is-error.js");
__webpack_require__(/*! ./modules/es7.math.clamp */ "./node_modules/core-js/modules/es7.math.clamp.js");
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ "./node_modules/core-js/modules/es7.math.deg-per-rad.js");
__webpack_require__(/*! ./modules/es7.math.degrees */ "./node_modules/core-js/modules/es7.math.degrees.js");
__webpack_require__(/*! ./modules/es7.math.fscale */ "./node_modules/core-js/modules/es7.math.fscale.js");
__webpack_require__(/*! ./modules/es7.math.iaddh */ "./node_modules/core-js/modules/es7.math.iaddh.js");
__webpack_require__(/*! ./modules/es7.math.isubh */ "./node_modules/core-js/modules/es7.math.isubh.js");
__webpack_require__(/*! ./modules/es7.math.imulh */ "./node_modules/core-js/modules/es7.math.imulh.js");
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ "./node_modules/core-js/modules/es7.math.rad-per-deg.js");
__webpack_require__(/*! ./modules/es7.math.radians */ "./node_modules/core-js/modules/es7.math.radians.js");
__webpack_require__(/*! ./modules/es7.math.scale */ "./node_modules/core-js/modules/es7.math.scale.js");
__webpack_require__(/*! ./modules/es7.math.umulh */ "./node_modules/core-js/modules/es7.math.umulh.js");
__webpack_require__(/*! ./modules/es7.math.signbit */ "./node_modules/core-js/modules/es7.math.signbit.js");
__webpack_require__(/*! ./modules/es7.promise.finally */ "./node_modules/core-js/modules/es7.promise.finally.js");
__webpack_require__(/*! ./modules/es7.promise.try */ "./node_modules/core-js/modules/es7.promise.try.js");
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ "./node_modules/core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ "./node_modules/core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ "./node_modules/core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.metadata */ "./node_modules/core-js/modules/es7.reflect.metadata.js");
__webpack_require__(/*! ./modules/es7.asap */ "./node_modules/core-js/modules/es7.asap.js");
__webpack_require__(/*! ./modules/es7.observable */ "./node_modules/core-js/modules/es7.observable.js");
__webpack_require__(/*! ./modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
__webpack_require__(/*! ./modules/web.immediate */ "./node_modules/core-js/modules/web.immediate.js");
__webpack_require__(/*! ./modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ./modules/_core */ "./node_modules/core-js/modules/_core.js");


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/debug/src/index.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/debug/src/node.js":
/*!****************************************!*\
  !*** ./node_modules/debug/src/node.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "./node_modules/follow-redirects/index.js":
/*!************************************************!*\
  !*** ./node_modules/follow-redirects/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var assert = __webpack_require__(/*! assert */ "assert");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/index.js")("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  var currentRequest = this._currentRequest;
  if (!data) {
    currentRequest.end(null, null, callback);
  }
  else {
    this.write(data, encoding, function () {
      currentRequest.end(null, null, callback);
    });
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var requestBodyBuffers = this._requestBodyBuffers;
    (function writeNext() {
      if (requestBodyBuffers.length !== 0) {
        var buffer = requestBodyBuffers.pop();
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/hls.js/dist/hls.light.min.js":
/*!***************************************************!*\
  !*** ./node_modules/hls.js/dist/hls.light.min.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var a=r[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,i){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=23)}([function(t,e,r){"use strict";function i(){}function a(t,e){return e="["+t+"] > "+e}function n(t){var e=f.console[t];return e?function(){for(var r=arguments.length,i=Array(r),n=0;n<r;n++)i[n]=arguments[n];i[0]&&(i[0]=a(t,i[0])),e.apply(f.console,i)}:i}function o(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];r.forEach(function(e){u[e]=t[e]?t[e].bind(t):n(e)})}r.d(e,"a",function(){return c}),r.d(e,"b",function(){return h});var s=r(5),l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d={trace:i,debug:i,log:i,warn:i,info:i,error:i},u=d,f=Object(s.a)(),c=function(t){if(!0===t||"object"===(void 0===t?"undefined":l(t))){o(t,"debug","log","info","warn","error");try{u.log()}catch(t){u=d}}else u=d},h=u},function(t,e,r){"use strict";var i={MEDIA_ATTACHING:"hlsMediaAttaching",MEDIA_ATTACHED:"hlsMediaAttached",MEDIA_DETACHING:"hlsMediaDetaching",MEDIA_DETACHED:"hlsMediaDetached",BUFFER_RESET:"hlsBufferReset",BUFFER_CODECS:"hlsBufferCodecs",BUFFER_CREATED:"hlsBufferCreated",BUFFER_APPENDING:"hlsBufferAppending",BUFFER_APPENDED:"hlsBufferAppended",BUFFER_EOS:"hlsBufferEos",BUFFER_FLUSHING:"hlsBufferFlushing",BUFFER_FLUSHED:"hlsBufferFlushed",MANIFEST_LOADING:"hlsManifestLoading",MANIFEST_LOADED:"hlsManifestLoaded",MANIFEST_PARSED:"hlsManifestParsed",LEVEL_SWITCHING:"hlsLevelSwitching",LEVEL_SWITCHED:"hlsLevelSwitched",LEVEL_LOADING:"hlsLevelLoading",LEVEL_LOADED:"hlsLevelLoaded",LEVEL_UPDATED:"hlsLevelUpdated",LEVEL_PTS_UPDATED:"hlsLevelPtsUpdated",AUDIO_TRACKS_UPDATED:"hlsAudioTracksUpdated",AUDIO_TRACK_SWITCHING:"hlsAudioTrackSwitching",AUDIO_TRACK_SWITCHED:"hlsAudioTrackSwitched",AUDIO_TRACK_LOADING:"hlsAudioTrackLoading",AUDIO_TRACK_LOADED:"hlsAudioTrackLoaded",SUBTITLE_TRACKS_UPDATED:"hlsSubtitleTracksUpdated",SUBTITLE_TRACK_SWITCH:"hlsSubtitleTrackSwitch",SUBTITLE_TRACK_LOADING:"hlsSubtitleTrackLoading",SUBTITLE_TRACK_LOADED:"hlsSubtitleTrackLoaded",SUBTITLE_FRAG_PROCESSED:"hlsSubtitleFragProcessed",INIT_PTS_FOUND:"hlsInitPtsFound",FRAG_LOADING:"hlsFragLoading",FRAG_LOAD_PROGRESS:"hlsFragLoadProgress",FRAG_LOAD_EMERGENCY_ABORTED:"hlsFragLoadEmergencyAborted",FRAG_LOADED:"hlsFragLoaded",FRAG_DECRYPTED:"hlsFragDecrypted",FRAG_PARSING_INIT_SEGMENT:"hlsFragParsingInitSegment",FRAG_PARSING_USERDATA:"hlsFragParsingUserdata",FRAG_PARSING_METADATA:"hlsFragParsingMetadata",FRAG_PARSING_DATA:"hlsFragParsingData",FRAG_PARSED:"hlsFragParsed",FRAG_BUFFERED:"hlsFragBuffered",FRAG_CHANGED:"hlsFragChanged",FPS_DROP:"hlsFpsDrop",FPS_DROP_LEVEL_CAPPING:"hlsFpsDropLevelCapping",ERROR:"hlsError",DESTROYING:"hlsDestroying",KEY_LOADING:"hlsKeyLoading",KEY_LOADED:"hlsKeyLoaded",STREAM_STATE_TRANSITION:"hlsStreamStateTransition"};e.a=i},function(t,e,r){"use strict";r.d(e,"b",function(){return i}),r.d(e,"a",function(){return a});var i={NETWORK_ERROR:"networkError",MEDIA_ERROR:"mediaError",KEY_SYSTEM_ERROR:"keySystemError",MUX_ERROR:"muxError",OTHER_ERROR:"otherError"},a={KEY_SYSTEM_NO_KEYS:"keySystemNoKeys",KEY_SYSTEM_NO_ACCESS:"keySystemNoAccess",KEY_SYSTEM_NO_SESSION:"keySystemNoSession",KEY_SYSTEM_LICENSE_REQUEST_FAILED:"keySystemLicenseRequestFailed",MANIFEST_LOAD_ERROR:"manifestLoadError",MANIFEST_LOAD_TIMEOUT:"manifestLoadTimeOut",MANIFEST_PARSING_ERROR:"manifestParsingError",MANIFEST_INCOMPATIBLE_CODECS_ERROR:"manifestIncompatibleCodecsError",LEVEL_LOAD_ERROR:"levelLoadError",LEVEL_LOAD_TIMEOUT:"levelLoadTimeOut",LEVEL_SWITCH_ERROR:"levelSwitchError",AUDIO_TRACK_LOAD_ERROR:"audioTrackLoadError",AUDIO_TRACK_LOAD_TIMEOUT:"audioTrackLoadTimeOut",FRAG_LOAD_ERROR:"fragLoadError",FRAG_LOAD_TIMEOUT:"fragLoadTimeOut",FRAG_DECRYPT_ERROR:"fragDecryptError",FRAG_PARSING_ERROR:"fragParsingError",REMUX_ALLOC_ERROR:"remuxAllocError",KEY_LOAD_ERROR:"keyLoadError",KEY_LOAD_TIMEOUT:"keyLoadTimeOut",BUFFER_ADD_CODEC_ERROR:"bufferAddCodecError",BUFFER_APPEND_ERROR:"bufferAppendError",BUFFER_APPENDING_ERROR:"bufferAppendingError",BUFFER_STALLED_ERROR:"bufferStalledError",BUFFER_FULL_ERROR:"bufferFullError",BUFFER_SEEK_OVER_HOLE:"bufferSeekOverHole",BUFFER_NUDGE_ON_STALL:"bufferNudgeOnStall",INTERNAL_EXCEPTION:"internalException"}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(0),n=r(2),o=r(1),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=new Set(["hlsEventGeneric","hlsHandlerDestroying","hlsHandlerDestroyed"]),d=function(){function t(e){i(this,t),this.hls=e,this.onEvent=this.onEvent.bind(this);for(var r=arguments.length,a=Array(r>1?r-1:0),n=1;n<r;n++)a[n-1]=arguments[n];this.handledEvents=a,this.useGenericHandler=!0,this.registerListeners()}return t.prototype.destroy=function(){this.onHandlerDestroying(),this.unregisterListeners(),this.onHandlerDestroyed()},t.prototype.onHandlerDestroying=function(){},t.prototype.onHandlerDestroyed=function(){},t.prototype.isEventHandler=function(){return"object"===s(this.handledEvents)&&this.handledEvents.length&&"function"==typeof this.onEvent},t.prototype.registerListeners=function(){this.isEventHandler()&&this.handledEvents.forEach(function(t){if(l.has(t))throw new Error("Forbidden event-name: "+t);this.hls.on(t,this.onEvent)},this)},t.prototype.unregisterListeners=function(){this.isEventHandler()&&this.handledEvents.forEach(function(t){this.hls.off(t,this.onEvent)},this)},t.prototype.onEvent=function(t,e){this.onEventGeneric(t,e)},t.prototype.onEventGeneric=function(t,e){var r=function(t,e){var r="on"+t.replace("hls","");if("function"!=typeof this[r])throw new Error("Event "+t+" has no generic handler in this "+this.constructor.name+" class (tried "+r+")");return this[r].bind(this,e)};try{r.call(this,t,e).call()}catch(e){a.b.error("An internal error happened while handling event "+t+'. Error message: "'+e.message+'". Here is a stacktrace:',e),this.hls.trigger(o.a.ERROR,{type:n.b.OTHER_ERROR,details:n.a.INTERNAL_EXCEPTION,fatal:!1,event:t,err:e})}},t}();e.a=d},function(t,e){t.exports=void 0},function(t,e,r){"use strict";function i(){return"undefined"==typeof window?self:window}e.a=i},function(t,e,r){!function(e){var r=/^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,i=/^([^\/;?#]*)(.*)$/,a=/(?:\/|^)\.(?=\/)/g,n=/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,o={buildAbsoluteURL:function(t,e,r){if(r=r||{},t=t.trim(),!(e=e.trim())){if(!r.alwaysNormalize)return t;var a=this.parseURL(t);if(!s)throw new Error("Error trying to parse base URL.");return a.path=o.normalizePath(a.path),o.buildURLFromParts(a)}var n=this.parseURL(e);if(!n)throw new Error("Error trying to parse relative URL.");if(n.scheme)return r.alwaysNormalize?(n.path=o.normalizePath(n.path),o.buildURLFromParts(n)):e;var s=this.parseURL(t);if(!s)throw new Error("Error trying to parse base URL.");if(!s.netLoc&&s.path&&"/"!==s.path[0]){var l=i.exec(s.path);s.netLoc=l[1],s.path=l[2]}s.netLoc&&!s.path&&(s.path="/");var d={scheme:s.scheme,netLoc:n.netLoc,path:null,params:n.params,query:n.query,fragment:n.fragment};if(!n.netLoc&&(d.netLoc=s.netLoc,"/"!==n.path[0]))if(n.path){var u=s.path,f=u.substring(0,u.lastIndexOf("/")+1)+n.path;d.path=o.normalizePath(f)}else d.path=s.path,n.params||(d.params=s.params,n.query||(d.query=s.query));return null===d.path&&(d.path=r.alwaysNormalize?o.normalizePath(n.path):n.path),o.buildURLFromParts(d)},parseURL:function(t){var e=r.exec(t);return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(a,"");t.length!==(t=t.replace(n,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}};t.exports=o}()},function(t,e,r){"use strict";var i={search:function(t,e){for(var r=0,i=t.length-1,a=null,n=null;r<=i;){a=(r+i)/2|0,n=t[a];var o=e(n);if(o>0)r=a+1;else{if(!(o<0))return n;i=a-1}}return null}};e.a=i},function(t,e){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(t){return"function"==typeof t}function a(t){return"number"==typeof t}function n(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(t){if(!a(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},r.prototype.emit=function(t){var e,r,a,s,l,d;if(this._events||(this._events={}),"error"===t&&(!this._events.error||n(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var u=new Error('Uncaught, unspecified "error" event. ('+e+")");throw u.context=e,u}if(r=this._events[t],o(r))return!1;if(i(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),r.apply(this,s)}else if(n(r))for(s=Array.prototype.slice.call(arguments,1),d=r.slice(),a=d.length,l=0;l<a;l++)d[l].apply(this,s);return!0},r.prototype.addListener=function(t,e){var a;if(!i(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,i(e.listener)?e.listener:e),this._events[t]?n(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,n(this._events[t])&&!this._events[t].warned&&(a=o(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&a>0&&this._events[t].length>a&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(t,e){function r(){this.removeListener(t,r),a||(a=!0,e.apply(this,arguments))}if(!i(e))throw TypeError("listener must be a function");var a=!1;return r.listener=e,this.on(t,r),this},r.prototype.removeListener=function(t,e){var r,a,o,s;if(!i(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(r=this._events[t],o=r.length,a=-1,r===e||i(r.listener)&&r.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(n(r)){for(s=o;s-- >0;)if(r[s]===e||r[s].listener&&r[s].listener===e){a=s;break}if(a<0)return this;1===r.length?(r.length=0,delete this._events[t]):r.splice(a,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},r.prototype.removeAllListeners=function(t){var e,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[t],i(r))this.removeListener(t,r);else if(r)for(;r.length;)this.removeListener(t,r[r.length-1]);return delete this._events[t],this},r.prototype.listeners=function(t){return this._events&&this._events[t]?i(this._events[t])?[this._events[t]]:this._events[t].slice():[]},r.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(i(e))return 1;if(e)return e.length}return 0},r.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(){i(this,t)}return t.isHeader=function(t,e){return e+10<=t.length&&73===t[e]&&68===t[e+1]&&51===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128},t.isFooter=function(t,e){return e+10<=t.length&&51===t[e]&&68===t[e+1]&&73===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128},t.getID3Data=function(e,r){for(var i=r,a=0;t.isHeader(e,r);){a+=10;a+=t._readSize(e,r+6),t.isFooter(e,r+10)&&(a+=10),r+=a}if(a>0)return e.subarray(i,i+a)},t._readSize=function(t,e){var r=0;return r=(127&t[e])<<21,r|=(127&t[e+1])<<14,r|=(127&t[e+2])<<7,r|=127&t[e+3]},t.getTimeStamp=function(e){for(var r=t.getID3Frames(e),i=0;i<r.length;i++){var a=r[i];if(t.isTimeStampFrame(a))return t._readTimeStamp(a)}},t.isTimeStampFrame=function(t){return t&&"PRIV"===t.key&&"com.apple.streaming.transportStreamTimestamp"===t.info},t._getFrameData=function(e){var r=String.fromCharCode(e[0],e[1],e[2],e[3]),i=t._readSize(e,4);return{type:r,size:i,data:e.subarray(10,10+i)}},t.getID3Frames=function(e){for(var r=0,i=[];t.isHeader(e,r);){var a=t._readSize(e,r+6);r+=10;for(var n=r+a;r+8<n;){var o=t._getFrameData(e.subarray(r)),s=t._decodeFrame(o);s&&i.push(s),r+=o.size+10}t.isFooter(e,r)&&(r+=10)}return i},t._decodeFrame=function(e){return"PRIV"===e.type?t._decodePrivFrame(e):"T"===e.type[0]?t._decodeTextFrame(e):"W"===e.type[0]?t._decodeURLFrame(e):void 0},t._readTimeStamp=function(t){if(8===t.data.byteLength){var e=new Uint8Array(t.data),r=1&e[3],i=(e[4]<<23)+(e[5]<<15)+(e[6]<<7)+e[7];return i/=45,r&&(i+=47721858.84),Math.round(i)}},t._decodePrivFrame=function(e){if(!(e.size<2)){var r=t._utf8ArrayToStr(e.data,!0),i=new Uint8Array(e.data.subarray(r.length+1));return{key:e.type,info:r,data:i.buffer}}},t._decodeTextFrame=function(e){if(!(e.size<2)){if("TXXX"===e.type){var r=1,i=t._utf8ArrayToStr(e.data.subarray(r));r+=i.length+1;var a=t._utf8ArrayToStr(e.data.subarray(r));return{key:e.type,info:i,data:a}}var n=t._utf8ArrayToStr(e.data.subarray(1));return{key:e.type,data:n}}},t._decodeURLFrame=function(e){if("WXXX"===e.type){if(e.size<2)return;var r=1,i=t._utf8ArrayToStr(e.data.subarray(r));r+=i.length+1;var a=t._utf8ArrayToStr(e.data.subarray(r));return{key:e.type,info:i,data:a}}var n=t._utf8ArrayToStr(e.data);return{key:e.type,data:n}},t._utf8ArrayToStr=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=t.length,i=void 0,a=void 0,n=void 0,o="",s=0;s<r;){if(0===(i=t[s++])&&e)return o;if(0!==i&&3!==i)switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:o+=String.fromCharCode(i);break;case 12:case 13:a=t[s++],o+=String.fromCharCode((31&i)<<6|63&a);break;case 14:a=t[s++],n=t[s++],o+=String.fromCharCode((15&i)<<12|(63&a)<<6|(63&n)<<0)}}return o},t}();a._utf8ArrayToStr;e.a=a},function(t,e,r){"use strict";function i(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}e.a=i},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(2),d=r(0),u=r(12),f=r(24),c=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),h=window,p=h.performance,v={MANIFEST:"manifest",LEVEL:"level",AUDIO_TRACK:"audioTrack",SUBTITLE_TRACK:"subtitleTrack"},g={MAIN:"main",AUDIO:"audio",SUBTITLE:"subtitle"},m=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.MANIFEST_LOADING,o.a.LEVEL_LOADING,o.a.AUDIO_TRACK_LOADING,o.a.SUBTITLE_TRACK_LOADING));return n.loaders={},n}return n(e,t),e.canHaveQualityLevels=function(t){return t!==v.AUDIO_TRACK&&t!==v.SUBTITLE_TRACK},e.mapContextToLevelType=function(t){switch(t.type){case v.AUDIO_TRACK:return g.AUDIO;case v.SUBTITLE_TRACK:return g.SUBTITLE;default:return g.MAIN}},e.getResponseUrl=function(t,e){var r=t.url;return void 0!==r&&0!==r.indexOf("data:")||(r=e.url),r},e.prototype.createInternalLoader=function(t){var e=this.hls.config,r=e.pLoader,i=e.loader,a=r||i,n=new a(e);return t.loader=n,this.loaders[t.type]=n,n},e.prototype.getInternalLoader=function(t){return this.loaders[t.type]},e.prototype.resetInternalLoader=function(t){this.loaders[t]&&delete this.loaders[t]},e.prototype.destroyInternalLoaders=function(){for(var t in this.loaders){var e=this.loaders[t];e&&e.destroy(),this.resetInternalLoader(t)}},e.prototype.destroy=function(){this.destroyInternalLoaders(),t.prototype.destroy.call(this)},e.prototype.onManifestLoading=function(t){this.load(t.url,{type:v.MANIFEST,level:0,id:null})},e.prototype.onLevelLoading=function(t){this.load(t.url,{type:v.LEVEL,level:t.level,id:t.id})},e.prototype.onAudioTrackLoading=function(t){this.load(t.url,{type:v.AUDIO_TRACK,level:0,id:t.id})},e.prototype.onSubtitleTrackLoading=function(t){this.load(t.url,{type:v.SUBTITLE_TRACK,level:0,id:t.id})},e.prototype.load=function(t,e){var r=this.hls.config;d.b.debug("Loading playlist of type "+e.type+", level: "+e.level+", id: "+e.id);var i=this.getInternalLoader(e);if(i){var a=i.context;if(a&&a.url===t)return d.b.trace("playlist request ongoing"),!1;d.b.warn("aborting previous loader for type: "+e.type),i.abort()}var n=void 0,o=void 0,s=void 0,l=void 0;switch(e.type){case v.MANIFEST:n=r.manifestLoadingMaxRetry,o=r.manifestLoadingTimeOut,s=r.manifestLoadingRetryDelay,l=r.manifestLoadingMaxRetryTimeout;break;case v.LEVEL:n=0,o=r.levelLoadingTimeOut;break;default:n=r.levelLoadingMaxRetry,o=r.levelLoadingTimeOut,s=r.levelLoadingRetryDelay,l=r.levelLoadingMaxRetryTimeout}i=this.createInternalLoader(e),e.url=t,e.responseType=e.responseType||"";var u={timeout:o,maxRetry:n,retryDelay:s,maxRetryDelay:l},f={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)};return d.b.debug("Calling internal loader delegate for URL: "+t),i.load(e,u,f),!0},e.prototype.loadsuccess=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(r.isSidxRequest)return this._handleSidxRequest(t,r),void this._handlePlaylistLoaded(t,e,r,i);this.resetInternalLoader(r.type);var a=t.data;if(e.tload=p.now(),0!==a.indexOf("#EXTM3U"))return void this._handleManifestParsingError(t,r,"no EXTM3U delimiter",i);a.indexOf("#EXTINF:")>0||a.indexOf("#EXT-X-TARGETDURATION:")>0?this._handleTrackOrLevelPlaylist(t,e,r,i):this._handleMasterPlaylist(t,e,r,i)},e.prototype.loaderror=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this._handleNetworkError(e,r)},e.prototype.loadtimeout=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this._handleNetworkError(e,r,!0)},e.prototype._handleMasterPlaylist=function(t,r,i,a){var n=this.hls,s=t.data,l=e.getResponseUrl(t,i),u=f.a.parseMasterPlaylist(s,l);if(!u.length)return void this._handleManifestParsingError(t,i,"no level found in manifest",a);var c=u.map(function(t){return{id:t.attrs.AUDIO,codec:t.audioCodec}}),h=f.a.parseMasterPlaylistMedia(s,l,"AUDIO",c),p=f.a.parseMasterPlaylistMedia(s,l,"SUBTITLES");if(h.length){var v=!1;h.forEach(function(t){t.url||(v=!0)}),!1===v&&u[0].audioCodec&&!u[0].attrs.AUDIO&&(d.b.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),h.unshift({type:"main",name:"main"}))}n.trigger(o.a.MANIFEST_LOADED,{levels:u,audioTracks:h,subtitles:p,url:l,stats:r,networkDetails:a})},e.prototype._handleTrackOrLevelPlaylist=function(t,r,i,a){var n=this.hls,s=i.id,l=i.level,d=i.type,u=e.getResponseUrl(t,i),c=isNaN(s)?0:s,h=isNaN(l)?c:l,g=e.mapContextToLevelType(i),m=f.a.parseLevelPlaylist(t.data,u,h,g,c);if(m.tload=r.tload,d===v.MANIFEST){var y={url:u,details:m};n.trigger(o.a.MANIFEST_LOADED,{levels:[y],audioTracks:[],url:u,stats:r,networkDetails:a})}if(r.tparsed=p.now(),m.needSidxRanges){var b=m.initSegment.url;return void this.load(b,{isSidxRequest:!0,type:d,level:l,levelDetails:m,id:s,rangeStart:0,rangeEnd:2048,responseType:"arraybuffer"})}i.levelDetails=m,this._handlePlaylistLoaded(t,r,i,a)},e.prototype._handleSidxRequest=function(t,e){var r=u.a.parseSegmentIndex(new Uint8Array(t.data));r.references.forEach(function(t,r){var i=t.info,a=e.levelDetails.fragments[r];0===a.byteRange.length&&(a.rawByteRange=String(1+i.end-i.start)+"@"+String(i.start))}),e.levelDetails.initSegment.rawByteRange=String(r.moovEndOffset)+"@0"},e.prototype._handleManifestParsingError=function(t,e,r,i){this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:l.a.MANIFEST_PARSING_ERROR,fatal:!0,url:t.url,reason:r,networkDetails:i})},e.prototype._handleNetworkError=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];d.b.info("A network error occured while loading a "+t.type+"-type playlist");var i=void 0,a=void 0,n=this.getInternalLoader(t);switch(t.type){case v.MANIFEST:i=r?l.a.MANIFEST_LOAD_TIMEOUT:l.a.MANIFEST_LOAD_ERROR,a=!0;break;case v.LEVEL:i=r?l.a.LEVEL_LOAD_TIMEOUT:l.a.LEVEL_LOAD_ERROR,a=!1;break;case v.AUDIO_TRACK:i=r?l.a.AUDIO_TRACK_LOAD_TIMEOUT:l.a.AUDIO_TRACK_LOAD_ERROR,a=!1;break;default:a=!1}n&&(n.abort(),this.resetInternalLoader(t.type)),this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:i,fatal:a,url:n.url,loader:n,context:t,networkDetails:e})},e.prototype._handlePlaylistLoaded=function(t,r,i,a){var n=i.type,s=i.level,l=i.id,d=i.levelDetails;if(!d.targetduration)return void this._handleManifestParsingError(t,i,"invalid target duration",a);if(e.canHaveQualityLevels(i.type))this.hls.trigger(o.a.LEVEL_LOADED,{details:d,level:s||0,id:l||0,stats:r,networkDetails:a});else switch(n){case v.AUDIO_TRACK:this.hls.trigger(o.a.AUDIO_TRACK_LOADED,{details:d,id:l,stats:r,networkDetails:a});break;case v.SUBTITLE_TRACK:this.hls.trigger(o.a.SUBTITLE_TRACK_LOADED,{details:d,id:l,stats:r,networkDetails:a})}},c(e,null,[{key:"ContextType",get:function(){return v}},{key:"LevelType",get:function(){return g}}]),e}(s.a);e.a=m},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(0),n=r(1),o=Math.pow(2,32)-1,s=function(){function t(e,r){i(this,t),this.observer=e,this.remuxer=r}return t.prototype.resetTimeStamp=function(t){this.initPTS=t},t.prototype.resetInitSegment=function(e,r,i,a){if(e&&e.byteLength){var o=this.initData=t.parseInitSegment(e);null==r&&(r="mp4a.40.5"),null==i&&(i="avc1.42e01e");var s={};o.audio&&o.video?s.audiovideo={container:"video/mp4",codec:r+","+i,initSegment:a?e:null}:(o.audio&&(s.audio={container:"audio/mp4",codec:r,initSegment:a?e:null}),o.video&&(s.video={container:"video/mp4",codec:i,initSegment:a?e:null})),this.observer.trigger(n.a.FRAG_PARSING_INIT_SEGMENT,{tracks:s})}else r&&(this.audioCodec=r),i&&(this.videoCodec=i)},t.probe=function(e){return t.findBox({data:e,start:0,end:Math.min(e.length,16384)},["moof"]).length>0},t.bin2str=function(t){return String.fromCharCode.apply(null,t)},t.readUint16=function(t,e){t.data&&(e+=t.start,t=t.data);var r=t[e]<<8|t[e+1];return r<0?65536+r:r},t.readUint32=function(t,e){t.data&&(e+=t.start,t=t.data);var r=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3];return r<0?4294967296+r:r},t.writeUint32=function(t,e,r){t.data&&(e+=t.start,t=t.data),t[e]=r>>24,t[e+1]=r>>16&255,t[e+2]=r>>8&255,t[e+3]=255&r},t.findBox=function(e,r){var i=[],a=void 0,n=void 0,o=void 0,s=void 0,l=void 0,d=void 0,u=void 0;if(e.data?(d=e.start,s=e.end,e=e.data):(d=0,s=e.byteLength),!r.length)return null;for(a=d;a<s;)n=t.readUint32(e,a),o=t.bin2str(e.subarray(a+4,a+8)),u=n>1?a+n:s,o===r[0]&&(1===r.length?i.push({data:e,start:a+8,end:u}):(l=t.findBox({data:e,start:a+8,end:u},r.slice(1)),l.length&&(i=i.concat(l)))),a=u;return i},t.parseSegmentIndex=function(e){var r=t.findBox(e,["moov"])[0],i=r?r.end:null,a=0,n=t.findBox(e,["sidx"]),o=void 0;if(!n||!n[0])return null;o=[],n=n[0];var s=n.data[0];a=0===s?8:16;var l=t.readUint32(n,a);a+=4;a+=0===s?8:16,a+=2;var d=n.end+0,u=t.readUint16(n,a);a+=2;for(var f=0;f<u;f++){var c=a,h=t.readUint32(n,c);c+=4;var p=2147483647&h;if(1===(2147483648&h)>>>31)return void console.warn("SIDX has hierarchical references (not supported)");var v=t.readUint32(n,c);c+=4,o.push({referenceSize:p,subsegmentDuration:v,info:{duration:v/l,start:d,end:d+p-1}}),d+=p,c+=4,a=c}return{earliestPresentationTime:0,timescale:l,version:s,referencesCount:u,references:o,moovEndOffset:i}},t.parseInitSegment=function(e){var r=[];return t.findBox(e,["moov","trak"]).forEach(function(e){var i=t.findBox(e,["tkhd"])[0];if(i){var n=i.data[i.start],o=0===n?12:20,s=t.readUint32(i,o),l=t.findBox(e,["mdia","mdhd"])[0];if(l){n=l.data[l.start],o=0===n?12:20;var d=t.readUint32(l,o),u=t.findBox(e,["mdia","hdlr"])[0];if(u){var f=t.bin2str(u.data.subarray(u.start+8,u.start+12)),c={soun:"audio",vide:"video"}[f];if(c){var h=t.findBox(e,["mdia","minf","stbl","stsd"]);if(h.length){h=h[0];var p=t.bin2str(h.data.subarray(h.start+12,h.start+16));a.b.log("MP4Demuxer:"+c+":"+p+" found")}r[s]={timescale:d,type:c},r[c]={timescale:d,id:s}}}}}}),r},t.getStartDTS=function(e,r){var i=void 0,a=void 0,n=void 0;return i=t.findBox(r,["moof","traf"]),a=[].concat.apply([],i.map(function(r){return t.findBox(r,["tfhd"]).map(function(i){var a=void 0,n=void 0;return a=t.readUint32(i,4),n=e[a].timescale||9e4,t.findBox(r,["tfdt"]).map(function(e){var r=void 0,i=void 0;return r=e.data[e.start],i=t.readUint32(e,4),1===r&&(i*=Math.pow(2,32),i+=t.readUint32(e,8)),i})[0]/n})})),n=Math.min.apply(null,a),isFinite(n)?n:0},t.offsetStartDTS=function(e,r,i){t.findBox(r,["moof","traf"]).map(function(r){return t.findBox(r,["tfhd"]).map(function(a){var n=t.readUint32(a,4),s=e[n].timescale||9e4;t.findBox(r,["tfdt"]).map(function(e){var r=e.data[e.start],a=t.readUint32(e,4);if(0===r)t.writeUint32(e,4,a-i*s);else{a*=Math.pow(2,32),a+=t.readUint32(e,8),a-=i*s,a=Math.max(a,0);var n=Math.floor(a/(o+1)),l=Math.floor(a%(o+1));t.writeUint32(e,4,n),t.writeUint32(e,8,l)}})})})},t.prototype.append=function(e,r,i,a){var o=this.initData;o||(this.resetInitSegment(e,this.audioCodec,this.videoCodec,!1),o=this.initData);var s=void 0,l=this.initPTS;if(void 0===l){var d=t.getStartDTS(o,e);this.initPTS=l=d-r,this.observer.trigger(n.a.INIT_PTS_FOUND,{initPTS:l})}t.offsetStartDTS(o,e,l),s=t.getStartDTS(o,e),this.remuxer.remux(o.audio,o.video,null,null,s,i,a,e)},t.prototype.destroy=function(){},t}();e.a=s},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(6),n=r.n(a),o=r(14),s=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),l=function(){function t(){var e;i(this,t),this._url=null,this._byteRange=null,this._decryptdata=null,this.tagList=[],this._elementaryStreams=(e={},e[t.ElementaryStreamTypes.AUDIO]=!1,e[t.ElementaryStreamTypes.VIDEO]=!1,e)}return t.prototype.addElementaryStream=function(t){this._elementaryStreams[t]=!0},t.prototype.hasElementaryStream=function(t){return!0===this._elementaryStreams[t]},t.prototype.createInitializationVector=function(t){for(var e=new Uint8Array(16),r=12;r<16;r++)e[r]=t>>8*(15-r)&255;return e},t.prototype.fragmentDecryptdataFromLevelkey=function(t,e){var r=t;return t&&t.method&&t.uri&&!t.iv&&(r=new o.a,r.method=t.method,r.baseuri=t.baseuri,r.reluri=t.reluri,r.iv=this.createInitializationVector(e)),r},s(t,[{key:"url",get:function(){return!this._url&&this.relurl&&(this._url=n.a.buildAbsoluteURL(this.baseurl,this.relurl,{alwaysNormalize:!0})),this._url},set:function(t){this._url=t}},{key:"programDateTime",get:function(){return!this._programDateTime&&this.rawProgramDateTime&&(this._programDateTime=new Date(Date.parse(this.rawProgramDateTime))),this._programDateTime}},{key:"byteRange",get:function(){if(!this._byteRange&&!this.rawByteRange)return[];if(this._byteRange)return this._byteRange;var t=[];if(this.rawByteRange){var e=this.rawByteRange.split("@",2);if(1===e.length){var r=this.lastByteRangeEndOffset;t[0]=r||0}else t[0]=parseInt(e[1]);t[1]=parseInt(e[0])+t[0],this._byteRange=t}return t}},{key:"byteRangeStartOffset",get:function(){return this.byteRange[0]}},{key:"byteRangeEndOffset",get:function(){return this.byteRange[1]}},{key:"decryptdata",get:function(){return this._decryptdata||(this._decryptdata=this.fragmentDecryptdataFromLevelkey(this.levelkey,this.sn)),this._decryptdata}},{key:"encrypted",get:function(){return!(!this.decryptdata||null===this.decryptdata.uri||null!==this.decryptdata.key)}}],[{key:"ElementaryStreamTypes",get:function(){return{AUDIO:"audio",VIDEO:"video"}}}]),t}();e.a=l},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(6),n=r.n(a),o=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),s=function(){function t(){i(this,t),this.method=null,this.key=null,this.iv=null,this._uri=null}return o(t,[{key:"uri",get:function(){return!this._uri&&this.reluri&&(this._uri=n.a.buildAbsoluteURL(this.baseuri,this.reluri,{alwaysNormalize:!0})),this._uri}}]),t}();e.a=s},function(t,e,r){"use strict";function i(t,e){var r=n[e];return!!r&&!0===r[t.slice(0,4)]}function a(t,e){return window.MediaSource.isTypeSupported((e||"video")+'/mp4;codecs="'+t+'"')}r.d(e,"b",function(){return i}),r.d(e,"a",function(){return a});var n={audio:{a3ds:!0,"ac-3":!0,"ac-4":!0,alac:!0,alaw:!0,dra1:!0,"dts+":!0,"dts-":!0,dtsc:!0,dtse:!0,dtsh:!0,"ec-3":!0,enca:!0,g719:!0,g726:!0,m4ae:!0,mha1:!0,mha2:!0,mhm1:!0,mhm2:!0,mlpa:!0,mp4a:!0,"raw ":!0,Opus:!0,samr:!0,sawb:!0,sawp:!0,sevc:!0,sqcp:!0,ssmv:!0,twos:!0,ulaw:!0},video:{avc1:!0,avc2:!0,avc3:!0,avc4:!0,avcp:!0,drac:!0,dvav:!0,dvhe:!0,encv:!0,hev1:!0,hvc1:!0,mjp2:!0,mp4v:!0,mvc1:!0,mvc2:!0,mvc3:!0,mvc4:!0,resv:!0,rv60:!0,s263:!0,svc1:!0,svc2:!0,"vc-1":!0,vp08:!0,vp09:!0}}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.d(e,"a",function(){return l}),r.d(e,"b",function(){return d});var o=r(3),s=r(1),l={NOT_LOADED:"NOT_LOADED",APPENDING:"APPENDING",PARTIAL:"PARTIAL",OK:"OK"},d=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,s.a.BUFFER_APPENDED,s.a.FRAG_BUFFERED,s.a.FRAG_LOADED));return n.bufferPadding=.2,n.fragments=Object.create(null),n.timeRanges=Object.create(null),n.config=r.config,n}return n(e,t),e.prototype.destroy=function(){this.fragments=null,this.timeRanges=null,this.config=null,o.a.prototype.destroy.call(this),t.prototype.destroy.call(this)},e.prototype.getBufferedFrag=function(t,e){var r=this.fragments,i=Object.keys(r).filter(function(i){var a=r[i];if(a.body.type!==e)return!1;if(!a.buffered)return!1;var n=a.body;return n.startPTS<=t&&t<=n.endPTS});if(0===i.length)return null;var a=i.pop();return r[a].body},e.prototype.detectEvictedFragments=function(t,e){var r=this,i=void 0,a=void 0;Object.keys(this.fragments).forEach(function(n){var o=r.fragments[n];if(!0===o.buffered){var s=o.range[t];if(s){i=s.time;for(var l=0;l<i.length;l++)if(a=i[l],!1===r.isTimeBuffered(a.startPTS,a.endPTS,e)){r.removeFragment(o.body);break}}}})},e.prototype.detectPartialFragments=function(t){var e=this,r=this.getFragmentKey(t),i=this.fragments[r];i&&(i.buffered=!0,Object.keys(this.timeRanges).forEach(function(r){if(!0===t.hasElementaryStream(r)){var a=e.timeRanges[r];i.range[r]=e.getBufferedTimes(t.startPTS,t.endPTS,a)}}))},e.prototype.getBufferedTimes=function(t,e,r){for(var i=[],a=void 0,n=void 0,o=!1,s=0;s<r.length;s++){if(a=r.start(s)-this.bufferPadding,n=r.end(s)+this.bufferPadding,t>=a&&e<=n){i.push({startPTS:Math.max(t,r.start(s)),endPTS:Math.min(e,r.end(s))});break}if(t<n&&e>a)i.push({startPTS:Math.max(t,r.start(s)),endPTS:Math.min(e,r.end(s))}),o=!0;else if(e<=a)break}return{time:i,partial:o}},e.prototype.getFragmentKey=function(t){return t.type+"_"+t.level+"_"+t.urlId+"_"+t.sn},e.prototype.getPartialFragment=function(t){var e=this,r=void 0,i=void 0,a=void 0,n=null,o=0;return Object.keys(this.fragments).forEach(function(s){var l=e.fragments[s];e.isPartial(l)&&(i=l.body.startPTS-e.bufferPadding,a=l.body.endPTS+e.bufferPadding,t>=i&&t<=a&&(r=Math.min(t-i,a-t),o<=r&&(n=l.body,o=r)))}),n},e.prototype.getState=function(t){var e=this.getFragmentKey(t),r=this.fragments[e],i=l.NOT_LOADED;return void 0!==r&&(i=r.buffered?!0===this.isPartial(r)?l.PARTIAL:l.OK:l.APPENDING),i},e.prototype.isPartial=function(t){return!0===t.buffered&&(void 0!==t.range.video&&!0===t.range.video.partial||void 0!==t.range.audio&&!0===t.range.audio.partial)},e.prototype.isTimeBuffered=function(t,e,r){for(var i=void 0,a=void 0,n=0;n<r.length;n++){if(i=r.start(n)-this.bufferPadding,a=r.end(n)+this.bufferPadding,t>=i&&e<=a)return!0;if(e<=i)return!1}return!1},e.prototype.onFragLoaded=function(t){var e=t.frag;if(!isNaN(e.sn)&&!e.bitrateTest){var r=this.getFragmentKey(e),i={body:e,range:Object.create(null),buffered:!1};this.fragments[r]=i}},e.prototype.onBufferAppended=function(t){var e=this;this.timeRanges=t.timeRanges,Object.keys(this.timeRanges).forEach(function(t){var r=e.timeRanges[t];e.detectEvictedFragments(t,r)})},e.prototype.onFragBuffered=function(t){this.detectPartialFragments(t.frag)},e.prototype.hasFragment=function(t){var e=this.getFragmentKey(t);return void 0!==this.fragments[e]},e.prototype.removeFragment=function(t){var e=this.getFragmentKey(t);delete this.fragments[e]},e.prototype.removeAllFragments=function(){this.fragments=Object.create(null)},e}(o.a)},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",function(){return a});var a=function(){function t(){i(this,t)}return t.isBuffered=function(t,e){try{if(t)for(var r=t.buffered,i=0;i<r.length;i++)if(e>=r.start(i)&&e<=r.end(i))return!0}catch(t){}return!1},t.bufferInfo=function(t,e,r){try{if(t){var i=t.buffered,a=[],n=void 0;for(n=0;n<i.length;n++)a.push({start:i.start(n),end:i.end(n)});return this.bufferedInfo(a,e,r)}}catch(t){}return{len:0,start:e,end:e,nextStart:void 0}},t.bufferedInfo=function(t,e,r){var i=[],a=void 0,n=void 0,o=void 0,s=void 0,l=void 0;for(t.sort(function(t,e){var r=t.start-e.start;return r||e.end-t.end}),l=0;l<t.length;l++){var d=i.length;if(d){var u=i[d-1].end;t[l].start-u<r?t[l].end>u&&(i[d-1].end=t[l].end):i.push(t[l])}else i.push(t[l])}for(l=0,a=0,n=o=e;l<i.length;l++){var f=i[l].start,c=i[l].end;if(e+r>=f&&e<c)n=f,o=c,a=o-e;else if(e+r<f){s=f;break}}return{len:a,start:n,end:o,nextStart:s}},t}()},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(1),n=r(2),o=r(19),s=r(34),l=r(12),d=r(35),u=r(38),f=r(39),c=r(42),h=r(5),p=Object(h.a)(),v=p,g=function(){function t(e,r,a,n){i(this,t),this.observer=e,this.typeSupported=r,this.config=a,this.vendor=n}return t.prototype.destroy=function(){var t=this.demuxer;t&&t.destroy()},t.prototype.push=function(t,e,r,i,n,s,l,d,u,f,c,h){if(t.byteLength>0&&null!=e&&null!=e.key&&"AES-128"===e.method){var p=this.decrypter;null==p&&(p=this.decrypter=new o.a(this.observer,this.config));var g=this,m=void 0;try{m=v.now()}catch(t){m=Date.now()}p.decrypt(t,e.key.buffer,e.iv.buffer,function(t){var o=void 0;try{o=v.now()}catch(t){o=Date.now()}g.observer.trigger(a.a.FRAG_DECRYPTED,{stats:{tstart:m,tdecrypt:o}}),g.pushDecrypted(new Uint8Array(t),e,new Uint8Array(r),i,n,s,l,d,u,f,c,h)})}else this.pushDecrypted(new Uint8Array(t),e,new Uint8Array(r),i,n,s,l,d,u,f,c,h)},t.prototype.pushDecrypted=function(t,e,r,i,o,h,p,v,g,m,y,b){var E=this.demuxer;if(!E||(p||v)&&!this.probe(t)){for(var T=this.observer,S=this.typeSupported,A=this.config,_=[{demux:d.a,remux:f.a},{demux:l.a,remux:c.a},{demux:s.a,remux:f.a},{demux:u.a,remux:f.a}],R=0,L=_.length;R<L;R++){var w=_[R],D=w.demux.probe;if(D(t)){var O=this.remuxer=new w.remux(T,A,S,this.vendor);E=new w.demux(T,O,A,S),this.probe=D;break}}if(!E)return void T.trigger(a.a.ERROR,{type:n.b.MEDIA_ERROR,details:n.a.FRAG_PARSING_ERROR,fatal:!0,reason:"no demux matching with content found"});this.demuxer=E}var I=this.remuxer;(p||v)&&(E.resetInitSegment(r,i,o,m),I.resetInitSegment()),p&&(E.resetTimeStamp(b),I.resetTimeStamp(b)),"function"==typeof E.setDecryptData&&E.setDecryptData(e),E.append(t,h,g,y)},t}();e.a=g},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(31),n=r(32),o=r(33),s=r(2),l=r(0),d=r(1),u=r(5),f=Object(u.a)(),c=function(){function t(e,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=a.removePKCS7Padding,o=void 0===n||n;if(i(this,t),this.logEnabled=!0,this.observer=e,this.config=r,this.removePKCS7Padding=o,o)try{var s=f.crypto;s&&(this.subtle=s.subtle||s.webkitSubtle)}catch(t){}this.disableWebCrypto=!this.subtle}return t.prototype.isSync=function(){return this.disableWebCrypto&&this.config.enableSoftwareAES},t.prototype.decrypt=function(t,e,r,i){var s=this;if(this.disableWebCrypto&&this.config.enableSoftwareAES){this.logEnabled&&(l.b.log("JS AES decrypt"),this.logEnabled=!1);var d=this.decryptor;d||(this.decryptor=d=new o.a),d.expandKey(e),i(d.decrypt(t,0,r,this.removePKCS7Padding))}else{this.logEnabled&&(l.b.log("WebCrypto AES decrypt"),this.logEnabled=!1);var u=this.subtle;this.key!==e&&(this.key=e,this.fastAesKey=new n.a(u,e)),this.fastAesKey.expandKey().then(function(n){new a.a(u,r).decrypt(t,n).catch(function(a){s.onWebCryptoError(a,t,e,r,i)}).then(function(t){i(t)})}).catch(function(a){s.onWebCryptoError(a,t,e,r,i)})}},t.prototype.onWebCryptoError=function(t,e,r,i,a){this.config.enableSoftwareAES?(l.b.log("WebCrypto Error, disable WebCrypto API"),this.disableWebCrypto=!0,this.logEnabled=!0,this.decrypt(e,r,i,a)):(l.b.error("decrypting error : "+t.message),this.observer.trigger(d.a.ERROR,{type:s.b.MEDIA_ERROR,details:s.a.FRAG_DECRYPT_ERROR,fatal:!0,reason:t.message}))},t.prototype.destroy=function(){var t=this.decryptor;t&&(t.destroy(),this.decryptor=void 0)},t}();e.a=c},function(t,e,r){"use strict";function i(t,e,r,i){var a=void 0,n=void 0,o=void 0,s=void 0,l=void 0,d=navigator.userAgent.toLowerCase(),u=i,f=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];return a=1+((192&e[r+2])>>>6),(n=(60&e[r+2])>>>2)>f.length-1?void t.trigger(v.a.ERROR,{type:p.b.MEDIA_ERROR,details:p.a.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+n}):(s=(1&e[r+2])<<2,s|=(192&e[r+3])>>>6,h.b.log("manifest codec:"+i+",ADTS data:type:"+a+",sampleingIndex:"+n+"["+f[n]+"Hz],channelConfig:"+s),/firefox/i.test(d)?n>=6?(a=5,l=new Array(4),o=n-3):(a=2,l=new Array(2),o=n):-1!==d.indexOf("android")?(a=2,l=new Array(2),o=n):(a=5,l=new Array(4),i&&(-1!==i.indexOf("mp4a.40.29")||-1!==i.indexOf("mp4a.40.5"))||!i&&n>=6?o=n-3:((i&&-1!==i.indexOf("mp4a.40.2")&&(n>=6&&1===s||/vivaldi/i.test(d))||!i&&1===s)&&(a=2,l=new Array(2)),o=n)),l[0]=a<<3,l[0]|=(14&n)>>1,l[1]|=(1&n)<<7,l[1]|=s<<3,5===a&&(l[1]|=(14&o)>>1,l[2]=(1&o)<<7,l[2]|=8,l[3]=0),{config:l,samplerate:f[n],channelCount:s,codec:"mp4a.40."+a,manifestCodec:u})}function a(t,e){return 255===t[e]&&240==(246&t[e+1])}function n(t,e){return 1&t[e+1]?7:9}function o(t,e){return(3&t[e+3])<<11|t[e+4]<<3|(224&t[e+5])>>>5}function s(t,e){return!!(e+1<t.length&&a(t,e))}function l(t,e){if(e+1<t.length&&a(t,e)){var r=n(t,e),i=r;e+5<t.length&&(i=o(t,e));var s=e+i;if(s===t.length||s+1<t.length&&a(t,s))return!0}return!1}function d(t,e,r,a,n){if(!t.samplerate){var o=i(e,r,a,n);t.config=o.config,t.samplerate=o.samplerate,t.channelCount=o.channelCount,t.codec=o.codec,t.manifestCodec=o.manifestCodec,h.b.log("parsed codec:"+t.codec+",rate:"+o.samplerate+",nb channel:"+o.channelCount)}}function u(t){return 9216e4/t}function f(t,e,r,i,a){var s=void 0,l=void 0,d=void 0,u=t.length;if(s=n(t,e),l=o(t,e),(l-=s)>0&&e+s+l<=u)return d=r+i*a,{headerLength:s,frameLength:l,stamp:d}}function c(t,e,r,i,a){var n=u(t.samplerate),o=f(e,r,i,a,n);if(o){var s=o.stamp,l=o.headerLength,d=o.frameLength,c={unit:e.subarray(r+l,r+l+d),pts:s,dts:s};return t.samples.push(c),t.len+=d,{sample:c,length:d+l}}}e.d=s,e.e=l,e.c=d,e.b=u,e.a=c;var h=r(0),p=r(2),v=r(1);r(5)},function(t,e,r){"use strict";var i={BitratesMap:[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],SamplingRateMap:[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3],SamplesCoefficients:[[0,72,144,12],[0,0,0,0],[0,72,144,12],[0,144,144,12]],BytesInSlot:[0,1,1,4],appendFrame:function(t,e,r,i,a){if(!(r+24>e.length)){var n=this.parseHeader(e,r);if(n&&r+n.frameLength<=e.length){var o=9e4*n.samplesPerFrame/n.sampleRate,s=i+a*o,l={unit:e.subarray(r,r+n.frameLength),pts:s,dts:s};return t.config=[],t.channelCount=n.channelCount,t.samplerate=n.sampleRate,t.samples.push(l),t.len+=n.frameLength,{sample:l,length:n.frameLength}}}},parseHeader:function(t,e){var r=t[e+1]>>3&3,a=t[e+1]>>1&3,n=t[e+2]>>4&15,o=t[e+2]>>2&3,s=t[e+2]>>1&1;if(1!==r&&0!==n&&15!==n&&3!==o){var l=3===r?3-a:3===a?3:4,d=1e3*i.BitratesMap[14*l+n-1],u=3===r?0:2===r?1:2,f=i.SamplingRateMap[3*u+o],c=t[e+3]>>6==3?1:2,h=i.SamplesCoefficients[r][a],p=i.BytesInSlot[a],v=8*h*p;return{sampleRate:f,channelCount:c,frameLength:parseInt(h*d/f+s,10)*p,samplesPerFrame:v}}},isHeaderPattern:function(t,e){return 255===t[e]&&224==(224&t[e+1])&&0!=(6&t[e+1])},isHeader:function(t,e){return!!(e+1<t.length&&this.isHeaderPattern(t,e))},probe:function(t,e){if(e+1<t.length&&this.isHeaderPattern(t,e)){var r=this.parseHeader(t,e),i=4;r&&r.frameLength&&(i=r.frameLength);var a=e+i;if(a===t.length||a+1<t.length&&this.isHeaderPattern(t,a))return!0}return!1}};e.a=i},function(t,e,r){"use strict";function i(t,e,r){switch(e){case"audio":t.audioGroupIds||(t.audioGroupIds=[]),t.audioGroupIds.push(r);break;case"text":t.textGroupIds||(t.textGroupIds=[]),t.textGroupIds.push(r)}}function a(t,e,r){var i=t[e],a=t[r],n=a.startPTS;isNaN(n)?a.start=r>e?i.start+i.duration:Math.max(i.start-a.duration,0):r>e?(i.duration=n-i.start,i.duration<0&&s.b.warn("negative duration computed for frag "+i.sn+",level "+i.level+", there should be some duration drift between playlist and fragment!")):(a.duration=i.start-n,a.duration<0&&s.b.warn("negative duration computed for frag "+a.sn+",level "+a.level+", there should be some duration drift between playlist and fragment!"))}function n(t,e,r,i,n,o){var s=r;if(!isNaN(e.startPTS)){var l=Math.abs(e.startPTS-r);isNaN(e.deltaPTS)?e.deltaPTS=l:e.deltaPTS=Math.max(l,e.deltaPTS),s=Math.max(r,e.startPTS),r=Math.min(r,e.startPTS),i=Math.max(i,e.endPTS),n=Math.min(n,e.startDTS),o=Math.max(o,e.endDTS)}var d=r-e.start;e.start=e.startPTS=r,e.maxStartPTS=s,e.endPTS=i,e.startDTS=n,e.endDTS=o,e.duration=i-r;var u=e.sn;if(!t||u<t.startSN||u>t.endSN)return 0;var f=void 0,c=void 0,h=void 0;for(f=u-t.startSN,c=t.fragments,c[f]=e,h=f;h>0;h--)a(c,h,h-1);for(h=f;h<c.length-1;h++)a(c,h,h+1);return t.PTSKnown=!0,d}function o(t,e){var r=Math.max(t.startSN,e.startSN)-e.startSN,i=Math.min(t.endSN,e.endSN)-e.startSN,a=e.startSN-t.startSN,o=t.fragments,l=e.fragments,d=0,u=void 0;if(e.initSegment&&t.initSegment&&(e.initSegment=t.initSegment),i<r)return void(e.PTSKnown=!1);for(var f=r;f<=i;f++){var c=o[a+f],h=l[f];h&&c&&(d=c.cc-h.cc,isNaN(c.startPTS)||(h.start=h.startPTS=c.startPTS,h.endPTS=c.endPTS,h.duration=c.duration,h.backtracked=c.backtracked,h.dropped=c.dropped,u=h))}if(d)for(s.b.log("discontinuity sliding from playlist, take drift into account"),f=0;f<l.length;f++)l[f].cc+=d;if(u)n(e,u,u.startPTS,u.endPTS,u.startDTS,u.endDTS);else if(a>=0&&a<o.length){var p=o[a].start;for(f=0;f<l.length;f++)l[f].start+=p}e.PTSKnown=t.PTSKnown}e.a=i,e.c=n,e.b=o;var s=r(0)},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=r(6),n=r.n(a),o=r(2),s=r(11),l=r(26),d=r(27),u=r(16),f=r(28),c=r(48),h=r(49),p=r(51),v=r(0),g=r(52),m=r(1),y=r(8),b=r.n(y),E=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}();r(61);var T=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t);var a=t.DefaultConfig;if((r.liveSyncDurationCount||r.liveMaxLatencyDurationCount)&&(r.liveSyncDuration||r.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");for(var n in a)n in r||(r[n]=a[n]);if(void 0!==r.liveMaxLatencyDurationCount&&r.liveMaxLatencyDurationCount<=r.liveSyncDurationCount)throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');if(void 0!==r.liveMaxLatencyDuration&&(r.liveMaxLatencyDuration<=r.liveSyncDuration||void 0===r.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');Object(v.a)(r.debug),this.config=r,this._autoLevelCapping=-1;var o=this.observer=new b.a;o.trigger=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];o.emit.apply(o,[t,t].concat(r))},o.off=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];o.removeListener.apply(o,[t].concat(r))},this.on=o.on.bind(o),this.off=o.off.bind(o),this.once=o.once.bind(o),this.trigger=o.trigger.bind(o);var p=this.abrController=new r.abrController(this),g=new r.bufferController(this),m=new r.capLevelController(this),y=new r.fpsController(this),E=new s.a(this),T=new l.a(this),S=new d.a(this),A=new h.a(this),_=this.levelController=new c.a(this),R=new u.b(this),L=this.streamController=new f.a(this,R),w=[_,L],D=r.audioStreamController;D&&w.push(new D(this,R)),this.networkControllers=w;var O=[E,T,S,p,g,m,y,A,R];if(D=r.audioTrackController){var I=new D(this);this.audioTrackController=I,O.push(I)}if(D=r.subtitleTrackController){var x=new D(this);this.subtitleTrackController=x,O.push(x)}if(D=r.emeController){var k=new D(this);this.emeController=k,O.push(k)}[r.subtitleStreamController,r.timelineController].forEach(function(t){t&&O.push(new t(e))}),this.coreComponents=O}return t.isSupported=function(){return Object(p.a)()},E(t,null,[{key:"version",get:function(){return"0.10.0"}},{key:"Events",get:function(){return m.a}},{key:"ErrorTypes",get:function(){return o.b}},{key:"ErrorDetails",get:function(){return o.a}},{key:"DefaultConfig",get:function(){return t.defaultConfig?t.defaultConfig:g.a},set:function(e){t.defaultConfig=e}}]),t.prototype.destroy=function(){v.b.log("destroy"),this.trigger(m.a.DESTROYING),this.detachMedia(),this.coreComponents.concat(this.networkControllers).forEach(function(t){t.destroy()}),this.url=null,this.observer.removeAllListeners(),this._autoLevelCapping=-1},t.prototype.attachMedia=function(t){v.b.log("attachMedia"),this.media=t,this.trigger(m.a.MEDIA_ATTACHING,{media:t})},t.prototype.detachMedia=function(){v.b.log("detachMedia"),this.trigger(m.a.MEDIA_DETACHING),this.media=null},t.prototype.loadSource=function(t){t=n.a.buildAbsoluteURL(window.location.href,t,{alwaysNormalize:!0}),v.b.log("loadSource:"+t),this.url=t,this.trigger(m.a.MANIFEST_LOADING,{url:t})},t.prototype.startLoad=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;v.b.log("startLoad("+t+")"),this.networkControllers.forEach(function(e){e.startLoad(t)})},t.prototype.stopLoad=function(){v.b.log("stopLoad"),this.networkControllers.forEach(function(t){t.stopLoad()})},t.prototype.swapAudioCodec=function(){v.b.log("swapAudioCodec"),this.streamController.swapAudioCodec()},t.prototype.recoverMediaError=function(){v.b.log("recoverMediaError");var t=this.media;this.detachMedia(),this.attachMedia(t)},E(t,[{key:"levels",get:function(){return this.levelController.levels}},{key:"currentLevel",get:function(){return this.streamController.currentLevel},set:function(t){v.b.log("set currentLevel:"+t),this.loadLevel=t,this.streamController.immediateLevelSwitch()}},{key:"nextLevel",get:function(){return this.streamController.nextLevel},set:function(t){v.b.log("set nextLevel:"+t),this.levelController.manualLevel=t,this.streamController.nextLevelSwitch()}},{key:"loadLevel",get:function(){return this.levelController.level},set:function(t){v.b.log("set loadLevel:"+t),this.levelController.manualLevel=t}},{key:"nextLoadLevel",get:function(){return this.levelController.nextLoadLevel},set:function(t){this.levelController.nextLoadLevel=t}},{key:"firstLevel",get:function(){return Math.max(this.levelController.firstLevel,this.minAutoLevel)},set:function(t){v.b.log("set firstLevel:"+t),this.levelController.firstLevel=t}},{key:"startLevel",get:function(){return this.levelController.startLevel},set:function(t){v.b.log("set startLevel:"+t);var e=this;-1!==t&&(t=Math.max(t,e.minAutoLevel)),e.levelController.startLevel=t}},{key:"autoLevelCapping",get:function(){return this._autoLevelCapping},set:function(t){v.b.log("set autoLevelCapping:"+t),this._autoLevelCapping=t}},{key:"autoLevelEnabled",get:function(){return-1===this.levelController.manualLevel}},{key:"manualLevel",get:function(){return this.levelController.manualLevel}},{key:"minAutoLevel",get:function(){for(var t=this,e=t.levels,r=t.config.minAutoBitrate,i=e?e.length:0,a=0;a<i;a++){if((e[a].realBitrate?Math.max(e[a].realBitrate,e[a].bitrate):e[a].bitrate)>r)return a}return 0}},{key:"maxAutoLevel",get:function(){var t=this,e=t.levels,r=t.autoLevelCapping;return-1===r&&e&&e.length?e.length-1:r}},{key:"nextAutoLevel",get:function(){var t=this;return Math.min(Math.max(t.abrController.nextAutoLevel,t.minAutoLevel),t.maxAutoLevel)},set:function(t){var e=this;e.abrController.nextAutoLevel=Math.max(e.minAutoLevel,t)}},{key:"audioTracks",get:function(){var t=this.audioTrackController;return t?t.audioTracks:[]}},{key:"audioTrack",get:function(){var t=this.audioTrackController;return t?t.audioTrack:-1},set:function(t){var e=this.audioTrackController;e&&(e.audioTrack=t)}},{key:"liveSyncPosition",get:function(){return this.streamController.liveSyncPosition}},{key:"subtitleTracks",get:function(){var t=this.subtitleTrackController;return t?t.subtitleTracks:[]}},{key:"subtitleTrack",get:function(){var t=this.subtitleTrackController;return t?t.subtitleTrack:-1},set:function(t){var e=this.subtitleTrackController;e&&(e.subtitleTrack=t)}},{key:"subtitleDisplay",get:function(){var t=this.subtitleTrackController;return!!t&&t.subtitleDisplay},set:function(t){var e=this.subtitleTrackController;e&&(e.subtitleDisplay=t)}}]),t}();e.default=T},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(6),n=r.n(a),o=r(13),s=r(14),l=r(25),d=r(0),u=r(15),f=/#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,c=/#EXT-X-MEDIA:(.*)/g,h=new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,/|(?!#)(\S+)/.source,/|#EXT-X-BYTERANGE:*(.+)/.source,/|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,/|#.*/.source].join(""),"g"),p=/(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,v=/\.(mp4|m4s|m4v|m4a)$/i,g=function(){function t(){i(this,t)}return t.findGroup=function(t,e){if(!t)return null;for(var r=null,i=0;i<t.length;i++){var a=t[i];a.id===e&&(r=a)}return r},t.convertAVC1ToAVCOTI=function(t){var e=void 0,r=t.split(".");return r.length>2?(e=r.shift()+".",e+=parseInt(r.shift()).toString(16),e+=("000"+parseInt(r.shift()).toString(16)).substr(-4)):e=t,e},t.resolve=function(t,e){return n.a.buildAbsoluteURL(e,t,{alwaysNormalize:!0})},t.parseMasterPlaylist=function(e,r){var i=[],a=void 0;for(f.lastIndex=0;null!=(a=f.exec(e));){var n={},o=n.attrs=new l.a(a[1]);n.url=t.resolve(a[2],r);var s=o.decimalResolution("RESOLUTION");s&&(n.width=s.width,n.height=s.height),n.bitrate=o.decimalInteger("AVERAGE-BANDWIDTH")||o.decimalInteger("BANDWIDTH"),n.name=o.NAME,function(t,e){["video","audio"].forEach(function(r){var i=t.filter(function(t){return Object(u.b)(t,r)});if(i.length){var a=i.filter(function(t){return 0===t.lastIndexOf("avc1",0)||0===t.lastIndexOf("mp4a",0)});e[r+"Codec"]=a.length>0?a[0]:i[0],t=t.filter(function(t){return-1===i.indexOf(t)})}}),e.unknownCodecs=t}([].concat((o.CODECS||"").split(/[ ,]+/)),n),n.videoCodec&&-1!==n.videoCodec.indexOf("avc1")&&(n.videoCodec=t.convertAVC1ToAVCOTI(n.videoCodec)),i.push(n)}return i},t.parseMasterPlaylistMedia=function(e,r,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],n=void 0,o=[],s=0;for(c.lastIndex=0;null!==(n=c.exec(e));){var d={},u=new l.a(n[1]);if(u.TYPE===i){if(d.groupId=u["GROUP-ID"],d.name=u.NAME,d.type=i,d.default="YES"===u.DEFAULT,d.autoselect="YES"===u.AUTOSELECT,d.forced="YES"===u.FORCED,u.URI&&(d.url=t.resolve(u.URI,r)),d.lang=u.LANGUAGE,d.name||(d.name=d.lang),a.length){var f=t.findGroup(a,d.groupId);d.audioCodec=f?f.codec:a[0].codec}d.id=s++,o.push(d)}}return o},t.parseLevelPlaylist=function(t,e,r,i,a){var n=0,u=0,f={type:null,version:null,url:e,fragments:[],live:!0,startSN:0},c=new s.a,g=0,m=null,y=new o.a,b=void 0,E=void 0;for(h.lastIndex=0;null!==(b=h.exec(t));){var T=b[1];if(T){y.duration=parseFloat(T);var S=(" "+b[2]).slice(1);y.title=S||null,y.tagList.push(S?["INF",T,S]:["INF",T])}else if(b[3]){if(!isNaN(y.duration)){var A=n++;y.type=i,y.start=u,y.levelkey=c,y.sn=A,y.level=r,y.cc=g,y.urlId=a,y.baseurl=e,y.relurl=(" "+b[3]).slice(1),f.programDateTime&&(m?y.rawProgramDateTime?y.pdt=Date.parse(y.rawProgramDateTime):y.pdt=m.pdt+1e3*m.duration:y.pdt=Date.parse(f.programDateTime),y.endPdt=y.pdt+1e3*y.duration),f.fragments.push(y),m=y,u+=y.duration,y=new o.a}}else if(b[4]){if(y.rawByteRange=(" "+b[4]).slice(1),m){var _=m.byteRangeEndOffset;_&&(y.lastByteRangeEndOffset=_)}}else if(b[5])y.rawProgramDateTime=(" "+b[5]).slice(1),y.tagList.push(["PROGRAM-DATE-TIME",y.rawProgramDateTime]),void 0===f.programDateTime&&(f.programDateTime=new Date(new Date(Date.parse(b[5]))-1e3*u));else{for(b=b[0].match(p),E=1;E<b.length&&void 0===b[E];E++);var R=(" "+b[E+1]).slice(1),L=(" "+b[E+2]).slice(1);switch(b[E]){case"#":y.tagList.push(L?[R,L]:[R]);break;case"PLAYLIST-TYPE":f.type=R.toUpperCase();break;case"MEDIA-SEQUENCE":n=f.startSN=parseInt(R);break;case"TARGETDURATION":f.targetduration=parseFloat(R);break;case"VERSION":f.version=parseInt(R);break;case"EXTM3U":break;case"ENDLIST":f.live=!1;break;case"DIS":g++,y.tagList.push(["DIS"]);break;case"DISCONTINUITY-SEQ":g=parseInt(R);break;case"KEY":var w=R,D=new l.a(w),O=D.enumeratedString("METHOD"),I=D.URI,x=D.hexadecimalInteger("IV");O&&(c=new s.a,I&&["AES-128","SAMPLE-AES","SAMPLE-AES-CENC"].indexOf(O)>=0&&(c.method=O,c.baseuri=e,c.reluri=I,c.key=null,c.iv=x));break;case"START":var k=R,P=new l.a(k),C=P.decimalFloatingPoint("TIME-OFFSET");isNaN(C)||(f.startTimeOffset=C);break;case"MAP":var F=new l.a(R);y.relurl=F.URI,y.rawByteRange=F.BYTERANGE,y.baseurl=e,y.level=r,y.type=i,y.sn="initSegment",f.initSegment=y,y=new o.a;break;default:d.b.warn("line parsed but not handled: "+b)}}}return y=m,y&&!y.relurl&&(f.fragments.pop(),u-=y.duration),f.totalduration=u,f.averagetargetduration=u/f.fragments.length,f.endSN=n-1,f.startCC=f.fragments[0]?f.fragments[0].cc:0,f.endCC=g,!f.initSegment&&f.fragments.length&&f.fragments.every(function(t){return v.test(t.relurl)})&&(d.b.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"),y=new o.a,y.relurl=f.fragments[0].relurl,y.baseurl=e,y.level=r,y.type=i,y.sn="initSegment",f.initSegment=y,f.needSidxRanges=!0),f},t}();e.a=g},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=/^(\d+)x(\d+)$/,n=/\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,o=function(){function t(e){i(this,t),"string"==typeof e&&(e=t.parseAttrList(e));for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r])}return t.prototype.decimalInteger=function(t){var e=parseInt(this[t],10);return e>Number.MAX_SAFE_INTEGER?1/0:e},t.prototype.hexadecimalInteger=function(t){if(this[t]){var e=(this[t]||"0x").slice(2);e=(1&e.length?"0":"")+e;for(var r=new Uint8Array(e.length/2),i=0;i<e.length/2;i++)r[i]=parseInt(e.slice(2*i,2*i+2),16);return r}return null},t.prototype.hexadecimalIntegerAsNumber=function(t){var e=parseInt(this[t],16);return e>Number.MAX_SAFE_INTEGER?1/0:e},t.prototype.decimalFloatingPoint=function(t){return parseFloat(this[t])},t.prototype.enumeratedString=function(t){return this[t]},t.prototype.decimalResolution=function(t){var e=a.exec(this[t]);if(null!==e)return{width:parseInt(e[1],10),height:parseInt(e[2],10)}},t.parseAttrList=function(t){var e=void 0,r={};for(n.lastIndex=0;null!==(e=n.exec(t));){var i=e[2];0===i.indexOf('"')&&i.lastIndexOf('"')===i.length-1&&(i=i.slice(1,-1)),r[e[1]]=i}return r},t}();e.a=o},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(2),d=r(0),u=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.FRAG_LOADING));return n.loaders={},n}return n(e,t),e.prototype.destroy=function(){var e=this.loaders;for(var r in e){var i=e[r];i&&i.destroy()}this.loaders={},t.prototype.destroy.call(this)},e.prototype.onFragLoading=function(t){var e=t.frag,r=e.type,i=this.loaders,a=this.hls.config,n=a.fLoader,o=a.loader;e.loaded=0;var s=i[r];s&&(d.b.warn("abort previous fragment loader for type: "+r),s.abort()),s=i[r]=e.loader=a.fLoader?new n(a):new o(a);var l=void 0,u=void 0,f=void 0;l={url:e.url,frag:e,responseType:"arraybuffer",progressData:!1};var c=e.byteRangeStartOffset,h=e.byteRangeEndOffset;isNaN(c)||isNaN(h)||(l.rangeStart=c,l.rangeEnd=h),u={timeout:a.fragLoadingTimeOut,maxRetry:0,retryDelay:0,maxRetryDelay:a.fragLoadingMaxRetryTimeout},f={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this),onProgress:this.loadprogress.bind(this)},s.load(l,u,f)},e.prototype.loadsuccess=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=t.data,n=r.frag;n.loader=void 0,this.loaders[n.type]=void 0,this.hls.trigger(o.a.FRAG_LOADED,{payload:a,frag:n,stats:e,networkDetails:i})},e.prototype.loaderror=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=e.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:l.a.FRAG_LOAD_ERROR,fatal:!1,frag:e.frag,response:t,networkDetails:r})},e.prototype.loadtimeout=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=e.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:l.a.FRAG_LOAD_TIMEOUT,fatal:!1,frag:e.frag,networkDetails:r})},e.prototype.loadprogress=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=e.frag;a.loaded=t.loaded,this.hls.trigger(o.a.FRAG_LOAD_PROGRESS,{frag:a,stats:t,networkDetails:i})},e}(s.a);e.a=u},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(2),d=r(0),u=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.KEY_LOADING));return n.loaders={},n.decryptkey=null,n.decrypturl=null,n}return n(e,t),e.prototype.destroy=function(){for(var t in this.loaders){var e=this.loaders[t];e&&e.destroy()}this.loaders={},s.a.prototype.destroy.call(this)},e.prototype.onKeyLoading=function(t){var e=t.frag,r=e.type,i=this.loaders[r],a=e.decryptdata,n=a.uri;if(n!==this.decrypturl||null===this.decryptkey){var s=this.hls.config;i&&(d.b.warn("abort previous key loader for type:"+r),i.abort()),e.loader=this.loaders[r]=new s.loader(s),this.decrypturl=n,this.decryptkey=null;var l=void 0,u=void 0,f=void 0;l={url:n,frag:e,responseType:"arraybuffer"},u={timeout:s.fragLoadingTimeOut,maxRetry:s.fragLoadingMaxRetry,retryDelay:s.fragLoadingRetryDelay,maxRetryDelay:s.fragLoadingMaxRetryTimeout},f={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)},e.loader.load(l,u,f)}else this.decryptkey&&(a.key=this.decryptkey,this.hls.trigger(o.a.KEY_LOADED,{frag:e}))},e.prototype.loadsuccess=function(t,e,r){var i=r.frag;this.decryptkey=i.decryptdata.key=new Uint8Array(t.data),i.loader=void 0,this.loaders[i.type]=void 0,this.hls.trigger(o.a.KEY_LOADED,{frag:i})},e.prototype.loaderror=function(t,e){var r=e.frag,i=r.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:l.a.KEY_LOAD_ERROR,fatal:!1,frag:r,response:t})},e.prototype.loadtimeout=function(t,e){var r=e.frag,i=r.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(o.a.ERROR,{type:l.b.NETWORK_ERROR,details:l.a.KEY_LOAD_TIMEOUT,fatal:!1,frag:r})},e}(s.a);e.a=u},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(7),s=r(17),l=r(29),d=r(1),u=r(16),f=r(13),c=r(11),h=r(22),p=r(44),v=r(2),g=r(0),m=r(45),y=r(46),b=r(47),E=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),T={STOPPED:"STOPPED",IDLE:"IDLE",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING",FRAG_LOADING_WAITING_RETRY:"FRAG_LOADING_WAITING_RETRY",WAITING_LEVEL:"WAITING_LEVEL",PARSING:"PARSING",PARSED:"PARSED",BUFFER_FLUSHING:"BUFFER_FLUSHING",ENDED:"ENDED",ERROR:"ERROR"},S=function(t){function e(r,n){i(this,e);var o=a(this,t.call(this,r,d.a.MEDIA_ATTACHED,d.a.MEDIA_DETACHING,d.a.MANIFEST_LOADING,d.a.MANIFEST_PARSED,d.a.LEVEL_LOADED,d.a.KEY_LOADED,d.a.FRAG_LOADED,d.a.FRAG_LOAD_EMERGENCY_ABORTED,d.a.FRAG_PARSING_INIT_SEGMENT,d.a.FRAG_PARSING_DATA,d.a.FRAG_PARSED,d.a.ERROR,d.a.AUDIO_TRACK_SWITCHING,d.a.AUDIO_TRACK_SWITCHED,d.a.BUFFER_CREATED,d.a.BUFFER_APPENDED,d.a.BUFFER_FLUSHED));return o.fragmentTracker=n,o.config=r.config,o.audioCodecSwap=!1,o._state=T.STOPPED,o.stallReported=!1,o}return n(e,t),e.prototype.onHandlerDestroying=function(){this.stopLoad(),t.prototype.onHandlerDestroying.call(this)},e.prototype.onHandlerDestroyed=function(){this.state=T.STOPPED,this.fragmentTracker=null,t.prototype.onHandlerDestroyed.call(this)},e.prototype.startLoad=function(t){if(this.levels){var e=this.lastCurrentTime,r=this.hls;if(this.stopLoad(),this.setInterval(100),this.level=-1,this.fragLoadError=0,!this.startFragRequested){var i=r.startLevel;-1===i&&(i=0,this.bitrateTest=!0),this.level=r.nextLoadLevel=i,this.loadedmetadata=!1}e>0&&-1===t&&(g.b.log("override startPosition with lastCurrentTime @"+e.toFixed(3)),t=e),this.state=T.IDLE,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}else this.forceStartLoad=!0,this.state=T.STOPPED},e.prototype.stopLoad=function(){var t=this.fragCurrent;t&&(t.loader&&t.loader.abort(),this.fragmentTracker.removeFragment(t),this.fragCurrent=null),this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.clearInterval(),this.state=T.STOPPED,this.forceStartLoad=!1},e.prototype.doTick=function(){switch(this.state){case T.BUFFER_FLUSHING:this.fragLoadError=0;break;case T.IDLE:this._doTickIdle();break;case T.WAITING_LEVEL:var t=this.levels[this.level];t&&t.details&&(this.state=T.IDLE);break;case T.FRAG_LOADING_WAITING_RETRY:var e=window.performance.now(),r=this.retryDate;(!r||e>=r||this.media&&this.media.seeking)&&(g.b.log("mediaController: retryDate reached, switch back to IDLE state"),this.state=T.IDLE);break;case T.ERROR:case T.STOPPED:case T.FRAG_LOADING:case T.PARSING:case T.PARSED:case T.ENDED:}this._checkBuffer(),this._checkFragmentChanged()},e.prototype._doTickIdle=function(){var t=this.hls,e=t.config,r=this.media;if(void 0!==this.levelLastLoaded&&(r||!this.startFragRequested&&e.startFragPrefetch)){var i=void 0;i=this.loadedmetadata?r.currentTime:this.nextLoadPosition;var a=t.nextLoadLevel,n=this.levels[a];if(n){var o=n.bitrate,l=void 0;l=o?Math.max(8*e.maxBufferSize/o,e.maxBufferLength):e.maxBufferLength,l=Math.min(l,e.maxMaxBufferLength);var u=s.a.bufferInfo(this.mediaBuffer?this.mediaBuffer:r,i,e.maxBufferHole),f=u.len;if(!(f>=l)){g.b.trace("buffer length of "+f.toFixed(3)+" is below max of "+l.toFixed(3)+". checking for more payload ..."),this.level=t.nextLoadLevel=a;var c=n.details;if(!c||c.live&&this.levelLastLoaded!==a)return void(this.state=T.WAITING_LEVEL);var h=this.fragPrevious;if(!c.live&&h&&!h.backtracked&&h.sn===c.endSN&&!u.nextStart){if(Math.min(r.duration,h.start+h.duration)-Math.max(u.end,h.start)<=Math.max(.2,h.duration)){var p={};return this.altAudio&&(p.type="video"),this.hls.trigger(d.a.BUFFER_EOS,p),void(this.state=T.ENDED)}}this._fetchPayloadOrEos(i,u,c)}}}},e.prototype._fetchPayloadOrEos=function(t,e,r){var i=this.fragPrevious,a=this.level,n=r.fragments,o=n.length;if(0!==o){var s=n[0].start,l=n[o-1].start+n[o-1].duration,d=e.end,u=void 0;if(r.initSegment&&!r.initSegment.data)u=r.initSegment;else if(r.live){var f=this.config.initialLiveManifestSize;if(o<f)return void g.b.warn("Can not start playback of a level, reason: not enough fragments "+o+" < "+f);if(null===(u=this._ensureFragmentAtLivePoint(r,d,s,l,i,n,o)))return}else d<s&&(u=n[0]);u||(u=this._findFragment(s,i,o,n,d,l,r)),u&&(u.encrypted?(g.b.log("Loading key for "+u.sn+" of ["+r.startSN+" ,"+r.endSN+"],level "+a),this._loadKey(u)):(g.b.log("Loading "+u.sn+" of ["+r.startSN+" ,"+r.endSN+"],level "+a+", currentTime:"+t.toFixed(3)+",bufferEnd:"+d.toFixed(3)),this._loadFragment(u)))}},e.prototype._ensureFragmentAtLivePoint=function(t,e,r,i,a,n,s){var l=this.hls.config,d=this.media,u=void 0,f=void 0!==l.liveMaxLatencyDuration?l.liveMaxLatencyDuration:l.liveMaxLatencyDurationCount*t.targetduration;if(e<Math.max(r-l.maxFragLookUpTolerance,i-f)){var c=this.liveSyncPosition=this.computeLivePosition(r,t);g.b.log("buffer end: "+e.toFixed(3)+" is located too far from the end of live sliding playlist, reset currentTime to : "+c.toFixed(3)),e=c,d&&d.readyState&&d.duration>c&&(d.currentTime=c),this.nextLoadPosition=c}if(t.PTSKnown&&e>i&&d&&d.readyState)return null;if(this.startFragRequested&&!t.PTSKnown){if(a)if(t.programDateTime)u=Object(b.b)(n,a.endPdt+1);else{var h=a.sn+1;if(h>=t.startSN&&h<=t.endSN){var p=n[h-t.startSN];a.cc===p.cc&&(u=p,g.b.log("live playlist, switching playlist, load frag with next SN: "+u.sn))}u||(u=o.a.search(n,function(t){return a.cc-t.cc}))&&g.b.log("live playlist, switching playlist, load frag with same CC: "+u.sn)}u||(u=n[Math.min(s-1,Math.round(s/2))],g.b.log("live playlist, switching playlist, unknown, load middle frag : "+u.sn))}return u},e.prototype._findFragment=function(t,e,r,i,a,n,o){var s=this.hls.config,l=void 0,d=void 0;if(a<n?o.programDateTime?(d=Object(b.b)(i,Object(b.a)(t,a,o)))&&!Object(b.d)(a,s.maxFragLookUpTolerance,d)||(g.b.warn("Frag found by PDT search did not fit within tolerance; falling back to finding by SN"),d=function(){return Object(b.c)(e,i,a,n,s.maxFragLookUpTolerance)}()):d=Object(b.c)(e,i,a,n,s.maxFragLookUpTolerance):d=i[r-1],d){l=d;var u=l.sn-o.startSN,f=e&&l.level===e.level,c=i[u-1],h=i[u+1];if(e&&l.sn===e.sn)if(f&&!l.backtracked)if(l.sn<o.endSN){var p=e.deltaPTS;p&&p>s.maxBufferHole&&e.dropped&&u?(l=c,g.b.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this")):(l=h,g.b.log("SN just loaded, load next one: "+l.sn))}else l=null;else l.backtracked&&(h&&h.backtracked?(g.b.warn("Already backtracked from fragment "+h.sn+", will not backtrack to fragment "+l.sn+". Loading fragment "+h.sn),l=h):(g.b.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"),l.dropped=0,c?(l=c,l.backtracked=!0):u&&(l=null)))}return l},e.prototype._loadKey=function(t){this.state=T.KEY_LOADING,this.hls.trigger(d.a.KEY_LOADING,{frag:t})},e.prototype._loadFragment=function(t){var e=this.fragmentTracker.getState(t);this.fragCurrent=t,this.startFragRequested=!0,isNaN(t.sn)||t.bitrateTest||(this.nextLoadPosition=t.start+t.duration),t.backtracked||e===u.a.NOT_LOADED||e===u.a.PARTIAL?(t.autoLevel=this.hls.autoLevelEnabled,t.bitrateTest=this.bitrateTest,this.hls.trigger(d.a.FRAG_LOADING,{frag:t}),this.demuxer||(this.demuxer=new l.a(this.hls,"main")),this.state=T.FRAG_LOADING):e===u.a.APPENDING&&this._reduceMaxBufferLength(t.duration)&&this.fragmentTracker.removeFragment(t)},e.prototype.getBufferedFrag=function(t){return this.fragmentTracker.getBufferedFrag(t,c.a.LevelType.MAIN)},e.prototype.followingBufferedFrag=function(t){return t?this.getBufferedFrag(t.endPTS+.5):null},e.prototype._checkFragmentChanged=function(){var t=void 0,e=void 0,r=this.media;if(r&&r.readyState&&!1===r.seeking&&(e=r.currentTime,e>this.lastCurrentTime&&(this.lastCurrentTime=e),s.a.isBuffered(r,e)?t=this.getBufferedFrag(e):s.a.isBuffered(r,e+.1)&&(t=this.getBufferedFrag(e+.1)),t)){var i=t;if(i!==this.fragPlaying){this.hls.trigger(d.a.FRAG_CHANGED,{frag:i});var a=i.level;this.fragPlaying&&this.fragPlaying.level===a||this.hls.trigger(d.a.LEVEL_SWITCHED,{level:a}),this.fragPlaying=i}}},e.prototype.immediateLevelSwitch=function(){if(g.b.log("immediateLevelSwitch"),!this.immediateSwitch){this.immediateSwitch=!0;var t=this.media,e=void 0;t?(e=t.paused,t.pause()):e=!0,this.previouslyPaused=e}var r=this.fragCurrent;r&&r.loader&&r.loader.abort(),this.fragCurrent=null,this.flushMainBuffer(0,Number.POSITIVE_INFINITY)},e.prototype.immediateLevelSwitchEnd=function(){var t=this.media;t&&t.buffered.length&&(this.immediateSwitch=!1,s.a.isBuffered(t,t.currentTime)&&(t.currentTime-=1e-4),this.previouslyPaused||t.play())},e.prototype.nextLevelSwitch=function(){var t=this.media;if(t&&t.readyState){var e=void 0,r=void 0,i=void 0;if(r=this.getBufferedFrag(t.currentTime),r&&r.startPTS>1&&this.flushMainBuffer(0,r.startPTS-1),t.paused)e=0;else{var a=this.hls.nextLoadLevel,n=this.levels[a],o=this.fragLastKbps;e=o&&this.fragCurrent?this.fragCurrent.duration*n.bitrate/(1e3*o)+1:0}if((i=this.getBufferedFrag(t.currentTime+e))&&(i=this.followingBufferedFrag(i))){var s=this.fragCurrent;s&&s.loader&&s.loader.abort(),this.fragCurrent=null,this.flushMainBuffer(i.maxStartPTS,Number.POSITIVE_INFINITY)}}},e.prototype.flushMainBuffer=function(t,e){this.state=T.BUFFER_FLUSHING;var r={startOffset:t,endOffset:e};this.altAudio&&(r.type="video"),this.hls.trigger(d.a.BUFFER_FLUSHING,r)},e.prototype.onMediaAttached=function(t){var e=this.media=this.mediaBuffer=t.media;this.onvseeking=this.onMediaSeeking.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),this.onvended=this.onMediaEnded.bind(this),e.addEventListener("seeking",this.onvseeking),e.addEventListener("seeked",this.onvseeked),e.addEventListener("ended",this.onvended);var r=this.config;this.levels&&r.autoStartLoad&&this.hls.startLoad(r.startPosition)},e.prototype.onMediaDetaching=function(){var t=this.media;t&&t.ended&&(g.b.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var e=this.levels;e&&e.forEach(function(t){t.details&&t.details.fragments.forEach(function(t){t.backtracked=void 0})}),t&&(t.removeEventListener("seeking",this.onvseeking),t.removeEventListener("seeked",this.onvseeked),t.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvended=null),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.stopLoad()},e.prototype.onMediaSeeking=function(){var t=this.media,e=t?t.currentTime:void 0,r=this.config;isNaN(e)||g.b.log("media seeking to "+e.toFixed(3));var i=this.mediaBuffer?this.mediaBuffer:t,a=s.a.bufferInfo(i,e,this.config.maxBufferHole);if(this.state===T.FRAG_LOADING){var n=this.fragCurrent;if(0===a.len&&n){var o=r.maxFragLookUpTolerance,l=n.start-o,d=n.start+n.duration+o;e<l||e>d?(n.loader&&(g.b.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),n.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.state=T.IDLE):g.b.log("seeking outside of buffer but within currently loaded fragment range")}}else this.state===T.ENDED&&(0===a.len&&(this.fragPrevious=0),this.state=T.IDLE);t&&(this.lastCurrentTime=e),this.loadedmetadata||(this.nextLoadPosition=this.startPosition=e),this.tick()},e.prototype.onMediaSeeked=function(){var t=this.media,e=t?t.currentTime:void 0;isNaN(e)||g.b.log("media seeked to "+e.toFixed(3)),this.tick()},e.prototype.onMediaEnded=function(){g.b.log("media ended"),this.startPosition=this.lastCurrentTime=0},e.prototype.onManifestLoading=function(){g.b.log("trigger BUFFER_RESET"),this.hls.trigger(d.a.BUFFER_RESET),this.fragmentTracker.removeAllFragments(),this.stalled=!1,this.startPosition=this.lastCurrentTime=0},e.prototype.onManifestParsed=function(t){var e=!1,r=!1,i=void 0;t.levels.forEach(function(t){(i=t.audioCodec)&&(-1!==i.indexOf("mp4a.40.2")&&(e=!0),-1!==i.indexOf("mp4a.40.5")&&(r=!0))}),this.audioCodecSwitch=e&&r,this.audioCodecSwitch&&g.b.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=t.levels,this.startFragRequested=!1;var a=this.config;(a.autoStartLoad||this.forceStartLoad)&&this.hls.startLoad(a.startPosition)},e.prototype.onLevelLoaded=function(t){var e=t.details,r=t.level,i=this.levels[this.levelLastLoaded],a=this.levels[r],n=e.totalduration,o=0;if(g.b.log("level "+r+" loaded ["+e.startSN+","+e.endSN+"],duration:"+n),e.live){var s=a.details;s&&e.fragments.length>0?(h.b(s,e),o=e.fragments[0].start,this.liveSyncPosition=this.computeLivePosition(o,s),e.PTSKnown&&!isNaN(o)?g.b.log("live playlist sliding:"+o.toFixed(3)):(g.b.log("live playlist - outdated PTS, unknown sliding"),Object(m.a)(this.fragPrevious,i,e))):(g.b.log("live playlist - first load, unknown sliding"),e.PTSKnown=!1,Object(m.a)(this.fragPrevious,i,e))}else e.PTSKnown=!1;if(a.details=e,this.levelLastLoaded=r,this.hls.trigger(d.a.LEVEL_UPDATED,{details:e,level:r}),!1===this.startFragRequested){if(-1===this.startPosition||-1===this.lastCurrentTime){var l=e.startTimeOffset;isNaN(l)?e.live?(this.startPosition=this.computeLivePosition(o,e),g.b.log("configure startPosition to "+this.startPosition)):this.startPosition=0:(l<0&&(g.b.log("negative start time offset "+l+", count from end of last fragment"),l=o+n+l),g.b.log("start time offset found in playlist, adjust startPosition to "+l),this.startPosition=l),this.lastCurrentTime=this.startPosition}this.nextLoadPosition=this.startPosition}this.state===T.WAITING_LEVEL&&(this.state=T.IDLE),this.tick()},e.prototype.onKeyLoaded=function(){this.state===T.KEY_LOADING&&(this.state=T.IDLE,this.tick())},e.prototype.onFragLoaded=function(t){var e=this.fragCurrent,r=t.frag;if(this.state===T.FRAG_LOADING&&e&&"main"===r.type&&r.level===e.level&&r.sn===e.sn){var i=t.stats,a=this.levels[e.level],n=a.details;if(g.b.log("Loaded  "+e.sn+" of ["+n.startSN+" ,"+n.endSN+"],level "+e.level),this.bitrateTest=!1,this.stats=i,!0===r.bitrateTest&&this.hls.nextLoadLevel)this.state=T.IDLE,this.startFragRequested=!1,i.tparsed=i.tbuffered=window.performance.now(),this.hls.trigger(d.a.FRAG_BUFFERED,{stats:i,frag:e,id:"main"}),this.tick();else if("initSegment"===r.sn)this.state=T.IDLE,i.tparsed=i.tbuffered=window.performance.now(),n.initSegment.data=t.payload,this.hls.trigger(d.a.FRAG_BUFFERED,{stats:i,frag:e,id:"main"}),this.tick();else{this.state=T.PARSING;var o=n.totalduration,s=e.level,u=e.sn,f=this.config.defaultAudioCodec||a.audioCodec;this.audioCodecSwap&&(g.b.log("swapping playlist audio codec"),void 0===f&&(f=this.lastAudioCodec),f&&(f=-1!==f.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5")),this.pendingBuffering=!0,this.appended=!1,g.b.log("Parsing "+u+" of ["+n.startSN+" ,"+n.endSN+"],level "+s+", cc "+e.cc);var c=this.demuxer;c||(c=this.demuxer=new l.a(this.hls,"main"));var h=this.media,p=h&&h.seeking,v=!p&&(n.PTSKnown||!n.live),m=n.initSegment?n.initSegment.data:[];c.push(t.payload,m,f,a.videoCodec,e,o,v,void 0)}}this.fragLoadError=0},e.prototype.onFragParsingInitSegment=function(t){var e=this.fragCurrent,r=t.frag;if(e&&"main"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===T.PARSING){var i=t.tracks,a=void 0,n=void 0;if(i.audio&&this.altAudio&&delete i.audio,n=i.audio){var o=this.levels[this.level].audioCodec,s=navigator.userAgent.toLowerCase();o&&this.audioCodecSwap&&(g.b.log("swapping playlist audio codec"),o=-1!==o.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),this.audioCodecSwitch&&1!==n.metadata.channelCount&&-1===s.indexOf("firefox")&&(o="mp4a.40.5"),-1!==s.indexOf("android")&&"audio/mpeg"!==n.container&&(o="mp4a.40.2",g.b.log("Android: force audio codec to "+o)),n.levelCodec=o,n.id=t.id}n=i.video,n&&(n.levelCodec=this.levels[this.level].videoCodec,n.id=t.id),this.hls.trigger(d.a.BUFFER_CODECS,i);for(a in i){n=i[a],g.b.log("main track:"+a+",container:"+n.container+",codecs[level/parsed]=["+n.levelCodec+"/"+n.codec+"]");var l=n.initSegment;l&&(this.appended=!0,this.pendingBuffering=!0,this.hls.trigger(d.a.BUFFER_APPENDING,{type:a,data:l,parent:"main",content:"initSegment"}))}this.tick()}},e.prototype.onFragParsingData=function(t){var e=this,r=this.fragCurrent,i=t.frag;if(r&&"main"===t.id&&i.sn===r.sn&&i.level===r.level&&("audio"!==t.type||!this.altAudio)&&this.state===T.PARSING){var a=this.levels[this.level],n=r;if(isNaN(t.endPTS)&&(t.endPTS=t.startPTS+r.duration,t.endDTS=t.startDTS+r.duration),!0===t.hasAudio&&n.addElementaryStream(f.a.ElementaryStreamTypes.AUDIO),!0===t.hasVideo&&n.addElementaryStream(f.a.ElementaryStreamTypes.VIDEO),g.b.log("Parsed "+t.type+",PTS:["+t.startPTS.toFixed(3)+","+t.endPTS.toFixed(3)+"],DTS:["+t.startDTS.toFixed(3)+"/"+t.endDTS.toFixed(3)+"],nb:"+t.nb+",dropped:"+(t.dropped||0)),"video"===t.type)if(n.dropped=t.dropped,n.dropped)if(n.backtracked)g.b.warn("Already backtracked on this fragment, appending with the gap",n.sn);else{var o=a.details;if(!o||n.sn!==o.startSN)return g.b.warn("missing video frame(s), backtracking fragment",n.sn),this.fragmentTracker.removeFragment(n),n.backtracked=!0,this.nextLoadPosition=t.startPTS,this.state=T.IDLE,this.fragPrevious=n,void this.tick();g.b.warn("missing video frame(s) on first frag, appending with gap",n.sn)}else n.backtracked=!1;var s=h.c(a.details,n,t.startPTS,t.endPTS,t.startDTS,t.endDTS),l=this.hls;l.trigger(d.a.LEVEL_PTS_UPDATED,{details:a.details,level:this.level,drift:s,type:t.type,start:t.startPTS,end:t.endPTS}),[t.data1,t.data2].forEach(function(r){r&&r.length&&e.state===T.PARSING&&(e.appended=!0,e.pendingBuffering=!0,l.trigger(d.a.BUFFER_APPENDING,{type:t.type,data:r,parent:"main",content:"data"}))}),this.tick()}},e.prototype.onFragParsed=function(t){var e=this.fragCurrent,r=t.frag;e&&"main"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===T.PARSING&&(this.stats.tparsed=window.performance.now(),this.state=T.PARSED,this._checkAppendedParsed())},e.prototype.onAudioTrackSwitching=function(t){var e=!!t.url,r=t.id;if(!e){if(this.mediaBuffer!==this.media){g.b.log("switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media;var i=this.fragCurrent;i.loader&&(g.b.log("switching to main audio track, cancel main fragment load"),i.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=T.IDLE}var a=this.hls;a.trigger(d.a.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"}),a.trigger(d.a.AUDIO_TRACK_SWITCHED,{id:r}),this.altAudio=!1}},e.prototype.onAudioTrackSwitched=function(t){var e=t.id,r=!!this.hls.audioTracks[e].url;if(r){var i=this.videoBuffer;i&&this.mediaBuffer!==i&&(g.b.log("switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=i)}this.altAudio=r,this.tick()},e.prototype.onBufferCreated=function(t){var e=t.tracks,r=void 0,i=void 0,a=!1;for(var n in e){var o=e[n];"main"===o.id?(i=n,r=o,"video"===n&&(this.videoBuffer=e[n].buffer)):a=!0}a&&r?(g.b.log("alternate track found, use "+i+".buffered to schedule main fragment loading"),this.mediaBuffer=r.buffer):this.mediaBuffer=this.media},e.prototype.onBufferAppended=function(t){if("main"===t.parent){var e=this.state;e!==T.PARSING&&e!==T.PARSED||(this.pendingBuffering=t.pending>0,this._checkAppendedParsed())}},e.prototype._checkAppendedParsed=function(){if(!(this.state!==T.PARSED||this.appended&&this.pendingBuffering)){var t=this.fragCurrent;if(t){var e=this.mediaBuffer?this.mediaBuffer:this.media;g.b.log("main buffered : "+p.a.toString(e.buffered)),this.fragPrevious=t;var r=this.stats;r.tbuffered=window.performance.now(),this.fragLastKbps=Math.round(8*r.total/(r.tbuffered-r.tfirst)),this.hls.trigger(d.a.FRAG_BUFFERED,{stats:r,frag:t,id:"main"}),this.state=T.IDLE}this.tick()}},e.prototype.onError=function(t){var e=t.frag||this.fragCurrent;if(!e||"main"===e.type){var r=!!this.media&&s.a.isBuffered(this.media,this.media.currentTime)&&s.a.isBuffered(this.media,this.media.currentTime+.5);switch(t.details){case v.a.FRAG_LOAD_ERROR:case v.a.FRAG_LOAD_TIMEOUT:case v.a.KEY_LOAD_ERROR:case v.a.KEY_LOAD_TIMEOUT:if(!t.fatal)if(this.fragLoadError+1<=this.config.fragLoadingMaxRetry){var i=Math.min(Math.pow(2,this.fragLoadError)*this.config.fragLoadingRetryDelay,this.config.fragLoadingMaxRetryTimeout);g.b.warn("mediaController: frag loading failed, retry in "+i+" ms"),this.retryDate=window.performance.now()+i,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.fragLoadError++,this.state=T.FRAG_LOADING_WAITING_RETRY}else g.b.error("mediaController: "+t.details+" reaches max retry, redispatch as fatal ..."),t.fatal=!0,this.state=T.ERROR;break;case v.a.LEVEL_LOAD_ERROR:case v.a.LEVEL_LOAD_TIMEOUT:this.state!==T.ERROR&&(t.fatal?(this.state=T.ERROR,g.b.warn("streamController: "+t.details+",switch to "+this.state+" state ...")):t.levelRetry||this.state!==T.WAITING_LEVEL||(this.state=T.IDLE));break;case v.a.BUFFER_FULL_ERROR:"main"!==t.parent||this.state!==T.PARSING&&this.state!==T.PARSED||(r?(this._reduceMaxBufferLength(this.config.maxBufferLength),this.state=T.IDLE):(g.b.warn("buffer full error also media.currentTime is not buffered, flush everything"),this.fragCurrent=null,this.flushMainBuffer(0,Number.POSITIVE_INFINITY)))}}},e.prototype._reduceMaxBufferLength=function(t){var e=this.config;return e.maxMaxBufferLength>=t&&(e.maxMaxBufferLength/=2,g.b.warn("main:reduce max buffer length to "+e.maxMaxBufferLength+"s"),!0)},e.prototype._checkBuffer=function(){var t=this.config,e=this.media;if(e&&0!==e.readyState){var r=e.currentTime,i=this.mediaBuffer?this.mediaBuffer:e,a=i.buffered;if(!this.loadedmetadata&&a.length)this.loadedmetadata=!0,this._seekToStartPos();else if(this.immediateSwitch)this.immediateLevelSwitchEnd();else{var n=!(e.paused&&e.readyState>1||e.ended||0===e.buffered.length),o=window.performance.now();if(r!==this.lastCurrentTime)this.stallReported&&(g.b.warn("playback not stuck anymore @"+r+", after "+Math.round(o-this.stalled)+"ms"),this.stallReported=!1),this.stalled=null,this.nudgeRetry=0;else if(n){var l=o-this.stalled,d=s.a.bufferInfo(e,r,t.maxBufferHole);if(!this.stalled)return void(this.stalled=o);l>=1e3&&this._reportStall(d.len),this._tryFixBufferStall(d,l)}}}},e.prototype.onFragLoadEmergencyAborted=function(){this.state=T.IDLE,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tick()},e.prototype.onBufferFlushed=function(){var t=this.mediaBuffer?this.mediaBuffer:this.media;t&&this.fragmentTracker.detectEvictedFragments(f.a.ElementaryStreamTypes.VIDEO,t.buffered),this.state=T.IDLE,this.fragPrevious=null},e.prototype.swapAudioCodec=function(){this.audioCodecSwap=!this.audioCodecSwap},e.prototype.computeLivePosition=function(t,e){var r=void 0!==this.config.liveSyncDuration?this.config.liveSyncDuration:this.config.liveSyncDurationCount*e.targetduration;return t+Math.max(0,e.totalduration-r)},e.prototype._tryFixBufferStall=function(t,e){var r=this.config,i=this.media,a=i.currentTime,n=this.fragmentTracker.getPartialFragment(a);n&&this._trySkipBufferHole(n),t.len>.5&&e>1e3*r.highBufferWatchdogPeriod&&(this.stalled=null,this._tryNudgeBuffer())},e.prototype._reportStall=function(t){var e=this.hls,r=this.media;this.stallReported||(this.stallReported=!0,g.b.warn("Playback stalling at @"+r.currentTime+" due to low buffer"),e.trigger(d.a.ERROR,{type:v.b.MEDIA_ERROR,details:v.a.BUFFER_STALLED_ERROR,fatal:!1,buffer:t}))},e.prototype._trySkipBufferHole=function(t){for(var e=this.hls,r=this.media,i=r.currentTime,a=0,n=0;n<r.buffered.length;n++){var o=r.buffered.start(n);if(i>=a&&i<o)return r.currentTime=Math.max(o,r.currentTime+.1),g.b.warn("skipping hole, adjusting currentTime from "+i+" to "+r.currentTime),this.stalled=null,void e.trigger(d.a.ERROR,{type:v.b.MEDIA_ERROR,details:v.a.BUFFER_SEEK_OVER_HOLE,fatal:!1,reason:"fragment loaded with buffer holes, seeking from "+i+" to "+r.currentTime,frag:t});a=r.buffered.end(n)}},e.prototype._tryNudgeBuffer=function(){var t=this.config,e=this.hls,r=this.media,i=r.currentTime,a=(this.nudgeRetry||0)+1;if(this.nudgeRetry=a,a<t.nudgeMaxRetry){var n=i+a*t.nudgeOffset;g.b.log("adjust currentTime from "+i+" to "+n),r.currentTime=n,e.trigger(d.a.ERROR,{type:v.b.MEDIA_ERROR,details:v.a.BUFFER_NUDGE_ON_STALL,fatal:!1})}else g.b.error("still stuck in high buffer @"+i+" after "+t.nudgeMaxRetry+", raise fatal error"),e.trigger(d.a.ERROR,{type:v.b.MEDIA_ERROR,details:v.a.BUFFER_STALLED_ERROR,fatal:!0})},e.prototype._seekToStartPos=function(){var t=this.media,e=t.currentTime,r=t.seeking?e:this.startPosition;e!==r&&(g.b.log("target start position not buffered, seek to buffered.start(0) "+r+" from current time "+e+" "),t.currentTime=r)},E(e,[{key:"state",set:function(t){if(this.state!==t){var e=this.state;this._state=t,g.b.log("main stream:"+e+"->"+t),this.hls.trigger(d.a.STREAM_STATE_TRANSITION,{previousState:e,nextState:t})}},get:function(){return this._state}},{key:"currentLevel",get:function(){var t=this.media;if(t){var e=this.getBufferedFrag(t.currentTime);if(e)return e.level}return-1}},{key:"nextBufferedFrag",get:function(){var t=this.media;return t?this.followingBufferedFrag(this.getBufferedFrag(t.currentTime)):null}},{key:"nextLevel",get:function(){var t=this.nextBufferedFrag;return t?t.level:-1}},{key:"liveSyncPosition",get:function(){return this._liveSyncPosition},set:function(t){this._liveSyncPosition=t}}]),e}(y.a);e.a=S},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(8),n=r.n(a),o=r(30),s=r.n(o),l=r(1),d=r(18),u=r(0),f=r(2),c=r(10),h=r(5),p=Object(h.a)(),v=Object(c.a)(),g=function(){function t(e,r){i(this,t),this.hls=e,this.id=r;var a=this.observer=new n.a,o=e.config;a.trigger=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];a.emit.apply(a,[t,t].concat(r))},a.off=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];a.removeListener.apply(a,[t].concat(r))};var c=function(t,r){r=r||{},r.frag=this.frag,r.id=this.id,e.trigger(t,r)}.bind(this);a.on(l.a.FRAG_DECRYPTED,c),a.on(l.a.FRAG_PARSING_INIT_SEGMENT,c),a.on(l.a.FRAG_PARSING_DATA,c),a.on(l.a.FRAG_PARSED,c),a.on(l.a.ERROR,c),a.on(l.a.FRAG_PARSING_METADATA,c),a.on(l.a.FRAG_PARSING_USERDATA,c),a.on(l.a.INIT_PTS_FOUND,c);var h={mp4:v.isTypeSupported("video/mp4"),mpeg:v.isTypeSupported("audio/mpeg"),mp3:v.isTypeSupported('audio/mp4; codecs="mp3"')},g=navigator.vendor;if(o.enableWorker&&"undefined"!=typeof Worker){u.b.log("demuxing in webworker");var m=void 0;try{m=this.w=s()(43),this.onwmsg=this.onWorkerMessage.bind(this),m.addEventListener("message",this.onwmsg),m.onerror=function(t){e.trigger(l.a.ERROR,{type:f.b.OTHER_ERROR,details:f.a.INTERNAL_EXCEPTION,fatal:!0,event:"demuxerWorker",err:{message:t.message+" ("+t.filename+":"+t.lineno+")"}})},m.postMessage({cmd:"init",typeSupported:h,vendor:g,id:r,config:JSON.stringify(o)})}catch(t){u.b.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),m&&p.URL.revokeObjectURL(m.objectURL),this.demuxer=new d.a(a,h,o,g),this.w=void 0}}else this.demuxer=new d.a(a,h,o,g)}return t.prototype.destroy=function(){var t=this.w;if(t)t.removeEventListener("message",this.onwmsg),t.terminate(),this.w=null;else{var e=this.demuxer;e&&(e.destroy(),this.demuxer=null)}var r=this.observer;r&&(r.removeAllListeners(),this.observer=null)},t.prototype.push=function(t,e,r,i,a,n,o,s){var l=this.w,d=isNaN(a.startDTS)?a.start:a.startDTS,f=a.decryptdata,c=this.frag,h=!(c&&a.cc===c.cc),p=!(c&&a.level===c.level),v=c&&a.sn===c.sn+1,g=!p&&v;if(h&&u.b.log(this.id+":discontinuity detected"),p&&u.b.log(this.id+":switch detected"),this.frag=a,l)l.postMessage({cmd:"demux",data:t,decryptdata:f,initSegment:e,audioCodec:r,videoCodec:i,timeOffset:d,discontinuity:h,trackSwitch:p,contiguous:g,duration:n,accurateTimeOffset:o,defaultInitPTS:s},t instanceof ArrayBuffer?[t]:[]);else{var m=this.demuxer;m&&m.push(t,f,e,r,i,d,h,p,g,n,o,s)}},t.prototype.onWorkerMessage=function(t){var e=t.data,r=this.hls;switch(e.event){case"init":p.URL.revokeObjectURL(this.w.objectURL);break;case l.a.FRAG_PARSING_DATA:e.data.data1=new Uint8Array(e.data1),e.data2&&(e.data.data2=new Uint8Array(e.data2));default:e.data=e.data||{},e.data.frag=this.frag,e.data.id=this.id,r.trigger(e.event,e.data)}},t}();e.a=g},function(t,e,r){function i(t){function e(i){if(r[i])return r[i].exports;var a=r[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,i){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e.oe=function(t){throw console.error(t),t};var i=e(e.s=ENTRY_MODULE);return i.default||i}function a(t){return(t+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function n(t,e,i){var n={};n[i]=[];var o=e.toString(),s=o.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!s)return n;for(var u,f=s[1],c=new RegExp("(\\\\n|\\W)"+a(f)+d,"g");u=c.exec(o);)"dll-reference"!==u[3]&&n[i].push(u[3]);for(c=new RegExp("\\("+a(f)+'\\("(dll-reference\\s('+l+'))"\\)\\)'+d,"g");u=c.exec(o);)t[u[2]]||(n[i].push(u[1]),t[u[2]]=r(u[1]).m),n[u[2]]=n[u[2]]||[],n[u[2]].push(u[4]);return n}function o(t){return Object.keys(t).reduce(function(e,r){return e||t[r].length>0},!1)}function s(t,e){for(var r={main:[e]},i={main:[]},a={main:{}};o(r);)for(var s=Object.keys(r),l=0;l<s.length;l++){var d=s[l],u=r[d],f=u.pop();if(a[d]=a[d]||{},!a[d][f]&&t[d][f]){a[d][f]=!0,i[d]=i[d]||[],i[d].push(f);for(var c=n(t,t[d][f],d),h=Object.keys(c),p=0;p<h.length;p++)r[h[p]]=r[h[p]]||[],r[h[p]]=r[h[p]].concat(c[h[p]])}}return i}var l="[\\.|\\-|\\+|\\w|/|@]+",d="\\((/\\*.*?\\*/)?s?.*?("+l+").*?\\)";t.exports=function(t,e){e=e||{};var a={main:r.m},n=e.all?{main:Object.keys(a)}:s(a,t),o="";Object.keys(n).filter(function(t){return"main"!==t}).forEach(function(t){for(var e=0;n[t][e];)e++;n[t].push(e),a[t][e]="(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",o=o+"var "+t+" = ("+i.toString().replace("ENTRY_MODULE",JSON.stringify(e))+")({"+n[t].map(function(e){return JSON.stringify(e)+": "+a[t][e].toString()}).join(",")+"});\n"}),o=o+"("+i.toString().replace("ENTRY_MODULE",JSON.stringify(t))+")({"+n.main.map(function(t){return JSON.stringify(t)+": "+a.main[t].toString()}).join(",")+"})(self);";var l=new window.Blob([o],{type:"text/javascript"});if(e.bare)return l;var d=window.URL||window.webkitURL||window.mozURL||window.msURL,u=d.createObjectURL(l),f=new window.Worker(u);return f.objectURL=u,f}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(e,r){i(this,t),this.subtle=e,this.aesIV=r}return t.prototype.decrypt=function(t,e){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},e,t)},t}();e.a=a},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(e,r){i(this,t),this.subtle=e,this.key=r}return t.prototype.expandKey=function(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])},t}();e.a=a},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){var e=t.byteLength,r=e&&new DataView(t).getUint8(e-1);return r?t.slice(0,e-r):t}var n=function(){function t(){i(this,t),this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.invSubMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.initTable()}return t.prototype.uint8ArrayToUint32Array_=function(t){for(var e=new DataView(t),r=new Uint32Array(4),i=0;i<4;i++)r[i]=e.getUint32(4*i);return r},t.prototype.initTable=function(){var t=this.sBox,e=this.invSBox,r=this.subMix,i=r[0],a=r[1],n=r[2],o=r[3],s=this.invSubMix,l=s[0],d=s[1],u=s[2],f=s[3],c=new Uint32Array(256),h=0,p=0,v=0;for(v=0;v<256;v++)c[v]=v<128?v<<1:v<<1^283;for(v=0;v<256;v++){var g=p^p<<1^p<<2^p<<3^p<<4;g=g>>>8^255&g^99,t[h]=g,e[g]=h;var m=c[h],y=c[m],b=c[y],E=257*c[g]^16843008*g;i[h]=E<<24|E>>>8,a[h]=E<<16|E>>>16,n[h]=E<<8|E>>>24,o[h]=E,E=16843009*b^65537*y^257*m^16843008*h,l[g]=E<<24|E>>>8,d[g]=E<<16|E>>>16,u[g]=E<<8|E>>>24,f[g]=E,h?(h=m^c[c[c[b^m]]],p^=c[c[p]]):h=p=1}},t.prototype.expandKey=function(t){for(var e=this.uint8ArrayToUint32Array_(t),r=!0,i=0;i<e.length&&r;)r=e[i]===this.key[i],i++;if(!r){this.key=e;var a=this.keySize=e.length;if(4!==a&&6!==a&&8!==a)throw new Error("Invalid aes key size="+a);var n=this.ksRows=4*(a+6+1),o=void 0,s=void 0,l=this.keySchedule=new Uint32Array(n),d=this.invKeySchedule=new Uint32Array(n),u=this.sBox,f=this.rcon,c=this.invSubMix,h=c[0],p=c[1],v=c[2],g=c[3],m=void 0,y=void 0;for(o=0;o<n;o++)o<a?m=l[o]=e[o]:(y=m,o%a==0?(y=y<<8|y>>>24,y=u[y>>>24]<<24|u[y>>>16&255]<<16|u[y>>>8&255]<<8|u[255&y],y^=f[o/a|0]<<24):a>6&&o%a==4&&(y=u[y>>>24]<<24|u[y>>>16&255]<<16|u[y>>>8&255]<<8|u[255&y]),l[o]=m=(l[o-a]^y)>>>0);for(s=0;s<n;s++)o=n-s,y=3&s?l[o]:l[o-4],d[s]=s<4||o<=4?y:h[u[y>>>24]]^p[u[y>>>16&255]]^v[u[y>>>8&255]]^g[u[255&y]],d[s]=d[s]>>>0}},t.prototype.networkToHostOrderSwap=function(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24},t.prototype.decrypt=function(t,e,r,i){for(var n=this.keySize+6,o=this.invKeySchedule,s=this.invSBox,l=this.invSubMix,d=l[0],u=l[1],f=l[2],c=l[3],h=this.uint8ArrayToUint32Array_(r),p=h[0],v=h[1],g=h[2],m=h[3],y=new Int32Array(t),b=new Int32Array(y.length),E=void 0,T=void 0,S=void 0,A=void 0,_=void 0,R=void 0,L=void 0,w=void 0,D=void 0,O=void 0,I=void 0,x=void 0,k=void 0,P=void 0,C=this.networkToHostOrderSwap;e<y.length;){for(D=C(y[e]),O=C(y[e+1]),I=C(y[e+2]),x=C(y[e+3]),_=D^o[0],R=x^o[1],L=I^o[2],w=O^o[3],k=4,P=1;P<n;P++)E=d[_>>>24]^u[R>>16&255]^f[L>>8&255]^c[255&w]^o[k],T=d[R>>>24]^u[L>>16&255]^f[w>>8&255]^c[255&_]^o[k+1],S=d[L>>>24]^u[w>>16&255]^f[_>>8&255]^c[255&R]^o[k+2],A=d[w>>>24]^u[_>>16&255]^f[R>>8&255]^c[255&L]^o[k+3],_=E,R=T,L=S,w=A,k+=4;E=s[_>>>24]<<24^s[R>>16&255]<<16^s[L>>8&255]<<8^s[255&w]^o[k],T=s[R>>>24]<<24^s[L>>16&255]<<16^s[w>>8&255]<<8^s[255&_]^o[k+1],S=s[L>>>24]<<24^s[w>>16&255]<<16^s[_>>8&255]<<8^s[255&R]^o[k+2],A=s[w>>>24]<<24^s[_>>16&255]<<16^s[R>>8&255]<<8^s[255&L]^o[k+3],k+=3,b[e]=C(E^p),b[e+1]=C(A^v),b[e+2]=C(S^g),b[e+3]=C(T^m),p=D,v=O,g=I,m=x,e+=4}return i?a(b.buffer):b.buffer},t.prototype.destroy=function(){this.key=void 0,this.keySize=void 0,this.ksRows=void 0,this.sBox=void 0,this.invSBox=void 0,this.subMix=void 0,this.invSubMix=void 0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.rcon=void 0},t}();e.a=n},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(20),n=r(0),o=r(9),s=function(){function t(e,r,a){i(this,t),this.observer=e,this.config=a,this.remuxer=r}return t.prototype.resetInitSegment=function(t,e,r,i){this._audioTrack={container:"audio/adts",type:"audio",id:0,sequenceNumber:0,isAAC:!0,samples:[],len:0,manifestCodec:e,duration:i,inputTimeScale:9e4}},t.prototype.resetTimeStamp=function(){},t.probe=function(t){if(!t)return!1;for(var e=o.a.getID3Data(t,0)||[],r=e.length,i=t.length;r<i;r++)if(a.e(t,r))return n.b.log("ADTS sync word found !"),!0;return!1},t.prototype.append=function(t,e,r,i){for(var s=this._audioTrack,l=o.a.getID3Data(t,0)||[],d=o.a.getTimeStamp(l),u=d?90*d:9e4*e,f=0,c=u,h=t.length,p=l.length,v=[{pts:c,dts:c,data:l}];p<h-1;)if(a.d(t,p)&&p+5<h){a.c(s,this.observer,t,p,s.manifestCodec);var g=a.a(s,t,p,u,f);if(!g){n.b.log("Unable to parse AAC frame");break}p+=g.length,c=g.sample.pts,f++}else o.a.isHeader(t,p)?(l=o.a.getID3Data(t,p),v.push({pts:c,dts:c,data:l}),p+=l.length):p++;this.remuxer.remux(s,{samples:[]},{samples:v,inputTimeScale:9e4},{samples:[]},e,r,i)},t.prototype.destroy=function(){},t}();e.a=s},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(20),n=r(21),o=r(1),s=r(36),l=r(37),d=r(0),u=r(2),f={video:1,audio:2,id3:3,text:4},c=function(){function t(e,r,a,n){i(this,t),this.observer=e,this.config=a,this.typeSupported=n,this.remuxer=r,this.sampleAes=null}return t.prototype.setDecryptData=function(t){null!=t&&null!=t.key&&"SAMPLE-AES"===t.method?this.sampleAes=new l.a(this.observer,this.config,t,this.discardEPB):this.sampleAes=null},t.probe=function(e){var r=t._syncOffset(e);return!(r<0)&&(r&&d.b.warn("MPEG2-TS detected but first sync word found @ offset "+r+", junk ahead ?"),!0)},t._syncOffset=function(t){for(var e=Math.min(1e3,t.length-564),r=0;r<e;){if(71===t[r]&&71===t[r+188]&&71===t[r+376])return r;r++}return-1},t.createTrack=function(t,e){return{container:"video"===t||"audio"===t?"video/mp2t":void 0,type:t,id:f[t],pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],len:0,dropped:"video"===t?0:void 0,isAAC:"audio"===t||void 0,duration:"audio"===t?e:void 0}},t.prototype.resetInitSegment=function(e,r,i,a){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack=t.createTrack("video",a),this._audioTrack=t.createTrack("audio",a),this._id3Track=t.createTrack("id3",a),this._txtTrack=t.createTrack("text",a),this.aacOverFlow=null,this.aacLastPTS=null,this.avcSample=null,this.audioCodec=r,this.videoCodec=i,this._duration=a},t.prototype.resetTimeStamp=function(){},t.prototype.append=function(e,r,i,a){var n=void 0,s=e.length,l=void 0,f=void 0,c=void 0,h=void 0,p=!1;this.contiguous=i;var v=this.pmtParsed,g=this._avcTrack,m=this._audioTrack,y=this._id3Track,b=g.pid,E=m.pid,T=y.pid,S=this._pmtId,A=g.pesData,_=m.pesData,R=y.pesData,L=this._parsePAT,w=this._parsePMT,D=this._parsePES,O=this._parseAVCPES.bind(this),I=this._parseAACPES.bind(this),x=this._parseMPEGPES.bind(this),k=this._parseID3PES.bind(this),P=t._syncOffset(e);for(s-=(s+P)%188,n=P;n<s;n+=188)if(71===e[n]){if(l=!!(64&e[n+1]),f=((31&e[n+1])<<8)+e[n+2],(48&e[n+3])>>4>1){if((c=n+5+e[n+4])===n+188)continue}else c=n+4;switch(f){case b:l&&(A&&(h=D(A))&&void 0!==h.pts&&O(h,!1),A={data:[],size:0}),A&&(A.data.push(e.subarray(c,n+188)),A.size+=n+188-c);break;case E:l&&(_&&(h=D(_))&&void 0!==h.pts&&(m.isAAC?I(h):x(h)),_={data:[],size:0}),_&&(_.data.push(e.subarray(c,n+188)),_.size+=n+188-c);break;case T:l&&(R&&(h=D(R))&&void 0!==h.pts&&k(h),R={data:[],size:0}),R&&(R.data.push(e.subarray(c,n+188)),R.size+=n+188-c);break;case 0:l&&(c+=e[c]+1),S=this._pmtId=L(e,c);break;case S:l&&(c+=e[c]+1);var C=w(e,c,!0===this.typeSupported.mpeg||!0===this.typeSupported.mp3,null!=this.sampleAes);b=C.avc,b>0&&(g.pid=b),E=C.audio,E>0&&(m.pid=E,m.isAAC=C.isAAC),T=C.id3,T>0&&(y.pid=T),p&&!v&&(d.b.log("reparse from beginning"),p=!1,n=P-188),v=this.pmtParsed=!0;break;case 17:case 8191:break;default:p=!0}}else this.observer.trigger(o.a.ERROR,{type:u.b.MEDIA_ERROR,details:u.a.FRAG_PARSING_ERROR,fatal:!1,reason:"TS packet did not start with 0x47"});A&&(h=D(A))&&void 0!==h.pts?(O(h,!0),g.pesData=null):g.pesData=A,_&&(h=D(_))&&void 0!==h.pts?(m.isAAC?I(h):x(h),m.pesData=null):(_&&_.size&&d.b.log("last AAC PES packet truncated,might overlap between fragments"),m.pesData=_),R&&(h=D(R))&&void 0!==h.pts?(k(h),y.pesData=null):y.pesData=R,null==this.sampleAes?this.remuxer.remux(m,g,y,this._txtTrack,r,i,a):this.decryptAndRemux(m,g,y,this._txtTrack,r,i,a)},t.prototype.decryptAndRemux=function(t,e,r,i,a,n,o){if(t.samples&&t.isAAC){var s=this;this.sampleAes.decryptAacSamples(t.samples,0,function(){s.decryptAndRemuxAvc(t,e,r,i,a,n,o)})}else this.decryptAndRemuxAvc(t,e,r,i,a,n,o)},t.prototype.decryptAndRemuxAvc=function(t,e,r,i,a,n,o){if(e.samples){var s=this;this.sampleAes.decryptAvcSamples(e.samples,0,0,function(){s.remuxer.remux(t,e,r,i,a,n,o)})}else this.remuxer.remux(t,e,r,i,a,n,o)},t.prototype.destroy=function(){this._initPTS=this._initDTS=void 0,this._duration=0},t.prototype._parsePAT=function(t,e){return(31&t[e+10])<<8|t[e+11]},t.prototype._parsePMT=function(t,e,r,i){var a=void 0,n=void 0,o=void 0,s=void 0,l={audio:-1,avc:-1,id3:-1,isAAC:!0};for(a=(15&t[e+1])<<8|t[e+2],n=e+3+a-4,o=(15&t[e+10])<<8|t[e+11],e+=12+o;e<n;){switch(s=(31&t[e+1])<<8|t[e+2],t[e]){case 207:if(!i){d.b.log("unkown stream type:"+t[e]);break}case 15:-1===l.audio&&(l.audio=s);break;case 21:-1===l.id3&&(l.id3=s);break;case 219:if(!i){d.b.log("unkown stream type:"+t[e]);break}case 27:-1===l.avc&&(l.avc=s);break;case 3:case 4:r?-1===l.audio&&(l.audio=s,l.isAAC=!1):d.b.log("MPEG audio found, not supported in this browser for now");break;case 36:d.b.warn("HEVC stream type found, not supported for now");break;default:d.b.log("unkown stream type:"+t[e])}e+=5+((15&t[e+3])<<8|t[e+4])}return l},t.prototype._parsePES=function(t){var e=0,r=void 0,i=void 0,a=void 0,n=void 0,o=void 0,s=void 0,l=void 0,u=void 0,f=t.data;if(!t||0===t.size)return null;for(;f[0].length<19&&f.length>1;){var c=new Uint8Array(f[0].length+f[1].length);c.set(f[0]),c.set(f[1],f[0].length),f[0]=c,f.splice(1,1)}if(r=f[0],1===(r[0]<<16)+(r[1]<<8)+r[2]){if((a=(r[4]<<8)+r[5])&&a>t.size-6)return null;i=r[7],192&i&&(s=536870912*(14&r[9])+4194304*(255&r[10])+16384*(254&r[11])+128*(255&r[12])+(254&r[13])/2,s>4294967295&&(s-=8589934592),64&i?(l=536870912*(14&r[14])+4194304*(255&r[15])+16384*(254&r[16])+128*(255&r[17])+(254&r[18])/2,l>4294967295&&(l-=8589934592),s-l>54e5&&(d.b.warn(Math.round((s-l)/9e4)+"s delta between PTS and DTS, align them"),s=l)):l=s),n=r[8],u=n+9,t.size-=u,o=new Uint8Array(t.size);for(var h=0,p=f.length;h<p;h++){r=f[h];var v=r.byteLength;if(u){if(u>v){u-=v;continue}r=r.subarray(u),v-=u,u=0}o.set(r,e),e+=v}return a&&(a-=n+3),{data:o,pts:s,dts:l,len:a}}return null},t.prototype.pushAccesUnit=function(t,e){if(t.units.length&&t.frame){var r=e.samples,i=r.length;!this.config.forceKeyFrameOnDiscontinuity||!0===t.key||e.sps&&(i||this.contiguous)?(t.id=i,r.push(t)):e.dropped++}t.debug.length&&d.b.log(t.pts+"/"+t.dts+":"+t.debug)},t.prototype._parseAVCPES=function(t,e){var r=this,i=this._avcTrack,a=this._parseAVCNALu(t.data),n=void 0,o=this.avcSample,l=void 0,d=!1,u=void 0,f=this.pushAccesUnit.bind(this),c=function(t,e,r,i){return{key:t,pts:e,dts:r,units:[],debug:i}};t.data=null,o&&a.length&&!i.audFound&&(f(o,i),o=this.avcSample=c(!1,t.pts,t.dts,"")),a.forEach(function(e){switch(e.type){case 1:l=!0,o||(o=r.avcSample=c(!0,t.pts,t.dts,"")),o.frame=!0;var a=e.data;if(d&&a.length>4){var h=new s.a(a).readSliceType();2!==h&&4!==h&&7!==h&&9!==h||(o.key=!0)}break;case 5:l=!0,o||(o=r.avcSample=c(!0,t.pts,t.dts,"")),o.key=!0,o.frame=!0;break;case 6:l=!0,n=new s.a(r.discardEPB(e.data)),n.readUByte();for(var p=0,v=0,g=!1,m=0;!g&&n.bytesAvailable>1;){p=0;do{m=n.readUByte(),p+=m}while(255===m);v=0;do{m=n.readUByte(),v+=m}while(255===m);if(4===p&&0!==n.bytesAvailable){g=!0;if(181===n.readUByte()){if(49===n.readUShort()){if(1195456820===n.readUInt()){if(3===n.readUByte()){var y=n.readUByte(),b=n.readUByte(),E=31&y,T=[y,b];for(u=0;u<E;u++)T.push(n.readUByte()),T.push(n.readUByte()),T.push(n.readUByte());r._insertSampleInOrder(r._txtTrack.samples,{type:3,pts:t.pts,bytes:T})}}}}}else if(v<n.bytesAvailable)for(u=0;u<v;u++)n.readUByte()}break;case 7:if(l=!0,d=!0,!i.sps){n=new s.a(e.data);var S=n.readSPS();i.width=S.width,i.height=S.height,i.pixelRatio=S.pixelRatio,i.sps=[e.data],i.duration=r._duration;var A=e.data.subarray(1,4),_="avc1.";for(u=0;u<3;u++){var R=A[u].toString(16);R.length<2&&(R="0"+R),_+=R}i.codec=_}break;case 8:l=!0,i.pps||(i.pps=[e.data]);break;case 9:l=!1,i.audFound=!0,o&&f(o,i),o=r.avcSample=c(!1,t.pts,t.dts,"");break;case 12:l=!1;break;default:l=!1,o&&(o.debug+="unknown NAL "+e.type+" ")}if(o&&l){o.units.push(e)}}),e&&o&&(f(o,i),this.avcSample=null)},t.prototype._insertSampleInOrder=function(t,e){var r=t.length;if(r>0){if(e.pts>=t[r-1].pts)t.push(e);else for(var i=r-1;i>=0;i--)if(e.pts<t[i].pts){t.splice(i,0,e);break}}else t.push(e)},t.prototype._getLastNalUnit=function(){var t=this.avcSample,e=void 0;if(!t||0===t.units.length){var r=this._avcTrack,i=r.samples;t=i[i.length-1]}if(t){var a=t.units;e=a[a.length-1]}return e},t.prototype._parseAVCNALu=function(t){var e=0,r=t.byteLength,i=void 0,a=void 0,n=this._avcTrack,o=n.naluState||0,s=o,l=[],d=void 0,u=void 0,f=-1,c=void 0;for(-1===o&&(f=0,c=31&t[0],o=0,e=1);e<r;)if(i=t[e++],o)if(1!==o)if(i)if(1===i){if(f>=0)d={data:t.subarray(f,e-o-1),type:c},l.push(d);else{var h=this._getLastNalUnit();if(h&&(s&&e<=4-s&&h.state&&(h.data=h.data.subarray(0,h.data.byteLength-s)),(a=e-o-1)>0)){var p=new Uint8Array(h.data.byteLength+a);p.set(h.data,0),p.set(t.subarray(0,a),h.data.byteLength),h.data=p}}e<r?(u=31&t[e],f=e,c=u,o=0):o=-1}else o=0;else o=3;else o=i?0:2;else o=i?0:1;if(f>=0&&o>=0&&(d={data:t.subarray(f,r),type:c,state:o},l.push(d)),0===l.length){var v=this._getLastNalUnit();if(v){var g=new Uint8Array(v.data.byteLength+t.byteLength);g.set(v.data,0),g.set(t,v.data.byteLength),v.data=g}}return n.naluState=o,l},t.prototype.discardEPB=function(t){for(var e=t.byteLength,r=[],i=1,a=void 0,n=void 0;i<e-2;)0===t[i]&&0===t[i+1]&&3===t[i+2]?(r.push(i+2),i+=2):i++;if(0===r.length)return t;a=e-r.length,n=new Uint8Array(a);var o=0;for(i=0;i<a;o++,i++)o===r[0]&&(o++,r.shift()),n[i]=t[o];return n},t.prototype._parseAACPES=function(t){var e=this._audioTrack,r=t.data,i=t.pts,n=this.aacOverFlow,s=this.aacLastPTS,l=void 0,f=void 0,c=void 0,h=void 0,p=void 0;if(n){var v=new Uint8Array(n.byteLength+r.byteLength);v.set(n,0),v.set(r,n.byteLength),r=v}for(c=0,p=r.length;c<p-1&&!a.d(r,c);c++);if(c){var g=void 0,m=void 0;if(c<p-1?(g="AAC PES did not start with ADTS header,offset:"+c,m=!1):(g="no ADTS header found in AAC PES",m=!0),d.b.warn("parsing error:"+g),this.observer.trigger(o.a.ERROR,{type:u.b.MEDIA_ERROR,details:u.a.FRAG_PARSING_ERROR,fatal:m,reason:g}),m)return}if(a.c(e,this.observer,r,c,this.audioCodec),f=0,l=a.b(e.samplerate),n&&s){var y=s+l;Math.abs(y-i)>1&&(d.b.log("AAC: align PTS for overlapping frames by "+Math.round((y-i)/90)),i=y)}for(;c<p;)if(a.d(r,c)&&c+5<p){var b=a.a(e,r,c,i,f);if(!b)break;c+=b.length,h=b.sample.pts,f++}else c++;n=c<p?r.subarray(c,p):null,this.aacOverFlow=n,this.aacLastPTS=h},t.prototype._parseMPEGPES=function(t){for(var e=t.data,r=e.length,i=0,a=0,o=t.pts;a<r;)if(n.a.isHeader(e,a)){var s=n.a.appendFrame(this._audioTrack,e,a,o,i);if(!s)break;a+=s.length,i++}else a++},t.prototype._parseID3PES=function(t){this._id3Track.samples.push(t)},t}();e.a=c},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(0),n=function(){function t(e){i(this,t),this.data=e,this.bytesAvailable=e.byteLength,this.word=0,this.bitsAvailable=0}return t.prototype.loadWord=function(){var t=this.data,e=this.bytesAvailable,r=t.byteLength-e,i=new Uint8Array(4),a=Math.min(4,e);if(0===a)throw new Error("no bytes available");i.set(t.subarray(r,r+a)),this.word=new DataView(i.buffer).getUint32(0),this.bitsAvailable=8*a,this.bytesAvailable-=a},t.prototype.skipBits=function(t){var e=void 0;this.bitsAvailable>t?(this.word<<=t,this.bitsAvailable-=t):(t-=this.bitsAvailable,e=t>>3,t-=e>>3,this.bytesAvailable-=e,this.loadWord(),this.word<<=t,this.bitsAvailable-=t)},t.prototype.readBits=function(t){var e=Math.min(this.bitsAvailable,t),r=this.word>>>32-e;return t>32&&a.b.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=e,this.bitsAvailable>0?this.word<<=e:this.bytesAvailable>0&&this.loadWord(),e=t-e,e>0&&this.bitsAvailable?r<<e|this.readBits(e):r},t.prototype.skipLZ=function(){var t=void 0;for(t=0;t<this.bitsAvailable;++t)if(0!=(this.word&2147483648>>>t))return this.word<<=t,this.bitsAvailable-=t,t;return this.loadWord(),t+this.skipLZ()},t.prototype.skipUEG=function(){this.skipBits(1+this.skipLZ())},t.prototype.skipEG=function(){this.skipBits(1+this.skipLZ())},t.prototype.readUEG=function(){var t=this.skipLZ();return this.readBits(t+1)-1},t.prototype.readEG=function(){var t=this.readUEG();return 1&t?1+t>>>1:-1*(t>>>1)},t.prototype.readBoolean=function(){return 1===this.readBits(1)},t.prototype.readUByte=function(){return this.readBits(8)},t.prototype.readUShort=function(){return this.readBits(16)},t.prototype.readUInt=function(){return this.readBits(32)},t.prototype.skipScalingList=function(t){var e=8,r=8,i=void 0,a=void 0;for(i=0;i<t;i++)0!==r&&(a=this.readEG(),r=(e+a+256)%256),e=0===r?e:r},t.prototype.readSPS=function(){var t=0,e=0,r=0,i=0,a=void 0,n=void 0,o=void 0,s=void 0,l=void 0,d=void 0,u=void 0,f=this.readUByte.bind(this),c=this.readBits.bind(this),h=this.readUEG.bind(this),p=this.readBoolean.bind(this),v=this.skipBits.bind(this),g=this.skipEG.bind(this),m=this.skipUEG.bind(this),y=this.skipScalingList.bind(this);if(f(),a=f(),c(5),v(3),f(),m(),100===a||110===a||122===a||244===a||44===a||83===a||86===a||118===a||128===a){var b=h();if(3===b&&v(1),m(),m(),v(1),p())for(d=3!==b?8:12,u=0;u<d;u++)p()&&y(u<6?16:64)}m();var E=h();if(0===E)h();else if(1===E)for(v(1),g(),g(),n=h(),u=0;u<n;u++)g();m(),v(1),o=h(),s=h(),l=c(1),0===l&&v(1),v(1),p()&&(t=h(),e=h(),r=h(),i=h());var T=[1,1];if(p()&&p()){switch(f()){case 1:T=[1,1];break;case 2:T=[12,11];break;case 3:T=[10,11];break;case 4:T=[16,11];break;case 5:T=[40,33];break;case 6:T=[24,11];break;case 7:T=[20,11];break;case 8:T=[32,11];break;case 9:T=[80,33];break;case 10:T=[18,11];break;case 11:T=[15,11];break;case 12:T=[64,33];break;case 13:T=[160,99];break;case 14:T=[4,3];break;case 15:T=[3,2];break;case 16:T=[2,1];break;case 255:T=[f()<<8|f(),f()<<8|f()]}}return{width:Math.ceil(16*(o+1)-2*t-2*e),height:(2-l)*(s+1)*16-(l?2:4)*(r+i),pixelRatio:T}},t.prototype.readSliceType=function(){return this.readUByte(),this.readUEG(),this.readUEG()},t}();e.a=n},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(19),n=function(){function t(e,r,n,o){i(this,t),this.decryptdata=n,this.discardEPB=o,this.decrypter=new a.a(e,r,{removePKCS7Padding:!1})}return t.prototype.decryptBuffer=function(t,e){this.decrypter.decrypt(t,this.decryptdata.key.buffer,this.decryptdata.iv.buffer,e)},t.prototype.decryptAacSample=function(t,e,r,i){var a=t[e].unit,n=a.subarray(16,a.length-a.length%16),o=n.buffer.slice(n.byteOffset,n.byteOffset+n.length),s=this;this.decryptBuffer(o,function(n){n=new Uint8Array(n),a.set(n,16),i||s.decryptAacSamples(t,e+1,r)})},t.prototype.decryptAacSamples=function(t,e,r){for(;;e++){if(e>=t.length)return void r();if(!(t[e].unit.length<32)){var i=this.decrypter.isSync();if(this.decryptAacSample(t,e,r,i),!i)return}}},t.prototype.getAvcEncryptedData=function(t){for(var e=16*Math.floor((t.length-48)/160)+16,r=new Int8Array(e),i=0,a=32;a<=t.length-16;a+=160,i+=16)r.set(t.subarray(a,a+16),i);return r},t.prototype.getAvcDecryptedUnit=function(t,e){e=new Uint8Array(e);for(var r=0,i=32;i<=t.length-16;i+=160,r+=16)t.set(e.subarray(r,r+16),i);return t},t.prototype.decryptAvcSample=function(t,e,r,i,a,n){var o=this.discardEPB(a.data),s=this.getAvcEncryptedData(o),l=this;this.decryptBuffer(s.buffer,function(s){a.data=l.getAvcDecryptedUnit(o,s),n||l.decryptAvcSamples(t,e,r+1,i)})},t.prototype.decryptAvcSamples=function(t,e,r,i){for(;;e++,r=0){if(e>=t.length)return void i();for(var a=t[e].units;!(r>=a.length);r++){var n=a[r];if(!(n.length<=48||1!==n.type&&5!==n.type)){var o=this.decrypter.isSync();if(this.decryptAvcSample(t,e,r,i,n,o),!o)return}}}},t}();e.a=n},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(9),n=r(0),o=r(21),s=function(){function t(e,r,a){i(this,t),this.observer=e,this.config=a,this.remuxer=r}return t.prototype.resetInitSegment=function(t,e,r,i){this._audioTrack={container:"audio/mpeg",type:"audio",id:-1,sequenceNumber:0,isAAC:!1,samples:[],len:0,manifestCodec:e,duration:i,inputTimeScale:9e4}},t.prototype.resetTimeStamp=function(){},t.probe=function(t){var e=void 0,r=void 0,i=a.a.getID3Data(t,0);if(i&&void 0!==a.a.getTimeStamp(i))for(e=i.length,r=Math.min(t.length-1,e+100);e<r;e++)if(o.a.probe(t,e))return n.b.log("MPEG Audio sync word found !"),!0;return!1},t.prototype.append=function(t,e,r,i){for(var n=a.a.getID3Data(t,0),s=a.a.getTimeStamp(n),l=s?90*s:9e4*e,d=n.length,u=t.length,f=0,c=0,h=this._audioTrack,p=[{pts:l,dts:l,data:n}];d<u;)if(o.a.isHeader(t,d)){var v=o.a.appendFrame(h,t,d,l,f);if(!v)break;d+=v.length,c=v.sample.pts,f++}else a.a.isHeader(t,d)?(n=a.a.getID3Data(t,d),p.push({pts:c,dts:c,data:n}),d+=n.length):d++;this.remuxer.remux(h,{samples:[]},{samples:p,inputTimeScale:9e4},{samples:[]},e,r,i)},t.prototype.destroy=function(){},t}();e.a=s},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(40),n=r(41),o=r(1),s=r(2),l=r(0),d=function(){function t(e,r,a,n){i(this,t),this.observer=e,this.config=r,this.typeSupported=a;var o=navigator.userAgent;this.isSafari=n&&n.indexOf("Apple")>-1&&o&&!o.match("CriOS"),this.ISGenerated=!1}return t.prototype.destroy=function(){},t.prototype.resetTimeStamp=function(t){this._initPTS=this._initDTS=t},t.prototype.resetInitSegment=function(){this.ISGenerated=!1},t.prototype.remux=function(t,e,r,i,a,n,s){if(this.ISGenerated||this.generateIS(t,e,a),this.ISGenerated){var d=t.samples.length,u=e.samples.length,f=a,c=a;if(d&&u){var h=(t.samples[0].dts-e.samples[0].dts)/e.inputTimeScale;f+=Math.max(0,h),c+=Math.max(0,-h)}if(d){t.timescale||(l.b.warn("regenerate InitSegment as audio detected"),this.generateIS(t,e,a));var p=this.remuxAudio(t,f,n,s);if(u){var v=void 0;p&&(v=p.endPTS-p.startPTS),e.timescale||(l.b.warn("regenerate InitSegment as video detected"),this.generateIS(t,e,a)),this.remuxVideo(e,c,n,v,s)}}else if(u){var g=this.remuxVideo(e,c,n,0,s);g&&t.codec&&this.remuxEmptyAudio(t,f,n,g)}}r.samples.length&&this.remuxID3(r,a),i.samples.length&&this.remuxText(i,a),this.observer.trigger(o.a.FRAG_PARSED)},t.prototype.generateIS=function(t,e,r){var i=this.observer,a=t.samples,d=e.samples,u=this.typeSupported,f="audio/mp4",c={},h={tracks:c},p=void 0===this._initPTS,v=void 0,g=void 0;if(p&&(v=g=1/0),t.config&&a.length&&(t.timescale=t.samplerate,l.b.log("audio sampling rate : "+t.samplerate),t.isAAC||(u.mpeg?(f="audio/mpeg",t.codec=""):u.mp3&&(t.codec="mp3")),c.audio={container:f,codec:t.codec,initSegment:!t.isAAC&&u.mpeg?new Uint8Array:n.a.initSegment([t]),metadata:{channelCount:t.channelCount}},p&&(v=g=a[0].pts-t.inputTimeScale*r)),e.sps&&e.pps&&d.length){var m=e.inputTimeScale;e.timescale=m,c.video={container:"video/mp4",codec:e.codec,initSegment:n.a.initSegment([e]),metadata:{width:e.width,height:e.height}},p&&(v=Math.min(v,d[0].pts-m*r),g=Math.min(g,d[0].dts-m*r),this.observer.trigger(o.a.INIT_PTS_FOUND,{initPTS:v}))}Object.keys(c).length?(i.trigger(o.a.FRAG_PARSING_INIT_SEGMENT,h),this.ISGenerated=!0,p&&(this._initPTS=v,this._initDTS=g)):i.trigger(o.a.ERROR,{type:s.b.MEDIA_ERROR,details:s.a.FRAG_PARSING_ERROR,fatal:!1,reason:"no audio/video samples found"})},t.prototype.remuxVideo=function(t,e,r,i,a){var d=8,u=t.timescale,f=void 0,c=void 0,h=void 0,p=void 0,v=void 0,g=void 0,m=void 0,y=t.samples,b=[],E=y.length,T=this._PTSNormalize,S=this._initDTS,A=this.nextAvcDts,_=this.isSafari;if(0!==E){_&&(r|=y.length&&A&&(a&&Math.abs(e-A/u)<.1||Math.abs(y[0].pts-A-S)<u/5)),r||(A=e*u),y.forEach(function(t){t.pts=T(t.pts-S,A),t.dts=T(t.dts-S,A)}),y.sort(function(t,e){var r=t.dts-e.dts,i=t.pts-e.pts;return r||i||t.id-e.id});var R=y.reduce(function(t,e){return Math.max(Math.min(t,e.pts-e.dts),-18e3)},0);if(R<0){l.b.warn("PTS < DTS detected in video samples, shifting DTS by "+Math.round(R/90)+" ms to overcome this issue");for(var L=0;L<y.length;L++)y[L].dts+=R}var w=y[0];v=Math.max(w.dts,0),p=Math.max(w.pts,0);var D=Math.round((v-A)/90);r&&D&&(D>1?l.b.log("AVC:"+D+" ms hole between fragments detected,filling it"):D<-1&&l.b.log("AVC:"+-D+" ms overlapping between fragments detected"),v=A,y[0].dts=v,p=Math.max(p-D,A),y[0].pts=p,l.b.log("Video/PTS/DTS adjusted: "+Math.round(p/90)+"/"+Math.round(v/90)+",delta:"+D+" ms")),v,w=y[y.length-1],m=Math.max(w.dts,0),g=Math.max(w.pts,0,m),_&&(f=Math.round((m-v)/(y.length-1)));for(var O=0,I=0,x=0;x<E;x++){for(var k=y[x],P=k.units,C=P.length,F=0,M=0;M<C;M++)F+=P[M].data.length;I+=F,O+=C,k.length=F,k.dts=_?v+x*f:Math.max(k.dts,v),k.pts=Math.max(k.pts,k.dts)}var N=I+4*O+8;try{c=new Uint8Array(N)}catch(t){return void this.observer.trigger(o.a.ERROR,{type:s.b.MUX_ERROR,details:s.a.REMUX_ALLOC_ERROR,fatal:!1,bytes:N,reason:"fail allocating video mdat "+N})}var U=new DataView(c.buffer);U.setUint32(0,N),c.set(n.a.types.mdat,4);for(var B=0;B<E;B++){for(var G=y[B],j=G.units,K=0,H=void 0,V=0,W=j.length;V<W;V++){var Y=j[V],z=Y.data,X=Y.data.byteLength;U.setUint32(d,X),d+=4,c.set(z,d),d+=X,K+=4+X}if(_)H=Math.max(0,f*Math.round((G.pts-G.dts)/f));else{if(B<E-1)f=y[B+1].dts-G.dts;else{var q=this.config,Q=G.dts-y[B>0?B-1:B].dts;if(q.stretchShortVideoTrack){var Z=q.maxBufferHole,J=Math.floor(Z*u),$=(i?p+i*u:this.nextAudioPts)-G.pts;$>J?(f=$-Q,f<0&&(f=Q),l.b.log("It is approximately "+$/90+" ms to the next segment; using duration "+f/90+" ms for the last video frame.")):f=Q}else f=Q}H=Math.round(G.pts-G.dts)}b.push({size:K,duration:f,cts:H,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:G.key?2:1,isNonSync:G.key?0:1}})}this.nextAvcDts=m+f;var tt=t.dropped;if(t.len=0,t.nbNalu=0,t.dropped=0,b.length&&navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var et=b[0].flags;et.dependsOn=2,et.isNonSync=0}t.samples=b,h=n.a.moof(t.sequenceNumber++,v,t),t.samples=[];var rt={data1:h,data2:c,startPTS:p/u,endPTS:(g+f)/u,startDTS:v/u,endDTS:this.nextAvcDts/u,type:"video",hasAudio:!1,hasVideo:!0,nb:b.length,dropped:tt};return this.observer.trigger(o.a.FRAG_PARSING_DATA,rt),rt}},t.prototype.remuxAudio=function(t,e,r,i){var d=t.inputTimeScale,u=t.timescale,f=d/u,c=t.isAAC?1024:1152,h=c*f,p=this._PTSNormalize,v=this._initDTS,g=!t.isAAC&&this.typeSupported.mpeg,m=void 0,y=void 0,b=void 0,E=void 0,T=void 0,S=void 0,A=void 0,_=t.samples,R=[],L=this.nextAudioPts;if(r|=_.length&&L&&(i&&Math.abs(e-L/d)<.1||Math.abs(_[0].pts-L-v)<20*h),_.forEach(function(t){t.pts=t.dts=p(t.pts-v,e*d)}),_=_.filter(function(t){return t.pts>=0}),0!==_.length){if(r||(L=i?e*d:_[0].pts),t.isAAC)for(var w=this.config.maxAudioFramesDrift,D=0,O=L;D<_.length;){var I,x=_[D],k=x.pts;I=k-O;var P=Math.abs(1e3*I/d);if(I<=-w*h)l.b.warn("Dropping 1 audio frame @ "+(O/d).toFixed(3)+"s due to "+Math.round(P)+" ms overlap."),_.splice(D,1),t.len-=x.unit.length;else if(I>=w*h&&P<1e4&&O){var C=Math.round(I/h);l.b.warn("Injecting "+C+" audio frame @ "+(O/d).toFixed(3)+"s due to "+Math.round(1e3*I/d)+" ms gap.");for(var F=0;F<C;F++){var M=Math.max(O,0);b=a.a.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),b||(l.b.log("Unable to get silent frame for given audio codec; duplicating last frame instead."),b=x.unit.subarray()),_.splice(D,0,{unit:b,pts:M,dts:M}),t.len+=b.length,O+=h,D++}x.pts=x.dts=O,O+=h,D++}else Math.abs(I),x.pts=x.dts=O,O+=h,D++}for(var N=0,U=_.length;N<U;N++){var B=_[N],G=B.unit,j=B.pts;if(void 0!==A)y.duration=Math.round((j-A)/f);else{var K=Math.round(1e3*(j-L)/d),H=0;if(r&&t.isAAC&&K){if(K>0&&K<1e4)H=Math.round((j-L)/h),l.b.log(K+" ms hole between AAC samples detected,filling it"),H>0&&(b=a.a.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),b||(b=G.subarray()),t.len+=H*b.length);else if(K<-12){l.b.log("drop overlapping AAC sample, expected/parsed/delta:"+(L/d).toFixed(3)+"s/"+(j/d).toFixed(3)+"s/"+-K+"ms"),t.len-=G.byteLength;continue}j=L}if(S=j,!(t.len>0))return;var V=g?t.len:t.len+8;m=g?0:8;try{E=new Uint8Array(V)}catch(t){return void this.observer.trigger(o.a.ERROR,{type:s.b.MUX_ERROR,details:s.a.REMUX_ALLOC_ERROR,fatal:!1,bytes:V,reason:"fail allocating audio mdat "+V})}if(!g){new DataView(E.buffer).setUint32(0,V),E.set(n.a.types.mdat,4)}for(var W=0;W<H;W++)b=a.a.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),b||(l.b.log("Unable to get silent frame for given audio codec; duplicating this frame instead."),b=G.subarray()),E.set(b,m),m+=b.byteLength,y={size:b.byteLength,cts:0,duration:1024,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},R.push(y)}E.set(G,m);var Y=G.byteLength;m+=Y,y={size:Y,cts:0,duration:0,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},R.push(y),A=j}var z=0,X=R.length;if(X>=2&&(z=R[X-2].duration,y.duration=z),X){this.nextAudioPts=L=A+f*z,t.len=0,t.samples=R,T=g?new Uint8Array:n.a.moof(t.sequenceNumber++,S/f,t),t.samples=[];var q=S/d,Q=L/d,Z={data1:T,data2:E,startPTS:q,endPTS:Q,startDTS:q,endDTS:Q,type:"audio",hasAudio:!0,hasVideo:!1,nb:X};return this.observer.trigger(o.a.FRAG_PARSING_DATA,Z),Z}return null}},t.prototype.remuxEmptyAudio=function(t,e,r,i){var n=t.inputTimeScale,o=t.samplerate?t.samplerate:n,s=n/o,d=this.nextAudioPts,u=(void 0!==d?d:i.startDTS*n)+this._initDTS,f=i.endDTS*n+this._initDTS,c=1024*s,h=Math.ceil((f-u)/c),p=a.a.getSilentFrame(t.manifestCodec||t.codec,t.channelCount);if(l.b.warn("remux empty Audio"),!p)return void l.b.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");for(var v=[],g=0;g<h;g++){var m=u+g*c;v.push({unit:p,pts:m,dts:m}),t.len+=p.length}t.samples=v,this.remuxAudio(t,e,r)},t.prototype.remuxID3=function(t,e){var r=t.samples.length,i=void 0,a=t.inputTimeScale,n=this._initPTS,s=this._initDTS;if(r){for(var l=0;l<r;l++)i=t.samples[l],i.pts=(i.pts-n)/a,i.dts=(i.dts-s)/a;this.observer.trigger(o.a.FRAG_PARSING_METADATA,{samples:t.samples})}t.samples=[],e=e},t.prototype.remuxText=function(t,e){t.samples.sort(function(t,e){return t.pts-e.pts});var r=t.samples.length,i=void 0,a=t.inputTimeScale,n=this._initPTS;if(r){for(var s=0;s<r;s++)i=t.samples[s],i.pts=(i.pts-n)/a;this.observer.trigger(o.a.FRAG_PARSING_USERDATA,{samples:t.samples})}t.samples=[],e=e},t.prototype._PTSNormalize=function(t,e){var r=void 0;if(void 0===e)return t;for(r=e<t?-8589934592:8589934592;Math.abs(t-e)>4294967296;)t+=r;return t},t}();e.a=d},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(){i(this,t)}return t.getSilentFrame=function(t,e){switch(t){case"mp4a.40.2":if(1===e)return new Uint8Array([0,200,0,128,35,128]);if(2===e)return new Uint8Array([33,0,73,144,2,25,0,35,128]);if(3===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142]);if(4===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56]);if(5===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56]);if(6===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224]);break;default:if(1===e)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(2===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(3===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}return null},t}();e.a=a},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=Math.pow(2,32)-1,n=function(){function t(){i(this,t)}return t.init=function(){t.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]};var e=void 0;for(e in t.types)t.types.hasOwnProperty(e)&&(t.types[e]=[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]);var r=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),i=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]);t.HDLR_TYPES={video:r,audio:i};var a=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),n=new Uint8Array([0,0,0,0,0,0,0,0]);t.STTS=t.STSC=t.STCO=n,t.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),t.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),t.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),t.STSD=new Uint8Array([0,0,0,0,0,0,0,1]);var o=new Uint8Array([105,115,111,109]),s=new Uint8Array([97,118,99,49]),l=new Uint8Array([0,0,0,1]);t.FTYP=t.box(t.types.ftyp,o,l,o,s),t.DINF=t.box(t.types.dinf,t.box(t.types.dref,a))},t.box=function(t){for(var e=Array.prototype.slice.call(arguments,1),r=8,i=e.length,a=i,n=void 0;i--;)r+=e[i].byteLength;for(n=new Uint8Array(r),n[0]=r>>24&255,n[1]=r>>16&255,n[2]=r>>8&255,n[3]=255&r,n.set(t,4),i=0,r=8;i<a;i++)n.set(e[i],r),r+=e[i].byteLength;return n},t.hdlr=function(e){return t.box(t.types.hdlr,t.HDLR_TYPES[e])},t.mdat=function(e){return t.box(t.types.mdat,e)},t.mdhd=function(e,r){r*=e;var i=Math.floor(r/(a+1)),n=Math.floor(r%(a+1));return t.box(t.types.mdhd,new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24,i>>16&255,i>>8&255,255&i,n>>24,n>>16&255,n>>8&255,255&n,85,196,0,0]))},t.mdia=function(e){return t.box(t.types.mdia,t.mdhd(e.timescale,e.duration),t.hdlr(e.type),t.minf(e))},t.mfhd=function(e){return t.box(t.types.mfhd,new Uint8Array([0,0,0,0,e>>24,e>>16&255,e>>8&255,255&e]))},t.minf=function(e){return"audio"===e.type?t.box(t.types.minf,t.box(t.types.smhd,t.SMHD),t.DINF,t.stbl(e)):t.box(t.types.minf,t.box(t.types.vmhd,t.VMHD),t.DINF,t.stbl(e))},t.moof=function(e,r,i){return t.box(t.types.moof,t.mfhd(e),t.traf(i,r))},t.moov=function(e){for(var r=e.length,i=[];r--;)i[r]=t.trak(e[r]);return t.box.apply(null,[t.types.moov,t.mvhd(e[0].timescale,e[0].duration)].concat(i).concat(t.mvex(e)))},t.mvex=function(e){for(var r=e.length,i=[];r--;)i[r]=t.trex(e[r]);return t.box.apply(null,[t.types.mvex].concat(i))},t.mvhd=function(e,r){r*=e;var i=Math.floor(r/(a+1)),n=Math.floor(r%(a+1)),o=new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24,i>>16&255,i>>8&255,255&i,n>>24,n>>16&255,n>>8&255,255&n,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return t.box(t.types.mvhd,o)},t.sdtp=function(e){var r=e.samples||[],i=new Uint8Array(4+r.length),a=void 0,n=void 0;for(n=0;n<r.length;n++)a=r[n].flags,i[n+4]=a.dependsOn<<4|a.isDependedOn<<2|a.hasRedundancy;return t.box(t.types.sdtp,i)},t.stbl=function(e){return t.box(t.types.stbl,t.stsd(e),t.box(t.types.stts,t.STTS),t.box(t.types.stsc,t.STSC),t.box(t.types.stsz,t.STSZ),t.box(t.types.stco,t.STCO))},t.avc1=function(e){var r=[],i=[],a=void 0,n=void 0,o=void 0;for(a=0;a<e.sps.length;a++)n=e.sps[a],o=n.byteLength,r.push(o>>>8&255),r.push(255&o),r=r.concat(Array.prototype.slice.call(n));for(a=0;a<e.pps.length;a++)n=e.pps[a],o=n.byteLength,i.push(o>>>8&255),i.push(255&o),i=i.concat(Array.prototype.slice.call(n));var s=t.box(t.types.avcC,new Uint8Array([1,r[3],r[4],r[5],255,224|e.sps.length].concat(r).concat([e.pps.length]).concat(i))),l=e.width,d=e.height,u=e.pixelRatio[0],f=e.pixelRatio[1];return t.box(t.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,l>>8&255,255&l,d>>8&255,255&d,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),s,t.box(t.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),t.box(t.types.pasp,new Uint8Array([u>>24,u>>16&255,u>>8&255,255&u,f>>24,f>>16&255,f>>8&255,255&f])))},t.esds=function(t){var e=t.config.length;return new Uint8Array([0,0,0,0,3,23+e,0,1,0,4,15+e,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([e]).concat(t.config).concat([6,1,2]))},t.mp4a=function(e){var r=e.samplerate;return t.box(t.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,e.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]),t.box(t.types.esds,t.esds(e)))},t.mp3=function(e){var r=e.samplerate;return t.box(t.types[".mp3"],new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,e.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]))},t.stsd=function(e){return"audio"===e.type?e.isAAC||"mp3"!==e.codec?t.box(t.types.stsd,t.STSD,t.mp4a(e)):t.box(t.types.stsd,t.STSD,t.mp3(e)):t.box(t.types.stsd,t.STSD,t.avc1(e))},t.tkhd=function(e){var r=e.id,i=e.duration*e.timescale,n=e.width,o=e.height,s=Math.floor(i/(a+1)),l=Math.floor(i%(a+1));return t.box(t.types.tkhd,new Uint8Array([1,0,0,7,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,r>>24&255,r>>16&255,r>>8&255,255&r,0,0,0,0,s>>24,s>>16&255,s>>8&255,255&s,l>>24,l>>16&255,l>>8&255,255&l,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,n>>8&255,255&n,0,0,o>>8&255,255&o,0,0]))},t.traf=function(e,r){var i=t.sdtp(e),n=e.id,o=Math.floor(r/(a+1)),s=Math.floor(r%(a+1));return t.box(t.types.traf,t.box(t.types.tfhd,new Uint8Array([0,0,0,0,n>>24,n>>16&255,n>>8&255,255&n])),t.box(t.types.tfdt,new Uint8Array([1,0,0,0,o>>24,o>>16&255,o>>8&255,255&o,s>>24,s>>16&255,s>>8&255,255&s])),t.trun(e,i.length+16+20+8+16+8+8),i)},t.trak=function(e){return e.duration=e.duration||4294967295,t.box(t.types.trak,t.tkhd(e),t.mdia(e))},t.trex=function(e){var r=e.id;return t.box(t.types.trex,new Uint8Array([0,0,0,0,r>>24,r>>16&255,r>>8&255,255&r,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))},t.trun=function(e,r){var i=e.samples||[],a=i.length,n=12+16*a,o=new Uint8Array(n),s=void 0,l=void 0,d=void 0,u=void 0,f=void 0,c=void 0;for(r+=8+n,o.set([0,0,15,1,a>>>24&255,a>>>16&255,a>>>8&255,255&a,r>>>24&255,r>>>16&255,r>>>8&255,255&r],0),s=0;s<a;s++)l=i[s],d=l.duration,u=l.size,f=l.flags,c=l.cts,o.set([d>>>24&255,d>>>16&255,d>>>8&255,255&d,u>>>24&255,u>>>16&255,u>>>8&255,255&u,f.isLeading<<2|f.dependsOn,f.isDependedOn<<6|f.hasRedundancy<<4|f.paddingValue<<1|f.isNonSync,61440&f.degradPrio,15&f.degradPrio,c>>>24&255,c>>>16&255,c>>>8&255,255&c],12+16*s);return t.box(t.types.trun,o)},t.initSegment=function(e){t.types||t.init();var r=t.moov(e),i=void 0;return i=new Uint8Array(t.FTYP.byteLength+r.byteLength),i.set(t.FTYP),i.set(r,t.FTYP.byteLength),i},t}();e.a=n},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(1),n=function(){function t(e){i(this,t),this.observer=e}return t.prototype.destroy=function(){},t.prototype.resetTimeStamp=function(){},t.prototype.resetInitSegment=function(){},t.prototype.remux=function(t,e,r,i,n,o,s,l){var d=this.observer,u="";t&&(u+="audio"),e&&(u+="video"),d.trigger(a.a.FRAG_PARSING_DATA,{data1:l,startPTS:n,startDTS:n,type:u,hasAudio:!!t,hasVideo:!!e,nb:1,dropped:0}),d.trigger(a.a.FRAG_PARSED)},t}();e.a=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(18),a=r(1),n=r(0),o=r(8),s=r.n(o),l=function(t){var e=new s.a;e.trigger=function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];e.emit.apply(e,[t,t].concat(i))},e.off=function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];e.removeListener.apply(e,[t].concat(i))};var r=function(e,r){t.postMessage({event:e,data:r})};t.addEventListener("message",function(a){var o=a.data;switch(o.cmd){case"init":var s=JSON.parse(o.config);t.demuxer=new i.a(e,o.typeSupported,s,o.vendor);try{Object(n.a)(!0===s.debug)}catch(t){console.warn("demuxerWorker: unable to enable logs")}r("init",null);break;case"demux":t.demuxer.push(o.data,o.decryptdata,o.initSegment,o.audioCodec,o.videoCodec,o.timeOffset,o.discontinuity,o.trackSwitch,o.contiguous,o.duration,o.accurateTimeOffset,o.defaultInitPTS)}}),e.on(a.a.FRAG_DECRYPTED,r),e.on(a.a.FRAG_PARSING_INIT_SEGMENT,r),e.on(a.a.FRAG_PARSED,r),e.on(a.a.ERROR,r),e.on(a.a.FRAG_PARSING_METADATA,r),e.on(a.a.FRAG_PARSING_USERDATA,r),e.on(a.a.INIT_PTS_FOUND,r),e.on(a.a.FRAG_PARSING_DATA,function(e,r){var i=[],a={event:e,data:r};r.data1&&(a.data1=r.data1.buffer,i.push(r.data1.buffer),delete r.data1),r.data2&&(a.data2=r.data2.buffer,i.push(r.data2.buffer),delete r.data2),t.postMessage(a,i)})};e.default=l},function(t,e,r){"use strict";var i={toString:function(t){for(var e="",r=t.length,i=0;i<r;i++)e+="["+t.start(i).toFixed(3)+","+t.end(i).toFixed(3)+"]";return e}};e.a=i},function(t,e,r){"use strict";function i(t,e){for(var r=null,i=0;i<t.length;i+=1){var a=t[i];if(a&&a.cc===e){r=a;break}}return r}function a(t,e,r){var i=!1;return e&&e.details&&r&&(r.endCC>r.startCC||t&&t.cc<r.startCC)&&(i=!0),i}function n(t,e){var r=t.fragments,a=e.fragments;if(!a.length||!r.length)return void l.b.log("No fragments to align");var n=i(r,a[0].cc);return!n||n&&!n.startPTS?void l.b.log("No frag in previous level to align on"):n}function o(t,e){e.fragments.forEach(function(e){if(e){var r=e.start+t;e.start=e.startPTS=r,e.endPTS=r+e.duration}}),e.PTSKnown=!0}function s(t,e,r){if(a(t,e,r)){var i=n(e.details,r);i&&(l.b.log("Adjusting PTS using last level due to CC increase within current level"),o(i.start,r))}if(!1===r.PTSKnown&&e&&e.details&&e.details.fragments&&e.details.fragments.length){var s=e.details.programDateTime,d=r.programDateTime,u=(d-s)/1e3+e.details.fragments[0].start;isNaN(u)||(l.b.log("adjusting PTS using programDateTime delta, sliding:"+u.toFixed(3)),o(u,r))}}e.a=s;var l=(r(7),r(0))},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(3),s=function(t){function e(r){i(this,e);for(var n=arguments.length,o=Array(n>1?n-1:0),s=1;s<n;s++)o[s-1]=arguments[s];var l=a(this,t.call.apply(t,[this,r].concat(o)));return l._tickInterval=null,l._tickTimer=null,l._tickCallCount=0,l._boundTick=l.tick.bind(l),l}return n(e,t),e.prototype.onHandlerDestroying=function(){this.clearNextTick(),this.clearInterval()},e.prototype.hasInterval=function(){return!!this._tickInterval},e.prototype.hasNextTick=function(){return!!this._tickTimer},e.prototype.setInterval=function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return!this._tickInterval&&(this._tickInterval=setInterval(this._boundTick,t),!0)}),e.prototype.clearInterval=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return!!this._tickInterval&&(clearInterval(this._tickInterval),this._tickInterval=null,!0)}),e.prototype.clearNextTick=function(){return!!this._tickTimer&&(clearTimeout(this._tickTimer),this._tickTimer=null,!0)},e.prototype.tick=function(){1===++this._tickCallCount&&(this.doTick(),this._tickCallCount>1&&(this.clearNextTick(),this._tickTimer=setTimeout(this._boundTick,0)),this._tickCallCount=0)},e.prototype.doTick=function(){},e}(o.a);e.a=s},function(t,e,r){"use strict";function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments[2],i=0;if(r.programDateTime){var a=Date.parse(r.programDateTime);isNaN(a)||(i=1e3*e+a-1e3*t)}return i}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!Array.isArray(t)||!t.length||null===e)return null;if(e<t[0].pdt)return null;if(e>=t[t.length-1].endPdt)return null;for(var r=0;r<t.length;++r){var i=t[r];if(e<i.endPdt)return i}return null}function n(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,n=void 0,l=t?e[t.sn-e[0].sn+1]:null;return r<i&&(r>i-a&&(a=0),n=l&&!o(r,a,l)?l:s.a.search(e,o.bind(null,r,a))),n}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments[2],i=Math.min(e,r.duration+(r.deltaPTS?r.deltaPTS:0));return r.start+r.duration-i<=t?1:r.start-i>t&&r.start?-1:0}e.a=i,e.b=a,e.c=n,e.d=o;var s=r(7)},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(0),d=r(2),u=r(15),f=r(22),c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),p=window,v=p.performance,g=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.MANIFEST_LOADED,o.a.LEVEL_LOADED,o.a.AUDIO_TRACK_SWITCHED,o.a.FRAG_LOADED,o.a.ERROR));return n.canload=!1,n.currentLevelIndex=null,n.manualLevelIndex=-1,n.timer=null,n}return n(e,t),e.prototype.onHandlerDestroying=function(){this.clearTimer(),this.manualLevelIndex=-1},e.prototype.clearTimer=function(){null!==this.timer&&(clearTimeout(this.timer),this.timer=null)},e.prototype.startLoad=function(){var t=this._levels;this.canload=!0,this.levelRetryCount=0,t&&t.forEach(function(t){t.loadError=0;var e=t.details;e&&e.live&&(t.details=void 0)}),null!==this.timer&&this.loadLevel()},e.prototype.stopLoad=function(){this.canload=!1},e.prototype.onManifestLoaded=function(t){var e=[],r=void 0,i={},a=null,n=!1,s=!1,c=/chrome|firefox/.test(navigator.userAgent.toLowerCase()),h=[];if(t.levels.forEach(function(t){t.loadError=0,t.fragmentError=!1,n=n||!!t.videoCodec,s=s||!!t.audioCodec||!(!t.attrs||!t.attrs.AUDIO),c&&t.audioCodec&&-1!==t.audioCodec.indexOf("mp4a.40.34")&&(t.audioCodec=void 0),a=i[t.bitrate],a?a.url.push(t.url):(t.url=[t.url],t.urlId=0,i[t.bitrate]=t,e.push(t)),t.attrs&&t.attrs.AUDIO&&Object(f.a)(a||t,"audio",t.attrs.AUDIO),t.attrs&&t.attrs.SUBTITLES&&Object(f.a)(a||t,"text",t.attrs.SUBTITLES)}),n&&s&&(e=e.filter(function(t){return!!t.videoCodec})),e=e.filter(function(t){var e=t.audioCodec,r=t.videoCodec;return(!e||Object(u.a)(e))&&(!r||Object(u.a)(r))}),t.audioTracks&&(h=t.audioTracks.filter(function(t){return!t.audioCodec||Object(u.a)(t.audioCodec,"audio")})),e.length>0){r=e[0].bitrate,e.sort(function(t,e){return t.bitrate-e.bitrate}),this._levels=e;for(var p=0;p<e.length;p++)if(e[p].bitrate===r){this._firstLevel=p,l.b.log("manifest loaded,"+e.length+" level(s) found, first bitrate:"+r);break}this.hls.trigger(o.a.MANIFEST_PARSED,{levels:e,audioTracks:h,firstLevel:this._firstLevel,stats:t.stats,audio:s,video:n,altAudio:h.length>0&&n})}else this.hls.trigger(o.a.ERROR,{type:d.b.MEDIA_ERROR,details:d.a.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:this.hls.url,reason:"no level with compatible codecs found in manifest"})},e.prototype.setLevelInternal=function(t){var e=this._levels,r=this.hls;if(t>=0&&t<e.length){if(this.clearTimer(),this.currentLevelIndex!==t){l.b.log("switching to level "+t),this.currentLevelIndex=t;var i=e[t];i.level=t,r.trigger(o.a.LEVEL_SWITCHING,i)}var a=e[t],n=a.details;if(!n||n.live){var s=a.urlId;r.trigger(o.a.LEVEL_LOADING,{url:a.url[s],level:t,id:s})}}else r.trigger(o.a.ERROR,{type:d.b.OTHER_ERROR,details:d.a.LEVEL_SWITCH_ERROR,level:t,fatal:!1,reason:"invalid level idx"})},e.prototype.onError=function(t){if(t.fatal)return void(t.type===d.b.NETWORK_ERROR&&this.clearTimer());var e=!1,r=!1,i=void 0;switch(t.details){case d.a.FRAG_LOAD_ERROR:case d.a.FRAG_LOAD_TIMEOUT:case d.a.KEY_LOAD_ERROR:case d.a.KEY_LOAD_TIMEOUT:i=t.frag.level,r=!0;break;case d.a.LEVEL_LOAD_ERROR:case d.a.LEVEL_LOAD_TIMEOUT:i=t.context.level,e=!0;break;case d.a.REMUX_ALLOC_ERROR:i=t.level,e=!0}void 0!==i&&this.recoverLevel(t,i,e,r)},e.prototype.recoverLevel=function(t,e,r,i){var a=this,n=this.hls.config,o=t.details,s=this._levels[e],d=void 0,u=void 0,f=void 0;if(s.loadError++,s.fragmentError=i,r){if(!(this.levelRetryCount+1<=n.levelLoadingMaxRetry))return l.b.error("level controller, cannot recover from "+o+" error"),this.currentLevelIndex=null,this.clearTimer(),void(t.fatal=!0);u=Math.min(Math.pow(2,this.levelRetryCount)*n.levelLoadingRetryDelay,n.levelLoadingMaxRetryTimeout),this.timer=setTimeout(function(){return a.loadLevel()},u),t.levelRetry=!0,this.levelRetryCount++,l.b.warn("level controller, "+o+", retry in "+u+" ms, current retry count is "+this.levelRetryCount)}(r||i)&&(d=s.url.length,d>1&&s.loadError<d?(s.urlId=(s.urlId+1)%d,s.details=void 0,l.b.warn("level controller, "+o+" for level "+e+": switching to redundant URL-id "+s.urlId)):-1===this.manualLevelIndex?(f=0===e?this._levels.length-1:e-1,l.b.warn("level controller, "+o+": switch to "+f),this.hls.nextAutoLevel=this.currentLevelIndex=f):i&&(l.b.warn("level controller, "+o+": reload a fragment"),this.currentLevelIndex=null))},e.prototype.onFragLoaded=function(t){var e=t.frag;if(void 0!==e&&"main"===e.type){var r=this._levels[e.level];void 0!==r&&(r.fragmentError=!1,r.loadError=0,this.levelRetryCount=0)}},e.prototype.onLevelLoaded=function(t){var e=this,r=t.level;if(r===this.currentLevelIndex){var i=this._levels[r];i.fragmentError||(i.loadError=0,this.levelRetryCount=0);var a=t.details;if(a.live){var n=1e3*(a.averagetargetduration?a.averagetargetduration:a.targetduration),o=n,s=i.details;s&&a.endSN===s.endSN&&(o/=2,l.b.log("same live playlist, reload twice faster")),o-=v.now()-t.stats.trequest,o=Math.max(n/2,Math.round(o)),l.b.log("live playlist, reload in "+Math.round(o)+" ms"),this.timer=setTimeout(function(){return e.loadLevel()},o)}else this.clearTimer()}},e.prototype.onAudioTrackSwitched=function(t){var e=this.hls.audioTracks[t.id].groupId,r=this.hls.levels[this.currentLevelIndex];if(r&&r.audioGroupIds){var i=r.audioGroupIds.findIndex(function(t){return t===e});i!==r.urlId&&(r.urlId=i,this.startLoad())}},e.prototype.loadLevel=function(){if(l.b.debug("call to loadLevel"),null!==this.currentLevelIndex&&this.canload){var t=this._levels[this.currentLevelIndex];if("object"===(void 0===t?"undefined":c(t))&&t.url.length>0){var e=this.currentLevelIndex,r=t.urlId,i=t.url[r];l.b.log("Attempt loading level index "+e+" with URL-id "+r),this.hls.trigger(o.a.LEVEL_LOADING,{url:i,level:e,id:r})}}},h(e,[{key:"levels",get:function(){return this._levels}},{key:"level",get:function(){return this.currentLevelIndex},set:function(t){var e=this._levels;e&&(t=Math.min(t,e.length-1),this.currentLevelIndex===t&&e[t].details||this.setLevelInternal(t))}},{key:"manualLevel",get:function(){return this.manualLevelIndex},set:function(t){this.manualLevelIndex=t,void 0===this._startLevel&&(this._startLevel=t),-1!==t&&(this.level=t)}},{key:"firstLevel",get:function(){return this._firstLevel},set:function(t){this._firstLevel=t}},{key:"startLevel",get:function(){if(void 0===this._startLevel){var t=this.hls.config.startLevel;return void 0!==t?t:this._firstLevel}return this._startLevel},set:function(t){this._startLevel=t}},{key:"nextLoadLevel",get:function(){return-1!==this.manualLevelIndex?this.manualLevelIndex:this.hls.nextAutoLevel},set:function(t){this.level=t,-1===this.manualLevelIndex&&(this.hls.nextAutoLevel=t)}}]),e}(s.a);e.a=g},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(9),d=r(50),u=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.MEDIA_ATTACHED,o.a.MEDIA_DETACHING,o.a.FRAG_PARSING_METADATA));return n.id3Track=void 0,n.media=void 0,n}return n(e,t),e.prototype.destroy=function(){s.a.prototype.destroy.call(this)},e.prototype.onMediaAttached=function(t){this.media=t.media,this.media},e.prototype.onMediaDetaching=function(){Object(d.a)(this.id3Track),this.id3Track=void 0,this.media=void 0},e.prototype.getID3Track=function(t){for(var e=0;e<t.length;e++){var r=t[e];if("metadata"===r.kind&&"id3"===r.label)return Object(d.b)(r,this.media),r}return this.media.addTextTrack("metadata","id3")},e.prototype.onFragParsingMetadata=function(t){var e=t.frag,r=t.samples;this.id3Track||(this.id3Track=this.getID3Track(this.media.textTracks),this.id3Track.mode="hidden");for(var i=window.WebKitDataCue||window.VTTCue||window.TextTrackCue,a=0;a<r.length;a++){var n=l.a.getID3Frames(r[a].data);if(n){var o=r[a].pts,s=a<r.length-1?r[a+1].pts:e.endPTS;o===s&&(s+=1e-4);for(var d=0;d<n.length;d++){var u=n[d];if(!l.a.isTimeStampFrame(u)){var f=new i(o,s,"");f.value=u,this.id3Track.addCue(f)}}}}},e}(s.a);e.a=u},function(t,e,r){"use strict";function i(t,e){var r=null;try{r=new window.Event("addtrack")}catch(t){r=document.createEvent("Event"),r.initEvent("addtrack",!1,!1)}r.track=t,e.dispatchEvent(r)}function a(t){if(t&&t.cues)for(;t.cues.length>0;)t.removeCue(t.cues[0])}e.b=i,e.a=a},function(t,e,r){"use strict";function i(){var t=Object(a.a)(),e=window.SourceBuffer||window.WebKitSourceBuffer,r=t&&"function"==typeof t.isTypeSupported&&t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),i=!e||e.prototype&&"function"==typeof e.prototype.appendBuffer&&"function"==typeof e.prototype.remove;return!!r&&!!i}e.a=i;var a=r(10)},function(t,e,r){"use strict";r.d(e,"a",function(){return g});var i=r(53),a=r(56),n=r(57),o=r(58),s=r(59),l=r(4),d=(r.n(l),r(4)),u=(r.n(d),r(4)),f=(r.n(u),r(4)),c=(r.n(f),r(4)),h=(r.n(c),r(4)),p=(r.n(h),r(4)),v=(r.n(p),r(60)),g={autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,initialLiveManifestSize:1,maxBufferLength:30,maxBufferSize:6e7,maxBufferHole:.5,lowBufferWatchdogPeriod:.5,highBufferWatchdogPeriod:3,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,liveDurationInfinity:!1,maxMaxBufferLength:600,enableWorker:!0,enableSoftwareAES:!0,manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,startLevel:void 0,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:s.a,fLoader:void 0,pLoader:void 0,xhrSetup:void 0,licenseXhrSetup:void 0,abrController:i.a,bufferController:a.a,capLevelController:n.a,fpsController:o.a,stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0,emeEnabled:!1,widevineLicenseUrl:void 0,requestMediaKeySystemAccessFunc:v.a}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(17),d=r(2),u=r(0),f=r(54),c=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),h=window,p=h.performance,v=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.FRAG_LOADING,o.a.FRAG_LOADED,o.a.FRAG_BUFFERED,o.a.ERROR));return n.lastLoadedFragLevel=0,n._nextAutoLevel=-1,n.hls=r,n.timer=null,n._bwEstimator=null,n.onCheck=n._abandonRulesCheck.bind(n),n}return n(e,t),e.prototype.destroy=function(){this.clearTimer(),s.a.prototype.destroy.call(this)},e.prototype.onFragLoading=function(t){var e=t.frag;if("main"===e.type&&(this.timer||(this.fragCurrent=e,this.timer=setInterval(this.onCheck,100)),!this._bwEstimator)){var r=this.hls,i=r.config,a=e.level,n=r.levels[a].details.live,o=void 0,s=void 0;n?(o=i.abrEwmaFastLive,s=i.abrEwmaSlowLive):(o=i.abrEwmaFastVoD,s=i.abrEwmaSlowVoD),this._bwEstimator=new f.a(r,s,o,i.abrEwmaDefaultEstimate)}},e.prototype._abandonRulesCheck=function(){var t=this.hls,e=t.media,r=this.fragCurrent;if(r){var i=r.loader,a=t.minAutoLevel;if(!i||i.stats&&i.stats.aborted)return u.b.warn("frag loader destroy or aborted, disarm abandonRules"),this.clearTimer(),void(this._nextAutoLevel=-1);var n=i.stats;if(e&&n&&(!e.paused&&0!==e.playbackRate||!e.readyState)&&r.autoLevel&&r.level){var s=p.now()-n.trequest,d=Math.abs(e.playbackRate);if(s>500*r.duration/d){var f=t.levels,c=Math.max(1,n.bw?n.bw/8:1e3*n.loaded/s),h=f[r.level],v=h.realBitrate?Math.max(h.realBitrate,h.bitrate):h.bitrate,g=n.total?n.total:Math.max(n.loaded,Math.round(r.duration*v/8)),m=e.currentTime,y=(g-n.loaded)/c,b=(l.a.bufferInfo(e,m,t.config.maxBufferHole).end-m)/d;if(b<2*r.duration/d&&y>b){var E=void 0,T=void 0;for(T=r.level-1;T>a;T--){var S=f[T].realBitrate?Math.max(f[T].realBitrate,f[T].bitrate):f[T].bitrate;if((E=r.duration*S/(6.4*c))<b)break}E<y&&(u.b.warn("loading too slow, abort fragment loading and switch to level "+T+":fragLoadedDelay["+T+"]<fragLoadedDelay["+(r.level-1)+"];bufferStarvationDelay:"+E.toFixed(1)+"<"+y.toFixed(1)+":"+b.toFixed(1)),t.nextLoadLevel=T,this._bwEstimator.sample(s,n.loaded),i.abort(),this.clearTimer(),t.trigger(o.a.FRAG_LOAD_EMERGENCY_ABORTED,{frag:r,stats:n}))}}}}},e.prototype.onFragLoaded=function(t){var e=t.frag;if("main"===e.type&&!isNaN(e.sn)){if(this.clearTimer(),this.lastLoadedFragLevel=e.level,this._nextAutoLevel=-1,this.hls.config.abrMaxWithRealBitrate){var r=this.hls.levels[e.level],i=(r.loaded?r.loaded.bytes:0)+t.stats.loaded,a=(r.loaded?r.loaded.duration:0)+t.frag.duration;r.loaded={bytes:i,duration:a},r.realBitrate=Math.round(8*i/a)}if(t.frag.bitrateTest){var n=t.stats;n.tparsed=n.tbuffered=n.tload,this.onFragBuffered(t)}}},e.prototype.onFragBuffered=function(t){var e=t.stats,r=t.frag;if(!(!0===e.aborted||"main"!==r.type||isNaN(r.sn)||r.bitrateTest&&e.tload!==e.tbuffered)){var i=e.tparsed-e.trequest;u.b.log("latency/loading/parsing/append/kbps:"+Math.round(e.tfirst-e.trequest)+"/"+Math.round(e.tload-e.tfirst)+"/"+Math.round(e.tparsed-e.tload)+"/"+Math.round(e.tbuffered-e.tparsed)+"/"+Math.round(8*e.loaded/(e.tbuffered-e.trequest))),this._bwEstimator.sample(i,e.loaded),e.bwEstimate=this._bwEstimator.getEstimate(),r.bitrateTest?this.bitrateTestDelay=i/1e3:this.bitrateTestDelay=0}},e.prototype.onError=function(t){switch(t.details){case d.a.FRAG_LOAD_ERROR:case d.a.FRAG_LOAD_TIMEOUT:this.clearTimer()}},e.prototype.clearTimer=function(){clearInterval(this.timer),this.timer=null},e.prototype._findBestLevel=function(t,e,r,i,a,n,o,s,l){for(var d=a;d>=i;d--){var f=l[d],c=f.details,h=c?c.totalduration/c.fragments.length:e,p=!!c&&c.live,v=void 0;v=d<=t?o*r:s*r;var g=l[d].realBitrate?Math.max(l[d].realBitrate,l[d].bitrate):l[d].bitrate,m=g*h/v;if(u.b.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: "+d+"/"+Math.round(v)+"/"+g+"/"+h+"/"+n+"/"+m),v>g&&(!m||p&&!this.bitrateTestDelay||m<n))return d}return-1},c(e,[{key:"nextAutoLevel",get:function(){var t=this._nextAutoLevel,e=this._bwEstimator;if(!(-1===t||e&&e.canEstimate()))return t;var r=this._nextABRAutoLevel;return-1!==t&&(r=Math.min(t,r)),r},set:function(t){this._nextAutoLevel=t}},{key:"_nextABRAutoLevel",get:function(){var t=this.hls,e=t.maxAutoLevel,r=t.levels,i=t.config,a=t.minAutoLevel,n=t.media,o=this.lastLoadedFragLevel,s=this.fragCurrent?this.fragCurrent.duration:0,d=n?n.currentTime:0,f=n&&0!==n.playbackRate?Math.abs(n.playbackRate):1,c=this._bwEstimator?this._bwEstimator.getEstimate():i.abrEwmaDefaultEstimate,h=(l.a.bufferInfo(n,d,i.maxBufferHole).end-d)/f,p=this._findBestLevel(o,s,c,a,e,h,i.abrBandWidthFactor,i.abrBandWidthUpFactor,r);if(p>=0)return p;u.b.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");var v=s?Math.min(s,i.maxStarvationDelay):i.maxStarvationDelay,g=i.abrBandWidthFactor,m=i.abrBandWidthUpFactor;if(0===h){var y=this.bitrateTestDelay;if(y){v=(s?Math.min(s,i.maxLoadingDelay):i.maxLoadingDelay)-y,u.b.trace("bitrate test took "+Math.round(1e3*y)+"ms, set first fragment max fetchDuration to "+Math.round(1e3*v)+" ms"),g=m=1}}return p=this._findBestLevel(o,s,c,a,e,h+v,g,m,r),Math.max(p,0)}}]),e}(s.a);e.a=v},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(55),n=function(){function t(e,r,n,o){i(this,t),this.hls=e,this.defaultEstimate_=o,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new a.a(r),this.fast_=new a.a(n)}return t.prototype.sample=function(t,e){t=Math.max(t,this.minDelayMs_);var r=8e3*e/t,i=t/1e3;this.fast_.sample(i,r),this.slow_.sample(i,r)},t.prototype.canEstimate=function(){var t=this.fast_;return t&&t.getTotalWeight()>=this.minWeight_},t.prototype.getEstimate=function(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_},t.prototype.destroy=function(){},t}();e.a=n},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(e){i(this,t),this.alpha_=e?Math.exp(Math.log(.5)/e):0,this.estimate_=0,this.totalWeight_=0}return t.prototype.sample=function(t,e){var r=Math.pow(this.alpha_,t);this.estimate_=e*(1-r)+r*this.estimate_,this.totalWeight_+=t},t.prototype.getTotalWeight=function(){return this.totalWeight_},t.prototype.getEstimate=function(){if(this.alpha_){var t=1-Math.pow(this.alpha_,this.totalWeight_);return this.estimate_/t}return this.estimate_},t}();e.a=a},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(0),d=r(2),u=r(10),f=Object(u.a)(),c=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.MEDIA_ATTACHING,o.a.MEDIA_DETACHING,o.a.MANIFEST_PARSED,o.a.BUFFER_RESET,o.a.BUFFER_APPENDING,o.a.BUFFER_CODECS,o.a.BUFFER_EOS,o.a.BUFFER_FLUSHING,o.a.LEVEL_PTS_UPDATED,o.a.LEVEL_UPDATED));return n._msDuration=null,n._levelDuration=null,n._live=null,n._objectUrl=null,n.onsbue=n.onSBUpdateEnd.bind(n),n.onsbe=n.onSBUpdateError.bind(n),n.pendingTracks={},n.tracks={},n}return n(e,t),e.prototype.destroy=function(){s.a.prototype.destroy.call(this)},e.prototype.onLevelPtsUpdated=function(t){var e=t.type,r=this.tracks.audio;if("audio"===e&&r&&"audio/mpeg"===r.container){var i=this.sourceBuffer.audio;if(Math.abs(i.timestampOffset-t.start)>.1){var a=i.updating;try{i.abort()}catch(t){a=!0,l.b.warn("can not abort audio buffer: "+t)}a?this.audioTimestampOffset=t.start:(l.b.warn("change mpeg audio timestamp offset from "+i.timestampOffset+" to "+t.start),i.timestampOffset=t.start)}}},e.prototype.onManifestParsed=function(t){var e=t.audio,r=t.video||t.levels.length&&t.altAudio,i=0;t.altAudio&&(e||r)&&(i=(e?1:0)+(r?1:0),l.b.log(i+" sourceBuffer(s) expected")),this.sourceBufferNb=i},e.prototype.onMediaAttaching=function(t){var e=this.media=t.media;if(e){var r=this.mediaSource=new f;this.onmso=this.onMediaSourceOpen.bind(this),this.onmse=this.onMediaSourceEnded.bind(this),this.onmsc=this.onMediaSourceClose.bind(this),r.addEventListener("sourceopen",this.onmso),r.addEventListener("sourceended",this.onmse),r.addEventListener("sourceclose",this.onmsc),e.src=window.URL.createObjectURL(r),this._objectUrl=e.src}},e.prototype.onMediaDetaching=function(){l.b.log("media source detaching");var t=this.mediaSource;if(t){if("open"===t.readyState)try{t.endOfStream()}catch(t){l.b.warn("onMediaDetaching:"+t.message+" while calling endOfStream")}t.removeEventListener("sourceopen",this.onmso),t.removeEventListener("sourceended",this.onmse),t.removeEventListener("sourceclose",this.onmsc),this.media&&(window.URL.revokeObjectURL(this._objectUrl),this.media.src===this._objectUrl?(this.media.removeAttribute("src"),this.media.load()):l.b.warn("media.src was changed by a third party - skip cleanup")),this.mediaSource=null,this.media=null,this._objectUrl=null,this.pendingTracks={},this.tracks={},this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0}this.onmso=this.onmse=this.onmsc=null,this.hls.trigger(o.a.MEDIA_DETACHED)},e.prototype.onMediaSourceOpen=function(){l.b.log("media source opened"),this.hls.trigger(o.a.MEDIA_ATTACHED,{media:this.media});var t=this.mediaSource;t&&t.removeEventListener("sourceopen",this.onmso),this.checkPendingTracks()},e.prototype.checkPendingTracks=function(){var t=this.pendingTracks,e=Object.keys(t).length;e&&(this.sourceBufferNb<=e||0===this.sourceBufferNb)&&(this.createSourceBuffers(t),this.pendingTracks={},this.doAppending())},e.prototype.onMediaSourceClose=function(){l.b.log("media source closed")},e.prototype.onMediaSourceEnded=function(){l.b.log("media source ended")},e.prototype.onSBUpdateEnd=function(){if(this.audioTimestampOffset){var t=this.sourceBuffer.audio;l.b.warn("change mpeg audio timestamp offset from "+t.timestampOffset+" to "+this.audioTimestampOffset),t.timestampOffset=this.audioTimestampOffset,delete this.audioTimestampOffset}this._needsFlush&&this.doFlush(),this._needsEos&&this.checkEos(),this.appending=!1;var e=this.parent,r=this.segments.reduce(function(t,r){return r.parent===e?t+1:t},0),i={},a=this.sourceBuffer;for(var n in a)i[n]=a[n].buffered;this.hls.trigger(o.a.BUFFER_APPENDED,{parent:e,pending:r,timeRanges:i}),this._needsFlush||this.doAppending(),this.updateMediaElementDuration()},e.prototype.onSBUpdateError=function(t){l.b.error("sourceBuffer error:",t),this.hls.trigger(o.a.ERROR,{type:d.b.MEDIA_ERROR,details:d.a.BUFFER_APPENDING_ERROR,fatal:!1})},e.prototype.onBufferReset=function(){var t=this.sourceBuffer;for(var e in t){var r=t[e];try{this.mediaSource.removeSourceBuffer(r),r.removeEventListener("updateend",this.onsbue),r.removeEventListener("error",this.onsbe)}catch(t){}}this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0},e.prototype.onBufferCodecs=function(t){if(0===Object.keys(this.sourceBuffer).length){for(var e in t)this.pendingTracks[e]=t[e];var r=this.mediaSource;r&&"open"===r.readyState&&this.checkPendingTracks()}},e.prototype.createSourceBuffers=function(t){var e=this.sourceBuffer,r=this.mediaSource;for(var i in t)if(!e[i]){var a=t[i],n=a.levelCodec||a.codec,s=a.container+";codecs="+n;l.b.log("creating sourceBuffer("+s+")");try{var u=e[i]=r.addSourceBuffer(s);u.addEventListener("updateend",this.onsbue),u.addEventListener("error",this.onsbe),this.tracks[i]={codec:n,container:a.container},a.buffer=u}catch(t){l.b.error("error while trying to add sourceBuffer:"+t.message),this.hls.trigger(o.a.ERROR,{type:d.b.MEDIA_ERROR,details:d.a.BUFFER_ADD_CODEC_ERROR,fatal:!1,err:t,mimeType:s})}}this.hls.trigger(o.a.BUFFER_CREATED,{tracks:t})},e.prototype.onBufferAppending=function(t){this._needsFlush||(this.segments?this.segments.push(t):this.segments=[t],this.doAppending())},e.prototype.onBufferAppendFail=function(t){l.b.error("sourceBuffer error:",t.event),this.hls.trigger(o.a.ERROR,{type:d.b.MEDIA_ERROR,details:d.a.BUFFER_APPENDING_ERROR,fatal:!1})},e.prototype.onBufferEos=function(t){var e=this.sourceBuffer,r=t.type;for(var i in e)r&&i!==r||e[i].ended||(e[i].ended=!0,l.b.log(i+" sourceBuffer now EOS"));this.checkEos()},e.prototype.checkEos=function(){var t=this.sourceBuffer,e=this.mediaSource;if(!e||"open"!==e.readyState)return void(this._needsEos=!1);for(var r in t){var i=t[r];if(!i.ended)return;if(i.updating)return void(this._needsEos=!0)}l.b.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");try{e.endOfStream()}catch(t){l.b.warn("exception while calling mediaSource.endOfStream()")}this._needsEos=!1},e.prototype.onBufferFlushing=function(t){this.flushRange.push({start:t.startOffset,end:t.endOffset,type:t.type}),this.flushBufferCounter=0,this.doFlush()},e.prototype.onLevelUpdated=function(t){var e=t.details;e.fragments.length>0&&(this._levelDuration=e.totalduration+e.fragments[0].start,this._live=e.live,this.updateMediaElementDuration())},e.prototype.updateMediaElementDuration=function(){var t=this.hls.config,e=void 0;if(null!==this._levelDuration&&this.media&&this.mediaSource&&this.sourceBuffer&&0!==this.media.readyState&&"open"===this.mediaSource.readyState){for(var r in this.sourceBuffer)if(!0===this.sourceBuffer[r].updating)return;e=this.media.duration,null===this._msDuration&&(this._msDuration=this.mediaSource.duration),!0===this._live&&!0===t.liveDurationInfinity?(l.b.log("Media Source duration is set to Infinity"),this._msDuration=this.mediaSource.duration=1/0):(this._levelDuration>this._msDuration&&this._levelDuration>e||e===1/0||isNaN(e))&&(l.b.log("Updating Media Source duration to "+this._levelDuration.toFixed(3)),this._msDuration=this.mediaSource.duration=this._levelDuration)}},e.prototype.doFlush=function(){for(;this.flushRange.length;){var t=this.flushRange[0];if(!this.flushBuffer(t.start,t.end,t.type))return void(this._needsFlush=!0);this.flushRange.shift(),this.flushBufferCounter=0}if(0===this.flushRange.length){this._needsFlush=!1;var e=0,r=this.sourceBuffer;try{for(var i in r)e+=r[i].buffered.length}catch(t){l.b.error("error while accessing sourceBuffer.buffered")}this.appended=e,this.hls.trigger(o.a.BUFFER_FLUSHED)}},e.prototype.doAppending=function(){var t=this.hls,e=this.sourceBuffer,r=this.segments;if(Object.keys(e).length){if(this.media.error)return this.segments=[],void l.b.error("trying to append although a media error occured, flush segment and abort");if(this.appending)return;if(r&&r.length){var i=r.shift();try{var a=i.type,n=e[a];n?n.updating?r.unshift(i):(n.ended=!1,this.parent=i.parent,n.appendBuffer(i.data),this.appendError=0,this.appended++,this.appending=!0):this.onSBUpdateEnd()}catch(e){l.b.error("error while trying to append buffer:"+e.message),r.unshift(i);var s={type:d.b.MEDIA_ERROR,parent:i.parent};22!==e.code?(this.appendError?this.appendError++:this.appendError=1,s.details=d.a.BUFFER_APPEND_ERROR,this.appendError>t.config.appendErrorMaxRetry?(l.b.log("fail "+t.config.appendErrorMaxRetry+" times to append segment in sourceBuffer"),r=[],s.fatal=!0,t.trigger(o.a.ERROR,s)):(s.fatal=!1,t.trigger(o.a.ERROR,s))):(this.segments=[],s.details=d.a.BUFFER_FULL_ERROR,s.fatal=!1,t.trigger(o.a.ERROR,s))}}}},e.prototype.flushBuffer=function(t,e,r){var i=void 0,a=void 0,n=void 0,o=void 0,s=void 0,d=void 0,u=this.sourceBuffer;if(Object.keys(u).length){if(l.b.log("flushBuffer,pos/start/end: "+this.media.currentTime.toFixed(3)+"/"+t+"/"+e),this.flushBufferCounter<this.appended){for(var f in u)if(!r||f===r){if(i=u[f],i.ended=!1,i.updating)return l.b.warn("cannot flush, sb updating in progress"),!1;try{for(a=0;a<i.buffered.length;a++)if(n=i.buffered.start(a),o=i.buffered.end(a),-1!==navigator.userAgent.toLowerCase().indexOf("firefox")&&e===Number.POSITIVE_INFINITY?(s=t,d=e):(s=Math.max(n,t),d=Math.min(o,e)),Math.min(d,o)-s>.5)return this.flushBufferCounter++,l.b.log("flush "+f+" ["+s+","+d+"], of ["+n+","+o+"], pos:"+this.media.currentTime),i.remove(s,d),!1}catch(t){l.b.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")}}}else l.b.warn("abort flushing too many retries");l.b.log("buffer flushed")}return!0},e}(s.a);e.a=c},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),d=function(t){function e(r){i(this,e);var n=a(this,t.call(this,r,o.a.FPS_DROP_LEVEL_CAPPING,o.a.MEDIA_ATTACHING,o.a.MANIFEST_PARSED,o.a.BUFFER_CODECS));return n.autoLevelCapping=Number.POSITIVE_INFINITY,n.firstLevel=null,n.levels=[],n.media=null,n.restrictedLevels=[],n.timer=null,n}return n(e,t),e.prototype.destroy=function(){this.hls.config.capLevelToPlayerSize&&(this.media=null,this._stopCapping())},e.prototype.onFpsDropLevelCapping=function(t){e.isLevelAllowed(t.droppedLevel,this.restrictedLevels)&&this.restrictedLevels.push(t.droppedLevel)},e.prototype.onMediaAttaching=function(t){this.media=t.media instanceof window.HTMLVideoElement?t.media:null},e.prototype.onManifestParsed=function(t){var e=this.hls;this.restrictedLevels=[],this.levels=t.levels,this.firstLevel=t.firstLevel,e.config.capLevelToPlayerSize&&(t.video||t.levels.length&&t.altAudio)&&this._startCapping()},e.prototype.onBufferCodecs=function(t){this.hls.config.capLevelToPlayerSize&&t.video&&this._startCapping()},e.prototype.onLevelsUpdated=function(t){this.levels=t.levels},e.prototype.detectPlayerSize=function(){if(this.media){var t=this.levels?this.levels.length:0;if(t){var e=this.hls;e.autoLevelCapping=this.getMaxLevel(t-1),e.autoLevelCapping>this.autoLevelCapping&&e.streamController.nextLevelSwitch(),this.autoLevelCapping=e.autoLevelCapping}}},e.prototype.getMaxLevel=function(t){var r=this;if(!this.levels)return-1;var i=this.levels.filter(function(i,a){return e.isLevelAllowed(a,r.restrictedLevels)&&a<=t});return e.getMaxLevelByMediaSize(i,this.mediaWidth,this.mediaHeight)},e.prototype._startCapping=function(){this.timer||(this.autoLevelCapping=Number.POSITIVE_INFINITY,this.hls.firstLevel=this.getMaxLevel(this.firstLevel),clearInterval(this.timer),this.timer=setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())},e.prototype._stopCapping=function(){this.restrictedLevels=[],this.firstLevel=null,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(this.timer=clearInterval(this.timer),this.timer=null)},e.isLevelAllowed=function(t){return-1===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).indexOf(t)},e.getMaxLevelByMediaSize=function(t,e,r){if(!t||t&&!t.length)return-1;for(var i=t.length-1,a=0;a<t.length;a+=1){var n=t[a];if((n.width>=e||n.height>=r)&&function(t,e){return!e||(t.width!==e.width||t.height!==e.height)}(n,t[a+1])){i=a;break}}return i},l(e,[{key:"mediaWidth",get:function(){var t=void 0,r=this.media;return r&&(t=r.width||r.clientWidth||r.offsetWidth,t*=e.contentScaleFactor),t}},{key:"mediaHeight",get:function(){var t=void 0,r=this.media;return r&&(t=r.height||r.clientHeight||r.offsetHeight,t*=e.contentScaleFactor),t}}],[{key:"contentScaleFactor",get:function(){var t=1;try{t=window.devicePixelRatio}catch(t){}return t}}]),e}(s.a);e.a=d},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o=r(1),s=r(3),l=r(0),d=window,u=d.performance,f=function(t){function e(r){return i(this,e),a(this,t.call(this,r,o.a.MEDIA_ATTACHING))}return n(e,t),e.prototype.destroy=function(){this.timer&&clearInterval(this.timer),this.isVideoPlaybackQualityAvailable=!1},e.prototype.onMediaAttaching=function(t){var e=this.hls.config;if(e.capLevelOnFPSDrop){"function"==typeof(this.video=t.media instanceof window.HTMLVideoElement?t.media:null).getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),clearInterval(this.timer),this.timer=setInterval(this.checkFPSInterval.bind(this),e.fpsDroppedMonitoringPeriod)}},e.prototype.checkFPS=function(t,e,r){var i=u.now();if(e){if(this.lastTime){var a=i-this.lastTime,n=r-this.lastDroppedFrames,s=e-this.lastDecodedFrames,d=1e3*n/a,f=this.hls;if(f.trigger(o.a.FPS_DROP,{currentDropped:n,currentDecoded:s,totalDroppedFrames:r}),d>0&&n>f.config.fpsDroppedMonitoringThreshold*s){var c=f.currentLevel;l.b.warn("drop FPS ratio greater than max allowed value for currentLevel: "+c),c>0&&(-1===f.autoLevelCapping||f.autoLevelCapping>=c)&&(c-=1,f.trigger(o.a.FPS_DROP_LEVEL_CAPPING,{level:c,droppedLevel:f.currentLevel}),f.autoLevelCapping=c,f.streamController.nextLevelSwitch())}}this.lastTime=i,this.lastDroppedFrames=r,this.lastDecodedFrames=e}},e.prototype.checkFPSInterval=function(){var t=this.video;if(t)if(this.isVideoPlaybackQualityAvailable){var e=t.getVideoPlaybackQuality();this.checkFPS(t,e.totalVideoFrames,e.droppedVideoFrames)}else this.checkFPS(t,t.webkitDecodedFrameCount,t.webkitDroppedFrameCount)},e}(s.a);e.a=f},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=r(0),n=window,o=n.performance,s=n.XMLHttpRequest,l=function(){function t(e){i(this,t),e&&e.xhrSetup&&(this.xhrSetup=e.xhrSetup)}return t.prototype.destroy=function(){this.abort(),this.loader=null},t.prototype.abort=function(){var t=this.loader;t&&4!==t.readyState&&(this.stats.aborted=!0,t.abort()),window.clearTimeout(this.requestTimeout),this.requestTimeout=null,window.clearTimeout(this.retryTimeout),this.retryTimeout=null},t.prototype.load=function(t,e,r){this.context=t,this.config=e,this.callbacks=r,this.stats={trequest:o.now(),retry:0},this.retryDelay=e.retryDelay,this.loadInternal()},t.prototype.loadInternal=function(){var t=void 0,e=this.context;t=this.loader=new s;var r=this.stats;r.tfirst=0,r.loaded=0;var i=this.xhrSetup;try{if(i)try{i(t,e.url)}catch(r){t.open("GET",e.url,!0),i(t,e.url)}t.readyState||t.open("GET",e.url,!0)}catch(r){return void this.callbacks.onError({code:t.status,text:r.message},e,t)}e.rangeEnd&&t.setRequestHeader("Range","bytes="+e.rangeStart+"-"+(e.rangeEnd-1)),t.onreadystatechange=this.readystatechange.bind(this),t.onprogress=this.loadprogress.bind(this),t.responseType=e.responseType,this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),this.config.timeout),t.send()},t.prototype.readystatechange=function(t){var e=t.currentTarget,r=e.readyState,i=this.stats,n=this.context,s=this.config;if(!i.aborted&&r>=2)if(window.clearTimeout(this.requestTimeout),0===i.tfirst&&(i.tfirst=Math.max(o.now(),i.trequest)),4===r){var l=e.status;if(l>=200&&l<300){i.tload=Math.max(i.tfirst,o.now());var d=void 0,u=void 0;"arraybuffer"===n.responseType?(d=e.response,u=d.byteLength):(d=e.responseText,u=d.length),i.loaded=i.total=u;var f={url:e.responseURL,data:d};this.callbacks.onSuccess(f,i,n,e)}else i.retry>=s.maxRetry||l>=400&&l<499?(a.b.error(l+" while loading "+n.url),this.callbacks.onError({code:l,text:e.statusText},n,e)):(a.b.warn(l+" while loading "+n.url+", retrying in "+this.retryDelay+"..."),this.destroy(),this.retryTimeout=window.setTimeout(this.loadInternal.bind(this),this.retryDelay),this.retryDelay=Math.min(2*this.retryDelay,s.maxRetryDelay),i.retry++)}else this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),s.timeout)},t.prototype.loadtimeout=function(){a.b.warn("timeout while loading "+this.context.url),this.callbacks.onTimeout(this.stats,this.context,null)},t.prototype.loadprogress=function(t){var e=t.currentTarget,r=this.stats;r.loaded=t.loaded,t.lengthComputable&&(r.total=t.total);var i=this.callbacks.onProgress;i&&i(r,this.context,null,e)},t}();e.a=l},function(t,e,r){"use strict";r.d(e,"a",function(){return i});var i=function(){return"undefined"!=typeof window&&window.navigator&&window.navigator.requestMediaKeySystemAccess?window.navigator.requestMediaKeySystemAccess.bind(window.navigator):null}()},function(t,e){/*! http://mths.be/endswith v0.2.0 by @mathias */
String.prototype.endsWith||function(){"use strict";var t=function(){try{var t={},e=Object.defineProperty,r=e(t,t,t)&&e}catch(t){}return r}(),e={}.toString,r=function(t){if(null==this)throw TypeError();var r=String(this);if(t&&"[object RegExp]"==e.call(t))throw TypeError();var i=r.length,a=String(t),n=a.length,o=i;if(arguments.length>1){var s=arguments[1];void 0!==s&&(o=s?Number(s):0)!=o&&(o=0)}var l=Math.min(Math.max(o,0),i),d=l-n;if(d<0)return!1;for(var u=-1;++u<n;)if(r.charCodeAt(d+u)!=a.charCodeAt(u))return!1;return!0};t?t(String.prototype,"endsWith",{value:r,configurable:!0,writable:!0}):String.prototype.endsWith=r}()}]).default});
//# sourceMappingURL=hls.light.min.js.map

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

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);


/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		// VS code debugger doesn't have isTTY set
		if (env.VSCODE_PID) {
			return 1;
		}
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/webstomp-client/dist/webstomp.js":
/*!*******************************************************!*\
  !*** ./node_modules/webstomp-client/dist/webstomp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unicodeStringToTypedArray = unicodeStringToTypedArray;
exports.typedArrayToUnicodeString = typedArrayToUnicodeString;
exports.sizeOfUTF8 = sizeOfUTF8;
exports.createId = createId;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VERSIONS = exports.VERSIONS = {
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

// Define constants for bytes used throughout the code.
var BYTES = exports.BYTES = {
    // LINEFEED byte (octet 10)
    LF: '\x0A',
    // NULL byte (octet 0)
    NULL: '\x00'
};

// utility function to trim any whitespace before and after a string
var trim = exports.trim = function trim(str) {
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
    var binstr = String.fromCharCode.apply(String, _toConsumableArray(ua));
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frame = __webpack_require__(2);

var _frame2 = _interopRequireDefault(_frame);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// STOMP Client Class
//
// All STOMP protocol is exposed as methods of this class (`connect()`,
// `send()`, etc.)
var Client = function () {
    function Client(ws) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Client);

        // cannot have default options object + destructuring in the same time in method signature
        var _options$binary = options.binary,
            binary = _options$binary === undefined ? false : _options$binary,
            _options$heartbeat = options.heartbeat,
            heartbeat = _options$heartbeat === undefined ? { outgoing: 10000, incoming: 10000 } : _options$heartbeat,
            _options$debug = options.debug,
            debug = _options$debug === undefined ? true : _options$debug;


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


    _createClass(Client, [{
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
                _parseConnect3 = _slicedToArray(_parseConnect2, 3),
                headers = _parseConnect3[0],
                connectCallback = _parseConnect3[1],
                errorCallback = _parseConnect3[2];

            this.connectCallback = connectCallback;
            this.debug('Opening Web Socket...');
            this.ws.onmessage = function (evt) {
                var data = evt.data;
                if (evt.data instanceof ArrayBuffer) {
                    data = (0, _utils.typedArrayToUnicodeString)(new Uint8Array(evt.data));
                }
                _this.serverActivity = Date.now();
                // heartbeat
                if (data === _utils.BYTES.LF) {
                    _this.debug('<<< PONG');
                    return;
                }
                _this.debug('<<< ' + data);
                // Handle STOMP frames received from the server
                // The unmarshall function returns the frames parsed and any remaining
                // data from partial frames.
                var unmarshalledData = _frame2.default.unmarshall(_this.partialData + data);
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
                                var messageID = _this.version === _utils.VERSIONS.V1_2 && frame.headers.ack || frame.headers['message-id'];
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
                headers['accept-version'] = _utils.VERSIONS.supportedVersions();
                // Check if we already have heart-beat in headers before adding them
                if (!headers['heart-beat']) {
                    headers['heart-beat'] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
                }
                _this._transmit('CONNECT', headers);
            };
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
            var transaction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tx-' + (0, _utils.createId)();

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
            var idAttr = this.version === _utils.VERSIONS.V1_2 ? 'id' : 'message-id';
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
            var idAttr = this.version === _utils.VERSIONS.V1_2 ? 'id' : 'message-id';
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
            if (!hdrs.id) hdrs.id = 'sub-' + (0, _utils.createId)();
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
            var out = _frame2.default.marshall(command, headers, body);
            this.debug('>>> ' + out, { frame: { command: command, headers: headers, body: body } });
            this._wsSend(out);
        }
    }, {
        key: '_wsSend',
        value: function _wsSend(data) {
            if (this.isBinary) data = (0, _utils.unicodeStringToTypedArray)(data);
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

            if (this.version !== _utils.VERSIONS.V1_1 && this.version !== _utils.VERSIONS.V1_2) return;

            // heart-beat header received from the server looks like:
            //
            //     heart-beat: sx, sy

            var _split$map = (headers['heart-beat'] || '0,0').split(',').map(function (v) {
                return parseInt(v, 10);
            }),
                _split$map2 = _slicedToArray(_split$map, 2),
                serverOutgoing = _split$map2[0],
                serverIncoming = _split$map2[1];

            if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
                var ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
                this.debug('send PING every ' + ttl + 'ms');
                this.pinger = setInterval(function () {
                    _this2._wsSend(_utils.BYTES.LF);
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

exports.default = Client;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// [STOMP Frame](http://stomp.github.com/stomp-specification-1.1.html#STOMP_Frames) Class
var Frame = function () {

    // Frame constructor
    function Frame(command) {
        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        _classCallCheck(this, Frame);

        this.command = command;
        this.headers = headers;
        this.body = body;
    }

    // Provides a textual representation of the frame
    // suitable to be sent to the server


    _createClass(Frame, [{
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
                lines.push('content-length:' + (0, _utils.sizeOfUTF8)(this.body));
            }

            lines.push(_utils.BYTES.LF + this.body);

            return lines.join(_utils.BYTES.LF);
        }

        // Unmarshall a single STOMP frame from a `data` string

    }], [{
        key: 'unmarshallSingle',
        value: function unmarshallSingle(data) {
            // search for 2 consecutives LF byte to split the command
            // and headers from the body
            var divider = data.search(new RegExp(_utils.BYTES.LF + _utils.BYTES.LF)),
                headerLines = data.substring(0, divider).split(_utils.BYTES.LF),
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
                    headers[(0, _utils.trim)(line.substring(0, idx))] = (0, _utils.trim)(line.substring(idx + 1));
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
                    if (chr === _utils.BYTES.NULL) break;
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
            var frames = datas.split(new RegExp(_utils.BYTES.NULL + _utils.BYTES.LF + '*')),
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
            if (lastFrame === _utils.BYTES.LF || lastFrame.search(RegExp(_utils.BYTES.NULL + _utils.BYTES.LF + '*$')) !== -1) {
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
            return frame.toString() + _utils.BYTES.NULL;
        }
    }]);

    return Frame;
}();

exports.default = Frame;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = __webpack_require__(1);

var _client2 = _interopRequireDefault(_client);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The `webstomp` Object
var webstomp = {
    VERSIONS: _utils.VERSIONS,
    // This method creates a WebSocket client that is connected to
    // the STOMP server located at the url.
    client: function client(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var ws = new WebSocket(url, options.protocols || _utils.VERSIONS.supportedProtocols());
        return new _client2.default(ws, options);
    },
    // This method is an alternative to `webstomp.client()` to let the user
    // specify the WebSocket to use (either a standard HTML5 WebSocket or
    // a similar object).
    over: function over() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(_client2.default, [null].concat(args)))();
    }
};

exports.default = webstomp;
module.exports = exports['default'];

/***/ })
/******/ ]);
});

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
var Queue_1 = __webpack_require__(/*! ./Queue */ "./src/analytics/Queue.ts");
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
        var emit = Analytics.emit, addToQueue = Analytics.addToQueue, concatParams = Analytics.concatParams;
        var _a = Analytics.broker, defer = _a.defer, active = _a.active;
        if (active.isEmpty() && !defer) {
            emit();
        }
        addToQueue(concatParams(event));
    };
    Analytics.emitter = null;
    Analytics.retryTimeout = null;
    Analytics.request = {
        baseUrl: settings.baseUrl,
        cacheKey: settings.lsLookup,
        clientId: settings.cidPlaceholder
    };
    Analytics.broker = {
        concurrency: settings.concurrency,
        frequency: settings.frequency,
        enqueued: 0,
        defer: false,
        active: new Queue_1.default(),
        deferred: new Queue_1.default()
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
        var getRandom = Analytics.getRandom;
        var _a = Analytics.request, baseUrl = _a.baseUrl, clientId = _a.clientId;
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
        var _a = Analytics.broker, concurrency = _a.concurrency, active = _a.active, deferred = _a.deferred;
        var defer = Analytics.broker.defer;
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
        var _a = Analytics.broker, concurrency = _a.concurrency, active = _a.active, deferred = _a.deferred;
        var _b = Analytics.broker, enqueued = _b.enqueued, defer = _b.defer;
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
        Makes GET request to GA collect API with formatted query string, retrying
        is handled by axios-retry with exponential decay
     */
    Analytics.makeRequest = function (url) {
        var broker = Analytics.broker, emit = Analytics.emit, emitter = Analytics.emitter;
        var active = broker.active;
        API_1.default.getGATrackingPixel(url)
            .then(function () {
            if (active.isEmpty()) {
                clearInterval(emitter);
            }
        })
            .catch(function (e) {
            clearInterval(emitter);
            active.pop();
            emit();
        });
    };
    return Analytics;
}());
exports.default = Analytics;


/***/ }),

/***/ "./src/analytics/Queue.ts":
/*!********************************!*\
  !*** ./src/analytics/Queue.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
    Simple queue for storing URL strings
 */
var Queue = /** @class */ (function () {
    function Queue() {
        var _this = this;
        this.enqueue = function (item) {
            _this.q.push(item);
        };
        this.pop = function () {
            _this.q.splice(0, 1);
        };
        this.peek = function () {
            return _this.q[0];
        };
        this.isEmpty = function () {
            return (_this.q.length === 0);
        };
        this.isFull = function (max) {
            return (_this.q.length < max);
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
__webpack_require__(/*! babel-polyfill */ "./node_modules/babel-polyfill/lib/index.js");
var API_1 = __webpack_require__(/*! ./http/API */ "./src/client/http/API.ts");
var MessageConsumer_1 = __webpack_require__(/*! ./tcp/MessageConsumer */ "./src/client/tcp/MessageConsumer.ts");
var Analytics_1 = __webpack_require__(/*! ../analytics/Analytics */ "./src/analytics/Analytics.ts");
var FallbackPlayer_1 = __webpack_require__(/*! ../video/FallbackPlayer */ "./src/video/FallbackPlayer.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").client;
/*
    Log out Imposium.js Version in the console
 */
var version = '1.4.2';
console.log("%cPowered By%c Imposium%c v" + version + "%c https://imposium.com", 'text-transform: uppercase; padding: 5px 0px 5px 5px; background-color: black; color: white;', 'text-transform: uppercase; padding: 5px 0px 5px 0px; background-color: black; color: #a1b83a;', 'padding: 5px 5px 5px 0px; background-color: black; color: white;', 'padding: 5px 5px 5px 0px;');
var Client = /** @class */ (function () {
    /*
        Initialize Imposium client
     */
    function Client(config) {
        var _this = this;
        this.eventDelegateRefs = Helpers_1.cloneWithKeys(Client.events);
        this.api = null;
        this.player = null;
        this.consumer = null;
        this.clientConfig = null;
        this.gaProperty = '';
        this.playerIsFallback = false;
        /*
            Exposed for users who may want to re-use a client for n stories
         */
        this.setup = function (config) {
            _this.assignConfigOpts(config);
        };
        /*
            Set current video player ref
         */
        this.setPlayer = function (player, isFallback) {
            if (isFallback === void 0) { isFallback = false; }
            _this.playerIsFallback = isFallback;
            _this.player = player;
        };
        /*
            Sets a callback for an event
         */
        this.on = function (eventName, callback) {
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
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
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Turns off a specific event or all events
         */
        this.off = function (eventName) {
            if (eventName === void 0) { eventName = ''; }
            var _a = _this, eventDelegateRefs = _a.eventDelegateRefs, ERROR = _a.eventDelegateRefs.ERROR;
            try {
                if (eventName !== '') {
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
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Get experience data
         */
        this.getExperience = function (experienceId) {
            var _a = _this, api = _a.api, player = _a.player, gaProperty = _a.gaProperty, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
            try {
                if (GOT_EXPERIENCE || player) {
                    api.getExperience(experienceId)
                        .then(function (experience) {
                        var output = experience.output, id = experience.id;
                        if (Object.keys(output).length > 0) {
                            if (player) {
                                player.experienceGenerated(experience);
                            }
                            if (GOT_EXPERIENCE) {
                                GOT_EXPERIENCE(experience);
                            }
                        }
                        else {
                            _this.renderExperience(id);
                        }
                    })
                        .catch(function (e) {
                        var wrappedError = new Exceptions_1.NetworkError('httpFailure', experienceId, e);
                        ExceptionPipe_1.default.trapError(wrappedError, ERROR);
                    });
                }
                else {
                    throw new Exceptions_1.ClientConfigurationError('eventNotConfigured', Client.events.GOT_EXPERIENCE);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Create new experience & return relevant meta
         */
        this.createExperience = function (inventory, render) {
            if (render === void 0) { render = true; }
            var _a = _this, player = _a.player, playerIsFallback = _a.playerIsFallback, _b = _a.eventDelegateRefs, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, EXPERIENCE_CREATED = _b.EXPERIENCE_CREATED, STATUS_UPDATE = _b.STATUS_UPDATE, UPLOAD_PROGRESS = _b.UPLOAD_PROGRESS, ERROR = _b.ERROR;
            var permitRender = ((render && player !== null && !playerIsFallback) || Helpers_1.isFunc(GOT_EXPERIENCE));
            var permitCreate = Helpers_1.isFunc(EXPERIENCE_CREATED);
            if (STATUS_UPDATE) {
                STATUS_UPDATE({ status: 'Creating Experience' });
            }
            try {
                if (permitRender || permitCreate) {
                    var _c = _this, api = _c.api, storyId = _c.clientConfig.storyId;
                    api.postExperience(storyId, inventory, UPLOAD_PROGRESS)
                        .then(function (experience) {
                        var _a = _this.clientConfig, sceneId = _a.sceneId, actId = _a.actId;
                        var id = experience.id;
                        if (EXPERIENCE_CREATED) {
                            EXPERIENCE_CREATED(experience);
                        }
                        if (render) {
                            _this.renderExperience(id);
                        }
                    })
                        .catch(function (e) {
                        var wrappedError = new Exceptions_1.NetworkError('httpFailure', null, e);
                        ExceptionPipe_1.default.trapError(wrappedError, ERROR);
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
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Sets up analytics using fallback video player wrapper class
         */
        this.captureAnalytics = function (playerRef) {
            if (playerRef === void 0) { playerRef = null; }
            var ERROR = _this.eventDelegateRefs.ERROR;
            try {
                if (!Helpers_1.isNode()) {
                    _this.setPlayer(new FallbackPlayer_1.default(playerRef), true);
                }
                else {
                    throw new Exceptions_1.EnvironmentError('node');
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Copies supplied config object to settings for sharing with sub components
         */
        this.assignConfigOpts = function (config) {
            var prevConfig = _this.clientConfig;
            var defaultConfig = settings.defaultConfig;
            Helpers_1.prepConfig(config, defaultConfig);
            _this.clientConfig = __assign({}, defaultConfig, config);
            if (!_this.api) {
                _this.api = new API_1.default(_this.clientConfig.accessToken, _this.clientConfig.environment);
            }
            else {
                _this.api.configureClient(_this.clientConfig.accessToken, _this.clientConfig.environment);
            }
            // Prep for analytics in browser
            if (!Helpers_1.isNode()) {
                _this.getAnalyticsProperty();
            }
        };
        /*
            Get the GA property per storyId passed in
         */
        this.getAnalyticsProperty = function () {
            var _a = _this, api = _a.api, storyId = _a.clientConfig.storyId, ERROR = _a.eventDelegateRefs.ERROR;
            api.getStory(storyId)
                .then(function (story) {
                var gaTrackingId = story.gaTrackingId;
                _this.gaProperty = gaTrackingId;
                if (_this.player) {
                    _this.player.setGaProperty(gaTrackingId);
                }
                Analytics_1.default.setup();
                _this.doPageView();
                window.addEventListener('popstate', function () { return _this.doPageView(); });
            })
                .catch(function (e) {
                var wrappedError = new Exceptions_1.NetworkError('httpFailure', null, e);
                ExceptionPipe_1.default.trapError(wrappedError, ERROR);
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
            Invokes the streaming process
         */
        this.startMessaging = function (experienceId) {
            var _a = _this, api = _a.api, ERROR = _a.eventDelegateRefs.ERROR;
            api.invokeStream(experienceId)
                .catch(function (e) {
                var wrappedError = new Exceptions_1.NetworkError('httpFailure', experienceId, e);
                ExceptionPipe_1.default.trapError(wrappedError, ERROR);
            });
        };
        /*
            Make a new consumer w/ delegates
         */
        this.makeConsumer = function (experienceId) {
            var _a = _this, environment = _a.clientConfig.environment, eventDelegateRefs = _a.eventDelegateRefs, player = _a.player;
            // Merge scoped startMessaging call with client events
            var delegates = __assign({ start: function (id) { return _this.startMessaging(id); } }, eventDelegateRefs);
            _this.consumer = new MessageConsumer_1.default(environment, experienceId, delegates, player);
        };
        /*
            Invokes rendering processes and starts listening for messages
         */
        this.renderExperience = function (experienceId) {
            var consumer = _this.consumer;
            if (!consumer) {
                _this.makeConsumer(experienceId);
            }
            else {
                consumer.kill()
                    .then(function () {
                    _this.makeConsumer(experienceId);
                });
            }
        };
        if (config.accessToken && config.storyId) {
            this.assignConfigOpts(config);
        }
        else {
            // do throw setup err, make new one for this that spits our creds??
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
                get("/story/" + storyId)
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
        this.postExperience = function (storyId, inventory, progress) {
            if (progress === void 0) { progress = null; }
            var _a = _this, doPostExperience = _a.doPostExperience, uploadProgress = _a.uploadProgress;
            var formData = Helpers_1.InventoryToFormData(storyId, inventory);
            var config = {
                onUploadProgress: function (e) { return uploadProgress(e, progress); },
                headers: {}
            };
            if (!Helpers_1.isNode()) {
                return doPostExperience(formData, config);
            }
            else {
                config.headers = formData.getHeaders();
                return doPostExperience(formData, config);
            }
        };
        /*
            Wait async for POST /experience/{expId}/trigger-event, resolve on success
         */
        this.invokeStream = function (experienceId) {
            var post = _this.http.post;
            return new Promise(function (resolve, reject) {
                post("/experience/" + experienceId + "/trigger-event")
                    .then(function (res) {
                    resolve();
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
        this.doPostExperience = function (formData, config) {
            var post = _this.http.post;
            return new Promise(function (resolve, reject) {
                post("/experience", formData, config)
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
var Stomp_1 = __webpack_require__(/*! ./Stomp */ "./src/client/tcp/Stomp.ts");
var ExceptionPipe_1 = __webpack_require__(/*! ../../scaffolding/ExceptionPipe */ "./src/scaffolding/ExceptionPipe.ts");
var Exceptions_1 = __webpack_require__(/*! ../../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").messageConsumer;
// Wraps around the Stomp client, providing the message handling
var MessageConsumer = /** @class */ (function () {
    function MessageConsumer(env, experienceId, clientDelegates, player) {
        var _this = this;
        this.stompDelegates = {
            start: function () { return _this.startConsuming(); },
            route: function (m) { return _this.routeMessageData(m); },
            error: function (e) { return _this.stompError(e); }
        };
        this.env = '';
        this.experienceId = null;
        this.clientDelegates = null;
        this.stomp = null;
        this.retried = settings.minReconnects;
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
            Initializes a stomp connection object
         */
        this.establishConnection = function () {
            var _a = _this, experienceId = _a.experienceId, env = _a.env, stompDelegates = _a.stompDelegates;
            _this.stomp = new Stomp_1.default(experienceId, stompDelegates, env);
        };
        /*
            Invoke delegate which starts message queueing on Imposium servers
         */
        this.startConsuming = function () {
            var _a = _this, experienceId = _a.experienceId, start = _a.clientDelegates.start;
            start(experienceId);
        };
        /*
            Manage incoming messages. Depending on their state the websocket
            may be terminated.
         */
        this.routeMessageData = function (msg) {
            var _a = MessageConsumer.EVENT_NAMES, scene = _a.scene, message = _a.message, complete = _a.complete;
            var _b = _this, stomp = _b.stomp, experienceId = _b.experienceId, ERROR = _b.clientDelegates.ERROR;
            try {
                var payload = JSON.parse(msg.body);
                switch (payload.event) {
                    case complete:
                        stomp.disconnectAsync().then(function () { return; });
                        break;
                    case message:
                        _this.emitMessageData(payload);
                        break;
                    case scene:
                        _this.emitSceneData(payload);
                        break;
                    default: break;
                }
            }
            catch (e) {
                var wrappedError = new Exceptions_1.NetworkError('messageParseFailed', experienceId, e);
                ExceptionPipe_1.default.trapError(wrappedError, ERROR);
            }
        };
        /*
            Fire the gotMessage callback if the user is listening for this event
         */
        this.emitMessageData = function (messageData) {
            var _a = _this.clientDelegates, STATUS_UPDATE = _a.STATUS_UPDATE, ERROR = _a.ERROR;
            var status = messageData.status, id = messageData.id;
            try {
                if (status === settings.errorOverTcp) {
                    throw new Exceptions_1.NetworkError('errorOverTcp', id, null);
                }
                if (STATUS_UPDATE) {
                    STATUS_UPDATE(messageData);
                }
            }
            catch (e) {
                ExceptionPipe_1.default.trapError(e, ERROR);
            }
        };
        /*
            Parses the experience data into a prop delivered via gotScene
         */
        this.emitSceneData = function (experience) {
            var _a = _this, player = _a.player, _b = _a.clientDelegates, GOT_EXPERIENCE = _b.GOT_EXPERIENCE, ERROR = _b.ERROR;
            var moderation_status = experience.moderation_status;
            if (player) {
                player.experienceGenerated(experience);
            }
            if (GOT_EXPERIENCE) {
                GOT_EXPERIENCE(experience);
            }
        };
        /*
            Called on Stomp errors
         */
        this.stompError = function (e) {
            var _a = _this, retried = _a.retried, experienceId = _a.experienceId, stomp = _a.stomp, ERROR = _a.clientDelegates.ERROR;
            var wasClean = e.wasClean;
            if (!e.wasClean) {
                ++_this.retried;
                if (retried < MessageConsumer.MAX_RETRIES) {
                    ExceptionPipe_1.default.logWarning('network', 'tcpFailure');
                    stomp.disconnectAsync()
                        .then(function () {
                        _this.establishConnection();
                    });
                }
                else {
                    var wrappedError = new Exceptions_1.NetworkError('tcpFailure', experienceId, e);
                    ExceptionPipe_1.default.trapError(wrappedError, ERROR);
                }
            }
        };
        this.env = env;
        this.experienceId = experienceId;
        this.clientDelegates = clientDelegates;
        if (player) {
            this.player = player;
        }
        this.establishConnection();
    }
    MessageConsumer.MAX_RETRIES = settings.maxReconnects;
    MessageConsumer.EVENT_NAMES = {
        scene: 'gotScene',
        message: 'gotMessage',
        complete: 'actComplete'
    };
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
var Helpers_1 = __webpack_require__(/*! ../../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var WebSocketShim = __webpack_require__(/*! isomorphic-ws */ "isomorphic-ws");
var settings = __webpack_require__(/*! ../../conf/settings.json */ "./src/conf/settings.json").stomp;
var Stomp = /** @class */ (function () {
    function Stomp(experienceId, delegates, env) {
        var _this = this;
        // WS / Stomp client refs
        this.endpoint = '';
        this.socket = null;
        this.client = null;
        this.subscription = null;
        /*
            Ends the current connection gracefully
         */
        this.disconnectAsync = function () {
            var _a = _this, client = _a.client, connected = _a.client.connected, subscription = _a.subscription;
            return new Promise(function (resolve) {
                if (connected) {
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
        /*
            Initializes the WebStomp client w/ handlers.
    
            The debug method needs to be overridden as a rule of
            this WebStomp library.
         */
        this.init = function () {
            var username = Stomp.username, password = Stomp.password;
            var _a = _this, endpoint = _a.endpoint, error = _a.delegates.error;
            _this.socket = (!Helpers_1.isNode()) ? new WebSocket(endpoint) : new WebSocketShim(endpoint);
            _this.client = WebStomp.over(_this.socket);
            _this.client.debug = function () { return; };
            _this.client.connect(username, password, function () { return _this.establishSubscription(); }, error);
        };
        /*
            Triggers socketIO to emit & sets up a listener for messages
         */
        this.establishSubscription = function () {
            var exchange = Stomp.exchange;
            var _a = _this, experienceId = _a.experienceId, client = _a.client, _b = _a.delegates, start = _b.start, route = _b.route;
            _this.subscription = client.subscribe("" + exchange + experienceId, route);
            start();
        };
        this.experienceId = experienceId;
        this.delegates = delegates;
        this.endpoint = settings[env];
        this.init();
    }
    // Static RabbitMQ creds
    Stomp.exchange = settings.exchange;
    Stomp.username = settings.username;
    Stomp.password = settings.password;
    return Stomp;
}());
exports.default = Stomp;


/***/ }),

/***/ "./src/conf/errors.json":
/*!******************************!*\
  !*** ./src/conf/errors.json ***!
  \******************************/
/*! exports provided: environment, moderation, clientConfiguration, playerConfiguration, network, default */
/***/ (function(module) {

module.exports = {"environment":{"node":"Sorry, this feature is incompatible with NodeJS"},"moderation":{"rejection":"This experience was rejected."},"clientConfiguration":{"invalidEventName":"Invalid client event name.","invalidCallbackType":"The callback reference set for this client event is not of type function.","eventNotConfigured":"You cannot invoke this client event without a callback set."},"playerConfiguration":{"noClient":"You must provide an Imposium client reference to the player.","invalidPlayerRef":"No reference to an HTML5 video element was detected.","invalidEventName":"Invalid player event name.","invalidCallbackType":"The callback reference set for this player event is not of type function.","eventNotConfigured":"You cannot invoke this player event without a callback set."},"network":{"httpFailure":"Unable to process request to the Imposium API.","tcpFailure":"Unable to reach Imposium while processing this experience.","errorOverTcp":"Something went wrong while processing this experience.","messageParseFailure":"Message data from Imposium was malformed."}};

/***/ }),

/***/ "./src/conf/settings.json":
/*!********************************!*\
  !*** ./src/conf/settings.json ***!
  \********************************/
/*! exports provided: client, api, messageConsumer, stomp, analytics, videoPlayer, default */
/***/ (function(module) {

module.exports = {"client":{"defaultConfig":{"accessToken":"","storyId":"","actId":"","sceneId":"","environment":"production"}},"api":{"production":"https://api.imposium.com","staging":"https://api.staging.imposium.com","currentVersion":"2.0.0","version":"X-Imposium-Api-Version","hmac":"X-Imposium-Access-Key","jwt":"Authorization","img":"https://upload.wikimedia.org/wikipedia/commons/1/1b/LythrumSalicaria-flowers-1mb.jpg"},"messageConsumer":{"maxReconnects":5,"minReconnects":0,"errorOverTcp":"Server failure.","videoSceneKey":"VideoScene01"},"stomp":{"production":"wss://stomp.prod.k8s.nickel.media/ws/","staging":"wss://stomp.staging.k8s.nickel.media/ws","exchange":"/exchange/imposium/","username":"imposium_stomp","password":"Teehe1ceeMe7Pe1d"},"analytics":{"baseUrl":"https://ssl.google-analytics.com/collect","lsLookup":"imposium_js_ga_cid","gaPropPlaceholder":"[id_placeholder]","cidPlaceholder":"[cid_placeholder]","concurrency":10,"frequency":50},"videoPlayer":{"defaultConfig":{"volume":1,"preload":"auto","loop":false,"muted":false,"autoLoad":true,"autoPlay":true,"controls":true,"crossOrigin":"anonymous"},"playbackEvents":[0.25,0.5,0.75],"checkPlaybackRateMs":100,"volumeMin":0,"volumeMax":1,"bandwidth":{"low":2.4,"mid":8},"compression":{"stream":"m3u8","low":"mp4_480","mid":"mp4_720","high":"mp4_1080"},"bandwidthSamples":5,"hlsSupportLevels":{"native":"native","hlsjs":"hls-js"},"streamType":"application/vnd.apple.mpegurl"}};

/***/ }),

/***/ "./src/conf/warnings.json":
/*!********************************!*\
  !*** ./src/conf/warnings.json ***!
  \********************************/
/*! exports provided: client, network, playerFailure, default */
/***/ (function(module) {

module.exports = {"client":{"nodeAnalytics":"Sorry, analytics are not currently available in NodeJS."},"network":{"tcpFailure":"Unable to reach Imposium while processing this experience, retrying..."},"playerFailure":{"seekNotReady":"Seek can't be called until the video metadata has loaded, please try again shortly.","invalidSeekTime":"Could not seek to time outside of current video duration.","invalidVolume":"Could not set volume outside of range (double) 0.0 - 1.0."}};

/***/ }),

/***/ "./src/entry.ts":
/*!**********************!*\
  !*** ./src/entry.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __webpack_require__(/*! ./client/Client */ "./src/client/Client.ts");
exports.Client = Client_1.default;
var Player_1 = __webpack_require__(/*! ./video/Player */ "./src/video/Player.ts");
exports.Player = Player_1.default;
var Events = Client_1.default.events;
exports.Events = Events;


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
var warnings = __webpack_require__(/*! ../conf/warnings.json */ "./src/conf/warnings.json");
var ExceptionPipe = /** @class */ (function () {
    function ExceptionPipe() {
    }
    ExceptionPipe.logWarning = function (type, messageKey) {
        console.warn("IMPOSIUM\n" + warnings[type][messageKey]);
    };
    ExceptionPipe.trapError = function (e, errorEvent) {
        if (errorEvent === void 0) { errorEvent = null; }
        if (errorEvent) {
            errorEvent(e);
        }
        if (e.log) {
            e.log();
            // ExceptionPipe.traceError(e);
        }
        else {
            // do throw uncaught exception
        }
        // ExceptionPipe.gaEmit(e)
    };
    ExceptionPipe.traceError = function (e) {
        var gaProp = 'UA-113079866-1';
        Analytics_1.default.send({
            prp: gaProp,
            t: 'event',
            ec: e.type,
            ea: e.stack,
            el: '6072569c-d4e7-43d8-ec7d-ec336ed8d6a8',
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
    CLIENT_CONFIG: 'clientConfiguration',
    PLAYER_CONFIG: 'playerConfiguration',
    NETWORK: 'network'
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
var EnvironmentError = /** @class */ (function (_super) {
    __extends(EnvironmentError, _super);
    function EnvironmentError(messageKey, type) {
        if (type === void 0) { type = types.ENV; }
        var _this = _super.call(this, errors[type][messageKey], type) || this;
        _this.log = function () {
            console.error(_this.prefix + "\n            \nReason: Unavailable feature\n            \nMessage: " + _this.message);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, EnvironmentError);
        }
        return _this;
    }
    return EnvironmentError;
}(ImposiumError));
exports.EnvironmentError = EnvironmentError;
var ClientConfigurationError = /** @class */ (function (_super) {
    __extends(ClientConfigurationError, _super);
    function ClientConfigurationError(messageKey, eventName, type) {
        if (type === void 0) { type = types.CLIENT_CONFIG; }
        var _this = _super.call(this, errors[type][messageKey], type) || this;
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
    function PlayerConfigurationError(messageKey, eventName, type) {
        if (type === void 0) { type = types.PLAYER_CONFIG; }
        var _this = _super.call(this, errors[type][messageKey], type) || this;
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
    function NetworkError(messageKey, experienceId, networkError, type) {
        if (type === void 0) { type = types.NETWORK; }
        var _this = _super.call(this, errors[type][messageKey], type) || this;
        _this.experienceId = null;
        _this.networkError = null;
        _this.log = function () {
            console.error(_this.prefix + "\n            \nReason: Network related error\n            \nMessage: " + _this.message + "\n            \nExperience ID: " + _this.experienceId + "\n            \nNetwork Error: ", _this.networkError);
        };
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, NetworkError);
        }
        _this.experienceId = experienceId || '<not_set>';
        _this.networkError = networkError;
        return _this;
    }
    return NetworkError;
}(ImposiumError));
exports.NetworkError = NetworkError;


/***/ }),

/***/ "./src/scaffolding/Helpers.ts":
/*!************************************!*\
  !*** ./src/scaffolding/Helpers.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FormDataShim = __webpack_require__(/*! form-data */ "form-data");
// Checks for NodeJS process data
exports.isNode = function () {
    return (typeof process !== 'undefined' &&
        process + '' === '[object process]' &&
        typeof ((process || {}).versions || {}).node !== 'undefined');
};
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
// Deal with prepping form data objs in isomporphic way
exports.InventoryToFormData = function (s, i) {
    return (!exports.isNode()) ? invToFDGlobal(s, i) : invToFDShim(s, i);
};
// Uses browser based FormData library to prep POST data
var invToFDGlobal = function (storyId, inventory) {
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
// Uses shimmed FormData lib, checks for Buffers when working in nodeJS to prep POST data
var invToFDShim = function (storyId, inventory) {
    var stream = __webpack_require__(/*! stream */ "stream");
    var formData = new FormDataShim();
    formData.append('story_id', storyId);
    for (var key in inventory) {
        if (inventory[key]) {
            var data = inventory[key];
            if (inventory[key] instanceof stream.Readable) {
                inventory[key] = '';
                formData.append(key, data, 'test.jpg');
            }
            formData.append("inventory[" + key + "]", (inventory[key]) ? inventory[key] : '');
        }
    }
    return formData;
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
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").videoPlayer;
var Hls = null;
if (!Helpers_1.isNode()) {
    Hls = __webpack_require__(/*! hls.js/dist/hls.light.min */ "./node_modules/hls.js/dist/hls.light.min.js");
}
var ImposiumPlayer = /** @class */ (function (_super) {
    __extends(ImposiumPlayer, _super);
    function ImposiumPlayer(node, client, config) {
        if (config === void 0) { config = settings.defaultConfig; }
        var _this = _super.call(this, node) || this;
        _this.events = {
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
        _this.eventDelegateRefs = {
            play: { callback: null, native: true },
            pause: { callback: null, native: true },
            ended: { callback: null, native: true },
            error: { callback: null, native: true },
            seeked: { callback: null, native: true },
            timeupdated: { callback: null, native: true },
            volumechanged: { callback: null, native: true },
            muted: { callback: null, native: false },
            controlsset: { callback: null, native: false }
        };
        _this.hlsSupport = '';
        _this.singleFile = false;
        _this.hlsPlayer = null;
        _this.experienceCache = [];
        _this.clientRef = null;
        _this.ImposiumPlayerConfig = null;
        /*
            Assigns config
         */
        _this.init = function (config) {
            var defaultConfig = settings.defaultConfig;
            Helpers_1.prepConfig(config, defaultConfig);
            _this.ImposiumPlayerConfig = __assign({}, defaultConfig, config);
            for (var key in _this.ImposiumPlayerConfig) {
                if (_this.ImposiumPlayerConfig[key]) {
                    _this.node[key] = _this.ImposiumPlayerConfig[key];
                }
            }
        };
        /*
            Set a live stream or fallback to bandwidth checking / auto assigning a file
         */
        _this.experienceGenerated = function (experience) {
            var _a = _this, experienceCache = _a.experienceCache, hlsSupport = _a.hlsSupport, node = _a.node;
            var STREAM = ImposiumPlayer.compressionLevels.STREAM;
            var id = experience.id, videos = experience.output.videos;
            var hasStream = videos.hasOwnProperty(STREAM);
            var poster;
            if (experience.output.images) {
                poster = experience.output.images.poster;
            }
            _this.singleFile = false;
            _this.setExperienceId(id);
            experienceCache.push(experience);
            if (hasStream && hlsSupport) {
                _this.setPlayerData(videos[STREAM].url, poster);
            }
            else {
                var compressionKeys = Object.keys(videos);
                if (compressionKeys.length === 1) {
                    _this.singleFile = true;
                    _this.setPlayerData(videos[compressionKeys[0]].url, poster);
                }
                else {
                    _this.checkBandwidth(videos)
                        .then(function (compression) {
                        _this.setPlayerData(videos[compression].url, poster);
                    })
                        .catch(function (fallbackCompression) {
                        _this.setPlayerData(videos[fallbackCompression].url, poster);
                    });
                }
            }
        };
        /*
            Enable native or custom ImposiumPlayer events
         */
        _this.on = function (eventName, callback) {
            var eventDelegateRefs = _this.eventDelegateRefs;
            try {
                if (Helpers_1.isFunc(callback)) {
                    if (Helpers_1.keyExists(_this.events, eventName)) {
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
                ExceptionPipe_1.default.trapError(e);
            }
        };
        /*
            Disable native or custom ImposiumPlayer events
         */
        _this.off = function (eventName) {
            var eventDelegateRefs = _this.eventDelegateRefs;
            try {
                if (Helpers_1.keyExists(_this.events, eventName)) {
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
                ExceptionPipe_1.default.trapError(e);
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
        _this.seek = function (seekTo, retry) {
            if (retry === void 0) { retry = -1; }
            var duration = _this.node.duration;
            if (!isNaN(duration)) {
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
            var muted = _this.eventDelegateRefs.muted;
            _this.node.muted = mute;
            if (muted) {
                muted.callback();
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
            _this.ImposiumPlayerConfig = __assign({}, defaultConfig);
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
            else if (Hls.isSupported()) {
                _this.hlsSupport = HLSJS;
            }
        };
        /*
            Adapt quality manually if HLS cannot be supported
         */
        _this.checkBandwidth = function (videos) {
            var bandwidthRatings = ImposiumPlayer.bandwidthRatings, compressionLevels = ImposiumPlayer.compressionLevels, BANDWIDTH_SAMPLES = ImposiumPlayer.BANDWIDTH_SAMPLES;
            var testPromises = [];
            for (var i = 0; i < BANDWIDTH_SAMPLES; i++) {
                testPromises.push(API_1.default.checkBandwidth());
            }
            return new Promise(function (resolve, reject) {
                Promise.all(testPromises)
                    .then(function (speeds) {
                    var speed = Helpers_1.calculateAverageMbps(speeds);
                    var has1080 = (videos.hasOwnProperty(compressionLevels.HIGH));
                    if (speed >= bandwidthRatings.LOW && speed <= bandwidthRatings.MID) {
                        resolve(compressionLevels.MID);
                    }
                    else if (speed >= bandwidthRatings.MID && !has1080) {
                        resolve(compressionLevels.MID);
                    }
                    else if (speed >= bandwidthRatings.MID && has1080) {
                        resolve(compressionLevels.HIGH);
                    }
                })
                    .catch(function (e) {
                    reject(compressionLevels.LOW);
                });
            });
        };
        /*
            Set player data once video file was selected
         */
        _this.setPlayerData = function (videoSrc, posterSrc) {
            if (posterSrc === void 0) { posterSrc = null; }
            var _a = _this, hlsSupport = _a.hlsSupport, singleFile = _a.singleFile;
            var _b = ImposiumPlayer.hlsSupportLevels, NATIVE = _b.NATIVE, HLSJS = _b.HLSJS;
            if (hlsSupport === NATIVE || !hlsSupport || singleFile) {
                _this.node.src = videoSrc;
            }
            else if (hlsSupport === HLSJS) {
                if (_this.hlsPlayer) {
                    _this.hlsPlayer.destroy();
                }
                _this.hlsPlayer = new Hls();
                _this.hlsPlayer.attachMedia(_this.node);
                _this.hlsPlayer.loadSource(videoSrc);
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
            if (client) {
                client.setPlayer(_this);
                _this.init(config);
                _this.setupHls();
            }
            else {
                throw new Exceptions_1.PlayerConfigurationError('noClient', null);
            }
        }
        catch (e) {
            ExceptionPipe_1.default.trapError(e);
        }
        return _this;
    }
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
var Queue_1 = __webpack_require__(/*! ../analytics/Queue */ "./src/analytics/Queue.ts");
var Analytics_1 = __webpack_require__(/*! ../analytics/Analytics */ "./src/analytics/Analytics.ts");
var Helpers_1 = __webpack_require__(/*! ../scaffolding/Helpers */ "./src/scaffolding/Helpers.ts");
var Exceptions_1 = __webpack_require__(/*! ../scaffolding/Exceptions */ "./src/scaffolding/Exceptions.ts");
var settings = __webpack_require__(/*! ../conf/settings.json */ "./src/conf/settings.json").videoPlayer;
var VideoPlayer = /** @class */ (function () {
    /*
        Basis of Imposum/Fallback video player objects
     */
    function VideoPlayer(node) {
        var _this = this;
        this.node = null;
        this.mediaEvents = {
            loadstart: function () { return _this.onLoad(); },
            play: function () { return _this.onPlay(); },
            pause: function () { return _this.onPause(); },
            ended: function () { return _this.onEnd(); }
        };
        this.experienceId = '';
        this.gaProperty = '';
        this.prevPlaybackEvent = 0;
        this.deferredGaCalls = new Queue_1.default();
        /*
            Remove set events set on the supplied player reference
         */
        this.remove = function () {
            var _a = _this, mediaEvents = _a.mediaEvents, node = _a.node;
            for (var _i = 0, _b = Object.keys(mediaEvents); _i < _b.length; _i++) {
                var key = _b[_i];
                node.removeEventListener(key, mediaEvents[key]);
            }
        };
        /*
            Set the current GA property and flush the pre mature GA calls
         */
        this.setGaProperty = function (gaProperty) {
            var deferredGaCalls = _this.deferredGaCalls;
            _this.gaProperty = gaProperty;
            while (deferredGaCalls.peek()) {
                Analytics_1.default.send(deferredGaCalls.peek());
                deferredGaCalls.pop();
            }
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
            clearInterval(_this.playbackInterval);
            _this.playbackInterval = setInterval(function () { return _this.checkPlayback(); }, VideoPlayer.intervalRate);
        };
        /*
            Clear the interval on pause to ensure no false analytics calls occur
         */
        this.onPause = function () {
            var playbackInterval = _this.playbackInterval;
            clearInterval(playbackInterval);
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
        if (!Helpers_1.isNode()) {
            if (node instanceof HTMLVideoElement) {
                var mediaEvents = this.mediaEvents;
                this.node = node;
                for (var _i = 0, _a = Object.keys(mediaEvents); _i < _a.length; _i++) {
                    var key = _a[_i];
                    this.node.addEventListener(key, this.mediaEvents[key]);
                }
            }
            else {
                // Prop passed wasn't of type HTMLVideoElement
                throw new Exceptions_1.PlayerConfigurationError('invalidPlayerRef', null);
            }
        }
        else {
            // Cancels out initialization in NodeJS
            throw new Exceptions_1.EnvironmentError('node');
        }
    }
    VideoPlayer.intervalRate = settings.checkPlaybackRateMs;
    VideoPlayer.playbackEvents = settings.playbackEvents;
    return VideoPlayer;
}());
exports.default = VideoPlayer;


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_form_data__;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "isomorphic-ws":
/*!********************************!*\
  !*** external "isomorphic-ws" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_isomorphic_ws__;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
});
//# sourceMappingURL=imposium.js.map 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var jwt_decode = require("jwt-decode");
var Analytics_1 = require("../../analytics/Analytics");
var Helpers_1 = require("../../scaffolding/Helpers");
var settings = require('../../conf/settings.json').api;
var API = /** @class */ (function () {
    function API() {
    }
    API.baseURL = settings.base_url;
    /*
        Setup HTTP client defaults
     */
    API.setupAuth = function (authToken) {
        // Attempt to decode JWT format from authToken, fallback to hmac if call fails
        try {
            jwt_decode(authToken);
            axios_1.default.defaults.headers.common[settings.jwt] = authToken;
        }
        catch (e) {
            axios_1.default.defaults.headers.common[settings.hmac] = authToken;
        }
    };
    /*
        Wait async for GET /experience, resolve response data
     */
    API.getExperience = function (expId) {
        var get = axios_1.default.get;
        return new Promise(function (resolve, reject) {
            get(API.baseURL + "/experience/" + expId)
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
    API.postExperience = function (storyId, inventory, progress) {
        if (progress === void 0) { progress = null; }
        var doPostExperience = API.doPostExperience;
        var formData = Helpers_1.InventoryToFormData(storyId, inventory);
        var config = {
            onUploadProgress: (progress) ? function (e) { return progress(e); } : null,
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
        Make create experience POST request and resolve
     */
    API.doPostExperience = function (formData, config) {
        var post = axios_1.default.post;
        return new Promise(function (resolve, reject) {
            post(API.baseURL + "/experience", formData, config)
                .then(function (res) {
                var send = Analytics_1.default.send;
                var data = res.data;
                var id = data.id;
                send({
                    t: 'event',
                    ec: 'experience',
                    ea: 'created',
                    el: id
                });
                resolve(data);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /*
        Wait async for POST /experience/{expId}/trigger-event, resolve on success
     */
    API.invokeStream = function (expId, sceneId, actId) {
        var post = axios_1.default.post;
        return new Promise(function (resolve, reject) {
            var body = {
                exp_id: expId,
                scene_id: sceneId,
                act_id: actId
            };
            post(API.baseURL + "/experience/" + expId + "/trigger-event")
                .then(function (res) {
                resolve();
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /*
        Wait async for GET-ing GA tracking pixel, resolve on success
     */
    API.getGATrackingPixel = function (url) {
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: url,
                method: 'GET',
                transformRequest: [function (data, headers) {
                        delete headers.common[settings.jwt];
                        delete headers.common[settings.hmac];
                        return data;
                    }]
            })
                .then(function (res) {
                resolve();
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return API;
}());
exports.default = API;
//# sourceMappingURL=API.js.map
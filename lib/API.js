"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analytics_1 = require("./Analytics");
var apisauce_1 = require("apisauce");
var Helpers_1 = require("./Helpers");
var jwt_decode = require("jwt-decode");
var API = /** @class */ (function () {
    function API() {
    }
    API.http = null;
    API.baseURL = 'https://api.imposium.com';
    /*
        Setup HTTP client defaults
     */
    API.setupAuth = function (authToken) {
        var headers = null;
        // Attempt to decode JWT format from authToken, fallback to hmac if call fails
        try {
            jwt_decode(authToken);
            headers = { 'Authorization': authToken };
        }
        catch (e) {
            headers = { 'X-Imposium-Access-Key': authToken };
        }
        API.http = apisauce_1.create({ baseURL: API.baseURL, headers: headers });
    };
    /*
        Wait async for GET /experience, resolve response data
     */
    API.getExperience = function (expId) {
        var get = API.http.get;
        return new Promise(function (resolve, reject) {
            get("/experience/" + expId)
                .then(function (res) {
                var ok = res.ok, data = res.data;
                if (ok) {
                    resolve(data);
                }
                else {
                    reject();
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /*
        Wait async for POST /experience, resolve response data
     */
    API.postExperience = function (storyId, inventory, progress) {
        if (progress === void 0) { progress = null; }
        var post = API.http.post;
        var data = Helpers_1.invToFDGlobal(storyId, inventory);
        var config = (progress) ? { onUploadProgress: function (e) { return progress(e); } } : null;
        return new Promise(function (resolve, reject) {
            post('/experience', data, config)
                .then(function (res) {
                var ok = res.ok, data = res.data;
                if (ok) {
                    var send = Analytics_1.default.send;
                    var id = data.id;
                    send({
                        t: 'event',
                        ec: 'experience',
                        ea: 'created',
                        el: id
                    });
                    resolve(data);
                }
                else {
                    reject();
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /*
        Wait async for POST /experience/{expId}/trigger-event, resolve on success
     */
    API.invokeStream = function (expId, sceneId, actId) {
        var post = API.http.post;
        return new Promise(function (resolve, reject) {
            var body = {
                exp_id: expId,
                scene_id: sceneId,
                act_id: actId
            };
            post("/experience/" + expId + "/trigger-event")
                .then(function (res) {
                var ok = res.ok;
                if (ok) {
                    resolve();
                }
                else {
                    reject();
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return API;
}());
exports.default = API;
//# sourceMappingURL=API.js.map
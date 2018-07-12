"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormDataShim = require("form-data");
var Events_1 = require("./Events");
var clientSettings = require('../conf/settings.json').client;
// Log out warnings
exports.warnHandler = function (message) {
    console.warn("[IMPOSIUM-JS-SDK]\n" + message);
};
// Log out errors, call user defined err callback if set && critical
exports.errorHandler = function (error, trap) {
    if (trap === void 0) { trap = true; }
    var onError = Events_1.default.onError;
    if (onError && trap) {
        onError(error);
    }
    console.error("[IMPOSIUM-JS-SDK]\n" + error);
};
// Format error messages 
exports.formatError = function (message, prop) {
    return message.replace('[placeholder]', prop);
};
// Checks for NodeJS process data 
exports.isNode = function () {
    return (typeof process !== 'undefined' &&
        process + '' === '[object process]' &&
        typeof ((process || {}).versions || {}).node !== 'undefined');
};
// Pull out unneeded keys 
exports.prepConfig = function (config) {
    var validKeys = Object.keys(clientSettings);
    for (var key in config) {
        if (validKeys.indexOf(key) === -1) {
            delete config[key];
        }
    }
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
    return formData;
};
// Uses shimmed FormData lib, checks for Buffers when working in nodeJS to prep POST data
var invToFDShim = function (storyId, inventory) {
    var stream = require('stream');
    var formData = new FormDataShim();
    formData.append('story_id', storyId);
    for (var key in inventory) {
        var data = inventory[key];
        if (inventory[key] instanceof stream.Readable) {
            inventory[key] = '';
            formData.append(key, data, 'test.jpg');
        }
        formData.append("inventory[" + key + "]", (inventory[key]) ? inventory[key] : '');
    }
    return formData;
};
//# sourceMappingURL=Helpers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_data_1 = require("form-data");
var ImposiumEvents_1 = require("./ImposiumEvents");
// Uses browser based FormData library
exports.invToFDGlobal = function (storyId, inventory) {
    var formData = new FormData();
    formData.append('story_id', storyId);
    for (var key in inventory) {
        var data = inventory[key];
        if (data && data.type === 'file') {
            console.log(data);
            // Deal with HTML5 File inputs, only accept one currently
            var files = data.files;
            if (files.length > 0) {
                console.log(files);
                formData.append(key, files[0]);
            }
            else {
            }
        }
        else if (data && data instanceof Blob || data instanceof File) {
            // Deal with blobs && pre-parsed HTML5 File objects
            formData.append(key, data, 'inventory.png');
        }
        else {
            // Add values for other types
            formData.append("inventory[" + key + "]", data);
        }
    }
    return formData;
};
// Uses shimmed 
exports.invToFDShim = function (storyId, inventory) {
    var formData = new form_data_1.default();
    formData.append('story_id', storyId);
    for (var key in inventory) {
    }
};
exports.isNode = function () {
    return (typeof process === 'object' && process + '' === '[object process]');
};
exports.errorHandler = function (error) {
    var onError = ImposiumEvents_1.default.onError;
    if (onError) {
        onError(error);
    }
    console.error('[IMPOSIUM-JS-SDK]\n', error);
};
//# sourceMappingURL=Helpers.js.map
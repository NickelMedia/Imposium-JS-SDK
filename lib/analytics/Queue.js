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
//# sourceMappingURL=Queue.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Simple queue for storing URL strings
 */
var Queue = /** @class */ (function () {
    function Queue() {
        this.q = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.q.push(item);
    };
    Queue.prototype.pop = function () {
        this.q.splice(0, 1);
    };
    Queue.prototype.peek = function () {
        return this.q[0];
    };
    Queue.prototype.isEmpty = function () {
        return (this.q.length === 0);
    };
    Queue.prototype.isFull = function (max) {
        return (this.q.length < max);
    };
    Queue.prototype.getLength = function () {
        return this.q.length;
    };
    return Queue;
}());
exports.default = Queue;
//# sourceMappingURL=Queue.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CallFn = (function () {
    function CallFn(fn, thisArg, params) {
        if (fn === void 0) { fn = null; }
        if (thisArg === void 0) { thisArg = null; }
        if (params === void 0) { params = []; }
        this.fn = fn;
        this.params = params;
        this.thisArg = thisArg;
    }
    CallFn.prototype.set = function (fn, thisArg, params) {
        if (thisArg === void 0) { thisArg = null; }
        if (params === void 0) { params = []; }
        this.fn = fn;
        this.params = params;
        this.thisArg = thisArg;
    };
    CallFn.prototype.exc = function () {
        if (this.fn) {
            this.fn.apply(this.thisArg, this.params);
        }
    };
    return CallFn;
}());
__reflect(CallFn.prototype, "CallFn");

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalVar = (function () {
    function GlobalVar() {
        this.data = {
            canPlayTimes: 2,
            playTimes: 0,
            isWin: false,
            step: 0,
            fruit: 0,
            score: 0,
            stars: 0,
            prop: 0
        };
    }
    Object.defineProperty(GlobalVar.prototype, "$", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    GlobalVar.prototype.add = function (key, val) {
        this.data[key] = val;
    };
    return GlobalVar;
}());
__reflect(GlobalVar.prototype, "GlobalVar");
var global = global || new GlobalVar();

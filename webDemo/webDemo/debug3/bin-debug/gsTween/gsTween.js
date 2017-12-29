//import Tline = TimelineLite;
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tween = (function () {
    function Tween() {
        this.tl = new TimelineLite();
    }
    Tween.get = function (targt, conf) {
        var tw = new Tween();
        tw.target = targt;
        tw.conf = conf;
        return tw;
    };
    Tween.prototype.to = function (props, duration, ease) {
        for (var k in this.conf) {
            props[k] = this.conf[k];
        }
        if (ease) {
            props["ease"] = ease;
        }
        var tl = this.tl;
        tl.to(this.target, duration, props);
        return this;
    };
    Tween.prototype.call = function (fn, thisArg, params) {
        this.tl.call(fn, params, thisArg);
        return this;
    };
    Tween.prototype.delay = function (second) {
        this.tl.delay(second);
        return this;
    };
    Tween.prototype.add = function (value, position) {
        this.tl.add(value, position);
        return this;
    };
    Tween.prototype.paused = function (bool) {
        this.tl.paused(bool);
        return this;
    };
    Tween.prototype.pause = function () {
        this.tl.pause();
        return this;
    };
    Tween.prototype.wait = function (second) {
        this.tl.add(function () { }, second);
    };
    Tween.prototype.restart = function (includeDelay, suppressEvents) {
        this.tl.restart(includeDelay, suppressEvents);
        return this;
    };
    Tween.prototype.play = function () {
        this.tl.play();
        return this;
    };
    Tween.prototype.stop = function () {
        this.tl.stop();
        return this;
    };
    Tween.prototype.set = function (vars) {
        this.tl.set(this.target, vars);
        return this;
    };
    Tween.prototype.dispose = function () {
        this.tl.kill();
        GC(this);
    };
    return Tween;
}());
__reflect(Tween.prototype, "Tween");

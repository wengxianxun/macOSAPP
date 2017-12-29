var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QueueFn = (function () {
    function QueueFn(fn, time, tick, argArray) {
        this.fn = fn;
        this.time = time;
        this.tick = tick;
        this.handle = false;
        this.argArray = argArray;
    }
    return QueueFn;
}());
__reflect(QueueFn.prototype, "QueueFn");
var Queue = (function () {
    function Queue(thisArg, defautDelay) {
        this.once = false;
        this.targetThisArg = thisArg;
        this.callfns = [];
        this.timerPool = null;
        this.timeline = 0;
        this._timeline = 0;
        this._startTick = 0;
        this.totalTime = 0;
        this.defautDelay = defautDelay || 0.2;
        this.onStartHandle = new CallFn();
        this.onEndHandle = new CallFn();
        this.startDelay = 0;
        this._start = false;
        this._initEvent = false;
        this.startDelayFn = null;
        this.init();
        this.initEvent();
    }
    Queue.prototype.init = function () {
        this.callfns = [];
        this.timerPool = [];
        var delay = new QueueFn(function () {
        }, 0, 0, null);
        this.startDelayFn = delay;
        this.callfns.push(delay);
    };
    Queue.prototype.initEvent = function () {
        // var loop = game.loop;
        // if (!this._initEvent) {
        //     // var animationLoop = new AnimationLoop(render,stage);
        //     loop.on('prerender',this._enterFrameHandle,this);
        // }
        //egret
        game.stage.addEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandle, this);
    };
    ;
    Queue.prototype.addChild = function (fn, time_s, argArray) {
        if (typeof fn != "function")
            return;
        time_s = time_s || this.defautDelay;
        var fno = new QueueFn(fn, time_s, this.getTimeLine(), argArray);
        //总时间轴增加
        this.timeline += time_s;
        this.callfns.push(fno);
        return this;
    };
    Queue.prototype.delay = function (time_s) {
        this.addChild(function () { }, time_s, null);
        return this;
    };
    Queue.prototype.wait = function (time_ms) {
        return this.delay(time_ms / 1000);
    };
    Queue.prototype.call = function (fn, time_ms, argArray) {
        return this.addChild(fn, time_ms / 1000, argArray);
    };
    Queue.prototype.setOnce = function (bool) {
        this.once = !!bool;
        return this;
    };
    Queue.prototype.getTimeLine = function () {
        this.timeline = 0;
        for (var x = 0; x < this.callfns.length; x++) {
            this.timeline += this.callfns[x].time || 0;
        }
        return this.timeline;
    };
    ;
    Queue.prototype.getTotalTime = function () {
    };
    ;
    Queue.prototype.removeChild = function (fn) {
    };
    ;
    Queue.prototype.setStartDelay = function (value) {
        this.startDelay = parseInt(value);
        this.startDelayFn.time = this.startDelay;
        return this;
    };
    ;
    Queue.prototype.start = function () {
        // if (this.startDelay > 0) {
        //     tx.Timer.setTimeout(this.startDelay, this._startHandle, null, this)
        // } else {
        this._startHandle();
        // }
        return this;
    };
    ;
    Queue.prototype.stop = function () {
        this._start = false;
        return this;
    };
    ;
    Queue.prototype._startHandle = function () {
        this._start = true;
        this._startTick = egret.getTimer();
    };
    ;
    Queue.prototype._endHandle = function () {
        this.onEndHandle.exc();
        if (this.once)
            this.dispose();
    };
    ;
    Queue.prototype._onHandle = function (tl) {
        var fnO = this.getCurFn(this._timeline);
        if (!fnO)
            return;
        if (fnO === this.callfns[0])
            this.onStartHandle.exc();
        fnO.fn.apply(this.targetThisArg, fnO.argArray);
        fnO.handle = true;
    };
    ;
    Queue.prototype._enterFrameHandle = function (e) {
        if (!this._start)
            return;
        // this._timeline += time.delta;
        this._timeline = (egret.getTimer() - this._startTick) / 1000;
        this._onHandle(this._timeline);
        if (this.callfns && this.callfns[this.callfns.length - 1].handle) {
            this._start = false;
            this._endHandle();
        }
    };
    ;
    Queue.prototype.getCurFn = function (curTime) {
        var index = -1;
        for (var i = 0; i < this.callfns.length; i++) {
            if (!this.callfns[i].handle && curTime >= this.callfns[i].tick) {
                index = i;
                break;
            }
        }
        return index > -1 ? this.callfns[index] : false;
    };
    ;
    Queue.prototype.onEnd = function (fn, thisArg, params) {
        if (params === void 0) { params = []; }
        this.onEndHandle.set(fn, thisArg, params);
        return this;
    };
    ;
    Queue.prototype.onStart = function (fn, thisArg, params) {
        if (params === void 0) { params = []; }
        this.onStartHandle.set(fn, thisArg, params);
        return this;
    };
    ;
    Queue.prototype.reset = function () {
        this._timeline = 0;
        this._startTick = egret.getTimer();
        for (var x = 0; x < this.callfns.length; x++) {
            this.callfns[x].handle = false;
        }
    };
    ;
    Queue.prototype.restart = function () {
        this.stop();
        this.reset();
        this.initEvent();
        this._start = true;
    };
    ;
    Queue.prototype.dispose = function () {
        this.stop();
        this.callfns = [];
        // var loop = game.loop;
        //     loop.off('prerender', this._enterFrameHandle,this);
        game.stage.removeEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandle, this);
        GC(this);
    };
    ;
    Queue.once = function (thisArg) {
        var ql = new Queue(thisArg, 0);
        ql.setOnce(true).start();
        return ql;
    };
    return Queue;
}());
__reflect(Queue.prototype, "Queue");

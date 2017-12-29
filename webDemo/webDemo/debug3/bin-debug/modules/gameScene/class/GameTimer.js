var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameTimer = (function () {
    function GameTimer(time) {
        this.$ = {};
        this.callback = new CallFn();
        this.totalTime = 120;
        this.time = 120;
        this.val = 1000;
        this.totalTime = time;
        var layout = {
            name: "TIMER",
            x: 249,
            y: 450,
            lib: "Layout", children: [
                Painter.createLayout("Img", { res: "uiSheet|timerBg", x: 0, y: 0 }, "timerBg"),
                Painter.createLayout("Img", { res: "uiSheet|timerBar", x: 0, y: 0 }, "timer"),
                Painter.createLayout("Img", { res: "uiSheet|timerbox", x: 0, y: 0 }, "timerBox"),
                Painter.createLayout("BitText", { res: "font_fnt", x: 70, y: -26, text: TimeForm_MMSS(this.totalTime), space: 2 }, "txt"),
            ]
        };
        this.ui = Painter.instance.readLayout(layout, game.stage);
        var mask = new egret.Shape();
        game.stage.addChild(mask);
        this.mask = mask;
        this.setTween();
        this.$["timeIcon"] = this.ui.find("timer");
        this.$["txt"] = this.ui.find("txt");
        var sk = this.$["timeIcon"].skin;
        mask.x = sk.x;
        mask.y = sk.y;
        this.$["timeIcon"].skin.mask = mask;
        //创建一个计时器对象
        var timer = new egret.Timer(1000, this.totalTime);
        this.timer = timer;
        this.initEvent();
    }
    GameTimer.prototype.timerFunc = function (e) {
        var n = e.target.currentCount;
        // console.log("计时",n);
        this.time = this.totalTime - n;
        this.$["txt"].text = TimeForm_MMSS(this.time);
        e.updateAfterEvent();
    };
    GameTimer.prototype.timerComFunc = function (e) {
        // console.log("计时 over");
        this.callback.exc();
    };
    GameTimer.prototype.setTween = function () {
        var o = { val: 0 };
        this.tweenFn(o);
        this.tw = Tween.get(o, { onUpdate: function () { this.tweenFn(o); }, onUpdateScope: this })
            .to({ val: 360 }, this.totalTime)
            .call(function () {
            this.tw.stop();
        }, this);
        // this.tw.paused(false);
        // this.tw.restart();
        this.tw.pause();
    };
    GameTimer.prototype.tweenFn = function (o) {
        //this mask
        var gs = this.mask.graphics, rad = -Math.PI / 2;
        var center = { x: 0, y: 0 }, radius = 70;
        gs.clear();
        gs.beginFill(0x000000, 1);
        gs.moveTo(center.x, center.y);
        gs.lineTo(center.x, radius);
        gs.drawArc(center.x, center.y, radius, rad, rad + Math.PI * (o.val / 180), false);
        gs.lineTo(center.x, center.y);
        gs.endFill();
        // this.$["timeIcon"].mask=this.mask;
    };
    GameTimer.prototype.initEvent = function () {
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    GameTimer.prototype.onTimeUsedUp = function (fn, thisArg, params) {
        this.callback.set(fn, thisArg, params);
    };
    GameTimer.prototype.start = function () {
        //
        this.tw.paused(false);
        this.tw.play();
        this.timer.start();
    };
    GameTimer.prototype.pause = function () {
        this.tw.pause();
        this.timer.stop();
    };
    GameTimer.prototype.stop = function () {
        this.tw.stop();
        this.timer.stop();
    };
    GameTimer.prototype.reStart = function () {
        this.timer.reset();
        this.timer.start();
        this.$["txt"].text = TimeForm_MMSS(60);
        this.tw.restart();
    };
    return GameTimer;
}());
__reflect(GameTimer.prototype, "GameTimer");

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Bezier2 = (function () {
    // private  line;
    function Bezier2(target, time, p0, p1, p2) {
        this.isStart = false;
        this.p0 = { x: 100, y: 100 };
        this.p1 = { x: 150, y: 30 };
        this.p2 = { x: 200, y: 100 };
        this.endHandle = new CallFn();
        this.target = target;
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.time = time;
        // this.line=new egret.Shape();
        // let gs=this.line.graphics;
        // gs.lineStyle(2,0xff0000,.8,false)
        // game.stage.addChild(this.line);
    }
    Bezier2.prototype.start = function () {
        if (this.isStart)
            return;
        this.isStart = true;
        // let gs=this.line.graphics;
        // gs.moveTo(this.p0.x,this.p0.y);
        // gs.lineTo(this.p0.x,this.p0.y);
        egret.Tween.get(this).to({ factor: 1 }, this.time).call(function () {
            this.isStart = false;
            this.dispose();
            this.endHandle.exc();
        }, this);
        return this;
    };
    Bezier2.prototype.stop = function () {
        egret.Tween.removeTweens(this);
        this.p1 = null;
        this.p2 = null;
        this.p0 = null;
        this.isStart = false;
        return this;
    };
    Bezier2.prototype.onEnd = function (fn, thisArg, params) {
        if (params === void 0) { params = []; }
        this.endHandle.set(fn, thisArg, params);
        return this;
    };
    Bezier2.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this.target = null;
        // if(this.line){
        //     this.line.parent.removeChild(this.line)
        //     this.line=null;
        // }
    };
    Object.defineProperty(Bezier2.prototype, "factor", {
        //添加factor的set,get方法,注意用public
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式
        set: function (value) {
            var target = this.target, p0 = this.p0, p1 = this.p1, p2 = this.p2;
            target.x = (1 - value) * (1 - value) * p0.x + 2 * value * (1 - value) * p1.x + value * value * p2.x;
            target.y = (1 - value) * (1 - value) * p0.y + 2 * value * (1 - value) * p1.y + value * value * p2.y;
            // console.log("target.y",target.y)
            // let gs=this.line.graphics;
            // gs.lineTo( target.x, target.y);
        },
        enumerable: true,
        configurable: true
    });
    Bezier2.set = function (target, time, p0, p1, p2) {
        return new Bezier2(target, time, p0, p1, p2).start();
    };
    return Bezier2;
}());
__reflect(Bezier2.prototype, "Bezier2");

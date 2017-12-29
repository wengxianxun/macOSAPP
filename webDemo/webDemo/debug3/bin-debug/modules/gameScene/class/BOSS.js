var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BOSS = (function () {
    function BOSS(hp) {
        this.aniEnd = true;
        this.status = 0; ///0 normal 1 death
        this.callBack = new CallFn();
        this.hp = 60;
        this.totalHp = hp;
        this.hp = hp;
        var layout = {
            name: "boss",
            res: "boosJSON1|boosPng1|ani",
            x: 360,
            y: 350,
            lib: "Mc", children: []
        };
        this.ui = Painter.instance.readLayout(layout, game.stage);
        this.boss = this.ui.skin;
        // this.boss.rotation=60;
        this.boss.gotoAndPlay("normal", -1);
        this.ui.trySet({ scaleX: 1.6, scaleY: 1.6, anchorOffsetX: 175, anchorOffsetY: 238 }, this.boss);
        var bar = new BloodBar();
        bar.setTotalValue(this.hp);
        bar.setValue(this.hp);
        this.bar = bar;
        // let mask=this.initMask();
        // mask.x=360-mask.width/2;
        // // mask.y=this.boss.height/2;
        // this.boss.mask=mask;
        // game.msk=mask;
        //创建一个计时器对象
        var timer = new egret.Timer(300, 1000000);
        this.updateTimer = timer;
        this.initEvent();
        this.updateTimer.start();
    }
    BOSS.prototype.initMask = function () {
        var mask = new egret.Shape();
        game.stage.addChild(mask);
        var gs = mask.graphics, rad = -Math.PI / 2;
        var w = 358 * 1.6, h = 287 * 1.6, s1 = 180, h1 = 140, points = [
            { x: w, y: 0 },
            { x: w, y: h },
            { x: w - s1, y: h },
            { x: w - s1, y: h - h1 },
            { x: s1, y: h - h1 },
            { x: s1, y: h },
            { x: 0, y: h },
            { x: 0, y: 0 },
        ];
        gs.beginFill(0x000000, 1);
        for (var i = 0; i < points.length; i++) {
            var p_1 = points[i];
            // gs.moveTo(center.x, center.y);
            gs.lineTo(p_1.x, p_1.y);
        }
        gs.endFill();
        return mask;
    };
    BOSS.prototype.initEvent = function () {
        game.stage.addEventListener("HurtBoss", this.hurted, this);
        this.boss.addEventListener(egret.Event.COMPLETE, this.hurtedActionEnd, this);
        this.updateTimer.addEventListener(egret.TimerEvent.TIMER, this.updateBlood, this);
    };
    BOSS.prototype.updateBlood = function () {
        if (this.status == 1)
            return;
        if (this.hp > 0 && this.hp < this.bar.curVal) {
            this.bar.setValue(this.hp);
        }
        else if (this.hp <= 0) {
            this.bar.setValue(0);
            this.status = 1;
        }
    };
    BOSS.prototype.death = function () {
        this.status = 1;
        this.ui.res = "boosJSON2|boosPng2|ani";
        try {
            this.boss.stop();
            this.boss.gotoAndPlay("death", 100);
            egret.Tween.get(this.boss)
                .set({ rotation: 0 })
                .wait(1600)
                .to({ rotation: 150, alpha: 0 }, 900);
        }
        catch (e) {
            // console.log("boss erro",e)
        }
        this.bar.setValue(0);
        this.callBack.exc();
        //this.boss.gotoAndPlay("hurt",1)
    };
    BOSS.prototype.hurted = function () {
        this.hp--;
        if (this.hp <= 0) {
            if (this.status == 0)
                this.death();
        }
        if (!this.aniEnd)
            return;
        this.aniEnd = false;
        if (this.hp <= 0) {
            // this.death()
        }
        else {
            egret.setTimeout(function () {
                // this.aniEnd=true;
            }, this, 300);
            this.boss.gotoAndPlay("hurt", 1);
        }
    };
    BOSS.prototype.hurtedActionEnd = function () {
        if (this.aniEnd || this.status == 1)
            return;
        this.aniEnd = true;
        this.boss.gotoAndPlay("normal", -1);
    };
    BOSS.prototype.onBOSSDeath = function (fn, thisArg, params) {
        this.callBack.set(fn, thisArg, params);
    };
    BOSS.prototype.reBorn = function () {
        this.hp = this.totalHp;
        this.boss.visible = true;
        this.boss.alpha = 1;
        this.boss.rotation = 0;
        this.ui.res = "boosJSON1|boosPng1|ani";
        this.boss.gotoAndPlay("normal", -1);
        this.status = 0;
        this.bar.setTotalValue(this.hp);
        this.bar.setValue(this.hp);
        this.aniEnd = true;
    };
    return BOSS;
}());
__reflect(BOSS.prototype, "BOSS");

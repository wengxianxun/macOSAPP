/**
 * Created by ccbear on 2017/11/22.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.effectPool = {};
        Painter.getInstance();
        _this.initBoxBg();
        _this.elimateCom = new ElimateScene();
        var bs = new BOSS(60);
        bs.onBOSSDeath(_this.gameEnd, _this, [1]);
        _this.boss = bs;
        var timer = new GameTimer(60);
        timer.onTimeUsedUp(_this.timeUsedUp, _this);
        _this.uiTimer = timer;
        var pos = { x: _this.elimateCom.box.x, y: _this.elimateCom.box.y }, layout = {
            name: "gameScenView",
            x: 0,
            y: 0,
            lib: "Layout",
            children: [
                Painter.createLayout("Button", { res: "uiSheet|Download", x: game.stage.stageWidth / 2, y: game.stage.stageHeight - 80 }, "downLoad"),
                Painter.createLayout("Layout", { x: 0, y: 0 }, "fruit").set("isContainer", true),
                Painter.createLayout("Layout", { x: 0, y: 0 }, "explo").set("isContainer", true),
            ]
        };
        _this.ui = Painter.instance.readLayout(layout, game.stage);
        var btnd = _this.ui.find("downLoad");
        btnd.skin.visible = false;
        setTimeout(function () {
            if (btnd.skin) {
                btnd.skin.visible = true;
            }
        }, 1000 * 10);
        _this.btnDownLoad = btnd;
        btnd.onClick(function () {
            DIR.report(DIREventName.download_end_card);
            myDownload();
        }, _this);
        _this.initEvent();
        _this.loadAsset();
        _this.effectPool["fruit"] = new EffectPool("fruit");
        _this.effectPool["explo"] = new EffectPool("explo");
        _this.effectPool["hx"] = new EffectPool("hx");
        _this.effectPool["boom"] = new EffectPool("boom");
        //初始化动画效果资源
        Queue.once(_this)
            .wait(500)
            .call(function () {
            ["exploJSON|exploPng|ani", "hxJSON|hxPng|ani", "boomJSON|boomPng|ani"].forEach(function (str) {
                predull(str);
            });
        });
        return _this;
    }
    GameScene.prototype.initBoxBg = function () {
        var bgx = this.createBitmapByResName("bg_jpg");
        game.stage.addChild(bgx);
    };
    GameScene.prototype.loadAsset = function () {
        // RES.loadGroup("timeFont");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        setTimeout(function () {
            RES.loadGroup("gaming_boss");
        }, 1000);
    };
    GameScene.prototype.initEvent = function () {
        // game.stage.addEventListener("exploEffect",this.exploPlay,this);
        game.stage.addEventListener("exploEffect", this.fruitExplo, this);
        // game.stage.addEventListener("exploEffect", this.hxPlay, this);
        game.stage.addEventListener("hxEffect", this.hxPlay, this);
        game.stage.addEventListener("boomEffect", this.boomPlay, this);
        game.addEventListener("startPlay", this.PlayHandle, this);
        game.addEventListener("rePlay", this.rePlayHandle, this);
        game.addEventListener("endPlayHappy", this.endPlayHappy, this);
        game.addEventListener("gamePause", this.gamePause, this);
        game.addEventListener("gameResume", this.gameResume, this);
    };
    GameScene.prototype.gamePause = function () {
        this.uiTimer.pause();
    };
    GameScene.prototype.gameResume = function () {
        if (!this.isGameEnd) {
            this.uiTimer.start();
        }
    };
    /**
     * 游戏结束,进行随机转换道具
     * */
    GameScene.prototype.endPlayHappy = function () {
        this.elimateCom.endPlayHappy();
        var ql = new Queue(this);
        ql.delay(3)
            .addChild(function () {
            // game.dispatchEventWith("showResult");
        }, 1).start();
        if (global.$["isWin"]) {
            var time = this.uiTimer.time, stars = 1;
            if (time >= 24) {
                stars = 3;
            }
            else if (time >= 12) {
                stars = 2;
            }
            else {
                stars = 1;
            }
            global.$["stars"] = stars;
        }
    };
    GameScene.prototype.PlayHandle = function () {
        this.elimateCom.play();
        this.uiTimer.start();
        // this.boss.reBorn();
    };
    GameScene.prototype.rePlayHandle = function () {
        this.isGameEnd = false;
        this.elimateCom.rePlay();
        this.uiTimer.reStart();
        this.boss.reBorn();
    };
    GameScene.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "gaming_boss") {
            predull("boosJSON2|boosPng2|ani");
        }
    };
    /**
     * 水果漂浮效果层
     * */
    GameScene.prototype.flyingFruit = function (e) {
        if (this.isGameEnd)
            return;
        var pos = this.getPositionByRc(e.data.row, e.data.col);
        var container = this.ui.find("fruit").container;
        var pool = this.effectPool["fruit"];
        var mc = pool.getEffect();
        if (!mc && pool.len < 40) {
            var la = Painter.createLayout("Img", { res: "elems_sheet|fruit_01_01", x: 0, y: 0 }, "bg");
            mc = Painter.instance.readLayout(la, container);
            pool.add(mc);
            mc.used = true;
        }
        if (mc) {
            // let types = ["fruit_01_01", "fruit_02_01", "fruit_03_01", "fruit_04_01", "fruit_05_01", "fruit_06_01"],
            var tex = e.data.tex;
            mc.res = "elems_sheet|" + tex;
            mc.x = pos.x;
            mc.y = pos.y;
            var bossPos_1 = { x: this.boss.ui.x, y: this.boss.ui.y - 100 }, aniTime = 600;
            egret.Tween.get(mc.skin)
                .set({ visible: true, alpha: 0.8 })
                .to({ scleX: 1.2, scaleY: 1.2 }, aniTime * 0.65, egret.Ease.circOut)
                .to({ scleX: 0.8, scaleY: 0.8 }, aniTime * 0.35, egret.Ease.circIn);
            new Bezier2(mc.skin, aniTime, { x: pos.x, y: pos.y }, { x: pos.x > 360 ? pos.x + 140 : pos.x - 140, y: pos.y + 340 }, bossPos_1)
                .onEnd(function () {
                game.stage.dispatchEventWith("HurtBoss");
                egret.Tween.get(mc.skin).to({
                    alpha: 0.3,
                    x: bossPos_1.x + RandInt(-200, 200),
                    y: bossPos_1.y + RandInt(-200, 40)
                }, 160 + 100 * Math.random())
                    .call(function () {
                    mc.skin.visible = false;
                    mc.used = false;
                });
            }, this)
                .start();
        }
    };
    /**
     * 水果消除产生果汁
     * */
    GameScene.prototype.fruitExplo = function (e) {
        var pos = this.getPositionByRc(e.data.row, e.data.col);
        var pool = this.effectPool["explo"];
        var mc = pool.getEffect();
        var container = this.ui.find("fruit").container;
        if (!mc && pool.len < 40) {
            var la = Painter.createLayout("Mc", { res: "exploJSON|exploPng|ani", x: 0, y: 0, scale: { x: 1.5, y: 1.5 } });
            mc = Painter.instance.readLayout(la, container);
            pool.add(mc);
            mc.used = true;
            mc.trySet({
                frameRate: 10,
                anchorOffsetX: 42,
                anchorOffsetY: 40,
                scaleX: 1.5,
                scaleY: 1.5,
            }, mc.skin);
        }
        var color = ["red", "green", "blue", "yellow", "purple", "orange"];
        if (mc) {
            mc.x = pos.x;
            mc.y = pos.y;
            mc.skin.gotoAndPlay(color[e.data.type] || "yellow", 1);
            mc.skin.visible = true;
            //
            // mc.filters = [this.colorFlilter];
        }
        this.flyingFruit(e);
    };
    /**
     * 横竖消除特效
     * */
    GameScene.prototype.hxPlay = function (e) {
        var pos = this.getPositionByRc(e.data.row, e.data.col);
        var container = this.ui.find("explo").container;
        var dir = e.data.dir;
        var pool = this.effectPool["hx"];
        var mc = pool.getEffect();
        if (!mc && pool.len < 40) {
            var la = Painter.createLayout("Mc", { res: "hxJSON|hxPng|ani", x: 0, y: 0 });
            mc = Painter.instance.readLayout(la, container);
            pool.add(mc);
            mc.used = true;
            mc.trySet({
                frameRate: 20,
                anchorOffsetX: 342,
                anchorOffsetY: 73,
                scaleX: 2,
                scaleY: 2,
            }, mc.skin);
        }
        if (mc) {
            var skin = mc.skin;
            mc.x = pos.x;
            mc.y = pos.y;
            skin.rotation = (dir ? 90 : 0);
            skin.gotoAndPlay(1);
            skin.visible = true;
        }
    };
    /**
     * L型消除特效
     * */
    GameScene.prototype.boomPlay = function (e) {
        var pos = this.getPositionByRc(e.data.row, e.data.col);
        var pool = this.effectPool["boom"];
        var mc = pool.getEffect();
        var container = this.ui.find("explo").container;
        if (!mc && pool.len < 40) {
            var la = Painter.createLayout("Mc", { res: "boomJSON|boomPng|ani", x: 0, y: 0 });
            mc = Painter.instance.readLayout(la, container);
            pool.add(mc);
            mc.used = true;
            mc.trySet({
                frameRate: 20,
                anchorOffsetX: 214,
                anchorOffsetY: 214,
                scaleX: 2,
                scaleY: 2,
            }, mc.skin);
        }
        if (mc) {
            var skin = mc.skin;
            mc.x = pos.x;
            mc.y = pos.y;
            skin.gotoAndPlay(1);
            skin.visible = true;
        }
    };
    GameScene.prototype.timeUsedUp = function () {
        // let x=RandInt(1,100)>50;
        // Scene.gotoScene(ResultScene);
        this.gameEnd(0);
    };
    GameScene.prototype.gameEnd = function (isWin) {
        this.isGameEnd = true;
        global.$["isWin"] = !!isWin;
        this.elimateCom.setGameEnd();
        this.uiTimer.stop();
        if (isWin) {
            // console.log("win the game");
        }
        else {
        }
        var ql = new Queue(this)
            .delay(2)
            .addChild(function () {
            Scene.addScene(ResultScene);
            ql.dispose();
        }).start();
    };
    GameScene.prototype.getPositionByRc = function (row, col) {
        return {
            x: col * marginX + this.elimateCom.offsetX + this.elimateCom.box.x,
            y: row * -marginY + this.elimateCom.box.y + this.elimateCom.offsetY
        };
    };
    GameScene.prototype.dispose = function () {
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");

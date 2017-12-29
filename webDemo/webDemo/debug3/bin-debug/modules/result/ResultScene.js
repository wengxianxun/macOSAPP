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
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        var _this = _super.call(this) || this;
        _this.scord = 58418;
        _this.isWin = true;
        _this.createView();
        return _this;
    }
    ResultScene.prototype.createView = function () {
        // let container=new egret.Sprite();
        // this.ui=container;
        //
        var gw = game.stage.stageWidth, gh = game.stage.stageHeight;
        var layout = {
            name: "resultView",
            isContainer: true,
            x: 0,
            y: 0,
            lib: "Layout",
            children: [
                Painter.createLayout("Img", { x: gw / 2, y: gh / 2, w: gw, h: gh }, "mask"),
            ]
        };
        this.ui = Painter.instance.readLayout(layout, game.stage);
        this.initEvent();
        // console.log("result scene");
        //试玩次数增加
        global.$["playTimes"]++;
        if (global.$["isWin"]) {
            this.winUI();
        }
        else {
            this.resultUI(global.$["isWin"]);
        }
    };
    ResultScene.prototype.initEvent = function () {
        game.addEventListener("showResult", this.resultUI, this);
        game.addEventListener("rePlay", this.rePlayHandle, this);
    };
    ResultScene.prototype.winUI = function () {
        var layout = {
            name: "winView",
            x: 360,
            y: -200,
            lib: "Layout", children: [
                Painter.createLayout("Img", { res: "title_png", x: 20, y: 0 }, "title"),
            ]
        };
        this.layout = Painter.instance.readLayout(layout, this.ui.container);
        this.ui.addChild(this.layout);
        var title = this.layout.find("title").skin;
        var b2 = new Bezier2(title, 600, { x: 200, y: -100 }, { x: 350, y: -300 }, { x: 360, y: 700 });
        b2.start();
        var scale1 = 0.95, scale2 = 1.05;
        egret.Tween.get(title, { loop: true })
            .set({ scaleY: scale1, scaleX: scale2 })
            .to({ scaleY: scale2, scaleX: scale1 }, 2000, egret.Ease.sineInOut)
            .to({ scaleY: scale1, scaleX: scale2 }, 2000, egret.Ease.sineInOut);
        egret.Tween.get(title)
            .set({ alpha: 0.2, scaleY: 0.2, scaleX: 0.2 })
            .to({ alpha: 1, scaleY: 1, scaleX: 1 }, 600, egret.Ease.backInOut)
            .wait(1000 * 3)
            .call(function () {
            this.hideWinTips();
            game.dispatchEventWith("endPlayHappy");
            // console.log("endPlayHappy ---start ")
        }, this);
        // .call(this.resultUI,this);
    };
    ResultScene.prototype.hideWinTips = function () {
        this.ui.find("winView").dispose();
        this.ui.find("mask").sharp.alpha = 0.01;
    };
    ResultScene.prototype.resultUI = function (isWin) {
        var layout = {
            name: "resultPage",
            isContainer: true,
            x: 23,
            y: 524,
            lib: "Layout",
            children: [
                Painter.createLayout("Img", { res: "uiSheet|panel2", x: 0, y: 0, w: 674, h: 408, s9Grid: "70,70,10,10" }, "bg"),
                Painter.createLayout("Img", { res: "uiSheet|text_fail", x: 360 - 23, y: 135, text: "真可惜,下次努力吧!" }, "txt"),
                Painter.createLayout("Layout", { x: (674 - 320) / 2, y: 120 }, "starBg").set("children", [
                    Painter.createLayout("Img", { res: "uiSheet|star_bg", x: 0, y: 0 }),
                    Painter.createLayout("Img", { res: "uiSheet|star_bg", x: 160, y: 0 }),
                    Painter.createLayout("Img", { res: "uiSheet|star_bg", x: 320, y: 0 }),
                ]),
                Painter.createLayout("Layout", { x: (674 - 320) / 2, y: 120 }, "starList").set("children", [
                    Painter.createLayout("Img", { res: "uiSheet|star", x: 0, y: 0 }, "star1"),
                    Painter.createLayout("Img", { res: "uiSheet|star", x: 160, y: 0 }, "star2"),
                    Painter.createLayout("Img", { res: "uiSheet|star", x: 320, y: 0 }, "star3"),
                ]),
                Painter.createLayout("Button", { res: "uiSheet|btn_again", x: 189, y: 305 }, "btn1"),
                Painter.createLayout("Button", { res: "uiSheet|btn_next", x: 484, y: 305 }, "btn2"),
            ]
        };
        this.layout = Painter.instance.readLayout(layout, this.ui.container);
        debug("keymove", this.layout);
        this.ui.addChild(this.layout);
        this.ui.find("mask").sharp.alpha = 1;
        debug("text", this.ui.find("txt"));
        var btn1 = this.layout.find("btn1"), btn2 = this.layout.find("btn2");
        btn1.onClick(this.again);
        btn2.onClick(this.download);
        if (global.$["playTimes"] >= global.$["canPlayTimes"]) {
            //隐藏按钮
            btn1.skin.visible = false;
            btn2.x = 336;
        }
        else {
            DIR.report(DIREventName.replay_show);
            DIR.reportPlayTime(DIREventName.play_time);
        }
        if (isWin) {
            this.layout.find("txt").skin.visible = false;
            var stars = global.$["stars"];
            var starsGr = this.layout.find("starList");
            for (var i = 0; i < starsGr.children.length; i++) {
                var skin = starsGr.children[i].skin;
                if (i < stars) {
                    skin.visible = true;
                    var pos = { x: skin.x, y: skin.y };
                    egret.Tween.get(skin)
                        .set({ scaleX: 4, scaleY: 4, alpha: 0 })
                        .wait(i * 300 + 200)
                        .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, egret.Ease.backOut);
                }
                else {
                    skin.visible = false;
                }
            }
        }
        else {
            this.layout.find("starBg").visible = false;
            this.layout.find("starList").visible = false;
            btn2.res = "uiSheet|btn_xz";
        }
        DIR.report(DIREventName.end_card_show);
        DIR.reportPlayTime(DIREventName.play_time);
    };
    ResultScene.prototype.again = function () {
        // console.log("再来一次");
        // this.rePlay();
        game.dispatchEventWith("rePlay");
        DIR.report(DIREventName.click_replay);
        DIR.reportPlayTime(DIREventName.play_time);
    };
    //
    // rePlay(){
    //     game.dispatchEventWith("rePlay");
    // }
    ResultScene.prototype.rePlayHandle = function () {
        egret.Tween.get(this.ui.container).to({ alpha: 0 }, 120)
            .call(function () {
            this.dispose();
        }, this);
    };
    ResultScene.prototype.download = function () {
        DIR.report(DIREventName.download_end_card);
        myDownload();
    };
    return ResultScene;
}(Scene));
__reflect(ResultScene.prototype, "ResultScene");

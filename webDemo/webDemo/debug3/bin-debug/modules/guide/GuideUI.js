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
var GuideUI = (function (_super) {
    __extends(GuideUI, _super);
    function GuideUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        _this.ease();
        return _this;
    }
    GuideUI.prototype.createView = function () {
        this.ui = new egret.Sprite();
        game.stage.addChild(this.ui);
        var stageW = game.stage.stageWidth;
        var stageH = game.stage.stageHeight;
        var x = stageW / 2, y = stageH - 180;
        this.initMask(stageW, stageH);
        var tip = new egret.Sprite(), uisheet = RES.getRes("uiSheet");
        tip.x = 0;
        tip.y = 610;
        tip.alpha = 0.1;
        var panel = new egret.Bitmap();
        panel.texture = uisheet.getTexture("panle1");
        panel.width = stageW + 40;
        panel.x = -20;
        panel.y = 0;
        tip.addChild(panel);
        var icon = new egret.Bitmap();
        icon.texture = uisheet.getTexture("icon");
        icon.x = 105;
        icon.y = 23;
        tip.addChild(icon);
        var text = new egret.TextField();
        text.width = 400;
        text.height = 50;
        text.size = 40;
        text.bold = true;
        text.textColor = 0x71330f;
        text.text = "赶走捣乱的大猩猩！";
        text.x = 287;
        text.y = 70;
        tip.addChild(text);
        this.ui.addChild(tip);
        this.tip = tip;
    };
    GuideUI.prototype.initMask = function (w, h) {
        var boxbg = new egret.Shape();
        boxbg.graphics.beginFill(0x000000, 0.4);
        boxbg.graphics.drawRect(0, 0, w, h);
        boxbg.graphics.endFill();
        boxbg.touchEnabled = true;
        this.ui.addChild(boxbg);
        this.maskUI = boxbg;
    };
    GuideUI.prototype.ease = function () {
        var tw = egret.Tween.get(this.tip).
            to({ alpha: 1 }, 600)
            .wait(2000)
            .to({ y: 2000 }, 400, egret.Ease.circIn)
            .call(this.dispose, this);
        // tw.play()
    };
    GuideUI.prototype.dispose = function () {
        this.ui.parent.removeChild(this.ui);
        game.dispatchEventWith("startPlay");
        //todo 点击引导
        DIR.report(DIREventName.click_user_guide);
        DIR.reportPlayTime(DIREventName.play_time);
    };
    return GuideUI;
}(Scene));
__reflect(GuideUI.prototype, "GuideUI");

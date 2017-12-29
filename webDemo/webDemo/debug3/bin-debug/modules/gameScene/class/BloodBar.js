var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BloodBar = (function () {
    function BloodBar() {
        this.totalVal = 1000;
        this.curVal = 1000;
        var layout = {
            name: "bloodBar",
            x: 360,
            y: 350,
            lib: "Layout", children: [
                Painter.createLayout("Img", { res: "uiSheet|zxm_zs_xue", x: 0, y: 0 }, "bg"),
                Painter.createLayout("Img", { res: "uiSheet|zxm_zs_xue02", x: -35, y: -3 }, "bar"),
                Painter.createLayout("BitText", { res: "font_fnt", x: 130, y: -18, text: "300", space: 2, scale: { x: 0.6, y: 0.6 } }, "txt"),
            ]
        };
        this.ui = Painter.instance.readLayout(layout, game.stage);
        var bar = this.ui.find("bar").skin;
        this.mask = getRaidsRect(bar.width, bar.height, 4, 0x000000, 1);
        this.mask.x = bar.x - bar.width / 2;
        this.mask.y = bar.y - bar.height / 2;
        game.stage.addChild(this.mask);
        bar.mask = this.mask;
    }
    BloodBar.prototype.setTotalValue = function (val) {
        this.totalVal = val;
        this.curVal = val;
    };
    BloodBar.prototype.setValue = function (val) {
        this.curVal = val;
        this.ui.find("txt").text = this.curVal + "";
        egret.Tween.removeTweens(this.mask);
        egret.Tween.get(this.mask)
            .to({ scaleX: this.curVal / this.totalVal }, 300);
    };
    BloodBar.prototype.setPosition = function (x, y) {
        this.ui.x = x;
        this.ui.y = y;
    };
    return BloodBar;
}());
__reflect(BloodBar.prototype, "BloodBar");

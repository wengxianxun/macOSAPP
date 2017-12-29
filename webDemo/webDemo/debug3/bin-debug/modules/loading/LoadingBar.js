var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoadingBar = (function () {
    function LoadingBar(width, height, barColor, bgColor) {
        this.offsetX = 0;
        this.offsetY = 0;
        // super(); 0xffcb07  0x5c1e00
        this.width = width;
        this.height = height;
        this.container = new egret.Sprite();
        this.bar_shap = this.getRaidsBar(width - 6, height - 6, 16, barColor, 0.9);
        this.bg_shap = this.getRaidsBar(width, height, 16, bgColor, 1);
        this.mask = this.getMaskRct(width, height);
        this.bar_shap.x = -this.width / 2 + 3;
        this.bar_shap.y = -this.height / 2 + 3;
        this.bg_shap.x = -this.width / 2;
        this.bg_shap.y = -this.height / 2;
        this.mask.x = -this.width / 2;
        this.mask.y = -this.height / 2;
        this.text = new egret.TextField();
        this.text.textColor = bgColor;
        this.text.width = 360;
        this.text.height = 50;
        this.text.anchorOffsetX = 180;
        this.text.anchorOffsetY = 25;
        this.text.textAlign = "center";
        this.text.text = "Loading...";
        // this.setBarOffset(0,0);
        this.container.addChild(this.bg_shap);
        this.container.addChild(this.bar_shap);
        this.container.addChild(this.mask);
        this.container.addChild(this.text);
        this.bar_shap.mask = this.mask;
        this.setPercentForece(0);
        // this.container.addChild(this.bar_shap);
    }
    LoadingBar.prototype.updateSkin = function (sheet, barName, bgName) {
        var _this = this;
        //
        this.setSheet(sheet);
        barName = barName ? barName : LoadingBar.TN_BAR;
        bgName = bgName ? bgName : LoadingBar.TN_BG;
        this.bar = this.getSkinByName(barName);
        this.bg = this.getSkinByName(bgName);
        this.bg.scaleX = this.width / this.bg.width;
        this.bg.scaleY = this.height / this.bg.height;
        this.bar.scaleX = this.bg.scaleX;
        this.bar.scaleY = this.bg.scaleY;
        this.container.addChild(this.bg);
        this.container.addChild(this.bar);
        this.setBarOffset(this.offsetX, this.offsetY);
        this.bar.mask = this.mask;
        this.loadSkin = true;
        this.bar.alpha = 0.1;
        this.bg.alpha = 0.1;
        this.bar_shap.visible = false;
        var time = 200, /*tw1=egret.Tween.get(this.bar_shap).to({alpha:0},time),*/ tw2 = egret.Tween.get(this.bg_shap).to({ alpha: 0 }, time).call(function () {
            _this.bg_shap.visible = false;
        }, this), tw3 = egret.Tween.get(this.bar).to({ alpha: 1 }, time), tw4 = egret.Tween.get(this.bg).to({ alpha: 1 }, time);
    };
    LoadingBar.prototype.getSkinByName = function (textureName) {
        var sp = new egret.Bitmap();
        sp.texture = this.sheet.getTexture(textureName);
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    };
    LoadingBar.prototype.getRaidsBar = function (w, h, radius, color, alpha) {
        var mask = new egret.Shape();
        var gs = mask.graphics;
        gs.lineStyle(2);
        gs.beginFill(color, alpha);
        gs.moveTo(radius, 0);
        gs.lineTo(w - radius, 0);
        gs.drawArc(w - radius, radius, radius, -Math.PI / 2, 0, false);
        // gs.moveTo(w, radius);
        gs.lineTo(w, h - radius);
        gs.drawArc(w - radius, h - radius, radius, 0, Math.PI / 2, false);
        // gs.moveTo(w-radius, h);
        gs.lineTo(radius, h);
        gs.drawArc(radius, h - radius, radius, Math.PI / 2, Math.PI, false);
        // gs.moveTo(0, h-radius);
        gs.lineTo(0, radius);
        gs.drawArc(radius, radius, radius, Math.PI, Math.PI * 3 / 2, false);
        gs.endFill();
        return mask;
    };
    LoadingBar.prototype.getMaskRct = function (w, h) {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000, 1);
        mask.graphics.drawRect(0, 0, w, h);
        mask.graphics.endFill();
        return mask;
    };
    Object.defineProperty(LoadingBar.prototype, "percent", {
        get: function () {
            return this._percent;
        },
        /*
        *  rang 0~1;
        * */
        set: function (p) {
            if (p < 0)
                p = 0;
            if (p > 1)
                p = 1;
            this._percent = p;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    LoadingBar.prototype.setPercent = function (p, second) {
        this.percent = p;
        egret.Tween.removeTweens(this.mask);
        var tw = egret.Tween.get(this.mask, { onChange: this.onChangeHandle }).to({ scaleX: this._percent }, second * 1000).call(this.tweenCompleteHandle, this);
    };
    ;
    LoadingBar.prototype.setPercentForece = function (p) {
        if (p < 0)
            p = 0;
        if (p > 1)
            p = 1;
        this._percent = p;
        this.mask.scaleX = this._percent;
    };
    ;
    LoadingBar.prototype.onChangeHandle = function () {
    };
    Object.defineProperty(LoadingBar.prototype, "curPercent", {
        get: function () {
            return this.mask.scaleX;
        },
        enumerable: true,
        configurable: true
    });
    LoadingBar.prototype.tweenCompleteHandle = function () {
        this.onComplete && this.onComplete();
    };
    Object.defineProperty(LoadingBar.prototype, "visible", {
        get: function () {
            return this.bg.visible;
        },
        set: function (bool) {
            this.bar.visible = bool;
            this.bg.visible = bool;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    LoadingBar.prototype.setSize = function (w, h) {
        // this.container.width=w;
        this.container.height = h;
        this.container.scaleX = 0.7;
    };
    LoadingBar.prototype.setSheet = function (sheet) {
        this.sheet = sheet;
    };
    LoadingBar.prototype.setBarOffset = function (x, y) {
        this.offsetX = x;
        this.offsetY = y;
        if (this.loadSkin) {
            this.bar.x = this.offsetX;
            this.bar.y = this.offsetY;
            this.mask.x = this.bar.x - this.bar.anchorOffsetX;
            this.mask.y = this.bar.y - this.bar.anchorOffsetY;
        }
    };
    LoadingBar.prototype.addToContainer = function (container) {
        container.addChild(this.container);
        this.containerParent = container;
    };
    /**
    * 设置text位置
    *
    * */
    LoadingBar.prototype.setTextPosition = function (x, y) {
        this.text.x = x;
        this.text.y = y;
    };
    LoadingBar.prototype.setPosition = function (x, y) {
        this.container.x = x;
        this.container.y = y;
    };
    LoadingBar.prototype.getPositon = function () {
        return { x: this.container.x, y: this.container.y };
    };
    LoadingBar.prototype.dispose = function () {
        this.containerParent.removeChild(this.container);
        RES.destroyRes("loadingSheet");
    };
    LoadingBar.TN_BAR = "bar";
    LoadingBar.TN_BG = "bg";
    return LoadingBar;
}());
__reflect(LoadingBar /* extends egret.Sprite*/.prototype, "LoadingBar");

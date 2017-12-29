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
var sUI;
(function (sUI) {
    var Img = sUI.Img;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(conf) {
            var _this = _super.call(this) || this;
            // private  width=200;
            // private  height=80;
            _this.enable = true;
            _this.touchTapLimit = false;
            // private  iscenter=true;
            _this.callBack = new CallFn();
            _this.setConf(conf);
            _this.skin.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._touchBeginHandle, _this);
            return _this;
        }
        Button.prototype.onClick = function (fn, thisArg, params) {
            this.skin.touchEnabled = true;
            this.callBack.set(fn, thisArg, params);
            this.skin.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchTapHandle, this);
            // this.sharp.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touchTapHandle,this);
        };
        ;
        Button.prototype.setConf = function (conf) {
            if (!conf)
                return;
            _super.prototype.setConf.call(this, conf);
            var o = {
                s9Grid: conf.s9Grid,
            };
            this.trySet(o);
        };
        // updateSkin (texture) {
        //     if(this.sharp&&this.sharp.parent){
        //         this.sharp.parent.removeChild(this.sharp);
        //         this.sharp=null;
        //     }
        //     this.skin.texture=texture;
        //     if(this.iscenter){
        //         this.skin.anchorOffsetX=this.skin.width/2;
        //         this.skin.anchorOffsetY=this.skin.height/2;
        //     }
        // };
        Button.prototype._touchTapHandle = function () {
            if (!this.enable)
                return;
            this.callBack.exc();
        };
        Button.prototype._touchBeginHandle = function () {
            if (!this.enable || this.touchTapLimit)
                return;
            this.touchTapLimit = true;
            var tw = egret.Tween.get(this.skin).to({ scaleX: 0.9, scaleY: .9 }, 100)
                .wait(100)
                .to({ scaleX: 1, scaleY: 1 }, 100)
                .call(function () {
                this.touchTapLimit = false;
            }, this);
        };
        return Button;
    }(Img));
    sUI.Button = Button;
    __reflect(Button.prototype, "sUI.Button");
})(sUI || (sUI = {}));

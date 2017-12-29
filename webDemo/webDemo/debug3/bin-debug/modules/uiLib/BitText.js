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
    var BitText = (function (_super) {
        __extends(BitText, _super);
        function BitText(conf) {
            var _this = _super.call(this) || this;
            _this.width = 200;
            _this.height = 80;
            _this.enable = true;
            _this.setConf(conf);
            return _this;
        }
        BitText.prototype.beforeSuper = function () {
            this.skin = new egret.BitmapText();
        };
        BitText.prototype.setConf = function (conf) {
            if (!conf)
                return;
            _super.prototype.setConf.call(this, conf);
            var o = {
                text: conf.text,
                letterSpacing: conf.space,
            };
            if (conf.scale) {
                o.scale = conf.scale;
            }
            this.trySet(o);
        };
        BitText.prototype.updateSkin = function (font) {
            this.skin.font = font;
        };
        ;
        BitText.prototype.display = function () {
            var x = [this.skin];
            return x;
        };
        Object.defineProperty(BitText.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (val) {
                this._x = val;
                if (this.parent && this.parent.x)
                    val += this.parent.x;
                this.skin.x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (val) {
                this._y = val;
                if (this.parent && this.parent.y)
                    val += this.parent.y;
                this.skin.y = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "absX", {
            get: function () {
                return this.skin.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "absY", {
            get: function () {
                return this.skin.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "res", {
            set: function (str) {
                var res = RES.getRes(str);
                this.updateSkin(res);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "text", {
            get: function () {
                return this.skin.text;
            },
            set: function (val) {
                this.skin.text = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "letterSpacing", {
            set: function (val) {
                this.skin.letterSpacing = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "scale", {
            get: function () {
                return { x: this.skin.scaleX, y: this.skin.scaleY };
            },
            set: function (val) {
                this.skin.scaleX = val.x;
                this.skin.scaleY = val.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitText.prototype, "visible", {
            set: function (val) {
                this._visible = val;
                var bool = val;
                if (this.parent) {
                    bool = this.parent.visible && val;
                }
                this.skin.visible = bool;
            },
            enumerable: true,
            configurable: true
        });
        BitText.prototype.dispose = function () {
            var parent = this.skin.parent;
            parent.removeChild(this.skin);
        };
        return BitText;
    }(sUI.Layout));
    sUI.BitText = BitText;
    __reflect(BitText.prototype, "sUI.BitText");
})(sUI || (sUI = {}));

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
    var Img = (function (_super) {
        __extends(Img, _super);
        function Img(conf) {
            var _this = _super.call(this) || this;
            _this.width = 300;
            _this.height = 280;
            _this.iscenter = true;
            _this.setConf(conf);
            changeRaidsRect(_this.sharp, _this.width, _this.height, 1, 0x000000, 0.6);
            _this.sharp.touchEnabled = true;
            _this.sharp.anchorOffsetX = _this.width / 2;
            _this.sharp.anchorOffsetY = _this.height / 2;
            return _this;
        }
        Img.prototype.beforeSuper = function () {
            this.skin = new egret.Bitmap();
            this.sharp = new egret.Shape();
        };
        Img.prototype.setConf = function (conf) {
            if (!conf)
                return;
            _super.prototype.setConf.call(this, conf);
            var o = {
                s9Grid: conf.s9Grid,
            };
            this.trySet(o);
        };
        Img.prototype.updateSkin = function (texture) {
            if (this.sharp && this.sharp.parent) {
                this.sharp.parent.removeChild(this.sharp);
                this.sharp = null;
            }
            this.skin.texture = texture;
            if (this.iscenter) {
                this.skin.anchorOffsetX = this.skin.width / 2;
                this.skin.anchorOffsetY = this.skin.height / 2;
            }
        };
        ;
        Img.prototype.display = function () {
            var x = [this.skin];
            if (!this.skinLoad && this.sharp) {
                x.push(this.sharp);
            }
            return x;
        };
        Object.defineProperty(Img.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (val) {
                this._x = val;
                if (!this.skinLoad)
                    this.sharp.x = val + this.parentX;
                this.skin.x = val + this.parentX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (val) {
                this._y = val;
                if (!this.skinLoad)
                    this.sharp.y = val + this.parentX;
                this.skin.y = val + this.parentY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "absX", {
            get: function () {
                return this.skin.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "absY", {
            get: function () {
                return this.skin.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "res", {
            set: function (str) {
                var arr = str.split("|"), res, tex;
                res = RES.getRes(arr[0]);
                if (res instanceof egret.Texture) {
                    tex = res;
                }
                else {
                    if (res) {
                        tex = res.getTexture(arr[1]);
                    }
                }
                if (tex) {
                    this.updateSkin(tex);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "s9Grid", {
            set: function (str) {
                var arr = str.split(",");
                this.skin.scale9Grid = new egret.Rectangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
                this.skin.width = this.width;
                this.skin.height = this.height;
                this.skin.anchorOffsetX = 0;
                this.skin.anchorOffsetY = 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "skinLoad", {
            get: function () {
                return this.skin && this.skin.texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "visible", {
            set: function (val) {
                this._visible = val;
                var bool = val;
                if (this.parent) {
                    bool = this.parent.visible && val;
                }
                this.sharp.visible = bool;
                this.skin.visible = bool;
            },
            enumerable: true,
            configurable: true
        });
        Img.prototype.dispose = function () {
            var parent = this.skin.parent;
            parent.removeChild(this.skin);
            if (this.sharp && parent.getChildIndex(this.sharp) > -1)
                parent.removeChild(this.sharp);
        };
        return Img;
    }(sUI.Layout));
    sUI.Img = Img;
    __reflect(Img.prototype, "sUI.Img");
})(sUI || (sUI = {}));

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
    var Mc = (function (_super) {
        __extends(Mc, _super);
        function Mc(conf) {
            var _this = _super.call(this) || this;
            _this.width = 200;
            _this.height = 80;
            _this.enable = true;
            _this.touchTapLimit = false;
            _this.iscenter = true;
            _this.setConf(conf);
            return _this;
        }
        Mc.prototype.beforeSuper = function () {
            this.skin = new egret.MovieClip();
            this.sharp = getRaidsRect(this.width, this.height, 10, 0xccccff, 0.8);
            this.sharp.touchEnabled = true;
            this.sharp.anchorOffsetX = this.width / 2;
            this.sharp.anchorOffsetY = this.height / 2;
        };
        Mc.prototype.updateSkin = function (movieClipData) {
            if (this.sharp && this.sharp.parent) {
                this.sharp.parent.removeChild(this.sharp);
                this.sharp = null;
            }
            this.skin.movieClipData = movieClipData;
            // if(this.iscenter){
            //     this.skin.anchorOffsetX=this.skin.width/2;
            //     this.skin.anchorOffsetY=this.skin.height/2;
            // }
        };
        ;
        Mc.prototype.display = function () {
            var x = [this.skin];
            if (!this.skinLoad && this.sharp) {
                x.push(this.sharp);
            }
            return x;
        };
        Object.defineProperty(Mc.prototype, "x", {
            get: function () {
                return this.skin.x;
            },
            set: function (val) {
                if (!this.skinLoad)
                    this.sharp.x = val;
                this.skin.x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mc.prototype, "y", {
            get: function () {
                return this.skin.y;
            },
            set: function (val) {
                if (!this.skinLoad)
                    this.sharp.y = val;
                this.skin.y = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mc.prototype, "res", {
            set: function (str) {
                var mcf = RES.getMCF(str);
                var arr = str.split("|"), res, tex;
                if (!mcf) {
                    mcf = RES.addMCF(str, arr[0], arr[1]);
                }
                if (mcf) {
                    var d = mcf.generateMovieClipData(arr[3]);
                    this.updateSkin(d);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mc.prototype, "skinLoad", {
            get: function () {
                return this.skin && this.skin.movieClipData;
            },
            enumerable: true,
            configurable: true
        });
        return Mc;
    }(sUI.Layout));
    sUI.Mc = Mc;
    __reflect(Mc.prototype, "sUI.Mc");
})(sUI || (sUI = {}));

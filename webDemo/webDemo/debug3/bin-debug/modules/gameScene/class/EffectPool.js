var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectPool = (function () {
    function EffectPool(name) {
        this.pool = [];
        this.index = 0;
        this.name = 0;
        this.index = 0;
        this.name = name;
    }
    EffectPool.prototype.add = function (eff) {
        eff.used = false;
        this.pool.push(eff);
        if (eff instanceof sUI.Mc) {
            eff.skin.addEventListener && eff.skin.addEventListener(egret.Event.COMPLETE, function (e) {
                eff.skin.visible = false;
                eff.used = false;
            }, this);
        }
    };
    EffectPool.prototype.getEffect = function () {
        var arr = this.pool.filter(function (em) {
            return !em.used;
        }), el = false;
        if (arr.length > 0) {
            arr[0].used = true;
            el = arr[0];
            if (arr[0].parent)
                arr[0].parent.addChild(arr[0]);
        }
        return el;
    };
    Object.defineProperty(EffectPool.prototype, "len", {
        get: function () {
            return this.pool.length;
        },
        enumerable: true,
        configurable: true
    });
    return EffectPool;
}());
__reflect(EffectPool.prototype, "EffectPool");

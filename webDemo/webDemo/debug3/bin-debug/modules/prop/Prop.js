var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Prop = (function () {
    function Prop(propId) {
        this.Id = propId;
        this.targetRow = -1;
        this.targetCol = -1;
    }
    //消除规则
    Prop.prototype.rule = function () {
    };
    Prop.prototype.exc = function (row, col, data) {
    };
    return Prop;
}());
__reflect(Prop.prototype, "Prop");

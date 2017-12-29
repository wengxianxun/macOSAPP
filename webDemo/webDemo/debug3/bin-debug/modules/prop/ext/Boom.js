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
var gameProp;
(function (gameProp) {
    var Boom = (function (_super) {
        __extends(Boom, _super);
        function Boom() {
            return _super.call(this, "Boom") || this;
        }
        //地图数组
        Boom.prototype.setMapData = function (mapsData) {
        };
        ;
        //使用地点
        Boom.prototype.setExcPoint = function (row, col) {
            this.targetRow = row;
            this.targetCol = col;
        };
        ;
        //消除规则
        Boom.prototype.rule = function () {
            var list = [];
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    list.push({ row: this.targetRow + i, col: this.targetCol + j });
                }
            }
            list.push({ row: this.targetRow - 2, col: this.targetCol });
            list.push({ row: this.targetRow + 2, col: this.targetCol });
            list.push({ row: this.targetRow, col: this.targetCol + 2 });
            list.push({ row: this.targetRow, col: this.targetCol - 2 });
            return list;
        };
        Boom.prototype.exc = function (row, col) {
            this.setExcPoint(row, col);
            game.stage.dispatchEventWith("boomEffect", false, { row: row, col: col });
            return this.rule();
        };
        return Boom;
    }(Prop));
    gameProp.Boom = Boom;
    __reflect(Boom.prototype, "gameProp.Boom");
})(gameProp || (gameProp = {}));

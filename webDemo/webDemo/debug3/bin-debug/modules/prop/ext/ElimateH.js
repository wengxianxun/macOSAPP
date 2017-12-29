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
    var ElimateH = (function (_super) {
        __extends(ElimateH, _super);
        function ElimateH() {
            var _this = _super.call(this, "Elimate_H") || this;
            _this.rows = 0;
            _this.cols = 0;
            return _this;
        }
        //地图数组
        ElimateH.prototype.setMapData = function (mapsData) {
            this.rows = mapsData.length;
            this.cols = mapsData[0].length;
        };
        ;
        //使用地点
        ElimateH.prototype.setExcPoint = function (row, col) {
            this.targetRow = row;
            this.targetCol = col;
        };
        ;
        //消除规则
        ElimateH.prototype.rule = function () {
            // console.log("Elimate_H");
            var list = [];
            for (var i = 0; i < this.rows; i++) {
                list.push({ row: this.targetRow, col: i });
            }
            return list;
        };
        ElimateH.prototype.exc = function (row, col) {
            this.setExcPoint(row, col);
            game.stage.dispatchEventWith("hxEffect", false, { row: row, col: col, dir: 0 });
            return this.rule();
        };
        return ElimateH;
    }(Prop));
    gameProp.ElimateH = ElimateH;
    __reflect(ElimateH.prototype, "gameProp.ElimateH");
})(gameProp || (gameProp = {}));

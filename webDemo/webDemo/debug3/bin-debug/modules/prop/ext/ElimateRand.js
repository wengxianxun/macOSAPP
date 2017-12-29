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
    var ElimateRand = (function (_super) {
        __extends(ElimateRand, _super);
        function ElimateRand() {
            var _this = _super.call(this, "ElimateRand") || this;
            _this.rows = 0;
            _this.cols = 0;
            _this.eType = 0;
            return _this;
        }
        //地图数组
        ElimateRand.prototype.setMapData = function (mapsData) {
            this.mapData = mapsData;
            this.rows = mapsData.length;
            this.cols = mapsData[0].length;
        };
        ;
        //使用地点
        ElimateRand.prototype.setExcPoint = function (row, col) {
            this.targetRow = row;
            this.targetCol = col;
        };
        ;
        //消除规则
        ElimateRand.prototype.rule = function () {
            // console.log("this.ElimateRand");
            var list = [], etype = this.eType; //RandInt(0,5);
            for (var r = 0; r < 6; r++) {
                for (var c = 0; c < this.cols; c++) {
                    if (this.mapData[r][c].eType == etype) {
                        list.push({ row: r, col: c });
                    }
                }
            }
            return list;
        };
        ElimateRand.prototype.exc = function (row, col, data) {
            this.eType = data;
            this.setExcPoint(row, col);
            return this.rule();
        };
        return ElimateRand;
    }(Prop));
    gameProp.ElimateRand = ElimateRand;
    __reflect(ElimateRand.prototype, "gameProp.ElimateRand");
})(gameProp || (gameProp = {}));

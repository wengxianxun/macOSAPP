var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NodeDir;
(function (NodeDir) {
    NodeDir[NodeDir["TOP"] = 0] = "TOP";
    NodeDir[NodeDir["RIGHT"] = 1] = "RIGHT";
    NodeDir[NodeDir["BOTTOM"] = 2] = "BOTTOM";
    NodeDir[NodeDir["LEFT"] = 3] = "LEFT";
})(NodeDir || (NodeDir = {}));
var E_node = (function () {
    function E_node(val) {
        this.row = 0;
        this.col = 0;
        this.value = val;
    }
    E_node.prototype.addNode = function (node, dir) {
        if (dir === void 0) { dir = NodeDir.LEFT; }
    };
    E_node.prototype.setRowCol = function (row, col) {
        this.row = row;
        this.col = col;
    };
    E_node.getRow = function (row) {
    };
    return E_node;
}());
__reflect(E_node.prototype, "E_node");

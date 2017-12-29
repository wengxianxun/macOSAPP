/////////
//  集合  A-B
/////
function ArrayACutArrayB(arrA, arrB) {
    var tArr = [];
    arrA.forEach(function (em) {
        if (arrB.indexOf(em) == -1)
            tArr.push(em);
    });
    return tArr;
}
function GC(o) {
    for (var k in o) {
        delete o[k];
    }
    o = null;
}
function RandInt(a, b) {
    return a + Math.round(Math.random() * (b - a));
}
function getMapData(elem_matrix, des_matrix) {
    var map = des_matrix || [], row = 0, col = 0;
    elem_matrix.forEach(function (line) {
        if (!map[row]) {
            map[row] = [];
        }
        line.forEach(function (em) {
            map[row][col++] = em.eType;
        });
        col = 0;
        row++;
    });
    return map;
}
/**
 * 圆角矩形
 *
* */
function getRaidsRect(w, h, radius, color, alpha, border) {
    if (alpha === void 0) { alpha = 1; }
    if (border === void 0) { border = 0; }
    var shape = new egret.Shape();
    changeRaidsRect(shape, w, h, radius, color, alpha, border);
    return shape;
}
function changeRaidsRect(shape, w, h, radius, color, alpha, border) {
    if (alpha === void 0) { alpha = 1; }
    if (border === void 0) { border = 0; }
    var gs = shape.graphics;
    gs.clear();
    gs.lineStyle(border);
    gs.beginFill(color, alpha);
    gs.moveTo(radius, 0);
    gs.lineTo(w - radius, 0);
    gs.drawArc(w - radius, radius, radius, -Math.PI / 2, 0, false);
    // gs.moveTo(w, radius);
    gs.lineTo(w, h - radius);
    gs.drawArc(w - radius, h - radius, radius, 0, Math.PI / 2, false);
    // gs.moveTo(w-radius, h);
    gs.lineTo(radius, h);
    gs.drawArc(radius, h - radius, radius, Math.PI / 2, Math.PI, false);
    // gs.moveTo(0, h-radius);
    gs.lineTo(0, radius);
    gs.drawArc(radius, radius, radius, Math.PI, Math.PI * 3 / 2, false);
    gs.endFill();
}
/*
* 时间转换
* */
function TimeForm_MMSS(second) {
    var mm = Math.floor(second / 60), ss = Math.ceil(second % 60);
    mm = (mm > 9) ? "" + mm : "0" + mm;
    ss = (ss > 9) ? "" + ss : "0" + ss;
    return mm + ":" + ss;
}
function predull(str) {
    var mcf = RES.getMCF(str);
    var arr = str.split("|"), res, tex;
    if (!mcf) {
        mcf = RES.addMCF(str, arr[0], arr[1]);
    }
}
function disposeTween(tw) {
    tw._target = {};
    tw.paused = true;
    tw.pause();
    tw.setPaused(true);
    tw._steps = [];
}
function myDownload() {
    DIR.report(DIREventName.download);
    DIR.reportPlayTime(DIREventName.play_time);
    location.href = "https://www.adxmi.com";
}
function debug(key, val) {
    window["$" + key] = val;
}

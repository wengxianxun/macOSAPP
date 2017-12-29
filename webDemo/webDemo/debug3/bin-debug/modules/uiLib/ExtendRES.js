//MovieClipDataFactory
function ExtendRES(res) {
    res._mcf = {};
    res.addMCF = function (key, jsonKey, pngKey) {
        if (res._mcf[key]) {
            console.log("已经存在 MovieClipDataFactory:" + key);
            return false;
        }
        else {
            res._mcf[key] = new egret.MovieClipDataFactory(RES.getRes(jsonKey), RES.getRes(pngKey));
            return res._mcf[key];
        }
    };
    res.getMCF = function (key) {
        return res._mcf[key];
    };
    res.removeMCF = function (key) {
        res._mcf[key].dispose && res._mcf[key].dispose();
        res._mcf[key] = null;
    };
}

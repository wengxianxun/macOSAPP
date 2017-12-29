var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropManager = (function () {
    function PropManager() {
        this.props = {};
        if (PropManager.instance) {
            // console.log("已经初始化！");
            return;
        }
        //注册道具
        this.preRegister();
    }
    PropManager.prototype.preRegister = function () {
        var list = [
            { id: ExtraAttr.Boom, cl: gameProp.Boom },
            { id: ExtraAttr.Elimate_V, cl: gameProp.ElimateV },
            { id: ExtraAttr.Elimate_H, cl: gameProp.ElimateH },
            { id: ExtraAttr.Elimate_RAND, cl: gameProp.ElimateRand },
        ];
        list.forEach(function (prop) {
            var propo = new prop.cl();
            this.register(prop.id, propo);
        }, this);
    };
    PropManager.prototype.register = function (keyName, prop) {
        if (this.props[keyName]) {
            // console.log("已经存在重名道具！ 你可以unRegister")
        }
        else {
            this.props[keyName] = prop;
        }
    };
    PropManager.prototype.unRegister = function (keyName) {
        if (this.props[keyName]) {
            this.props[keyName] = null;
            delete this.props[keyName];
        }
    };
    PropManager.prototype.getProp = function (keyName) {
        return this.props[keyName];
    };
    PropManager.getInstance = function () {
        if (!PropManager.instance) {
            PropManager.instance = new PropManager();
        }
        return PropManager.instance;
    };
    PropManager.prototype.setMapData = function (mapData) {
        for (var k in this.props) {
            this.props[k].setMapData && this.props[k].setMapData(mapData);
        }
    };
    return PropManager;
}());
__reflect(PropManager.prototype, "PropManager");

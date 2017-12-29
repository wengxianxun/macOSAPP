var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// declare namespace sUI{}
var Lib = sUI;
var Painter = (function () {
    function Painter() {
        this.container = null;
        this.Lib = null;
        if (Painter.instance)
            return Painter.instance;
        else {
            Painter.instance = this;
        }
        this.Lib = Lib;
        ExtendRES(RES);
    }
    Painter.prototype.setContainer = function (val) {
        this.container = val;
    };
    Painter.prototype.readLayout = function (layout, container) {
        if (layout instanceof Array) {
            layout = { name: "layout", lib: "Layout", children: layout, isContainer: true };
        }
        var libName = layout.lib, libClass = this.Lib[libName], la;
        if (libClass) {
            la = new libClass(layout);
            container = container || this.container;
            // la.setConf(layout);
            la.addTo(container);
            // if(la.isContainer)this.container=la.container;
            if (layout.children)
                layout.children.forEach(function (cla) {
                    var c = Painter.instance.readLayout(cla, la.container || container);
                    la.addChild(c);
                    // c.setConf(cla);
                });
        }
        return la;
    };
    Painter.getInstance = function () {
        if (Painter.instance)
            return Painter.instance;
        return new Painter();
    };
    Painter.createLayout = function (lib, attr, name) {
        if (name === void 0) { name = ""; }
        var la = { lib: lib, children: [] };
        la.set = function (key, val) {
            la[key] = val;
            return la;
        };
        if (name)
            la.name = name;
        for (var k in attr) {
            // if(attr.hasOwnProperty(k)){
            la[k] = attr[k];
            // }
        }
        return la;
    };
    return Painter;
}());
__reflect(Painter.prototype, "Painter");

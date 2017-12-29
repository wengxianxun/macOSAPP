var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var sUI;
(function (sUI) {
    var Layout = (function () {
        function Layout(conf) {
            this.container = null;
            this.used = true;
            this._visible = true;
            this._x = 0;
            this._y = 0;
            this.parent = null;
            this.children = [];
            this.name = "layout" + Layout.index++;
            this.beforeSuper();
            if (conf) {
                this.setConf(conf);
            }
        }
        Layout.prototype.beforeSuper = function () { };
        Layout.prototype.setConf = function (conf) {
            if (!conf)
                return;
            this.conf = conf;
            if (this.conf.name)
                this.name = this.conf.name;
            if (conf.isContainer) {
                this.container = new egret.Sprite();
            }
            var o = {
                res: conf.res,
                x: conf.x || 0,
                y: conf.y || 0,
                width: conf.w,
                height: conf.h,
                rotation: conf.rotation,
            };
            this.trySet(o);
        };
        Layout.prototype.find = function (name) {
            var ly = false;
            for (var i = 0, len = this.children.length; i < len; i++) {
                if (this.children[i].name == name) {
                    ly = this.children[i];
                    return ly;
                }
            }
            for (var i = 0, len = this.children.length; i < len; i++) {
                var ly_1 = this.children[i].find(name);
                if (ly_1) {
                    return ly_1;
                }
            }
            return ly;
        };
        Layout.prototype.trySet = function (attr, target) {
            if (target === void 0) { target = this; }
            for (var k in attr) {
                if ((typeof attr[k] != "undefined") && (k in target)) {
                    target[k] = attr[k];
                }
            }
        };
        Layout.prototype.display = function () {
            return this.container ? [this.container] : [];
        };
        Layout.prototype.addChild = function (child) {
            if (!child || !(child instanceof Layout))
                return;
            if (this.children.indexOf(child) == -1) {
                child.parent = this;
                this.children.push(child);
                //需要更新的属性
                child.x += 0;
                child.y += 0;
            }
        };
        Layout.prototype.addTo = function (layout) {
            if (!layout)
                return;
            var d = this.display() || [];
            d.forEach(function (em) {
                layout.addChild(em);
            });
        };
        Object.defineProperty(Layout.prototype, "x", {
            get: function () {
                var x = this._x;
                if (this.parent && this.parent.x)
                    x += this.parent.x;
                return x;
            },
            set: function (val) {
                this._x = val;
                if (this.container)
                    this.container.x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "y", {
            get: function () {
                var y = this._y;
                if (this.parent && this.parent.y)
                    y += this.parent.y;
                return y;
            },
            set: function (val) {
                this._y = val;
                if (this.container)
                    this.container.y = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "parentX", {
            get: function () {
                if (!this.parent || this.parent.container)
                    return 0;
                return this.parent.x + this.parent.parentX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "parentY", {
            get: function () {
                if (!this.parent || this.parent.container)
                    return 0;
                return this.parent.y + this.parent.parentY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "visible", {
            get: function () {
                var bool = true;
                if (this.parent) {
                    bool = this.parent.visible && this._visible;
                }
                else {
                    bool = this._visible;
                }
                return bool;
            },
            set: function (val) {
                this._visible = val;
                this.children.forEach(function (cl) {
                    cl.visible = val;
                });
            },
            enumerable: true,
            configurable: true
        });
        Layout.prototype.updatePosition = function () {
            this.children.forEach(function (cl) {
                cl.x += 0;
                cl.y += 0;
            });
        };
        Layout.prototype.dispose = function () {
            if (this.container) {
                if (this.container.parent)
                    this.container.parent.removeChild(this.container);
            }
            else {
                this.children.forEach(function (cl) {
                    cl.dispose();
                });
            }
        };
        Layout.index = 0;
        return Layout;
    }());
    sUI.Layout = Layout;
    __reflect(Layout.prototype, "sUI.Layout");
})(sUI || (sUI = {}));

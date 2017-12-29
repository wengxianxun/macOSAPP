var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Falling_OffsetY = -84 * 6, Falling_scale = { x: 0.9, y: 1.12 }, NoMove_scale = { x: 0.8, y: 1.12 }, cannnot_swap = { x: 0.75, y: 0.8 }, Landing_scale = { x: 1.2, y: .85 };
var Elem = (function () {
    function Elem() {
        this.fallHight = -84;
        this.pre = ["fruit_01_0", "fruit_02_0", "fruit_03_0", "fruit_04_0", "fruit_05_0", "fruit_06_0"];
        this.skin = new egret.Bitmap();
        this.skin.anchorOffsetX = 42;
        this.skin.anchorOffsetY = 42;
        this.sheet = null;
        this.enable = true;
        this.eType = -1;
        this.status = ElemStatus.Normal;
        this.extraAttr = ExtraAttr.NONE;
        this.skin.touchEnabled = true;
        this.setParent(this.skin);
        // this.fallDownEndHandle=this.fallDownEnd.bind(this);
    }
    Elem.prototype.setParent = function (o) {
        o._pto = this;
    };
    Elem.prototype.look = function () {
        this.enable = false;
    };
    ;
    Elem.prototype.unlook = function () {
        this.enable = true;
    };
    ;
    Object.defineProperty(Elem.prototype, "visible", {
        // visible
        get: function () {
            return this.skin.visible;
        },
        set: function (bool) {
            this.skin.visible = bool;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Elem.prototype.setTextures = function (textures) {
        this.sheet = textures;
    };
    Elem.prototype.setAniTime = function (time, fallTime) {
        this.swapTime = time * 1000;
        this.swapTime2 = this.swapTime * .6;
        this.fallTime = fallTime * 1000;
    };
    Elem.prototype.born = function () {
        if (this.status != ElemStatus.Destroy)
            return;
        // this.row = -1;
        var pos = this.getPositionByRc(this.row, this.col);
        this.setPosition(this.skin.x, 42 + this.fallHight);
        this.status = ElemStatus.Born;
        this.extraAttr = ExtraAttr.NONE;
        this.enable = true;
        this.setType(this.eType);
        this.visible = true;
        // var eposition = getElePositionXY(0,this.curCol);
        // this.setPosition(eposition.x,100 - CELL_SIZE );
    };
    //变化元素时设置参数
    Elem.prototype.transformSet = function () {
        this.status = ElemStatus.Born_Turnsform;
        this.extraAttr = ExtraAttr.NONE;
        this.enable = true;
        this.setType(this.eType);
        this.visible = true;
    };
    Elem.prototype.explo = function (force) {
        if (this.eType == ElemType.none) {
            return;
        }
        if (!force && this.eType == ElemType.Elimate_RAND) {
            return;
        }
        this.visible = false;
        this.status = ElemStatus.Destroy;
        game.stage.dispatchEventWith("exploEffect", false, { row: this.row, col: this.col, type: this.eType, tex: this.texName });
    };
    Elem.prototype.showBound = function () {
    };
    Elem.prototype.fallDown = function (position) {
        var tw, tw2, tw3;
        if (this.status != ElemStatus.Move && this.status != ElemStatus.Born && this.status != ElemStatus.Born_Turnsform)
            return;
        egret.Tween.removeTweens(this.skin);
        //未曾移动
        if (position.x == this.skin.x && position.y == this.skin.y) {
            tw = egret.Tween.get(this.skin)
                .to({ "scaleX": NoMove_scale.x, "scaleY": NoMove_scale.y }, this.fallTime * .2, egret.Ease.backOut)
                .to({ "scaleX": Landing_scale.x, "scaleY": Landing_scale.y }, this.fallTime * 0.2, egret.Ease.backOut)
                .to({ "scaleX": 1, "scaleY": 1 }, this.fallTime * 0.2, egret.Ease.backOut)
                .call(this.fallDownEnd, this);
        }
        else {
            if (this.status == ElemStatus.Born) {
                tw3 = egret.Tween.get(this.skin)
                    .set({ "alpha": 0.1 })
                    .to({ "alpha": 1 }, this.fallTime * .2);
                this.status = ElemStatus.Move;
            }
            tw = egret.Tween.get(this.skin)
                .to({ "scaleX": Falling_scale.x, "scaleY": Falling_scale.y }, this.fallTime * .2)
                .wait(this.fallTime * .3)
                .to({ "scaleX": Landing_scale.x, "scaleY": Landing_scale.y }, this.fallTime * 0.1, egret.Ease.backOut)
                .to({ "scaleX": 1, "scaleY": 1 }, this.fallTime * 0.16, egret.Ease.backOut);
            tw2 = egret.Tween.get(this.skin, {
                onChange: function () {
                    if (this.eType != ElemType.none && !this.skin.visible && this.skin.y > -86) {
                        this.skin.visible = true;
                    }
                },
                onChangeObj: this
            })
                .set({ visible: false })
                .to({ "x": position.x, "y": position.y }, this.fallTime * .8, egret.Ease.circInOut)
                .call(this.fallDownEnd, this);
        }
        //旋转提示变幻
        if (this.status == ElemStatus.Born_Turnsform && this.extraAttr != ExtraAttr.NONE) {
            egret.Tween.get(this.skin).set({ rotation: 0 }).to({ rotation: 720 }, this.fallTime * .8, egret.Ease.circOut);
        }
    };
    Elem.prototype.fallDownEnd = function () {
        this.status = ElemStatus.Normal;
        this.skin.alpha = 1;
    };
    Elem.prototype.swapTo = function (position, canSwap) {
        var tw;
        egret.Tween.removeTweens(this.skin);
        if (canSwap) {
            tw = egret.Tween.get(this.skin, { loop: false });
            tw.to({ "x": position.x, "y": position.y }, this.swapTime, egret.Ease.circInOut);
        }
        else {
            var p2 = this.getPositionByRc(this.row, this.col);
            var posX = p2.x, posY = p2.y, isH = true;
            if (posX == position.x) {
                isH = false;
            }
            tw = egret.Tween.get(this.skin, { loop: false });
            tw.to({
                "x": posX + (position.x - posX) * .3,
                "y": posY + (position.y - posY) * .3,
                scaleX: isH ? cannnot_swap.x : 1,
                scaleY: isH ? 1 : cannnot_swap.y,
            }, this.swapTime2, egret.Ease.circOut);
            tw.to({ "x": posX, "y": posY, scaleX: 1, scaleY: 1 }, this.swapTime2, egret.Ease.circOut);
            // tw.wait(2000);
            // tw.to({ "alpha": 0 }, 200);
            // tw.call(change, this);
        }
    };
    Elem.prototype.setRC = function (row, col) {
        this.row = row;
        this.col = col;
    };
    Elem.prototype.setPosition = function (x, y) {
        this.skin.x = x;
        this.skin.y = y;
    };
    Elem.prototype.getPositon = function () {
        return { x: this.skin.x, y: this.skin.y };
    };
    Elem.prototype.setType = function (index) {
        var arr = this.pre;
        if (index < 0)
            index = 0;
        if (index >= arr.length)
            index = arr.length - 1;
        this.texName = arr[index] + "1";
        this.skin.texture = this.sheet.getTexture(this.texName);
        this.eType = index;
    };
    Elem.prototype.touchEvent = function () {
        if (this.eType != ElemType.Elimate_RAND)
            return;
        game.stage.dispatchEventWith("prop_touch", false, { row: this.row, col: this.col });
    };
    Elem.prototype.addToContainer = function (container) {
        container.addChild(this.skin);
    };
    Elem.prototype.topElem = function () {
        if (this.skin.parent)
            this.skin.parent.addChild(this.skin);
    };
    Object.defineProperty(Elem.prototype, "res", {
        set: function (str) {
            var arr = str.split("|"), res, tex;
            res = RES.getRes(arr[0]);
            if (res instanceof egret.Texture) {
                tex = res;
            }
            else {
                if (res) {
                    this.setTextures(res);
                    tex = res.getTexture(arr[1]);
                }
            }
            if (tex) {
                this.skin.texture = tex;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Elem.prototype, "canExplo", {
        get: function () {
            return !(this.extraAttr == ExtraAttr.NONE || this.status == ElemStatus.Destroy || this.eType == ElemType.Elimate_RAND);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Elem.prototype, "canTurnsform", {
        get: function () {
            return !(this.status == ElemStatus.Destroy || this.eType == ElemType.none || this.extraAttr != ExtraAttr.NONE);
        },
        enumerable: true,
        configurable: true
    });
    Elem.prototype.transform = function (eType) {
        // console.log("transform:" + eType);
        var arr = this.pre;
        this.transformSet();
        switch (eType) {
            case ElemType.none:
                this.eType = ElemType.none;
                this.extraAttr = ExtraAttr.NONE;
                this.skin.visible = false;
                break;
            case ElemType.Elimate_Cross:
                this.skin.texture = this.sheet.getTexture("zd_" + this.skin);
                this.eType = ElemType.Boom;
                this.extraAttr = ExtraAttr.Elimate_Cross;
                break;
            case ElemType.Boom:
                this.skin.texture = this.sheet.getTexture(arr[this.eType] + 4);
                this.extraAttr = ExtraAttr.Boom;
                break;
            case ElemType.Elimate_V:
                this.skin.texture = this.sheet.getTexture(arr[this.eType] + 3);
                this.extraAttr = ExtraAttr.Elimate_V;
                break;
            case ElemType.Elimate_H:
                this.skin.texture = this.sheet.getTexture(arr[this.eType] + 2);
                this.extraAttr = ExtraAttr.Elimate_H;
                break;
            case ElemType.Elimate_X:
                this.skin.texture = this.sheet.getTexture(arr[this.eType] + 5);
                this.extraAttr = ExtraAttr.Elimate_X;
                break;
            case ElemType.Elimate_RAND:
                this.texName = "fruit_11_01";
                this.skin.texture = this.sheet.getTexture(this.texName);
                this.eType = ElemType.Elimate_RAND;
                this.extraAttr = ExtraAttr.Elimate_RAND;
                break;
        }
    };
    return Elem;
}());
__reflect(Elem.prototype, "Elem");

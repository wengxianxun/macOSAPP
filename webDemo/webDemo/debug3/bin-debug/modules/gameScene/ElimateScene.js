/**
 * Created by ccbear on 2017/11/22.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// const Elem = require("src/modules/stage/class/Elem.ts");
// const Queue = require("src/modules/stage/class/Queue.ts");
//配置属性
var Elem_Matrix_ROWs = 7;
var Elem_Matrix_COLs = 7;
var Elem_Matrix = [[], [], [], [], [], [], [], []];
var Elem_Matrix_map = [];
var eliminate_LIST = {};
var Elem_FallDown_Time = 0.8;
var Elem_Switch_Time = 0.24;
var stageW = 720;
var stageH = 1280;
//奖励步数
var awardStep = 4;
var totalStep = 1;
var randPropMaxNum = 3;
var marginX = 84;
var marginY = 84;
var ElimateScene = (function () {
    function ElimateScene() {
        this.effectPool = {};
        this.isGameEnd = false;
        this.isGameStart = false;
        /*
        * 标记变量
        * */
        this.Animation_Complete = true;
        this.isOnEliminate = false;
        this.onTuchSwapTime = false;
        this.hasRandPropNum = 0;
        this.tipsElems = [];
        this.tipsTWeens = [];
        stageW = game.stage.stageWidth;
        stageH = game.stage.stageHeight;
        // this.offsetX = stageW/2  ;
        // this.offsetY = 300+10;
        this.offsetX = 42;
        this.offsetY = 42 + marginY * (Elem_Matrix_COLs - 1);
        this.elem_pool = [];
        this._propsusedList = [];
        this.gameProp = PropManager.getInstance();
        this.gameProp.setMapData(Elem_Matrix);
        this.getPositionByRc_gamscene = this.getPositionByRc.bind(this);
        this.initBoxBg();
        this.loadAsset();
        this.initEvent();
        this.gameProp.setMapData(Elem_Matrix);
        this.setStone();
        this.exploPool = new EffectPool("explo");
        this.effectPool["hx"] = new EffectPool("hx");
        this.effectPool["boom"] = new EffectPool("boom");
        this.effectPool["turn"] = new EffectPool("turn");
        //颜色矩阵数组
        var colorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.colorFlilter = colorFlilter;
    }
    ElimateScene.prototype.setStone = function () {
        var stoneList = [
            { row: 0, col: 0 },
            { row: 6, col: 0 },
            { row: 0, col: 6 },
            { row: 6, col: 6 },
        ];
        stoneList.forEach(function (em) {
            Elem_Matrix[em.row][em.col].transform(ElemType.none);
        });
    };
    ElimateScene.prototype.initBoxBg = function () {
        this.box = new egret.Sprite();
        var boxbg = new egret.Shape();
        boxbg.graphics.beginFill(0x000000, 0.8);
        var boxW = 84 * 7; //stageW*0.8;
        boxbg.graphics.drawRect(0, 0, boxW, boxW);
        boxbg.graphics.endFill();
        // this.box.addChild(boxbg);
        this.box.x = stageW / 2 - boxW / 2;
        this.box.y = 528;
        this.box.touchEnabled = true;
        game.stage.addChild(this.box);
    };
    ElimateScene.prototype.loadAsset = function () {
        // console.log("goto  gamscene");
        this.initElem();
        this.Eliminate();
        this.clearTips();
    };
    ElimateScene.prototype.initElem = function () {
        var ROW_NUM = Elem_Matrix_ROWs, COL_NUM = Elem_Matrix_ROWs, NORMAL_NUM = 6, el, skin, texture, pos;
        for (var i = 0; i < ROW_NUM; i++) {
            for (var j = 0; j < COL_NUM; j++) {
                el = new Elem();
                el.res = "elems_sheet|fruit_01_01";
                el.setAniTime(Elem_Switch_Time, Elem_FallDown_Time);
                el.getPositionByRc = this.getPositionByRc_gamscene;
                el.setType(Math.floor(Math.random() * (NORMAL_NUM + 1)));
                el.setRC(i, j);
                pos = this.getPositionByRc(i, j);
                el.setPosition(pos.x, pos.y);
                el.addToContainer(this.box);
                this.elem_pool.push(el);
                Elem_Matrix[i][j] = el;
            }
        }
        this.updateMap();
        if (this.checkOut(true)) {
            eliminate_LIST["3"].forEach(function (em) {
                em.status = ElemStatus.Destroy;
            });
            this.replenish(true);
            eliminate_LIST["3"] = [];
        }
        this.elem_pool.forEach(function (em) {
            em.status = ElemStatus.Normal;
            em.setType(em.eType);
        });
    };
    //////////////
    /////// 元素落下、补充流程
    //////////////
    ElimateScene.prototype.fallDown = function () {
        this.Animation_Complete = false;
        // 动作队列
        var queueList = new Queue(this, .2);
        // this.calculatefallDown();
        // this.replenish();
        // this.onfallDown_Animation();
        queueList.addChild(function () {
            this.calculatefallDown();
            this.replenish();
            this.onfallDown_Animation();
        }, 0)
            .delay(Elem_FallDown_Time * .8)
            .addChild(this.onfallDown_Animation_Finish, 0)
            .addChild(this.Eliminate)
            .start();
    };
    //=========================
    //         消除的流程
    //=========================
    ElimateScene.prototype.Eliminate = function () {
        this.Animation_Complete = false;
        this.isOnEliminate = true;
        // Elem_Matrix_map
        this.updateMap();
        if (this.checkOut(true)) {
            this.clearTips();
            //    动作队列
            var queueList = new Queue(this, .02);
            queueList.addChild(this.onEliminateElem, 0)
                .addChild(this.fallDown)
                .start();
            this.onTuchSwapTime = false;
        }
        else {
            this.isOnEliminate = false;
            // this.$['selectImg'].setVisible(false);
            this.Animation_Complete = true;
            if (!this.isGameEnd && this.isGameStart)
                this.smartTip();
        }
    };
    //从上往下掉
    //=========================
    //   用到的算法
    //===============================
    //检测消除矩阵中的3消元素
    ElimateScene.prototype.checkOut = function (putList) {
        if (putList === void 0) { putList = false; }
        var el_list = {};
        // 五消
        el_list["5"] = this.checkEliminate(5);
        // 		 四消除
        el_list["4"] = this.checkEliminate(4);
        var tempArr = ArrayACutArrayB(el_list["4"], el_list["5"]);
        el_list["4"] = tempArr.length > 3 ? tempArr : [];
        // 三消除
        el_list["3"] = this.checkEliminate(3);
        eliminate_LIST["3"] = [];
        eliminate_LIST["4"] = [];
        eliminate_LIST["5"] = [];
        if (putList) {
            el_list["3"].forEach(function (em) {
                eliminate_LIST["3"].push(Elem_Matrix[em.row][em.col]);
            });
            el_list["4"].forEach(function (em) {
                eliminate_LIST["4"].push(Elem_Matrix[em.row][em.col]);
            });
            el_list["5"].forEach(function (em) {
                eliminate_LIST["5"].push(Elem_Matrix[em.row][em.col]);
            });
        }
        return el_list["3"].length > 0 || el_list["4"].length > 0 || el_list["5"].length > 0;
    };
    ElimateScene.prototype.updateMap = function () {
        return getMapData(Elem_Matrix, Elem_Matrix_map);
    };
    // 消除 需要满足的条件EliminateCount，符合条件元素的列表eliminateList
    ElimateScene.prototype.checkEliminate = function (EliminateCount) {
        // tempArry存放颜色连续的小球，连续3个以上的放入 eliminateList 等待消除
        var tempArry = [], eliminateList = [];
        //横向消除
        for (var i = 0; i < Elem_Matrix_ROWs; i++) {
            //            指针
            var _p = Elem_Matrix_map[i][0];
            tempArry.push({ row: i, col: 0 });
            for (var j = 1; j < Elem_Matrix_COLs; j++) {
                // _p == eType
                if (_p == Elem_Matrix_map[i][j]) {
                    tempArry.push({ row: i, col: j });
                }
                else {
                    if (tempArry.length < EliminateCount) {
                        //  不满足3消条件  清空
                        tempArry = [];
                        //todo
                        tempArry.push({ row: i, col: j });
                    }
                    else {
                        for (var n = 0; n < tempArry.length; n++) {
                            eliminateList.push(tempArry[n]);
                        }
                        //清空数组，为新一轮准备
                        tempArry = [];
                        tempArry.push({ row: i, col: j });
                    }
                    _p = Elem_Matrix_map[i][j];
                }
                //末尾
                if (j == Elem_Matrix_COLs - 1) {
                    if (tempArry.length < EliminateCount) {
                        //清空数组，为新一轮准备
                        tempArry = [];
                    }
                    else {
                        for (var n = 0; n < tempArry.length; n++) {
                            eliminateList.push(tempArry[n]);
                        }
                        //清空数组，为新一轮准备
                        tempArry = [];
                    }
                }
            } // for j
        } // for i
        //纵向消除
        for (var j = 0; j < Elem_Matrix_COLs; j++) {
            //            指针
            var _p = Elem_Matrix_map[0][j];
            tempArry.push({ row: 0, col: j });
            for (var i = 1; i < Elem_Matrix_ROWs; i++) {
                //eType
                if (_p == Elem_Matrix_map[i][j]) {
                    tempArry.push({ row: i, col: j });
                }
                else {
                    if (tempArry.length < EliminateCount) {
                        //                        不满足3消条件  清空
                        tempArry = [];
                        tempArry.push({ row: i, col: j });
                    }
                    else {
                        for (var n = 0; n < tempArry.length; n++) {
                            eliminateList.push(tempArry[n]);
                        }
                        //清空数组，为新一轮准备
                        tempArry = [];
                        tempArry.push({ row: i, col: j });
                    }
                    _p = Elem_Matrix_map[i][j];
                }
                //末尾
                if (i == Elem_Matrix_ROWs - 1) {
                    if (tempArry.length < EliminateCount) {
                        //清空数组，为新一轮准备
                        tempArry = [];
                    }
                    else {
                        for (var n = 0; n < tempArry.length; n++) {
                            eliminateList.push(tempArry[n]);
                        }
                        //清空数组，为新一轮准备
                        tempArry = [];
                    }
                }
            } // for i
        } // for j
        //eliminateList=ArrayUnique(eliminateList);
        return eliminateList;
    };
    //计算下落位置
    ElimateScene.prototype.calculatefallDown = function () {
        //logM("before");
        var begin_low = 0, end_low = Elem_Matrix_ROWs; //Elem_Matrix_ROWs-1;
        for (var col = 0; col < Elem_Matrix_COLs; col++) {
            //  指针
            var p1 = void 0, p2 = void 0, flag = false;
            for (p1 = begin_low; p1 < end_low; p1++) {
                if (Elem_Matrix[p1][col].status == ElemStatus.Destroy) {
                    for (p2 = p1 + 1; p2 < end_low; p2++) {
                        if (Elem_Matrix[p2][col].status != ElemStatus.Destroy && Elem_Matrix[p2][col].eType != ElemType.none) {
                            //交换
                            var tmp = Elem_Matrix[p1][col];
                            Elem_Matrix[p1][col] = Elem_Matrix[p2][col];
                            Elem_Matrix[p1][col].row = p1;
                            tmp.row = p2;
                            Elem_Matrix[p2][col] = tmp;
                            //Elem_Matrix[p2][col].curRow = p2;
                            Elem_Matrix[p1][col].status = ElemStatus.Move;
                            break;
                        }
                        else {
                            if (p2 == 0)
                                flag = true;
                        }
                    }
                }
                if (flag) {
                    break;
                }
            }
            //计算高度
            var elem = void 0, n = 1, list = [];
            for (var x = 0; x < Elem_Matrix_COLs; x++) {
                elem = Elem_Matrix[x][col];
                if (elem.status == ElemStatus.Destroy && elem.eType != ElemType.none) {
                    // list.push(Elem_Matrix[x][col]);
                    elem.fallHight = -marginY * n++;
                }
            }
        }
    };
    //补充矩阵元素  noElimate 是否开启不存在落下就能消除
    ElimateScene.prototype.replenish = function (noElimate) {
        if (noElimate === void 0) { noElimate = false; }
        var n = 0, temparr = [];
        temparr = this.elem_pool.filter(function (em) {
            return em.status == ElemStatus.Destroy;
        });
        while ((n < 300) && (temparr.length > 0)) {
            for (var i = 0; i < temparr.length; i++) {
                if (temparr[i].status == ElemStatus.Destroy)
                    temparr[i].eType = Math.floor(Math.random() * 5);
            }
            this.updateMap();
            if (noElimate) {
                if (!this.checkOut()) {
                    break;
                }
                //n 不自加
            }
            else {
                //奖励
                if (totalStep > 0 && totalStep % awardStep == 0) {
                    if (this.checkOut(true) /*&&eliminate_LIST["3"]>3*/) {
                        totalStep++;
                        break;
                    }
                }
                else {
                    if (!this.checkOut()) {
                        break;
                    }
                }
                n++;
            }
        }
        this.addRandPropRule();
        //已经消除的數組，显示动画用
        //eliminate_LIST["3"] = temparr;
    };
    /*
    * 增加随机爆炸道具的规则
    * */
    ElimateScene.prototype.addRandPropRule = function () {
        //增加随机
        if (RandInt(0, 100) < 25)
            return;
        if (totalStep > 0 && totalStep % (awardStep + 1) == 0 && this.hasRandPropNum < randPropMaxNum) {
            var row = RandInt(0, Elem_Matrix_ROWs - 1), col = RandInt(0, Elem_Matrix_COLs - 1);
            while (!Elem_Matrix[row][col].canTurnsform) {
                row = RandInt(0, Elem_Matrix_ROWs - 1);
                col = RandInt(0, Elem_Matrix_COLs - 1);
            }
            Elem_Matrix[row][col].transform(ElemType.Elimate_RAND);
            // Elem_Matrix[row][col].transform(ElemType.Boom);
            this.hasRandPropNum++;
            totalStep++;
        }
    };
    //快速提示
    ElimateScene.prototype.clearTips = function () {
        this.tipsTWeens.forEach(function (tw) {
            tw.tl.seek(0);
            tw.pause();
        });
        this.tipsElems.forEach(function (em) {
            em.skin.alpha = 1;
            var ps = this.getPositionByRc(em.row, em.col);
            em.setPosition(ps.x, ps.y);
        }, this);
    };
    //快速提示
    ElimateScene.prototype.smartTip = function () {
        var tryList = [];
        //是否死局
        var badRound = true, tip;
        var pool, row, col, elem, targetRC, toRc;
        this.tipsElems = [];
        this.clearTips();
        this.tipsTWeens = [];
        pool = this.elem_pool.filter(function (em) {
            return em.canTurnsform;
        });
        for (var i = 0, len = pool.length; i < len; i++) {
            tryList = [];
            elem = this.elem_pool[i];
            row = elem.row;
            col = elem.col;
            targetRC = { row: row, col: col };
            tryList.push({ row: row + 1, col: col }, { row: row, col: col + 1 }, { row: row - 1, col: col }, { row: row, col: col - 1 });
            tryList = tryList.filter(function (em) {
                return em.row >= 0 && em.row < Elem_Matrix_ROWs && em.col >= 0 && em.col < Elem_Matrix_COLs;
            });
            for (var n = 0; n < tryList.length; n++) {
                toRc = tryList[n];
                if (this.canSwap(targetRC, toRc, true)) {
                    //找到交换对象
                    this.tipsElems = eliminate_LIST["3"];
                    eliminate_LIST["3"] = [];
                    // this.tipsElems.push(targetRC,toRc);
                    badRound = false;
                    break;
                }
            }
            if (!badRound)
                break;
        }
        if (badRound) {
            // console.log("出现死局了!!");
            this.rePlay();
        }
        else {
            if (this.tipsTimer)
                this.tipsTimer.dispose();
            var target_elem = void 0, to_elem = void 0, x_1, y_1, addX_1 = 0, addY_1 = 0, len = 16;
            var color = void 0, elem1 = Elem_Matrix[targetRC.row][targetRC.col], elem2 = Elem_Matrix[toRc.row][toRc.col];
            //检查为移动后的位置 所以刚刚好相反
            if (this.tipsElems.indexOf(elem1) == -1) {
                color = elem1.eType;
                // this.tipsElems=this.tipsElems.filter(function (em) {
                //     return em.eType==color;
                // });
                // this.tipsElems.push(elem1);
                target_elem = elem1;
                to_elem = elem2;
            }
            else {
                color = elem2.eType;
                // this.tipsElems=this.tipsElems.filter(function (em) {
                //     return em.eType==color;
                // });
                // this.tipsElems.push(elem2);
                target_elem = elem2;
                to_elem = elem1;
            }
            if (target_elem.col > to_elem.col) {
                addX_1 = -len;
            }
            else if (target_elem.col < to_elem.col) {
                addX_1 = len;
            }
            if (target_elem.row < to_elem.row) {
                addY_1 = -len;
            }
            else if (target_elem.row > to_elem.row) {
                addY_1 = len;
            }
            this.tipsElems = [target_elem];
            this.tipsTimer = new Queue(this)
                .delay(4)
                .addChild(function () {
                // telem.topElem();
                this.tipsElems.forEach(function (em) {
                    // let tl=Tween.get(em.skin)
                    //         .delay(0.5)
                    //         .to({alpha:0.5},0.8)
                    //         .to( {alpha:1},0.8)
                    //         .call(function () {
                    //             tl.restart(true,true)
                    //         });
                    x_1 = em.skin.x;
                    y_1 = em.skin.y;
                    var tl = Tween.get(em.skin)
                        .delay(0.5)
                        .to({ x: x_1 + addX_1, y: y_1 + addY_1 }, 0.8)
                        .to({ x: x_1, y: y_1 }, 0.8)
                        .call(function () {
                        tl.restart(true, true);
                    });
                    this.tipsTWeens.push(tl);
                }, this);
                // this.tipsElems.forEach(function (pos) {
                //
                //     let em=Elem_Matrix[pos.row][pos.col].skin;
                //     // let ax=em.anchorOffsetX,ay=em.anchorOffsetY;
                //     // pos.ax=ax;
                //
                //   let tw=new egret.Tween(em,{loop:true},null)
                //         .set({rotation:-15,scaleX:0.95,scaleY:0.95})
                //         .to({rotation:+15,scaleX:1.05,scaleY:1.05},100)
                //         .to({rotation:-15,scaleX:0.95,scaleY:0.95},100)
                //         .wait(300)
                //
                //     this.tipsTWeens.push(tw);
                // },this)
            }).start();
        }
    };
    ElimateScene.prototype.Rule_L = function (arr) {
        var list = [], rules = [], target, flag = false;
        for (var i = 0; i < arr.length - 3; i += 3) {
            flag = false;
            rules = [i, i + 2];
            for (var j = 0; j < rules.length; j++) {
                target = arr[rules[j]];
                if (target === arr[i + 3] || target === arr[i + 5]) {
                    target.transform(ElemType.Boom);
                    i += 5;
                    flag = true;
                    list.push(target);
                    break;
                }
            }
            if (flag)
                continue;
        }
        return list;
    };
    //=================================
    //   动画处理效果
    //=====================================
    //小球消除动画
    ElimateScene.prototype.onEliminateElem = function () {
        // console.log("onEliminateElem");
        for (var i = 0; i < eliminate_LIST["3"].length; i++) {
            //爆炸
            eliminate_LIST["3"][i].explo();
        }
        /*
       * 额外道具范围爆炸
       * */
        var extrEms = eliminate_LIST["3"].filter(function (em) {
            return em.extraAttr != ExtraAttr.NONE;
        });
        eliminate_LIST["L"] = this.Rule_L(eliminate_LIST["3"]);
        if (eliminate_LIST["5"].length > 0) {
            //爆炸
            var arr = [];
            for (var i = 0; i < eliminate_LIST["5"].length; i++) {
                var pos = eliminate_LIST["5"][i].getPositon();
                arr.push(pos);
            }
            // ExplodeEffect.createBronEffect(arr[2],arr);
            //变身
            eliminate_LIST["5"][2].transform(ElemType.Boom);
        }
        if (eliminate_LIST["4"].length > 0) {
            //爆炸
            var arr = [];
            for (var i = 0; i < eliminate_LIST["4"].length; i++) {
                var pos = eliminate_LIST["4"][i];
                arr.push(pos);
            }
            // ExplodeEffect.createBronEffect(arr[0],arr);
            eliminate_LIST["4"][0].transform(Math.random() * 100 > 50 ? ElemType.Elimate_H : ElemType.Elimate_V);
        }
        var extrList, n = 0;
        var _loop_1 = function () {
            extrList = [];
            var clear = true;
            extrEms.forEach(function (elem) {
                //
                var prop = this.gameProp.getProp(elem.extraAttr);
                if (prop) {
                    // console.warn("s使用道具："+elem.extraAttr+"如果没有使用结束说明道具有问题")
                    var xelems = this.getElemsByPos(prop.exc(elem.row, elem.col, elem.data));
                    // console.warn("s使用道具结束");
                    //爆炸范围有额外的元素
                    extrList = xelems.filter(function (xem) {
                        return xem.canExplo;
                    });
                    //道具范围爆炸元素
                    xelems.forEach(function (em) {
                        em.explo();
                    });
                    clear = false;
                }
                else {
                    // console.warn("不存在道具："+elem.extraAttr)
                }
            }, this_1);
            if (clear)
                extrList = [];
            extrEms = extrList;
            n++;
            if (n > 1000)
                console.log("死循环？");
        };
        var this_1 = this;
        do {
            _loop_1();
        } while (extrList.length > 0 && n < 1000);
    };
    ElimateScene.prototype.getElemsByPos = function (list) {
        var xlist = [], elem;
        list.forEach(function (em) {
            var row = em.row, col = em.col;
            if (row >= 0 && row < Elem_Matrix_ROWs && col >= 0 && col < Elem_Matrix_COLs) {
                xlist.push(Elem_Matrix[row][col]);
            }
        });
        return xlist;
    };
    //    小球下落动画
    ElimateScene.prototype.onfallDown_Animation = function () {
        this.elem_pool.forEach(function (em) {
            em.born();
            // if(em.status==ElemStatus.Born){
            //     em.status=ElemStatus.Move;
            // }
            if (em.status == ElemStatus.Move || em.status == ElemStatus.Born || em.status == ElemStatus.Born_Turnsform) {
                em.fallDown(this.getPositionByRc(em.row, em.col));
            }
        }, this);
    };
    ElimateScene.prototype.onfallDown_Animation_Finish = function () {
        // this.addEliminateScore();
        eliminate_LIST["3"] = [];
    };
    ElimateScene.prototype.canSwap = function (pos1, pos2, needeList) {
        if (needeList === void 0) { needeList = false; }
        var bool = false;
        this.updateMap();
        if (this.swapMapData(pos1, pos2)) {
            bool = this.checkOut(needeList);
        }
        return bool;
    };
    ElimateScene.prototype.swapMapData = function (pos1, pos2) {
        var bool = false, cannotArray = [ElemType.none];
        var r1 = pos1.row, c1 = pos1.col, r2 = pos2.row, c2 = pos2.col;
        if (cannotArray.indexOf(Elem_Matrix_map[r1][c1]) == -1 && cannotArray.indexOf(Elem_Matrix_map[r2][c2]) == -1) {
            // //数据交换
            var tem = Elem_Matrix_map[r1][c1];
            Elem_Matrix_map[r1][c1] = Elem_Matrix_map[r2][c2];
            Elem_Matrix_map[r2][c2] = tem;
            bool = true;
        }
        return bool;
    };
    ElimateScene.prototype.swapMatrixData = function (pos1, pos2) {
        //
        var r1 = pos1.row, c1 = pos1.col, r2 = pos2.row, c2 = pos2.col;
        // //数据交换
        var tem = Elem_Matrix[r1][c1];
        Elem_Matrix[r1][c1] = Elem_Matrix[r2][c2];
        Elem_Matrix[r2][c2] = tem;
    };
    //交换两个元素
    ElimateScene.prototype.swap_elems = function (pos1, pos2) {
        if (pos1.row === pos2.row && pos1.col === pos2.col || this.onTuchSwapTime)
            return;
        this.onTuchSwapTime = true;
        var ql = new Queue(this)
            .delay(Elem_Switch_Time)
            .addChild(function () {
            this.onTuchSwapTime = false;
            ql.dispose();
        }, 0);
        ql.start();
        // 可以交换
        var canSwap = this.canSwap(pos1, pos2);
        Elem_Matrix[pos1.row][pos1.col].swapTo(this.getPositionByRc(pos2.row, pos2.col), canSwap);
        Elem_Matrix[pos2.row][pos2.col].swapTo(this.getPositionByRc(pos1.row, pos1.col), canSwap);
        if (canSwap) {
            var tmp = Elem_Matrix[pos1.row][pos1.col];
            Elem_Matrix[pos1.row][pos1.col] = Elem_Matrix[pos2.row][pos2.col];
            Elem_Matrix[pos2.row][pos2.col] = tmp;
            Elem_Matrix[pos1.row][pos1.col].setRC(pos1.row, pos1.col);
            Elem_Matrix[pos2.row][pos2.col].setRC(pos2.row, pos2.col);
            //用户步数
            totalStep++;
        }
        this.selectElem = null;
        this.Eliminate();
    };
    ElimateScene.prototype.getPositionByRc = function (row, col) {
        return { x: col * marginX + this.offsetX, y: row * -marginY + this.offsetY };
    };
    ElimateScene.prototype.propElimate = function () {
        this.onEliminateElem();
        this.fallDown();
    };
    ElimateScene.prototype.propTouchHandle = function (pos, pos2) {
        // let pos=e.data,
        var el = Elem_Matrix[pos.row][pos.col], el2 = Elem_Matrix[pos2.row][pos2.col];
        if (el) {
            el.explo(true);
            el.data = el2.eType;
            eliminate_LIST["3"].push(el);
            this.propElimate();
        }
    };
    /*
    * 交互事件
    *
    *
    * */
    ElimateScene.prototype.initEvent = function () {
        this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.box.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        // game.stage.addEventListener("prop_touch",this.propTouchHandle,this);
    };
    ElimateScene.prototype.onTouchBegin = function (e) {
        if (this.isGameEnd)
            return;
        //class elem
        if (e.target instanceof egret.Bitmap) {
            this.selectElem = e.target._pto;
            //置顶
            this.selectElem.topElem();
            this.oldX = e.stageX;
            this.oldY = e.stageY;
            //
            if (this.Animation_Complete)
                this.selectElem.touchEvent();
        }
    };
    ElimateScene.prototype.onTouchMove = function (e) {
        //消除流程未结束直接返回
        if (!this.Animation_Complete || this.isGameEnd)
            return;
        var se = this.selectElem, clen = 40;
        if (!(Math.abs(e.stageX - this.oldX) > clen || Math.abs(e.stageY - this.oldY) > clen))
            return;
        if (se) {
            var add_col = 0, add_row = 0;
            if (e.stageX - this.oldX > clen) {
                add_col = 1;
            }
            else if (e.stageX - this.oldX < -clen) {
                add_col = -1;
            }
            if (se.col + add_col < 0 || se.col + add_col >= Elem_Matrix_COLs) {
                add_col = 0;
            }
            //横向优先
            if (add_col != 0) {
                // this.swap_elems({col:se.col,row:se.row},{col:se.col+add_col,row:se.row})
            }
            else {
                if (e.stageY - this.oldY > clen) {
                    add_row = -1;
                }
                else if (e.stageY - this.oldY < -clen) {
                    add_row = 1;
                }
                if (se.row + add_row < 0 || se.row + add_row >= Elem_Matrix_ROWs) {
                    add_row = 0;
                }
                // if(add_col!=0){
                //     this.swap_elems({col:se.col,row:se.row},{col:se.col+add_col,row:se.row})
                //
                // }
            }
            if (se.eType == ElemType.Elimate_RAND) {
                this.propTouchHandle({ col: se.col, row: se.row }, { col: se.col + add_col, row: se.row + add_row });
            }
            else {
                this.swap_elems({ col: se.col, row: se.row }, { col: se.col + add_col, row: se.row + add_row });
            }
        }
    };
    ElimateScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    ElimateScene.prototype.play = function () {
        this.isGameStart = true;
        this.smartTip();
    };
    ElimateScene.prototype.rePlay = function () {
        this.isGameEnd = false;
        this.isGameStart = true;
        this.elem_pool.forEach(function (em) {
            if (em.eType != ElemType.none)
                em.status = ElemStatus.Destroy;
        });
        var queueList = new Queue(this, .02);
        queueList.addChild(this.onEliminateElem, 0)
            .addChild(this.fallDown)
            .start();
    };
    ElimateScene.prototype.getQuad = function (elem, etype, index, time) {
        var pool = this.effectPool["turn"];
        var mc = pool.getEffect();
        if (!mc && pool.len < 40) {
            var la = Painter.createLayout("Img", { res: "elems_sheet|fruit_11_01", x: 0, y: 0, scale: { x: 0.2, y: 0.2 } }, "rr");
            mc = Painter.instance.readLayout(la, this.box);
            mc.skin.scaleX = 0.2;
            mc.skin.scaleY = 0.2;
            pool.add(mc);
            mc.used = true;
        }
        if (mc) {
            mc.x = 360;
            mc.y = -300;
            mc.visible = true;
            var aniTime_1 = time, topCenter_1 = { x: 360, y: -305 }, target_1 = { x: elem.skin.x, y: elem.skin.y };
            Queue.once(this)
                .wait(time * 0.8 * index)
                .call(function () {
                Bezier2.set(mc.skin, aniTime_1, { x: topCenter_1.x, y: topCenter_1.y }, { x: target_1.x - 80, y: target_1.y - 300 }, { x: target_1.x, y: target_1.y })
                    .onEnd(function () {
                    mc.skin.visible = false;
                    mc.used = false;
                    elem.transform(etype);
                    elem.fallDown({ x: elem.skin.x, y: elem.skin.y });
                }, this);
            });
        }
    };
    ElimateScene.prototype.setGameEnd = function () {
        this.isGameEnd = true;
        if (this.tipsTimer)
            this.tipsTimer.dispose();
    };
    ElimateScene.prototype.endPlayHappy = function () {
        var list = [], exploList = this.elem_pool.filter(function (em) {
            return em.extraAttr > ExtraAttr.NONE;
        }), turnNum = 5;
        var row, col;
        // while (!Elem_Matrix[row][col].canTurnsform&&list.length<turnNum){
        //     row=RandInt(0,Elem_Matrix_ROWs-1);
        //     col=RandInt(0,Elem_Matrix_COLs-1);
        //     list.push()
        // }
        list.push({ row: RandInt(1, 5), col: 2 }, { row: RandInt(1, 5), col: 3 }, { row: RandInt(1, 5), col: 4 }, { row: 3, col: 3 }, { row: 2, col: RandInt(0, 6) }, { row: 4, col: RandInt(0, 6) });
        var elem, etype;
        for (var i = 0; i < list.length; i++) {
            row = list[i].row;
            col = list[i].col;
            elem = Elem_Matrix[row][col];
            if (i < 3) {
                etype = (ElemType.Elimate_V);
            }
            else if (i < 4) {
                etype = (ElemType.Boom);
            }
            else {
                etype = (ElemType.Elimate_H);
            }
            this.getQuad(elem, etype, i, 200);
            exploList.push(elem);
        }
        var ql = new Queue(this);
        ql.delay(0.2 * list.length + 1)
            .addChild(function () {
            // console.log("end explo");
            // exploList.forEach(function (el) {
            //     el.explo();
            // })
            eliminate_LIST["3"] = exploList;
            this.onEliminateElem();
        }, 0.5)
            .addChild(function () {
            this.loopCheck(ql);
            // if(this.checkOut()){
            //     ql.delay(1);
            // }else {
            //     ql.delay(0.5).addChild(function () {
            //         game.dispatchEventWith("showResult");
            //     })
            // }
        }, 0.5)
            .start();
    };
    ElimateScene.prototype.loopCheck = function (ql) {
        this.fallDown();
        if (this.checkOut()) {
            ql.delay(1).addChild(function () {
                this.loopCheck(ql);
            });
        }
        else {
            ql.delay(0.5).addChild(function () {
                game.dispatchEventWith("showResult");
            });
        }
    };
    ElimateScene.prototype.dispose = function () {
        this.box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.box.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        // game.stage.removeEventListener("prop_touch",this.propTouchHandle,this);
    };
    return ElimateScene;
}());
__reflect(ElimateScene.prototype, "ElimateScene");

/**
 * Created by ccbear on 2017/11/28.
 */
var ElemStatus;
(function (ElemStatus) {
    ElemStatus[ElemStatus["Normal"] = 0] = "Normal";
    ElemStatus[ElemStatus["Destroy"] = 2] = "Destroy";
    ElemStatus[ElemStatus["Move"] = 6] = "Move";
    ElemStatus[ElemStatus["Explode"] = 3] = "Explode";
    ElemStatus[ElemStatus["Born"] = 4] = "Born";
    ElemStatus[ElemStatus["Born_Turnsform"] = 5] = "Born_Turnsform"; //出生变化
})(ElemStatus || (ElemStatus = {}));
;

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var $keymove;
var editor;
(function (editor) {
    var KeybordDebug = (function () {
        function KeybordDebug() {
            this.initKeybord();
        }
        KeybordDebug.prototype.initKeybord = function () {
            var that = this;
            document.addEventListener("keydown", function (evt) {
                var target = $keymove;
                if (evt.keyCode == 37 /*left*/) {
                    target.x--;
                }
                else if (evt.keyCode == 38 /*up*/) {
                    target.y--;
                }
                else if (evt.keyCode == 39 /*up*/) {
                    target.x++;
                }
                else if (evt.keyCode == 40 /*down*/) {
                    target.y++;
                }
                if (target.updatePosition)
                    target.updatePosition();
                console.log("target   x :%s y :%s ", target.x, target.y); //这里的that就是this对象
            });
        };
        return KeybordDebug;
    }());
    editor.KeybordDebug = KeybordDebug;
    __reflect(KeybordDebug.prototype, "editor.KeybordDebug");
})(editor || (editor = {}));

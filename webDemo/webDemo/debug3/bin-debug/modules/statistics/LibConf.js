/*--------------------libconf-------------------------*/
// (function () {
function LibConf(Id, url) {
    this.Id = Id;
    this.url = url;
    this.loaded = false;
    this.sendIndex = 0;
    //条件一，提交间隔
    this.sub_time = 10;
    //条件二，达到一定数量，提交
    this.sub_num = 5;
    this._onload = void 0;
    this._ready = void 0;
    this._report = void 0;
    // this.init();
}
var p = LibConf.prototype;
p.init = function () {
    if (this._ready)
        this._ready();
};
p.setReady = function (fn) {
    this._ready = fn;
};
p.setReport = function (fn) {
    this._report = fn;
};
p.reportCache = function () {
};
p.report = function (evt, val) {
    this.sendIndex++;
    this._report && this._report(evt, val, this);
};
p.load = function () {
    var _this = this;
    var s = document.createElement('script');
    s.async = true;
    s.src = this.url;
    var fn = function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', fn, false);
        _this.loaded = true;
        _this._onload && _this._onload(_this);
        _this.init && _this.init(_this);
    };
    s.addEventListener('load', fn, false);
    document.body.appendChild(s);
};
p.onload = function (fn) {
    this._onload = fn;
};
// })();
/*--------------------end libconf-------------------------*/ 

/*
*集成数据上报
*data intergration report
*
* */
var DIR = DIR || {
    debug: false,
    SAVE_PREFIX: '_DIR_tmp',
    //字段 "_DIR_tmp_whiteScreen"
    //白屏时间
    WSTime: 0,
    loadingTime: 0,
    gameTime: 0,
};
(function () {
    // JSON 转换容错处理
    function JSON_Parse(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return false;
        }
    }
    var lStorge = {
        getDIRData: function () {
            var data = [];
            if (window.localStorage) {
                try {
                    for (var k in localStorage) {
                        if (k.indexOf(DIR.SAVE_PREFIX) > -1) {
                            data.push(localStorage[k]);
                        }
                    }
                }
                catch (e) {
                }
            }
            return data;
        },
        getItem: function (key) {
            if (window.localStorage) {
                try {
                    return window.localStorage.getItem(key);
                }
                catch (e) {
                    return null;
                }
            }
            return null;
        },
        setItem: function (key, value) {
            if (window.localStorage) {
                try {
                    return window.localStorage.setItem(key, value);
                }
                catch (e) {
                    return null;
                }
            }
        },
        removeItem: function (key) {
            if (window.localStorage) {
                try {
                    return window.localStorage.removeItem(key);
                }
                catch (e) {
                    return null;
                }
            }
        }
    };
    function DataReportCenter() {
        //统计服务器地址
        this.reportList = _dir || [];
        this.eventPool = {};
        this.libs = {};
        this.loadingTime_st = 0;
        this.WSTime_st = 0;
        this.startPlay_st = 0;
        this.sendTimeTick = [0];
        this.onLibLoaded_bind = this.onLibLoaded.bind(this);
        this.init();
    }
    var p = DataReportCenter.prototype;
    p.init = function () {
        //条件一，提交间隔
        this.sub_time = 10;
        //条件二，达到一定数量，提交
        this.sub_num = 5;
        // this.msgList = [];
        // this.analyticsList = [
        //     {name: "google", flag: "ga", load: false, sendCahe: false},
        //     {name: "cnzz", flag: "_czc", load: false, sendCahe: false},
        // ];
        this.allScriptReady = false;
        //没有白屏时间则初始化
        var key = "_DIR_tmp_whiteScreen", stime = lStorge.getItem(key);
        if (!stime || stime && ((new Date().getTime() - parseInt(stime)) > 60000)) {
            var st = this.getlocalTime();
            lStorge.setItem(key, st);
            this.WSTime_st = st;
        }
        else {
            this.WSTime_st = parseInt(lStorge.getItem(key));
        }
    };
    Object.defineProperty(p, "getEvents", {
        get: function () {
            return this.reportList;
        },
        enumerable: true,
        configurable: true
    });
    p.getlocalTime = function () {
        return new Date().getTime();
    };
    p.register = function (libConf) {
        this.libs[libConf.Id] = libConf;
        libConf.onload(this.onLibLoaded_bind);
        libConf.load();
    };
    p.registerEvents = function (events) {
        if (!events) {
            return console.error("注册事件出错了!");
        }
        if (events instanceof Array) {
            events.forEach(function (evt) {
                this.eventPool[evt.category] = evt;
            }, this);
        }
        else {
            for (var k in events) {
                this.eventPool[k] = events[k];
            }
        }
    };
    p.onLibLoaded = function (lib) {
        lib.reportCache();
        var events = this.getEvents.slice(lib.sendIndex, this.getEvents.length);
        // console.log(lib.Id+" load event.length: "+events.length);
        var n = 0;
        events.forEach(function (em) {
            if (em instanceof Array) {
                em = { eventName: em[0], val: em[1] || 1 };
            }
            var evt = this.eventPool[em.eventName];
            if (lib && lib.loaded && evt)
                setTimeout(function () {
                    lib.report(evt, em.val);
                }, 100 * n++);
        }, this);
    };
    p.report = function (eventName, value) {
        // if(statistics.debug){
        //     return;
        // }
        this.reportList.push({ eventName: eventName, val: value });
        for (var k in this.libs) {
            var lib = this.libs[k];
            var evt = this.eventPool[eventName];
            if (lib && lib.loaded)
                lib.report(evt, value);
        }
    };
    var dsc = new DataReportCenter();
    DIR.setItem = function (name, value) {
        lStorge.setItem(DIR.SAVE_PREFIX + name, value);
    };
    DIR.getItem = function (name) {
        return lStorge.getItem(DIR.SAVE_PREFIX + name);
    };
    DIR.register = function (lib) {
        dsc.register(lib);
    };
    DIR.registerEvents = function (DIREvent) {
        dsc.registerEvents(DIREvent);
    };
    DIR.report = function (eventName, value) {
        if (value === void 0) { value = 1; }
        try {
            dsc.report(eventName, value);
            console.log(eventName + ":", value);
        }
        catch (e) {
            DIR.error(e);
        }
    };
    DIR.error = function (err) {
        window["ga"] && ga('send', 'exception', {
            'exDescription': err.message,
            'exFatal': false
        });
    };
    DIR.getWSTime = function () {
        if (DIR.WSTime !== 0)
            return DIR.WSTime;
        if (window.performance) {
            DIR.WSTime = performance.now() / 1000;
        }
        else {
            DIR.WSTime = (dsc.getlocalTime() - dsc.WSTime_st) / 1000;
        }
        return DIR.WSTime;
    };
    DIR.loadStart = function () {
        if (dsc.loadingTime_st !== 0)
            return dsc.loadingTime_st;
        return dsc.loadingTime_st = dsc.getlocalTime();
    };
    DIR.getEventLib = function () {
        return dsc.eventPool;
    };
    DIR.getLoadTime = function () {
        if (DIR.loadingTime !== 0)
            return DIR.loadingTime;
        dsc.startPlay_st = dsc.getlocalTime();
        return DIR.loadingTime = (dsc.getlocalTime() - dsc.loadingTime_st) / 1000;
    };
    DIR.startPlay = function () {
        dsc.startPlay_st = dsc.getlocalTime();
    };
    DIR.getPlayTime = function () {
        return Math.round((dsc.getlocalTime() - dsc.startPlay_st) / 1000);
    };
    DIR.reportPlayTime = function (eName) {
        var len = 10;
        var t0 = DIR.getPlayTime(), n = Math.ceil(t0 / len);
        for (var i = 0; i < n; i++) {
            if (dsc.sendTimeTick.indexOf(i) > -1)
                continue;
            dsc.sendTimeTick.push(i);
            if (i < 10) {
                DIR.report(eName, "_" + i * len + "s_" + (i + 1) * len + "s");
            }
            else {
                DIR.report(eName, "_90s_more");
            }
        }
    };
})();

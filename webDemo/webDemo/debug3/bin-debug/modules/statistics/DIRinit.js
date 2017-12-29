///<reference path="LibConf.ts" />
(function () {
    function initGa() {
        var lib = new LibConf("ga", "./ga/ga.js");
        lib.setReady(function () {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = new Date;
            })(window, document, 'script', '~~~', 'ga');
            ga('create', 'UA-108095695-4', 'auto');
            ga('send', 'pageview');
            ga('set', 'dimension1', "t_adx");
            //用户指纹
            ga('set', 'dimension2', "test2_2342");
        });
        lib.setReport(function (evt, val, libconf) {
            try {
                var evt_o = void 0, eName = evt.category;
                if (evt.type == "timing") {
                    // 发送gtag时间统计
                    evt_o = {
                        hitType: "timing",
                        timingCategory: "load_time",
                        timingVar: evt.category,
                        timingValue: val * 1000,
                    };
                    ga('send', evt_o);
                }
                else if (eName == DIREventName.play_time) {
                    evt_o = {
                        hitType: 'event',
                        eventCategory: evt.category + val,
                        eventAction: evt.action,
                        eventLabel: evt.label,
                        eventValue: 0
                    };
                }
                else {
                    evt_o = {
                        hitType: 'event',
                        eventCategory: evt.category,
                        eventAction: evt.action,
                        eventLabel: evt.label,
                        eventValue: val
                    };
                }
                ga('send', evt_o);
            }
            catch (e) {
                DIR.error(e);
                // console.log(e)
            }
        });
        DIR.register(lib);
    }
    function initCNZZ() {
        _czc = window["_czc"] || [];
        document.write = function (txt) {
        };
        var lib = new LibConf("cnzz", "./ga/cnzz.min.js");
        lib.setReady(function () {
            _czc.push(["_setAccount", "1271592777"]);
            _czc.push(["_trackPageview", "index.html"]);
            _czc.push(["_setCustomVar", "ADX", "t_adx", 2]);
            _czc.push(["_setCustomVar", "CID", "t_cid", 2]);
            _czc.push(["_setCustomVar", "SID", "t_sid", 2]);
            _czc.push(["_setCustomVar", "BUNDLE", "t_BUNDLE", 2]);
        });
        lib.setReport(function (evt, val, libconf) {
            try {
                var eName = evt.category;
                if (evt.type == "timing") {
                }
                else if (eName == DIREventName.play_time) {
                    // _czc.push(['_deleteCustomVar','是否登录']);
                    //_czc.push(["_setCustomVar", "play_time_"+val, val.toString(), 0]);
                    _czc.push(["_trackEvent", "play_time" + val, "time", "time", 1]);
                }
                else {
                    //_czc.push(["_trackEvent",category,action,label,value,nodeid]);
                    _czc.push(["_trackEvent", evt.category, evt.action, evt.label, val]);
                }
            }
            catch (e) {
                DIR.error(e);
                // console.log(e)
            }
        });
        DIR.register(lib);
    }
    // initGa();
    // initCNZZ();
})();

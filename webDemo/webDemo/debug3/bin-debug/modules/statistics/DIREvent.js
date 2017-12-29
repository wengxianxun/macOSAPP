var DIREventName;
(function (DIREventName) {
    //preload_page_show
    DIREventName["preload_page_show"] = "preload_page_show";
    DIREventName["preload_page_showTime"] = "preload_page_showTime";
    //loading页访问数
    DIREventName["load_page_show"] = "load_page_show";
    //进入互动试玩数
    DIREventName["playable_show"] = "playable_show";
    //互动(游戏屏幕点击)
    DIREventName["start_play"] = "start_play";
    //操作指引点击数
    DIREventName["click_user_guide"] = "click_user_guide";
    //第2阶段(关)展示
    DIREventName["stage_2_show"] = "stage_2_show";
    //第3阶段(关)展示
    DIREventName["stage_3_show"] = "stage_3_show";
    //详情页展示数
    DIREventName["end_card_show"] = "end_card_show";
    DIREventName["replay_show"] = "replay_show";
    DIREventName["click_replay"] = "click_replay";
    //点击下载(全程)
    DIREventName["download"] = "download";
    //点击下载(互动中点击下载)
    DIREventName["download_process"] = "download_process";
    //点击下载(	end card点击下载)
    DIREventName["download_end_card"] = "download_end_card";
    //落地页展示
    DIREventName["landing_page_show"] = "landing_page_show";
    //互动时长
    DIREventName["play_time"] = "play_time";
    //白屏事件
    DIREventName["white_screen"] = "white_screen";
    //加载时长
    DIREventName["load_time"] = "load_time";
    //可选统计
    //点击任意屏幕
    DIREventName["touch_screen"] = "touch_screen";
    //平均帧率
    DIREventName["avg_fps"] = "avg_fps";
    DIREventName["ga_load_time"] = "ga_load_time";
    DIREventName["ga_white_screen_time"] = "ga_white_screen_time";
})(DIREventName || (DIREventName = {}));
var DIREvent = {
    //preload页访问数
    preload_page_show: { category: "preload_page_show", action: "pv", label: "preload_page_show" },
    //loading页访问数
    load_page_show: { category: "load_page_show", action: "pv", label: "load_page_show" },
    // //进入互动试玩数
    playable_show: { category: "playable_show", action: "click", label: "playable_show" },
    //互动(游戏屏幕点击)
    start_play: { category: "start_play", action: "click", label: "start_play" },
    // 操作指引点击数
    click_user_guide: { category: "click_user_guide", action: "click", label: "click_user_guide" },
    // //通过第1关后点击next数
    stage_2_show: { category: "stage_2_show", action: "click", label: "stage_2_show" },
    // //通过第1关后点击next数
    stage_3_show: { category: "stage_3_show", action: "click", label: "stage_3_show" },
    // //通过第2关后点击next数
    // click_level_2_next="click_level_2_next",
    click_level_2_next: { category: "click_level_2_next", action: "click", label: "click_level_2_next" },
    // //详情页展示数
    // end_card_show="end_card_show",
    end_card_show: { category: "end_card_show", action: "click", label: "end_card_show" },
    replay_show: { category: "replay_show", action: "click", label: "replay_show" },
    click_replay: { category: "click_replay", action: "click", label: "click_replay" },
    // //点击下载(全程)
    download: { category: "download", action: "download", label: "download" },
    // //点击下载(过程)
    download_process: { category: "download_process", action: "download", label: "download_process" },
    // //点击下载(end_card)
    download_end_card: { category: "download_end_card", action: "download", label: "download_end_card" },
    // //加载时长
    preload_page_showTime: { category: "preload_page_showTime", action: "load", label: "preload_page_showTime", type: "timing" },
    // //加载时长
    load_time: { category: "load_time", action: "load", label: "load_time", type: "timing" },
    //白屏时间
    white_screen: { category: "white_screen", action: "response", label: "white_screen", type: "timing" },
    // //互动时长
    // play_time="play_time",
    play_time: { category: "play_time", action: "playTime", label: "play_time" },
    // //
    // avg_fps="avg_fps",
    avg_fps: { category: "avg_fps", action: "fps", label: "avg_fps" },
    touch_screen: { category: "touch_screen", action: "touch", label: "touch_screen" },
};
DIR.registerEvents(DIREvent);

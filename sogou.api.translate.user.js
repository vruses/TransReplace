// ==UserScript==
// @name        test
// @namespace   vurses
// @license     Mit
// @author      layenh
// @match       http://127.0.0.1:5500/test.html
// @grant       GM.xmlhttpRequest
// @grant       GM_xmlhttpRequest
// @connect     fanyi.sogou.com
// @version     1.0
// @require     https://update.greasyfork.org/scripts/533087/1572495/WbiSign.js
// @description 2025/5/4 15:54:11
// ==/UserScript==

// uuid生成
function uuidGen() {
  let t,
    n,
    r = "";
  for (t = 0; t < 32; t++) {
    (n = (16 * Math.random()) | 0),
      (8 !== t && 12 !== t && 16 !== t && 20 !== t) || (r += "-");
    const e = 3 & n,
      o = 16 === t ? 8 | e : n;
    r += (12 === t ? 4 : o).toString(16);
  }
  return r;
}
// 初始语言类型，可以是auto
const from = "auto";
// 目标语言类型
const to = "en";
// 初始语言内容
const text = "hello";
// 定时去搜狗翻译获取;
const secretCode = 109984457;
const keyS = SparkMD5.hash("".concat(from).concat(to).concat(text).concat(secretCode));
const uuid = uuidGen();
const data = {
  client: "pc",
  exchange: false,
  fr: "browser_pc",
  from: from,
  needQc: 1,
  s: keyS,
  text: text,
  to: to,
  uuid: uuid,
};
// 简易封装xhr
const gm_xhr = function () {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://fanyi.sogou.com/api/transpc/text/result",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      cookie:
        "ABTEST=8|1746324514|v17; SNUID=EF0CFA53585E6C128402DD9058D57EE7; SUID=B854A20B2450A20B000000006816CC22; wuid=1746324514576; FQV=5162ae4f50a3c534b8d17802ce056e24; translate.sess=36ca2419-c79a-424d-9654-ec4743137737; SUV=1746324513381; SGINPUT_UPSCREEN=1746324513403",
      onload: resolve,
      onerror: reject,
    });
  }).then((response) => {
    return response.responseText;
  });
};
gm_xhr()
  .then((res) => {
    console.log(JSON.parse(res));
    throw '123'
  })
  .catch((e) => {
    console.log(e);
    alert('出错了')
  });


// 初始化cookie
// 初始化window.__INITIAL_STATE__.common.CONFIG.secretCode
// 选择语言功能
// 出错重定向到搜狗
// 显示可翻译的语言，可设置
// 监听ctrl+space快捷键，将选中文本替换为翻译后的文本

// 支持的语言翻译选项
const all = [
  {
    lang: "ar",
    text: "阿拉伯语",
    play: !0,
    abbr: "阿",
  },
  {
    lang: "pl",
    text: "波兰语",
    play: !0,
    abbr: "波兰",
  },
  {
    lang: "da",
    text: "丹麦语",
    play: !0,
    abbr: "丹麦",
  },
  {
    lang: "de",
    text: "德语",
    play: !0,
    abbr: "德",
  },
  {
    lang: "ru",
    text: "俄语",
    play: !0,
    abbr: "俄",
  },
  {
    lang: "fr",
    text: "法语",
    play: !0,
    abbr: "法",
  },
  {
    lang: "fi",
    text: "芬兰语",
    play: !0,
    abbr: "芬",
  },
  {
    lang: "ko",
    text: "韩语",
    play: !0,
    abbr: "韩",
  },
  {
    lang: "nl",
    text: "荷兰语",
    play: !0,
    abbr: "荷",
  },
  {
    lang: "cs",
    text: "捷克语",
    play: !0,
    abbr: "捷克",
  },
  {
    lang: "pt",
    text: "葡萄牙语",
    play: !0,
    abbr: "葡",
  },
  {
    lang: "ja",
    text: "日语",
    play: !0,
    abbr: "日",
  },
  {
    lang: "sv",
    text: "瑞典语",
    play: !0,
    abbr: "瑞典",
  },
  {
    lang: "th",
    text: "泰语",
    play: !0,
    abbr: "泰",
  },
  {
    lang: "tr",
    text: "土耳其语",
    play: !1,
    abbr: "土",
  },
  {
    lang: "es",
    text: "西班牙语",
    play: !0,
    abbr: "西",
  },
  {
    lang: "hu",
    text: "匈牙利语",
    play: !0,
    abbr: "匈",
  },
  {
    lang: "en",
    text: "英语",
    play: !0,
    abbr: "英",
  },
  {
    lang: "it",
    text: "意大利语",
    play: !0,
    abbr: "意",
  },
  {
    lang: "vi",
    text: "越南语",
    play: !0,
    abbr: "越",
  },
  {
    lang: "zh-CHS",
    text: "中文",
    play: !0,
    abbr: "中",
  },
];

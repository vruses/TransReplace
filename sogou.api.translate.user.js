// ==UserScript==
// @name        选译替换器TransReplace
// @namespace   vurses
// @license     Mit
// @author      layenh
// @match       http://127.0.0.1:5500/test.html
// @match       https://fanyi.sogou.com/*
// @grant       GM.xmlhttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @connect     fanyi.sogou.com
// @version     1.0
// @require     https://update.greasyfork.org/scripts/533087/1572495/WbiSign.js
// @description 翻译选中的文本并替换
// ==/UserScript==

// 获取cookie和secretCode
let sogouCookie = GM_getValue("sogouCookie", "");
let secretCode = GM_getValue("secretCode", "");
if (location.href.includes("fanyi.sogou.com")) {
  sogouCookie = document.cookie;
  GM_setValue("sogouCookie", sogouCookie);
  window.addEventListener("load", () => {
    secretCode = unsafeWindow.__INITIAL_STATE__.common.CONFIG.secretCode;
    GM_setValue("secretCode", secretCode);
  });
}
// 注入语言菜单
unsafeWindow.addEventListener("load", () => {
  document.body.appendChild(createLangSwitcher(GM_setValue, GM_getValue));
});
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
// 简易封装xhr
const gm_xhr = function (data) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://fanyi.sogou.com/api/transpc/text/result",
      data: JSON.stringify(data),
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
// 监听是否替换翻译文本
document.addEventListener("keydown", (event) => {
  if (event.shiftKey) {
    const activeElement = document.activeElement;
    if (
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.isContentEditable
    ) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        // 初始语言类型，可以是auto
        const from = "auto";
        // 目标语言类型
        const to = GM_getValue("selectedLang", "zh-CHS");
        // 初始语言内容
        const text = selectedText;
        const keyS = SparkMD5.hash(
          "".concat(from).concat(to).concat(text).concat(secretCode)
        );
        const uuid = uuidGen();
        const data = {
          client: "pc",
          exchange: false,
          fr: "browser_pc",
          from,
          needQc: 1,
          s: keyS,
          text,
          to: GM_getValue("selectedLang", "zh-CHS"),
          uuid: uuid,
        };
        gm_xhr(data)
          .then((res) => {
            if (
              activeElement.tagName === "INPUT" ||
              activeElement.tagName === "TEXTAREA"
            ) {
              activeElement.value = JSON.parse(res).data.translate.dit || "";
            } else if (activeElement.isContentEditable) {
              activeElement.innerText = JSON.parse(res).data.translate.dit || "";
            }
          })
          .catch((e) => {
            console.log(e);
            alert("出错了");
            // location.href
          });
      }
    }
  }
});

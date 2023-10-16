"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const hasLogin = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.hasLogin);
    const loginBtn = () => {
      common_vendor.index.navigateTo({
        url: hasLogin.value ? "/pages/me/index" : "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    const registerBtn = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/register"
      });
    };
    const mobileFn = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile"
      });
    };
    const smsBtn = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-huoche",
          color: "white",
          size: "160"
        }),
        b: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-huoche",
          color: "white",
          size: "200"
        }),
        c: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-huoche",
          color: "white",
          size: "50"
        }),
        d: common_vendor.o(loginBtn),
        e: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        f: common_vendor.o(registerBtn),
        g: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        h: common_vendor.o(smsBtn),
        i: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        j: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        k: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        l: common_vendor.o(mobileFn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WWW/linni/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

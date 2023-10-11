"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const loginBtn = () => {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    const registerBtn = () => {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/register/register"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-huoche",
          color: "white",
          size: "200"
        }),
        b: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-huoche",
          color: "white",
          size: "50"
        }),
        c: common_vendor.o(loginBtn),
        d: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        e: common_vendor.o(registerBtn),
        f: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        g: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        h: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        i: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WWW/linni/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

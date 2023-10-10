"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loginBtn = () => {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(loginBtn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WWW/linni/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

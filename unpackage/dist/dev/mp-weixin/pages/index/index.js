"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const stores_company = require("../../stores/company.js");
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
    const useCompany = stores_company.useCompanyStore();
    const { company } = common_vendor.storeToRefs(useCompany);
    const hasLogin = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.hasLogin);
    const userInfo = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo);
    const loginBtn = () => {
      common_vendor.index.navigateTo({
        url: hasLogin.value ? "/pages/me/index" : "/pages/login/login"
      });
    };
    const registerBtn = () => {
      common_vendor.index.navigateTo({
        url: hasLogin.value ? "/pages/me/index" : "/pages/login/register"
      });
    };
    const mobileFn = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile"
      });
    };
    const yuyueBtn = (number) => {
      common_vendor.index.navigateTo({
        url: hasLogin.value ? number === 0 ? "/pages/yuyue/send" : "/pages/me/check" : "/pages/login/login"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-lorry",
          color: "white",
          size: "150"
        }),
        b: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-lorry",
          color: "white",
          size: "185"
        }),
        c: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-lorry",
          color: "white",
          size: "50"
        }),
        d: common_vendor.t(common_vendor.unref(company).title),
        e: common_vendor.o(loginBtn),
        f: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        g: common_vendor.o(registerBtn),
        h: common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).role && common_vendor.unref(userInfo).role.includes("member")
      }, common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).role && common_vendor.unref(userInfo).role.includes("member") ? {
        i: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        j: common_vendor.o(($event) => yuyueBtn(1))
      } : {
        k: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        l: common_vendor.o(($event) => yuyueBtn(0)),
        m: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        n: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        o: common_vendor.p({
          type: "right",
          size: "20",
          color: "rgba(0, 0, 0, 0.4)"
        }),
        p: common_vendor.o(mobileFn)
      }, {
        q: common_vendor.t(common_vendor.unref(company).mobile)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WWW/linni/app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

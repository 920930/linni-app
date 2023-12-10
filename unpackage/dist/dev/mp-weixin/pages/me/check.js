"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  _easycom_unicloud_db2();
}
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  _easycom_unicloud_db();
}
const _sfc_main = {
  __name: "check",
  setup(__props) {
    const _id = common_vendor.ref("");
    const orderRef = common_vendor.ref();
    common_vendor.onLoad((e) => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin || !uni_modules_uniIdPages_common_store.store.userInfo.role.includes("supplier")) {
        common_vendor.index.navigateBack();
      }
      _id.value = e.id;
    });
    const checkBtn = () => {
      orderRef.value.loadData({ clear: true });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.avatar_file.url,
        b: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo._id),
        c: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
        d: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.mobile),
        e: common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.role.includes("supplier")
      }, common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.role.includes("supplier") ? {
        f: common_vendor.o(checkBtn)
      } : {}, {
        g: common_vendor.w(({
          data,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: loading
          }, loading ? {} : {}, {
            b: common_vendor.t(data),
            c: common_vendor.t(error),
            d: i0,
            e: s0
          });
        }, {
          name: "d",
          path: "g",
          vueId: "cfc884da-0"
        }),
        h: common_vendor.sr(orderRef, "cfc884da-0", {
          "k": "orderRef"
        }),
        i: common_vendor.p({
          loadtime: "manual",
          collection: "web-order",
          getone: true,
          where: `_id=='${_id.value}'`
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cfc884da"], ["__file", "D:/WWW/linni/app/pages/me/check.vue"]]);
wx.createPage(MiniProgramPage);

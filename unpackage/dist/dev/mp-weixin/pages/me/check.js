"use strict";
const common_vendor = require("../../common/vendor.js");
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
      _id.value = e.id;
    });
    const checkBtn = () => {
      orderRef.value.loadData({ clear: true });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(checkBtn),
        b: common_vendor.w(({
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
          path: "b",
          vueId: "994ad680-0"
        }),
        c: common_vendor.sr(orderRef, "994ad680-0", {
          "k": "orderRef"
        }),
        d: common_vendor.p({
          loadtime: "manual",
          collection: "web-order",
          getone: true,
          where: `_id=='${_id.value}'`
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WWW/linni/app/pages/me/check.vue"]]);
wx.createPage(MiniProgramPage);

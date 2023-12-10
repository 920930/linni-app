"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const stores_company = require("../../stores/company.js");
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
    const code = common_vendor.reactive({
      _id: "",
      current: 0
    });
    const msg = [
      "二维码过期",
      "请扫码核实进入园区",
      "未到预约时间",
      "这个预约已过期",
      "这个预约已完成",
      "这个预约已被客户取消"
    ];
    const codeMsg = common_vendor.computed(() => msg[code.current]);
    stores_company.useCompanyStore();
    const orderRef = common_vendor.ref();
    common_vendor.onLoad((e) => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin || !uni_modules_uniIdPages_common_store.store.userInfo.role.includes("supplier")) {
        common_vendor.index.navigateBack();
      }
      const val = e.id.split(",");
      code._id = val[0];
      code.current = val[1];
    });
    const checkBtn = () => {
      if (code.current === 1) {
        orderRef.value.loadData({ clear: true }, (datav) => {
          console.log(datav);
        });
      } else {
        orderRef.value.loadData({ clear: true }, (datav) => {
          console.log(datav);
        });
        common_vendor.index.showToast({
          title: msg[code.current],
          icon: "none"
        });
      }
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
        g: code.current == 1
      }, code.current == 1 ? {} : {
        h: common_vendor.t(common_vendor.unref(codeMsg))
      }, {
        i: common_vendor.w(({
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
          path: "i",
          vueId: "cfc884da-0"
        }),
        j: common_vendor.sr(orderRef, "cfc884da-0", {
          "k": "orderRef"
        }),
        k: common_vendor.p({
          loadtime: "manual",
          collection: "web-order",
          getone: true,
          where: `_id=='${code._id}'`
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cfc884da"], ["__file", "D:/WWW/linni/app/pages/me/check.vue"]]);
wx.createPage(MiniProgramPage);

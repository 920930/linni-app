"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const stores_company = require("../../stores/company.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_unicloud_db)();
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
    common_vendor.computed(() => msg[code.current]);
    stores_company.useCompanyStore();
    const orderRef = common_vendor.ref();
    common_vendor.onLoad(() => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin || !uni_modules_uniIdPages_common_store.store.userInfo.role.includes("member")) {
        common_vendor.index.navigateBack();
      }
    });
    const checkBtn = () => {
      common_vendor.index.scanCode({
        onlyFromCamera: true,
        success(res) {
          const val = res.result;
          code._id = val[0];
          code.current = val[1];
          if (code.current === 1) {
            orderRef.value.loadData({ clear: true });
          } else {
            orderRef.value.loadData({ clear: true }, (v) => {
              common_vendor.index.showToast({
                title: v.car,
                icon: "none",
                duration: 5e3
              });
            });
            common_vendor.index.showToast({
              title: msg[code.current],
              icon: "none",
              duration: 3e3
            });
          }
        }
      });
    };
    const updateOrder = () => {
      orderRef.value.update(code._id, { state: 2 }, {
        toastTitle: "修改成功",
        success(res) {
          code.showData = false;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.avatar_file.url,
        b: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo._id),
        c: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
        d: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.mobile),
        e: common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.role.includes("member")
      }, common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.role.includes("member") ? {
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
            b: data
          }, data ? {
            c: common_vendor.t(data._id),
            d: common_vendor.t(data.car),
            e: common_vendor.t(data.genre),
            f: "cfc884da-1-" + i0 + ",cfc884da-0",
            g: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd hh:mm"
            }),
            h: "cfc884da-2-" + i0 + ",cfc884da-0",
            i: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            }),
            j: common_vendor.o(updateOrder)
          } : {}, {
            k: i0,
            l: s0
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
          where: `_id=='${code._id}'`
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cfc884da"], ["__file", "D:/WWW/linni/app/pages/me/check.vue"]]);
wx.createPage(MiniProgramPage);

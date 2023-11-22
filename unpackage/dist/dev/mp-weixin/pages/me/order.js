"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_SansnnUQRCode_js_sdk_uqrcode_uqrcode = require("../../uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_tag2 + _easycom_unicloud_db2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_tag + _easycom_unicloud_db + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    const db = common_vendor.$s.database();
    const orderRef = common_vendor.ref();
    const popupRef = common_vendor.ref();
    const STATE = {
      0: "已取消",
      1: "待入园",
      2: "已入园"
    };
    const colList = common_vendor.ref([
      db.collection("web-order").where(`uid == $cloudEnv_uid && state == 1`).orderBy("createdAt", "asc").getTemp(),
      db.collection("uni-id-users").field("_id,mobile,nickname").getTemp({ getOne: true })
    ]);
    common_vendor.onPullDownRefresh(() => {
      orderRef.value.loadData({ clear: true }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => orderRef.value.loadMore());
    const quxiaoBtn = (item) => {
      db.collection("web-order").doc(item._id).update({ state: 0 }).then(() => item.state = 0).catch((e) => {
        common_vendor.index.showToast({
          title: e.errMsg,
          icon: "error"
        });
      });
    };
    const codeFn = (item) => {
      popupRef.value.open();
      const qr = new uni_modules_SansnnUQRCode_js_sdk_uqrcode_uqrcode.b();
      qr.data = `{_id: ${item._id}, state: ${item.state}, start: ${item.start}, end: ${item.end}}`;
      qr.size = 200;
      qr.make();
      const canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {} : {}, {
            b: loading
          }, loading ? {} : {
            c: common_vendor.f(data, (item, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.uid[0].nickname),
                b: common_vendor.t(Date.now() > item.end && item.state === 1 ? "已过期" : STATE[item.state]),
                c: item.state && Date.now() < item.end ? 1 : "",
                d: "3549378c-1-" + i0 + "-" + i1 + ",3549378c-0",
                e: common_vendor.p({
                  date: item.start,
                  format: "yyyy-MM-dd hh:mm"
                }),
                f: "3549378c-2-" + i0 + "-" + i1 + ",3549378c-0",
                g: common_vendor.p({
                  date: item.end,
                  format: "hh:mm"
                }),
                h: common_vendor.t(item.car),
                i: item.state !== 0 && Date.now() < item.end
              }, item.state !== 0 && Date.now() < item.end ? {
                j: common_vendor.o(($event) => codeFn(item), item._id),
                k: "3549378c-3-" + i0 + "-" + i1 + ",3549378c-0",
                l: common_vendor.p({
                  ["custom-prefix"]: "iconfont",
                  type: "icon-ico",
                  size: "25"
                })
              } : {}, {
                m: item.state === 1
              }, item.state === 1 ? {
                n: common_vendor.f(item.genre, (v, i, i2) => {
                  return {
                    a: i,
                    b: "3549378c-4-" + i0 + "-" + i1 + "-" + i2 + ",3549378c-0",
                    c: common_vendor.p({
                      inverted: true,
                      text: v,
                      size: "mini"
                    })
                  };
                })
              } : {}, {
                o: item.state === 1 && Date.now() < item.end
              }, item.state === 1 && Date.now() < item.end ? {
                p: common_vendor.o(($event) => quxiaoBtn(item), item._id)
              } : {}, {
                q: item._id
              });
            })
          }, {
            d: i0,
            e: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "3549378c-0"
        }),
        b: common_vendor.sr(orderRef, "3549378c-0", {
          "k": "orderRef"
        }),
        c: common_vendor.p({
          collection: colList.value
        }),
        d: common_vendor.p({
          title: "等待扫码"
        }),
        e: common_vendor.sr(popupRef, "3549378c-5", {
          "k": "popupRef"
        }),
        f: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3549378c"], ["__file", "D:/WWW/linni/app/pages/me/order.vue"]]);
wx.createPage(MiniProgramPage);

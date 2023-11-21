"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_SansnnUQRCode_js_sdk_uqrcode_uqrcode = require("../../uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_tag2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_tag + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    const db = common_vendor.$s.database();
    const orderRef = common_vendor.ref();
    const STATE = {
      0: "已取消",
      1: "待入园",
      2: "已完成"
    };
    const colList = common_vendor.ref([
      db.collection("web-order").where(`uid == $cloudEnv_uid && state == 1`).orderBy("createdAt", "asc").getTemp(),
      db.collection("uni-id-users").field("_id,mobile,nickname").getTemp({ getOne: true })
    ]);
    common_vendor.onReady(() => {
      const qr = new uni_modules_SansnnUQRCode_js_sdk_uqrcode_uqrcode.b();
      qr.data = "https://uqrcode.cn/doc";
      qr.size = 200;
      qr.make();
      const canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    });
    common_vendor.onPullDownRefresh(() => {
      orderRef.value.loadData({ clear: true }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => orderRef.value.loadMore());
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
                b: common_vendor.t(STATE[item.state]),
                c: item.state ? 1 : "",
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
                i: "3549378c-3-" + i0 + "-" + i1 + ",3549378c-0",
                j: item.state === 1
              }, item.state === 1 ? {
                k: common_vendor.f(item.genre, (v, i, i2) => {
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
                l: item.state === 1
              }, item.state === 1 ? {} : {}, {
                m: item._id
              });
            }),
            d: common_vendor.p({
              ["custom-prefix"]: "iconfont",
              type: "icon-ico",
              size: "25"
            })
          }, {
            e: i0,
            f: s0
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
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3549378c"], ["__file", "D:/WWW/linni/app/pages/me/order.vue"]]);
wx.createPage(MiniProgramPage);

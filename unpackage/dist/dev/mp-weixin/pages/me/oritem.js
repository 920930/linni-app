"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uv_qrcode2 = common_vendor.resolveComponent("uv-qrcode");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_uv_qrcode2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uv_qrcode = () => "../../uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uv_qrcode + _easycom_unicloud_db)();
}
const _sfc_main = {
  __name: "oritem",
  setup(__props) {
    const id = common_vendor.ref("");
    const qrcode = common_vendor.ref();
    const avatar = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo.avatar_file.url || "https://www.uvui.cn/common/logo.png");
    const codeopt = common_vendor.reactive({
      size: 200,
      foregroundImageSrc: avatar,
      foregroundImageBorderRadius: 10
    });
    common_vendor.onReady((e) => id.value = e.id);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: loading
          }, loading ? {} : common_vendor.e({
            b: error
          }, error ? {} : common_vendor.e({
            c: common_vendor.t(data._id),
            d: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
            e: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.mobile),
            f: "9e31f644-1-" + i0 + ",9e31f644-0",
            g: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd hh:mm"
            }),
            h: "9e31f644-2-" + i0 + ",9e31f644-0",
            i: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            }),
            j: common_vendor.t(data.car),
            k: common_vendor.f(data.genre, (item, k1, i1) => {
              return {
                a: common_vendor.t(item),
                b: item
              };
            }),
            l: data.state === 1
          }, data.state === 1 ? common_vendor.e({
            m: data.start < Date.now() && data.end > Date.now()
          }, data.start < Date.now() && data.end > Date.now() ? {
            n: common_vendor.sr(qrcode, "9e31f644-3-" + i0 + ",9e31f644-0", {
              "k": "qrcode"
            }),
            o: "9e31f644-3-" + i0 + ",9e31f644-0",
            p: common_vendor.p({
              options: codeopt,
              value: "https://h5.uvui.cn"
            }),
            q: "9e31f644-4-" + i0 + ",9e31f644-0",
            r: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd"
            }),
            s: "9e31f644-5-" + i0 + ",9e31f644-0",
            t: common_vendor.p({
              date: data.start,
              format: "hh:mm"
            }),
            v: "9e31f644-6-" + i0 + ",9e31f644-0",
            w: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            })
          } : data.end < Date.now() ? {} : {}, {
            x: data.end < Date.now()
          }) : {}, {
            y: data.state === 0
          }, data.state === 0 ? {} : {}, {
            z: data.state === 2
          }, data.state === 2 ? {} : {})), {
            A: i0,
            B: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "9e31f644-0"
        }),
        b: common_vendor.p({
          collection: "web-order",
          loadtime: "onready",
          where: `_id == '${id.value}' && uid == $cloudEnv_uid`,
          getone: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e31f644"], ["__file", "D:/WWW/linni/app/pages/me/oritem.vue"]]);
wx.createPage(MiniProgramPage);

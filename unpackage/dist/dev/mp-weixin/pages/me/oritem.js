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
    const dbRef = common_vendor.ref();
    const qrcode = common_vendor.ref();
    common_vendor.ref(`_id == '${id}' && uid == $cloudEnv_uid`);
    const avatar = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo.avatar_file.url || "https://www.uvui.cn/common/logo.png");
    const codeopt = common_vendor.reactive({
      size: 200,
      foregroundImageSrc: avatar,
      foregroundImageBorderRadius: 10
    });
    common_vendor.onLoad((e) => {
      id.value = e.id;
    });
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
          }, error ? {} : {}, {
            c: data
          }, data ? common_vendor.e({
            d: common_vendor.t(data._id),
            e: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
            f: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.mobile),
            g: "9e31f644-1-" + i0 + ",9e31f644-0",
            h: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd hh:mm"
            }),
            i: "9e31f644-2-" + i0 + ",9e31f644-0",
            j: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            }),
            k: common_vendor.t(data.car),
            l: common_vendor.f(data.genre, (item, k1, i1) => {
              return {
                a: common_vendor.t(item),
                b: item
              };
            }),
            m: data.state === 1
          }, data.state === 1 ? common_vendor.e({
            n: data.start < Date.now() && data.end > Date.now()
          }, data.start < Date.now() && data.end > Date.now() ? {
            o: common_vendor.sr(qrcode, "9e31f644-3-" + i0 + ",9e31f644-0", {
              "k": "qrcode"
            }),
            p: "9e31f644-3-" + i0 + ",9e31f644-0",
            q: common_vendor.p({
              options: codeopt,
              value: "https://h5.uvui.cn"
            }),
            r: "9e31f644-4-" + i0 + ",9e31f644-0",
            s: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd"
            }),
            t: "9e31f644-5-" + i0 + ",9e31f644-0",
            v: common_vendor.p({
              date: data.start,
              format: "hh:mm"
            }),
            w: "9e31f644-6-" + i0 + ",9e31f644-0",
            x: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            })
          } : data.end < Date.now() ? {} : {}, {
            y: data.end < Date.now()
          }) : {}, {
            z: data.state === 0
          }, data.state === 0 ? {} : {}, {
            A: data.state === 2
          }, data.state === 2 ? {} : {}) : {}), {
            B: i0,
            C: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "9e31f644-0"
        }),
        b: common_vendor.sr(dbRef, "9e31f644-0", {
          "k": "dbRef"
        }),
        c: common_vendor.p({
          collection: "web-order",
          where: `uid == $cloudEnv_uid && _id == '${id.value}'`,
          getone: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e31f644"], ["__file", "D:/WWW/linni/app/pages/me/oritem.vue"]]);
wx.createPage(MiniProgramPage);

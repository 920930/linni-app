"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
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
    const orderRef = common_vendor.ref();
    const active = common_vendor.ref(true);
    common_vendor.reactive({
      show: false,
      value: ""
    });
    common_vendor.onReady(() => {
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#1576df"
      });
    });
    common_vendor.onPullDownRefresh(() => {
      orderRef.value.loadData({ clear: true }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => orderRef.value.loadMore());
    const activeBtn = (bool) => {
      active.value = bool;
    };
    const navito = (_id) => {
      common_vendor.index.navigateTo({
        url: "/pages/me/oritem?id=" + _id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.avatar_file.url,
        b: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
        c: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.mobile),
        d: active.value ? 1 : "",
        e: common_vendor.o(($event) => activeBtn(true)),
        f: !active.value ? 1 : "",
        g: common_vendor.o(($event) => activeBtn(false)),
        h: common_vendor.w(({
          data,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: loading
          }, loading ? {} : {}, {
            b: error
          }, error ? {} : {
            c: common_vendor.f(data, (item, k1, i1) => {
              return common_vendor.e({
                a: "3549378c-1-" + i0 + "-" + i1 + ",3549378c-0",
                b: common_vendor.p({
                  date: item.start,
                  format: "yyyy-MM-dd hh:mm"
                }),
                c: "3549378c-2-" + i0 + "-" + i1 + ",3549378c-0",
                d: common_vendor.p({
                  date: item.end,
                  format: "hh:mm"
                }),
                e: common_vendor.t(item.car),
                f: item.state !== 0 && Date.now() < item.end
              }, item.state !== 0 && Date.now() < item.end ? {
                g: common_vendor.o(($event) => _ctx.codeFn(item), item._id),
                h: "3549378c-3-" + i0 + "-" + i1 + ",3549378c-0",
                i: common_vendor.p({
                  ["custom-prefix"]: "iconfont",
                  type: "icon-ico",
                  size: "25"
                })
              } : {}, {
                j: common_vendor.f(item.genre, (v, i, i2) => {
                  return {
                    a: i,
                    b: "3549378c-4-" + i0 + "-" + i1 + "-" + i2 + ",3549378c-0",
                    c: common_vendor.p({
                      inverted: true,
                      text: v,
                      size: "mini"
                    })
                  };
                }),
                k: common_vendor.t(item.state === 1 && Date.now() > item.start && Date.now() < item.end ? "您现在可以入园，请尽快进入" : item.state === 1 && Date.now() < item.start ? "请在规定时间内入园，过期无效" : "您已经取消或完成，欢迎再次预约"),
                l: "3549378c-5-" + i0 + "-" + i1 + ",3549378c-0",
                m: item._id,
                n: common_vendor.o(($event) => navito(item._id), item._id)
              });
            }),
            d: common_vendor.p({
              type: "right",
              size: "20",
              color: "rgba(0, 0, 0, 0.4)"
            })
          }, {
            e: i0,
            f: s0
          });
        }, {
          name: "d",
          path: "h",
          vueId: "3549378c-0"
        }),
        i: common_vendor.sr(orderRef, "3549378c-0", {
          "k": "orderRef"
        }),
        j: common_vendor.p({
          collection: "web-order",
          where: `uid == $cloudEnv_uid ${active.value ? `&& state == 1 && ${Date.now()} < end` : ` && ${Date.now()} > end`}`,
          orderby: `${active.value ? "end asc" : "end desc"}`
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3549378c"], ["__file", "D:/WWW/linni/app/pages/me/order.vue"]]);
wx.createPage(MiniProgramPage);

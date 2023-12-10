"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uv_qrcode2 = common_vendor.resolveComponent("uv-qrcode");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_uv_qrcode2 + _easycom_uni_icons2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uv_qrcode = () => "../../uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uv_qrcode + _easycom_uni_icons + _easycom_unicloud_db)();
}
const _sfc_main = {
  __name: "oritem",
  setup(__props) {
    const dbRef = common_vendor.ref();
    const qrcode = common_vendor.ref();
    const avatar = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo.avatar_file.url || "https://www.uvui.cn/common/logo.png");
    const info = common_vendor.reactive({
      id: "",
      load: false,
      disabled: false
    });
    const code = common_vendor.ref({
      current: 0,
      value: ""
    });
    const codeInfo = [
      { id: 0, color: "#86909c", desc: "过期：请刷新二维码" },
      { id: 1, color: "#27a468", desc: "绿码：请扫码核实进入园区" },
      { id: 2, color: "#ffb400", desc: "黄码：未到预约时间 请等待" },
      { id: 3, color: "#f53f3f", desc: "红码：预约已过期 请重新预约" },
      { id: 4, color: "#b71de8", desc: "紫码：您已完成预约" },
      { id: 5, color: "#165dff", desc: "蓝码：您已取消本次预约" }
    ];
    const codeActive = common_vendor.computed(() => codeInfo[code.current]);
    const codeopt = common_vendor.reactive({
      data: "https://www.zcfsjt.com",
      size: 200,
      // 二维码颜色
      foregroundColor: "#27a468",
      // 二维码背景 后景色
      // areaColor: 'rgba(0, 0, 0, 0.1)',
      margin: 10,
      // 二维码背景 前景色
      backgroundColor: "white",
      foregroundImageSrc: avatar,
      foregroundImageBorderRadius: 10
    });
    common_vendor.onLoad((e) => info.id = e.id);
    common_vendor.onReady(() => {
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#1576df"
      });
      resetBtn();
    });
    const toUrl = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/me/check?id=" + id
      });
    };
    const resetBtn = async () => {
      info.load = true;
      dbRef.value.loadData({}, (datav) => {
        info.load = false;
        console.log(datav);
        if (datav.state == 1) {
          const now = Date.now();
          if (now < datav.start) {
            code.current = 2;
          } else if (now > datav.start && now < datav.end) {
            code.current = 1;
            setTimeout(() => resetTime(), 1e4);
          } else {
            code.current = 3;
          }
        } else if (datav.state == 0) {
          code.current = 5;
        } else {
          code.current = 4;
        }
        code.value = `${datav._id},${code.current}`;
        resetTime(codeInfo[code.current].color, 100);
      });
    };
    const resetTime = (color = "#86909c", t = 1e4) => {
      setTimeout(() => {
        codeopt.foregroundColor = color;
      }, t);
    };
    const backBtn = () => common_vendor.index.navigateBack();
    const newyuyueBtn = () => {
      common_vendor.index.redirectTo({
        url: "pages/yuyue/send"
      });
    };
    const updateOrderBtn = () => {
      if (![0, 1, 2, 5].includes(code.current)) {
        return common_vendor.index.showToast({
          title: "已过期/完成",
          icon: "none"
        });
      }
      dbRef.value.update(info.id, { state: 0 }, {
        toastTitle: "修改成功",
        success(res) {
          console.log(res);
          resetBtn();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: data
          }, data ? {
            b: common_vendor.t(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.nickname),
            c: common_vendor.t(data._id),
            d: "9e31f644-1-" + i0 + ",9e31f644-0",
            e: common_vendor.p({
              date: data.start,
              format: "yyyy-MM-dd hh:mm"
            }),
            f: "9e31f644-2-" + i0 + ",9e31f644-0",
            g: common_vendor.p({
              date: data.end,
              format: "hh:mm"
            }),
            h: common_vendor.sr(qrcode, "9e31f644-3-" + i0 + ",9e31f644-0", {
              "k": "qrcode"
            }),
            i: common_vendor.o(($event) => toUrl(data._id)),
            j: "9e31f644-3-" + i0 + ",9e31f644-0",
            k: common_vendor.p({
              options: codeopt,
              value: "data._id"
            }),
            l: common_vendor.t(common_vendor.unref(codeActive).desc),
            m: common_vendor.s(`color: ${common_vendor.unref(codeActive).color}`),
            n: info.load,
            o: common_vendor.o(resetBtn),
            p: "9e31f644-4-" + i0 + ",9e31f644-0",
            q: common_vendor.p({
              type: "right",
              size: "15"
            }),
            r: "9e31f644-5-" + i0 + ",9e31f644-0",
            s: common_vendor.p({
              type: "list",
              size: "40"
            }),
            t: common_vendor.o(backBtn),
            v: "9e31f644-6-" + i0 + ",9e31f644-0",
            w: common_vendor.p({
              type: "list",
              size: "40"
            }),
            x: common_vendor.o(newyuyueBtn),
            y: "9e31f644-7-" + i0 + ",9e31f644-0",
            z: common_vendor.p({
              type: "list",
              size: "40"
            }),
            A: common_vendor.o(updateOrderBtn)
          } : {}, {
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
          loadtime: "manual",
          where: `uid == $cloudEnv_uid && _id == '${info.id}'`,
          getone: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e31f644"], ["__file", "D:/WWW/linni/app/pages/me/oritem.vue"]]);
wx.createPage(MiniProgramPage);

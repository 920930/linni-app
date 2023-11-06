"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const stores_company = require("../../stores/company.js");
const pages_yuyue_lib = require("./lib.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_calendar2 + _easycom_uni_section2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_calendar + Divier + _easycom_uni_section)();
}
const Divier = () => "../../components/Divier.js";
const _sfc_main = {
  __name: "send",
  setup(__props) {
    const companyStore = stores_company.useCompanyStore();
    const db = common_vendor.$s.importObject("web-order");
    const disabled = common_vendor.ref(false);
    const selected = common_vendor.ref([
      { date: "2023-11-04", info: "可预约", data: { custom: "自定义信息", name: "自定义消息头" } },
      { date: "2023-11-05", info: "可预约", data: { custom: "自定义信息", name: "自定义消息头" } }
    ]);
    const insetInfo = common_vendor.reactive({
      date: pages_yuyue_lib.today().today,
      start: "",
      end: "",
      genre: [],
      car: ""
    });
    const active = common_vendor.reactive({
      time: -1,
      genre: 0
    });
    common_vendor.onMounted(() => {
    });
    const checkDate = (e) => {
      insetInfo.date = e.fulldate;
      const one = selected.value.find((res) => res.date === e.fulldate);
      if (one)
        return;
      selected.value.push({
        date: e.fulldate,
        info: "打卡"
      });
    };
    const checkTime = (i) => {
      const ret = companyStore.company.times.find((item, n) => n == i);
      if (!ret.num) {
        active.time = -1;
        return common_vendor.index.showToast({
          title: "此时段已全部预约",
          icon: "none",
          duration: 3e3
        });
      }
      active.time = i;
      insetInfo.start = ret.start;
      insetInfo.end = ret.end;
    };
    const genreChange = (e) => insetInfo.genre = e.detail.value;
    const carChange = (e) => insetInfo.car = e.detail.value;
    const sendBtn = () => {
      if (!insetInfo.start) {
        return common_vendor.index.showToast({ title: "请选择到店时间", icon: "none" });
      }
      if (!insetInfo.genre.length) {
        return common_vendor.index.showToast({ title: "请选择送货类型", icon: "none" });
      }
      if (!insetInfo.car) {
        return common_vendor.index.showToast({ title: "请选择送货车牌", icon: "none" });
      }
      const start = `${insetInfo.date} ${insetInfo.start}`;
      const end = `${insetInfo.date} ${insetInfo.end}`;
      disabled.value = true;
      db.create({ ...insetInfo, start, end }).then(() => {
      }).finally(() => disabled.value = false);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(checkDate),
        b: common_vendor.p({
          date: insetInfo.date,
          insert: true,
          ["start-date"]: common_vendor.unref(pages_yuyue_lib.today)().today,
          ["end-date"]: common_vendor.unref(pages_yuyue_lib.today)(common_vendor.unref(companyStore).company.day).today
        }),
        c: common_vendor.p({
          title: "请选择到店时间",
          ["sub-title"]: `您已选择日期为：${insetInfo.date}`,
          type: "line"
        }),
        d: common_vendor.f(common_vendor.unref(companyStore).company.times, (item, i, i0) => {
          return {
            a: common_vendor.t(item.start),
            b: common_vendor.t(item.end),
            c: common_vendor.t(item.num),
            d: i == active.time ? 1 : "",
            e: i,
            f: common_vendor.o(($event) => checkTime(i), i)
          };
        }),
        e: common_vendor.p({
          title: "请选择送货类型",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`,
          type: "line"
        }),
        f: common_vendor.f(common_vendor.unref(companyStore).company.genre, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.t(item),
            c: item
          };
        }),
        g: common_vendor.o(genreChange),
        h: common_vendor.p({
          title: "请选择送货车牌",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`,
          type: "line"
        }),
        i: common_vendor.f(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.cars, (car, i, i0) => {
          return {
            a: car,
            b: common_vendor.t(car),
            c: i
          };
        }),
        j: common_vendor.o(carChange),
        k: common_vendor.o(sendBtn),
        l: disabled.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d95c4bf3"], ["__file", "D:/WWW/linni/app/pages/yuyue/send.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const stores_company = require("../../stores/company.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_wu_calendar2 = common_vendor.resolveComponent("wu-calendar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_wu_calendar2 + _easycom_uni_section2)();
}
const _easycom_wu_calendar = () => "../../uni_modules/wu-calendar/components/wu-calendar/wu-calendar.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_wu_calendar + Divier + _easycom_uni_section)();
}
const Divier = () => "../../components/Divier.js";
const _sfc_main = {
  __name: "send",
  setup(__props) {
    const companyStore = stores_company.useCompanyStore();
    const db = common_vendor.$s.importObject("web-order");
    const disabled = common_vendor.ref(false);
    const selected = common_vendor.ref([]);
    const selectedTimes = common_vendor.ref([]);
    const insetInfo = common_vendor.reactive({
      date: "",
      start: "",
      end: "",
      genre: [],
      car: ""
    });
    const active = common_vendor.reactive({
      time: -1,
      genre: 0,
      startDate: "",
      endDate: ""
    });
    common_vendor.onLoad(async () => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.redirectTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      }
      try {
        const ret = await db.notices();
        selected.value = ret.data;
        active.startDate = selected.value[0].date;
        active.endDate = selected.value[selected.value.length - 1].date;
      } catch (err) {
        if (err.errCode === "uni-id-token-expired")
          uni_modules_uniIdPages_common_store.mutations.logout();
      }
    });
    const calendarChange = (e) => {
      insetInfo.date = e.fulldate;
      const one = selected.value.find((item) => item.date == e.fulldate);
      one && (selectedTimes.value = one.times);
    };
    const checkTime = (i) => {
      const ret = selectedTimes.value.find((item, index) => index == i);
      if (ret.num <= 0) {
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
        return common_vendor.index.showToast({ title: "请选择到店日期", icon: "none" });
      }
      const one = selected.value.find((item) => item.data == insetInfo.date);
      if (one) {
        return common_vendor.index.showToast({ title: `${insetInfo.date}不可选`, icon: "none" });
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
        common_vendor.index.navigateTo({
          url: "/pages/me/order"
        });
      }).catch((err) => {
        if (err.errCode === "uni-id-token-expired")
          uni_modules_uniIdPages_common_store.mutations.logout();
      }).finally(() => disabled.value = false);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(calendarChange),
        b: common_vendor.p({
          insert: true,
          lunar: true,
          ["use-today"]: false,
          startDate: active.startDate,
          endDate: active.endDate,
          selected: selected.value
        }),
        c: common_vendor.p({
          title: "请选择到店时间",
          ["sub-title"]: `您已选择日期为：${insetInfo.date}`,
          type: "line"
        }),
        d: insetInfo.date
      }, insetInfo.date ? {
        e: common_vendor.f(selectedTimes.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.start),
            b: common_vendor.t(item.end),
            c: common_vendor.t(item.num),
            d: i == active.time ? 1 : "",
            e: item.startMins,
            f: common_vendor.o(($event) => checkTime(i), item.startMins)
          };
        })
      } : {}, {
        f: common_vendor.p({
          title: "请选择送货类型",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`,
          type: "line"
        }),
        g: common_vendor.f(common_vendor.unref(companyStore).company.genre, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.t(item),
            c: item
          };
        }),
        h: common_vendor.o(genreChange),
        i: common_vendor.p({
          title: "请选择送货车牌",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`,
          type: "line"
        }),
        j: common_vendor.f(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.cars, (car, i, i0) => {
          return {
            a: car,
            b: common_vendor.t(car),
            c: i
          };
        }),
        k: common_vendor.o(carChange),
        l: common_vendor.o(sendBtn),
        m: disabled.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d95c4bf3"], ["__file", "D:/WWW/linni/app/pages/yuyue/send.vue"]]);
wx.createPage(MiniProgramPage);

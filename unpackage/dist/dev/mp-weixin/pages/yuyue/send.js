"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
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
    const selected = common_vendor.ref([
      { date: "2023-10-18", info: "可预约", data: { custom: "自定义信息", name: "自定义消息头" } },
      { date: "2023-10-19", info: "可预约", data: { custom: "自定义信息", name: "自定义消息头" } },
      { date: "2023-10-20", info: "可预约", data: { custom: "自定义信息", name: "自定义消息头" } },
      { date: "2023-10-21", info: "可预约" }
    ]);
    const timers = common_vendor.ref([
      { time: "08:00 ~ 09:00", num: 30 },
      { time: "09:00 ~ 10:00", num: 30 },
      { time: "10:00 ~ 11:00", num: 30 },
      { time: "11:00 ~ 12:00", num: 30 },
      { time: "13:00 ~ 14:00", num: 30 },
      { time: "14:00 ~ 15:00", num: 30 },
      { time: "15:00 ~ 16:00", num: 30 },
      { time: "16:00 ~ 17:00", num: 30 },
      { time: "17:00 ~ 18:00", num: 0 }
    ]);
    const insetInfo = common_vendor.reactive({
      date: "",
      time: "",
      guiti: "",
      car: ""
    });
    const active = common_vendor.reactive({
      time: -1,
      guiti: 0
    });
    common_vendor.onMounted(() => {
      insetInfo.date = selected.value[0].date;
      insetInfo.car = uni_modules_uniIdPages_common_store.store.userInfo.cars[0];
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
      const ret = timers.value.find((item, n) => n == i);
      if (!ret.num) {
        active.time = -1;
        return common_vendor.index.showToast({
          title: "此时段已全部预约",
          icon: "none",
          duration: 3e3
        });
      }
      active.time = i;
      insetInfo.time = ret.time;
    };
    const carChange = (e) => insetInfo.car = e.detail.value;
    const sendBtn = () => {
      console.log(insetInfo);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(checkDate),
        b: common_vendor.p({
          insert: true,
          ["start-date"]: "2023-10-18",
          ["end-date"]: "2023-10-22",
          selected: selected.value
        }),
        c: common_vendor.p({
          title: "请选择到店时间",
          ["sub-title"]: `您已选择日期为：${insetInfo.date}`,
          type: "line"
        }),
        d: common_vendor.f(timers.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.time),
            b: common_vendor.t(item.num),
            c: i == active.time ? 1 : "",
            d: i,
            e: common_vendor.o(($event) => checkTime(i), i)
          };
        }),
        e: common_vendor.p({
          title: "请选择送货类型",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.time}`,
          type: "line"
        }),
        f: common_vendor.o((...args) => _ctx.guitiChange && _ctx.guitiChange(...args)),
        g: common_vendor.p({
          title: "请选择送货车牌",
          ["sub-title"]: `您已选择时间为：${insetInfo.date} ${insetInfo.time}`,
          type: "line"
        }),
        h: common_vendor.f(common_vendor.unref(uni_modules_uniIdPages_common_store.store).userInfo.cars, (car, i, i0) => {
          return {
            a: car,
            b: i === 0,
            c: common_vendor.t(car),
            d: i
          };
        }),
        i: common_vendor.o(carChange),
        j: common_vendor.o(sendBtn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d95c4bf3"], ["__file", "D:/WWW/linni/app/pages/yuyue/send.vue"]]);
wx.createPage(MiniProgramPage);

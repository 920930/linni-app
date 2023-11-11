"use strict";
const uni_modules_wuCalendar_components_wuCalendar_util = require("./util.js");
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuCalendar_components_wuCalendar_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wuCalendar_components_i18n_index = require("../i18n/index.js");
require("./calendar.js");
require("../../../wu-ui-tools/libs/function/index.js");
require("../../../wu-ui-tools/libs/function/test.js");
require("../../../wu-ui-tools/libs/function/digit.js");
require("../../../wu-ui-tools/libs/function/color/index.js");
require("../../../wu-ui-tools/libs/function/color/color.js");
require("../../../wu-ui-tools/libs/function/color/color-string/index.js");
require("../../../wu-ui-tools/libs/function/color/color-name/index.js");
require("../../../wu-ui-tools/libs/function/color/simple-swizzle/index.js");
require("../../../wu-ui-tools/libs/function/color/is-arrayish/index.js");
require("../../../wu-ui-tools/libs/function/color/color-convert/index.js");
require("../../../wu-ui-tools/libs/function/color/color-convert/route.js");
require("../../../wu-ui-tools/libs/function/color/color-convert/conversions.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_wuCalendar_components_i18n_index.i18nMessages);
const _sfc_main = {
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuCalendar_components_wuCalendar_props.props],
  emits: ["close", "confirm", "change", "monthSwitch"],
  data() {
    return {
      show: false,
      weeks: [],
      preWeeks: [],
      nextWeeks: [],
      weeksMonth: null,
      preWeeksMonth: null,
      nextWeeksMonth: null,
      calendar: {},
      nowDate: "",
      aniMaskShow: false,
      swiperCurrent: 1,
      swiperChangeDirection: "",
      pickerDate: ""
    };
  },
  computed: {
    /**
     * for i18n
     */
    okText() {
      return t("wu-calender.ok");
    },
    cancelText() {
      return t("wu-calender.cancel");
    },
    YearText() {
      return t("wu-calender.year");
    },
    MonthText() {
      return t("wu-calender.month");
    },
    todayText() {
      return t("wu-calender.today");
    },
    monText() {
      return t("wu-calender.MON");
    },
    TUEText() {
      return t("wu-calender.TUE");
    },
    WEDText() {
      return t("wu-calender.WED");
    },
    THUText() {
      return t("wu-calender.THU");
    },
    FRIText() {
      return t("wu-calender.FRI");
    },
    SATText() {
      return t("wu-calender.SAT");
    },
    SUNText() {
      return t("wu-calender.SUN");
    }
  },
  watch: {
    date(newVal) {
      this.cale.cleanRange();
      this.init(newVal);
      this.pickerDate = newVal;
    },
    mode(newVal) {
      this.cale.cleanRange();
      this.cale.resetMode(newVal);
      this.init(this.date);
    },
    startDate(val) {
      this.cale.resetSatrtDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.assignmentWeeks();
    },
    endDate(val) {
      this.cale.resetEndDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.assignmentWeeks();
    },
    monthShowCurrentMonth(val) {
      this.cale.resetMonthShowCurrentMonth(val);
      this.setDate(this.nowDate.fullDate);
    },
    rangeEndRepick(val) {
      this.cale.resetRangeEndRepick(val);
    },
    selected(newVal) {
      this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
      this.assignmentWeeks();
    }
  },
  created() {
    this.cale = new uni_modules_wuCalendar_components_wuCalendar_util.Calendar({
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      mode: this.mode,
      monthShowCurrentMonth: this.monthShowCurrentMonth,
      rangeEndRepick: this.rangeEndRepick,
      rangeSameDay: this.rangeSameDay
    });
    this.init(this.date);
  },
  methods: {
    // 取消穿透
    clean() {
      if (this.maskClick)
        this.close();
    },
    bindDateChange(e) {
      const value = e.detail.value + "-1";
      this.setDate(value);
      const {
        year,
        month
      } = this.cale.getDate(value);
      this.$emit("monthSwitch", {
        year,
        month
      });
    },
    /**
     * 初始化日期显示
     * @param {Object} date
     */
    init(date) {
      let firstDate = this.mode == "single" ? date : date[0];
      if (this.date) {
        let dateType = Object.prototype.toString.call(this.date);
        if (this.mode == "single" && dateType != "[object String]") {
          return console.error(`类型错误，mode=${this.mode}时，date=String`);
        } else if (this.mode != "single" && dateType != "[object Array]") {
          return console.error(`类型错误，mode=${this.mode}时，date=Array`);
        }
        if (this.mode == "multiple") {
          this.cale.multiple = this.date;
          this.cale._getWeek(this.cale.multiple[this.cale.multiple.length - 1]);
        } else if (this.mode == "range") {
          date[0] ? this.cale.setRange(date[0]) : "";
          date[1] ? this.cale.setRange(date[1]) : "";
        }
      } else if (this.useToday) {
        if (this.mode == "multiple") {
          this.cale.multiple = [this.cale.date.fullDate];
          this.cale._getWeek(this.cale.multiple[this.cale.multiple.length - 1]);
        } else if (this.mode == "range") {
          this.cale.setRange(this.cale.date.fullDate);
        }
      }
      this.cale.setDate(firstDate);
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(firstDate);
      this.weeksMonth = this.nowDate.month;
      if (this.useToday && !this.date || this.date) {
        this.calendar = this.nowDate;
      }
      if (this.slideSwitchMode !== "none") {
        this.preWeeks = this.cale._getWeek(
          this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate,
          false
        );
        this.preWeeksMonth = this.cale.getDate(this.nowDate.fullDate, -1, "month").month;
        this.nextWeeks = this.cale._getWeek(
          this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate,
          false
        );
        this.nextWeeksMonth = this.cale.getDate(this.nowDate.fullDate, 1, "month").month;
      }
    },
    /**
     * 打开日历弹窗
     */
    open() {
      if (this.clearDate && !this.insert) {
        this.cale.cleanRange();
        this.cale.cleanMultiple();
        this.swiperCurrent = 1;
        this.init(this.date);
      }
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.aniMaskShow = true;
        }, 50);
      });
    },
    /**
     * 关闭日历弹窗
     */
    close() {
      this.aniMaskShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
          this.$emit("close");
        }, 300);
      });
    },
    /**
     * 确认按钮
     */
    confirm() {
      this.setEmit("confirm");
      this.close();
    },
    /**
     * 变化触发
     */
    change() {
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    /**
     * 选择月份触发
     */
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month)
      });
    },
    /**
     * 派发事件
     * @param {Object} name
     */
    setEmit(name) {
      let {
        year,
        month,
        date,
        fullDate,
        lunar,
        extraInfo
      } = this.calendar;
      this.$emit(name, {
        range: this.cale.rangeStatus,
        multiple: this.cale.multiple,
        mode: this.mode,
        year,
        month,
        date,
        fulldate: fullDate,
        lunar,
        extraInfo: extraInfo || {}
      });
    },
    /**
     * 选择天触发
     * @param {Object} weeks
     */
    choiceDate(weeks) {
      if (weeks.disable || weeks.empty || this.disabledChoice)
        return;
      this.calendar = weeks;
      this.cale.setRange(this.calendar.fullDate);
      this.cale.setMultiple(this.calendar.fullDate);
      if (this.slideSwitchMode !== "none") {
        let weekName = "";
        switch (this.swiperCurrent) {
          case 0:
            weekName = "preWeeks";
            if (this.mode == "range") {
              this.weeks = this.cale._getWeek(this.weeks[0].find((item) => item.fullDate).fullDate, false);
              this.nextWeeks = this.cale._getWeek(
                this.nextWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
          case 1:
            weekName = "weeks";
            if (this.mode == "range") {
              this.preWeeks = this.cale._getWeek(
                this.preWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
              this.nextWeeks = this.cale._getWeek(
                this.nextWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
          case 2:
            weekName = "nextWeeks";
            if (this.mode == "range") {
              this.weeks = this.cale._getWeek(this.weeks[0].find((item) => item.fullDate).fullDate, false);
              this.preWeeks = this.cale._getWeek(
                this.preWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
        }
        this[weekName] = this.cale.weeks;
      } else {
        this.weeks = this.cale.weeks;
      }
      this.change();
    },
    /**
     * 回到今天
     */
    backToday() {
      const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`;
      if (this.cale.rangeStatus.before && !this.cale.rangeStatus.after) {
        this.cale.rangeStatus.before = "";
      }
      this.setDate(this.cale.date.fullDate);
      let date = this.nowDate;
      this.calendar = date;
      this.pickerDate = date.fullDate;
      this.cale.setRange(date.fullDate);
      const todayYearMonth = `${date.year}-${date.month}`;
      if (nowYearMonth !== todayYearMonth) {
        this.monthSwitch();
      }
      this.setDate(this.cale.date.fullDate);
      this.swiperCurrentChangeWeeks();
      this.change();
    },
    /**
     * 上个月
     */
    pre() {
      this.swiperChangeDirection = "pre";
      this.weeksChange();
    },
    /**
     * 下个月
     */
    next() {
      this.swiperChangeDirection = "next";
      this.weeksChange();
    },
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.cale.setDate(date);
      this.assignmentWeeks();
      this.nowDate = this.cale.getInfo(date);
    },
    /**
     * 用来将cale.weeks 赋值到 weeks
     */
    assignmentWeeks() {
      let weekName = "";
      switch (this.swiperCurrent) {
        case 0:
          weekName = "preWeeks";
          break;
        case 1:
          weekName = "weeks";
          break;
        case 2:
          weekName = "nextWeeks";
          break;
      }
      this[weekName] = this.cale.weeks;
    },
    /**
     * 滑动切换日期
     */
    swiperChange(e) {
      if (e.detail.source !== "touch")
        return;
      let curr = e.detail.current;
      if (curr - this.swiperCurrent == 1 || curr - this.swiperCurrent == -2) {
        this.swiperChangeDirection = "next";
      } else {
        this.swiperChangeDirection = "pre";
      }
      this.swiperCurrent = curr;
      this.weeksChange();
    },
    /**
     * weeks改变
     */
    weeksChange() {
      this.setDate(this.cale.getDate(
        this.nowDate.fullDate,
        this.swiperChangeDirection == "next" ? 1 : -1,
        "month"
      ).fullDate);
      this.swiperCurrentChangeWeeks();
      this.monthSwitch();
      this.pickerDate = this.nowDate.fullDate;
    },
    /**
     * swiperCurrent改变需要改动的weeks
     */
    swiperCurrentChangeWeeks() {
      if (this.slideSwitchMode !== "none") {
        if (this.swiperChangeDirection == "next") {
          let newDate = this.cale.getDate(this.nowDate.fullDate, 1, "month");
          let newWeeks = this.cale._getWeek(newDate.fullDate, false);
          let newWeeksMonth = newDate.month;
          if (this.swiperCurrent == 0) {
            this.weeks = newWeeks;
            this.weeksMonth = newWeeksMonth;
          } else if (this.swiperCurrent == 1) {
            this.nextWeeks = newWeeks;
            this.nextWeeksMonth = newWeeksMonth;
          } else {
            this.preWeeks = newWeeks;
            this.preWeeksMonth = newWeeksMonth;
          }
        } else {
          let newDate = this.cale.getDate(this.nowDate.fullDate, -1, "month");
          let newWeeks = this.cale._getWeek(newDate.fullDate, false);
          let newWeeksMonth = newDate.month;
          if (this.swiperCurrent == 0) {
            this.nextWeeks = newWeeks;
            this.nextWeeksMonth = newWeeksMonth;
          } else if (this.swiperCurrent == 1) {
            this.preWeeks = newWeeks;
            this.preWeeksMonth = newWeeksMonth;
          } else {
            this.weeks = newWeeks;
            this.weeksMonth = newWeeksMonth;
          }
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_wu_calendar_item2 = common_vendor.resolveComponent("wu-calendar-item");
  _easycom_wu_calendar_item2();
}
const _easycom_wu_calendar_item = () => "../wu-calendar-item/wu-calendar-item.js";
if (!Math) {
  _easycom_wu_calendar_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.insert && $data.show,
    b: $data.aniMaskShow ? 1 : "",
    c: common_vendor.o((...args) => $options.clean && $options.clean(...args)),
    d: !_ctx.insert
  }, !_ctx.insert ? {
    e: common_vendor.t($options.cancelText),
    f: common_vendor.o((...args) => $options.close && $options.close(...args)),
    g: common_vendor.t($options.okText),
    h: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {}, {
    i: _ctx.slideSwitchMode == "vertical"
  }, _ctx.slideSwitchMode == "vertical" ? {
    j: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    k: common_vendor.t(($data.nowDate.year || "") + $options.YearText + ($data.nowDate.month || "") + $options.MonthText),
    l: $data.pickerDate,
    m: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    n: common_vendor.o((...args) => $options.next && $options.next(...args)),
    o: common_vendor.t($options.todayText),
    p: common_vendor.o((...args) => $options.backToday && $options.backToday(...args))
  } : {
    q: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    r: common_vendor.t(($data.nowDate.year || "") + $options.YearText + ($data.nowDate.month || "") + $options.MonthText),
    s: $data.pickerDate,
    t: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    v: common_vendor.o((...args) => $options.next && $options.next(...args)),
    w: common_vendor.t($options.todayText),
    x: common_vendor.o((...args) => $options.backToday && $options.backToday(...args))
  }, {
    y: common_vendor.t($options.SUNText),
    z: common_vendor.t($options.monText),
    A: common_vendor.t($options.TUEText),
    B: common_vendor.t($options.WEDText),
    C: common_vendor.t($options.THUText),
    D: common_vendor.t($options.FRIText),
    E: common_vendor.t($options.SATText),
    F: _ctx.slideSwitchMode !== "none"
  }, _ctx.slideSwitchMode !== "none" ? common_vendor.e({
    G: _ctx.showMonth
  }, _ctx.showMonth ? {
    H: common_vendor.t($data.preWeeksMonth)
  } : {}, {
    I: common_vendor.f($data.preWeeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "bc534f10-0-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: _ctx.selected,
              lunar: _ctx.lunar,
              color: _ctx.color,
              startText: _ctx.startText,
              endText: _ctx.endText
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    J: _ctx.showMonth
  }, _ctx.showMonth ? {
    K: common_vendor.t($data.weeksMonth)
  } : {}, {
    L: common_vendor.f($data.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "bc534f10-1-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: _ctx.selected,
              lunar: _ctx.lunar,
              color: _ctx.color,
              startText: _ctx.startText,
              endText: _ctx.endText
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    M: _ctx.showMonth
  }, _ctx.showMonth ? {
    N: common_vendor.t($data.nextWeeksMonth)
  } : {}, {
    O: common_vendor.f($data.nextWeeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "bc534f10-2-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: _ctx.selected,
              lunar: _ctx.lunar,
              color: _ctx.color,
              startText: _ctx.startText,
              endText: _ctx.endText
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    P: _ctx.slideSwitchMode == "vertical",
    Q: $data.swiperCurrent,
    R: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args))
  }) : {
    S: common_vendor.f($data.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "bc534f10-3-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: _ctx.selected,
              lunar: _ctx.lunar,
              color: _ctx.color,
              startText: _ctx.startText,
              endText: _ctx.endText
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    })
  }, {
    T: _ctx.insert || $data.show,
    U: !_ctx.insert ? 1 : "",
    V: $data.aniMaskShow ? 1 : "",
    W: common_vendor.o(() => {
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bc534f10"], ["__file", "D:/WWW/linni/app/uni_modules/wu-calendar/components/wu-calendar/wu-calendar.vue"]]);
wx.createComponent(Component);

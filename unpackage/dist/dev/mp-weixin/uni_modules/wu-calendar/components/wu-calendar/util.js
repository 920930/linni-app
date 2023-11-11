"use strict";
const uni_modules_wuCalendar_components_wuCalendar_calendar = require("./calendar.js");
class Calendar {
  constructor({
    date,
    selected,
    startDate,
    endDate,
    mode,
    monthShowCurrentMonth,
    rangeEndRepick,
    rangeSameDay
  } = {}) {
    this.date = this.getDate(/* @__PURE__ */ new Date());
    this.selected = selected || [];
    this.startDate = startDate;
    this.endDate = endDate;
    this.mode = mode;
    this.rangeEndRepick = rangeEndRepick;
    this.rangeSameDay = rangeSameDay;
    this.monthShowCurrentMonth = monthShowCurrentMonth;
    this.cleanRange();
    this.weeks = {};
    this.multiple = [];
  }
  /**
   * 设置日期
   * @param {Object} date
   */
  setDate(date) {
    this.selectDate = this.getDate(date);
    this._getWeek(this.selectDate.fullDate);
  }
  /**
   * 清除范围
   */
  cleanRange() {
    this.rangeStatus = {
      before: "",
      after: "",
      data: []
    };
  }
  /**
   * 清除多选
   */
  cleanMultiple() {
    this.multiple = [];
  }
  /**
   * 重置开始日期
   */
  resetSatrtDate(startDate) {
    this.startDate = startDate;
  }
  /**
   * 重置结束日期
   */
  resetEndDate(endDate) {
    this.endDate = endDate;
  }
  /**
   * 重置是否每月仅显示当月数据
   * @param {Boolean} show 是否仅显示当月数据 
   */
  resetMonthShowCurrentMonth(show) {
    this.monthShowCurrentMonth = show;
  }
  // 重置允许范围内重选结束日期
  resetRangeEndRepick(val) {
    this.rangeEndRepick = val;
  }
  // 重置日期选择模式
  resetMode(val) {
    this.mode = val;
  }
  /**
   * 获取任意时间
   */
  getDate(date, AddDayCount = 0, str = "day") {
    if (!date) {
      date = /* @__PURE__ */ new Date();
    }
    if (typeof date !== "object") {
      date = date.replace(/-/g, "/");
    }
    const dd = new Date(date);
    switch (str) {
      case "day":
        dd.setDate(dd.getDate() + AddDayCount);
        break;
      case "month":
        if (dd.getDate() === 31 && AddDayCount > 0) {
          dd.setDate(dd.getDate() + AddDayCount);
        } else {
          const preMonth = dd.getMonth();
          dd.setMonth(preMonth + AddDayCount);
          const nextMonth = dd.getMonth();
          if (AddDayCount < 0 && preMonth !== 0 && nextMonth - preMonth > AddDayCount) {
            dd.setMonth(nextMonth + (nextMonth - preMonth + AddDayCount));
          }
          if (AddDayCount > 0 && nextMonth - preMonth > AddDayCount) {
            dd.setMonth(nextMonth - (nextMonth - preMonth - AddDayCount));
          }
        }
        break;
      case "year":
        dd.setFullYear(dd.getFullYear() + AddDayCount);
        break;
    }
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return {
      fullDate: y + "-" + m + "-" + d,
      year: y,
      month: m,
      date: d,
      day: dd.getDay()
    };
  }
  /**
   * 获取上月剩余天数
   */
  _getLastMonthDays(firstDay, full) {
    let dateArr = [];
    for (let i = firstDay; i > 0; i--) {
      const beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
      dateArr.push({
        date: beforeDate,
        month: full.month - 1,
        lunar: this.getlunar(full.year, full.month - 1, beforeDate),
        disable: true
      });
    }
    return dateArr;
  }
  /**
   * 获取本月天数
   */
  _currentMonthDys(dateData, full) {
    let dateArr = [];
    let fullDate = this.date.fullDate;
    for (let i = 1; i <= dateData; i++) {
      let nowDate = full.year + "-" + (full.month < 10 ? full.month : full.month) + "-" + (i < 10 ? "0" + i : i);
      let isDay = fullDate === nowDate;
      let info = this.selected && this.selected.find((item) => {
        if (this.dateEqual(nowDate, item.date)) {
          return item;
        }
      });
      let disableBefore = true;
      let disableAfter = true;
      if (this.startDate) {
        disableBefore = this.dateCompare(this.startDate, nowDate);
      }
      if (this.endDate) {
        disableAfter = this.dateCompare(nowDate, this.endDate);
      }
      let ranges = this.rangeStatus.data;
      let checked = false;
      if (this.mode == "range") {
        checked = ranges.findIndex((item) => this.dateEqual(item, nowDate)) !== -1 ? true : false;
      }
      let multiples = this.multiple;
      let multiplesChecked = false;
      if (this.mode == "multiple") {
        multiplesChecked = multiples.findIndex((item) => this.dateEqual(item, nowDate)) !== -1;
      }
      let data = {
        fullDate: nowDate,
        year: full.year,
        date: i,
        mode: this.mode,
        multiples: this.mode == "multiple" ? multiplesChecked : false,
        rangeMultiple: this.mode == "range" ? checked : false,
        beforeRange: this.dateEqual(this.rangeStatus.before, nowDate),
        afterRange: this.dateEqual(this.rangeStatus.after, nowDate),
        month: full.month,
        lunar: this.getlunar(full.year, full.month, i),
        disable: !(disableBefore && disableAfter),
        isDay
      };
      if (info) {
        data.extraInfo = info;
        data.disable = info.disable || false;
      }
      dateArr.push(data);
    }
    return dateArr;
  }
  /**
   * 获取下月天数
   */
  _getNextMonthDays(surplus, full) {
    let dateArr = [];
    for (let i = 1; i < surplus + 1; i++) {
      dateArr.push({
        date: i,
        month: Number(full.month) + 1,
        lunar: this.getlunar(full.year, Number(full.month) + 1, i),
        disable: true
      });
    }
    return dateArr;
  }
  /**
   * 获取当前日期详情
   * @param {Object} date
   */
  getInfo(date) {
    if (!date) {
      date = /* @__PURE__ */ new Date();
    }
    const dateInfo = this.canlender.find((item) => item.fullDate === this.getDate(date).fullDate);
    return dateInfo;
  }
  /**
   * 比较时间大小
   */
  dateCompare(startDate, endDate) {
    startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
    endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
    if (startDate <= endDate) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 比较时间是否相等
   */
  dateEqual(before, after) {
    before = new Date(before.replace("-", "/").replace("-", "/"));
    after = new Date(after.replace("-", "/").replace("-", "/"));
    if (before.getTime() - after.getTime() === 0) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 获取日期范围内所有日期
   * @param {Object} begin
   * @param {Object} end
   */
  geDateAll(begin, end) {
    let disableList = this.selected.filter((item) => item.date && item.disable).map((item) => item.date);
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = /* @__PURE__ */ new Date();
    db.setFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = /* @__PURE__ */ new Date();
    de.setFullYear(ae[0], ae[1] - 1, ae[2]);
    var wuxDb = db.getTime() - 24 * 60 * 60 * 1e3;
    var wuxDe = de.getTime() - 24 * 60 * 60 * 1e3;
    for (var k = wuxDb; k <= wuxDe; ) {
      k = k + 24 * 60 * 60 * 1e3;
      let fullDate = this.getDate(new Date(parseInt(k))).fullDate;
      if (!disableList.includes(fullDate))
        arr.push(fullDate);
    }
    return arr;
  }
  /**
   * 计算阴历日期显示
   */
  getlunar(year, month, date) {
    return uni_modules_wuCalendar_components_wuCalendar_calendar.calendar.solar2lunar(year, month, date);
  }
  /**
   * 设置打点
   */
  setSelectInfo(data, value) {
    this.selected = value;
    this._getWeek(data);
  }
  /**
   *  设置范围
   */
  setRange(fullDate) {
    let {
      before,
      after
    } = this.rangeStatus;
    if (this.mode != "range")
      return;
    let reset = this.dateCompare(fullDate, before);
    if (this.rangeSameDay && before && reset) {
      reset = !this.dateEqual(fullDate, before);
    }
    if ((before && after || reset) && (!this.rangeEndRepick || this.rangeEndRepick && this.rangeStatus.data.indexOf(fullDate) == -1)) {
      this.rangeStatus.before = fullDate;
      this.rangeStatus.after = "";
      this.rangeStatus.data = [];
    } else {
      if (!before) {
        this.rangeStatus.before = fullDate;
      } else {
        this.rangeStatus.after = fullDate;
        if (this.dateCompare(this.rangeStatus.before, this.rangeStatus.after)) {
          this.rangeStatus.data = this.geDateAll(this.rangeStatus.before, this.rangeStatus.after);
        } else {
          this.rangeStatus.data = this.geDateAll(this.rangeStatus.after, this.rangeStatus.before);
        }
      }
    }
    this._getWeek(fullDate);
  }
  /**
   *  设置多选
   */
  setMultiple(fullDate) {
    if (this.mode != "multiple")
      return;
    let index = this.multiple.findIndex((item) => {
      if (this.dateEqual(fullDate, item)) {
        return item;
      }
    });
    if (index === -1) {
      this.multiple.push(fullDate);
      this.setDate(fullDate);
    } else {
      this.multiple = this.multiple.filter((item, i) => i != index);
    }
    this._getWeek(fullDate);
  }
  /**
   * 获取每周数据
   * @param {Object} dateData
   */
  _getWeek(dateData, useWeeks = true) {
    const {
      year,
      month
    } = this.getDate(dateData);
    let firstDay = new Date(year, month - 1, 1).getDay();
    let currentDay = new Date(year, month, 0).getDate();
    let dates = {
      lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
      // 上个月末尾几天
      currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
      // 本月天数
      weeks: []
    };
    const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
    dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
    let canlender = [];
    if (this.monthShowCurrentMonth) {
      canlender = canlender.concat(
        dates.lastMonthDays.map((item) => ({
          empty: true,
          lunar: {}
        })),
        dates.currentMonthDys,
        dates.nextMonthDays.map((item) => ({
          empty: true,
          lunar: {}
        }))
      );
    } else {
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
    }
    let weeks = {};
    for (let i = 0; i < canlender.length; i++) {
      if (i % 7 === 0) {
        weeks[parseInt(i / 7)] = new Array(7);
      }
      weeks[parseInt(i / 7)][i % 7] = canlender[i] || {};
    }
    if (useWeeks) {
      this.canlender = canlender;
      this.weeks = weeks;
    }
    return weeks;
  }
  //静态方法
  // static init(date) {
  // 	if (!this.instance) {
  // 		this.instance = new Calendar(date);
  // 	}
  // 	return this.instance;
  // }
}
exports.Calendar = Calendar;

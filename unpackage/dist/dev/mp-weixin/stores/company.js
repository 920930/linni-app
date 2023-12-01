"use strict";
const common_vendor = require("../common/vendor.js");
const db = common_vendor.Bs.importObject("website");
const useCompanyStore = common_vendor.defineStore("company", () => {
  const company = common_vendor.reactive({
    title: "",
    ftitle: "",
    day: 0,
    doors: [],
    genre: [],
    mobile: "",
    times: [],
    _id: ""
  });
  const getCompany = async () => {
    try {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const { data } = await db.show();
      company._id = data._id;
      company.title = data.title;
      company.ftitle = data.ftitle;
      company.doors = data.doors;
      company.genre = data.genre;
      company.mobile = data.mobile;
      company.times = data.times;
      company.day = data.day;
    } catch (e) {
    } finally {
      common_vendor.index.hideLoading();
    }
  };
  return { company, getCompany };
});
exports.useCompanyStore = useCompanyStore;

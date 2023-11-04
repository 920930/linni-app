"use strict";
const common_vendor = require("../common/vendor.js");
const db = common_vendor.$s.importObject("website");
const useCompanyStore = common_vendor.defineStore("company", () => {
  const company = common_vendor.reactive({
    title: "",
    ftitle: "",
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
    } catch (e) {
      console.log(123);
    } finally {
      common_vendor.index.hideLoading();
    }
  };
  return { company, getCompany };
});
exports.useCompanyStore = useCompanyStore;

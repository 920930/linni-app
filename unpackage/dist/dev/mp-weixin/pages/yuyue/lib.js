"use strict";
const time = /* @__PURE__ */ new Date();
const year = time.getFullYear();
const m = time.getMonth() + 1;
const d = time.getDate();
const month = m < 10 ? `0${m}` : m;
const date = d < 10 ? `0${d}` : d;
const today = `${year}-${month}-${date}`;
exports.today = today;

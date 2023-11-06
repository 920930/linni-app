"use strict";
const today = (num = 0) => {
  const time = /* @__PURE__ */ new Date();
  if (num)
    time.setDate(time.getDate() + num);
  const year = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const month = m < 10 ? `0${m}` : m;
  const date = d < 10 ? `0${d}` : d;
  const today2 = `${year}-${month}-${date}`;
  return {
    today: today2
  };
};
exports.today = today;

export const time = new Date();
export const year = time.getFullYear();
const m = time.getMonth() + 1;
const d = time.getDate();
export const month = m < 10 ? `0${m}` : m;
export const date = d < 10 ? `0${d}` : d;
export const today = `${year}-${month}-${date}`;

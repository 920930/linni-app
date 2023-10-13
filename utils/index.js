// 防抖
export const debounce = (func, wait = 1000) =>  {
	console.log(1230)
  let timeout;
  return (val = '') => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(val);
    }, wait);
  }
}

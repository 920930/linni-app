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

// 车牌号正则
export const isCarBool = (car) => {
	return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(car)
}

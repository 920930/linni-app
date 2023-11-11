// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const checkToken = require('../user/checkToken.js');
function dateTime(data, day = 0) {
	const time = new Date(data);
	const start = time.setHours(0,0,0,0)
	let end = time.setHours(23,59,59,999)
	if(day){
		time.setDate(time.getDate()+day)
		end = time.setHours(23,59,59,999);
	}
	return {start, end}
}
function dateStr(num){
	const time = new Date(num);
	let m = time.getMonth() + 1;
	m = m < 10 ? `0${m}` : `${m}`
	let d = time.getDate();
	d = d < 10 ? `0${d}` : `${d}`;
	return `${time.getFullYear()}-${m}-${d}`;
}
module.exports = {
	async _before() { // 通用预处理器
		if(!['create'].includes(this.methodName)){
			try{
				// this.authInfo 来自这里的验证码
				await checkToken(this);
			}catch(e){
				throw e;
			}
		}
		this.db = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() });
		this.orderDb = this.db.collection('web-order');
		this.noticeDb = this.db.collection('webnotice');
		const company = await this.db.collection('website').orderBy('createdAt').field('day,times,createdAt').get({getOne: true});
		this.company = company.data;
	},
	index(){
		const user = this.db.collection('uni-id-users').field('_id,name,mobile,car').getTemp();
		return this.db.collection('web-order', user).orderBy('createdAt desc').get();
	},
	show(_id){
		const user = this.db.collection('uni-id-users').where('_id==$cloudEnv_uid').getTemp();
		return this.db.collection('web-order', user).doc(_id).get({getOne: true})
	},
	async create(ret){
		const qj = dateTime(new Date(), this.company.day);
		const { start, end } = dateTime(ret.start);
		const bool = qj.start <= start && qj.end >= end;
		if(!bool){
			return {
				errCode: "error 213",
				errMsg: `只能预约当前${this.company.day}天内`
			}
		}
		const one = await this.orderDb.where(`uid == $cloudEnv_uid && start >= ${start} && end <= ${end}`).get({getOne: true});
		if(one.data) {
			return {
				errCode: "error 213",
				errMsg: `您在${ret.date}已有预约`
			}
		}
		Reflect.deleteProperty(ret, 'date');
		// 设置预约到店的真实开始时间，如2023-10-11 9:00
		ret.start = new Date(ret.start).getTime();
		// 设置预约到店的真实结束时间，如2023-10-11 10:00
		ret.end = new Date(ret.end).getTime();
		this.orderDb.add(ret);
	},
	update(_id, data){
		
	},
	async notices(){
		// 一天的总毫秒数
		const mis = 24*60*60*1000;
		// 今日到公司规定可预约几天
		const {start, end} = dateTime(Date.now(), this.company.day);
		let times = new Set();
		const notices = await this.noticeDb.where(`type == 1 && ((start >= ${start} && start < ${end}) || (end > ${start} && end <= ${end})) `).get();
		const orders = await this.orderDb.where(`start >= ${start} && end <= ${end}`).get();
		const myOrders = orders.data.filter(item => item.uid == this.authInfo.uid);
		
		notices.data.forEach(item => {
			// 放假开始日期到结束日期的毫米总数 / 一天的毫秒数 = 放假多少天
			const len = Math.floor((item.end-item.start) / (mis-1000));
			// 将放假每一天开始的毫秒位数，放入times中，通过set去重
			for(let i = 0; i < len; i++) {
				times.add(item.start + i * mis)
			}
		})
		// 排除小于今日0:0:0的毫秒位数的放假时间，排序一哈，其实无需排序
		times = new Set([...times].filter(item => item >= start).sort((a,b) => a - b));
		// 将放假的每一天毫秒位数转为前端日历可识别的 对象方式
		notices.data = [...times].map(item => ({date: dateStr(item), info: '放假', disable: true, badge: true}));
		myOrders.forEach(item => {
			times.add(dateTime(item.start).start);
			const info = {date: dateStr(item.start), info: '已预约', disable: true, badge: true};
			notices.data.push(info)
		})
		// 根据公司设置的可预约的天数为length, 已知今天的start的毫秒时间，每一天的总毫秒数
		// 返回长度为length的每一条起点毫秒时间的数组
		let everyDayStartTime = Array.from({length: this.company.day}, (x, i) => start + i * mis);
		// 排除放假和自己已经预约的时间基数
		everyDayStartTime = everyDayStartTime.filter(item => !times.has(item));

		const everyDayInfo = everyDayStartTime.map(tt => {
			// 可预约tt的这一天已经预约的订单集合
			const order = orders.data.filter(or => or.start > tt && or.end < (tt+mis-1000));
			console.log(this.company.times)
			return {date: dateStr(tt), info: `余量${order.length}`}
		});
		notices.data.push(...everyDayInfo);
		return notices;
	}
}

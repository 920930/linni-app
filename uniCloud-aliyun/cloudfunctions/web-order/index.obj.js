// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const checkToken = require('../website/checkToken.js');
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
		try{
			// this.authInfo 来自这里的验证码
			await checkToken(this);
		}catch(e){
			throw e;
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
		// 放假时间
		const notices = await this.noticeDb.where(`type == 1 && ((start >= ${start} && start < ${end}) || (end > ${start} && end <= ${end})) `).get();
		notices.data.forEach(item => {
			// 放假开始日期到结束日期的毫米差 / 一天的毫秒数 = 放假多少天
			const len = Math.floor((item.end-item.start) / (mis-1000));
			// 将放假每一天开始即00：00：00的毫秒位数，放入times中，通过set去重
			for(let i = 0; i < len; i++) {
				times.add(item.start + i * mis)
			}
		})
		// 排除小于今日0:0:0的毫秒位数的放假时间
		times = new Set([...times].filter(item => item >= start));
		// 可预约时间范围内订单数量
		const orders = await this.orderDb.where(`start >= ${start} && end <= ${end} && state != 0`).get();
		// 自己如果已经预约，则不能再次预约这一天
		const myOrders = orders.data.filter(item => item.uid == this.authInfo.uid);
		// 创建集合 将放假的每一天毫秒位数转为前端日历可识别的 对象方式
		const datas = [...times].map(item => ({date: dateStr(item), info: '放假', start: item, disable: true, badge: true}));
		myOrders.forEach(item => {
			// 获取当前用户订单这一天起始时间的毫秒位数
			const orderStart = dateTime(item.start).start;
			// 订单一般不可能在放假期间存在
			if(!times.has(orderStart)){
				times.add(orderStart);
				const info = {date: dateStr(item.start), info: '已预约', start: orderStart, disable: true, badge: true};
				datas.push(info)
			}
		})
		// 根据公司设置的可预约的天数为length, 已知今天的start的毫秒时间，每一天的总毫秒数
		// 返回长度为length的每一条起点毫秒时间的数组
		let everyDayStartTime = Array.from({length: this.company.day}, (x, i) => start + i * mis);
		// 排除放假和自己已经预约的时间基数
		everyDayStartTime = everyDayStartTime.filter(item => !times.has(item));

		const everyDayInfo = everyDayStartTime.map(tt => {
			// 可预约tt的这一天已经预约的订单集合
			const order = orders.data.filter(or => or.start > tt && or.end < (tt+mis-1000));
			return {date: dateStr(tt), start: tt, info: '可预约'}
		});
		datas.push(...everyDayInfo)
		// datas内为未来n天内可预约的日期，并将放假和已经预约的日期的disable设置为true，返回给前端
		datas.sort((a, b) => a.start - b.start);
		// 对日期进行深度拷贝
		const companyTimes = JSON.stringify(this.company.times);
		// 现在开始设置对可约的日期对应的，预约time时间设置
		datas.forEach(item => {
			item.times = [];
			if(!item.disable) {
				item.times = JSON.parse(companyTimes);
				// 获取当天一整天的所有订单
				const todayOrders = orders.data.filter(or => or.start >= item.start && or.end <= (item.start + mis -1000));
				// 获取当天可预约的总量
				const total = item.times.reduce((t, n) => t += n.num, 0);
				console.log('total', total)
				console.log('todayOrders', todayOrders.length)
				if(total > todayOrders.length) {
					item.times.forEach(t => {
						// 获取当天某一个时间段内所有订单，注意company中startMins和endMins时间 = 如9：00的毫秒 - 0：00的毫秒
						const timeOrders = todayOrders.filter(or => or.start >= (item.start + t.startMins) && or.end <= (item.start + t.endMins));
						t.num = t.num - timeOrders.length;
					})
				} else {
					// 否则当天所有全部名额都预约完了
					item.badge = true
					item.disable = true;
					item.info = '没有了'
				}
			}
		})
		return {data: datas, company: this.company};
	}
}

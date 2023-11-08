// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const checkToken = require('../user/checkToken.js');
function dateTime(data) {
	const time = new Date(data);
	const start = time.setHours(0,0,0,0)
	const end = time.setHours(23,59,59,999)
	return {start, end}
}
module.exports = {
	async _before() { // 通用预处理器
		if(!['create'].includes(this.methodName)){
			try{
				await checkToken(this);
			}catch(e){
				throw e;
			}
		}
		this.db = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() });
		this.orderDb = this.db.collection('web-order');
		this.noticeDb = this.db.collection('webnotice');
	},
	index(){
		const user = this.db.collection('uni-id-users').field('_id,name,mobile,car').getTemp();
		return this.db.collection('web-order', user).orderBy('createdAt desc').get();
	},
	indexDay(dates = Date.now()){
		const date = new Date(dates).getTime();
		// 某天开始的时间戳 00:00:00
		const startDate = new Date(date).setHours(0, 0, 0, 0);
		// 某天结束的时间戳 23:59:59
		const endDate = new Date(date).setHours(23, 59, 59, 999);
		const company = this.db.collection('company').get({getOne: true});
		const orders = this.orderDb.where(`start >= "${startDate}" && end <= "${endDate}"`).get();
	},
	show(_id){
		const user = this.db.collection('uni-id-users').where('_id==$cloudEnv_uid').getTemp();
		return this.db.collection('web-order', user).doc(_id).get({getOne: true})
	},
	async create(ret){
		ret.start = new Date(ret.start).getTime();
		ret.end = new Date(ret.end).getTime();
		const { start, end } = dateTime(ret.start);
		const one = await this.orderDb.where(`uid == $cloudEnv_uid && start >= ${start} && end <= ${end}`).get({getOne: true});
		if(one.data) {
			return {
				errCode: "error 213",
				errMsg: `您在${ret.date}已有预约`
			}
		}
		Reflect.deleteProperty(ret, 'date');
		
		this.orderDb.add(ret);
	}
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
}

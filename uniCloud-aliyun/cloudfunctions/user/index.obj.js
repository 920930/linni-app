// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const uniIdCommon = require('uni-id-common');
const checkToken = require('../website/checkToken.js');

module.exports = {
	async _before() { // 通用预处理器getUniversalClientInfo
		try{
			await checkToken(this)
		}catch(e){
			throw e;
		}
		this.db = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() });
	},
	/**
	 * getUserInfo获取用户个人页面信息
	 * @returns {object} 返回值描述
	 */
	async getUserInfo(){
		const { uid } = this.authInfo;
		const db = this.db.collection('uni-id-users');
		const user = await db.doc(uid).field('_id,nickname,address,cars').get({getOne: true});
		return user;
	},
	/**
	 * updateAddress方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	async updateAddress(param1) {
		const { uid } = this.authInfo;
		console.log(uid)
		// 参数校验，如无参数则不需要
		if (param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '地址不能为空123'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	},
	_after(err, result){
		if(err){
			return {
				errCode: err.code,
				errMsg: err.message,
			}
		}
		return result;
	}
}

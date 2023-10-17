// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const uniIdCommon = require('uni-id-common');

module.exports = {
	// const db = uniCloud.databaseForJQL({clientInfo: this.this.getClientInfo()});
	async _before() { // 通用预处理器getUniversalClientInfo
		const token = this.getUniIdToken();
		if(!token) {}
		const clientInfo = this.getClientInfo()
		 // 创建uni-id实例，其上方法同uniID
		const uniID = uniIdCommon.createInstance({
			clientInfo
		});
		const payload = await uniID.checkToken(token);
		if(payload.code){
			const err = new Error(payload.errMsg);
			err.code = payload.errCode;
			throw err;
		}
		this.authInfo = payload;
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

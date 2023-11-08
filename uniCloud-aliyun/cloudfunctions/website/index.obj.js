// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const checkToken = require('../user/checkToken.js');
module.exports = {
	_before: function () { // 通用预处理器
		if(!['store', 'edit'].includes(this.methodName)){
			try{
				await checkToken(this);
			}catch(e){
				throw e;
			}
		}
		const database = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() });
		this.db = database.collection('website');
	},
	show(id = ""){
		return id ? this.db.doc(id).get({getOne: true}) : this.db.limit(1).get({getOne: true});
	},
	async store(val){
		const one = await this.db.limit(1).get({getOne: true});
		if(one.data) {
			return {
				errCode: 'error',
				errMsg: '已存在数据，不允许重复添加'
			}
		}
		await this.db.add(val);
		return {
			errCode: 0,
			errMsg: '添加成功'
		}
	},
	async update(val){
		const _id = val._id;
		Reflect.deleteProperty(val, '_id')
		await this.db.doc(_id).update(val);
		return {
			errCode: 0,
			errMsg: '添加成功'
		}
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

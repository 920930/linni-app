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
		this.db = database.collection('webnotice');
	},
	async store(data){
		if (!data) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '数据不能为空'
			}
		}
		await this.db.add(data);
		return {
			errCode: 0,
			errMsg: '通知保存成功'
		}
	},
	edit(_id, data){
		if(!data) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '数据不能为空'
			}
		}
		return this.db.doc(_id).update(data);
	},
	show(_id){
		return this.db.doc(_id).get({getOne: true})
	}
}

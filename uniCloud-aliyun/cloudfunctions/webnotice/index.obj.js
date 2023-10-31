// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器
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
	}
}

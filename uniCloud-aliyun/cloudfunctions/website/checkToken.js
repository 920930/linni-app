const uniIdCommon = require('uni-id-common');
const UniError = require('./UniError.js');

module.exports = async (_that) => {
	const token = _that.getUniIdToken();
	if(!token) {
		throw new UniError('请登录');
	}
	// 创建uni-id实例，其上方法同uniID
	const uniID = uniIdCommon.createInstance({clientInfo: _that.getClientInfo()});
	const payload = await uniID.checkToken(token);
	if(payload.errCode){
		throw new UniError(payload.errMsg, payload.errCode);
	}
	_that.authInfo = payload;
}

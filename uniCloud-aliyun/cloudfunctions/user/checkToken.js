const uniIdCommon = require('uni-id-common');

module.exports = async (_that) => {
	const token = _that.getUniIdToken();
	if(!token) {
		const err = new Error(payload.errMsg);
		err.code = payload.errCode;
		throw err;
	}
	// 创建uni-id实例，其上方法同uniID
	const uniID = uniIdCommon.createInstance({clientInfo: _that.getClientInfo()});
	const payload = await uniID.checkToken(token);
	if(payload.code){
		const err = new Error(payload.errMsg);
		err.code = payload.errCode;
		throw err;
	}
	_that.authInfo = payload;
}

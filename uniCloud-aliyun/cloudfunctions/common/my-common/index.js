const uniIdCommon = require('uni-id-common');

class UniError extends Error{
	constructor(errMsg, errCode = "uni-id-token-expired"){
		super(errMsg)
		this.errCode = this.code = errCode  
		this.errMsg = errMsg  
	}
}

module.exports = {
	UniError,
	checkToken: async (_that) => {
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
}

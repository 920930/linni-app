class UniError extends Error{
	constructor(errMsg, errCode = "uni-id-token-expired"){
		super(errMsg)
		this.errCode = this.code = errCode  
		this.errMsg = errMsg  
	}
}

module.exports = UniError
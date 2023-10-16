const {
  postRegister,
  preRegisterWithPassword
} = require('../../lib/utils/register')
const {
  verifyCaptcha
} = require('../../lib/utils/captcha')
const {
  verifyMobileCode
} = require('../../lib/utils/verify-code')
const {
  CAPTCHA_SCENE,
	SMS_SCENE,
	LOG_TYPE,
	userCollection
} = require('../../common/constants')
const {
  ERROR
} = require('../../common/error')

/**
 * 注册普通用户
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#register-user
 * @param {Object} params
 * @param {String} params.username    用户名
 * @param {String} params.mobile    手机号
 * @param {String} params.password    密码
 * @param {String} params.code     手机验证码
 * @param {String} params.nickname    昵称
 * @param {String} params.inviteCode  邀请码
 * @returns
 */
module.exports = async function (params = {}) {
	const db = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() })
	
  const schema = {
		username: 'username',
    mobile: 'mobile',
    password: 'password',
    code: 'string',
    nickname: {
      required: false,
      type: 'nickname'
    },
    inviteCode: {
      required: false,
      type: 'string'
    }
  }
	
  this.middleware.validate(params, schema);
	
  const {
		username,
    mobile,
    password,
    nickname,
    // captcha,
    inviteCode,
		role: role_id,
		address,
		cars,
		code,
  } = params;
	const data = {
		role: [role_id],
		address,
		cars,
		nickname,
		mobile_confirmed: 0,
	}

	if(!cars.length){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '请填写车牌'
		}
	}
	const bool = cars.some(car => !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(car))
	if(bool){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '请填写正确的车牌'
		}
	}

	if(address.length < 5){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '请选择地址'
		}
	}
	
	if(role_id == 'admin'){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '非法操作'
		}
	}
	const roles = await db.collection('uni-id-roles').where(`role_id == "${role_id}"`).get({getOne: true});
	if(!roles.data){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '非法操作'
		}
	}
	
  // await verifyCaptcha.call(this, {
  //   captcha,
  //   scene: CAPTCHA_SCENE.REGISTER
  // })
	try {
	  await verifyMobileCode({
	    mobile,
	    code,
	    scene: SMS_SCENE.LOGIN_BY_SMS
	  })
		data.mobile_confirmed = 1;
	} catch (error) {
	  console.log(error, {
	    mobile,
	    code,
	    type: SMS_SCENE.LOGIN_BY_SMS
	  })
	  await this.middleware.uniIdLog({
	    success: false,
	    data: {
	      mobile
	    },
	    type: LOG_TYPE.LOGIN
	  })
	  throw error
	}

  const {
    user,
    extraData
  } = await preRegisterWithPassword.call(this, {
    user: {
			username,
      mobile
    },
    password
  })
	
  return postRegister.call(this, {
    user,
    extraData: {
      ...extraData,
      ...data
    },
    inviteCode
  })
}

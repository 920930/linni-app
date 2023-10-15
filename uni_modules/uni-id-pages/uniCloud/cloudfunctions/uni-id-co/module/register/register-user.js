const {
  postRegister,
  preRegisterWithPassword
} = require('../../lib/utils/register')
const {
  verifyCaptcha
} = require('../../lib/utils/captcha')
const {
  CAPTCHA_SCENE,
	userCollection
} = require('../../common/constants')
const {
  ERROR
} = require('../../common/error')

/**
 * 注册普通用户
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#register-user
 * @param {Object} params
 * @param {String} params.mobile    用户名
 * @param {String} params.password    密码
 * @param {String} params.captcha     图形验证码
 * @param {String} params.nickname    昵称
 * @param {String} params.inviteCode  邀请码
 * @returns
 */
module.exports = async function (params = {}) {
	const db = uniCloud.databaseForJQL({ clientInfo: this.getClientInfo() })
	
  const schema = {
    mobile: 'mobile',
    password: 'password',
    captcha: 'string',
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
    mobile,
    password,
    nickname,
    captcha,
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
	console.log('bool', bool)
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
	// 查询手机号如果存在，提醒手机号已经存在
	const oneUser = await db.collection('uni-id-users').where(`mobile == "${mobile}"`).field('mobile').get({getOne: true});
	if(oneUser.data){
		return {
			errCode: ERROR.ADMIN_EXISTS,
			errMsg: '手机号已经存在'
		}
	}
	
  await verifyCaptcha.call(this, {
    captcha,
    scene: CAPTCHA_SCENE.REGISTER
  })
  const {
    user,
    extraData
  } = await preRegisterWithPassword.call(this, {
    user: {
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

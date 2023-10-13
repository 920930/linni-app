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
  this.middleware.validate(params, schema)
  const {
    mobile,
    password,
    nickname,
    captcha,
    inviteCode,
		role: role_id
  } = params
	const db = uniCloud.database();
	const role = await db.collection('uni-id-roles').limit(1).where({role_id: 'supplier'}).get({ getOne: true });

	db.collection('uni-id-users').where('mobile == "18081990075"').field('_id,mobile').get({getOne: true}).then(res => console.log(res))
	
	return {
	  errCode: ERROR.ADMIN_EXISTS,
	  errMsg: this.t('uni-id-admin-exists'),
		data: role
	}
	
	console.log(getAdminRes)
	
	await abc();

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
      nickname
    },
    inviteCode
  })
}

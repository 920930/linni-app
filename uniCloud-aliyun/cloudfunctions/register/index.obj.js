// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
// const { sendSmsCode } = require('../../lib/utils/sms')
import { sendSmsCode } from '../uni-id-co/lib/utils/sms'
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * 发送短信验证码
	 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#send-sms-code
	 * @param {Object} params
	 * @param {String} params.mobile    手机号
	 * @param {String} params.scene     短信验证码使用场景
	 * @returns
	 */
	sendSms({mobile, scene}){
		const {mobile, scene} = params;
		return {
			mobile, scene
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

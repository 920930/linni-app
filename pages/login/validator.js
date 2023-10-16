import passwordMod from '@/uni_modules/uni-id-pages/common/password.js';
export default {
	"username": {
		"rules": [{
				required: true,
				errorMessage: '请输入账户名',
			},
			{
				minLength: 3,
				maxLength: 32,
				errorMessage: '账户名长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					// console.log(value);
					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('账户名不能是：手机号或邮箱')
					};
					if (/^\d+$/.test(value)) {
						callback('账户名不能为纯数字')
					};
					if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
						callback('账户名不能包含中文')
					}
					return true
				}
			}
		],
		"label": "用户名"
	},
	"mobile": {
		"rules": [{
			required: true,
			errorMessage: '请输入手机号',
		}, {
			validateFunction(rule, value, data, callback) {
				if (!/^1\d{10}$/.test(value)) {
					callback('手机号不正确')
				};
			}
		}],
		"label": "手机号"
	},
	// "code": {
	// 	"rules": [{
	// 		required: true,
	// 		errorMessage: '请输入手机验证码',
	// 	}, {
	// 			minLength: 2,
	// 			maxLength: 6,
	// 			errorMessage: '验证码长度在 {minLength} 到 {maxLength} 个字符',
	// 	}],
	// 	"label": "手机验证码"
	// },
	"nickname": {
		"rules": [{
			required: true,
			errorMessage: '请输入名称',
		}, {
				minLength: 2,
				maxLength: 10,
				errorMessage: '名称长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					// console.log(value);
					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('名称不能是：手机号或邮箱')
					};
					if (/^\d+$/.test(value)) {
						callback('名称不能为纯数字')
					};
					if(!/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
						callback('名称只能是中文')
					}
					return true
				}
			}
		],
		"label": "名称"
	},
	...passwordMod.getPwdRules()
}

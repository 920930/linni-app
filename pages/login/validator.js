import passwordMod from '@/uni_modules/uni-id-pages/common/password.js';
export default {
	// "username": {
	// 	"rules": [{
	// 			required: true,
	// 			errorMessage: '请输入用户名',
	// 		},
	// 		{
	// 			minLength: 3,
	// 			maxLength: 32,
	// 			errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
	// 		},
	// 		{
	// 			validateFunction: function(rule, value, data, callback) {
	// 				// console.log(value);
	// 				if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
	// 					callback('用户名不能是：手机号或邮箱')
	// 				};
	// 				if (/^\d+$/.test(value)) {
	// 					callback('用户名不能为纯数字')
	// 				};
	// 				if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
	// 					callback('用户名不能包含中文')
	// 				}
	// 				return true
	// 			}
	// 		}
	// 	],
	// 	"label": "用户名"
	// },
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
	"nickname": {
		"rules": [{
			required: true,
			errorMessage: '请输入手机号',
		}, {
				minLength: 2,
				maxLength: 10,
				errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					// console.log(value);
					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('姓名不能是：手机号或邮箱')
					};
					if (/^\d+$/.test(value)) {
						callback('姓名不能为纯数字')
					};
					if(!/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
						callback('姓名只能是中文')
					}
					return true
				}
			}
		],
		"label": "姓名"
	},
	...passwordMod.getPwdRules()
}

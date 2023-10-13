"use strict";const e={mobile:{rules:[{required:!0,errorMessage:"请输入手机号"},{validateFunction(e,t,r,s){/^1\d{10}$/.test(t)||s("手机号不正确")}}],label:"手机号"},nickname:{rules:[{required:!0,errorMessage:"请输入手机号"},{minLength:2,maxLength:10,errorMessage:"姓名长度在 {minLength} 到 {maxLength} 个字符"},{validateFunction:function(e,t,r,s){return(/^1\d{10}$/.test(t)||/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(t))&&s("姓名不能是：手机号或邮箱"),/^\d+$/.test(t)&&s("姓名不能为纯数字"),/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(t)||s("姓名只能是中文"),!0}}],label:"姓名"},...require("../../common/password.js").passwordMod.getPwdRules()};exports.rules=e;
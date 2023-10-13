"use strict";const e=require("../../../../common/vendor.js"),s=require("../../common/login-page.mixin.js");require("../../common/store.js"),require("../../config.js");const n=e.Ds.importObject("uni-id-co",{errorOptions:{type:"toast"}}),o={mixins:[s.mixin],data:()=>({password:"",username:"",captcha:"",needCaptcha:!1,focusUsername:!1,focusPassword:!1,logo:"../../../static/logo.png"}),onShow(){},methods:{toRetrievePwd(){let s="/uni_modules/uni-id-pages/pages/retrieve/retrieve";/^1\d{10}$/.test(this.username)&&(s+=`?phoneNumber=${this.username}`),e.index.navigateTo({url:s})},pwdLogin(){if(!this.password.length)return this.focusPassword=!0,e.index.showToast({title:"请输入密码",icon:"none",duration:3e3});if(!this.username.length)return this.focusUsername=!0,e.index.showToast({title:"请输入手机号/用户名/邮箱",icon:"none",duration:3e3});if(this.needCaptcha&&4!=this.captcha.length)return this.$refs.captcha.getImageCaptcha(),e.index.showToast({title:"请输入验证码",icon:"none",duration:3e3});if(this.needAgreements&&!this.agree)return this.$refs.agreements.popup(this.pwdLogin);let s={password:this.password,captcha:this.captcha};/^1\d{10}$/.test(this.username)?s.mobile=this.username:/@/.test(this.username)?s.email=this.username:s.username=this.username,n.login(s).then((e=>{this.loginSuccess(e)})).catch((e=>{"uni-id-captcha-required"==e.errCode?this.needCaptcha=!0:this.needCaptcha&&this.$refs.captcha.getImageCaptcha()}))},toRegister(){e.index.navigateTo({url:this.config.isAdmin?"/uni_modules/uni-id-pages/pages/register/register-admin":"/uni_modules/uni-id-pages/pages/register/register",fail(e){console.error(e)}})}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-captcha")+e.resolveComponent("uni-id-pages-agreements")+e.resolveComponent("uni-id-pages-fab-login"))()}Math||((()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni-captcha/components/uni-captcha/uni-captcha.js")+(()=>"../../components/uni-id-pages-agreements/uni-id-pages-agreements.js")+(()=>"../../components/uni-id-pages-fab-login/uni-id-pages-fab-login.js"))();const i=e._export_sfc(o,[["render",function(s,n,o,i,t,a){return e.e({a:t.logo,b:e.o((e=>t.focusUsername=!1)),c:e.o((e=>t.username=e)),d:e.p({focus:t.focusUsername,inputBorder:!1,placeholder:"请输入手机号/用户名/邮箱",modelValue:t.username}),e:e.p({name:"username"}),f:e.o((e=>t.focusPassword=!1)),g:e.o((e=>t.password=e)),h:e.p({focus:t.focusPassword,clearable:!0,type:"password",inputBorder:!1,placeholder:"请输入密码",modelValue:t.password}),i:e.p({name:"password"}),j:t.needCaptcha},t.needCaptcha?{k:e.sr("captcha","2996fb33-5"),l:e.o((e=>t.captcha=e)),m:e.p({focus:!0,scene:"login-by-pwd",modelValue:t.captcha})}:{},{n:e.sr("agreements","2996fb33-6"),o:e.p({scope:"login"}),p:e.o(((...e)=>a.pwdLogin&&a.pwdLogin(...e))),q:!s.config.isAdmin},s.config.isAdmin?{}:{r:e.o(((...e)=>a.toRetrievePwd&&a.toRetrievePwd(...e)))},{s:e.t(s.config.isAdmin?"注册管理员账号":"注册账号"),t:e.o(((...e)=>a.toRegister&&a.toRegister(...e))),v:e.sr("uniFabLogin","2996fb33-7")})}],["__scopeId","data-v-2996fb33"]]);wx.createPage(i);

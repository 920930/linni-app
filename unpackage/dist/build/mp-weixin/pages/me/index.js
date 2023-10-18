"use strict";const e=require("../../common/vendor.js"),i=require("../../uni_modules/uni-id-pages/common/store.js");require("../../uni_modules/uni-id-pages/config.js");const n=e.Ds.importObject("uni-id-co");e.Ds.importObject("user");const o={computed:{userInfo:()=>i.store.userInfo,realNameStatus(){return this.userInfo.realNameAuth?this.userInfo.realNameAuth.authStatus:0}},data:()=>({univerifyStyle:{authButton:{title:"本机号码一键绑定"},otherLoginButton:{title:"其他号码绑定"}},hasPwd:!1,showLoginManage:!0,setNicknameIng:!1}),async onShow(){this.univerifyStyle.authButton.title="本机号码一键绑定",this.univerifyStyle.otherLoginButton.title="其他号码绑定"},async onLoad(e){e.showLoginManage&&(this.showLoginManage=!0);try{let e=await n.getAccountInfo();console.log(e),this.hasPwd=e.isPasswordSet}catch(o){i.mutations.logout()}},methods:{login(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd",complete:e=>{}})},logout(){i.mutations.logout()},bindMobileSuccess(){i.mutations.updateUserInfo()},changePassword(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",complete:e=>{}})},bindMobile(){this.bindMobileBySmsCode()},univerify(){e.index.login({provider:"univerify",univerifyStyle:this.univerifyStyle,success:async o=>{n.bindMobileByUniverify(o.authResult).then((e=>{i.mutations.updateUserInfo()})).catch((e=>{console.log(e)})).finally((i=>{e.index.closeAuthView()}))},fail:e=>{console.log(e),"30002"!=e.code&&"30001"!=e.code||this.bindMobileBySmsCode()}})},bindMobileBySmsCode(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile?phone="+this.userInfo.mobile})},setNickname(e){e?(i.mutations.updateUserInfo({nickname:e}),this.setNicknameIng=!1,this.$refs.dialog.close()):this.$refs.dialog.open()},deactivate(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"})},async bindThirdAccount(n){const o=e.Ds.importObject("uni-id-co"),s={weixin:"wx_openid",alipay:"ali_openid",apple:"apple_openid",qq:"qq_openid"}[n.toLowerCase()];this.userInfo[s]?(await o["unbind"+n](),await i.mutations.updateUserInfo()):e.index.login({provider:n.toLowerCase(),onlyAuthorize:!0,success:async s=>{const t=await o["bind"+n]({code:s.code});t.errCode&&e.index.showToast({title:t.errMsg||"绑定失败",duration:3e3}),await i.mutations.updateUserInfo()},fail:async i=>{console.log(i),e.index.hideLoading()}})},realNameVerify(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"})},changeAddress(){e.index.chooseLocation({success(e){e.address.length&&i.mutations.updateUserInfo({address:e.address})}})},changeCar(e=""){if(e){const n=i.store.userInfo.cars.filter((i=>i!==e));i.mutations.updateUserInfo({cars:n})}else this.$refs.carDialog.open()},carConfirm(n){if(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(n)){const e=new Set([n,...i.store.userInfo.cars]);i.mutations.updateUserInfo({cars:[...e]}),this.$refs.carClose.val=""}else e.index.showToast({title:"请输入正确的车牌号",icon:"none",duration:3e3})}}};if(!Array){(e.resolveComponent("uni-id-pages-avatar")+e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-tag")+e.resolveComponent("uni-collapse-item")+e.resolveComponent("uni-collapse")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup")+e.resolveComponent("uni-id-pages-bind-mobile"))()}Math||((()=>"../../uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-tag/components/uni-tag/uni-tag.js")+(()=>"../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js")+(()=>"../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js")+(()=>"../../uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js"))();const s=e._export_sfc(o,[["render",function(i,n,o,s,t,a){return e.e({a:e.p({width:"260rpx",height:"260rpx"}),b:e.p({title:"基本信息",type:"line"}),c:e.o((e=>a.setNickname(""))),d:e.p({title:"名称",rightText:a.userInfo.nickname||"未设置",link:!0}),e:e.o(a.bindMobile),f:e.p({title:"手机号",rightText:a.userInfo.mobile||"未绑定",link:!0}),g:t.hasPwd},t.hasPwd?{h:e.o(a.changePassword),i:e.p({title:"修改密码",link:!0})}:{},{j:e.o(a.changeAddress),k:e.p({title:"地址",note:a.userInfo.address,rightText:"更改",link:!0}),l:a.userInfo.email},a.userInfo.email?{m:e.p({title:"电子邮箱",rightText:a.userInfo.email})}:{},{n:e.p({title:"业务信息",type:"line"}),o:e.p({title:"我的订单",rightText:"userInfo.mobile||'未绑定'",link:!0}),p:e.f(a.userInfo.cars,((i,n,o)=>({a:e.o((e=>a.changeCar(i)),i),b:i,c:"eee47db0-13-"+o+",eee47db0-12",d:e.p({text:`${i} ×`})}))),q:e.o(a.changeCar),r:e.p({text:"新增车牌号",type:"success"}),s:e.p({title:"绑定的车牌号",open:!0}),t:e.p({accordion:!0}),v:e.o(a.setNickname),w:e.p({mode:"input",value:a.userInfo.nickname,inputType:t.setNicknameIng?"nickname":"text",title:"设置昵称",placeholder:"请输入要设置的昵称"}),x:e.sr("dialog","eee47db0-15"),y:e.p({type:"dialog"}),z:e.sr("carClose","eee47db0-18,eee47db0-17"),A:e.o(a.carConfirm),B:e.p({mode:"input",title:"车牌号",placeholder:"请输入车牌号"}),C:e.sr("carDialog","eee47db0-17"),D:e.p({type:"dialog"}),E:e.sr("bind-mobile-by-sms","eee47db0-19"),F:e.o(a.bindMobileSuccess),G:t.showLoginManage},t.showLoginManage?e.e({H:a.userInfo._id},a.userInfo._id?{I:e.o(((...e)=>a.logout&&a.logout(...e)))}:{J:e.o(((...e)=>a.login&&a.login(...e)))}):{})}],["__scopeId","data-v-eee47db0"]]);wx.createPage(s);

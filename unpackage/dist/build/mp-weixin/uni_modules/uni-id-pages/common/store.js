"use strict";const e=require("../../../common/vendor.js"),n=require("../config.js"),i=e.Ds.importObject("uni-id-co"),o=e.Ds.database().collection("uni-id-users");let t=e.index.getStorageSync("uni-id-pages-userInfo")||{};const s={userInfo:t,hasLogin:0!=Object.keys(t).length},r={async updateUserInfo(n=!1){if(n)o.where("_id==$env.uid").update(n).then((i=>{i.result.updated?(e.index.showToast({title:"更新成功",icon:"none",duration:3e3}),this.setUserInfo(n)):e.index.showToast({title:"没有改变",icon:"none",duration:3e3})}));else{const n=e.Ds.importObject("uni-id-co",{customUI:!0});try{let e=await o.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();const i=await n.getRealNameInfo();this.setUserInfo({...e.result.data[0],realNameAuth:i})}catch(i){this.setUserInfo({},{cover:!0}),console.error(i.message,i.errCode)}}},async setUserInfo(n,{cover:i}={cover:!1}){let o=i?n:Object.assign(a.userInfo,n);return a.userInfo=Object.assign({},o),a.hasLogin=0!=Object.keys(a.userInfo).length,e.index.setStorageSync("uni-id-pages-userInfo",a.userInfo),n},async logout(){if(e.Ds.getCurrentUserInfo().tokenExpired>Date.now())try{await i.logout()}catch(n){console.error(n)}e.index.removeStorageSync("uni_id_token"),e.index.setStorageSync("uni_id_token_expired",0),e.index.redirectTo({url:`/${e.pagesJson.uniIdRouter&&e.pagesJson.uniIdRouter.loginPage?e.pagesJson.uniIdRouter.loginPage:"uni_modules/uni-id-pages/pages/login/login-withoutpwd"}`}),e.index.$emit("uni-id-pages-logout"),this.setUserInfo({},{cover:!0})},loginBack(n={}){const{uniIdRedirectUrl:i=""}=n;let o=0,t=getCurrentPages();if(t.forEach(((e,n)=>{"login"==t[t.length-n-1].route.split("/")[3]&&o++})),i)return e.index.redirectTo({url:i,fail:n=>{e.index.switchTab({url:i,fail:e=>{console.log(n,e)}})}});if(o){const n=e.pagesJson.pages[0];return e.index.reLaunch({url:`/${n.path}`})}e.index.navigateBack({delta:o})},loginSuccess(i={}){const{showToast:o=!0,toastText:t="登录成功",autoBack:s=!0,uniIdRedirectUrl:r="",passwordConfirmed:a}=i;if(o&&e.index.showToast({title:t,icon:"none",duration:3e3}),this.updateUserInfo(),e.index.$emit("uni-id-pages-login-success"),n.config.setPasswordAfterLogin&&!a)return e.index.redirectTo({url:r?`/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=${r}&loginType=${i.loginType}`:`/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=${i.loginType}`,fail:e=>{console.log(e)}});s&&this.loginBack({uniIdRedirectUrl:r})}},a=e.reactive(s);exports.mutations=r,exports.store=a;
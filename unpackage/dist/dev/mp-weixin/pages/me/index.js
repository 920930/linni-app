"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
const uniIdCo = common_vendor.Ds.importObject("uni-id-co");
const db = common_vendor.Ds.importObject("user");
const _sfc_main = {
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    },
    realNameStatus() {
      if (!this.userInfo.realNameAuth) {
        return 0;
      }
      return this.userInfo.realNameAuth.authStatus;
    }
  },
  data() {
    return {
      univerifyStyle: {
        authButton: {
          "title": "本机号码一键绑定"
          // 授权按钮文案
        },
        otherLoginButton: {
          "title": "其他号码绑定"
        }
      },
      // userInfo: {
      // 	mobile:'',
      // 	nickname:''
      // },
      hasPwd: false,
      showLoginManage: true,
      //通过页面传参隐藏登录&退出登录按钮
      setNicknameIng: false
    };
  },
  async onShow() {
    this.univerifyStyle.authButton.title = "本机号码一键绑定";
    this.univerifyStyle.otherLoginButton.title = "其他号码绑定";
  },
  async onLoad(e) {
    if (e.showLoginManage) {
      this.showLoginManage = true;
    }
    try {
      let res = await uniIdCo.getAccountInfo();
      this.hasPwd = res.isPasswordSet;
    } catch (e2) {
      uni_modules_uniIdPages_common_store.mutations.logout();
    }
  },
  methods: {
    login() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd",
        complete: (e) => {
        }
      });
    },
    logout() {
      uni_modules_uniIdPages_common_store.mutations.logout();
    },
    bindMobileSuccess() {
      uni_modules_uniIdPages_common_store.mutations.updateUserInfo();
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",
        complete: (e) => {
        }
      });
    },
    bindMobile() {
      this.bindMobileBySmsCode();
    },
    univerify() {
      common_vendor.index.login({
        "provider": "univerify",
        "univerifyStyle": this.univerifyStyle,
        success: async (e) => {
          uniIdCo.bindMobileByUniverify(e.authResult).then((res) => {
            uni_modules_uniIdPages_common_store.mutations.updateUserInfo();
          }).catch((e2) => {
            console.log(e2);
          }).finally((e2) => {
            common_vendor.index.closeAuthView();
          });
        },
        fail: (err) => {
          console.log(err);
          if (err.code == "30002" || err.code == "30001") {
            this.bindMobileBySmsCode();
          }
        }
      });
    },
    bindMobileBySmsCode() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile?phone=" + this.userInfo.mobile
      });
    },
    setNickname(nickname) {
      if (nickname) {
        uni_modules_uniIdPages_common_store.mutations.updateUserInfo({
          nickname
        });
        this.setNicknameIng = false;
        this.$refs.dialog.close();
      } else {
        this.$refs.dialog.open();
      }
    },
    deactivate() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
      });
    },
    async bindThirdAccount(provider) {
      const uniIdCo2 = common_vendor.Ds.importObject("uni-id-co");
      const bindField = {
        weixin: "wx_openid",
        alipay: "ali_openid",
        apple: "apple_openid",
        qq: "qq_openid"
      }[provider.toLowerCase()];
      if (this.userInfo[bindField]) {
        await uniIdCo2["unbind" + provider]();
        await uni_modules_uniIdPages_common_store.mutations.updateUserInfo();
      } else {
        common_vendor.index.login({
          provider: provider.toLowerCase(),
          onlyAuthorize: true,
          success: async (e) => {
            const res = await uniIdCo2["bind" + provider]({
              code: e.code
            });
            if (res.errCode) {
              common_vendor.index.showToast({
                title: res.errMsg || "绑定失败",
                duration: 3e3
              });
            }
            await uni_modules_uniIdPages_common_store.mutations.updateUserInfo();
          },
          fail: async (err) => {
            console.log(err);
            common_vendor.index.hideLoading();
          }
        });
      }
    },
    realNameVerify() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
      });
    },
    delCar(car) {
      db.updateAddress(car).then((res) => console.log(res)).catch((err) => {
        if (err.code === "uni-id-token-expired")
          this.logout();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_id_pages_avatar2 = common_vendor.resolveComponent("uni-id-pages-avatar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_id_pages_bind_mobile2 = common_vendor.resolveComponent("uni-id-pages-bind-mobile");
  (_easycom_uni_id_pages_avatar2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_tag2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_id_pages_bind_mobile2)();
}
const _easycom_uni_id_pages_avatar = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_id_pages_bind_mobile = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js";
if (!Math) {
  (_easycom_uni_id_pages_avatar + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_tag + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_id_pages_bind_mobile)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      width: "260rpx",
      height: "260rpx"
    }),
    b: common_vendor.p({
      title: "基本信息",
      type: "line"
    }),
    c: common_vendor.o(($event) => $options.setNickname("")),
    d: common_vendor.p({
      title: "名称",
      rightText: $options.userInfo.nickname || "未设置",
      link: true
    }),
    e: common_vendor.o($options.bindMobile),
    f: common_vendor.p({
      title: "手机号",
      rightText: $options.userInfo.mobile || "未绑定",
      link: true
    }),
    g: common_vendor.p({
      title: "地址",
      rightText: "userInfo.mobile||'未绑定'",
      link: true
    }),
    h: $options.userInfo.email
  }, $options.userInfo.email ? {
    i: common_vendor.p({
      title: "电子邮箱",
      rightText: $options.userInfo.email
    })
  } : {}, {
    j: $data.hasPwd
  }, $data.hasPwd ? {
    k: common_vendor.o($options.changePassword),
    l: common_vendor.p({
      title: "修改密码",
      link: true
    })
  } : {}, {
    m: common_vendor.p({
      title: "业务信息",
      type: "line"
    }),
    n: common_vendor.p({
      title: "我的订单",
      rightText: "userInfo.mobile||'未绑定'",
      link: true
    }),
    o: common_vendor.o(($event) => $options.delCar("川RFK862")),
    p: common_vendor.p({
      text: "川RFK862 ×"
    }),
    q: common_vendor.p({
      text: "川RFK862 ×"
    }),
    r: common_vendor.p({
      text: "新增车牌号",
      type: "success"
    }),
    s: common_vendor.p({
      title: "绑定的车牌号"
    }),
    t: common_vendor.p({
      accordion: true
    }),
    v: common_vendor.o($options.setNickname),
    w: common_vendor.p({
      mode: "input",
      value: $options.userInfo.nickname,
      inputType: $data.setNicknameIng ? "nickname" : "text",
      title: "设置昵称",
      placeholder: "请输入要设置的昵称"
    }),
    x: common_vendor.sr("dialog", "c8e26b33-16"),
    y: common_vendor.p({
      type: "dialog"
    }),
    z: common_vendor.sr("bind-mobile-by-sms", "c8e26b33-18"),
    A: common_vendor.o($options.bindMobileSuccess),
    B: $data.showLoginManage
  }, $data.showLoginManage ? common_vendor.e({
    C: $options.userInfo._id
  }, $options.userInfo._id ? {
    D: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  } : {
    E: common_vendor.o((...args) => $options.login && $options.login(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8e26b33"], ["__file", "D:/WWW/linni/pages/me/index.vue"]]);
wx.createPage(MiniProgramPage);

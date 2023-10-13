"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_validator = require("./validator.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../uni_modules/uni-id-pages/common/login-page.mixin.js");
require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/common/password.js");
require("../../uni_modules/uni-id-pages/config.js");
const uniIdCo = common_vendor.Ds.importObject("uni-id-co");
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      formData: {
        mobile: "",
        nickname: "",
        code: "",
        password: "",
        password2: "",
        captcha: ""
      },
      rules: pages_login_validator.rules,
      focusMobile: false,
      focusNickname: false,
      focusPassword: false,
      focusPassword2: false,
      codeShow: false,
      logo: "/static/logo.png",
      num: 30,
      timer: 0
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
  },
  methods: {
    /**
     * 触发表单提交
     */
    submit() {
      this.$refs.form.validate().then((res) => {
        if (this.formData.captcha.length != 4) {
          this.$refs.captcha.focusCaptchaInput = true;
          return common_vendor.index.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 3e3
          });
        }
        if (this.needAgreements && !this.agree) {
          return this.$refs.agreements.popup(() => {
            this.submitForm(res);
          });
        }
        this.submitForm(res);
      }).catch((errors) => {
        let key = errors[0].key;
        key = key.replace(key[0], key[0].toUpperCase());
        this["focus" + key] = true;
      });
    },
    submitForm(params) {
      uniIdCo.registerUser(this.formData).then((e) => {
        this.loginSuccess(e);
      }).catch((e) => {
        console.log(e.message);
        this.$refs.captcha.getImageCaptcha();
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    },
    registerByEmail() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/register/register-by-email"
      });
    },
    phoneInput(e) {
      if (/^1[3-9]\d{9}$/.test(e)) {
        this.codeShow = true;
      }
    },
    onGetPhoneNumber(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_captcha2 + _easycom_uni_id_pages_agreements2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_captcha = () => "../../uni_modules/uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_id_pages_agreements = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_captcha + _easycom_uni_id_pages_agreements + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.logo,
    b: common_vendor.o(($event) => $data.focusNickname = false),
    c: common_vendor.o(($event) => $data.formData.nickname = $event),
    d: common_vendor.p({
      inputBorder: false,
      focus: $data.focusNickname,
      placeholder: "请输入供货商名称",
      trim: "both",
      modelValue: $data.formData.nickname
    }),
    e: common_vendor.p({
      name: "nickname",
      required: true
    }),
    f: common_vendor.o(($event) => $data.focusPassword = false),
    g: common_vendor.o(($event) => $data.formData.password = $event),
    h: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    i: common_vendor.o(($event) => $data.formData.password = $event),
    j: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    k: common_vendor.o(($event) => $data.focusPassword2 = false),
    l: common_vendor.o(($event) => $data.formData.password2 = $event),
    m: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword2,
      placeholder: "再次输入密码",
      maxlength: "20",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    n: common_vendor.o(($event) => $data.formData.password2 = $event),
    o: common_vendor.p({
      name: "password2",
      required: true,
      modelValue: $data.formData.password2
    }),
    p: common_vendor.o(($event) => $data.focusMobile = false),
    q: common_vendor.o($options.phoneInput),
    r: common_vendor.o(($event) => $data.formData.mobile = $event),
    s: common_vendor.p({
      type: "number",
      maxlength: 11,
      inputBorder: false,
      focus: $data.focusMobile,
      placeholder: "请输入手机号",
      trim: "both",
      modelValue: $data.formData.mobile
    }),
    t: common_vendor.p({
      name: "mobile",
      required: true
    }),
    v: common_vendor.sr("captcha", "748ca9ec-10,748ca9ec-9"),
    w: common_vendor.o(($event) => $data.formData.captcha = $event),
    x: common_vendor.p({
      scene: "register",
      modelValue: $data.formData.captcha
    }),
    y: common_vendor.sr("agreements", "748ca9ec-11,748ca9ec-0"),
    z: common_vendor.p({
      scope: "register"
    }),
    A: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    B: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    C: common_vendor.o((...args) => $options.registerByEmail && $options.registerByEmail(...args)),
    D: common_vendor.o((...args) => $options.toLogin && $options.toLogin(...args)),
    E: common_vendor.sr("form", "748ca9ec-0"),
    F: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WWW/linni/pages/login/register.vue"]]);
wx.createPage(MiniProgramPage);

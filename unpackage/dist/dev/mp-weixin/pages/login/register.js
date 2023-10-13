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
        address: "",
        password: "",
        password2: "",
        captcha: "",
        role: "supplier"
      },
      rules: pages_login_validator.rules,
      focusMobile: false,
      focusNickname: false,
      focusPassword: false,
      focusPassword2: false,
      userType: [{ role: "supplier", name: "供货商" }, { role: "member", name: "员工" }, { role: "user", name: "客户" }]
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
  },
  computed: {
    name() {
      return this.userType.find((item) => item.role === this.formData.role).name;
    }
  },
  methods: {
    changeTitle(name = "supplier") {
      this.formData.role = name;
      common_vendor.index.setNavigationBarTitle({
        title: this.name + "注册"
      });
    },
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
    manBtn(e) {
      common_vendor.index.chooseLocation({
        success: (res) => {
          this.formData.address = res.address;
        }
      });
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
    a: common_vendor.t($options.name),
    b: common_vendor.o(($event) => $data.focusNickname = false),
    c: common_vendor.o(($event) => $data.formData.nickname = $event),
    d: common_vendor.p({
      inputBorder: false,
      focus: $data.focusNickname,
      placeholder: `请输入${$options.name}名称`,
      trim: "both",
      modelValue: $data.formData.nickname
    }),
    e: common_vendor.p({
      name: "nickname",
      required: true
    }),
    f: common_vendor.o((...args) => $options.manBtn && $options.manBtn(...args)),
    g: common_vendor.o(($event) => $data.formData.address = $event),
    h: common_vendor.p({
      placeholder: `${$options.name}地址选择`,
      trim: "both",
      inputBorder: false,
      modelValue: $data.formData.address
    }),
    i: common_vendor.p({
      name: "nickname",
      required: true
    }),
    j: common_vendor.t($options.name),
    k: common_vendor.o(($event) => $data.focusMobile = false),
    l: common_vendor.o(($event) => $data.formData.mobile = $event),
    m: common_vendor.p({
      inputBorder: false,
      focus: $data.focusMobile,
      placeholder: `请输入${$options.name}手机号`,
      trim: "both",
      modelValue: $data.formData.mobile
    }),
    n: common_vendor.p({
      name: "mobile",
      required: true
    }),
    o: common_vendor.o(($event) => $data.focusPassword = false),
    p: common_vendor.o(($event) => $data.formData.password = $event),
    q: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    r: common_vendor.o(($event) => $data.formData.password = $event),
    s: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    t: common_vendor.o(($event) => $data.focusPassword2 = false),
    v: common_vendor.o(($event) => $data.formData.password2 = $event),
    w: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword2,
      placeholder: "再次输入密码",
      maxlength: "20",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    x: common_vendor.o(($event) => $data.formData.password2 = $event),
    y: common_vendor.p({
      name: "password2",
      required: true,
      modelValue: $data.formData.password2
    }),
    z: common_vendor.sr("captcha", "748ca9ec-12,748ca9ec-11"),
    A: common_vendor.o(($event) => $data.formData.captcha = $event),
    B: common_vendor.p({
      scene: "register",
      modelValue: $data.formData.captcha
    }),
    C: common_vendor.sr("agreements", "748ca9ec-13,748ca9ec-0"),
    D: common_vendor.p({
      scope: "register"
    }),
    E: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    F: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    G: common_vendor.o((...args) => $options.registerByEmail && $options.registerByEmail(...args)),
    H: common_vendor.o((...args) => $options.toLogin && $options.toLogin(...args)),
    I: common_vendor.sr("form", "748ca9ec-0"),
    J: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    }),
    K: common_vendor.f($data.userType.filter((item) => item.role != $data.formData.role), (t, k0, i0) => {
      return {
        a: common_vendor.t(t.name),
        b: common_vendor.o(($event) => $options.changeTitle(t.role), t.role),
        c: t.role
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WWW/linni/pages/login/register.vue"]]);
wx.createPage(MiniProgramPage);

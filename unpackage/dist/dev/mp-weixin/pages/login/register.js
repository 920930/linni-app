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
        username: "",
        mobile: "",
        nickname: "",
        address: "",
        password: "",
        password2: "",
        // captcha: "",
        role: "supplier",
        cars: [],
        code: ""
      },
      rules: pages_login_validator.rules,
      focusMobile: false,
      focusUsername: false,
      focusNickname: false,
      focusPassword: false,
      focusPassword2: false,
      // supplier供货商 - member员工 - user客户
      userType: [{ role: "supplier", name: "供货商" }, { role: "member", name: "员工" }]
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
    },
    smsbool() {
      return /^1[3-9]{1}\d{9}$/.test(this.formData.mobile);
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
        if (this.formData.code.length < 2) {
          return common_vendor.index.showToast({
            title: "请输入手机验证码",
            icon: "none",
            duration: 3e3
          });
        }
        if (res.address.length < 5) {
          return common_vendor.index.showToast({
            title: "请输入地址",
            icon: "none",
            duration: 3e3
          });
        }
        if (this.formData.role !== "member") {
          if (!res.cars.length) {
            return common_vendor.index.showToast({
              title: "请增加车牌号",
              icon: "none",
              duration: 3e3
            });
          }
          const bool = res.cars.some((car) => !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(car));
          if (bool) {
            return common_vendor.index.showToast({
              title: "车牌号错误",
              icon: "none",
              duration: 3e3
            });
          }
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
      uniIdCo.registerAppUser(this.formData).then((e) => {
        this.loginSuccess(e);
      }).catch((e) => {
        console.log(e.message);
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
    },
    removeCar(item) {
      this.formData.cars = this.formData.cars.filter((car) => car != item);
    },
    dialogInputConfirm(e) {
      const set = new Set(this.formData.cars);
      set.add(e);
      this.formData.cars = [...set];
      this.$refs.inputClose.val = "";
    },
    smsBtn(e) {
      console.log(this.formData.code);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_id_pages_sms_form2 = common_vendor.resolveComponent("uni-id-pages-sms-form");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_tag2 + _easycom_uni_id_pages_agreements2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_id_pages_sms_form2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_id_pages_agreements = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_id_pages_sms_form = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-sms-form/uni-id-pages-sms-form.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_tag + _easycom_uni_id_pages_agreements + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_id_pages_sms_form)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
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
    f: common_vendor.o(($event) => $data.focusMobile = false),
    g: common_vendor.o(($event) => $data.formData.mobile = $event),
    h: common_vendor.p({
      inputBorder: false,
      focus: $data.focusMobile,
      placeholder: "请输入手机号",
      trim: "both",
      modelValue: $data.formData.mobile
    }),
    i: $options.smsbool
  }, $options.smsbool ? {
    j: common_vendor.o(($event) => _ctx.$refs.smsDialog.open())
  } : {}, {
    k: common_vendor.p({
      name: "mobile",
      required: true
    }),
    l: common_vendor.o((...args) => $options.manBtn && $options.manBtn(...args)),
    m: common_vendor.o(($event) => $data.formData.address = $event),
    n: common_vendor.p({
      placeholder: `${$options.name}地址选择`,
      trim: "both",
      inputBorder: false,
      modelValue: $data.formData.address
    }),
    o: common_vendor.p({
      name: "address",
      required: true
    }),
    p: common_vendor.f($data.formData.cars, (car, k0, i0) => {
      return {
        a: car,
        b: common_vendor.o(($event) => $options.removeCar(car), car),
        c: "748ca9ec-8-" + i0 + ",748ca9ec-7",
        d: common_vendor.p({
          text: car + " ×"
        })
      };
    }),
    q: common_vendor.o(($event) => _ctx.$refs.inputDialog.open()),
    r: common_vendor.p({
      text: "新增车牌",
      type: "primary"
    }),
    s: common_vendor.p({
      name: "cars",
      required: true
    }),
    t: common_vendor.t($options.name),
    v: common_vendor.o(($event) => $data.focusUsername = false),
    w: common_vendor.o(($event) => $data.formData.username = $event),
    x: common_vendor.p({
      inputBorder: false,
      focus: $data.focusUsername,
      placeholder: "请输入登录账户",
      trim: "both",
      modelValue: $data.formData.username
    }),
    y: common_vendor.p({
      name: "username",
      required: true
    }),
    z: common_vendor.o(($event) => $data.focusPassword = false),
    A: common_vendor.o(($event) => $data.formData.password = $event),
    B: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    C: common_vendor.o(($event) => $data.formData.password = $event),
    D: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    E: common_vendor.o(($event) => $data.focusPassword2 = false),
    F: common_vendor.o(($event) => $data.formData.password2 = $event),
    G: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword2,
      placeholder: "再次输入密码",
      maxlength: "20",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    H: common_vendor.o(($event) => $data.formData.password2 = $event),
    I: common_vendor.p({
      name: "password2",
      required: true,
      modelValue: $data.formData.password2
    }),
    J: common_vendor.sr("agreements", "748ca9ec-16,748ca9ec-0"),
    K: common_vendor.p({
      scope: "register"
    }),
    L: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    M: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    N: common_vendor.o((...args) => $options.registerByEmail && $options.registerByEmail(...args)),
    O: common_vendor.o((...args) => $options.toLogin && $options.toLogin(...args)),
    P: common_vendor.sr("form", "748ca9ec-0"),
    Q: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    }),
    R: common_vendor.sr("inputClose", "748ca9ec-18,748ca9ec-17"),
    S: common_vendor.o($options.dialogInputConfirm),
    T: common_vendor.p({
      mode: "input",
      title: "车牌号",
      placeholder: "请输入车牌号"
    }),
    U: common_vendor.sr("inputDialog", "748ca9ec-17"),
    V: common_vendor.p({
      type: "dialog"
    }),
    W: common_vendor.sr("smsCode", "748ca9ec-21,748ca9ec-20"),
    X: common_vendor.o(($event) => $data.formData.code = $event),
    Y: common_vendor.p({
      focusCaptchaInput: true,
      type: "login-by-sms",
      phone: $data.formData.mobile,
      modelValue: $data.formData.code
    }),
    Z: common_vendor.o($options.smsBtn),
    aa: common_vendor.p({
      title: "输入内容"
    }),
    ab: common_vendor.sr("smsDialog", "748ca9ec-19"),
    ac: common_vendor.p({
      type: "dialog"
    }),
    ad: common_vendor.f($data.userType.filter((item) => item.role != $data.formData.role), (t, k0, i0) => {
      return {
        a: common_vendor.t(t.name),
        b: common_vendor.o(($event) => $options.changeTitle(t.role), t.role),
        c: t.role
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WWW/linni/pages/login/register.vue"]]);
wx.createPage(MiniProgramPage);

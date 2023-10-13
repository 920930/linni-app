<!-- 账号注册页 -->
<template>
	<view class="uni-content">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<view style="margin-bottom: 15rpx; color: rgba(0, 0, 0, 0.7);">{{name}}基本信息</view>
			<uni-forms-item name="nickname" required>
				<uni-easyinput :inputBorder="false" :focus="focusNickname" @blur="focusNickname = false"
					class="input-box" :placeholder="`请输入${name}名称`" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname" required style="position: relative;">
				<view style="position: absolute; z-index: 10; left: 0; top: 0; bottom: 0; width: 89%;" @tap="manBtn"></view>
				<uni-easyinput :placeholder="`${name}地址选择`" v-model="formData.address" trim="both" :inputBorder="false" class="input-box" />
			</uni-forms-item>
			<view style="margin-bottom: 15rpx; color: rgba(0, 0, 0, 0.7);">{{name}}业务信息</view>
			<uni-forms-item name="mobile" required>
				<uni-easyinput :inputBorder="false" :focus="focusMobile" @blur="focusMobile = false"
					class="input-box" :placeholder="`请输入${name}手机号`" v-model="formData.mobile" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword" @blur="focusPassword = false"
					class="input-box" maxlength="20"
					:placeholder="'请输入' + (config.passwordStrength == 'weak'?'6':'8') + '-16位密码'" type="password"
					v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password2" v-model="formData.password2" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword2" @blur="focusPassword2 =false"
					class="input-box" placeholder="再次输入密码" maxlength="20" type="password" v-model="formData.password2"
					trim="both" />
			</uni-forms-item>
			<uni-forms-item>
				<uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />
			</uni-forms-item>
			<uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements>
			<button class="uni-btn" type="primary" @click="submit">注册</button>
			<button @click="navigateBack" class="register-back">返回</button>
			<match-media :min-width="690">
				<view class="link-box">
					<text class="link" @click="registerByEmail">邮箱验证码注册</text>
					<text class="link" @click="toLogin">已有账号？点此登录</text>
				</view>
			</match-media>
		</uni-forms>
	</view>
	<view class="other">
		<view v-for="t in userType.filter(item => item.role != formData.role)" :key="t.role">
			<text @tap="changeTitle(t.role)" class="other-item">{{t.name}}</text>
		</view>
	</view>
	<button @click="getRole">butto123n</button>
</template>

<script>
	import rules from './validator.js';
	import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
	import config from '@/uni_modules/uni-id-pages/config.js'
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'

	const uniIdCo = uniCloud.importObject("uni-id-co")
	const db = uniCloud.importObject('register')
	export default {
		mixins: [mixin],
		data() {
			return {
				formData: {
					mobile: "",
					nickname: "",
					address: "",
					password: "",
					password2: "",
					captcha: "",
					role: 'supplier',
				},
				rules,
				focusMobile: false,
				focusNickname: false,
				focusPassword: false,
				focusPassword2: false,
				userType: [{role: 'supplier', name: '供货商'}, {role: 'member', name: '员工'}, {role: 'user', name: '客户'}]
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.submit()
				}
			};
			// #endif
		},
		computed: {
			name(){
				return this.userType.find(item => item.role === this.formData.role).name
			}
		},
		methods: {
			async getRole(){
				const data = await db.sendRole();
				console.log(data)
			},
			changeTitle(name = 'supplier'){
				this.formData.role = name;
				uni.setNavigationBarTitle({
					title: this.name + '注册'
				})
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				this.$refs.form.validate().then((res) => {
					if (this.formData.captcha.length != 4) {
						this.$refs.captcha.focusCaptchaInput = true
						return uni.showToast({
							title: '请输入验证码',
							icon: 'none',
							duration: 3000
						});
					}
					if (this.needAgreements && !this.agree) {
						return this.$refs.agreements.popup(() => {
							this.submitForm(res)
						})
					}
					this.submitForm(res)
				}).catch((errors) => {
					let key = errors[0].key
					key = key.replace(key[0], key[0].toUpperCase())
					this['focus' + key] = true
				})
			},
			submitForm(params) {
				uniIdCo.registerUser(this.formData).then(e => {
						this.loginSuccess(e)
					})
					.catch(e => {
						console.log(e.message);
						//更好的体验：登录错误，直接刷新验证码
						this.$refs.captcha.getImageCaptcha()
					})
			},
			navigateBack() {
				uni.navigateBack()
			},
			toLogin() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				})
			},
			registerByEmail() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/register/register-by-email'
				})
			},
			manBtn(e){
				uni.chooseLocation({
					success:(res) => {
						this.formData.address = res.address
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	@media screen and (max-width: 690px) {
		.uni-content {
			margin-top: 15px;
			height: 100%;
			background-color: #fff;
		}
	}

	@media screen and (min-width: 690px) {
		.uni-content {
			padding: 30px 40px 60px;
			max-height: 530px;
		}

		.link-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			margin-top: 10px;
		}

		.link {
			font-size: 12px;
		}
	}

	.uni-content ::v-deep .uni-forms-item__label {
		position: absolute;
		left: -15px;
	}

	button {
		margin-top: 15px;
	}
	
	.other{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20%;
		margin: 80rpx 0;
		&-item{
			width: 40rpx;
			border-bottom: 2rpx solid black;
			padding-bottom: 4rpx;
		}
	}
</style>

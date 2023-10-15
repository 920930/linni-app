<!-- 账号注册页 -->
<template>
	<view class="uni-content">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<view style="margin-bottom: 15rpx; color: rgba(0, 0, 0, 0.7);">{{name}}基本信息</view>
			<uni-forms-item name="nickname" required>
				<uni-easyinput :inputBorder="false" :focus="focusNickname" @blur="focusNickname = false"
					class="input-box" :placeholder="`请输入${name}名称`" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="address" required style="position: relative;">
				<view style="position: absolute; z-index: 10; left: 0; top: 0; bottom: 0; width: 89%;" @tap="manBtn"></view>
				<uni-easyinput :placeholder="`${name}地址选择`" v-model="formData.address" trim="both" :inputBorder="false" class="input-box" />
			</uni-forms-item>
			<uni-forms-item name="cars" required>
					<view  style="display: flex; gap: 20rpx;">
						<uni-tag :text="car + ' ×'" v-for="car in formData.cars" :key="car" @click="removeCar(car)" />
						<uni-tag text="新增车牌" type="primary" @click="$refs.inputDialog.open()" />
					</view>
			</uni-forms-item>
			<view style="margin-bottom: 15rpx; color: rgba(0, 0, 0, 0.7);">{{name}}业务信息</view>
			<uni-forms-item name="mobile" required>
				<view style="display: flex; gap: 10rpx;">
					<uni-easyinput :inputBorder="false" :focus="focusMobile" @blur="focusMobile = false"
						 :placeholder="`请输入${name}手机号`" v-model="formData.mobile" trim="both" />
					<view class="smsbtn" v-if="smsbool" @click="$refs.smsDialog.open()">获取验证码</view>
				</view>
			</uni-forms-item>
			<!-- <uni-forms-item name="code" required>
				<uni-easyinput :inputBorder="false" class="input-box" :placeholder="`请输入手机验证码`" v-model="formData.code" trim="both" />
			</uni-forms-item> -->
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
			<!-- <uni-forms-item>
				<uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />
			</uni-forms-item> -->
			<uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements>
			<button class="uni-btn" style="background-color: #2979ff;" @click="submit">注册</button>
			<button @click="navigateBack" class="register-back">返回</button>
			<match-media :min-width="690">
				<view class="link-box">
					<text class="link" @click="registerByEmail">邮箱验证码注册</text>
					<text class="link" @click="toLogin">已有账号？点此登录</text>
				</view>
			</match-media>
		</uni-forms>
	</view>
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="车牌号" placeholder="请输入车牌号" @confirm="dialogInputConfirm" />
	</uni-popup>
	<uni-popup ref="smsDialog" type="dialog">
		<uni-popup-dialog title="输入内容" @confirm="smsBtn">
			<uni-id-pages-sms-form focusCaptchaInput v-model="formData.code" type="login-by-sms" ref="smsCode" :phone="formData.mobile" />
			<!-- <view class="dialog">
				<input class="dialog-input" placeholder="自动获得焦点" />
				<input class="dialog-input" placeholder="自动获得焦点" />
			</view> -->
		</uni-popup-dialog>
	</uni-popup>
	<view class="other">
		<view v-for="t in userType.filter(item => item.role != formData.role)" :key="t.role">
			<text @tap="changeTitle(t.role)" class="other-item">{{t.name}}</text>
		</view>
	</view>
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
					// captcha: "",
					role: 'supplier',
					cars: [],
					code: '',
				},
				rules,
				focusMobile: false,
				focusNickname: false,
				focusPassword: false,
				focusPassword2: false,
				// supplier供货商 - member员工 - user客户
				userType: [{role: 'supplier', name: '供货商'}, {role: 'member', name: '员工'}],
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
			},
			smsbool(){
				return /^1[3-9]{1}\d{9}$/.test(this.formData.mobile)
			}
		},
		methods: {
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
					if(res.address.length < 5){
						return uni.showToast({
							title: '请输入地址',
							icon: 'none',
							duration: 3000
						});
					}
					if(this.formData.role !== 'member'){
						if(!res.cars.length){
							return uni.showToast({
								title: '请增加车牌号',
								icon: 'none',
								duration: 3000
							});
						}
						const bool = res.cars.some(car => !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(car))
						if(bool){
							return uni.showToast({
								title: '车牌号错误',
								icon: 'none',
								duration: 3000
							});
						}
					}
					
					// if (this.formData.captcha.length != 4) {
					// 	this.$refs.captcha.focusCaptchaInput = true
					// 	return uni.showToast({
					// 		title: '请输入验证码',
					// 		icon: 'none',
					// 		duration: 3000
					// 	});
					// }
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
			},
			removeCar(item){
				this.formData.cars = this.formData.cars.filter(car => car != item)
			},
			dialogInputConfirm(e){
				const set = new Set(this.formData.cars)
				set.add(e)
				this.formData.cars = [...set]
				this.$refs.inputClose.val = '';
			},
			smsBtn(e) {
				console.log(this.formData.code)
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
	.smsbtn{
		font-size: 32rpx;
		height: 44px;
		line-height: 44px;
		padding:0 15rpx;
		border-radius: 10rpx;
		background-color: #2979ff;
		color: white;
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
	
	.dialog{
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		width: 100%;
		.dialog-input{
			background-color: rgba(0, 0, 0, 0.05);
			padding: 0 20rpx;
			height: 40px;
			font-size: 26rpx;
			border-radius: 10rpx;
		}
	}
</style>

<!-- 用户资料页 -->
<template>
	<view class="uni-content">
		<view class="avatar">
			<uni-id-pages-avatar width="260rpx" height="260rpx"></uni-id-pages-avatar>
		</view>
		
		<uni-section title="基本信息" type="line" />
		<uni-list>
			<uni-list-item class="item" @click="setNickname('')" title="名称" :rightText="userInfo.nickname||'未设置'" link />
			<uni-list-item class="item" @click="bindMobile" title="手机号" :rightText="userInfo.mobile||'未绑定'" link />
			<uni-list-item v-if="hasPwd" class="item" @click="changePassword" title="修改密码" link />
			<uni-list-item class="item" title="地址" :note="userInfo.address" rightText="更改" link @click="changeAddress" />
			<!-- #ifdef APP -->
      <!-- 如未开通实人认证服务，可以将实名认证入口注释 -->
			<uni-list-item class="item" @click="realNameVerify" title="实名认证" :rightText="realNameStatus !== 2 ? '未认证': '已认证'" link />
			<!-- #endif -->
			<uni-list-item v-if="userInfo.email" class="item" title="电子邮箱" :rightText="userInfo.email" />
		</uni-list>
		
		<uni-section title="业务信息" class="mt10" type="line" />
		<uni-list v-if="userInfo.role.includes('supplier')">
			<uni-list-item class="item" title="我的预约" rightText="进入" link @click="orderUrl" />
			<uni-collapse accordion style="border-top: 1rpx solid rgba(0, 0, 0, 0.06);">
				<uni-collapse-item title="绑定的车牌号" open>
					<view style="padding: 10rpx 30rpx 30rpx; display: flex; gap: 20rpx; flex-direction: row; flex-wrap: wrap;">
						<uni-tag :text="`${car} ×`" @click="changeCar(car)" v-for="car in userInfo.cars" :key="car" />
						<uni-tag text="新增车牌号" type="success" @click="changeCar" />
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</uni-list>
		<uni-list v-else>
			<uni-list-item class="item" title="扫码" link @click="codeNavigate" />
		</uni-list>
		{{code}}
		<!-- #ifndef MP -->
		<uni-list class="mt30">
			<uni-list-item @click="deactivate" title="注销账号" link="navigateTo"></uni-list-item>
		</uni-list>
		<!-- #endif -->
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname" :inputType="setNicknameIng?'nickname':'text'"
				title="设置昵称" placeholder="请输入要设置的昵称">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="carDialog" type="dialog">
			<uni-popup-dialog ref="carClose" mode="input" title="车牌号" placeholder="请输入车牌号" @confirm="carConfirm" />
		</uni-popup>
		<uni-id-pages-bind-mobile ref="bind-mobile-by-sms" @success="bindMobileSuccess" />
		<template v-if="showLoginManage">
			<button v-if="userInfo._id" @click="logout">退出登录</button>
			<button v-else @click="login">去登录</button>
		</template>
	</view>
</template>
<script>
	import {computed} from 'vue'
  import {store, mutations} from '@/uni_modules/uni-id-pages/common/store.js';
	
	const uniIdCo = uniCloud.importObject("uni-id-co");
	
	export default {
    computed: {
      userInfo() {
        return store.userInfo
      },
			realNameStatus () {
				if (!this.userInfo.realNameAuth) {
					return 0
				}
				return this.userInfo.realNameAuth.authStatus
			}
    },
		data() {
			return {
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				},
				// userInfo: {
				// 	mobile:'',
				// 	nickname:''
				// },
				hasPwd: false,
				showLoginManage: true ,//通过页面传参隐藏登录&退出登录按钮
				setNicknameIng:false,
			}
		},
		async onShow() {
			this.univerifyStyle.authButton.title = "本机号码一键绑定"
			this.univerifyStyle.otherLoginButton.title = "其他号码绑定"
		},
		async onLoad(e) {
			if (e.showLoginManage) {
				this.showLoginManage = true //通过页面传参隐藏登录&退出登录按钮
			}
			//判断当前用户是否有密码，否则就不显示密码修改功能
			try{
				let res = await uniIdCo.getAccountInfo();
				this.hasPwd = res.isPasswordSet
			}catch(e){
				mutations.logout();
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd',
					complete: (e) => {
						// console.log(e);
					}
				})
			},
			logout() {
				mutations.logout()
			},
			bindMobileSuccess() {
				mutations.updateUserInfo()
			},
			changePassword() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd',
					complete: (e) => {
						// console.log(e);
					}
				})
			},
			bindMobile() {
				// #ifdef APP-PLUS
				uni.preLogin({
					provider: 'univerify',
					success: this.univerify(), //预登录成功
					fail: (res) => { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
						this.bindMobileBySmsCode()
					}
				})
				// #endif

				// // #ifdef MP-WEIXIN
				// this.$refs['bind-mobile-by-sms'].open()
				// // #endif

				// #ifdef MP-WEIXIN || H5
				//...去用验证码绑定
				this.bindMobileBySmsCode()
				// #endif
			},
			univerify() {
				uni.login({
					"provider": 'univerify',
					"univerifyStyle": this.univerifyStyle,
					success: async e => {
						uniIdCo.bindMobileByUniverify(e.authResult).then(res => {
							mutations.updateUserInfo()
						}).catch(e => {
							console.log(e);
						}).finally(e => {
							// console.log(e);
							uni.closeAuthView()
						})
					},
					fail: (err) => {
						console.log(err);
						if (err.code == '30002' || err.code == '30001') {
							this.bindMobileBySmsCode()
						}
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile?phone=' + this.userInfo.mobile
				})
			},
			setNickname(nickname) {
				if (nickname) {
					mutations.updateUserInfo({
						nickname
					})
					this.setNicknameIng = false
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
			deactivate(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
				})
			},
			async bindThirdAccount(provider) {
				const uniIdCo = uniCloud.importObject("uni-id-co")
				const bindField = {
					weixin: 'wx_openid',
					alipay: 'ali_openid',
					apple: 'apple_openid',
					qq: 'qq_openid'
				}[provider.toLowerCase()]

				if (this.userInfo[bindField]) {
					await uniIdCo['unbind' + provider]()
					await mutations.updateUserInfo()
				} else {
					uni.login({
						provider: provider.toLowerCase(),
						onlyAuthorize: true,
						success: async e => {
							const res = await uniIdCo['bind' + provider]({
								code: e.code
							})
							if (res.errCode) {
								uni.showToast({
									title: res.errMsg || '绑定失败',
									duration: 3000
								})
							}
							await mutations.updateUserInfo()
						},
						fail: async (err) => {
							console.log(err);
							uni.hideLoading()
						}
					})
				}
			},
			realNameVerify () {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
				})
			},
			changeAddress(){
				uni.chooseLocation({
					success(res) {
						if(res.address.length){
							mutations.updateUserInfo({address: res.address})
						}
					}
				});
			},
			changeCar(car = ''){
				if(car){
					const cars = store.userInfo.cars.filter(ca => ca !== car)
					mutations.updateUserInfo({cars})
				}else{
					this.$refs.carDialog.open();
				}
			},
			carConfirm(e){
				if(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,3}$/.test(e)){
					const cars = new Set([e, ...store.userInfo.cars]);
					mutations.updateUserInfo({cars: [...cars]});
					this.$refs.carClose.val = ''
				}else{
					uni.showToast({
						title: '请输入正确的车牌号',
						icon: 'none',
						duration: 3000
					});
				}
			},
			orderUrl(){
				uni.navigateTo({
					url: '/pages/me/order'
				})
			},
			codeNavigate(){
				uni.navigateTo({
					url: '/pages/me/check'
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	.uni-content {
		padding: 0;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	@media screen and (min-width: 690px) {
		.uni-content {
			padding: 0;
			max-width: 690px;
			margin-left: calc(50% - 345px);
			border: none;
			max-height: none;
			border-radius: 0;
			box-shadow: none;
		}
	}

	/* #endif */
	.avatar {
		align-items: center;
		justify-content: center;
		margin: 22px 0;
		width: 100%;
	}

	.item {
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	button {
		margin: 10%;
		margin-top: 40px;
		border-radius: 0;
		background-color: #FFFFFF;
		width: 80%;
	}

	.mt10 {
		margin-top: 10px;
	}
	.mt30 {
		margin-top: 30px;
	}
</style>

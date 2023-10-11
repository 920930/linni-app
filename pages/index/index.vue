<template>
	<view class="bg"></view>
	<view class="top">
		<view class="top-bg">
			<uni-icons custom-prefix="iconfont" type="icon-huoche" color='white' size="200" />
		</view>
		<view class="top-title">
			<view class="top-title-left">
				<view class="top-title-left-name">
					<view class="top-title-left-name-icon">
						<uni-icons custom-prefix="iconfont" type="icon-huoche" color='white' size="50" />
					</view>
					<text>您好</text>
				</view>
				<text class="top-title-left-text">欢迎来到邻你物流园区服务系统</text>
			</view>
			<view class="top-title-right" @tap='loginBtn'>个人中心</view>
		</view>
	</view>
	<view class="main">
		<view class="main-title">大成都最有温度的物流专家</view>
		<view class="main-ul">
			<view class="main-ul-li" @tap="registerBtn">
				<image src="../../static/index/index-user.png" class="main-ul-li-left" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">用户注册</text>
					<view class="main-ul-li-center-b">供货商、客户、员工注册</view>
				</view>
				<uni-icons type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
			</view>
			<view class="main-ul-li">
				<image src="../../static/index/index-yy.png" class="main-ul-li-left" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">电子提单</text>
					<view class="main-ul-li-center-b">电子化提单申请</view>
				</view>
				<uni-icons type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
			</view>
			<view class="main-ul-li">
				<image src="../../static/index/index-bf.png" class="main-ul-li-left" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">商务来访</text>
					<view class="main-ul-li-center-b">来访预约申请</view>
				</view>
				<uni-icons type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
			</view>
			<view class="main-ul-li">
				<image src="../../static/index/index-in.png" class="main-ul-li-left" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">入园须知</text>
					<view class="main-ul-li-center-b">严格遵守入园须知</view>
				</view>
				<uni-icons type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
			</view>
			<view class="main-ul-li">
				<image src="../../static/index/index-email.png" class="main-ul-li-left" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">投诉与建议</text>
					<view class="main-ul-li-center-b">提出建议与反馈</view>
				</view>
				<uni-icons type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
			</view>
		</view>
	</view>
	<view class="footer">
		<view>- 服务热线 -</view>
		<text>400-8055-400</text>
	</view>
</template>

<script setup>
	// import store from '@/uni_modules/uni-id-pages/common/store.js'
	const loginBtn = () => {
		uni.navigateTo({
			"url":"/uni_modules/uni-id-pages/pages/login/login-withpwd"
		})
	}
	const registerBtn = () => {
		uni.navigateTo({
			"url":"/uni_modules/uni-id-pages/pages/register/register"
		})
	}
</script>

<style scoped lang="scss">
.bg {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(to bottom, rgb(21, 118, 223) 30%, rgb(248,248,248));
	z-index: -2;
}
.top{
	margin-top: 100rpx;
	padding-top: 100rpx;
	position: relative;
	&-bg{
		position: absolute;
		top: 0;
		display: inline-block;
		transform: rotateY(180deg);
		opacity: 0.1;
	}
	&-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 4%;
		color: white;
		opacity: 0.9;
		&-left{
			flex: 1;
			margin-left: 30rpx;
			&-name{
				display: flex;
				align-items: center;
				color: white;
				font-size: 50rpx;
				margin-bottom: -10rpx;
				&-icon{
					display: inline-block;
					transform: rotateY(180deg);
					margin-right: 20rpx;
				}
			}
			&-text{
				font-size: $uni-font-size-sm;
			}
		}
		&-right{
			background-color: rgba(255, 255, 255, 0.2);
			padding: 10rpx 20rpx;
			border-radius: $uni-border-radius-base;
		}
	}
}
.main{
	margin-top: 80rpx;
	&-title{
		font-size: $uni-font-size-base;
		color: white;
		text-align: center;
	}
	&-ul{
		background-color: white;
		margin: 20rpx 4%;
		padding: 30rpx;
		border-radius: $uni-border-radius-base;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		box-sizing: border-box;
		&-li{
			// background-color: white;
			// padding: 20rpx;
			// box-sizing: border-box;
			// box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 0, 0.05);
			// border-radius: $uni-border-radius-base;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: $uni-font-size-lg;
			&-left{
				border-radius: 10rpx;
				width: 100rpx;
				height: 100rpx;
			}
			&-center{
				flex: 1;
				margin-left: 20rpx;
				&-t{
					font-weight: bold;
				}
				&-b{
					color: $uni-text-color-grey;
					font-size: $uni-font-size-base;
					margin-top: 3rpx;
				}
			}
			&-right{
				border: 2rpx solid $uni-bg-color-blue;
				padding: 2rpx 10rpx;
				color: $uni-bg-color-blue;
				border-radius: 6rpx;
			}
		}
	}
}
.footer{
	position: absolute;
	bottom: 20rpx;
	width: 100%;
	text-align: center;
	color: rgb(24,106,195);
	font-weight: bold;
	font-size: $uni-font-size-base;
}
</style>

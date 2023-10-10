<template>
	<view class="bg">
	</view>
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
			<view class="top-title-right">个人中心</view>
		</view>
	</view>
	<view class="main">
		<view class="main-title">大成都最有温暖的物流专家</view>
		<view class="main-ul">
			<view class="main-ul-li">
				<uni-icons custom-prefix="iconfont" type="icon-huoche" size="50" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">用户注册</text>
					<view class="main-ul-li-center-b">供货商、客户、员工注册</view>
				</view>
				<view class="">选择</view>
			</view>
			<view class="main-ul-li">
				<uni-icons custom-prefix="iconfont" type="icon-huoche" size="50" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">电子提单</text>
					<view class="main-ul-li-center-b">电子化提单申请</view>
				</view>
				<view class="">选择</view>
			</view>
			<view class="main-ul-li">
				<uni-icons custom-prefix="iconfont" type="icon-huoche" size="50" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">来访预约</text>
					<view class="main-ul-li-center-b">来访预约申请</view>
				</view>
				<view class="">选择</view>
			</view>
			<view class="main-ul-li">
				<uni-icons custom-prefix="iconfont" type="icon-huoche" size="50" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">入园申请</text>
					<view class="main-ul-li-center-b">严格遵守入园须知</view>
				</view>
				<view class="">选择</view>
			</view>
			<view class="main-ul-li">
				<uni-icons custom-prefix="iconfont" type="icon-huoche" size="50" />
				<view class="main-ul-li-center">
					<text class="main-ul-li-center-t">投诉与建议</text>
					<view class="main-ul-li-center-b">提出建议与反馈</view>
				</view>
				<view class="">选择</view>
			</view>
		</view>
	</view>
	<view class="footer">
		<view>- 服务热线 -</view>
		<text>400-8055-400</text>
	</view>
</template>

<script setup>
	const loginBtn = () => {
		uni.navigateTo({
			"url":"/uni_modules/uni-id-pages/pages/login/login-withpwd"
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
	margin-top: 120rpx;
	padding-top: 110rpx;
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
		margin: 0 3%;
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
		margin: 20rpx 3%;
		padding: 15rpx 3%;
		border-radius: $uni-border-radius-base;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		box-sizing: border-box;
		&-li{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: $uni-font-size-lg;
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
	font-size: ;
}
</style>

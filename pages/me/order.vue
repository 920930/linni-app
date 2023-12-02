<template>
	<view class="top">
		<view class="top-l"></view>
		<view class="top-l top-r"></view>
		<view class="top-main">
			<image :src='store.userInfo.avatar_file.url' class="top-main-img" />
			<view class="top-main-right">
				<view class="top-main-right-title">{{store.userInfo.nickname}}</view>
				<text class="top-main-right-text">{{store.userInfo.mobile}}</text>
			</view>
		</view>
	</view>
	<view class="tab">
		<text class="tab-item" :class="{'tab-active': active}" @click="activeBtn(true)">我的预约</text>
		<text class="tab-item" :class="{'tab-active': !active}" @click="activeBtn(false)">历史预约</text>
	</view>
	<unicloud-db
		ref='orderRef'
		v-slot:default="{data, loading, error}"
		collection="web-order"
		:where="`uid == $cloudEnv_uid ${active ? `&& state == 1 && ${Date.now()} < end` : ` && ${Date.now()} > end`}`"
		:orderby="`${active ? 'end asc' : 'end desc'}`"
	>
		<view v-if="loading" class="or">loading...</view>
	  <view v-if="error" class="or">出错了。。。</view>
		<view v-else class="or" v-for="item in data" :key="item._id" @click="navito(item._id)">
			<view class="or-time">
				<text>入园时间：</text>
				<uni-dateformat :date="item.start" format="yyyy-MM-dd hh:mm" class="or-black" />-<uni-dateformat :date="item.end" class="or-black" format="hh:mm" />
			</view>
			<view class="or-time or-time-flex">
				<view>
					<text>入园车辆：</text>
					<text class="or-black">{{item.car}}</text>
				</view>
				<uni-icons custom-prefix="iconfont" type="icon-ico" size="25" @tap="codeFn(item)" v-if="item.state !== 0 && Date.now() < item.end" />
			</view>
			<view class="or-time or-time-flex">
				<text>货仓类型：</text>
				<view class="or-black" style="display: inline-flex; gap: 10rpx;">
					<uni-tag v-for="(v, i) in item.genre" :key="i" inverted :text="v" size="mini" />
				</view>
			</view>
			<view class="or-time">
				<text>温馨提示：</text>
				<text class="or-black">
					{{
						item.state === 1 && Date.now() > item.start && Date.now() < item.end
							? '您现在可以入园，请尽快进入'
							: item.state === 1 && Date.now() < item.start
								? '请在规定时间内入园，过期无效'
								: '您已经取消或完成，欢迎再次预约'
					}}
				</text>
			</view>
			<uni-icons class="or-ab" type="right" size="20" color="rgba(0, 0, 0, 0.4)" />
		</view>
	</unicloud-db>
	<view style="height: 20rpx;"></view>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { onPullDownRefresh, onReachBottom, onReady } from "@dcloudio/uni-app";
import {store} from '@/uni_modules/uni-id-pages/common/store.js';

const orderRef = ref();
const active = ref(true);
const code = reactive({
	show: false,
	value: ''
})

onReady(() => {
	uni.setNavigationBarColor({
		frontColor: '#ffffff',
		backgroundColor: '#0cc0b0',
	})
	
})
onPullDownRefresh(() => {
	orderRef.value.loadData({clear: true}, () => {
		uni.stopPullDownRefresh()
	})
})
onReachBottom(() => orderRef.value.loadMore())

const activeBtn = (bool: boolean) => {
	active.value = bool;
}
const navito = (_id: string) => {
	uni.navigateTo({
		url: '/pages/me/oritem?id='+_id
	})
}
</script>

<style lang="scss" scoped>
.top{
	background-color: #0cc0b0;
	height: 100rpx;
	position: relative;
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	padding-top: 10rpx;
	&-l{
		position: absolute;
		height: 40rpx;
		width: 20rpx;
		background-color: white;
		left: 10%;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	&-r{
		left: calc(90% - 10px);
	}
	&-main{
		position: absolute;
		height: 160rpx;
		background-color: white;
		margin: 20rpx 3%;
		box-sizing: border-box;
		width: 94%;
		border-radius: 15rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		background-color: white;
		border: 1rpx solid rgba(0, 0, 0, 0.05);
		box-shadow: 0 5rpx 10rpx rgba(0, 0, 0, 0.05);
		&-img{
			width: 100rpx;
			height: 100rpx;
			margin-right: 30rpx;
			border-radius: 50%;
		}
		&-right{
			flex: 1;
			&-title{
				margin-bottom: 10rpx;
			}
			&-text{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
		}
	}
}
.tab{
	margin: 100rpx 3% 20rpx;
	border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	gap: 40rpx;
	&-item{
		padding-bottom: 10rpx;
	}
	&-active{
		border-bottom: 4rpx solid #0cc0b0;
		color: #0cc0b0;
	}
}
.or{
	border: 1rpx solid rgba(0, 0, 0, 0.1);
	margin: 0 3% 20rpx;
	background-color: white;
	font-size: $uni-font-size-base;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	padding: 20rpx;
	position: relative;
	&-time{
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}
	&-time-flex{
		display: flex;
		align-items: center;
	}
	&-black{
		color: black;
	}
	&-red{
		color: red;
	}
	&-ab{
		position: absolute;
		right: 10rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}
.canvas{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	&-code{
		position: absolute;
		width: 400rpx;
		height: 400rpx;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 30rpx;
		box-shadow: 0 0 20rpx 10rpx rgba(0, 0, 0, 0.05);
		border-radius: 10rpx;
	}
}
</style>
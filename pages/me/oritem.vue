<template>
	<unicloud-db
		ref='dbRef'
		v-slot:default="{data, loading, error}"
		collection="web-order"
		loadtime="manual"
		:where="`uid == $cloudEnv_uid && _id == '${code.id}'`"
		:getone="true"
	>
		<!-- <view v-if="loading">loading...</view> -->
		<view v-if="data" class="bg">
			<view class="main">
				<view class="main-header">
					<view class="main-header-title">{{store.userInfo.nickname}}</view>
					<text class="main-header-desc">编号：{{data._id}}</text>
				</view>
				<view class="main-time">
					<uni-dateformat :date="data.start" format="yyyy-MM-dd hh:mm" class="or-black" />-<uni-dateformat :date="data.end" class="or-black" format="hh:mm" />
				</view>
				<view class="main-code">
					<uv-qrcode ref="qrcode" :options="codeopt" value="data._id" @tap="toUrl(data._id)" />
				</view>
				<view class="main-text" :style="`color: ${codeActive.color}`">{{codeActive.desc}}</view>
				<view style="text-align: center;">
					<button class="main-btn" hover-class="main-btn-hover" :loading="code.load" @tap="resetBtn">刷新状态~</button>
				</view>
			</view>
			<view class="more" @tap="backBtn">
				<view class="more-title">
					<text>最新预约</text>
					<uni-icons type="right" size="15" />
				</view>
				<text class="more-desc">返回查询最近的预约历史记录</text>
				<uni-icons type="list" size="40" class="more-bg" />
			</view>
			<view class="yy">
				<view class="yy-item" @tap="newyuyueBtn">
					<view class="yy-item-title">立即预约</view>
					<text class="yy-item-desc">预约新的入园申请</text>
					<uni-icons type="list" size="40" class="yy-item-bg" />
				</view>
				<view class="yy-item" @tap="updateOrderBtn">
					<view class="yy-item-title">取消预约</view>
					<text class="yy-item-desc">取消本次预约</text>
					<uni-icons type="list" size="40" class="yy-item-bg" />
				</view>
			</view>
		</view>
	</unicloud-db>
</template>

<script setup>
import { onReady, onLoad } from '@dcloudio/uni-app';
import { computed, reactive, ref } from 'vue';
import {store} from '@/uni_modules/uni-id-pages/common/store.js';
// db前端ref
const dbRef = ref();
// 二维码ref
const qrcode = ref();
const avatar = computed(() => store.userInfo.avatar_file.url || 'https://www.uvui.cn/common/logo.png');
// id为当前order的_id current 0表示5分钟显示过期了，1参考codeInfo
const code = reactive({
	id: '',
	current: 0,
	value: '',
	load: false,
})
const codeInfo = [
	{id: 0, color: '#86909c', desc: '过期：请刷新二维码'},
	{id: 1, color: '#27a468', desc: '绿码：请扫码核实进入园区'},
	{id: 2, color: '#ffb400', desc: '黄码：未到预约时间 请等待'},
	{id: 3, color: '#f53f3f', desc: '红码：预约已过期 请重新预约'},
	{id: 4, color: '#b71de8', desc: '紫码：您已完成预约'},
	{id: 5, color: '#165dff', desc: '蓝码：您已取消本次预约'},
];
const codeActive = computed(() => codeInfo[code.current]);
const codeopt = reactive({
	data: 'https://www.zcfsjt.com',
	size: 200,
	// 二维码颜色
	foregroundColor: '#27a468',
	// 二维码背景 后景色
	// areaColor: 'rgba(0, 0, 0, 0.1)',
	margin: 10,
	// 二维码背景 前景色
	backgroundColor: 'white',
	foregroundImageSrc: avatar,
	foregroundImageBorderRadius: 10,
})

onLoad(e => code.id = e.id);
onReady(() => {
	uni.setNavigationBarColor({
		frontColor: '#ffffff',
		backgroundColor: '#1576df',
	})
	resetBtn()
})
const toUrl = (id) => {
	uni.navigateTo({
		url: '/pages/me/check?id='+code.value
	})
}
// 获取数据更新
const resetBtn = async () => {
	code.load = true;
	dbRef.value.loadData({}, (datav) => {
		code.load = false;
		console.log(datav)
		if(datav.state == 1){
			const now = Date.now();
			if(now < datav.start) {
				code.current = 2; // 未到时间
			} else if (now > datav.start && now < datav.end) {
				code.current = 1; // 正当时
				setTimeout(() => resetTime(), 10000)
			} else {
				code.current = 3; // 未入园，已过期
			}
		}else if(datav.state == 0){
			code.current = 5;// 取消预约
		}else{
			code.current = 4;// 完成的预约
		}
		code.value = `${datav._id},${code.current}`;
		resetTime(codeInfo[code.current].color, 100);
	});
}
// 过期重置数据
const resetTime = (color = '#86909c', t = 10000) => {
	setTimeout(() => codeopt.foregroundColor = color, t)
}
const backBtn = () => uni.navigateBack();
const newyuyueBtn = () => {
	uni.redirectTo({
		url: '/pages/yuyue/send',
	})
}
const updateOrderBtn = () => {
	if([3,4,5].includes(code.current)){
		return uni.showToast({
			title: '已过期/已完成',
			icon: 'none'
		})
	}
	dbRef.value.update(code.id, { state: 0 }, {
		toastTitle: '修改成功',
		success(res) { // 更新成功后的回调
			resetBtn()
		},
	})
}
</script>

<style lang="scss" scoped>
.bg {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(to bottom, rgb(21, 118, 223) 30%, white);
	z-index: -100;
}
.main{
	background-color: white;
	margin: 30rpx 3% 0;
	border-radius: 20rpx;
	padding: 25rpx;
	font-size: $uni-font-size-base;
	&-header{
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
		font-size: $uni-font-size-sm;
		padding-bottom: 12rpx;
		&-title{
			margin-bottom: 10rpx;
			font-weight: bold;
			font-size: $uni-font-size-base;
		}
		&-desc{
			color: $uni-text-color-grey;
		}
	}
	&-time{
		margin-top: 20rpx;
		text-align: center;
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	&-code{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	&-text{
		text-align: center;
		color: #27a468;
		font-weight: bold;
	}
	&-btn{
		display: inline-block;
		text-align: center;
		width: 180px;
		margin-top: 20rpx;
		font-size: 36rpx;
		border-radius: 50rpx;
		background: linear-gradient(to right, #7f96f3, #3757ec);
		color: white;
		border: 5rpx solid #6572e7;
		box-sizing: border-box;
	}
	&-btn-hover{
		transition: all 0.3s;
		background: linear-gradient(to right, #168cff, #165dff);
	}
}
.more{
	margin: 1rpx 3% 30rpx;
	background-color: white;
	border-radius: 20rpx;
	padding: 25rpx;
	font-size: $uni-font-size-base;
	position: relative;
	box-shadow: 0 1rpx 10rpx 3rpx rgba(0,0,0,0.05);
	&-title{
		font-weight: bold;
		margin-bottom: 6rpx;
		display: flex;
		align-items: center;
		gap: 6rpx;
	}
	&-desc{
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
	&-bg{
		position: absolute;
		right: 0;
		bottom: 0;
		color: #fff;
	}
}
.yy{
	display: flex;
	gap: 30rpx;
	margin: 30rpx 3%;
	&-item{
		flex: 1;
		background-color: white;
		border-radius: 20rpx;
		box-shadow: 0 1rpx 10rpx 5rpx rgba(0,0,0,0.05);
		padding: 25rpx;
		font-size: $uni-font-size-base;
		position: relative;
		&-title{
			font-weight: bold;
			margin-bottom: 6rpx;
			display: flex;
			align-items: center;
			gap: 6rpx;
		}
		&-desc{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		&-bg{
			position: absolute;
			right: 0;
			bottom: 0;
			color: #fff;
		}
	}
}
</style>
<template>
	<unicloud-db
		ref='orderRef'
		v-slot:default="{data, loading, error}"
		:collection="colList"
		orderby="end desc"
	>
	  <view v-if="error">出错了。。。</view>
		<view v-if="loading">loading...</view>
		<view v-else class="or" v-for="item in data" :key="item._id">
			<view class="or-top">
				<text>{{item.uid[0].nickname}}，您好！</text>
				<text class="or-top-r" :class="{'or-top-active' : item.state && Date.now() < item.end}">
				{{ Date.now() > item.end && item.state === 1 ?  "已过期" : STATE[item.state]}}
				</text>
			</view>
			<view class="or-time">
				入园时间：<uni-dateformat :date="item.start" format="yyyy-MM-dd hh:mm" />-<uni-dateformat :date="item.end" format="hh:mm" />
			</view>
			<view class="or-time or-time-flex">
				<text>入园车辆：{{item.car}}</text>
				<uni-icons custom-prefix="iconfont" type="icon-ico" size="25" @tap="codeFn(item)" v-if="item.state !== 0 && Date.now() < item.end" />
			</view>
			<view class="or-time">
				<text>货仓类型：</text>
				<view class="" style="display: inline-flex; gap: 10rpx;" v-if="item.state === 1  && Date.now() < item.end && Date.now() > item.start">
					<uni-tag v-for="(v, i) in item.genre" :key="i" inverted :text="v" size="mini" />
				</view>
			</view>
			<view class="or-time or-time-flex">
				<text>{{
					item.state === 1 && Date.now() > item.start && Date.now() < item.end
						? '您现在可以入园，请尽快进入'
						: item.state === 1 && Date.now() < item.start ? '请在规定时间内入园，过期无效' : '您已经取消或完成，欢迎再次预约'}}
				</text>
				<text v-if="item.state === 1 && Date.now() < item.start" @click="quxiaoBtn(item)">取消</text>
			</view>
		</view>
	</unicloud-db>
	<view class="canvas" v-show="code.show" @tap="codeFn">
		<view class="canvas-code">
			<uv-qrcode ref="qrcode" size="400rpx" value="https://h5.uvui.cn" />
		</view>
	</view>
	<view style="height: 20rpx;"></view>
	<view class="btn" @tap="moreBtn">{{ state ? '所有预约' : '正常预约' }}</view>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
const db = uniCloud.database();
const orderRef = ref();
const code = reactive({
	show: false,
	value: ''
})
const state = ref(0);
const val = ref(`state >= ${state.value} && end >= ${Date.now()}`)
const STATE = {
	0: '已取消',
	1: '待入园',
	2: '已入园',
}
const colList = ref([
	db.collection('web-order').where(`uid == $cloudEnv_uid ${state.value == 1 ? `&& state >= 1 && end >= ${Date.now()}`: ''}`).getTemp(),
	db.collection('uni-id-users').field('_id,mobile,nickname').getTemp({getOne: true}),
]);

onPullDownRefresh(() => {
	orderRef.value.loadData({clear: true}, () => {
		uni.stopPullDownRefresh()
	})
})
onReachBottom(() => orderRef.value.loadMore())
// 用户取消订单
const quxiaoBtn = (item: any) => {
	db.collection('web-order').doc(item._id).update({state: 0})
		.then(() => item.state = 0)
		.catch((e) => {
			uni.showToast({
				title: e.errMsg,
				icon: "error"
			})
		})
}
const codeFn = (item: any = null) => {
	if(item) code.value = item._id;
	code.show = !code.show
}

const moreBtn = () => {
	state.value = state.value == 0 ? 1 : 0;
	// const val = state.value ? `uid == $cloudEnv_uid && state >= ${state.value} && end >= ${Date.now()}` : `uid == $cloudEnv_uid`;
	// colList.value = [db.collection('web-order').where(val).getTemp(), colList.value.pop()];
	// console.log(colList.value)
	orderRef.value.refresh()
}
</script>

<style lang="scss" scoped>
.or{
	border: 1rpx solid rgba(0, 0, 0, 0.1);
	margin: 30rpx 3%;
	background-color: white;
	box-shadow: 0 5rpx 10rpx rgba(0, 0, 0, 0.05);
	font-size: $uni-font-size-base;
	&-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.1);
		padding: 15rpx;
		font-size: $uni-font-size-lg;
		&-r{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		&-active{
			color: $uni-text-color;
		}
	}
	&-time{
		padding: 0 10rpx;
		font-size: $uni-font-size-base;
		margin: 10rpx 0;
		color: $uni-text-color-grey;
	}
	&-time-flex{
		display: flex;
		justify-content: space-between;
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
.btn{
	position: fixed;
	left: 60rpx;
	bottom: 60rpx;
	padding: 20rpx;
	background-color: white;
	box-shadow: 0 0 20rpx 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	z-index: 100;
}
</style>
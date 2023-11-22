<template>
	<unicloud-db ref='orderRef' v-slot:default="{data, loading, error}" :collection="colList">
	  <template v-if="error">
	  	<view>出错了。。。</view>
	  </template>
		<template>
			<view v-if="loading">loading...</view>
			<template v-else>
				<view class="or" v-for="item in data" :key="item._id">
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
						<view class="" style="display: inline-flex; gap: 10rpx;" v-if="item.state === 1">
							<uni-tag v-for="(v, i) in item.genre" :key="i" inverted :text="v" size="mini" />
						</view>
					</view>
					<view class="or-time or-time-flex">
						<text>请在规定时间内入园，过期无效</text>
						<text v-if="item.state === 1 && Date.now() < item.end" @click="quxiaoBtn(item)">取消</text>
					</view>
				</view>
			</template>
		</template>
	</unicloud-db>
	<uni-popup ref="popupRef" type="dialog">
		<uni-popup-dialog title="等待扫码">
			<canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;" />
		</uni-popup-dialog>
	</uni-popup>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import UQRCode from '../../uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js';
const db = uniCloud.database();
const orderRef = ref();
const popupRef = ref();

const STATE = {
	0: '已取消',
	1: '待入园',
	2: '已入园',
}
const colList = ref([
	db.collection('web-order').where(`uid == $cloudEnv_uid && state == 1`).orderBy("createdAt", "asc").getTemp(),
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
// 显示二维码
const codeFn = (item: any) => {
	popupRef.value.open();
	// 获取uQRCode实例
	const qr = new UQRCode();
	// 设置二维码内容
	qr.data = `{_id: ${item._id}, state: ${item.state}, start: ${item.start}, end: ${item.end}}`;
	// 设置二维码大小，必须与canvas设置的宽高一致
	qr.size = 200;
	// 调用制作二维码方法
	qr.make();
	// 获取canvas上下文
	const canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
	// 设置uQRCode实例的canvas上下文
	qr.canvasContext = canvasContext;
	// 调用绘制方法将二维码图案绘制到canvas上
	qr.drawCanvas();
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
</style>
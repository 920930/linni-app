<template>
	<view class="">您好，开启新的一听吧</view>
	<view class="user">
		<image class="user-img" mode="widthFix" :src="store.userInfo.avatar_file.url" />
		<view class="user-info">
			<view class="user-info-item">
				<text class="user-info-item-title">编号：</text>
				<text>{{store.userInfo._id}}</text>
			</view>
			<view class="user-info-item">
				<text class="user-info-item-title">昵称：</text>
				<text>{{store.userInfo.nickname}}</text>
			</view>
			<view class="user-info-item">
				<text class="user-info-item-title">电话：</text>
				<text>{{store.userInfo.mobile}}</text>
			</view>
		</view>
	</view>
	<button class="btn" type="warn" @tap="checkBtn" v-if="store.userInfo.role.includes('member')">扫码核验</button>
	<unicloud-db ref='orderRef' v-slot:default="{data, loading, error}" loadtime="manual" collection="web-order" :getone="true" :where="`_id=='${code._id}'`">
		<template v-if="loading">loading...</template>
		<view class="info" v-if="data">
			<view class="info-item">预约编号：{{data._id}}</view>
			<view class="info-item">可入车辆：{{data.car}}</view>
			<view class="info-item">货品类型：{{data.genre}}</view>
			<view class="info-item">入园时间：
				<uni-dateformat :date="data.start" format="yyyy-MM-dd hh:mm" class="or-black" />-<uni-dateformat :date="data.end" class="or-black" format="hh:mm" />
			</view>
			<button class="btn" type="primary" @tap="updateOrder">核验入场</button>
		</view>
	</unicloud-db>
</template>

<script setup>
import {ref, reactive, computed} from 'vue';
import {onLoad, onReady} from '@dcloudio/uni-app';
import { store } from '@/uni_modules/uni-id-pages/common/store.js';
import { useCompanyStore } from '@/stores/company.js'

// current 0表示5分钟显示过期了,1正当时,2未到时间,3未入园，已过期,4完成的预约,5取消预约
const code = reactive({
	_id: '',
	current: 0,
});
const msg = [
	'二维码过期',
	'请扫码核实进入园区',
	'未到预约时间',
	'这个预约已过期',
	'这个预约已完成',
	'这个预约已被客户取消'
];
const codeMsg = computed(() => msg[code.current]);
const companyStore = useCompanyStore();
const orderRef = ref();
onLoad(() => {
	if(!store.hasLogin || !store.userInfo.role.includes('member')){
		uni.navigateBack()
	}
});

const checkBtn = () => {
	// 只允许通过相机扫码
	uni.scanCode({
		onlyFromCamera: true,
		success (res) {
			const val = res.result;
			code._id = val[0];
			code.current = val[1];
			if(code.current === 1){
				orderRef.value.loadData({clear: true})
			} else {
				orderRef.value.loadData({clear: true}, v=>{
					uni.showToast({
						title: v.car,
						icon: 'none',
						duration: 5000
					})
				})
				uni.showToast({
					title: msg[code.current],
					icon: 'none',
					duration: 3000
				})
			}
		}
	});
}

const updateOrder = () => {
	// if(code.current !== 1){
	// 	return uni.showToast({
	// 		title: '车辆不在正确时间',
	// 		icon: 'none'
	// 	})
	// }
	orderRef.value.update(code._id, { state: 2 }, {
		toastTitle: '修改成功',
		success(res) { // 更新成功后的回调
			code.showData = false;
		},
	})
}
</script>

<style scoped lang="scss">
.user{
	display: flex;
	gap: 20rpx;
	margin: 20rpx 3%;
	&-img{
		width: 160rpx;
		border-radius: 10rpx;
	}
	&-info{
		flex: 1;
		font-size: $uni-font-size-base;
		&-item{
			margin-bottom: 15rpx;
			color: $uni-text-color-placeholder;
			&-title{
				font-weight: bold;
				color: $uni-text-color;
			}
		}
	}
}
.btn{
	margin: 0 3% 30rpx;
}
.msg{
	text-align: center;
}
.info{
	margin: 30rpx 3%;
	&-item{
		display: flex;
		align-items: center;
	}
}
</style>
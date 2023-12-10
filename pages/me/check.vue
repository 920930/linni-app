<template>
	<view class="user">
		<image class="user-img" mode="widthFix" :src="store.userInfo.avatar_file.url" />
		<view class="user-info">
			<view class="user-info-num">编号：{{store.userInfo._id}}</view>
			<view class="user-info-name">昵称：{{store.userInfo.nickname}}</view>
			<view class="user-info-mobile">手机号：{{store.userInfo.mobile}}</view>
		</view>
	</view>
	<button @tap="checkBtn" v-if="store.userInfo.role.includes('supplier')">扫码核验</button>
	<unicloud-db ref='orderRef' v-slot:default="{data, loading, error}" loadtime="manual" collection="web-order" :getone="true" :where="`_id=='${_id}'`">
		<view v-if="loading">loading...</view>
		{{ data }}
		{{ error }}
	</unicloud-db>
</template>

<script setup>
import {ref} from 'vue';
import {onLoad, onReady} from '@dcloudio/uni-app';
import { store } from '@/uni_modules/uni-id-pages/common/store.js';

const _id = ref('')
const orderRef = ref();
onLoad((e)=> {
	if(!store.hasLogin || !store.userInfo.role.includes('supplier')){
		uni.navigateBack()
	}
	_id.value = e.id;
});

const checkBtn = () => {
	orderRef.value.loadData({clear: true})
	// 只允许通过相机扫码
	// uni.scanCode({
	// 	onlyFromCamera: true,
	// 	success (res) {
	// 		_id.value = res.result;
	// 		orderRef.value.loadData({clear: true})
	// 	}
	// });
}
</script>

<style scoped lang="scss">
.user{
	display: flex;
	gap: 20rpx;
	margin: 20rpx 3%;
	&-img{
		width: 200rpx;
	}
	&-info{
		flex: 1;
		font-size: $uni-font-size-base;
		&-item{
			
		}
	}
}
</style>
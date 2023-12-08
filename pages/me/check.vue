<template>
	<button @tap="checkBtn">核验</button>
	
	<unicloud-db ref='orderRef' v-slot:default="{data, loading, error}" loadtime="manual" collection="web-order" :getone="true" :where="`_id=='${_id}'`">
		<view v-if="loading">loading...</view>
		{{ data }}
		{{ error }}
	</unicloud-db>
</template>

<script setup>
import {ref} from 'vue';
import {onLoad, onReady} from '@dcloudio/uni-app';

const _id = ref('')
const orderRef = ref();
onLoad((e)=> {
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
</style>
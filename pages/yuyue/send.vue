<template>
	<!-- <uni-section title="请选择到店日期" :sub-title="`您好，${store.userInfo.nickname}`" type="line" /> -->
	<uni-calendar
		:date="insetInfo.date"
		:insert="true"
		:start-date="'2023-11-04'"
		:end-date="'2023-11-10'"
		@change="checkDate"
	/>
	<Divier />
	<uni-section title="请选择到店时间" :sub-title="`您已选择日期为：${insetInfo.date}`" type="line" />
	 <view class="list">
	 	<view class="list-item" :class="{'list-active': i == active.time}" v-for="(item, i) in companyStore.company.times" :key="i" @tap="checkTime(i)">
			<view class="list-item-time">{{item.start}} ~ {{item.end}}</view>
			<view class="list-item-num">剩余: {{ item.num }}</view>
		</view>
	</view>
	<Divier />
	<uni-section title="请选择送货类型" :sub-title="`您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`" type="line" />
	<checkbox-group @change="genreChange">
		<view class="flex">
			<label class="radio" v-for="item in companyStore.company.genre" :key="item">
				<checkbox :value="item" color="#007aff" />{{item}}
			</label>
		</view>
	</checkbox-group>
	<Divier />
	<uni-section title="请选择送货车牌" :sub-title="`您已选择时间为：${insetInfo.date} ${insetInfo.start}-${insetInfo.end}`" type="line" />
	<radio-group @change="carChange">
		<view class="flex">
			<label class="radio" v-for="(car, i) in store.userInfo.cars" :key="i">
				<radio :value="car" color="#007aff" />{{car}}
			</label>
		</view>
	</radio-group>
	<button style="margin-top: 30rpx;" @tap="sendBtn" :disabled="disabled">提交</button>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { store } from "@/uni_modules/uni-id-pages/common/store.js";
import { useCompanyStore } from "@/stores/company.js";
import Divier from "@/components/Divier.vue";
import { today } from './lib.js';

const companyStore = useCompanyStore();
const db = uniCloud.importObject('web-order');
const disabled = ref(false)

const selected = ref([
	{date: '2023-11-04', info: '可预约', data: { custom: '自定义信息', name: '自定义消息头'}},
	{date: '2023-11-05', info: '可预约', data: { custom: '自定义信息', name: '自定义消息头'}},
])
const insetInfo = reactive({
	date: today,
	start: '',
	end: '',
	genre: [],
	car: '',
})
const active = reactive({
	time: -1,
	genre: 0,
})
onMounted(() => {
	// insetInfo.date = selected.value[0].date;
	// insetInfo.car = store.userInfo.cars[0];
})
// 到店日期
const checkDate = (e) => {
	insetInfo.date = e.fulldate;
	const one = selected.value.find(res => res.date === e.fulldate)
	if(one) return;
	selected.value.push({
		date: e.fulldate,
		info: '打卡',
	})
}
// 到店时间
const checkTime = (i) => {
	const ret = companyStore.company.times.find((item, n) => n == i);
	if(!ret.num) {
		active.time = -1;
		return uni.showToast({
			title: '此时段已全部预约',
			icon: 'none',
			duration: 3000,
		})
	}
	active.time = i;
	insetInfo.start = ret.start;
	insetInfo.end = ret.end;
}
// 送货类型
const genreChange = e => insetInfo.genre = e.detail.value;
// 到店车牌
const carChange = e => insetInfo.car = e.detail.value;

const sendBtn = () => {
	if(!insetInfo.start){
		return uni.showToast({ title: "请选择到店时间", icon: "none" })
	}
	if(!insetInfo.genre.length){
		return uni.showToast({ title: "请选择送货类型", icon: "none" })
	}
	if(!insetInfo.car){
		return uni.showToast({ title: "请选择送货车牌", icon: "none" })
	}
	const start = `${insetInfo.date} ${insetInfo.start}`;
	const end = `${insetInfo.date} ${insetInfo.end}`;
	disabled.value = true;
	db.create({...insetInfo, start, end})
		.then(() => {})
		.finally(() => disabled.value = false)
}
</script>

<style scoped lang="scss">
.list{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40rpx;
	text-align: center;
	margin: 0 4%;
	font-size: $uni-font-size-base;
	&-item{
		border: 1rpx solid $uni-border-color;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		&-time{
			background-color: $uni-bg-color-hover;
			padding: 4rpx 0;
		}
		&-num{
			padding: 6rpx 0;
			color: #f0a122;
		}
	}
	&-active{
		border-color: $uni-color-primary;
	}
}
.flex{
	display: flex;
	flex-wrap: wrap;
	margin: 0 40rpx;
	gap: 20rpx;
}
</style>
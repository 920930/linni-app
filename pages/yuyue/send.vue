<template>
	<!-- <uni-section title="请选择到店日期" :sub-title="`您好，${store.userInfo.nickname}`" type="line" /> -->
	<uni-calendar
		:insert="true"
		:start-date="'2023-10-18'"
		:end-date="'2023-10-22'"
		@change="checkDate"
		:selected="selected"
	/>
	<Divier />
	<uni-section title="请选择到店时间" :sub-title="`您已选择日期为：${insetInfo.date}`" type="line" />
	 <view class="list">
	 	<view class="list-item" :class="{'list-active': i == active.time}" v-for="(item, i) in timers" :key="i" @tap="checkTime(i)">
			<view class="list-item-time">{{ item.time }}</view>
			<view class="list-item-num">剩余: {{ item.num }}</view>
		</view>
	</view>
	<Divier />
	<uni-section title="请选择送货类型" :sub-title="`您已选择时间为：${insetInfo.date} ${insetInfo.time}`" type="line" />
	<checkbox-group @change="guitiChange">
		<view class="flex">
			<label class="radio"><checkbox value="r1" checked="true" color="#007aff" />常温</label>
			<label class="radio"><checkbox value="r2" color="#007aff" />低温</label>
			<label class="radio"><checkbox value="r3" color="#007aff" />果蔬</label>
			<label class="radio"><checkbox value="r4" color="#007aff" />低温</label>
			<label class="radio"><checkbox value="r5" color="#007aff" />其他</label>
			<label class="radio"><checkbox value="r6" color="#007aff" />低温</label>
			<label class="radio"><checkbox value="r7" color="#007aff" />其他</label>
		</view>
	</checkbox-group>
	<Divier />
	<uni-section title="请选择送货车牌" :sub-title="`您已选择时间为：${insetInfo.date} ${insetInfo.time}`" type="line" />
	<radio-group @change="carChange">
		<view class="flex">
			<label class="radio" v-for="(car, i) in store.userInfo.cars" :key="i">
				<radio :value="car" :checked="i === 0" color="#007aff" />{{car}}
			</label>
		</view>
	</radio-group>
	<button style="margin-top: 30rpx;" @tap="sendBtn">提交</button>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { store } from "@/uni_modules/uni-id-pages/common/store.js";
import Divier from "@/components/Divier.vue";

const selected = ref([
	{date: '2023-10-18', info: '可预约', data: { custom: '自定义信息', name: '自定义消息头'}},
	{date: '2023-10-19', info: '可预约', data: { custom: '自定义信息', name: '自定义消息头'}},
	{date: '2023-10-20', info: '可预约', data: { custom: '自定义信息', name: '自定义消息头'}},
	{date: '2023-10-21', info: '可预约'},
])
const timers = ref([
	{time: '08:00 ~ 09:00', num: 30},
	{time: '09:00 ~ 10:00', num: 30},
	{time: '10:00 ~ 11:00', num: 30},
	{time: '11:00 ~ 12:00', num: 30},
	{time: '13:00 ~ 14:00', num: 30},
	{time: '14:00 ~ 15:00', num: 30},
	{time: '15:00 ~ 16:00', num: 30},
	{time: '16:00 ~ 17:00', num: 30},
	{time: '17:00 ~ 18:00', num: 0},
])
const insetInfo = reactive({
	date: '',
	time: '',
	guiti: '',
	car: '',
})
const active = reactive({
	time: -1,
	guiti: 0,
})
onMounted(() => {
	insetInfo.date = selected.value[0].date;
	insetInfo.car = store.userInfo.cars[0];
})
const checkDate = (e) => {
	insetInfo.date = e.fulldate;
	const one = selected.value.find(res => res.date === e.fulldate)
	if(one) return;
	selected.value.push({
		date: e.fulldate,
		info: '打卡',
	})
}

const checkTime = (i) => {
	const ret = timers.value.find((item, n) => n == i);
	if(!ret.num) {
		active.time = -1;
		return uni.showToast({
			title: '此时段已全部预约',
			icon: 'none',
			duration: 3000,
		})
	}
	active.time = i;
	insetInfo.time = ret.time;
}
const carChange = e => insetInfo.car = e.detail.value;

const sendBtn = () => {
	console.log(insetInfo)
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
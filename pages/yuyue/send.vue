<template>
	<!-- <uni-section title="请选择到店日期" :sub-title="`您好，${store.userInfo.nickname}`" type="line" /> -->
	<wu-calendar
		:insert="true"
		:lunar="true"
		:use-today="false"
		:startDate="active.startDate"
		:endDate="active.endDate"
		:selected="selected"
		@change="calendarChange"
	/>
	<Divier />
	<uni-section title="请选择到店时间" :sub-title="`您已选择日期为：${insetInfo.date}`" type="line" />
	<view class="list" v-if="insetInfo.date">
	 	<view class="list-item"
			:class="{'list-active': i == active.time}"
			v-for="(item, i) in selectedTimes"
			:key="item.startMins"
			@tap="checkTime(i)"
		>
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
import { reactive, ref } from 'vue';
import { onLoad, onShow } from "@dcloudio/uni-app"
import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js';
import { useCompanyStore } from "@/stores/company.js";
import Divier from "@/components/Divier.vue";

const companyStore = useCompanyStore();
const db = uniCloud.importObject('web-order');
const disabled = ref(false)

const selected = ref([]);
const selectedTimes = ref([])
const insetInfo = reactive({
	date: '',
	start: '',
	end: '',
	genre: [],
	car: '',
})
const active = reactive({
	time: -1,
	genre: 0,
	startDate: '',
	endDate: ''
})
onLoad(async () => {
	if(!store.hasLogin){
		uni.redirectTo({
			url: '/uni_modules/uni-id-pages/pages/login/login-withpwd',
		})
	}
	// 改用市场wu-ui的日历插件 https://ext.dcloud.net.cn/plugin?id=14157
	try{
		// 判断预约有效时间内是否有放假，或已经预约的日期
		const ret = await db.notices();
		selected.value = ret.data;
		active.startDate = selected.value[0].date;
		active.endDate = selected.value[selected.value.length-1].date;
		
	}catch(err){
		if(err.errCode === "uni-id-token-expired") mutations.logout();
	}
})
// 到店日期
const calendarChange = (e) => {
	insetInfo.date = e.fulldate;
	const one = selected.value.find(item => item.date == e.fulldate);
	one && (selectedTimes.value = one.times)
}
// 到店时间
const checkTime = (i) => {
	const ret = selectedTimes.value.find((item, index) => index == i);
	if(ret.num <= 0) {
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
		return uni.showToast({ title: "请选择到店日期", icon: "none" })
	}
	const one = selected.value.find(item => item.data == insetInfo.date);
	if(one){
		return uni.showToast({ title: `${insetInfo.date}不可选`, icon: "none" })
	}
	if(!insetInfo.genre.length){
		return uni.showToast({ title: "请选择送货类型", icon: "none" })
	}
	if(!insetInfo.car){
		return uni.showToast({ title: "请选择送货车牌", icon: "none" })
	}
	// 日期和时间结合，如：2023-11-20 09
	const start = `${insetInfo.date} ${insetInfo.start}`;
	const end = `${insetInfo.date} ${insetInfo.end}`;
	disabled.value = true;
	db.create({...insetInfo, start, end})
		.then(() => {
			uni.navigateTo({
				url: '/pages/me/order'
			})
		})
		.catch(err => {
			if(err.errCode === "uni-id-token-expired") mutations.logout();
		})
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
<template>
	<unicloud-db
		v-slot:default="{data, loading, error}"
		collection="web-order"
		loadtime='onready'
		:where="`_id == '${id}' && uid == $cloudEnv_uid`"
		:getone="true"
	>
		<view v-if="loading">loading...</view>
		<template v-else>
			<view v-if="error">出错了。。。</view>
			<template v-else>
				<view class="item">
					<view class="item-title">订单详情</view>
					<view class="item-main">
						<view>
							<text class="item-main-black">订单编号：</text><text>{{data._id}}</text>
						</view>
						<view>
							<text class="item-main-black">公司名称：</text><text>{{store.userInfo.nickname}}</text>
						</view>
						<view>
							<text class="item-main-black">联系电话：</text><text>{{store.userInfo.mobile}}</text>
						</view>
					</view>
				</view>
				<view class="bg" />
				<view class="item">
					<view class="item-title">预约信息</view>
					<view class="item-main">
						<view>
							<text class="item-main-black">入园时段：</text>
							<uni-dateformat :date="data.start" format="yyyy-MM-dd hh:mm" class="or-black" />-<uni-dateformat :date="data.end" class="or-black" format="hh:mm" />
						</view>
						<view>
							<text class="item-main-black">车辆信息：</text><text>{{data.car}}</text>
						</view>
						<view>
							<text class="item-main-black">货品类型：</text>
							<text v-for="item in data.genre" :key="item">{{item}} </text>
						</view>
					</view>
				</view>
				<view class="bg" />
				<view style="padding: 20rpx;">
					<view class="item-title">凭证核销入园</view>
					<template v-if="data.state === 1">
						<view class="code" v-if="data.start < Date.now() && data.end > Date.now()">
							<uv-qrcode ref="qrcode" :options="codeopt" value="https://h5.uvui.cn" />
							<view class="code-info">
								<uni-dateformat :date="data.start" format="yyyy-MM-dd" style="margin-right: 8rpx;" />
								<uni-dateformat :date="data.start" class="code-info-color" format="hh:mm" />-<uni-dateformat :date="data.end" class="code-info-color" format="hh:mm" />
							</view>
							<text class="code-text">请向管理员出示核销码</text>
						</view>
						<view class="code" v-else-if="data.end < Date.now()">
							<text class="code-text">已过期，请重新预约</text>
						</view>
						<view class="code" v-else>
							<text class="code-text">未到核销时间</text>
						</view>
					</template>
					<template v-if="data.state === 0">
						<view class="code">
							<text class="code-text">您已取消本次预约</text>
						</view>
					</template>
					<template v-if="data.state === 2">
						<view class="code">
							<text class="code-text">您已完成本次预约</text>
						</view>
					</template>
				</view>
			</template>
		</template>
	</unicloud-db>
</template>

<script setup>
import { onReady } from '@dcloudio/uni-app';
import { computed, reactive, ref } from 'vue';
import {store} from '@/uni_modules/uni-id-pages/common/store.js';

const id = ref('');
const qrcode = ref();
const avatar = computed(() => store.userInfo.avatar_file.url || 'https://www.uvui.cn/common/logo.png')
const codeopt = reactive({
	size: 200,
	foregroundImageSrc: avatar,
	foregroundImageBorderRadius: 10,
})
onReady(e => id.value = e.id);
</script>

<style lang="scss" scoped>
.bg{
	background-color: rgba(0, 0, 0, 0.05);
	height: 20rpx;
}
.item{
	padding: 20rpx;
	border-radius: 6rpx;
	&-title{
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10rpx;
		padding-left: 16rpx;
		position: relative;
		font-size: $uni-font-size-base;
		&:before{
			content: '';
			position: absolute;
			left: 0;
			top: 17%;
			width: 6rpx;
			height: 50%;
			background-color: #0cc0b0;
			display: inline-block;
			border-radius: 5rpx;
		}
	}
	&-main{
		background-color: white;
		padding-top: 20rpx;
		font-size: $uni-font-size-sm;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		color: $uni-text-color-grey;
		&-black{
			color: $uni-text-color;
		}
	}
}
.code{
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 30rpx;
	&-info{
		background-color: rgba(0, 0, 0, 0.1);
		margin: 20rpx 0;
		padding: 4rpx 20rpx;
		border-radius: 50rpx;
		font-size: $uni-font-size-base;
		&-color{
			color: $uni-color-primary;
		}
	}
	&-text{
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
}
</style>
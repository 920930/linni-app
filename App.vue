<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			await uniIdPageInit()
			// await uniIdCo.registerAdmin({
			// 	username: '18081990075',
			// 	password: 'AI920930',
			// 	nickname: 'zhang'
			// })
		},
		onShow: function() {
			console.log('App Show123')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/static/iconfont.css";
</style>

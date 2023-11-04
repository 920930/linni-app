<script setup>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	import { onLaunch } from '@dcloudio/uni-app';
	import { useCompanyStore } from '@/stores/company.js';
	const useCompany = useCompanyStore();
	
	onLaunch(async () => {
		await uniIdPageInit();
		await useCompany.getCompany();
	})
</script>

<style>
	/*每个页面公共css */
	@import "@/static/iconfont.css";
</style>

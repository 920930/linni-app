import { reactive } from 'vue';
import db from uniCloud.importObject('website')

export const useCompanyStore = defineStore('company', () => {
	const company = reactive({
		title: '',
		mobile: '',
	})
	
	const getCompanyInfo = async () => {
		const data = await db.getSite();
		console.log(data)
	}
	
	return { company };
});

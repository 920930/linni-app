import { reactive } from 'vue';
import { defineStore } from 'pinia';
const db = uniCloud.importObject('website');

export const useCompanyStore = defineStore('company', () => {
	const company = reactive({
		title: "",
		ftitle: "",
		day: 0,
		doors: [],
		genre: [],
		mobile: "",
		times: [],
		_id: "",
	})
	
	const getCompany = async () => {
		try{
			uni.showLoading({
				title: "加载中..."
			})
			const { data } = await db.show();
			company._id = data._id;
			company.title = data.title;
			company.ftitle = data.ftitle;
			company.doors = data.doors;
			company.genre = data.genre;
			company.mobile = data.mobile;
			company.times = data.times;
			company.day = data.day;
		}catch(e){
			console.log(123)
		}finally{
			uni.hideLoading()
		}
	}
	
	return { company, getCompany };
});

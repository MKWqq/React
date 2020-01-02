/* 请求拦截器 */
import axios from 'axios'

// axios.defaults.baseURL='/api';
axios.defaults.headers.post['Content-Type']='application/json';

axios.interceptors.request.use((config)=>{
	return config;
},(error)=>{
	return Promise.reject(error);
});

axios.interceptors.response.use((response)=>{
	return response.data;
},(errorRes)=>{
	let error=new Error();
	if(errorRes&&errorRes.response){
		error.message=`请求错误，${errorRes.response.status}`;
		error.code=errorRes.response.status;
		error.data=null;
		return Promise.reject(error);
	}else{
		error.message='未知错误，请联系管理员';
		error.code='未知错误';
		error.data=null;
		return Promise.reject(error);
	}
});

export default axios
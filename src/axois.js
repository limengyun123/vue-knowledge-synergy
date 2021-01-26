import axios from 'axios'
import store from './store'
import router from './router'

axios.interceptors.request.use(config=>{
    console.log("请求拦截");
    return config;
})

axios.interceptors.response.use(response=>{
    const res = response.data;
    console.log("响应拦截");
    if(res.code === 200) return response;
    else{
        console.log(response.data.msg);
        return Promise.reject(response.data.msg);
    }
},
error=>{
    console.log('error', error);
    if(error.response.data) error.message = error.response.data.msg;
    switch(error.response.status){
        case 401:
            store.commit('REMOVE_INFO');
            router.push({path: /user/loginIn});
            error.message = "请重新登录";
            break;
        case 403:
            error.message = "权限不足，无法访问";
            break;
    }
    return Promise.reject(error);
    
})
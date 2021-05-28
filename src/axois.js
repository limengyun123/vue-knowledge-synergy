import axios from 'axios';
import store from './store';
import router from './router';
axios.defaults.baseURL='/api'; //for web test
// axios.defaults.baseURL='http://localhost:8080';  //for local test


axios.interceptors.request.use(config=>{
    config.headers['content-type'] = 'application/json';
    let token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = token;
    }
    console.log(config);
    return config;
});

axios.interceptors.response.use(response=>{
    console.log(response);
    let result = response.data;
    // if(result.code === 200) return Promise.resolve(result);
    if(result.code[0] === '0') return Promise.resolve(result);
    else return Promise.reject(result.msg);
},
error=>{
    if (error && error.response && error.response.status) {
        switch(error.response.code){
            case 401:
                store.commit('REMOVE_INFO');
                router.push({path: '/user/login'});
                error.message = "请重新登录";
                break;
            case 403:
                router.push({path: '/error'});
                error.message = "权限不足，无法访问";
                break;
        }
    }
    return Promise.reject(error);
});
import axios from 'axios';

export const changePswdApi = param=>{
    return axios.post('/user/forgetPassword',param);
}

export const changeInfoApi = param=>{
    return axios.post('/user/update',param);
}

// export const changeInfoApi = oldInfo=>{
//     return axios.post('http://localhost:8080/profile/info',oldInfo);
// }

export const getNotificationsApi = param=>{
    return axios.post('http://localhost:8080/profile/getNotifications',param);
}

export const readNotificationApi = param =>{
    return Promise.resolve(1);
}

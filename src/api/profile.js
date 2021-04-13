import axios from 'axios';

export const changePswdApi = oldPswd=>{
    return axios.post('http://localhost:8080/profile/pswd',oldPswd);
}

export const changeInfoApi = oldInfo=>{
    return axios.post('http://localhost:8080/profile/info',oldInfo);
}

export const getNotificationsApi = param=>{
    return axios.post('http://localhost:8080/profile/getNotifications',param);
}


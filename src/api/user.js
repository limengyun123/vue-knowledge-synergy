import axios from 'axios';

export const loginApi = query => {
    return axios.post('/user/login',query);
};

export const logoutApi = query => {
    return axios.post('/user/logout',query);
};

export const registerApi = query => {
    return axios.post('/user/register',query);
};

export const sendEmailCodeApi = (query)=>{
    return axios.post('/user/verify',query);
};

export const forgetPasswordApi = query => {
    return axios.post('/user/changePassword',query);
}

// export const loginApi = query => {
//     return axios.post('/api/user/login',query);
// };

// export const logoutApi = query => {
//     return axios.post('/api/user/logout',query);
// };

// export const registerApi = query => {
//     return axios.post('/api/user/register',query);
// };

// export const sendEmailCodeApi = (query)=>{
//     return axios.post('/api/user/verify',query);
// };

// export const forgetPasswordApi = query => {
//     return axios.post('/api/user/changePassword',query);
// }



import axios from 'axios';

export const loginApi = query => {
    let result = axios.post('http://localhost:8080/user/login',query);
    return result;
};

export const registerApi = query => {
    let result = axios.post('http://localhost:8080/user/register',query);
    return result;
};

export const sendEmailCodeApi = ()=>{
    return Promise.resolve({msg: '验证码发送成功，请注意查收'});
};

export const forgetPasswordApi = query => {
    let result = axios.post('http://localhost:8080/user/forgetPassword',query);
    return result;
}

// export const loginInApi = query => {
//     let result = axios.post('/user/login',query);
//     return result;
// };


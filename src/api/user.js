import axios from 'axios';

export const loginApi = query => {
    let result = axios.post('http://localhost:8080/user/login',query);
    return result;
};

export const registerApi = query => {
    let result = axios.post('http://localhost:8080/user/register',query);
    return result;
};

export const forgetPasswordApi = query => {
    let result = axios.post('http://localhost:8080/user/forget',query);
    return result;
}
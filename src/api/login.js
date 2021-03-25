import axios from 'axios';

export const loginInApi = query => {
    let result = axios.post('http://localhost:8080/login/loginIn',query);
    return result;
};

export const registerApi = query => {
    let result = axios.post('http://localhost:8080/login/register',query);
    return result;
};

export const forgetPasswordApi = query => {
    let result = axios.post('http://localhost:8080/login/forgetPassword',query);
    return result;
}
import axios from 'axios';

export const getToDoOverviewApi=()=>{
    return axios.post('individual/getToDoOverview');
};

export const getToDoListApi=(time)=>{
    return axios.post('individual/getToDoList',time);
};
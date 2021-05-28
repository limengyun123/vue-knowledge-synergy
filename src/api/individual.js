import axios from 'axios';

export const getToDoOverviewApi=()=>{
    return axios.post('individual/getToDoOverview');
};

export const getToDoListApi=(time)=>{
    return axios.post('individual/getToDoList',time);
};

export const addTodoApi = (param)=>{
    return Promise.resolve(1);
};

export const finishToDoApi = (param)=>{
    return Promise.resolve(1);
};

export const getShorthandsApi = (pageInfo)=>{
    return axios.post('individual/getShorthands',pageInfo);
}

export const saveShorthandApi = (param)=>{
    return axios.post('individual/saveShorthand', param);
}

export const getAShorthandApi = (param) =>{
    return axios.post('individual/getAshorthand', param);
}

export const editShorthandApi = (param)=>{
    return axios.post('individual/editShorthand',param);
}

export const getContributionsApi = (param)=>{
    return axios.post('individual/getContributions',param);
}
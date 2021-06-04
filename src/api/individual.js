import axios from 'axios';

export const getToDoOverviewApi=()=>{
    return axios.get('individual/getTodoOverview');
};

export const getToDoListApi=(time)=>{
    return axios.post('individual/getTodoList',time);
};

export const addToDoApi = (param)=>{
    return axios.post('individual/addTodo',param);
};

export const deleteToDoApi = (eventId)=>{
    return axios.post('individual/deleteTodo',eventId);
};

export const getShorthandsApi = (pageInfo)=>{
    return axios.post('individual/getShorthands',pageInfo);
}

export const saveShorthandApi = (param)=>{
    return axios.post('individual/addShorthand', param);
}

export const deleteShorthandApi = (param)=>{
    return axios.post('individual/deleteShorthand', param);
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

export const getTaskByUrgentApi = (param)=>{
    return axios.post('individual/getTaskByUrgent',param);
}

export const getTaskByTimeApi = (param)=>{
    return axios.post('individual/getTaskByTime',param);
}
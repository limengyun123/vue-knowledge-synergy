import axios from 'axios';
import store from '../store/index';

export const getResourcesApi = (param)=>{
    return axios.post('/project/getResources',param);    
}

export const uploadResourcesApi = (param)=>{
    return axios.post('/project/uploadResources',param);
};


export const getTeammatesApi = (tId)=>{
    return axios.post('/team/getTeammates',tId);
};

export const getTasksOverviewApi = param=>{
    return axios.post('/project/getTasksOverview',param);
};

export const getTasksDetailApi = param=>{
    return axios.post('/project/getTasksDetail',param);
};

export const getMyTasksApi = (param)=>{
    return axios.post('/project/getMyTasks',param);
};

export const deleteMyTaskApi = (param)=>{
    return axios.post('/project/deleteMyTask',param);
};

export const assignTaskApi = (taskInfo)=>{
    return axios.post('/project/assignTask', taskInfo);
};

export const finishTaskApi = (param)=>{
    return axios.post('/project/finishTask', param);
};

export const getDynamicsApi = (param) =>{
    return axios.post('/project/getDynamics', param);
};

export const editProjectApi = (pInfo)=>{
    return axios.post('/project/editProject', pInfo);
};

export const deleteProjectApi = (pId)=>{
    return axios.post('/project/deleteProject', pId);
};

export const getResourceDetailApi = param =>{
    return axios.post('/project/getResourceDetail', param);
};

export const sendCommentApi = param=>{
    return Promise.resolve(1);
};

export const deleteCommentApi = param=>{
    return Promise.resolve(1);
};

export const sendReplyApi = param =>{
    return Promise.resolve(1);
};

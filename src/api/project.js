import axios from 'axios';

export const getResourcesApi = (param)=>{
    return axios.post('/project/getResources',param);    
}

export const uploadResourcesApi = (param)=>{
    return axios({
            url: '/project/uploadResources',
            method: 'post',
            data: param,
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
};


export const getTeammatesApi = (tId)=>{
    return axios.post('/team/getTeammates',tId);
};

export const getTasksOverviewApi = param=>{
    return axios.post('/project/getTasksOverview',param);
};

export const getIndividualTasksDetailApi = param=>{
    return axios.post('/project/getIndividualTasksDetail',param);
};

export const getTeamTasksDetailApi = param=>{
    return axios.post('/project/getTeamTasksDetail',param);
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
    return axios.post('/project/sendComment', param);
};

export const deleteCommentApi = param=>{
    return axios.post('/project/deleteComment', param);
};

export const sendReplyApi = param =>{
    return axios.post('/project/sendReply', param);
};

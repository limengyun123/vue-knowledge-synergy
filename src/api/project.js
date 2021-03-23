import axios from 'axios';
import store from '../store/index'

export const getResourcesApi = (param)=>{
    return axios.post('/project/getResources',param);

    // console.log(JSON.parse(param.pId),store.state.projectInfo.pId);
    // if(param.pId!=store.state.projectInfo.pId ){
    //     let result = axios.post('/project/getResources',param);
    //     console.log(result.data);
    //     result.then((re)=>{console.log(re)});
    //     result.then((result)=>{
    //         store.commit('SET_PID', result.data.pId);
    //         store.commit('SET_RESOURCES', result.data.resources);
    //     }).catch((reason)=>{ }); 
    // }
    // console.log(store);
    // console.log(store.state.userInfo);
    // let cp = param.currentPage, ps = param.pageSize;

    // return new Promise((resolve,reject)=>{ 
    //     resolve(store.state.projectInfo.resources.slice((cp-1)*ps, cp*ps));
    // });
    
}

export const getTasksApi = (param)=>{
    return axios.post('/project/getTasks',param);
}

export const getTeammatesApi = (tId)=>{
    return axios.post('/team/getTeammates',tId);
}

export const assignTaskApi = (taskInfo)=>{
    return axios.post('/project/assignTask', taskInfo);
}

export const editProjectApi = (pInfo)=>{
    return axios.post('/project/editProject', pInfo);
}

export const deleteProjectApi = (pId)=>{
    return axios.post('/project/deleteProject', pId);
}


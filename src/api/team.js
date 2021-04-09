import axios from 'axios';

export const getTeamsApi = (userName)=>{
    return axios.post('team/getTeams', userName);
}

export const getTeamInfoApi = (teamId)=>{
    return axios.post('team/getTeamInfo', teamId);
}

export const createTeamApi = (teamInfo)=>{
    return axios.post('team/createTeam', teamInfo);
}

export const joinTeamApi = (param)=>{
    return Promise.resolve(1);
}

export const getContactsApi = (userName)=>{
    return axios.post('/team/getContacts', userName);
}

export const searchUserApi = (userName)=>{
    return axios.post('/team/searchUser', userName);
}
export const addTeammatesApi = (mates)=>{
    return axios.post('/team/addTeammates', mates);
}


export const createProjectApi = (projectInfo)=>{
    return axios.post('team/createProject', projectInfo);
}
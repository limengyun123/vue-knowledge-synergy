import axios from 'axios';

export const getTeamsApi = ()=>{
    return axios.get('team/getTeams');
}

export const getTeamInfoApi = (teamId)=>{
    return axios.post('team/getTeamInfo', teamId);
}

export const createTeamApi = (teamInfo)=>{
    return axios.post('team/createTeam', teamInfo);
}

export const searchTeamsApi = (param)=>{
    return axios.post('team/searchTeams', param);
}

export const joinTeamApi = (param)=>{
    return axios.post('team/joinTeam', param);
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

export const getTeammateInfoApi = param =>{
    return Promise.resolve(1);
}
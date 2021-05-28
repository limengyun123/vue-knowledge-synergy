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
    // return axios.post('/team/addTeammates', mates);
    return axios.post('/team/addMember', mates);
}

export const createProjectApi = (projectInfo)=>{
    return axios.post('team/createProject', projectInfo);
}

export const getAuthorityApi = (teamId) =>{
    return axios.post('team/getAuthority', teamId);
}

export const editAuthorityApi = (param) =>{
    return axios.post('team/editAuthority', param);
}

export const editTeamApi = (param) =>{
    return axios.post('team/editTeam', param);
}

export const transferTeamApi = (param) =>{
    return axios.post('team/transfer', param);
}

export const quitTeamApi = (teamId) =>{
    return axios.post('team/quit', teamId);
}
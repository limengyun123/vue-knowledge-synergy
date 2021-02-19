import axios from 'axios';

export const getTeamsApi = (userName)=>{
    return axios.post('team/getTeams', userName);
}

export const getProjectsApi = (teamId)=>{
    return axios.post('team/getProjects', teamId);
}

export const createTeamApi = (teamInfo)=>{
    return axios.post('team/createTeam', teamInfo);
}

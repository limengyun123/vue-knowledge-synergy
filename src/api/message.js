import axios from 'axios';

export const getPrivateChatApi = (uId)=>{
    return axios.post('message/getPrivateChat',uId);
}

export const getTeamChatApi = (uId)=>{
    return axios.post('message/getTeamChat',uId);
}

export const getMessageRecordByIdApi = (param)=>{
    return axios.post('message/getMessageRecordById',param);
}

export const sendMessageApi = (param)=>{
    return axios.post('message/sendMessage',param);
}
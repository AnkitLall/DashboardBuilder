import axios from 'axios';

export const login = (userInfo) => {
    return axios.post('/api/users/login',userInfo);
}

export const register = (userInfo) => {
    return axios.post('/api/users/register',userInfo);
}

export const getProjectsList = (type,currentUser) => {
    return axios.post(`/api/projects/${type}`,{email: currentUser.email});
}

export const createNew = (info,type) => {
    return axios.post(`/api/${type}/create`,info);
}

export const getFilesList = (projectName) => {
    return axios.post('/api/files/allFiles',{projectName: projectName});
}

export const deleteExisting = (names,type) => {
    return axios.post(`/api/${type}/delete`,{names: names});
}

export const updateFileConfig = (newConfig) => {
    return axios.post('/api/files/updateConfig',{newConfig});
}
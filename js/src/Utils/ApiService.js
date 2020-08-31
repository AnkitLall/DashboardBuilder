import axios from 'axios';

export const login = (userInfo) => {
    return axios.post('/api/users/login',userInfo)
}

export const register = (userInfo) => {
    return axios.post('/api/users/register',userInfo)
}
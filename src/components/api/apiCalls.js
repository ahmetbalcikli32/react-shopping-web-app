import axios from "axios";

export const signup = body => {
    return axios.post('/api/users', body)
};

export const login = body => {
    return axios.post('/api/auth',
     {auth: body},
        {auth:body})
}
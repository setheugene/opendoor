import axios from 'axios';
import $ from 'jquery';

const API = {
    insertPost:(postToInsert) => {
        return axios.post('/api/all/posts', postToInsert)
    },
    getPosts:(posts)=> {
        return axios.get('/api/all/posts', posts)
    },
    addTenant:(newTenant) => {
        return axios.post('/api/addtenant', newTenant)
    },
    getTenants: (tenantList) => {
        return axios.get('/api/addtenants', tenantList)
    },
    sendCredentials: (token) => {
        return axios({
            method: "POST",
            url: "/login",
            data: { 'token': token }
        }).then((res) => {
            console.log(res);
        })
    }
};

export default API;
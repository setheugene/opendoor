import axios from 'axios';
import $ from 'jquery';

const API = {
    insertPost:(postToInsert) => {
        return axios.post('http://localhost:3001/api/all/posts', postToInsert)
    },
    getPosts:(posts)=> {
        return axios.get('http://localhost:3001/api/all/posts', posts)
    },
    addTenant:(newTenant) => {
        return axios.post('/api/addtenant', newTenant)
    },
    getTenants: (tenantList) => {
        return axios.get('/api/addtenants', tenantList)
    },
    sendCredentials: (token) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/login",
            data: { 'token': token }
        })
    }
};

export default API;
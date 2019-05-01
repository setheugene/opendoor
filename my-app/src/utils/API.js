import axios from 'axios';

const API = {
    insertPost:(postToInsert) => {
        return axios.post('/api/all/posts', postToInsert)
    },
    getPosts:(posts)=> {
        return axios.get('/api/all/posts', posts)
    },
    addTenant:(newTenant) => {
        return axios.post('/addtenant', newTenant)
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
    },
    getCredentials: (username) => {
        return axios({
            method: "GET",
            url: "/login/" + username,
            data: { 'username': username }
        })
    }
};

export default API;
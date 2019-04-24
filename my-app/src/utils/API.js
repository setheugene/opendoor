import axios from 'axios';

const API = {
    insertPost:(postToInsert) => {
        return axios.post('/api/posts', postToInsert)
    },
    getPosts:(posts)=> {
        return axios.get('/api/posts', posts)
    },
    addTenant:(newTenant) => {
        return axios.post('/api/addtenant', newTenant)
    },
    getTenants: (tenantList) => {
        return axios.get('/api/addtenants', tenantList)
    }
};

export default API;
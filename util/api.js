const axios = require("axios");

let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const api = axios.create();

api.defaults.headers = headers;
api.interceptors.request.use(
    (config) => {
        return config;
    }
);
api.interceptors.response.use(
    (response) => {
        return response.status === 200 ? response.data : response;
    },
    async (error) => {
        return Promise.reject(error)
    }
)

module.exports = api;

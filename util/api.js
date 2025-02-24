const axios = require("axios");
const {printError} = require("./config");
const {normalizeURL} = require("./url");

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const api = axios.create();

function setBaseURL(url) {
    if (!url) {
        throw new Error("URL_API no está definida en el archivo de configuración");
    }
    api.defaults.baseURL = normalizeURL(url);
}

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
    (error) => {
        if(error?.response?.data){
            console.error(error?.response?.data);
        }else{
            console.error("Error al conectar con "+error.config.baseURL+" revisa el archivo de configuración");
        }
        return Promise.reject(error)
    }
)

module.exports = {
    ...api,
    setBaseURL
};

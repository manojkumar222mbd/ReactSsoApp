import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.apiUrl,
});

instance.interceptors.request.use(function (config) {
    let AuthData = localStorage.getItem('AuthData');
    if (AuthData && typeof AuthData === 'string') {
        try {
            AuthData = JSON.parse(AuthData);
            config.headers.Authorization = `Bearer ${AuthData.accessToken}`;
        } catch (e) {
            return Promise.reject(e);
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // const { config, response: { status } } = error
    // //const originalRequest = config
    // if (status === 498 && localStorage.getItem('AuthData')) {
    //     try {
    //         //let AuthData = localStorage.getItem('AuthData');
    //         //AuthData = JSON.parse(AuthData);


    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }

    return Promise.reject(error);
});

export default instance;
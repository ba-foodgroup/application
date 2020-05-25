import { BASE_API_PATH } from './constants';
import { setItem } from './deviceStorage';
import axios from 'axios';

export const instance = axios.create({
    baseURL: BASE_API_PATH,
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});

instance.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            if (response.headers.auth) {
                instance.defaults.headers.auth = response.headers.token;
            }
        }
        return response;
    },
    (error) => {
        console.error(error);
        return error;
    }
);
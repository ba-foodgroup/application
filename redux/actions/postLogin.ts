import {
    loginPending,
    loginComplete,
    loginError,
    LoginCredentials
} from './authAction';
import { Dispatch } from 'redux';
import { setItem } from '../../utils/deviceStorage';
import { instance } from '../../utils/apiInstance';

const postLogin = (creds: LoginCredentials) => {
    return (dispatch: Dispatch) => {
        // Not sure credentials are needed as a payload here
        dispatch(loginPending(creds));
        instance
            .post(
                'auth/login',
                {
                    username: creds.username,
                    password: creds.password
                },
                {
                    responseType: 'text'
                }
            )
            .then((response) => {
                if (response.status == 401) {
                    dispatch(loginError('Invalid username and/or password.'));
                } else if (response.status == 400) {
                    dispatch(loginError('Invalid Request'));
                } else if (response.status == 200) {
                    dispatch(loginComplete());
                }
                setItem('auth', response.data);
                instance.defaults.headers.auth = response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export default postLogin;

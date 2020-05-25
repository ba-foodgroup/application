import {
    registerPending,
    registerComplete,
    registerError,
    RegisterCredentials
} from './authAction';
import { Dispatch } from 'redux';
import { instance } from '../../utils/apiInstance';
import { setItem } from '../../utils/deviceStorage';

const postRegister = (creds: RegisterCredentials) => {
    return (dispatch: Dispatch) => {
        dispatch(registerPending(creds));
        instance
            .post(
                'auth/register',
                {
                    username: creds.username,
                    password: creds.password,
                    email: creds.email
                },
                { responseType: 'text' }
            )
            .then((response) => {
                // vi må få med feilmeldinger osv (payload til errors)
                if (response.status == 200) {
                    dispatch(registerComplete());
                } else if (response.status == 400) {
                    dispatch(registerError('Validation error'));
                } else if (response.status == 401) {
                    dispatch(
                        registerError('Username and/or e-mail already taken!')
                    );
                }

                instance.defaults.headers.auth = response.data;
                setItem('auth', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export default postRegister;

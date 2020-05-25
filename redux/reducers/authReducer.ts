import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

import {
    AuthActionTypes,
    LOGIN_ACTION_PENDING,
    LOGIN_ACTION_COMPLETE,
    LOGIN_ACTION_ERROR,
    LOGOUT_ACTION,
    REGISTER_ACTION_PENDING,
    REGISTER_ACTION_COMPLETE,
    REGISTER_ACTION_ERROR,
    LOGIN_ACTION_REDIRECTED,
} from '../actions/authAction';

// Initial state
export interface AuthState {
    pending: boolean,
    username: string | null,
    error: string | null,
    loggingIn: boolean
}

const initialState: AuthState = {
    pending: false,
    username: null,
    error: null,
    loggingIn: false
};

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: ['loggingIn']
};

const preAuthReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOGIN_ACTION_PENDING:
            console.log(`AuthReducer(loginAction): ${JSON.stringify(action.payload)}`);
            return {
                username: action.payload.username,
                pending: true,
                error: null,
                loggingIn: true
            }
        case LOGIN_ACTION_COMPLETE:
            return {
                username: state.username,
                pending: false,
                error: null,
                loggingIn: true
            };
        case LOGIN_ACTION_REDIRECTED:
            return {
                username: state.username,
                pending: false,
                error: null,
                loggingIn: false
            };
        case LOGIN_ACTION_ERROR:
            return {
                username: '',
                pending: false,
                error: action.payload,
                loggingIn: true
            };
        case REGISTER_ACTION_PENDING:
            return {
                username: action.payload.username,
                pending: true,
                error: null,
                loggingIn: true
            };
        case REGISTER_ACTION_COMPLETE:
            return {
                username: state.username,
                pending: false,
                error: null,
                loggingIn: true
            };
        case REGISTER_ACTION_ERROR:
            return {
                username: state.username,
                pending: false,
                error: action.payload,
                loggingIn: false
            };
        case LOGOUT_ACTION:
            return {
                username: null,
                pending: false,
                error: null,
                loggingIn: false
            }
        default:
            return state;
    }
};

export const authReducer = persistReducer(persistConfig, preAuthReducer);
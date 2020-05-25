export const LOGIN_ACTION_PENDING = 'LOGIN_ACTION_PENDING';
export const LOGIN_ACTION_COMPLETE = 'LOGIN_ACTION_COMPLETE';
export const LOGIN_ACTION_ERROR = 'LOGIN_ACTION_ERROR';

export const LOGIN_ACTION_REDIRECTED = 'LOGIN_ACTION_REDIRECTED';

export const REGISTER_ACTION_PENDING = 'REGISTER_ACTION_PENDING';
export const REGISTER_ACTION_COMPLETE = 'REGISTER_ACTION_COMPLETE';
export const REGISTER_ACTION_ERROR = 'REGISTER_ACTION_ERROR';

export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export interface LoginCredentials {
    username: string,
    password: string
}

export interface RegisterCredentials {
    username: string,
    password: string,
    email: string
}

export interface LoginActionPending {
    type: typeof LOGIN_ACTION_PENDING
    payload: LoginCredentials
}

export interface LoginActionComplete {
    type: typeof LOGIN_ACTION_COMPLETE
}

export interface LoginActionRedirected {
    type: typeof LOGIN_ACTION_REDIRECTED
}

export interface LoginActionError {
    type: typeof LOGIN_ACTION_ERROR
    payload: string
}

export interface RegisterActionPending {
    type: typeof REGISTER_ACTION_PENDING
    payload: RegisterCredentials
}

export interface RegisterActionComplete {
    type: typeof REGISTER_ACTION_COMPLETE
}

export interface RegisterActionError {
    type: typeof REGISTER_ACTION_ERROR
    payload: string
}

export interface LogoutAction {
    type: typeof LOGOUT_ACTION
}

export type AuthActionTypes = LoginActionPending | LoginActionComplete | LoginActionError | LoginActionRedirected | RegisterActionPending | RegisterActionComplete | RegisterActionError | LogoutAction;

export const loginPending = (payload: LoginCredentials) => {
    return { type: LOGIN_ACTION_PENDING, payload };
};

export const loginComplete = () => {
    return { type: LOGIN_ACTION_COMPLETE };
}

export const loginError = (payload: string) => {
    return { type: LOGIN_ACTION_ERROR, payload };
}

export const loginRedirected = () => {
    return { type: LOGIN_ACTION_REDIRECTED };
}

export const registerPending = (payload: RegisterCredentials) => {
    return { type: REGISTER_ACTION_PENDING, payload };
}

export const registerComplete = () => {
    return { type: REGISTER_ACTION_COMPLETE };
}

export const registerError = (payload: string) => {
    return { type: REGISTER_ACTION_ERROR, payload };
}

export const logout = () => {
    return { type: LOGOUT_ACTION };
}

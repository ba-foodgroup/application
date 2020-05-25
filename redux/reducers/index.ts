import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { forumReducer } from './forumReducer';
import { postReducer } from './postReducer';
import { stepReducer } from "./stepReducer";

export const rootReducer = combineReducers({
    authReducer,
    forumReducer,
    postReducer,
    stepReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;
//export rootReducer;
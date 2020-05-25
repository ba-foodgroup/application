import { persistReducer } from 'redux-persist';
import { UserPost, InsertedUserPost, PostActionTypes, POST_ACTION_COMPLETE, POST_ACTION_PENDING, POST_ACTION_ERROR, FETCH_POST_OVERVIEW_PENDING, FETCH_POST_OVERVIEW_COMPLETE, PostOverview, FETCH_POST_OVERVIEW_ERROR, POST_RECIPE_ACTION_PENDING, POST_RECIPE_ACTION_ERROR, POST_RECIPE_ACTION_COMPLETE, POST_ACTION_REFER_TO } from '../actions/postAction'

export interface PostState {
    subforumId: number,
    headline: string,
    description: string,
    error?: string,
    referToNewPostId?: number,
    postedRecipeId?: number,
    activeViewPost?: PostInformation,
    postToForumError?: string
}

export interface PostInformation {
    overview: PostOverview
    // TODO: comments
}

const initialState: PostState = {
    subforumId: null,
    headline: null,
    description: null,
}

export const postReducer = (state = initialState, action: PostActionTypes) => {
    switch(action.type) {
        case POST_ACTION_REFER_TO:
            return {
                ...state,
                referToNewPostId: action.payload
            };
        case POST_ACTION_PENDING:
            return {
                ...state,
                referToNewPostId: null,
                error: null
            };
        case POST_ACTION_COMPLETE:
            return {
                ...state,
                referToNewPostId: action.payload.postId
            };
        case POST_ACTION_ERROR:
            return {
                ...state,
                referToNewPostId: null,
                error: action.payload,
            };
        case POST_RECIPE_ACTION_PENDING:
            return {
                ...state,
                postedRecipeId: null,
                error: null
            };
        case POST_RECIPE_ACTION_COMPLETE:
            return {
                ...state,
                postedRecipeId: action.payload.recipeId
            };
        case POST_RECIPE_ACTION_ERROR:
            return {
                ...state,
                postedRecipeId: null,
                error: action.payload
            };
        case FETCH_POST_OVERVIEW_PENDING:
            return {
                ...state,
                postedRecipeId: null,
                error: null,
                activeViewPost: null
            };
        case FETCH_POST_OVERVIEW_COMPLETE:
            return {
                ...state,
                referToNewPostId: null,
                activeViewPost: { overview: action.payload }
            };
        case FETCH_POST_OVERVIEW_ERROR:
            return {
                ...state,
                referToNewPostId: null,
                error: action.payload
            };
        default:
            return state;
    };
}
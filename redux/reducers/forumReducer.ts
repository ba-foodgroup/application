import {
    ForumActionTypes,
    FETCH_SUBFORUM_USER_FEED_PENDING,
    FETCH_SUBFORUM_USER_FEED_COMPLETE,
    FETCH_SUBFORUM_USER_FEED_ERROR,
    SubforumUserFeedEntry,
    FETCH_SUBFORUM_USER_SUBFURUMS_PENDING,
    SubforumUserMembership,
    FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE,
    SubforumUserProfile,
    FETCH_SUBFORUM_USER_PROFILE_PENDING,
    FETCH_SUBFORUM_USER_PROFILE_COMPLETE,
    FETCH_SUBFORUM_USER_PROFILE_ERROR,
    FETCH_SUBFORUM_USER_SUBFURUMS_ERROR,
    SubforumUserProfileDetailed,
    FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING,
    FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE,
    FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR,
    SubforumCategory,
    FETCH_SUBFORUM_CATEGORIES_PENDING,
    FETCH_SUBFORUM_CATEGORIES_COMPLETE,
    FETCH_SUBFORUM_CATEGORIES_ERROR,
    SubforumUserFeed,
    SubforumUserProfileResponse,
    SubforumUserMembershipResponse,
    PostSubforumSavedPostResponse,
    POST_SUBFORUM_SAVE_PENDING,
    POST_SUBFORUM_SAVE_COMPLETE,
    POST_SUBFORUM_SAVE_ERROR
} from '../actions/forumAction';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

export interface ForumState {
    loadingSubforumUserData: boolean;
    subforumUserData: SubforumUserFeed;
    subforumMemberships: SubforumUserMembershipResponse;
    subforumCategories: Array<SubforumCategory>;
    subforumProfiles: Array<SubforumUserProfile>;
    subforumProfile: SubforumUserProfileResponse
    subforumUserError?: string;
    postSaving: PostSubforumSavedPostResponse & { loading: boolean };
}

const persistConfig = {
    key: 'forum',
    storage: AsyncStorage,
    blacklist: ['loadingSubforumUserData', 'subforumUserData', 'subforumMemberships']
};

const initialState: ForumState = {
    loadingSubforumUserData: true,
    subforumUserData: { entries: [], received: null },
    subforumMemberships: { entries: [], received: null },
    subforumProfiles: [],
    subforumCategories: [],
    subforumProfile: { profile: null, received: null },
    postSaving: { postId: -1, liked: false, loading: false }
};

const preForumReducer = (
    state = initialState,
    action: ForumActionTypes
): ForumState => {
    switch (action.type) {
        case FETCH_SUBFORUM_USER_FEED_PENDING:
            return {
                ...state,
                loadingSubforumUserData: true,
            };
        case FETCH_SUBFORUM_USER_FEED_COMPLETE:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserData: action.payload
            };
        case FETCH_SUBFORUM_USER_FEED_ERROR:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserError: action.payload,
            };
        case FETCH_SUBFORUM_CATEGORIES_PENDING:
            return {
                ...state,
                loadingSubforumUserData: true,
            };
        case FETCH_SUBFORUM_CATEGORIES_COMPLETE:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumCategories: action.payload
            };
        case FETCH_SUBFORUM_CATEGORIES_ERROR:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserError: action.payload
            };
        case FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING:
            return {
                ...state,
                subforumUserError: null,
                loadingSubforumUserData: true,
            };
        case FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE:
            return {
                ...state,
                subforumUserError: null,
                loadingSubforumUserData: false,
                subforumProfile: action.payload,
            };
        case FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserError: action.payload,
            };
        case FETCH_SUBFORUM_USER_PROFILE_PENDING:
            return {
                ...state,
                loadingSubforumUserData: true,
            };
        case FETCH_SUBFORUM_USER_PROFILE_COMPLETE:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumProfiles: [
                    ...state.subforumProfiles,
                    action.payload
                ].filter(
                    (value, index, self) =>
                        index ===
                        self.findIndex((t) => t.user_id === value.user_id)
                ),
            };
        case FETCH_SUBFORUM_USER_PROFILE_ERROR:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserError: action.payload,
            };
        case FETCH_SUBFORUM_USER_SUBFURUMS_PENDING:
            return {
                ...state,
                loadingSubforumUserData: true,
            };
        case FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumMemberships: action.payload,
            };
        case FETCH_SUBFORUM_USER_SUBFURUMS_ERROR:
            return {
                ...state,
                loadingSubforumUserData: false,
                subforumUserError: action.payload,
            };
        case POST_SUBFORUM_SAVE_PENDING:
            return {
                ...state,
                postSaving: { postId: action.payload.post_id, loading: true, liked: false }
            };
        case POST_SUBFORUM_SAVE_COMPLETE:
            // Usikker her
            const index = state.subforumUserData.entries.findIndex((t) => t.subforum_post_list_id === action.payload.post_id);
            let clone: SubforumUserFeedEntry;
            Object.assign(clone, state.subforumUserData.entries[index]);
            clone.save_saved_at = new Date();
            return {
                ...state,
                postSaving: { ...action.payload, loading: false },
                subforumUserData: {
                    entries: [...state.subforumUserData.entries, clone],
                    received: state.subforumUserData.received
                }
            };
        case POST_SUBFORUM_SAVE_ERROR:
            return {
                ...state,
                postSaving: { postId: -1, loading: false, liked: false }
            };
        default:
            return state;
    }
};

export const forumReducer = persistReducer(persistConfig, preForumReducer);

export const FETCH_SUBFORUM_USER_FEED_PENDING =
    'FETCH_SUBFORUM_USER_FEED_PENDING';
export const FETCH_SUBFORUM_USER_FEED_COMPLETE =
    'FETCH_SUBFORUM_USER_FEED_COMPLETE';
export const FETCH_SUBFORUM_USER_FEED_ERROR = 'FETCH_SUBFORUM_USER_FEED_ERROR';

export const FETCH_SUBFORUM_USER_SUBFURUMS_PENDING =
    'FETCH_SUBFORUM_USER_SUBFURUMS_PENDING';
export const FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE =
    'FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE';
export const FETCH_SUBFORUM_USER_SUBFURUMS_ERROR =
    'FETCH_SUBFORUM_USER_SUBFURUMS_ERROR';

export const FETCH_SUBFORUM_USER_PROFILE_PENDING =
    'FETCH_SUBFORUM_USER_PROFILE_PENDING';
export const FETCH_SUBFORUM_USER_PROFILE_COMPLETE =
    'FETCH_SUBFORUM_USER_PROFILE_COMPLETE';
export const FETCH_SUBFORUM_USER_PROFILE_ERROR =
    'FETCH_SUBFORUM_USER_PROFILE_ERROR';

export const FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING =
    'FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING';

export const FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE =
    'FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE';

export const FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR =
    'FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR';

export const FETCH_SUBFORUM_CATEGORIES_PENDING =
    'FETCH_SUBFORUM_CATEGORIES_PENDING';

export const FETCH_SUBFORUM_CATEGORIES_COMPLETE =
    'FETCH_SUBFORUM_CATEGORIES_COMPLETE';

export const FETCH_SUBFORUM_CATEGORIES_ERROR =
    'FETCH_SUBFORUM_CATEGORIES_ERROR';

export const POST_SUBFORUM_SAVE_PENDING = 'POST_SUBFORUM_SAVE_PENDING';
export const POST_SUBFORUM_SAVE_COMPLETE = 'POST_SUBFORUM_SAVE_COMPLETE';
export const POST_SUBFORUM_SAVE_ERROR = 'POST_SUBFORUM_SAVE_ERROR';

export interface PostSubforumSavedPostResponse {
    postId: number;
    liked: boolean;
}

export interface SaveUserPost {
    user_id: number;
    post_id: number;
}

export interface SubforumUserFeed {
    received: Date;
    entries: SubforumUserFeedEntry[];
}

export interface SubforumUserFeedEntry {
    subforum_post_list_id: number;
    subforum_post_list_user_id: number;
    subforum_post_list_subforum_id: number;
    subforum_post_list_name: string;
    subforum_post_list_description: string;
    subforum_post_list_icon: string | null;
    subforum_post_list_time: Date;

    user_id: number;
    user_username: string;
    user_icon: string | null;
    user_karma: number;

    upvotes: number;
    dislikes: number;

    post_recipe_detail_difficulty: number | null;
    post_recipe_detail_time_estimate: number | null;
    post_recipe_detail_cost: number | null;

    save_saved_at: Date | null;
}

export interface SubforumUserMembershipResponse {
    entries: SubforumUserMembership[];
    received: Date;
}

export interface SubforumUserMembership {
    subforum_id: number;
    subforum_official: number;
    subforum_owner_user_id: number | null;
    subforum_name: string;
    subforum_path: string;
    subforum_category_id: number;
    subforum_description: string;
    subforum_icon: string | null;
    subforum_restricted: boolean | null;
    subforum_member_user_id: number | null;
    subforum_member_subforum_id: number | null;
    subforum_member_restrictions: number | null;
    subforum_member_admin_restricted: number | null;
    category_name: string;
    category_description: string;
}

export interface SubforumCategory {
    id: number;
    name: string;
    description: string;
}

export interface SubforumUserProfile {
    user_id: number;
    user_username: string;
    user_created_at: Date | null;
    user_icon: string | null;
    user_karma: number;
    admin_group_name: string | null;
    admin_group_permissions: number | null;
}

export interface SubforumUserProfileDetailed extends SubforumUserProfile {
    user_email: string;
    user_register_ip: string;
    setting_privacy: number | null;
    setting_notifications: number | null;
}

export interface SubforumUserProfileResponse {
    profile: SubforumUserProfileDetailed | null;
    received: Date;
}

export interface FetchSubforumUserFeedPending {
    type: typeof FETCH_SUBFORUM_USER_FEED_PENDING;
    payload: number;
}

export interface FetchSubforumUserFeedComplete {
    type: typeof FETCH_SUBFORUM_USER_FEED_COMPLETE;
    payload: SubforumUserFeed;
}

export interface FetchSubforumUserFeedError {
    type: typeof FETCH_SUBFORUM_USER_FEED_ERROR;
    payload: string;
}

export interface FetchSubforumUserSubforumsPending {
    type: typeof FETCH_SUBFORUM_USER_SUBFURUMS_PENDING;
}

export interface FetchSubforumUserSubforumsComplete {
    type: typeof FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE;
    payload: SubforumUserMembershipResponse;
}

export interface FetchSubforumUserSubforumsError {
    type: typeof FETCH_SUBFORUM_USER_SUBFURUMS_ERROR;
    payload: string;
}

export interface FetchSubforumUserProfilePending {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_PENDING;
    payload: number;
}

export interface FetchSubforumUserProfileComplete {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_COMPLETE;
    payload: SubforumUserProfile;
}

export interface FetchSubforumUserProfileError {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_ERROR;
    payload: string;
}

export interface FetchSubforumUserProfileSelfPending {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING;
}

export interface FetchSubforumUserProfileSelfComplete {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE;
    payload: SubforumUserProfileResponse;
}

export interface FetchSubforumCategoriesPending {
    type: typeof FETCH_SUBFORUM_CATEGORIES_PENDING;
}

export interface FetchSubforumCategoriesComplete {
    type: typeof FETCH_SUBFORUM_CATEGORIES_COMPLETE;
    payload: SubforumCategory[];
}

export interface FetchSubforumCategoriesError {
    type: typeof FETCH_SUBFORUM_CATEGORIES_ERROR;
    payload: string;
}

export interface FetchSubforumUserProfileSelfError {
    type: typeof FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR;
    payload: string;
}

export interface PostSubforumSavedPostPending {
    type: typeof POST_SUBFORUM_SAVE_PENDING;
    payload: SaveUserPost;
}

export interface PostSubforumSavedPostComplete {
    type: typeof POST_SUBFORUM_SAVE_COMPLETE;
    payload: PostSubforumSavedPostResponse;
}

export interface PostSubforumSavedPostError {
    type: typeof POST_SUBFORUM_SAVE_ERROR;
    payload: string;
}

export type ForumActionTypes =
    | FetchSubforumUserFeedPending
    | FetchSubforumUserFeedComplete
    | FetchSubforumUserFeedError
    | FetchSubforumUserSubforumsPending
    | FetchSubforumUserSubforumsComplete
    | FetchSubforumUserSubforumsError
    | FetchSubforumUserProfilePending
    | FetchSubforumUserProfileComplete
    | FetchSubforumUserProfileError
    | FetchSubforumUserProfileSelfPending
    | FetchSubforumUserProfileSelfComplete
    | FetchSubforumUserProfileSelfError
    | FetchSubforumCategoriesPending
    | FetchSubforumCategoriesComplete
    | FetchSubforumCategoriesError
    | PostSubforumSavedPostPending
    | PostSubforumSavedPostComplete
    | PostSubforumSavedPostError;

export const fetchSubforumUserFeedPending = (payload: number) => {
    return { type: FETCH_SUBFORUM_USER_FEED_PENDING, payload: payload };
};

export const fetchSubforumUserFeedComplete = (payload: SubforumUserFeed) => {
    return { type: FETCH_SUBFORUM_USER_FEED_COMPLETE, payload: payload };
};

export const fetchSubforumUserFeedError = (payload: string) => {
    return { type: FETCH_SUBFORUM_USER_FEED_PENDING, payload: payload };
};

export const fetchSubforumUserSubforumsPending = () => {
    return { type: FETCH_SUBFORUM_USER_SUBFURUMS_PENDING };
};

export const fetchSubforumUserSubforumsComplete = (
    payload: SubforumUserMembershipResponse
) => {
    return { type: FETCH_SUBFORUM_USER_SUBFURUMS_COMPLETE, payload: payload };
};

export const fetchSubforumUserSubforumsError = (payload: string) => {
    return { type: FETCH_SUBFORUM_USER_SUBFURUMS_ERROR, payload: payload };
};

export const fetchSubforumUserProfilePending = (payload: number) => {
    return { type: FETCH_SUBFORUM_USER_PROFILE_PENDING, payload: payload };
};

export const fetchSubforumUserProfileComplete = (
    payload: SubforumUserProfile
) => {
    return { type: FETCH_SUBFORUM_USER_PROFILE_COMPLETE, payload: payload };
};

export const fetchSubforumUserProfileError = (payload: string) => {
    return { type: FETCH_SUBFORUM_USER_PROFILE_ERROR, payload: payload };
};

export const fetchSubforumUserProfileSelfPending = () => {
    return { type: FETCH_SUBFORUM_USER_PROFILE_SELF_PENDING };
};

export const fetchSubforumUserProfileSelfComplete = (
    payload: SubforumUserProfileResponse
) => {
    return {
        type: FETCH_SUBFORUM_USER_PROFILE_SELF_COMPLETE,
        payload: payload
    };
};

export const fetchSubforumUserProfileSelfError = (payload: string) => {
    return { type: FETCH_SUBFORUM_USER_PROFILE_SELF_ERROR, payload: payload };
};

export const fetchSubforumCategoriesPending = () => {
    return { type: FETCH_SUBFORUM_CATEGORIES_PENDING };
};

export const fetchSubforumCategoriesComplete = (
    payload: SubforumCategory[]
) => {
    return { type: FETCH_SUBFORUM_CATEGORIES_COMPLETE, payload: payload };
};

export const fetchSubforumCategoriesError = (payload: string) => {
    return { type: FETCH_SUBFORUM_CATEGORIES_ERROR, payload: payload };
};

export const postSubforumSavePostPending = (payload: SaveUserPost) => {
    return { type: POST_SUBFORUM_SAVE_PENDING, payload: payload };
};

export const postSubforumSavePostComplete = (payload: PostSubforumSavedPostResponse) => {
    return { type: POST_SUBFORUM_SAVE_COMPLETE, payload: payload };
};

export const postSubforumSavePostError = (payload: string) => {
    return { type: POST_SUBFORUM_SAVE_ERROR, payload: payload };
};
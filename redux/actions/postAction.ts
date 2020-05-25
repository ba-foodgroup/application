export const POST_ACTION_REFER_TO = 'POST_ACTION_REFER_TO';

export const POST_ACTION_COMPLETE = 'POST_ACTION_COMPLETE';
export const POST_ACTION_PENDING = 'POST_ACTION_PENDING';
export const POST_ACTION_ERROR = 'POST_ACTION_ERROR';

export const POST_RECIPE_ACTION_COMPLETE = 'POST_RECIPE_ACTION_COMPLETE';
export const POST_RECIPE_ACTION_PENDING = 'POST_RECIPE_ACTION_PENDING';
export const POST_RECIPE_ACTION_ERROR = 'POST_RECIPE_ACTION_ERROR';

export const FETCH_POST_OVERVIEW_PENDING = 'FETCH_POST_OVERVIEW_PENDING';
export const FETCH_POST_OVERVIEW_COMPLETE = 'FETCH_POST_OVERVIEW_COMPLETE';
export const FETCH_POST_OVERVIEW_ERROR = 'FETCH_POST_OVERVIEW_ERROR';

export interface UserPost {
    subforum_id: number;
    title: string;
    description: string;
}

export interface RecipeItem {
    name: string;
    cost: number;
    retailer?: string;
}

export interface UserRecipePost {
    subforum_id: number;
    subforum_post_list_id: number;
    difficulty: number;
    time_estimate: number;
    items: RecipeItem[];
}

export interface InsertedUserPost {
    postId: number;
}

export interface InsertedUserRecipePost {
    recipeId: number;
}

export interface PostOverview {
    subforum_post_list_id: number;
    subforum_post_list_user_id: number;
    subforum_post_list_subforum_id: number;
    subforum_post_list_name: string;
    subforum_post_list_description: string;
    subforum_post_list_icon: null | string;
    subforum_post_list_time: Date;
    user_id: number;
    user_username: string;
    user_icon: null | string;
    user_karma: number;
    post_recipe_detail_difficulty: null | number;
    post_recipe_detail_time_estimate: null | number;
    post_recipe_detail_cost: null | number;
    upvotes: number;
    dislikes: number;
}

export interface PostActionReferTo {
    type: typeof POST_ACTION_REFER_TO;
    payload: number;
}

export interface PostActionComplete {
    type: typeof POST_ACTION_COMPLETE;
    payload: InsertedUserPost;
}
export interface PostActionPending {
    type: typeof POST_ACTION_PENDING;
    payload: UserPost;
}
export interface PostActionError {
    type: typeof POST_ACTION_ERROR;
    payload: string;
}

export interface PostRecipeActionComplete {
    type: typeof POST_RECIPE_ACTION_COMPLETE;
    payload: InsertedUserRecipePost;
}

export interface PostRecipeActionPending {
    type: typeof POST_RECIPE_ACTION_PENDING;
    payload: UserRecipePost;
}

export interface PostRecipeActionError {
    type: typeof POST_RECIPE_ACTION_ERROR;
    payload: string;
}

export interface FetchPostOverviewPending {
    type: typeof FETCH_POST_OVERVIEW_PENDING;
    payload: number;
}

export interface FetchPostOverviewComplete {
    type: typeof FETCH_POST_OVERVIEW_COMPLETE;
    payload: PostOverview;
}

export interface FetchPostOverviewError {
    type: typeof FETCH_POST_OVERVIEW_ERROR;
    payload: string;
}

export const userPostReferTo = (payload: number) => {
    return {
        type: POST_ACTION_REFER_TO,
        payload: payload
    };
};

export const userPostComplete = (payload: InsertedUserPost) => {
    return {
        type: POST_ACTION_COMPLETE,
        payload: payload
    };
};

export const userPostPending = (payload: UserPost) => {
    return {
        type: POST_ACTION_PENDING,
        payload: payload
    };
};

export const userPostError = (payload: string) => {
    return {
        type: POST_ACTION_ERROR,
        payload
    };
};

export const userRecipePostComplete = (payload: UserRecipePost) => {
    return {
        type: POST_RECIPE_ACTION_COMPLETE,
        payload: payload
    };
};

export const userRecipePostPending = (payload: UserRecipePost) => {
    return {
        type: POST_RECIPE_ACTION_PENDING,
        payload: payload
    };
};

export const userRecipePostError = (payload: string) => {
    return {
        type: POST_RECIPE_ACTION_ERROR,
        payload: payload
    };
}

export const fetchPostPending = (payload: number) => {
    return {
        type: FETCH_POST_OVERVIEW_PENDING,
        payload: payload
    };
};

export const fetchPostComplete = (payload: PostOverview) => {
    return {
        type: FETCH_POST_OVERVIEW_COMPLETE,
        payload: payload
    };
};

export const fetchPostError = (payload: string) => {
    return {
        type: FETCH_POST_OVERVIEW_ERROR,
        payload: payload
    };
};

export type PostActionTypes =
    | PostActionReferTo
    | PostActionComplete
    | PostActionPending
    | PostActionError
    | PostRecipeActionComplete
    | PostRecipeActionPending
    | PostRecipeActionError
    | FetchPostOverviewPending
    | FetchPostOverviewComplete
    | FetchPostOverviewError;

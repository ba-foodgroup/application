import { Dispatch } from 'redux';
import {
    fetchSubforumUserFeedPending,
    fetchSubforumUserFeedComplete,
    fetchSubforumUserFeedError,
    fetchSubforumUserSubforumsPending,
    fetchSubforumUserSubforumsComplete,
    fetchSubforumUserSubforumsError,
    fetchSubforumUserProfilePending,
    fetchSubforumUserProfileError,
    fetchSubforumUserProfileComplete,
    SaveUserPost
} from './forumAction';
import {
    UserPost,
    userPostComplete,
    userPostPending,
    userPostError,
    fetchPostPending,
    fetchPostComplete,
    fetchPostError,
    UserRecipePost,
    userRecipePostPending,
    userRecipePostComplete,
    userRecipePostError
} from './postAction';
import { instance } from '../../utils/apiInstance';

export const fetchUserSubforumFeed = (page: number) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchSubforumUserFeedPending(page));
        console.log(`Starting fetch of user subforum feed for page: ${page}!`);
        instance
            .get(`user/subforums/feed/${page}`)
            .then((response) => {
                if (response.status == 200) {
                    dispatch(
                        fetchSubforumUserFeedComplete({
                            entries: response.data,
                            received: new Date()
                        })
                    );
                } else {
                    dispatch(
                        fetchSubforumUserFeedError(
                            `Received status code: ${response.status}`
                        )
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const fetchSubforumPostOverview = (post_id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchPostPending(post_id));
        instance
            .get(`post/${post_id}/overview`)
            .then((response) => {
                if (response.status == 200) {
                    dispatch(fetchPostComplete(response.data));
                } else {
                    dispatch(
                        fetchPostError(
                            `Received status code: ${response.status}`
                        )
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const fetchSubforumMemberships = () => {
    return (dispatch: Dispatch) => {
        dispatch(fetchSubforumUserSubforumsPending());
        console.log('Starting fetch of user subforum memberships.');
        instance
            .get('user/subforums')
            .then((response) => {
                if (response.status == 200) {
                    dispatch(
                        fetchSubforumUserSubforumsComplete({
                            entries: response.data,
                            received: new Date()
                        })
                    );
                } else {
                    dispatch(
                        fetchSubforumUserSubforumsError(
                            `Received status code: ${response.status}`
                        )
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const fetchSubforumUserProfile = (user_id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchSubforumUserProfilePending(user_id));
        console.log(
            `Starting fetch of subforum user profile for user id: ${user_id}`
        );
        instance.get(`user/${user_id}/profile`).then((response) => {
            if (response.status == 200) {
                dispatch(fetchSubforumUserProfileComplete(response.data));
            } else {
                dispatch(
                    fetchSubforumUserProfileError(
                        `Received status code: ${response.status}`
                    )
                );
            }
        });
    };
};

export const postSaveToForum = (values: SaveUserPost) => {
    return (dispatch: Dispatch) => {
        //getAPIToken().then((token) => {});
    };
};

export const postGeneralToForum = (values: UserPost) => {
    return (dispatch: Dispatch) => {
        dispatch(userPostPending(values));
        instance
            .post('post/general', {
                subforum_id: values.subforum_id,
                name: values.title,
                description: values.description
            })
            .then((response) => {
                console.warn(
                    `General: Fikk response statuskode ${response.status}`
                );
                console.warn(values);
                if (response.status == 200) {
                    dispatch(userPostComplete(response.data));
                } else {
                    dispatch(
                        userPostError(`Fikk statuskode: ${response.status}`)
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const postRecipeToForum = (values: UserRecipePost) => {
    return (dispatch: Dispatch) => {
        dispatch(userRecipePostPending(values));
        instance
            .post('post/recipe', {
                subforum_post_list_id: values.subforum_post_list_id,
                subforum_id: values.subforum_id,
                difficulty: values.difficulty,
                time_estimate: values.time_estimate,
                items: values.items
            })
            .then((response) => {
                console.warn(
                    `Recipe: Fikk response statuskode ${response.status}`
                );
                console.warn(values);
                if (response.status == 200) {
                    dispatch(userRecipePostComplete(response.data));
                } else {
                    dispatch(
                        userRecipePostError(
                            `Fikk statuskode: ${response.status}`
                        )
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const attachImageToPost = (uri: string) => {
    const formData = new FormData();
    formData.append('icon', uri, uri);
};
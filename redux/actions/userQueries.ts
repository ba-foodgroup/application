import { getAPIToken, setItem } from '../../utils/deviceStorage';
import { Dispatch } from 'redux';
import {
    fetchSubforumUserProfileSelfPending,
    fetchSubforumUserProfileSelfComplete,
    fetchSubforumUserProfileSelfError
} from '../actions/forumAction';
import { BASE_API_PATH } from '../../utils/constants';
import { instance } from '../../utils/apiInstance';

export const fetchSubforumUserProfileSelf = () => {
    return (dispatch: Dispatch) => {
        dispatch(fetchSubforumUserProfileSelfPending());
        instance.get('user/self').then((response) => {
            if (response.status == 200) {
                dispatch(
                    fetchSubforumUserProfileSelfComplete({
                        profile: response.data,
                        received: new Date()
                    })
                );
            } else {
                dispatch(
                    fetchSubforumUserProfileSelfError(
                        `Profile: Received status code: ${response.status}`
                    )
                );
            }
        });
    };
};

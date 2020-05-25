import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import ProfileUserInfo from '../../components/profile/ProfileUserInfo';
import colors from '../../styles/colors';
import ProfileUserDescription from '../../components/profile/ProfileUserDescription';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostFeed from '../../components/feeds/PostFeed';
import RecipieFeed from '../../components/feeds/RecipieFeed';
import { SubforumUserProfileDetailed } from '../../redux/actions/forumAction';
import { ApplicationState } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchSubforumUserProfileSelf } from '../../redux/actions/userQueries';
import { connect } from 'react-redux';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';
const Tab = createMaterialTopTabNavigator();
interface UserProfileScreenProps {
    username: string;
    postPicUrl: string;
    posts: number;
    recipies: number;
    karma: number;
    loading: boolean;
    data: SubforumUserProfileDetailed;
    received: Date;
    error?: string;
    loadSubforumUserProfileSelf(): () => void;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = (props) => {
    const {
        loading = true,
        data,
        error = null,
        loadSubforumUserProfileSelf
    } = props;

    useEffect(() => {
        if (props.data !== null) {
            if (props.received !== null && props.received instanceof Date) {
                const timeMsBetween =
                    (new Date().getTime() - props.received.getTime());

                if (timeMsBetween < 180000) {
                    return;
                }
            }
        }
        loadSubforumUserProfileSelf();
        console.log('UserProfileScreen: useEffect()');
    }, []);

    return (
        <>
            <View style={styles.containerBackground}>
                {loading || data == undefined ? (
                    <FloatingLoadingSpinner size='large' />
                ) : error == null ? (
                    <>
                        <ProfileUserInfo
                            username={data.user_username}
                            postPicUrl={
                                data.user_icon === null
                                    ? 'logo.png'
                                    : `avatars/${data.user_icon}`
                            }
                            posts={1} // sample data here
                            recipies={1} // sample data here still, what is this typo lol
                            karma={data.user_karma}
                        />
                        <ProfileUserDescription
                            test={`Hei ${data.user_username}`}
                        />
                    </>
                ) : (
                    <Text style={{ color: '#FF00FF' }}>{error}</Text>
                )}
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: { fontSize: 12 },
                    inactiveTintColor: colors.grayLight, //todo: grayLight
                    activeTintColor: colors.black,
                    style: {}
                }}
            >
                <Tab.Screen name='Posts' component={PostFeed} />
                <Tab.Screen name='Recipies' component={RecipieFeed} />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    containerBackground: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        marginTop: StatusBar.currentHeight
    }
});

const mapStateToProps = (state: ApplicationState, ownProps: any) => ({
    ...ownProps,
    loading: state.forumReducer.loadingSubforumUserData,
    data: state.forumReducer.subforumProfile.profile,
    received: state.forumReducer.subforumProfile.received,
    error: state.forumReducer.subforumUserError
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            loadSubforumUserProfileSelf: () => fetchSubforumUserProfileSelf()
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

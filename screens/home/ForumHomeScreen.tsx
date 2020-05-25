import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Share } from 'react-native';

import colors from '../../styles/colors';

import { fetchUserSubforumFeed } from '../../redux/actions/subforumQueries';

import FeedCardPicture from '../../components/cards/FeedCardPicture';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';
import { ApplicationState } from '../../redux/reducers';
import { SubforumUserFeedEntry, SubforumUserFeed } from '../../redux/actions/forumAction';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import FeedCardDefault from '../../components/cards/FeedCardDefault';
import { userPostReferTo } from '../../redux/actions/postAction';

interface ListItemProps {
    item: SubforumUserFeedEntry;
    onClick: (post_id: number) => void;
    onClickUser: (post_id: number) => void;
    onUpvote: (post_id: number) => void;
    onDownvote: (post_id: number) => void;
    onShare: (post_id: number) => void;
}

const ListItem = (props: ListItemProps) => {
    const { item } = props;

    const profilePic =
        item.user_icon === null ? 'logo.png' : `avatars/${item.user_icon}`;

    return (
        <View>
            {item.post_recipe_detail_difficulty != null ? (
                <FeedCardPicture
                    userId={item.subforum_post_list_user_id}
                    postId={item.subforum_post_list_id}
                    username={item.user_username}
                    profilePicUrl={profilePic}
                    postKarma={item.upvotes - item.dislikes}
                    comments={11 + item.upvotes}
                    postPicUrl={'sample/norskekjottkaker.jpg'}
                    headline={item.subforum_post_list_name}
                    description={item.subforum_post_list_description}
                    time={item.post_recipe_detail_time_estimate}
                    difficulty={item.post_recipe_detail_difficulty}
                    cost={item.post_recipe_detail_cost}
                    onClick={() => props.onClick(item.subforum_post_list_id)}
                    onClickUser={() => props.onClickUser(item.subforum_post_list_user_id)}
                    onDownvote={() => props.onDownvote(item.subforum_post_list_id)}
                    onUpvote={() => props.onUpvote(item.subforum_post_list_id)}
                    onShare={() => props.onShare(item.subforum_post_list_id)}
                />
            ) : (
                <FeedCardDefault
                    userId={item.subforum_post_list_user_id}
                    postId={item.subforum_post_list_id}
                    username={item.user_username}
                    profilePicUrl={profilePic}
                    postKarma={item.upvotes - item.dislikes}
                    comments={11 + item.upvotes}
                    headline={item.subforum_post_list_name}
                    description={item.subforum_post_list_description}
                    onClick={() => props.onClick(item.subforum_post_list_id)}
                    onClickUser={() => props.onClickUser(item.subforum_post_list_user_id)}
                    onDownvote={() => props.onDownvote(item.subforum_post_list_id)}
                    onUpvote={() => props.onUpvote(item.subforum_post_list_id)}
                    onShare={() => props.onShare(item.subforum_post_list_id)}
                />
            )}
        </View>
    );
};

interface ForumHomeScreenProps {
    loading: boolean;
    dataReceived: Date | null;
    data: SubforumUserFeedEntry[];
    error?: string;
    loadSubforumFeed(payload: number): () => void;
    referToPost(payload: number): () => void;
    navigation: any;
    referToPostId?: number;
}

const ForumHomeScreen: React.FC<ForumHomeScreenProps> = (props: ForumHomeScreenProps) => {
    let page = 0;
    const { loading = true, data, error = null, loadSubforumFeed } = props;

    useEffect(() => {
        if (props.data.length > 0) {
            if (props.dataReceived !== null && props.dataReceived instanceof Date) {
                const timeMsBetween =
                    (new Date().getTime() - props.dataReceived.getTime());

                // Ikke fetch dersom siste data er under et minutt gammelt
                if (timeMsBetween < 180000) {
                    return;
                }
            }
        }
        loadSubforumFeed(page);
        console.log('ForumHomeScreen: useEffect()');
    }, []);

    const handleClick = (post_id: number) => {
        props.referToPost(post_id);
    };

    const handleClickUser = (user_id: number) => {
        console.info(`Clicked user id: ${user_id}`);
        return;
    }

    const handleUpvote = (post_id: number) => {
        console.info(`Upvoted post id: ${post_id}`);
        return;
    }

    const handleDownvote = (post_id: number) => {
        console.info(`Downvoted post id: ${post_id}`);
        return;
    }

    const handleShare = async (post: SubforumUserFeedEntry) => {
        console.info(`Shared post id: ${post.subforum_post_list_id}`);
        try {
            const result = await Share.share({
                message: `FoodGroup | Post: ${post.subforum_post_list_name}\n${post.subforum_post_list_description}`,
            });

            if (result.action == Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with ${result.activityType}`);
                } else {
                    console.log(`Shared`);
                }
            } else if (result.action == Share.dismissedAction) {
                console.log('Not shraed');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        if (props.referToPostId) {
            console.warn(`Navigate to post id: ${props.referToPostId}`);
            props.navigation.navigate('ForumPostOverviewScreen');
        }
    }, [props.referToPostId])

    return (
        <SafeAreaView style={styles.container}>
            {loading && props.data.length < 1 ? (
                <FloatingLoadingSpinner size='large' />
            ) : (
                <>
                    {loading && <FloatingLoadingSpinner />}
                    <FlatList
                        data={props.data}
                        renderItem={({ item }) => (
                            <ListItem
                                item={item}
                                onClick={() => handleClick(item.subforum_post_list_id)}
                                onClickUser={() => handleClickUser(item.subforum_post_list_user_id)}
                                onUpvote={() => handleUpvote(item.subforum_post_list_id)}
                                onDownvote={() => handleDownvote(item.subforum_post_list_id)}
                                onShare={async () => await handleShare(item)}
                            />
                        )}
                        keyExtractor={(item) => `${item.subforum_post_list_id}`}
                        onRefresh={() => loadSubforumFeed(page)}
                        refreshing={props.loading}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        // marginTop: 36,
        backgroundColor: '#bcf5d9'
        // backgroundColor: "#bcf5f5"
    },
    item: {
        backgroundColor: colors.secondary,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 32
    },
    underTitle: {
        fontSize: 20
    }
});

const mapStateToProps = (state: ApplicationState, ownProps: any) => ({
    ...ownProps,
    loading: state.forumReducer.loadingSubforumUserData,
    dataReceived: state.forumReducer.subforumUserData.received,
    data: state.forumReducer.subforumUserData.entries,
    error: state.forumReducer.subforumUserError,
    referToPostId: state.postReducer.referToNewPostId
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            loadSubforumFeed: (payload: number) =>
                fetchUserSubforumFeed(payload),
            referToPost: (payload: number) => userPostReferTo(payload)
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ForumHomeScreen);

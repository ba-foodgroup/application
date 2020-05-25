import React from 'react';
import { View, Text } from 'react-native';
import { SubforumUserFeedEntry } from '../../redux/actions/forumAction';
import FeedCardPicture from '../cards/FeedCardPicture';
import FeedCardDefault from '../cards/FeedCardDefault';

const PostFeed = (item: SubforumUserFeedEntry) => {
    const profilePic =
        item.user_icon === null ? 'logo.png' : `avatars/${item.user_icon}`;
    return (
        <View style={{ backgroundColor: '#d4fccd', flex: 1 }}>
            {item.post_recipe_detail_difficulty != null ? (
                <FeedCardPicture
                    username={item.user_username}
                    profilePicUrl={profilePic}
                    postPicUrl={'sample/norskekjottkaker.jpg'}
                    headline={item.post_headline}
                    description={item.subforum_post_list_name}
                    time={item.post_recipe_detail_time_estimate}
                    difficulty={item.post_recipe_detail_difficulty}
                    cost={item.post_recipe_detail_cost}
                    postKarma={item.upvotes - item.dislikes}
                    comments={11 + item.upvotes}
                />
            ) : (
                <FeedCardDefault
                    username={item.user_username}
                    profilePicUrl={profilePic}
                    description={item.subforum_post_list_name}
                    postKarma={item.upvotes - item.dislikes}
                    comments={11 + item.upvotes}
                    difficulty={item.post_recipe_detail_difficulty}
                    time={item.post_recipe_detail_time_estimate}
                    headline={item.post_headline}
                    cost={item.post_recipe_detail_cost}
                />
            )}
        </View>
    );
};

export default PostFeed;

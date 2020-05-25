import React from 'react';
import Card from '../cards/Card';

import PostHeader from './post/PostHeader';
import PostImage from './post/PostImage';
import ContentInfo from './post/ContentInfo';
import PostActionBar from './post/PostActionBar';
import { View, StyleSheet } from 'react-native';
import { BASE_STATIC_PATH } from '../../utils/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FeedCardPictureProps {
    postId: number;
    userId: number;
    username: string;
    profilePicUrl: string;
    postPicUrl: string;
    headline: string;
    description: string;

    time: number;
    difficulty: number;
    cost: number;

    postKarma: number;
    comments: number;

    onClick: (post_id: number) => void;
    onClickUser: (post_id: number) => void;
    onUpvote: (post_id: number) => void;
    onDownvote: (post_id: number) => void;
    onShare: (post_id: number) => void;
}

const FeedCardPicture: React.FC<FeedCardPictureProps> = (props) => {
    const { postPicUrl = 'sample/norskekjottkaker.jpg' } = props;

    const imgUri = BASE_STATIC_PATH + postPicUrl;

    console.log(imgUri);

    return (
        <Card>
            <View style={{ position: 'absolute', zIndex: 1 }}>
                <PostHeader
                    userId={props.userId}
                    username={props.username}
                    profilePicUrl={props.profilePicUrl}
                    onClickUser={() => props.onClickUser(props.userId)}
                />
            </View>
            <View>
                <PostImage
                    postId={props.postId}
                    postPicUrl={imgUri}
                    onClick={() => props.onClick(props.postId)}
                />
                <TouchableOpacity onPress={() => props.onClick(props.postId)}>
                    <ContentInfo
                        headline={props.headline}
                        description={props.description}
                        time={props.time}
                        difficulty={props.difficulty}
                        cost={props.cost}
                    />
                </TouchableOpacity>
                <PostActionBar
                    postKarma={props.postKarma}
                    comments={props.comments}
                    postId={props.postId}
                    onClick={() => props.onClick(props.postId)}
                    onUpvote={() => props.onUpvote(props.postId)}
                    onDownvote={() => props.onDownvote(props.postId)}
                    onShare={() => props.onShare(props.postId)}
                />
            </View>
        </Card>
    );
};

export default FeedCardPicture;

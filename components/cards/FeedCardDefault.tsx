import React from 'react';
import Card from './Card';
import { StyleSheet, View, Text, Image } from 'react-native';

import PostHeader from './post/PostHeader';
import PostActionBar from './post/PostActionBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pure } from 'recompose';

interface FeedCardDefaultProps {
    userId: number;
    postId: number;
    username: string;
    profilePicUrl?: string | null;
    postKarma: number;
    comments: number;

    headline: string;
    description: string;

    onClick: (post_id: number) => void;
    onClickUser: (post_id: number) => void;
    onUpvote: (post_id: number) => void;
    onDownvote: (post_id: number) => void;
    onShare: (post_id: number) => void;
}

const FeedCardDefault: React.FC<FeedCardDefaultProps> = (props) => {
    const PostContent = () => {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>{props.headline}</Text>
                </View>
                <View style={styles.postDescription}>
                    <Text>{props.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <Card>
            <PostHeader
                username={props.username}
                profilePicUrl={props.profilePicUrl}
                userId={props.userId}
                onClickUser={() => props.onClickUser(props.userId)}
            />
            <TouchableOpacity
                onPress={() => props.onClick(props.postId)}
            >
                <PostContent />
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
        </Card>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10},
    postDescription: {},
    title: {
        fontSize: 20,

    }
});

export default pure(FeedCardDefault);

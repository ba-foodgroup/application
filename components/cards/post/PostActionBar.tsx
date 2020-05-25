import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PostActionBarProps {
    postId: number;
    postKarma: number;
    comments: number;

    onClick: (post_id: number) => void;
    onUpvote: (post_id: number) => void;
    onDownvote: (post_id: number) => void;
    onShare: (post_id: number) => void;
}

const PostActionBar: React.FC<PostActionBarProps> = (props) => {
    const { postKarma = 1, comments = 'Default text' } = props;
    return (
        <View style={[styles.testing, { padding: 5 }]}>
            <TouchableOpacity
                onPress={() => props.onUpvote(props.postId)}
            >
                <View style={[styles.rowContainer]}>
                    <EvilIcons style={styles.marginLeft} name='heart' size={30} />
                    <Text style={[styles.marginLeft, { color: colors.red }]}>
                        {props.postKarma}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.onClick(props.postId)}
            >
                <View style={[styles.rowContainer, styles.marginLeft]}>
                    <EvilIcons name='comment' size={30} />
                    <Text style={styles.marginLeft}>{props.comments}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.onShare(props.postId)}
            >
                <View
                    style={[
                        styles.rowContainer,
                        styles.marginLeft,
                        ,
                        { marginRight: 10 }
                    ]}
                >
                    <Ionicons name='md-share-alt' size={30} />
                    <Text style={styles.marginLeft}>Share</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginLeft: {
        marginLeft: 10
    },
    testing: {
        justifyContent: 'space-between',
        // alignItems: "flex-start",
        flexDirection: 'row',
        padding: 5
    }
});

export default PostActionBar;

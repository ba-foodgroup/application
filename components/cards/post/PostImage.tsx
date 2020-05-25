import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../../../styles/colors';
import PostHeader from './PostHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PostImageProps {
    postId: number;
    postPicUrl: string;

    onClick: (post_id: number) => void;
}

const PostImage: React.FC<PostImageProps> = (props) => {
    const { postPicUrl = 'logo.png' } = props;

    return (
        <TouchableOpacity
            onPress={() => props.onClick(props.postId)}
        >
            <View style={styles.postPictureContainer}>
                <Image
                    source={{
                        uri: postPicUrl
                    }}
                    style={styles.postPicture}
                    resizeMode={'cover'}
                    onLoadStart={() => {
                        console.log('Starting loading image');
                    }}
                    onLoadEnd={() => console.log('Ended loading of image!')}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    postPictureContainer: {
        overflow: 'hidden',
        alignItems: 'center',
        borderBottomColor: colors.gray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    postPicture: {
        height: 250,
        width: '100%'
    }
});

export default PostImage;

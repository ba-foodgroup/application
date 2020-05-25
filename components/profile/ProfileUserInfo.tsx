import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PostImage from '../cards/post/PostImage';
import colors from '../../styles/colors';
import Card from '../cards/Card';
import ProfileInfoStack from '../ProfileInfoStack';
import { BASE_STATIC_PATH } from '../../utils/constants';

interface ProfileUserInfoProps {
    username: string;
    postPicUrl: string;
    posts: number;
    recipies: number;
    karma: number;
}

const ProfileUserInfo: React.FC<ProfileUserInfoProps> = (props) => {
    const {
        username = 'Username',
        postPicUrl = '/assets/icon.png',
        posts = 1,
        recipies = 1,
        karma = 1
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.profilePicture}>
                <Image
                    source={{
                        uri: BASE_STATIC_PATH + postPicUrl
                    }}
                    style={styles.picture}
                    resizeMode={'cover'}
                    onLoadStart={() => {
                        console.log(
                            `Starting loading of profile image: ${BASE_STATIC_PATH}${postPicUrl}!`
                        );
                    }}
                    onLoadEnd={() => {
                        console.log('Ended loading of profile image!');
                    }}
                />
            </View>

            <View style={styles.userInfo}>
                <ProfileInfoStack amount={props.posts} placeholder='Posts' />
                <ProfileInfoStack amount={props.recipies} placeholder='Recipies' />
                <ProfileInfoStack amount={props.karma} placeholder='Karma' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#d4fccd'
    },
    profilePicture: {
        // flexDirection: "column",
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.red,
        borderColor: colors.black
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    picture: {
        height: 70,
        width: 70
    }
});

export default ProfileUserInfo;

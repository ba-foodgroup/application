import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../../../styles/colors";
import { BASE_STATIC_PATH } from '../../../utils/constants';
import { TouchableOpacity } from "react-native-gesture-handler";

interface PostHeaderProps {
    userId: number;
    username: string;
    profilePicUrl: string;

    onClickUser?: (post_id: number) => void;
}

const PostHeader: React.FC<PostHeaderProps> = (props) => {
    const {
        profilePicUrl = 'logo.png',
        username = 'Username',
        userId
    } = props;

    return (
        <TouchableOpacity
            onPress={() => props.onClickUser(userId)}
        >
            <View style={styles.rowContainer}>
                <Image
                    source={{
                        uri: BASE_STATIC_PATH + profilePicUrl
                    }}
                    style={styles.profilePicCircle}
                />
                <Text style={styles.marginLeft}>{username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const pbSirkel = 40;
const styles = StyleSheet.create({
    profilePicCircle: {
        marginLeft: 10,
        marginBottom: 10,
        width: pbSirkel,
        height: pbSirkel,
        borderRadius: pbSirkel / 2,
        borderColor: colors.black,
        backgroundColor: colors.gray
    },
    rowContainer: {
        marginTop: 10,
        flexDirection: "row",
        // backgroundColor: "yellow"
    },
    marginLeft: {
        marginLeft: 10
    },

});

export default PostHeader;

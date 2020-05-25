import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface ProfileUserDescriptionProps {
    test: string,
}

const ProfileUserDescription: React.FC<ProfileUserDescriptionProps> = (props) => {
    const {
        test = ""
    } = props;
    return(
        <View style={styles.container}>
            <Text>{test}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#d4fccd"

    }
});

export default ProfileUserDescription;
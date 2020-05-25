import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface ProfileInfoStackProps {
    amount: number,
    placeholder: string,
}

const ProfileInfoStack: React.FC<ProfileInfoStackProps> = (props) => {
    const {
        amount = 0,
        placeholder = 'Placeholder'
    } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.boldText}>{amount}</Text>
            <Text>{placeholder}</Text>
        </View>
    );
}
//TODO: 
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly"
    },
    boldText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default ProfileInfoStack;
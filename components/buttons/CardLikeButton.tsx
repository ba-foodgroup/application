import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Card from "../cards/Card"


interface PostGHeartTouchableProps {
    title: string,

}

const PostGHeartTouchable: React.FC<PostGHeartTouchableProps> = (props) => {
    return (
        <Card title='PostGHeartTouchable'>
            <View>
                    
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        // 
    },
});

export default PostGHeartTouchable;

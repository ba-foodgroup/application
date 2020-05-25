import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import colors from '../../styles/colors';
import { FlatList } from 'react-native-gesture-handler';

export interface PostIngredients {
    stepNo?: number,
    stepText: string,
}

const TextItem: React.FC<PostIngredients> = (item: PostIngredients) => {
    return (
        <View style={styles.containerRow} key={item.stepNo}>
            <View style={styles.stepNo}>
                <Text>{item.stepNo} </Text>
            </View>
            <View style={styles.stepText}>
                <Text>{item.stepText}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    containerRow: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 10,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    },
    stepNo: {
        flexDirection: 'column'
    },
    stepText: {
        flexDirection: 'column'
    }
});

export default TextItem;
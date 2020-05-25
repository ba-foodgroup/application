import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {
    Entypo,
    SimpleLineIcons,
    MaterialIcons
} from '@expo/vector-icons';

interface ContentInfoProps {
    headline: string;
    description: string;
    time?: number;
    difficulty?: number;
    cost?: number;
}

const ContentInfo: React.FC<ContentInfoProps> = (props) => {
    return (
        <View style={[styles.container, styles.rowContainer]}>
            <View style={[styles.details]}>
                <View style={styles.rowContainer}>
                    <SimpleLineIcons
                        name='clock'
                        size={20}
                        style={styles.marginLeft}
                    />
                    <Text style={styles.marginLeft}>{props.time}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Entypo name='gauge' size={20} style={styles.marginLeft} />
                    <Text style={styles.marginLeft}>{props.difficulty}/5</Text>
                </View>

                <View style={styles.rowContainer}>
                    <MaterialIcons
                        name='attach-money'
                        size={25}
                        style={styles.marginLeft}
                    />
                    <Text style={styles.marginLeft}>{props.cost}</Text>
                </View>
            </View>

            <View style={styles.description}>
                <View style={[styles.postName, styles.rowContainer]}>
                    <Text style={{ fontWeight: 'bold' }}>{props.headline}</Text>
                </View>

                <View style={styles.postDescription}>
                    <Text>{props.description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row"
    },
    details: {
        width: 100,
        height: 100,
        marginTop: 20,
        backgroundColor: '#F5BCBC',
        justifyContent: 'space-evenly'
    },
    description: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'column',
        position: 'relative'
    },
    postName: {},
    postDescription: {},
    testing: {
        justifyContent: 'space-between',
        // alignItems: "flex-start",
        flexDirection: 'row',
        padding: 5
    },
    rowContainer: {
        flexDirection: 'row'
    },
    marginLeft: {
        marginLeft: 10
    }
});

export default ContentInfo;

import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PostInformation } from '../../redux/reducers/postReducer';
import colors from '../../styles/colors';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';
import { ApplicationState } from '../../redux/reducers';
import { fetchSubforumPostOverview } from '../../redux/actions/subforumQueries';
import Card from '../../components/cards/Card';

interface ForumPostOverviewScreenProps {
    callFetchPostOverview?(payload: number): void;
    //callFetchPostComments?(payload: number): void; // må kanskje ha støtte for page
    data?: PostInformation;
    viewPostId?: number;
    error?: string;
}

const ForumPostOverviewScreen: React.FC<ForumPostOverviewScreenProps> = (
    props
) => {
    const { callFetchPostOverview, data, viewPostId, error = null } = props;

    useEffect(() => {
        if (viewPostId) {
            callFetchPostOverview(viewPostId);
            console.log(
                `ForumPostOverViewScreen: useEffect(), viewPostId: ${viewPostId}`
            );
        }
    }, [viewPostId]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#ecf0f1' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card>
                    <View style={styles.image}>
                        <Image
                            style={styles.postImage}
                            source={require('../../assets/norskekjottkaker.jpg')}
                        />
                    </View>

                    <View>
                        <View style={{ alignItems: 'center' }}>
                            {data !== null ? (
                                <Text style={styles.titleText}>
                                    {data.overview.subforum_post_list_name}
                                </Text>
                            ) : (
                                <FloatingLoadingSpinner />
                            )}
                        </View>
                    </View>

                    <View style={styles.ingredients}>
                        <Text>Her kommer INGREDIENTS</Text>
                    </View>

                    <View style={styles.postContent}>
                        <View>
                            <Text>Method</Text>
                        </View>
                        <View style={styles.dottedLine}>
                            <View style={styles.dotStyle} />
                        </View>
                        <View>
                            {data !== null ? (
                                <Text style={{}}>
                                    {
                                        data.overview
                                            .subforum_post_list_description
                                    }
                                </Text>
                            ) : (
                                <FloatingLoadingSpinner />
                            )}
                        </View>
                    </View>

                    <View style={styles.comments}>
                        <Text>Her kommer COMMENTS</Text>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        marginTop: StatusBar.currentHeight,
        padding: 5
    },
    image: {
        overflow: 'hidden',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    postImage: {
        height: 350,
        width: '100%'
    },
    postContent: {
        padding: 30,
        // height: 400,
        // alignItems: 'center'
    },
    ingredients: {
        height: 400,
        backgroundColor: colors.red
    },
    comments: {
        height: 300,
        backgroundColor: colors.secondary
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'Roboto',
        marginBottom: 10,
    },
    dottedLine: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'dashed',
        zIndex: 0
    },
    dotStyle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        zIndex: 1
    }
});

const mapStateToProps = (state: ApplicationState, ownProps: any) => ({
    ...ownProps,
    data: state.postReducer.activeViewPost,
    error: state.postReducer.error,
    viewPostId: state.postReducer.referToNewPostId
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            callFetchPostOverview: (payload: number) =>
                fetchSubforumPostOverview(payload)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForumPostOverviewScreen);

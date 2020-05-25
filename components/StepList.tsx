import React from 'react';
import { View, Text, Button, Picker, StyleSheet, Platform, StatusBar, ViewPropTypes } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import TextItem from '../components/containers/TextItem';
import { bindActionCreators, Dispatch } from 'redux';
import { RecipeSteps, postAddStep } from '../redux/actions/stepAction';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux/reducers';

interface StepListProps {
    stepItems?: RecipeSteps[];
    addStep?(payload: string): void;
}

const StepList: React.FC<StepListProps> = (props) => {

    return (
        <View>
            <FlatList
                data={props.stepItems}
                keyExtractor={(item) => `${item.stepNo}`}
                renderItem={({ item, index }) => {
                    return <TextItem {...item}/>;
                }}
            />
        </View>
    );

};

const mapStateToProps = (state: ApplicationState, ownProps: any) => ({
    ...ownProps,
    stepItems: state.stepReducer.steps
});

const mapDiscpatchToProps = (dispatch: Dispatch) => {
    bindActionCreators(
        {
        addStep: (payload: string) => postAddStep(payload)
    },
        dispatch
    );
};

export default connect(mapStateToProps, mapDiscpatchToProps)(StepList);
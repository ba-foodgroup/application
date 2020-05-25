import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import colors from '../../styles/colors';
import InputField from '../form/InputField';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { ApplicationState } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { RecipeSteps, postAddStep } from '../../redux/actions/stepAction';

import { connect } from 'react-redux';


export interface AddItemProps {
    postStepItems?: RecipeSteps[];
    addStep?(payload: string): void;
}



const AddItemInput: React.FC<AddItemProps> = (props) => {
    const [text, setText] = useState('');

    return (
        <View style={{flex: 1}}>
            <View style={styles.containerRow}>
                <TextInput
                    placeholder='Egg 6stk...'
                    style={styles.textInput}
                    autoFocus={true}
                    onChangeText={(text) => {
                        setText(text);
                    }}
                    value={text}
                />
                <TextInput
                    placeholder='24 kr..'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Rema1000'
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={() => {
                    setText('');
                    props.addStep(text);
                }}>
                <View style={styles.addCross}>
                    <Ionicons name='md-add' size={30} />
                </View>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: colors.black, height: "100%"}}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerRow: {
        flexDirection: 'row',
        // marginHorizontal: 20,
    },
    textInput: {
        flex: 1,
        height: 50,
        padding: 5, 
        borderWidth: 1,
        borderColor: "#f2f2e1",
        backgroundColor: "#eaeaea",
    },
    addCross: {
        height: 50,
        backgroundColor: "#eaeaea",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }
});

const mapStateToProps = (state: ApplicationState, ownProps: any) => ({
    ...ownProps,
    postStepItems: state.stepReducer.steps
});

const mapDiscpatchToProps = (dispatch: Dispatch) => {
    bindActionCreators(
        {
            addStep: (payload: string) => postAddStep(payload),
        },
        dispatch
    );
};

// export default connect(mapStateToProps, mapDiscpatchToProps)(AddItemInput);
export default AddItemInput;
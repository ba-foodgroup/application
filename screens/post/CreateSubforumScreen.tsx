import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import StepWizard, { WizardRefObject } from '../../components/form/StepWizard';
import { SubforumCategory, fetchSubforumCategoriesComplete } from '../../redux/actions/forumAction';
import { ApplicationState } from '../../redux/reducers';
import { fetchSubforumMemberships, fetchSubforumCategories } from '../../redux/actions/subforumQueries';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';
import RoundedButton from '../../components/buttons/RoundedButton';
import InputField from '../../components/form/InputField';
import colors from '../../styles/colors';
import { TextInput } from 'react-native-gesture-handler';

interface CreateSubforumScreenProps {
    callFetchSubforumCategories?(): () => void,
    subforumCategories: Array<SubforumCategory>
}

interface CreateSubforumValues {
    name: string;
    category: number;
}

const step1ValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(4, "Name must be at least 4 characters.")
        .max(16, "Name cannot be longer than 16 characters"),
    category: yup.number()
});

const validationSchemaStepList = [step1ValidationSchema];

const CreateSubforumScreen: React.FC<CreateSubforumScreenProps> = (props) => {
    const wizard = useRef<WizardRefObject>();
    const [isFirstStep, setIsFirstStep] = useState<boolean>();
    const [isLastStep, setIsLastStep] = useState<boolean>();
    const [currentStep, setCurrentStep] = useState<number>();

    const formik = useFormik<CreateSubforumValues>({
        initialValues: {
            category: -1,
            name: ""
        },
        onSubmit: (values, bag) => {
            console.log(`CreateSubforumScreen:submit(${values})`);
            if (isLastStep) {
                console.log("Er siste step, på tide å submitte!");
            } else {
                bag.setTouched({});
                bag.setSubmitting(false);
                wizard?.current.next();
            }
        },
        validationSchema: validationSchemaStepList[currentStep]
    });

    const stepList = [
        {
            content: (
                <View>
                    <View style={{ margin: 10 }}>
                        <InputField
                            label="Name"
                            placeholder="Enter the name of your subforum"
                            inputType="text"
                            labelColor="black"
                            textColor="black"
                            borderBottomColor={colors.black}
                            inputStyle={{ borderBottomWidth: 1, justifyContent: 'center' }}
                            onChange={(text) => formik.setFieldValue('name', text)}
                            onBlur={() => formik.setFieldTouched('name')}
                        />

                        {props.subforumCategories !== undefined ? (
                            <Picker
                            style={{ height: 50, width: 50 }}
                            onValueChange={(value, pos) => {
                                formik.setFieldValue('category', value);
                            }}
                        >
                            {props.subforumCategories.map((value, index) => {
                                <Picker.Item
                                    key={`id-${index}`}
                                    label={value.name}
                                    value={value.id}
                                />
                            })}
                        </Picker>
                        ) : (
                            <FloatingLoadingSpinner size={"large"} />
                        )}
                        )}
                    </View>
                </View>
            ),
            title: 'Step 1',
            description: 'Just testing for now'
        },
        {
            content: (
                <View>
                    <Text>Dette er steg 2</Text>
                </View>
            ),
            title: "Step 2",
            description: "Nothing here yet",
        },
        {
            content: (
                <View>
                    <Text>Dette er steg 3 (siste)</Text>
                    <RoundedButton label="Publiser" onPress={formik.handleSubmit} />
                </View>
            ),
            title: "Step 3",
            description: "Nothing here either yet",
        },
    ];

    useEffect(() => {
        props.callFetchSubforumCategories();
        console.log("PostWizardScreen: useEffect()");
    }, []);

    return (
        <View style={styles.container}>
            <StepWizard
                ref={wizard}
                steps={stepList}
                isFirstStep={(val) => setIsFirstStep(val)}
                isLastStep={(val) => setIsLastStep(val)}
                onNext={() => {
                    console.log("Next step has been called.");
                }}
                onPrevious={() => {
                    console.log("Previous step has been called.");
                }}
                currentStep={(currentStep, isFirstStep, isLastStep) => {
                    setCurrentStep(currentStep);
                }}
            />
            <View style={styles.buttonContainer}>
                {/* TODO: Sjekk ut active color  */}
                <RoundedButton
                    label="<"
                    buttonStyle={styles.button}
                    disabled={isFirstStep}
                    onPress={() => wizard?.current?.previous()}
                />
                {/* Dots */}
                <View style={{ flexDirection: "row", margin: 20 }}>
                    {stepList.map((value, index) => (
                        <View
                            key={`step-indicator-${index}`}
                            style={{
                                width: 10,
                                marginHorizontal: 5,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: index === currentStep ? "#fc0" : "#000",
                            }}
                        />
                    ))}
                </View>
                <RoundedButton
                    label=">"
                    buttonStyle={styles.button}
                    disabled={isLastStep}
                    onPress={() => wizard?.current?.next()}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.primaryColor
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        justifyContent: "space-evenly",
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    subforumCategories: state.forumReducer.subforumCategories
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            callFetchSubforumCategories: () => fetchSubforumCategories(),
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubforumScreen);
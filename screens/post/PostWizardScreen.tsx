import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Picker,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

import StepWizard, { WizardRefObject } from '../../components/form/StepWizard';
import { SubforumUserMembership } from '../../redux/actions/forumAction';
import { ApplicationState } from '../../redux/reducers';
import {
    fetchSubforumMemberships,
    postGeneralToForum,
    postRecipeToForum
} from '../../redux/actions/subforumQueries';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';
import RoundedButton from '../../components/buttons/RoundedButton';
import InputField from '../../components/form/InputField';
import colors from '../../styles/colors';
import { FlatList } from 'react-native-gesture-handler';
import { UserPost, UserRecipePost } from '../../redux/actions/postAction';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
interface PostWizardScreenProps {
    callFetchSubforums?(): () => void;
    createPost?(payload: UserPost): void;
    createRecipePost?(payload: UserRecipePost): void;
    addStep?(payload: string): void;
    subforums: Array<SubforumUserMembership>;
    subforumsReceived: Date | null;
    error: string;
    referToPostId?: number;
    navigation?: any;
    stepNo?: number;
    stepText?: string;
    postedRecipeId?: number;
}

interface RecipeItem {
    name: string;
    cost: number;
    retailer?: string;
}

interface PostFormValues {
    subforum_id: number;
    title: string;
    description: string;
    ingredients?: RecipeItem[];
    time: number;
    difficulty: number;
}

const step1ValidationSchema = yup.object().shape({
    subforum_id: yup.number(),
    title: yup
        .string()
        .required('Required')
        .min(4, 'Title must be at least 4 characters.')
        .max(32, 'Title cannot be longer than 32 characters.'),
    description: yup
        .string()
        .required('Required')
        .max(1024, 'Description cannot be longer than 1024 characters'),
    difficulty: yup.number(),
    time: yup.number()
});

const step2ValidationSchema = yup.object().shape({
    ingredients: yup.array().of(
        yup.object().shape({
            name: yup
                .string()
                .required('Required')
                .max(32, 'Name cannot be longer than 32 characters')
                .min(2, 'Name cannot be shorter than 2 characters.'),
            cost: yup.number().required('Required'),
            retailer: yup.string().notRequired()
        })
    )
});

// Valideringskjema for de forskjellige stegene. stepList må deklareres etter useFormik hook
const validationSchemaStepList = [step1ValidationSchema, step2ValidationSchema];

interface AddRecipeItemRowProps {
    currentStep: number;
    setFieldValue: (name: string, value: string) => void;
    setFieldTouched: (name: string) => void;
    values: RecipeItem
}

const initialRecipeItem: RecipeItem = { name: '', cost: 0, retailer: '' };

const AddRecipeItemRow: React.FC<AddRecipeItemRowProps> = (
    props: AddRecipeItemRowProps
) => {
    const { setFieldValue, setFieldTouched, currentStep, values = initialRecipeItem } = props;
    const { name = '', cost = 0, retailer = ''} = values;

    return (
        <>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <View style={{ flex: 1 }}>
                    <InputField
                        label='Name'
                        inputType='text'
                        placeholder='5kg potato'
                        labelColor='black'
                        textColor='white'
                        borderBottomColor={colors.black}
                        inputStyle={{
                            borderBottomWidth: 1,
                            justifyContent: 'center'
                        }}
                        onChange={(text) =>
                            setFieldValue(
                                `ingredients.${currentStep}.name`,
                                text
                            )
                        }
                        value={name}
                        onBlur={() => setFieldTouched(`ingredients.${currentStep}.name`)}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <InputField
                        label='Cost'
                        placeholder='12.45$'
                        inputType='number'
                        labelColor='black'
                        textColor='white'
                        borderBottomColor={colors.black}
                        inputStyle={{
                            borderBottomWidth: 1,
                            justifyContent: 'center'
                        }}
                        onChange={(text) =>
                            setFieldValue(
                                `ingredients.${currentStep}.cost`,
                                text
                            )
                        }
                        onBlur={() => setFieldTouched(`ingredients.${currentStep}.cost`)}
                        value={`${cost}`}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <InputField
                        label='Retailer'
                        placeholder='Walmart'
                        inputType='text'
                        labelColor='black'
                        textColor='white'
                        borderBottomColor={colors.black}
                        inputStyle={{
                            borderBottomWidth: 1,
                            justifyContent: 'center'
                        }}
                        onChange={(text) =>
                            setFieldValue(
                                `ingredients.${currentStep}.retailer`,
                                text
                            )
                        }
                        onBlur={() => setFieldTouched(`ingredients.${currentStep}.retailer`)}
                        value={retailer}
                    />
                </View>
            </View>
        </>
    );
};

const PostWizardScreen: React.FC<PostWizardScreenProps> = (props) => {
    const wizard = useRef<WizardRefObject>();
    const [isFirstStep, setIsFirstStep] = useState<boolean>();
    const [isLastStep, setIsLastStep] = useState<boolean>();
    const [currentStep, setCurrentStep] = useState<number>();
    const [selectedImage, setSelectedImage] = React.useState(null);

    const [currentIngredientStep, setCurrentIngredientStep] = useState<number>(
        1 //Start med 1
    );

    const formik = useFormik<PostFormValues>({
        initialValues: {
            subforum_id: -1,
            title: '',
            description: '',
            ingredients: [],
            time: -1,
            difficulty: -1
        },
        initialErrors: {
            title: 'Required',
            description: 'Required'
        },
        onSubmit: (values, bag) => {
            console.log(`PostWizardScreen:submit(${values})`);
            if (isLastStep) {
                console.log('Kaller createPost');
                props.createPost({
                    subforum_id: values.subforum_id,
                    title: values.title,
                    description: values.description
                });
                console.log('Er siste step, submitter!');
            } else {
                bag.setTouched({});
                bag.setSubmitting(false);
                wizard?.current.next();
            }
        },
        validationSchema: validationSchemaStepList[currentStep]
    });

    useEffect(() => {
        if (props.referToPostId) {
            // Naviger til postoverview om det ikke er en oppskrift
            if (formik.values.ingredients.length == 0) {
                console.warn('Navigate to post id ' + props.referToPostId);
                props.navigation.navigate('ForumPostOverviewScreen');
            } else {
                // Post oppksrift
                if (!props.postedRecipeId) {
                    props.createRecipePost({
                        subforum_id: formik.values.subforum_id,
                        subforum_post_list_id: props.referToPostId,
                        items: formik.values.ingredients,
                        difficulty: formik.values.difficulty,
                        time_estimate: formik.values.time
                    });
                } else {
                    console.warn(
                        'Navigate to post (recipe) id ' + props.referToPostId
                    );
                    props.navigation.navigate('ForumPostOverviewScreen');
                }
            }
        }
    }, [props.referToPostId, props.postedRecipeId]);

    const openImagePicker = async () => {
        let permissionResult =  await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access the camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.warn(pickerResult);

        if (pickerResult.cancelled == true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    }

    const stepList = [
        {
            content: (
                <View style={{ padding: 10 }}>
                    <InputField
                        label='Title'
                        placeholder='This is my title..'
                        inputType='text'
                        labelColor='black'
                        textColor='black'
                        borderBottomColor={colors.black}
                        inputStyle={{
                            borderBottomWidth: 1,
                            justifyContent: 'center'
                        }}
                        value={formik.values.title}
                        onChange={(text) => formik.setFieldValue('title', text)}
                        onBlur={() => formik.setFieldTouched('title')}
                    />
                    {formik.errors.title && <Text style={styles.error}>{formik.errors.title}</Text>}
                    <InputField
                        label='Description'
                        placeholder='Why is this recipe great?'
                        inputType='text'
                        labelColor='black'
                        textColor='black'
                        borderBottomColor={colors.black}
                        inputStyle={{
                            borderBottomWidth: 1,
                            justifyContent: 'center'
                        }}
                        value={formik.values.description}
                        onChange={(text) =>
                            formik.setFieldValue('description', text)
                        }
                        onBlur={() => formik.setFieldTouched('description')}
                    />
                    {formik.errors.description && <Text style={styles.error}>{formik.errors.description}</Text>}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text>Where do you want to post this?</Text>
                        <View style={{ alignItems: 'center' }}>
                            {props.subforums !== null && props.subforums.length > 0 ? (
                                <Picker
                                    selectedValue={formik.values.subforum_id}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(value, pos) => {
                                        formik.setFieldValue(
                                            'subforum_id',
                                            value
                                        );
                                    }}
                                    prompt='Selected subforum'
                                >
                                    {props.subforums.map((value, index) => (
                                        <Picker.Item
                                            key={`id-${index}`}
                                            label={value.subforum_name}
                                            value={value.subforum_id}
                                        />
                                    ))}
                                </Picker>
                            ) : (
                                <FloatingLoadingSpinner size={'large'} />
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        <Text>Add a photo</Text>
                        <TouchableOpacity
                            onPress={() => openImagePicker()}
                        >
                            {selectedImage != null && (
                                <View style={styles.container}>
                                    <Image
                                        source={{ uri: selectedImage.localUri }}
                                        style={styles.thumbnail}
                                    />
                                </View>
                            )}
                            <FontAwesome
                                name='photo'
                                size={24}
                                color='black'
                                style={{ marginHorizontal: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            title: 'Select your subforum',
            description: 'Select the subforum that you intend to publish in'
        },
        {
            content: (
                <View style={styles.recipe}>
                    <View style={styles.recipeDetails}>
                        <Text style={styles.headerText}>Details</Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 5,
                                marginTop: 10
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <InputField
                                    label='Time in minutes'
                                    placeholder='90'
                                    inputType='text'
                                    labelColor='black'
                                    textColor='black'
                                    borderBottomColor={colors.black}
                                    inputStyle={{
                                        borderBottomWidth: 1,
                                        justifyContent: 'center'
                                    }}
                                    value={`${formik.values.time}`}
                                    onChange={(text) =>
                                        formik.setFieldValue('time', text)
                                    }
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField
                                    label='Difficulty 1-5'
                                    placeholder='1'
                                    inputType='number'
                                    labelColor='black'
                                    textColor='black'
                                    borderBottomColor={colors.black}
                                    inputStyle={{
                                        borderBottomWidth: 1,
                                        justifyContent: 'center'
                                    }}
                                    value={`${formik.values.difficulty}`}
                                    onChange={(text) =>
                                        formik.setFieldValue('difficulty', text)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.headerText}>Recipe items</Text>
                    <View
                        style={{
                            minHeight: '10%',
                            maxHeight: '40%'
                        }}
                    >
                        <FlatList
                            data={Array.from({ length: currentIngredientStep })}
                            renderItem={({ index }) => (
                                <AddRecipeItemRow
                                    key={`idx:${index}`}
                                    currentStep={index}
                                    setFieldValue={formik.setFieldValue}
                                    setFieldTouched={formik.setFieldTouched}
                                    values={formik.values.ingredients[index]}
                                />
                            )}
                            keyExtractor={(item, index) => `idx:${index}`}
                            keyboardShouldPersistTaps='always'
                            keyboardDismissMode='none'
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                // Må sjekke at recipeitem er gyldig. I så fall legg til + øk indeks
                                setCurrentIngredientStep(
                                    currentIngredientStep + 1
                                );
                            }}
                        >
                            <View style={styles.addCross}>
                                <Ionicons name='md-add' size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottom}>
                        <RoundedButton
                            label='Publiser'
                            onPress={formik.handleSubmit}
                        />
                        {props.error && (
                            <Text style={styles.error}>{props.error}</Text>
                        )}
                    </View>
                </View>
            ),
            title: 'Step 2',
            description: 'Nothing here either yet'
        }
    ];

    useEffect(() => {
        if (props.subforums !== null && props.subforums.length > 0) {
            if (props.subforumsReceived !== null && props.subforumsReceived instanceof Date) {
                const timeMsBetween =
                    (new Date().getTime() - props.subforumsReceived.getTime());

                // Ikke fetch om data er mindre enn 2 minutter gammelt
                if (timeMsBetween < 120000) {
                    return;
                }
            }
        }
        props.callFetchSubforums();
        console.log('PostWizardScreen: useEffect()');
    }, []);

    const handleNext = () => {
        // Debugging warning, do not go to next screen if there are errors
        console.warn(formik.errors);
        if (Object.keys(formik.errors).length === 0) {
            wizard?.current?.next();
        }
    }

    return (
        <View style={styles.container}>
            <StepWizard
                ref={wizard}
                steps={stepList}
                isFirstStep={(val) => setIsFirstStep(val)}
                isLastStep={(val) => setIsLastStep(val)}
                onNext={() => {
                    console.log('Next step has been called.');
                }}
                onPrevious={() => {
                    console.log('Previous step has been called.');
                }}
                currentStep={(currentStep, isFirstStep, isLastStep) => {
                    setCurrentStep(currentStep);
                }}
            />

            <View style={styles.navButton}>
                {/* TODO: Sjekk ut active color  */}
                <RoundedButton
                    label='<'
                    buttonStyle={styles.button}
                    disabled={isFirstStep}
                    onPress={() => wizard?.current?.previous()}
                />
                {/* Dots */}
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    {stepList.map((value, index) => (
                        <View
                            key={`step-indicator-${index}`}
                            style={{
                                width: 10,
                                marginHorizontal: 5,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor:
                                    index === currentStep ? '#fc0' : '#000'
                            }}
                        />
                    ))}
                </View>
                <RoundedButton
                    label='>'
                    buttonStyle={styles.button}
                    disabled={isLastStep}
                    onPress={() => handleNext()}
                />
            </View>
        </View>
    );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
        // justifyContent: "center",
        // backgroundColor: colors.black
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    statusBar: {
        height: STATUSBAR_HEIGHT
    },
    appBar: {
        // backgroundColor: "#4566sdf",
        height: APPBAR_HEIGHT
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    navButton: {
        // flex: 1,
        width: '100%', //TODO: fiks?
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'space-evenly'
    },
    description: {
        borderWidth: 1,
        borderColor: colors.black
    },
    error: {
        color: colors.error,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonPublish: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 55,
        left: 25,
        right: 0
    },
    addCross: {
        height: 50,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    recipe: {
        height: '100%',
        padding: 10
        // backgroundColor: colors.primaryColor,
        // flex: 1,
    },
    recipeDetails: {
        elevation: 1
        // borderBottomColor:
    },
    headerText: {
        fontSize: 16
        //TODO: Valg av fontfamilie og tykkelse
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 60
    }
});

const mapStateToProps = (state: ApplicationState) => ({
    subforums: state.forumReducer.subforumMemberships.entries,
    subforumsReceived: state.forumReducer.subforumMemberships.received,
    error: state.postReducer.postToForumError,
    referToPostId: state.postReducer.referToNewPostId,
    postedRecipeId: state.postReducer.postedRecipeId
    // stepNo: state.stepReducer.stepNo,
    // stepText: state.stepReducer.stepText
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            callFetchSubforums: () => fetchSubforumMemberships(),
            createPost: (payload: UserPost) => postGeneralToForum(payload),
            createRecipePost: (payload: UserRecipePost) =>
                postRecipeToForum(payload)
            // addStep: (payload: string) => postAddStep(payload),
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PostWizardScreen);

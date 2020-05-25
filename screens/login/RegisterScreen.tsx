import InputField from '../../components/form/InputField';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import postRegister from '../../redux/actions/postRegister';
import RoundedButton from '../../components/buttons/RoundedButton';

import { useFormik } from 'formik';
import * as yup from 'yup';

import colors from '../../styles/colors';

import { ApplicationState } from '../../redux/reducers';
import { RegisterCredentials, loginRedirected } from '../../redux/actions/authAction';

interface RegisterScreenProps {
    callPostRegister?(payload: RegisterCredentials): void,
    error?: string,
    pending?: boolean,
    navigation?: any,
    redirected?(): void,
    loggingIn?: boolean
}

interface RegisterFormValues {
    username: string,
    password1: string,
    password2: string,
    email: string
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation, loggingIn=false, pending, callPostRegister, error, redirected}) => {
    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            username: '',
            password1: '',
            password2: '',
            email: ''
        },
        onSubmit: (values) => {
            console.log(values);
            if (!pending) {
                callPostRegister({ username: values.username, password: values.password1, email: values.email});
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string()
                .required('Username is required.')
                .min(2, 'Username must be at least 2 characters.')
                .max(32, 'Username cannot be longer than 32 characters.'),
            password1: yup.string()
                .required('Password is required.')
                .min(6, 'Password must be at lost 6 characters, but should be longer!')
                .max(32, 'Password cannot be longer than 32 characters.'),
            password2: yup.string()
                .oneOf([yup.ref('password1'), null], 'Passwords must match.'),
            email: yup.string()
                .required('Email is required.')
                .email('The email you entered is invalid.')
        })
    });

    if (loggingIn) {
        if (!pending) {
            navigation.navigate('ForumHomeScreen');
            redirected();
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logoImg} />
            <Text style={styles.tittle}>Create an account</Text>
            <View style={styles.test}>
                <InputField
                    label='Enter your username here'
                    inputType='text'
                    placeholder='johnny11'
                    labelColor='white'
                    textColor='white'
                    borderBottomColor={colors.primary}
                    inputStyle={{ borderBottomWidth: 1, justifyContent: "center" }}
                    value={formik.values.username}
                    onChange={(text) => formik.setFieldValue('username', text)}
                    onBlur={() => formik.setFieldTouched('username')}
                />
                {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
                <InputField
                    label='Enter your email here'
                    inputType='text'
                    placeholder='john@email.com'
                    labelColor='white'
                    textColor='white'
                    borderBottomColor={colors.primary}
                    inputStyle={{ borderBottomWidth: 1, justifyContent: "center" }}
                    value={formik.values.email}
                    onChange={(text) => formik.setFieldValue('email', text)}
                    onBlur={() => formik.setFieldTouched('email')}
                />
                {formik.errors.email && <Text style={styles.error}>{formik.errors.email}</Text>}
                <InputField
                    label='Enter your password here'
                    inputType='password'
                    placeholder='******'
                    labelColor='white'
                    textColor='white'
                    borderBottomColor={colors.primary}
                    inputStyle={{ borderBottomWidth: 1, justifyContent: "center" }}
                    value={formik.values.password1}
                    onChange={(text) => formik.setFieldValue('password1', text)}
                    onBlur={() => formik.setFieldTouched('password1')}
                />
                {formik.errors.password1 && <Text style={styles.error}>{formik.errors.password1}</Text>}
                <InputField
                    label='Confirm your password here'
                    inputType='password'
                    placeholder='******'
                    labelColor='white'
                    textColor='white'
                    borderBottomColor={colors.primary}
                    inputStyle={{ borderBottomWidth: 1, justifyContent: "center" }}
                    value={formik.values.password2}
                    onChange={(text) => formik.setFieldValue('password2', text)}
                    onBlur={() => formik.setFieldTouched('password2')}
                />
                {formik.errors.password2 && <Text style={styles.error}>{formik.errors.password2}</Text>}
                {error && <Text style={styles.error}>{error}</Text>}
            </View>
            <RoundedButton
                label='Register'
                onPress={formik.handleSubmit}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003f5c"
  },
  logoImg: {
    width: 280,
    height: 210,
    // flex: 1 //Testing, sjekk denne om endring av størrelse
  },
  tittle: {
    color: "#f7c744",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20
  },
  test: {
    width: "80%"
  },
  error: {
    color: colors.error,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16
  }
});

const mapStateToProps = (state: ApplicationState) => ({
    pending: state.authReducer.pending,
    error: state.authReducer.error,
    loggingIn: state.authReducer.loggingIn
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    callPostRegister: (payload: RegisterCredentials) => postRegister(payload),
    redirected: () => loginRedirected()
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScreen);

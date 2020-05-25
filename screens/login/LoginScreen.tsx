import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  useFormik } from 'formik';
import * as yup from 'yup';

import InputField from '../../components/form/InputField';
import colors from '../../styles/colors';

import { LoginCredentials, loginRedirected } from '../../redux/actions/authAction';
import postLogin from '../../redux/actions/postLogin';
import { ApplicationState } from '../../redux/reducers';
import RoundedButton from '../../components/buttons/RoundedButton';
import ClickableText from '../../components/ClickableText';
import FloatingLoadingSpinner from '../../components/FloatingLoadingSpinner';

interface LoginScreenProps {
  callPostLogin?(payload: LoginCredentials): void,
  username?: string,
  error?: string,
  pending: boolean,
  values: LoginFormValues,
  navigation?: any,
  redirected?(): void,
  loggingIn?: boolean
}

interface LoginFormValues {
  username: string,
  password: string
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, loggingIn=false, pending, callPostLogin, error, redirected}) => {
  if (loggingIn) {
    // logged in?
    if (!pending && !error) {
      navigation.navigate('ForumHomeScreen');
      redirected();
    }
  }

  const onClickRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const formik = useFormik({
    initialValues: {
      username: '', //For raskere testing på mobil
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);
      if (!pending) {
        callPostLogin(values);
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Username is required'),
      password: yup.string()
        .required('Password is required!')
        .min(6, 'Password needs to be longer than 6 characters!')
        .max(32, 'Password cannot be longer than 32 characters!')
    })
  });

  return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <StatusBar backgroundColor='#6a51ae' barStyle='default' />
          {/* <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImg}
          /> */}
          <Text style={styles.tittle}>FoodGroup</Text>
          {pending && <FloatingLoadingSpinner size='large' />}
          <View style={styles.test}>
              <InputField
                  label='Enter your username here'
                  inputType='text'
                  labelColor='white'
                  textColor='white'
                  borderBottomColor={colors.primary}
                  inputStyle={{
                      borderBottomWidth: 1,
                      justifyContent: 'center'
                  }}
                  value={formik.values.username}
                  onChange={(text) => formik.setFieldValue('username', text)}
                  onBlur={() => formik.setFieldTouched('username')}
                  placeholder='Username'
              />
              {formik.errors.username && (
                  <Text style={styles.error}>{formik.errors.username}</Text>
              )}
              <InputField
                  label='Enter your password here'
                  inputType='password'
                  labelColor='white'
                  textColor='white'
                  borderBottomColor={colors.primary}
                  inputStyle={{
                      borderBottomWidth: 1,
                      justifyContent: 'center'
                  }}
                  value={formik.values.password}
                  onChange={(text) => formik.setFieldValue('password', text)}
                  onBlur={() => formik.setFieldTouched('password')}
                  placeholder='*******'
                  onSubmitEditing={() => formik.handleSubmit()}
              />
              {formik.errors.password && (
                  <Text style={styles.error}>{formik.errors.password}</Text>
              )}
          </View>
          <ClickableText
              label="Don't have an account? Register here!"
              marginTop={0}
              marginBottom={15}
              onClick={onClickRegister}
          />
          <RoundedButton
              label='Login'
              buttonStyle={[styles.btnLogColor, styles.buttonMargin]}
              onPress={formik.handleSubmit}
              disabled={pending}
          />
          {error && <Text style={styles.error}>{error}</Text>}
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50'
    },
    tittle: {
        color: '#f7c744',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 40
    },
    logoImg: {
        width: 180,
        height: 110
        // flex: 1, //Testing, sjekk denne om endring av størrelse
    },
    test: {
        width: '80%'
    },
    btnLogColor: {
        backgroundColor: '#c14d53'
    },
    btnRegColor: {
        backgroundColor: colors.primary
    },
    buttonMargin: {
        marginBottom: 20
    },
    error: {
        color: colors.error,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16
    }
});

const mapStateToProps = (state: ApplicationState) => ({
  username: state.authReducer.username,
  error: state.authReducer.error,
  pending: state.authReducer.pending,
  loggingIn: state.authReducer.loggingIn
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  callPostLogin: (payload: LoginCredentials) => postLogin(payload),
  redirected: () => loginRedirected()
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
// LoginScreen.js
import React, {useEffect, useState} from 'react';
import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator, StyleSheet, Alert, Dimensions, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import jwt_decode from 'jwt-decode';

import CurvedTextInput from '../components/CurvedTextInput';
import CustomButton from '../components/CustomButton';
import {
  emailHelperText,
  loginValidator,
  passwordHelperText,
} from '../utils/Validator';
import CurvedAlert from '../components/CurvedAlert';
import { _store_user_details } from '../local-storage/UserDetails';
import { _store } from '../local-storage/Authentication';

const screenWidth = Dimensions.get('window').width;
const screenHeigt = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const [email_helper, setEmail_helper] = useState();
  const [password_helper, setPassword_helper] = useState();
  const [active_status, setActive_status] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      if (userCredential){
        console.log('userCredential', userCredential);
        // var decoded = jwt_decode(userCredential);
      setTimeout(() => {
        _store(userCredential);
        setLoading(false);
        // _store_user_details(decoded);
        navigation.navigate('Home');
      }, 500);
      }
    } catch (error) {
      const parts = error.message.split('[auth/invalid-credential]');
      if (parts.length > 1) {
        const errorMessage  = parts[1].trim();
        console.log(errorMessage );
        setIsAlertVisible(true);
        setIsMessage(errorMessage );
      } else {
        console.log('Invalid credential substring not found', error);
      }
    }
    setLoading(false);
  };

  const togglePasswordVisibility = (pw, setPw) => {
    setPw(!pw);
  };

  const signUp = () => {
    // Navigate to the Home screen
      navigation.navigate('SignUp');
  };

  const hideKeyboard = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();
  };

  useEffect(() => {
    const validation_status = loginValidator(email, password);
    setEmail_helper(emailHelperText(email));
    setPassword_helper(passwordHelperText(password));
    setActive_status(validation_status);
  }, [email, password]);

  return (
    <ScrollView 
    // scrollEnabled={false}
    style={{flex: 1}}
      //  contentContainerStyle={{flexGrow: 1}}
       keyboardShouldPersistTaps='handled'
      >
    <TouchableWithoutFeedback onPress={hideKeyboard} style={{maxHeight: screenHeigt}}>
    {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
    <View style={styles.container}>
    <View style={styles.haedContainer}>
      <Text style={styles.heading}>Welcome to</Text>
      <Image source={require('../assets/title.png')}/>
    </View>
    <ImageBackground
        source={require('../assets/signup-bg.png')}
        style={styles.backgroundImage}
    >
    <View style={styles.view}>
    <CurvedAlert
      visible={isAlertVisible}
      onClose={() => (setIsAlertVisible(false))}
      onOK={() => (setIsAlertVisible(false))}
      message={isMessage}
    />
      <Image source={require('../assets/loginImg.png')} style={styles.loginImage} />
      <Text style={styles.text}>Please sign in to continue:</Text>
      <CurvedTextInput
        text="Email *"
        placeholder={''}
        value={email}
        onChangeText={(newText) => setEmail(newText)}
      />
      {email_helper?.status ? 
      <Text style={{color: 'red', paddingBottom: 10}}>* {email_helper?.message}</Text>:''
      }
      <CurvedTextInput
        text="Password *"
        placeholder={''}
        value={password}
        isPw={true}
        isPasswordSecure={!isPasswordVisible}
        onChangeText={(newText) => setPassword(newText)}
        togglePasswordVisibility={() => togglePasswordVisibility(isPasswordVisible,setIsPasswordVisible)}
      />
      {password_helper?.status ? 
      <Text style={{color: 'red', paddingBottom: 10}}>* {password_helper?.message}</Text>:''
      }
      <View style={styles.space}/>
      {loading ? (
          <ActivityIndicator size="large" color="#E41A3E" />
          ) : (
          <CustomButton
            disable={email === '' || password === '' }
            containerStyle={{alignSelf: 'center'}}
            // opacity={email === '' || password === '' ? 0.5 : 1}
            text={'Sign In'}
            onPress={handleLogin}
            status={active_status}
          /> )}
      <Text style={{color: '#434343', paddingTop: 10}}>Forget Password?</Text>
      <View style={styles.signUpContainer}>
          <Text style={{color: '#434343'}}>Don't have an account? </Text>
          <TouchableOpacity onPress={signUp}>
          <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          {/* <CustomButton
          disable={email === '' || password === ''}
          // opacity={email === '' || password === '' ? 0.5 : 1}
          text={'Sign Up'}
          onPress={signIn}
          secondary={true}
          /> */}
        </View>
        <View style={styles.iconView}>
        <Image style={styles.icons} source={require('../assets/fbIcon.png')}/>
        <Image source={require('../assets/gmailIcon.png')}/>
        </View>
        </View>
    </ImageBackground>
    </View>
    {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: screenWidth,
    // height: screenHeigt,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FDE24B',
    // flexDirection: 'column',
  },
  haedContainer:{
    flex: 1,
    // backgroundColor: '#000000',
    padding: 15,
    paddingTop: 30,
    alignItems: 'center',
  },
  heading:{
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'proxima nova',
  },
  title: {
    fontSize: 55,
    fontWeight: '900',
    fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 20,
  },
  backgroundImage:{
    // flex: 10,
    resizeMode: 'cover',
    // backgroundColor: '#FDE24B',
    width: '100%',
    height: '100%',
  },
  view:{
    padding:10,
    paddingTop: 0,
    alignItems: 'center',
    // alignSelf: 'center',
  },
  loginImage: {
    marginBottom: 5,
    alignSelf: 'center',
    width: 330,
    height: 320,
    resizeMode: 'contain'},
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 15,
  },
  input: {
    // width: '80%',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  space: {
    paddingTop: 10,
    },
  signUpContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: '#F15F0D',
      fontFamily: 'proxima nova',
  },
  iconView: {
    marginTop: 25,
    flexDirection: 'row',
  },
  icons: {
    marginRight: 10,
  },
});

export default LoginScreen;

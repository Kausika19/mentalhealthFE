// LoginScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator, StyleSheet, Alert, Dimensions, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import firebase from '@react-native-firebase/app';

import CurvedTextInput from '../components/CurvedTextInput';
import CustomButton from '../components/CustomButton';
import {
  emailHelperText,
  loginValidator,
  passwordHelperText,
  passwordMatcherHelperText,
} from '../utils/Validator';
import CurvedAlert from '../components/CurvedAlert';
import {storeUserDetails} from '../utils/Firestore';

const screenWidth = Dimensions.get('window').width;
const screenHeigt = Dimensions.get('window').height;

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [gender, setGender] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const [email_helper, setEmail_helper] = useState();
  const [password_helper, setPassword_helper] = useState();
  const [confirmPass_helper, setConfirmPass_helper] = useState();
  const [active_status, setActive_status] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (gender === '' || name === ''){
      if (name === ''){
        showMessage({
          message: 'Please enter your name',
          type: 'danger',
        });
      } else if (gender === ''){
        showMessage({
          message: 'Please enter your gender',
          type: 'danger',
        });
      }
    } else {
      try {
        setLoading(true);
        const response = await auth().createUserWithEmailAndPassword(email, password);
        console.log('User signed up successfully!', response.user.uid);
        if (response.user.uid){
          storeUserDetails(response.user.uid, name, gender, setIsAlertVisible, setIsMessage);
          setLoading(false);
          showMessage({
            message: 'Your account has been successfully created!',
            type: 'success',
          });
          navigation.navigate('Login');
        }
      } catch (error) {
        const parts = error.message.split('[auth/email-already-in-use]')
        if (parts.length > 1) {
          const errorMessage  = parts[1].trim();
          console.log(errorMessage );
          setIsAlertVisible(true);
          setIsMessage(errorMessage );
        } else {
          console.log('Invalid credential substring not found');
        }
      }
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (pw, setPw) => {
    setPw(!pw);
  };

  const signIn = () => {
    // Navigate to the Home screen
      navigation.navigate('Login');
  };

  const hideKeyboard = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();
  };

  useEffect(() => {
    const validation_status = loginValidator(email, password);
    setEmail_helper(emailHelperText(email));
    setPassword_helper(passwordHelperText(password));
    setConfirmPass_helper(passwordMatcherHelperText(password, confirmPass));
    setActive_status(validation_status);
  }, [email, password, confirmPass]);

  return (
    <ScrollView
      // scrollEnabled={false}
      // contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      keyboardShouldPersistTaps='handled'>
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
    {/* <Text style={styles.title}>Sign Up</Text> */}
      <CurvedTextInput
        text="Name *"
        placeholder={''}
        value={name}
        onChangeText={(newText) => setName(newText)}
      />
      <CurvedTextInput
        text="Email *"
        placeholder={''}
        value={email}
        onChangeText={(newText) => setEmail(newText)}
      />
      {email_helper?.status ? 
      <Text style={styles.helperText}>* {email_helper?.message}</Text>:''
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
      <Text style={styles.helperText}>* {password_helper?.message}</Text>:''
      }
      <CurvedTextInput
        text="Confirm Password *"
        placeholder={''}
        value={confirmPass}
        isPw={true}
        isPasswordSecure={!isConfirmPassVisible}
        onChangeText={(newText) => setConfirmPass(newText)}
        togglePasswordVisibility={() => togglePasswordVisibility(isConfirmPassVisible,setIsConfirmPassVisible)}
      />
      {confirmPass_helper?.status ? 
      <Text style={styles.helperText}>* {confirmPass_helper?.message}</Text>:''
      }
      <Text style={styles.gender}>Gender</Text>
      <View style={styles.iconView}>
      <TouchableOpacity onPress={() => setGender('male')} style={styles.okButton}>
      <Image style={[styles.icons, {borderColor: gender === 'male' ? '#26A5FC' : '#FFFFFF'}]} source={require('../assets/male.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('female')} style={styles.okButton}>
      {/* <Image style={styles.icons} source={require('../assets/female.png')}/> */}
      <Image style={[styles.icons, {borderColor: gender === 'female' ? '#FF356E' : '#FFFFFF'}]} source={require('../assets/female.png')}/>
      </TouchableOpacity>
      </View>
      <View style={styles.space}/>
      {loading ? (
        <ActivityIndicator size="large" color="#E41A3E" />
        ) : (
        <CustomButton
          disable={email === '' || password === '' || confirmPass !== password}
          // opacity={email === '' || password === '' ? 0.5 : 1}
          text={'Sign Up'}
          onPress={handleSignUp}
          status={active_status}
        /> )}
      <View style={styles.signInContainer}>
        <Text style={{color: '#434343'}}>Already have an account? </Text>
        <TouchableOpacity onPress={signIn}>
        <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
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
    flex: 1,
    resizeMode: 'cover',
    // width: screenWidth,
    height: '100%',
  },
  view1:{
    flex: 5,
    // alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',

  },
  helperText: {color: 'red', paddingBottom: 10},
  view:{
    padding:10,
    paddingTop: 55,
    alignItems: 'center',
    // alignSelf: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gender:{
      color: '#878787',
      fontSize: 18,
      marginBottom: -15,
      alignSelf:'center',
  },
  space: {
    paddingTop: 20,
    },
  signInContainer: {
    marginTop: 15,
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
    borderWidth: 2,
    borderRadius:25,
  },
});

export default SignUpScreen;

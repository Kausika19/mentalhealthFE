//JournalScreen.js
import React, {useState} from 'react';
import { View, Text, Image, ImageBackground, ScrollView, StyleSheet, Dimensions, ActivityIndicator, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import CurvedTextInput from '../components/CurvedTextInput';
import CustomButton from '../components/CustomButton';
import {predictEmotion} from '../api/EmotionDetection';

const screenWidth = Dimensions.get('window').width;
const screenHeigt = Dimensions.get('window').height;

const JournalScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const hideKeyboard = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();
  };

  const submit = async () => {
    console.log('start');
    setLoading(true);
    const result = await predictEmotion(JSON.stringify(text));
    console.log('result.sentiment', result.sentiment);
    setLoading(false);
    navigation.navigate('Result', {result: result.sentiment, text: text, page: 'journal'});

    // setEmotion(fetchData());
  };
  
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
    <View style={styles.container}>
     <TouchableWithoutFeedback
          style={{}}
          onPress={() => navigation.goBack()}
      >
          <Icon name="arrow-back-circle-outline" size={40} color="#000" /> 
      </TouchableWithoutFeedback>
      <View style={styles.view}>
      <Text style={styles.title}>How are you?</Text>
        <CurvedTextInput
          text="Write more detailed about how you feel about today. *"
          quesStyle={styles.questionText}
          answStyle={styles.answerText}
          value={text}
          placeholder={'I am feeling emotional...'}
          onChangeText={(newText) => setText(newText)}
          multiline={true}
        />
        <View style={styles.space}/>
        {loading ? (
          <ActivityIndicator size="large" color="#E41A3E" />
          ) : (
          <CustomButton
            disable={text === ''}
            text={'Submit'}
            onPress={submit}
            status={true}
            containerStyle={{backgroundColor: text === '' ? '#F15F0D50' : '#F15F0D'}}
          />
        )}
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 35,
    backgroundColor: '#FEF09D',
    // flexDirection: 'column',
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
    color:'#E41A3E',
    paddingBottom: 20,
  },
  view:{
    padding:10,
    paddingTop: 20,
    alignItems: 'center',
    // alignSelf: 'center',
  },
  questionText: {
    color: '#434343',
    fontWeight: '800',
    fontSize: 18,
    fontFamily: 'proxima nova',
  },
  answerText: {
    color: '#434343',
    fontWeight: '300',
    fontSize: 18,
    fontFamily: 'proxima nova',
    height: 150,
    textAlign:'left',
    textAlignVertical: 'top',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  space: {
    paddingTop: 35,
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

export default JournalScreen;

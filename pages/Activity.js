import React, { useState } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, Dimensions, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';

import CustomButton from '../components/CustomButton';
import { analyzeActivity } from '../api/ActivityApi';

const {width, height} = Dimensions.get('window');

const questions = [
  'Today how often did you feel relaxed and at peace?',
  'In the past week, how often have you felt that you were able to control the important things in your life?',
  'How often have you felt "your self" today?',
  'How often have you felt confident about your ability to handle your personal problems?',
  'How often have you found that you could cope with all the things that you had to do?',
  'How often do you manage your time and prioritize tasks in your daily life?',
];

function Activity({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(5).fill(null));
  const [isAnswered, setIsAnswered] = useState(false);
  const [ans, setans] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = () => {
    showMessage({
      message: 'Warning',
      description: 'Please select an answer',
      type: 'danger', // 'success', 'info', 'warning', or 'danger'
    });
  };

  const analyzeActivityResult = (answers) => {
    const positive_responses = answers.filter(answer => answer === 'Often' || answer === 'Almost always').length;
    let result = 'neutral';
    if ( positive_responses > 4) {
      result = 'positive';
    } else if (positive_responses <= 1) {
      result = 'negative';
    }
    setLoading(false);
    return result;
  };

  const submit = async () => {
    if (isAnswered) {
      console.log('answer', JSON.stringify(answers));
      if (currentQuestionIndex === 4) {
    // const result = await analyzeActivity(JSON.stringify(answers));
      setLoading(true);
      const result = analyzeActivityResult(answers);
      console.log('result', result);
        if (result === 'positive'){
            navigation.navigate('Result', {result: 'positive', text: '', page: 'activty'});
        } else if (result === 'negative') {
          navigation.navigate('Result', {result: 'negative', text: '', page: 'activty'});
        } else {
          navigation.navigate('Result', {result: 'neutral', text: '', page: 'activty'});
        }
      } else {
        console.log('start', currentQuestionIndex);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setans(0);
      }
    } else {
      console.log('Select answer');
      showToast();
    }
  };

  const handleAnswer = (answer, no) => {
    setIsAnswered(true);
    setans(no);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const previous = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.headContainer}>
            <TouchableWithoutFeedback
                style={{flex: 1,}}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-circle-outline" size={40} color="#925521" /> 
            </TouchableWithoutFeedback>
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.questionNo}>{(currentQuestionIndex + 1)}/5</Text>
        </View>
        {/* <View style={styles.space}/> */}
        <View style={styles.view}>
            <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
            <CustomButton
            containerStyle={{width: width-30, backgroundColor: ans == 1 ? '#925521':'#92552150', marginVertical: 15, borderRadius: 11, borderColor: '#925521'}}
            text={'Rarely'}
            textStyle={{color: ans == 1 ? '#FFFFFF':'#434343'}}
            onPress={() => handleAnswer('Rarely', 1)}
            status={true}
            />
            <CustomButton
            containerStyle={{width: width-30, backgroundColor: ans == 2 ? '#925521':'#92552150', marginVertical: 15, borderRadius: 11, borderColor: '#925521'}}
            text={'Sometimes'}
            textStyle={{color: ans == 2 ? '#FFFFFF':'#434343'}}
            onPress={() => handleAnswer('Sometimes', 2)}
            status={true}
            />
            <CustomButton
            containerStyle={{width: width-30, backgroundColor: ans == 3 ? '#925521':'#92552150', marginVertical: 15, borderRadius: 11, borderColor: '#925521'}}
            text={'Often'}
            textStyle={{color: ans == 3 ? '#FFFFFF':'#434343'}}
            onPress={() => handleAnswer('Often',3)}
            status={true}
            />
            <CustomButton
            containerStyle={{width: width-30, backgroundColor: ans == 4 ? '#925521':'#92552150', marginVertical: 15, borderRadius: 11, borderColor: '#925521'}}
            text={'Almost always'}
            textStyle={{color: ans == 4 ? '#FFFFFF':'#434343'}}
            onPress={() => handleAnswer('Almost always', 4)}
            status={true}
            />
            {/* {currentQuestionIndex > 0 ?
            <CustomButton
            //   disable={text === ''}
            // opacity={email === '' || password === '' ? 0.5 : 1}
            containerStyle={{width: width-30, backgroundColor: '#925521', marginTop: 50}}
            text={'Previous'}
            onPress={previous}
            status={true}
            /> : <></>
            } */}
            {loading ? (
              <ActivityIndicator size="large" color="#925521" />
              ) : (
              <CustomButton
              containerStyle={{width: width-30, backgroundColor:  isAnswered? '#925521':'#92552120', marginTop: 50}}
              text={currentQuestionIndex === 4 ? 'Submit' : 'Next'}
              // onPress={currentQuestionIndex === 5 ? submit : setCurrentQuestionIndex(currentQuestionIndex + 1) }
              textStyle={{color: isAnswered? '#FFFFFF':'#434343'}}
              onPress={submit}
              status={true}
              />
            )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      paddingTop: 35,
      backgroundColor: '#F4D8C0',
      // flexDirection: 'column',
    },
    headContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading:{
      textAlign: 'center',
      fontSize: 25,
      fontFamily: 'proxima nova',
    },
    title: {
        flex: 3,
        fontSize: 45,
        fontWeight: '900',
        fontFamily: 'proxima nova',
        color:'#925521',
        textAlign: 'center',
    },
    questionNo: {
      flex: 0.5,
      fontSize: 25,
      fontWeight: '400',
      fontFamily: 'proxima nova',
      color:'#925521',
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
      paddingBottom: 15,
    },
    answerBtn: {
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

export default Activity;

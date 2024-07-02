import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import Congratulation from '../components/CongratulationModal';
import {storeUserExercise, getUserExercise} from '../utils/Firestore';
import { _get } from '../local-storage/Authentication';
import {getCurrentDateTime} from '../utils/DateFormat';

function BreathingScreen({navigation}) {
  const [timer, setTimer] = useState(30000);
  const [seconds, setSeconds] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1,  alignItems: 'center', padding: 10, paddingTop: 20 }}>
      <View style={{flexDirection: 'row', columnGap: 10}}>
      <CustomButton
          // disable={text === ''}
          text={'30 sec'}
          onPress={() => setTimer(30000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 30000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'1 min'}
          onPress={() => setTimer(60000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 60000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'2 min'}
          onPress={() => setTimer(120000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 120000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'3 min'}
          onPress={() => setTimer(180000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 180000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
      </View>
      <Text style={styles.text}>Are You Ready?</Text>
      <Image source={require('../assets/breath-round.png')} style={styles.image} />
      <Image source={require('../assets/breath-round2.png')} style={styles.image2} />
      <Image source={require('../assets/breathing-img.png')} style={styles.breathImg} />

      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Breath', { time: timer })}>
        <Text style={styles.startBtnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

function MeditationScreen({navigation}) {
  const [timer, setTimer] = useState(300000);
  const [seconds, setSeconds] = useState(timer);
  const [isStarted, setIsStarted] = useState(false);
  const [backConfirmation, setBackConfirmation] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // if(isStarted===true){
      setSeconds(timer);
    // }
  }, [timer]);

  useEffect(() => {
    if(seconds === 0){
      console.log('finished!');
      setBackConfirmation(true);
    }

  }, [seconds]);

  useEffect(() => {
    if(isStarted == true){
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1000 : 0);
    }, 1000);
    return () => {clearInterval(intervalId);};
  }

  const getUserDetail = async () => {
    const user = await _get();
    console.log('user', user)
    setUserId(user?.user?.uid);
  }; 
  getUserDetail();
 }, [isStarted]);

  // Convert seconds to MM:SS format
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const goBack = () => {
    navigation.navigate('Home');
  };

  const backConfirmationModalHandler = () => {
    const { currentDate, currentTime } = getCurrentDateTime();
    console.log('time:', currentDate, currentTime);
    console.log('timer:', timer);
    console.log('id:', userId);
    storeUserExercise(userId, currentDate, currentTime, 'Meditation', timer);
    setBackConfirmation(false);
    goBack();
  };

  const handleSignOut = async () => {
    try {
      const { currentDate, currentTime } = getCurrentDateTime();
      console.log('time:', currentDate, currentTime);
      console.log('timer:', timer);
      console.log('id:', userId);
      storeUserExercise(userId, currentDate, currentTime, 'Meditation', timer);
      navigation.navigate('Exercise');
      setSeconds(timer);
      setIsStarted(false);
      setBackConfirmation(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1,  alignItems: 'center', padding: 10, paddingTop: 20 }}>
      <Congratulation
          open={backConfirmation}
          hide={backConfirmationModalHandler}
          title={'Yey! Congratulation'}
          content={'You have successfully completed your meditation'}
          primaryAction={handleSignOut}
          secondaryAction={backConfirmationModalHandler}
          image={require('../assets/congrats.png')}
          secondaryButtonText={'Maybe later'}
          primaryButtonText={'Try again'}
      />
      <View style={{flexDirection: 'row', columnGap: 10}}>
      <CustomButton
          // disable={text === ''}
          text={'5 min'}
          onPress={() => setTimer(300000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 300000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'10 min'}
          onPress={() => setTimer(600000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 600000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'15 min'}
          onPress={() => setTimer(900000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 900000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
        <CustomButton
          // disable={text === ''}
          text={'20 min'}
          onPress={() => setTimer(20*60*1000)}
          status={true}
          containerStyle={[{backgroundColor: timer == 20*60*1000 ? '#FFFFFF' : '#43434320'}, styles.timerBtnContainer]}
          textStyle={styles.timerBtntext}
        />
      </View>
      <View style={styles.timerView}>
        <Text style={styles.timerText}>
          {Math.floor(seconds / 60000)}:{Math.floor((seconds % 60000) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        </Text>
      </View>
      <CustomButton
        text={isStarted ? 'Stop' : seconds === timer ? 'Start' : 'Resume'}
        onPress={() => setIsStarted(!isStarted)}
        status={true}
        />
      {/* <Image source={require('../assets/breath-round.png')} style={styles.image} /> */}
      <Image source={require('../assets/meditation.png')} style={styles.breathImg} />
    </View>
  );
}

export default function ExcerciseScreen({navigation}) {
  const [isSelected, setIsSelected] = useState('breathing');

  const goBack = () => {
    navigation.navigate('Home');
  };

  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Breathing" component={BreathingScreen} />
    //   <Tab.Screen name="Meditation" component={MeditationScreen} />
    // </Tab.Navigator>
    <View style={{backgroundColor:'#FFDD57', flex:1, padding:10, paddingTop: 20}}>
    <View style={{flexDirection:'row', paddingTop: 20, columnGap:10}}>
    <TouchableWithoutFeedback
          style={{}}
          onPress={goBack}
      >
          <Icon name="arrow-back-circle-outline" size={40} color="#000" /> 
    </TouchableWithoutFeedback>
      <CustomButton
          // disable={text === ''}
          text={'Breathing'}
          onPress={() => setIsSelected('breathing')}
          status={true}
          containerStyle={[{backgroundColor: isSelected == 'breathing' ? '#FFFFFF' : '#43434320'}, styles.buttonContainer]}
          textStyle={{color: '#434343', fontSize:18}}
          isIcon={true}
          icon={require('../assets/breathing.png')}
        />
        <CustomButton
          // disable={text === ''}
          text={'Meditation'}
          onPress={() => setIsSelected('medi')}
          status={true}
          containerStyle={[{backgroundColor: isSelected == 'medi' ? '#FFFFFF' : '#43434320'}, styles.buttonContainer]}
          textStyle={{color: '#434343', fontSize:18}}
          isIcon={true}
          icon={require('../assets/hour-glass.png')}
        />
    </View>
    {isSelected === 'breathing' ? <BreathingScreen navigation={navigation}/> : <MeditationScreen navigation={navigation}/>

    }
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    width: 150,
    height: 40,
    borderRadius: 10,
    padding: 10,
    // shadowColor: '#000000',
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
    // elevation: 5,
  },
  timerBtnContainer:{
    width: 70,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  timerBtntext: {
    color: '#434343',
    fontSize: 17,
    fontWeight: '900',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#434343',
    paddingTop: 20,
    paddingBottom: 5,
    lineHeight: 35,
  },
  image: {
    marginTop: 150,
    width: 350,
    height: 350,
    position: 'absolute',
  },
  image2:{
    marginTop: 235,
    position: 'absolute',
  },
  startButton: {
    marginTop: 165,
  },
  startBtnText:{
    fontSize: 35,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#FFFFFF',
    // fontWeight: '600',
  },
  breathImg:{
    marginTop: 370,
    zIndex: 1000,
    width: 330,
    height: 320,
    position: 'absolute',
  },
  timerView: {
    backgroundColor: '#FFFFFF',
    marginVertical: 50, 
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 18,
  },
  timerText: {
    fontSize: 50,
    textAlign: 'center',
    color: '#434343',
    fontWeight: '900'
  },
});

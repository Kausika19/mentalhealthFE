import { Text,TouchableWithoutFeedback, Image, StyleSheet, Dimensions, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import Congratulation from '../components/CongratulationModal';
import { getCurrentDateTime } from '../utils/DateFormat';
import { storeActivity, storeEmotion } from '../utils/Firestore';
import { _get } from '../local-storage/Authentication';

const screenHeigt = Dimensions.get('window').height;

const ResultScreen = ({ navigation, route }) => {
  const { result, text, page } = route.params;
  const [emotion, setemotion] = useState('');
  const [image, setImage] = useState('');
  const [isPurple, setIsPurple] = useState(true);
  const [backConfirmation, setBackConfirmation] = useState(false);
  const [userId, setUserId] = useState('');

  console.log('text:', text);

  const goBack = () => {
    navigation.navigate('Home');
  };
  
  useEffect(() => {
    if (page === 'activty'){
      if (result === 'positive'){
        setemotion('positive');
        setImage(require('../assets/happy.png'));
        setIsPurple(true);
      } else if (result === 'negative'){
        setemotion('negative');
        setImage(require('../assets/sad.png'));
        setIsPurple(false);
      } else {
        setemotion('neutral');
        setImage(require('../assets/neutral.png'));
        setIsPurple(true);
      }
    } else if (page === 'journal'){
      //anger', 'happiness', 'sadness', 'scared', 'surprise
        if (result === 'happiness'){
          setemotion('happy');
          setImage(require('../assets/happy.png'));
          setIsPurple(true);
        } else if (result === 'sadness'){
          setemotion('sad');
          setImage(require('../assets/sad.png'));
          setIsPurple(false);
        } else if (result === 'surprise') {
          setemotion('surprise');
          setImage(require('../assets/surprise.png'));
          setIsPurple(true);
        } else if (result === 'scared') {
          setemotion('scared');
          setImage(require('../assets/scared.png'));
          setIsPurple(false);
        } else if (result === 'anger') {
          setemotion('anger');
          setImage(require('../assets/anger.png'));
          setIsPurple(false);
        } else {
          setemotion('neutral');
          setImage(require('../assets/neutral.png'));
          setIsPurple(true);
        }
    }
    
    const getUserDetail = async () => {
      const user = await _get();
      console.log('user', user)
      setUserId(user?.user?.uid);
    };
    getUserDetail();
  }, []);

  const backConfirmationModalHandler = () => {
    const { currentDate, currentTime } = getCurrentDateTime();
    console.log('time:', currentDate, currentTime);
    console.log('id:', userId);
    if (page === 'activty'){
      storeActivity(userId, currentDate, currentTime, result);
    } else if (page === 'journal'){
      storeEmotion(userId, currentDate, currentTime, result, text);
    }
    setBackConfirmation(false);
    goBack();
  };

    return (
      <View style={[styles.container,
      {backgroundColor: isPurple ? '#6666C6' : '#FFCF00'}]}>
      <Congratulation
        open={backConfirmation}
        hide={backConfirmationModalHandler}
        title={'Yey! Congratulation'}
        content={page === 'journal' ? 'You have successfully entered your Journal' : 'You have successfully completed your daily Quiz'}
        primaryAction={backConfirmationModalHandler}
        isSecond={false}
        image={require('../assets/done.png')}
        primaryButtonText={'Back'}
      />
      <TouchableWithoutFeedback
          style={{}}
          onPress={goBack}
      >
        <Icon name="close-circle-outline" size={40} color= {isPurple ? '#ffffff' : '#000000' }/>
      </TouchableWithoutFeedback>
      <View style={{padding:20}}/>
      { image !== '' ?
        <Image style={styles.image} source={image}/>
        : <></>
      }
      <Text style={[styles.text, {color: isPurple ? '#FFFFFF' : '#000000', opacity: isPurple ? 0.5 : 1}]}>Feeling</Text>
      { page === 'activty' ?
        <Text style={[styles.moodText, {color: isPurple ? '#FFFFFF' : '#E41A3E'}]}>{emotion}</Text> :
        <Text style={[styles.moodText, {color: isPurple ? '#FFFFFF' : '#E41A3E'}]}>{emotion}</Text>
      }
      <View style={styles.space}/>
        <CustomButton
          // disable={text === ''}
          // opacity={email === '' || password === '' ? 0.5 : 1}
          text={'Done'}
          onPress={() => setBackConfirmation(true)}
          status={true}
          secondary={isPurple ? true : false}
          containerStyle={{backgroundColor: isPurple ?'#FFFFFF' : '#E41A3E'}}
          textStyle={isPurple ? {color: '#6666C6'} : ''}
        />

      </View>
    );

};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    paddingTop: 20,
  },
  image:{
    // position: 'absolute',
    // top: 150,
    justifyContent:'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    // fontFamily:
    fontSize: 25,
    fontWeight: 'bold',
    opacity: 0.5,
    textAlign: 'center',
  },
  moodText: {
    // fontFamily:
    fontSize: 90,
    lineHeight: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  space: {
    paddingTop: 20,
  },
});

export default ResultScreen;

import React, {useState, useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View, Text, Image, TouchableWithoutFeedback, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Congratulation from '../components/CongratulationModal';
import Confirmation from '../components/ConfirmationModal';
import {storeUserExercise} from '../utils/Firestore';
import { _get } from '../local-storage/Authentication';
import {getCurrentDateTime} from '../utils/DateFormat';

const {width, height} = Dimensions.get('window');
const circleSize = width / 4;

const BreathingScreen = ({navigation,route}) => {
  const time = route.params.time;
  const [userId, setUserId] = useState('');
  const [timer, setTimer] = useState(null);
  const [backConfirmation, setBackConfirmation] = useState(false);
  const [finished, setFinished] = useState(false);
  const move = useRef(new Animated.Value(0)).current;
  const breathIn = Easing.out(Easing.sin);
  const breathOut = Easing.in(Easing.sin);
  const textOpacity = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  const getUserDetail = async () => {
    const user = await _get();
    setUserId(user?.user?.uid);
  };

  useEffect(() => {
    getUserDetail();
    const backAction = () => {
      if (navigation.isFocused()) {
        setBackConfirmation(true);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);

useEffect(() => {
    const timer = setTimeout(() => {
    //   navigation.goBack();
    stopBreathingExercise();
    setFinished(true);
    }, time); // in milliseconds

    startBreathingExercise();

    return () => {
      clearTimeout(timer);
    };
  }, []);

const startBreathingExercise = () => {
    setTimer(setTimeout(() => {
      clearTimeout(timer);
      animationRef.current = Animated.loop(
        Animated.sequence([
        Animated.parallel([
            Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            easing: breathIn,
            useNativeDriver: true,
            }),
            Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
            }),
        ]),
        Animated.parallel([
            Animated.timing(textOpacity, {
            delay: 100,
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            }),
            Animated.timing(move, {
            //   delay: 1000,
            toValue: 0,
            duration: 4000,
            easing: breathOut,
            useNativeDriver: true,
            }),
        ]),
    ])
    )
    animationRef.current.start();
  }, 1000)); // Start the breathing exercise after 1 second
};

const stopBreathingExercise = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  const translate = move.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, circleSize/3, 0],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const goBack = () => {
    navigation.navigate('Home');
  };

  const finishedModalHandler = () => {
    const { currentDate, currentTime } = getCurrentDateTime();
    console.log('time:', currentDate, currentTime);
    console.log('timer:', time);
    console.log('id:', userId);

    storeUserExercise(userId, currentDate, currentTime, 'Breathing', time);
    setFinished(false);
    goBack();
  };

  const handleFinished = async () => {
    try {
      const { currentDate, currentTime } = getCurrentDateTime();
      console.log('time:', currentDate, currentTime);
      console.log('timer:', time);
      console.log('id:', userId);

      storeUserExercise(userId, currentDate, currentTime, 'Breathing', time);
      navigation.navigate('Exercise');
      setFinished(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const backConfirmationModalHandler = () => {
    setFinished(false);
    goBack();
  };

  const handleBack = async () => {
    try {
      const { currentDate, currentTime } = getCurrentDateTime();
      console.log('time:', currentDate, currentTime);
      console.log('timer:', time);
      console.log('id:', userId);
      storeUserExercise(userId, currentDate, currentTime, 'Breathing', time);
      navigation.navigate('Exercise');
      setFinished(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFDD57', padding: 10, paddingTop: 20}}>
    <Congratulation
          open={finished}
          hide={finishedModalHandler}
          title={'Yey! Congratulation'}
          content={'You have successfully completed your breathing session'}
          primaryAction={handleFinished}
          secondaryAction={finishedModalHandler}
          image={require('../assets/congrats.png')}
          secondaryButtonText={'Maybe later'}
          primaryButtonText={'Try again'}
    />
    <Confirmation
          open={backConfirmation}
          hide={backConfirmationModalHandler}
          title={'Are You Leaving?'}
          content={'Are you sure want to log out?'}
          confirmAction={handleBack}
          cancelAction={backConfirmationModalHandler}
          icon={'alert'}
          secondaryButtonText={'No'}
          primaryButtonText={'Yes'}
    />
    <TouchableWithoutFeedback
          style={{backgroundColor: 'red', height: 5000, zIndex: 9999}}
          onPress={() => goBack()}
      >
        <Icon name="close-circle-outline" size={40} color= {'#000000'}/>
    </TouchableWithoutFeedback>
    <Image source={require('../assets/breath-round.png')} style={styles.image} />
      {/* <Image source={require('../assets/breath-round2.png')} style={styles.image2} /> */}
      <Image source={require('../assets/breathing-img.png')} style={styles.breathImg} />
      {/* <Text style={styles.text}>{text}</Text> */}
    <View style={styles.container}>
      <Animated.View
        style={{
          // ...StyleSheet.absoluteFill,
          alignItems: "center",
          opacity: textOpacity,
          // top: -100,
        }}
      >
        <Text
            style={styles.text}
        >
          Breath In
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          // ...StyleSheet.absoluteFill,
          alignItems: "center",
          opacity: exhale,
          top: -95,
        }}
      >
        <Text
          style={styles.text}
        >
          Breath Out
        </Text>
      </Animated.View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            `${item * 45}deg`, //
            `${item * 45 + 180}deg`,
            `${item * 45 + 360}deg`,
          ],
        });
        return (
          <View
            key={item}
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: height/2.5,
            }}>
            <Animated.View
              style={{
                opacity: 0.5,
                backgroundColor: '#FFDD57',
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                transform: [
                  {
                    rotateZ: rotation,
                  },
                  {translateX: translate},
                  {translateY: translate},
                ],
              }}
            />
          </View>
        );
      })}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    zIndex: 1000,
    // marginTop: height/2.5,
    // backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    // zIndex: 1000,
    marginTop: height/4,
    width: 350,
    height: 350,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 45,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#434343',
    paddingTop: 50,
    paddingBottom: 5,
    lineHeight: 35,
    fontWeight: '800',
  },
  breathImg:{
    marginTop: height/1.6,
    width: 330,
    height: 320,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

export default BreathingScreen;

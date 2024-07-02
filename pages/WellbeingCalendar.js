import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';


import { getUserExercise, getUserActivity, getUserEmotion } from '../utils/Firestore';
import { _get } from '../local-storage/Authentication';
import { getCurrentDateTime } from '../utils/DateFormat';
import BottomSheet from '../components/BottomSheet';

// Main calendar component
const WellbeingCalendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [exerciseData, setExerciseData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserDetail = async () => {
    const user = await _get();
    setUserId(user?.user?.uid);
  };

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
    setLoading(false);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  // useEffect(() => {
  //   if(exerciseData != null){
  //     console.log('details: ', exerciseData);
    // toggleBottomSheet();
  //   }    
  // }, [exerciseData]);

  const fetchData = async () => {
    try {
      // Get exercise data
      const exerciseDetails = await getUserExercise(userId, selectedDate);
      setExerciseData(exerciseDetails);
      console.log('exerciseData', exerciseDetails);
      // Get activity data
      const activityDetails = await getUserActivity(userId, selectedDate);
      setActivitiesData(activityDetails);
      console.log('activitiesData', activitiesData.length);
      // Get journal data
      const emotionDetails = await getUserEmotion(userId, selectedDate);
      setEmotionData(emotionDetails);
      console.log('emotionData', emotionData.length);
      toggleBottomSheet();
    } catch (error) {
      console.error('Error fetching user exercise:', error);
    }
  };
  
  useEffect(() => {
    const { currentDate } = getCurrentDateTime();
    if (selectedDate <= currentDate) {
      setLoading(true);
      fetchData();
      // toggleBottomSheet();
    }
  }, [selectedDate]);

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  // Define your marking for the calendar here based on emotions
  const markedDates = {
    // example
    '2024-04-06': { selected: true, marked: true, selectedColor: 'blue' },
  };

  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback
          style={{}}
          onPress={() => navigation.goBack()}
      >
          <Icon name="arrow-back-circle-outline" size={40} color="#C96000" /> 
      </TouchableWithoutFeedback>
      {/* <View style={styles.view}> */}
      <Text style={styles.title}>My Wellbeing Calendar</Text>
      <Calendar
        // style={{ flex: 1, height: 200 }}
        onDayPress={onDayPress}
        // markedDates={markedDates}
      />
      {loading ? (
          <ActivityIndicator size="large" color="#E41A3E" />
          ) : (
            <></>
          )}
      <BottomSheet isVisible={isVisible} onClose={toggleBottomSheet} exerciseData={exerciseData} activitiesData={activitiesData} emotionData={emotionData} selectedDate={selectedDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 35,
    // width: screenWidth,
    // height: screenHeigt,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F4D8C0',
    // flexDirection: 'column',
  },
  heading:{
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'proxima nova',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'proxima nova',
    color:'#C96000',
    paddingVertical: 20,
    textAlign: 'center',
  },
  view:{
    padding:10,
    paddingTop: 60,
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


export default WellbeingCalendar;

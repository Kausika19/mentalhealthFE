// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Image, Text, BackHandler, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../components/CustomButton';
import {getUserDetails} from '../utils/Firestore';
import { _get, _remove } from '../local-storage/Authentication';
import { _remove_user_details } from '../local-storage/UserDetails';
// import { _get_user_details } from '../local-storage/UserDetails';
import Confirmation from '../components/ConfirmationModal';
import WellbeingCalendar from './WellbeingCalendar';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [backConfirmation, setBackConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserDetails(userId);
      console.log('userData: ', userData);
      setUsername(userData?.name ?? '');
      if (userData?.gender){
        setUserTitle(userData.gender === 'male' ? 'Mr.' : 'Ms.');
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchUserData();
  }, [userId]);

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      _remove();
      _remove_user_details();
      // Navigate back to the Login screen
      navigation.navigate('Login');
    backConfirmationModalHandler();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const onPress = () => {
    // Navigate to the Home screen
      navigation.navigate('Journal');
  };

  const backConfirmationModalHandler = () => {
    setBackConfirmation(false);
  };

  const getUserDetail = async () => {
    const user = await _get();
    console.log('user', user?.user.uid);
    setUserId(user?.user?.uid);
    setUsername(user?.name);
    if (user?.gender){
      setUserTitle(user.gender === 'male' ? 'Mr.' : 'Ms. .');
    }
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

  return (
    <View style={styles.container}>
    <ScrollView
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
    showsVerticalScrollIndicator={false}
    style={{flex: 1, marginBottom: 15}}>
    {loading ? ( // Conditionally render loading indicator
        <ActivityIndicator size="large" color="#FFEF8E" />
      ) : (
      <>
        <Confirmation
          open={backConfirmation}
          hide={backConfirmationModalHandler}
          title={'Are You Leaving?'}
          content={'Are you sure want to log out?'}
          confirmAction={handleSignOut}
          cancelAction={backConfirmationModalHandler}
          icon={'alert'}
          secondaryButtonText={'No'}
          primaryButtonText={'Yes'}
        />
        <View style={styles.haedContainer}>
          <Image source={require('../assets/hello1.png')}  />
          <Text style={styles.heading}>Hello, {userTitle} {userName}</Text>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => navigation.navigate('Profile')}
          >
          {/* <Image source={userTitle === 'Ms.' ? require('../assets/profile.png') : require('../assets/profileM.png')}/> */}
          { userTitle === 'Ms.' ?
            <Image source={require('../assets/profile.png')}/> :
            <MaterialCommunityIcons name="face-man-profile" size={45} color="#26A5FC"/>
          }
        
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Calender')}>
          <Text style={styles.text}>Track Your Progress</Text>
          <Icon name="arrow-forward-circle" size={30} color="#CC2334" /> 
        </TouchableOpacity>
        <View style={styles.mainContainer}>
          <Image source={require('../assets/homeImage.png')} style={styles.image} />
          <TouchableOpacity style={styles.btn1} onPress={onPress}>
            <Text style={styles.text1}>Daily Journal</Text>
            <Icon name="arrow-forward-circle" size={30} color="#E41A3E" /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Activity')}>
            <Text style={styles.text2}>Activity</Text>
            <Icon name="arrow-forward-circle" size={30} color="#925521" /> 
          </TouchableOpacity>
        </View>
        <View style={{flex: 1.8,flexDirection: 'row', paddingBottom: 10, columnGap: 10, width: width-20,}}>
          <TouchableOpacity style={styles.btn3} onPress={()=> console.log('Spotify')}>
            <Text style={styles.text3}>Want To Relax?</Text>
            <Image source={require('../assets/spotify.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn4} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.text4}>Need Help?</Text>
            <Image source={require('../assets/help.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn5} onPress={()=>navigation.navigate('Exercise')}>
          <Image source={require('../assets/exercise.png')} style={styles.image2} />
          <View style={{flex: 2}}>
            <Text style={styles.text5}>Train Your Mind!</Text>
            <Text style={styles.text6}>* Breathe in & Out</Text>
            <Text style={styles.text6}>* Meditation</Text>
            <Icon name="arrow-forward-circle" size={30} color="#FB2A51" style={{alignSelf: 'flex-end', paddingRight: 5}} />
          </View>
        </TouchableOpacity>
      </>
    )}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 10
  },
  haedContainer:{
    flex: 0.5,
    padding:15,
    // top: 25,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  heading:{
    // flex: 6,
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 25,
    textTransform: 'capitalize',
    // fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 5,
    lineHeight: 35,
    fontWeight: '900',
  },
  profile: {
    // flex: 1,
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  mainContainer: {
    flex: 2,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  btn: {
    flex: 2,
    backgroundColor: '#EFB025',
    height: 120,
    width: width-20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    paddingBottom: 5,
    paddingTop: 10,
  },
  text: {
    textAlign: 'right',
    paddingHorizontal: 10,
    fontSize: 25,
    // fontFamily: 'proxima nova',
    color:'#CC2334',
    lineHeight: 35,
    fontWeight: '800',
  },
  btn1: {
    flex: 2,
    backgroundColor: '#FEF09D',
    height: 100,
    width: width-20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomStartRadius: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },
  btn2: {
    flex: 2,
    backgroundColor: '#F4D8C0',
    height: 100,
    width: width-20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopStartRadius: 0,
  },
  btn3: {
    backgroundColor: '#000000',
    // height: 150,
    width: (width-20)/2,
    // marginTop: -25
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  btn4: {
    backgroundColor: '#FFDAE1',
    // height: 150,
    width: (width/2)-20,
    // marginTop: -25
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  btn5: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#FFDD57',
    height: 180,
    // width: '100%',
    width: width-20,
    // marginTop: -25,
    borderRadius: 20,
    paddingBottom: 5,
    // paddingTop: 5,
    alignItems: 'center',
  },
  text1: {
    textAlign: 'right',
    // width: 100,
    paddingHorizontal: 10,
    paddingLeft: 150,
    fontSize: 25,
    // fontFamily: 'proxima nova',
    color:'#434343',
    lineHeight: 35,
    fontWeight: '800',
  },
  text2: {
    textAlign: 'right',
    // width: 100,
    paddingHorizontal: 10,
    paddingLeft: 150,
    fontSize: 25,
    // fontFamily: 'proxima nova',
    color:'#925521',
    lineHeight: 35,
    fontWeight: '800',
  },
  text3: {
    // marginLeft: 10,
    // textAlign: 'center',
    fontSize: 18,
    textTransform: 'capitalize',
    // fontFamily: 'proxima nova',
    color:'#FFFFFF',
    paddingBottom: 5,
    fontWeight: '900',
  },
  text4: {
    // marginLeft: 10,
    // textAlign: 'center',
    fontSize: 18,
    textTransform: 'capitalize',
    // fontFamily: 'proxima nova',
    color:'#FB2A51',
    paddingBottom: 5,
    fontWeight: '900',
  },
  text5: {
    // width: 100,
    paddingHorizontal: 10,
    fontSize: 23,
    paddingBottom: 5,
    // fontFamily: 'proxima nova',
    color:'#FB2A51',
    lineHeight: 35,
    fontWeight: '500',
  },
  text6: {
    fontSize: 18,
    textTransform: 'capitalize',
    // fontFamily: 'proxima nova',
    color:'#FB2A51',
    textAlign: 'center',
    paddingBottom: 5,
    fontWeight: '900',
  },
  logoutBtn: {
    flex: 2,
    paddingBottom: 20,
    bottom: 0,
    position: 'absolute',
  },
  image: {
    zIndex: 9999,
    left: 0,
    top: 10,
    position: 'absolute',
    width: 185,
    height: 200,
  },
  image2: {
    zIndex: 9999,
    // left: 0,
    // top: 10,
    // position: 'absolute',
    width: 165,
    height: 165,
  },
});

export default HomeScreen;

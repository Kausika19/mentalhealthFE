import React, { useEffect, useState } from 'react';
import {View, Image, Text, TextInput, BackHandler, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../components/CustomButton';
import {deleteUserAccount, getUserDetails, updateUserName} from '../utils/Firestore';
import { _get, _remove } from '../local-storage/Authentication';
import { _remove_user_details } from '../local-storage/UserDetails';
// import { _get_user_details } from '../local-storage/UserDetails';
import Confirmation from '../components/ConfirmationModal';
import UpdateConfirmationModal from '../components/Modal';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../assets/profile-1.png'));
    // face-man-profile
// face-woman-profile
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [userGender, setUserGender] = useState('');
    const [backConfirmation, setBackConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newName, setNewName] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserDetails(userId);
      console.log('userData: ', userData);
      setUsername(userData?.name ?? '');
      setNewName(userData?.name ?? '');
      setNewName(userData?.name ?? '');
      setUserGender(userData?.gender ?? '');
      // setProfileImage(userData?.gender === 'female' ? require('../assets/profile-1.png') : require('../assets/profile-2.png') )
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

  const handleSelectImage = async () => {
    // Function to handle image selection and upload
    // const newImage = await selectImage();
    // setProfileImage(newImage);
    console.log("select image")
  };

  const handleSos = () => {
    navigation.navigate('Help');
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const saveChanges = async () => {
    try {
        updateUserName(userId, newName, setIsAlertVisible, setMessage);
        console.log('Display name updated successfully', newName);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating display name:', error.message);
      }
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account');
    deleteUserAccount(navigation, setDeleteConfirmation);
  };

  const backConfirmationModalHandler = () => {
    setBackConfirmation(!backConfirmation);
  };

  const deleteConfirmationModalHandler = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  const getUserDetail = async () => {
    const user = await _get();
    console.log('user', user?.user.uid);
    setUserId(user?.user?.uid);
    setUserEmail(user?.user?.email);
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
    <Confirmation
          open={deleteConfirmation}
          hide={deleteConfirmationModalHandler}
          title={'Delete Your Account?'}
          content={'You will not be able to recover it'}
          confirmAction={handleDeleteAccount}
          cancelAction={deleteConfirmationModalHandler}
          icon={'alert'}
          secondaryButtonText={'No'}
          primaryButtonText={'Yes'}
    />
    {/* <UpdateConfirmationModal
        isVisible={isAlertVisible}
        message={message}
     /> */}
    <View style={styles.haedContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 1}}>
            <Icon name="arrow-back-circle-outline" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectImage} style={{flex: 2,alignItems: 'center'}}>
          { userGender === 'female' ?
            <Image source={profileImage} style={{ width: 150, height: 150 }} /> :
            <MaterialCommunityIcons name="face-man-profile" size={150} color="#000" style={{ width: 150, height: 150 }}/>
          }

        </TouchableOpacity>
        <TouchableOpacity onPress={handleSos} style={{flex: 1, alignItems: 'center'}}>
            <Image source={require('../assets/SOS.png')} style={{ width: 75, height: 65 }} />
        </TouchableOpacity>
    </View>
    <View style={styles.body}>
        {isEditing ?
           <View style={{padding: 25}}/>
            :
            <TouchableOpacity onPress={handleEditToggle} style={{alignItems: 'flex-end', padding: 20}}>
                <Icon name="pencil" size={25} color="#000" />
            </TouchableOpacity>
        }
        {isEditing ? (
            <>
                <TextInput style={styles.name} value={newName} onChange={(value) =>setNewName(value)}/>
                <View style={[styles.line, {backgroundColor: '#43434380'}]}/>
            </>
        ) : (
            <>
            <Text style={styles.name}>{userName}</Text>
            <View style={[styles.line, {width:0}]}/>
            </>
        )}
        <Text style={styles.detailTitles}>{'Email'}</Text>
        <Text style={styles.details}>{userEmail}</Text>
        <View style={styles.line}/>
        <Text style={styles.detailTitles}>{'Gender'}</Text>
        <Text style={styles.details}>{userGender}</Text>
        <View style={styles.line}/>
        <Text style={styles.detailTitles}>{'Date Of Joined'}</Text>
        <Text style={styles.details}>{'07/02/2024'}</Text>
        <View style={[styles.line, {marginBottom: 25}]}/>
        <CustomButton
            text={isEditing ? 'Save Changes' : 'Logout'}
            containerStyle={{backgroundColor:'#CD092F', width: 230}}
            onPress={isEditing ? saveChanges : backConfirmationModalHandler}
            status={true}
        />
        {isEditing ?
            <></> :
            <CustomButton
                text={'Delete Account'}
                containerStyle={{backgroundColor:'#FFFFFF00', width: '100%'}}
                textStyle={{color: '#43434380', fontSize: 18}}
                onPress={() => setDeleteConfirmation(!deleteConfirmation)}
                status={true}
            />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFDDE3',
    },
    haedContainer:{
        padding:20,
        paddingTop:50,
        backgroundColor: '#FFFFFF',
        paddingBottom: 5,
        zIndex:9999,
        marginHorizontal:-10,
        height: 130,
        flexDirection: 'row',
    },
    body:{
        padding: 20,
    },
    name:{
        fontSize: 29,
        textTransform: 'capitalize',
        //   fontFamily: 'proxima nova',
        color:'#434343',
        paddingBottom: 10,
        lineHeight: 35,
        fontWeight: '500',
    },
    detailTitles: {
        fontSize: 19,
    //  fontFamily: 'proxima nova',
        color:'#43434390',
        fontWeight: '500',
        paddingTop: 10,
    },
    details: {
        fontSize: 21,
    //  fontFamily: 'proxima nova',
        color:'#434343',
        paddingBottom: 10,
        lineHeight: 35,
        fontWeight: '400',
    },
    line: {
        backgroundColor: '#43434310',
        width: '100%',
        height: 1,
        margin: 5,
    },
})

export default ProfileScreen;

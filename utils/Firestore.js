import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { decryptData, encryptData } from './Kms';
// import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';

// Function to store user details
const storeUserDetails = async (userId, name, gender, setIsAlertVisible, setIsMessage ) => {
  try {
    await firebase.firestore().collection('users').doc(userId).set({
      name: name,
      gender: gender,
    });
    console.log('User details stored successfully');
  } catch (error) {
    console.error('Error storing user details:', error);
    setIsAlertVisible(true);
    setIsMessage(error.message );
  }
};

const getUserDetails = async (userId) => {
  try {
    const userDoc = await firestore()
      .collection('users')
      .doc(userId)
      .get();
    if (userDoc.exists) {
      const userData = userDoc._data;
      console.log('userDataaa', userData);
      return userData;
    } else {
      console.log('User document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
};

const updateUserName = async (userId, newName, setIsAlertVisible, setMessage) => {
  try {
    console.log('User name ',newName );
    // await firebase.firestore().collection('users').doc(userId).update({
    //   name: newName,
    // });
    console.log('User name updated successfully');
    setIsAlertVisible(true);
    setMessage('User name updated successfully');
  } catch (error) {
    console.error('Error updating user name:', error);
    setIsAlertVisible(true);
    setMessage(error.message);
  }
};

const storeUserExercise = async (userId, date, time, exercise, timer) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('exercise')
      .add({
        date: date,
        time: time,
        exercise: exercise,
        timer: timer,
      });
    console.log('User activity stored successfully!');
  } catch (error) {
    console.error('Error storing user activity: ', error);
  }
};

const getUserExercise = async (userId, selectedDate) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('exercise')
      .where('date', '==', selectedDate)
      .get();
//     if (userSnapshot._docs._exists) {
      const activitiesData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('data:', activitiesData);
        return activitiesData;

    // } else {
    //   console.log('User data not found for ID:', userId);
    //   return null;
    // }
  } catch (error) {
    console.error('Error getting user activities: ', error);
    return [];
  }
};

const storeActivity = async (userId, date, time, result) => {
  const encryptedEmotion = await encryptData(result);
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('activity')
      .add({
        date: date,
        time: time,
        result: encryptedEmotion,
      });
    console.log('User activity stored successfully!');
  } catch (error) {
    console.error('Error storing user activity: ', error);
  }
};

const getUserActivity = async (userId, selectedDate) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activity')
      .where('date', '==', selectedDate)
      .get();
      const activitiesData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log('data:', activitiesData);
        // return activitiesData;
        const decryptedEmotionData = activitiesData.map(async (item) => {
          let decryptedItem = { ...item };
          if (item.result) {
            decryptedItem.result = await decryptData(item.result);
          }
          return decryptedItem;
        });
          // return activitiesData;
          return Promise.all(decryptedEmotionData)
          .then((decryptedData) => {
            console.log('decryptedActivtyData', decryptedData);
            return decryptedData;
          })
          .catch((error) => {
            console.error('Error decrypting emotion data:', error);
            return [];
          });
  } catch (error) {
    console.error('Error getting user activities: ', error);
    return [];
  }
};

const storeEmotion = async (userId, date, time, emotion, text) => {
  const encryptedData = await encryptData(text);
  const encryptedEmotion = await encryptData(emotion);
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('emotion')
      .add({
        date: date,
        time: time,
        emotion: encryptedEmotion,
        text: encryptedData,
      });
    console.log('User activity stored successfully!');
  } catch (error) {
    console.error('Error storing user activity: ', error);
  }
};

const getUserEmotion = async (userId, selectedDate) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('emotion')
      .where('date', '==', selectedDate)
      .get();
      const activitiesData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log('data:', activitiesData);
      const decryptedEmotionData = activitiesData.map(async (item) => {
        let decryptedItem = { ...item };
        if (item.emotion) {
          decryptedItem.emotion = await decryptData(item.emotion);
      }
        if (item.text) {
          decryptedItem.text = await decryptData(item.text);
        }
        return decryptedItem;
      });
        // return activitiesData;
        return Promise.all(decryptedEmotionData)
        .then((decryptedData) => {
          // console.log('decryptedEmotionData', decryptedData);
          return decryptedData;
        })
        .catch((error) => {
          console.error('Error decrypting emotion data:', error);
          return [];
        });
  } catch (error) {
    console.error('Error getting user activities: ', error);
    return [];
  }
};

const deleteUserAccount = async (navigation, setDeleteConfirmation) => {
  try {
    // Delete user account
    const currentUser = auth().currentUser;
    await currentUser.delete();

    // Delete Firestore data
    const userDocRef = firestore().collection('users').doc(currentUser.uid);
    await userDocRef.delete();
    console.log('Success', 'User account and Firestore data deleted successfully.');
    setDeleteConfirmation(false);
    showMessage({
      message: 'Your account has been successfully deleted!',
      type: 'success',
    });
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error getting user activities: ', error.message);
  }
};

export {
  storeUserDetails,
  getUserDetails,
  updateUserName,
  storeUserExercise,
  getUserExercise,
  storeActivity,
  getUserActivity,
  storeEmotion,
  getUserEmotion,
  deleteUserAccount,
};

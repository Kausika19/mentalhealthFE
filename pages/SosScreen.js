import React, { useEffect, useState } from 'react';
import {View, Image, Text, TextInput, BackHandler,Linking, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import {getUserDetails, updateUserName} from '../utils/Firestore';
import { _get, _remove } from '../local-storage/Authentication';
import { _remove_user_details } from '../local-storage/UserDetails';
// import { _get_user_details } from '../local-storage/UserDetails';

const {width, height} = Dimensions.get('window');

const SosScreen = ({ navigation }) => {

    const handleQuickDial = () => {
        Linking.openURL(`tel:${111}`);
      };

  return (
    <View style={styles.container}>
        <View style={styles.haedContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-circle-outline" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>SOS Emergency</Text>
        </View>
        <View style={styles.body}>
            <Text style={styles.content}>If you need help for a mental health crisis,{'\n'}emergency or breakdown, you should get{'\n'}immediate expert advice & assessment.{'\n'} In an emergency, Please dial 111.</Text>
            <Image source={require('../assets/urgent.png')} style={styles.image} />
            <CustomButton
                text={'Dial 111'}
                containerStyle={{backgroundColor:'#CD092F', width: 230}}
                onPress={handleQuickDial}
                status={true}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A293C',
    },
    haedContainer:{
        padding:20,
        paddingTop:50,
        // backgroundColor: '#FFFFFF',
        paddingBottom: 5,
        zIndex:9999,
        marginHorizontal:-10,
        height: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title:{
        flex: 1,
        fontSize: 35,
        textTransform: 'capitalize',
        //   fontFamily: 'proxima nova',
        color:'#FFFFFF',
        paddingBottom: 10,
        lineHeight: 35,
        fontWeight: '500',
        textAlign: 'center',
    },
    content: {
        fontSize: 20,
    //  fontFamily: 'proxima nova',
        color:'#FFFFFF',
        paddingBottom: 10,
        lineHeight: 35,
        fontWeight: '400',
        textAlign: 'center',
    },
    image:{
        paddingHorizontal: 25,
        marginBottom: 25,
    },
});

export default SosScreen;

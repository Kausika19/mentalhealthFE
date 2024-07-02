/* eslint-disable react-native/no-inline-styles */
// CustomButton.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomButton = ({ text, onPress, status, disable, secondary, containerStyle, textStyle, isIcon, icon }) => {
  return (
    <TouchableOpacity style={[
        styles.container, {backgroundColor: secondary ? '#FFFFFF' : '#F15F0D'}, containerStyle
        // {opacity: opacity},
      ]} disabled={disable} onPress={status ? onPress : () => {}}
    >
    {isIcon ?
    <View style={{flexDirection: 'row', columnGap: 8, alignItems: 'center', alignSelf: 'center'}}>
      <Image source={icon}/>
      <Text style={[styles.text, {color: secondary ? '#F15F0D' : '#FFFFFF'}, textStyle]}>{text}</Text>
    </View> :
    <Text style={[styles.text, {color: secondary ? '#F15F0D' : '#FFFFFF'}, textStyle]}>{text}</Text>
    }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf:'center',
        width: 145,
        height: 50,
        padding: 5,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    text: {
        fontSize: 23,
        fontWeight: '500',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'proxima nova',
    },
});

export default CustomButton;

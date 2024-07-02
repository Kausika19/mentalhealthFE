// CurvedTextInput.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CurvedTextInput = ({ text, placeholder, value, onChangeText, quesStyle, answStyle, multiline, isPw, togglePasswordVisibility, isPasswordSecure }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, quesStyle]}>{text}</Text>
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={[styles.textInput,answStyle]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        selectionColor={'#878787'}
        multiline={multiline ?? false}
        secureTextEntry={isPasswordSecure ?? false}
      />
      {isPw ?
      <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 10, paddingTop: 15, position: 'absolute', right: 20, }}>
        <Icon
          name={isPasswordSecure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="black"
        />
      </TouchableOpacity>
      : ''}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    text: {
        color: '#878787',
        fontSize: 18,
        paddingBottom: 5,
        alignSelf:'center',
    },
    textInput: {
        height: 50,
        width: 325,
        fontSize: 18,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginTop: 5,
        paddingVertical: 10,
        borderRadius: 25,
        alignSelf:'center',
        textAlign: 'center',
        color: '#878787',
    },
});

export default CurvedTextInput;

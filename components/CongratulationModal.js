import * as React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Button, Dialog, Portal, Text } from 'react-native-paper';
import CustomButton from './CustomButton';
import { View, Text, Button, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Congratulation({open, hide, title, content, primaryAction, isSecond = true, secondaryAction, image, secondaryButtonText, primaryButtonText}) {
  return (
  <Modal
      transparent
      animationType='fade'
      visible={open}
      onRequestClose={hide}
      style={styles.container}
    >
    <View style={styles.modalContainer}>
      <View style={styles.alertContainer}>
        <View>
        <Image source={image} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.messageText}>{content}</Text>
          {/* <View style={styles.btnView}> */}
            {/* <CustomButton
              text={primaryButtonText}
              onPress={confirmAction}
              status={true}
              containerStyle={{backgroundColor: 'rgb(255,97,116,5)', marginRight: 10, borderRadius: 10, width: 100 }}
            />
            <CustomButton
              text={secondaryButtonText}
              status={true}
              onPress={cancelAction}
              containerStyle={{backgroundColor: '#FF6174', borderRadius: 10, width: 100 }}
            /> */}
          <TouchableOpacity onPress={primaryAction} style={styles.primaryButton}>
            <Text style={styles.buttonText1}>{primaryButtonText}</Text>
          </TouchableOpacity>
          {isSecond ?
            <TouchableOpacity onPress={secondaryAction} style={styles.secondaryButton}>
              <Text style={styles.buttonText2}>{secondaryButtonText}</Text>
            </TouchableOpacity>
          : <></>
          }
        {/* </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#AA60D5',
    paddingBottom: 5,
    lineHeight: 35,
    fontWeight: '900',
    paddingTop: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 350,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 15,
    lineHeight: 20,
    fontWeight:'300',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  secondaryButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf:'center',
    height: 50,
    padding: 5,
    paddingHorizontal: 30,
  },
  primaryButton: {
    marginRight: 10,
    width: 185,
    backgroundColor: '#AA60D5',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf:'center',
    height: 50,
    padding: 5,
    paddingHorizontal: 30,
  },
  buttonText1: {
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'proxima nova',
  },
  buttonText2: {
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    color: '#AA60D5',
    fontFamily: 'proxima nova',
  },
  image: {
    alignSelf: 'center',
  },
});

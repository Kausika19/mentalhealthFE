import * as React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Button, Dialog, Portal, Text } from 'react-native-paper';
import CustomButton from './CustomButton';
import { View, Text, Button, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Confirmation({open, hide, title, content, confirmAction, cancelAction, icon, secondaryButtonText, primaryButtonText}) {
  return (
    // <Portal>
    //   <Dialog visible={prop.open} onDismiss={prop.hide}>
    //     <Dialog.Icon icon={prop.icon} size={30} />
    //     <Dialog.Title style={styles.title}>{prop.title}</Dialog.Title>
    //     <Dialog.Content>
    //       <Text variant="bodyMedium">{prop.content}</Text>
    //     </Dialog.Content>
    //     <Dialog.Actions>
    //       <Button onPress={prop.cancelAction}>
    //         {prop.secondaryButtonText}
    //       </Button>
          // <View style={styles.btnView}>
          //   <CustomButton
          //     text={prop.primaryButtonText}
          //     onPress={prop.confirmAction}
          //     status={true}
          //     containerStyle={{backgroundColor: '#FF6174', opacity: 0.5, marginLeft: 10}}
          //   />
          //   <CustomButton
          //     text={prop.secondaryButtonText}
          //     onPress={prop.cancelAction}
          //     status={true}
          //     containerStyle={{backgroundColor: '#FF6174'}}
          //   />
          // </View>
    //     </Dialog.Actions>
    //   </Dialog>
    // </Portal>

    <Modal
      transparent
      animationType="slide"
      visible={open}
      onRequestClose={hide}
      style={styles.container}
    >
    <View style={styles.modalContainer}>
      <View style={styles.alertContainer}>
        <View>
          <Icon
              name={'alert-circle'}
              size={150}
              color="#FF6174"
              style={{alignSelf:'center'}}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.messageText}>{content}</Text>
          <View style={styles.btnView}>
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
          <TouchableOpacity onPress={confirmAction} style={styles.okButton}>
            <Text style={styles.buttonText}>{primaryButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelAction} style={styles.closeButton}>
            <Text style={styles.buttonText}>{secondaryButtonText}</Text>
          </TouchableOpacity>
          
        </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#FF6174',
    paddingBottom: 5,
    lineHeight: 35,
    fontWeight: '900',
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
    fontSize: 20,
    textAlign: 'center',
    // fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 15,
    lineHeight: 20,
    fontWeight:'300'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6174',
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignSelf:'center',
    height: 50,
    padding: 5,
    paddingHorizontal: 30,
  },
  okButton: {
    marginRight: 10,
    backgroundColor: 'rgba(255,97,116,0.5)',
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignSelf:'center',
    height: 50,
    padding: 5,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 23,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'proxima nova',
},
});

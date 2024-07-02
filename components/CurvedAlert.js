import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CurvedAlert = ({ visible, onClose, onOK, message }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      style={styles.container}
    >
    <View style={styles.modalContainer}>
      <View style={styles.alertContainer}>
      <View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon
            name={'close-circle-outline'}
            size={40}
            color="black"
          />
        </TouchableOpacity>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onOK} style={styles.okButton}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: 300,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'proxima nova',
    color:'#434343',
    paddingBottom: 15,
    lineHeight: 22,
    letterSpacing: 1.5
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  closeButton: {
    justifyContent:'flex-end',
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  okButton: {
    backgroundColor: '#F15F0D',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CurvedAlert;

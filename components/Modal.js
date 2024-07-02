import React, { useState, useEffect } from 'react';
import { Modal, Text, View } from 'react-native';

const UpdateConfirmationModal = ({ isVisible, message }) => {
  const [modalVisible, setModalVisible] = useState(isVisible);

  useEffect(() => {
    setModalVisible(isVisible);

    // Automatically hide the modal after 3 seconds
    const timer = setTimeout(() => {
      setModalVisible(false);
    }, 3000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateConfirmationModal;

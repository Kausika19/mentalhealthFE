import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
// import { screenWidth } from '../../constants/screenWidth';

const screenWidth = Dimensions.get('window').width;
const screenHeigt = Dimensions.get('window').height;

export default function CustomHelperText(prop) {
  const [visible_status, setVisible] = React.useState(prop.status);
  const onDismissSnackBar = () => {
    setVisible(false);
  };
  return (
    // <Snackbar
    //   duration={1000}
    //   onDismiss={onDismissSnackBar}
    //   style={styles.snackbarContainer}
    //   wrapperStyle={{ top: 0 }}
    //   visible={prop.status}
    // >
    //   {prop.message}
    // </Snackbar>
    <View>
      {visible_status ? 
      <Text style={{color: 'red', paddingBottom: 10}}>* {prop.message}</Text>:''
      }
      </View>
  );
}

const styles = StyleSheet.create({
  snackbarContainer: {
    zIndex: 1000,
    height: 'auto',
    width: screenWidth,
    whiteSpace: 'pre-wrap',
  },
});

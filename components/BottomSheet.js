import React, {useEffect} from 'react';
import { View, Text, TouchableWithoutFeedback,FlatList, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
// import { fetchEmotionData } from './api'; // You need to implement this
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { decryptData } from '../utils/Kms';
// import { LineChart, Grid } from '@types/react-native-svg-charts';
// import * as shape from 'd3-shape';

const {width, height} = Dimensions.get('window');

// Component for displaying the bottom sheet
const BottomSheet = ({ isVisible, onClose, exerciseData, activitiesData, emotionData, selectedDate }) => {

  const timeData = exerciseData.map(exercise => exercise.time);
  // console.log('activitiesData.length', emotionData);

  return (
    <Modal isVisible={isVisible} style={{ margin: 0 }} onBackdropPress={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#F4D8C0', padding: 5, maxHeight: height / 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20}}>
            <TouchableWithoutFeedback onPress={onClose} >
              <Icon name="close-circle-outline" size={30} color= {'#E41A3E'} style={{ paddingLeft: 10 }}/>
            </TouchableWithoutFeedback>
            <Text style={{ flex: 1, fontSize: 22, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase', color: '#C96000' }}>
              Tracker: {selectedDate}</Text>
          </View>
          <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
            <View style={{ width: width, alignItems: 'center' }}>
                {/* Content for slide 3 */}
              <Text style={{ fontSize: 21, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', color: '#925521', textDecorationLine: 'underline' }}>Journal Result</Text>
              
              {/* Promise.all(decryptedEmotionData)
                .then((decryptedData) => { */}
              {emotionData.length !== 0 ? 
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={emotionData}
                    renderItem={({ item }) => (
                    <View style={{padding: 15, paddingBottom: 5}}>
                      <Icon name={item.emotion === 'happiness' ? "happy" : "sad"} size={70} color= {'#434343'} style={{textAlign: 'center'}} />
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Completed At: {item.time}</Text>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Journal Entry: {item.text}</Text>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Emotion: {item.emotion}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  />:
                  <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', paddingTop: 15, color: '#434343'}}>No Activities</Text>}
            </View>
            <View style={{ width: width}}>
              {/* Content for slide 2 */}
              <Text style={{ fontSize: 21, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', color: '#925521', textDecorationLine: 'underline'  }}>Activities</Text>
                {activitiesData.length !== 0 ?
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activitiesData}
                    renderItem={({ item }) => (
                    <View style={{padding: 15, paddingBottom: 5}}>
                      <Icon name={item.result === 'positive' ? "happy" : "sad"} size={70} color= {'#434343'} style={{textAlign: 'center'}} />
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Completed At: {item.time}</Text>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Activity Result: {item.result}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  /> :
                  <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', paddingTop: 15, color: '#434343'}}>No Activities</Text>}
            </View>
            <View style={{ width: width, marginLeft: -5}}>
              <Text style={{ fontSize: 21, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', color: '#925521', textDecorationLine: 'underline'  }}>Exercises</Text>
              {exerciseData.length !== 0 ?
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={exerciseData}
                    renderItem={({ item }) => (
                    <View style={{padding: 15, paddingBottom: 5}}>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Exercise: {item.exercise}</Text>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Completed At: {item.time}</Text>
                      <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', color: '#434343'}}>Activity Time: {item.timer}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                  /> :
                  <Text style={{fontSize: 16, fontWeight: '300', textAlign: 'center', paddingTop: 15, color: '#434343'}}>No Activities</Text>}
                  {/* <LineChart
                    style={{ flex: 1 }}
                    data={timeData}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveLinear}
                  >
                    <Grid />
                  </LineChart> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

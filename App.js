// App.js
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import FlashMessage from 'react-native-flash-message';

import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import JournalScreen from './pages/JournalScreen';
import SignUpScreen from './pages/SignUpScreen';
import ResultScreen from './pages/ResultScreen';
import ExerciseScreen from './pages/ExerciseScreen';
import BreathingScreen from './pages/BreathingScreen';
import ProfileScreen from './pages/ProfileScreen';
import SosScreen from './pages/SosScreen';
import Calender from './pages/WellbeingCalendar';
import Activity from './pages/Activity';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Hide splash screen once component is mounted
    SplashScreen.hide();
  }, []);

  return (
        <NavigationContainer >
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName="HomeScreen">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Journal" component={JournalScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Exercise" component={ExerciseScreen} />
            <Stack.Screen name="Breath" component={BreathingScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Help" component={SosScreen} />
            <Stack.Screen name="Calender" component={Calender} />
            <Stack.Screen name="Activity" component={Activity} />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}}/>
        <Stack.Screen name="Chat" component={Chat} options={{title: 'Chat'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


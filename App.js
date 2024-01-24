// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='UniFocus' >
        <Stack.Screen name="UniFocus" component={MainScreen} headerShown={false} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

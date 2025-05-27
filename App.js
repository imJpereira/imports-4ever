import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AccountScreen from './screens/AccountScreen';
import OrderScreen from './screens/OrderScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="4Ever Imports"
          options={{
            headerBackTitle: "Home",
            headerTitleAlign: "center",
          }}
          component={HomeScreen}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
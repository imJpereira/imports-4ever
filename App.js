import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen from './screens/OrderScreen';
import NavigationBar from './components/NavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            options={{
              headerShown:false,
            }}
            component={NavigationBar}
          ></Stack.Screen>
          <Stack.Screen
            name="OrderScreen"
            options={{
              headerBackTitle: "Pedidos",
              headerTitleAlign: "center",
            }}
            component={OrderScreen}
          ></Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
    
  );
}
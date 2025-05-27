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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Conta') {
              iconName = 'person-circle-outline';
            } else if (route.name === 'Pedidos') {
              iconName = 'list-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Conta" component={AccountScreen} />
        <Tab.Screen name="Pedidos" component={OrderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Product" 
          component={ProductScreen} 
          options={{ title: 'Produtos', headerTitleAlign: 'center' }} 
        />
      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

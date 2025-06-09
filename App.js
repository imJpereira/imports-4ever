import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{ headerTitle: 'Categorias', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

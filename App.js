import React from 'react';
import HomeScreen from './screens/HomeScreen'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';
import SignUp from './screens/SignUpScreen';
import AccountScreen from './screens/AccountScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{
          headerBackTitle: "SignIn",
          headerTitleAlign: "center",
        }}
        component={SignInScreen}
      >
      </Stack.Screen>
      <Stack.Screen
        name="SignUp"
        options={{
          headerBackTitle: "SignUp",
          headerTitleAlign: "center",
        }}
        component={SignUp}
      >
      </Stack.Screen>
 
      <Stack.Screen
          name="HomePage"
          options={{
            headerBackTitle: "4Ever Imports",
            headerTitleAlign: "center",
          }}
          component={HomeScreen}
      >
      </Stack.Screen>
           
      <Stack.Screen
          name="Account"
          options={{
            headerBackTitle: "4Ever Imports",
            headerTitleAlign: "center",
          }}
          component={AccountScreen}
      >
      </Stack.Screen>

      <Stack.Screen
          name="OrderScreen"
          options={{
            headerBackTitle: "4Ever Imports",
            headerTitleAlign: "center",
          }}
          component={OrderScreen}
      >
      </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
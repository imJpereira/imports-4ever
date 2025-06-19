import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen from './screens/OrderScreen';
import NavigationBar from './components/NavigationBar';
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProductScreen from './screens/ProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCartScreen from "./screens/ShoppingCartScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>

    <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{
              headerBackTitle: "Entrar",
              headerTitleAlign: "center",
            }}
            component={SignInScreen}
          ></Stack.Screen>

          <Stack.Screen
            name="SignUp"
            options={{
              headerBackTitle: "Cadastrar",
              headerTitleAlign: "center",
            }}
            component={SignUpScreen}
          ></Stack.Screen>

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

           <Stack.Screen
            name="ProductScreen"
            options={{
              headerBackTitle: "Produtos",
              headerTitleAlign: "center",
            }}
            component={ProductScreen}
          ></Stack.Screen> 

           <Stack.Screen
            name="ProductDetails"
            options={{
              headerBackTitle: "Produto",
              headerTitleAlign: "center",
            }}
            component={ProductDetailsScreen}
          ></Stack.Screen> 

      </Stack.Navigator>

    </NavigationContainer>
    
  );
}
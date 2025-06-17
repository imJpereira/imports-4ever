
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen from './screens/OrderScreen';
import NavigationBar from './components/NavigationBar';
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TeamCreateScreen from './screens/TeamCreateScreen';
import SportCreateScreen from "./screens/SportCreateScreen";
import CategoryCreateScreen from "./screens/CategoryCreateScreen";
import AccountDataScreen from "./screens/AccountDataScreen";

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

          <Stack.Screen
            name="ShoppingCart"
            options={{
              headerBackTitle: "Carrinho",
              headerTitleAlign: "center",
            }}
            component={ShoppingCartScreen}
          ></Stack.Screen> 

          <Stack.Screen
            name="Checkout"
            options={{
              headerBackTitle: "Finalizar Pedido",
              headerTitleAlign: "center",
            }}
            component={CheckoutScreen}
          ></Stack.Screen>
          
          <Stack.Screen
            name="SportCreate"
            options={{
              headerBackTitle: "Cadastro de Esportes",
              headerTitleAlign: "center",
            }}
            component={SportCreateScreen}
          ></Stack.Screen>

          <Stack.Screen
            name="TeamCreate"
            options={{
              headerBackTitle: "Cadastro de Time",
              headerTitleAlign: "center",
            }}
            component={TeamCreateScreen}
          ></Stack.Screen>
          
          <Stack.Screen
            name="CategoryCreate"
            options={{
              headerBackTitle: "Cadastro de Time",
              headerTitleAlign: "center",
            }}
            component={CategoryCreateScreen}
          ></Stack.Screen>
          
          <Stack.Screen
            name="AccountData"
            options={{
              headerBackTitle: "Cadastro de Time",
              headerTitleAlign: "center",
            }}
            component={AccountDataScreen}
          ></Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
    
  );
}
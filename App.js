import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen from './screens/OrderScreen';
import NavigationBar from './components/NavigationBar';
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import AccountDataScreen  from './screens/AccountDataScreen';
import CategorCreateScreen from './screens/CategoryCreateScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SportCreateScreen from './screens/SportCreateScreen';
import TeamCreateScreen from './screens/TeamCreateScreen';


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
            name="AccountData"
            component={AccountDataScreen}
            options={{ title: 'Dados Pessoais', headerTitleAlign: 'center' }}
          />

          <Stack.Screen
            name="CategoryCreate"
            component={CategorCreateScreen}
            options={{ title: 'Categoria', headerTitleAlign: 'center' }}
          />

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Produto', headerTitleAlign: 'center' }}
          />

          <Stack.Screen
            name="SportCreate"
            component={SportCreateScreen}
            options={{ title: 'Esporte', headerTitleAlign: 'center' }}
          />

          <Stack.Screen
            name="TeamCreate"
            component={TeamCreateScreen}
            options={{ title: 'Time', headerTitleAlign: 'center' }}
          />

      </Stack.Navigator>

    </NavigationContainer>
    
  );
}
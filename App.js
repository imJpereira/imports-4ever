import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";

export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Meu Carrinho">
        <Stack.Screen name="Meu Carrinho" component={ShoppingCartScreen}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

export default function App() {
  
  const Stack = createNativeStackNavigator();
  
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Register" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

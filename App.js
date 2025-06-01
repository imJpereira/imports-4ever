import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerBackTitle: "Personagens",
            headerTitleAlign: "center",
          }}
          component={HomeScreen}
          >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

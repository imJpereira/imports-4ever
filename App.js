import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "./screens/CategoriesScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";

export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductDetailsScreen"
          options={{
            headerBackTitle: "Personagens",
            headerTitleAlign: "center",
          }}
          component={ProductDetailsScreen}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

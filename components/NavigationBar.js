import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
      
              tabBarIcon: ({ focused , size, color}) => {
                let iconName;
      
                if (route.name === 'Início') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Carrinho') {
                  iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Perfil') {
                  iconName = focused ? 'person' : 'person-outline';
                }
      
                return <Ionicons name={iconName} size={size} color={color}/>;
              },
      
              tabBarActiveTintColor: '#06C823',
              tabBarInactiveTintColor: '#c1c1c1',
            })}
          >
            <Tab.Screen
              name="Início"
              options={{
                headerTitleAlign: 'center'
              }}
              component={HomeScreen}
            ></Tab.Screen>
      
            <Tab.Screen
              name="Carrinho"
              options={{
                headerTitleAlign: 'center'
              }}
              component={ShoppingCartScreen}
            ></Tab.Screen>

            <Tab.Screen
              name="Perfil"
              options={{
                headerTitleAlign: 'center'
              }}
              component={AccountScreen}
            ></Tab.Screen>
      
          </Tab.Navigator>
        )
}
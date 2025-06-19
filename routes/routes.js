import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import AccountScreen from "../screens/AccountScreen";
import AccountDataScreen from "../screens/AccountDataScreen";
import OrderScreen from "../screens/OrderScreen";
import CreateProduct from "../screens/CreateProduct";
import CategoryCreateScreen from "../screens/CategoryCreateScreen";
import SportCreateScreen from "../screens/SportCreateScreen";
import TeamCreateScreen from "../screens/TeamCreateScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
 function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                options={{
                headerTitleAlign: 'center'
                }}
                component={HomeScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="ProductScreen"
                options={{
                headerTitleAlign: 'center'
                }}
                component={ProductScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="ProductDetailsScreen"
                options={{
                headerTitleAlign: 'center'
                }}
                component={ProductDetailsScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}


function OrderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ShoppingCartScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={ShoppingCartScreen}
            ></Stack.Screen>   
            <Stack.Screen
                name="CheckoutScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={CheckoutScreen}
            ></Stack.Screen> 
        </Stack.Navigator> 
    );  
}

function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AccountScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={AccountScreen}
            ></Stack.Screen>   
            <Stack.Screen
                name="AccountDataScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={AccountDataScreen}
            ></Stack.Screen> 
            <Stack.Screen
                name="OrderScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={OrderScreen}
            ></Stack.Screen> 
            <Stack.Screen
                name="CreateProduct"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={CreateProduct}
            ></Stack.Screen> 
            <Stack.Screen
                name="CategoryCreateScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={CategoryCreateScreen}
            ></Stack.Screen> 
            <Stack.Screen
                name="SportCreateScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={SportCreateScreen}
            ></Stack.Screen> 
            <Stack.Screen
                name="TeamCreateScreen"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={TeamCreateScreen}
            ></Stack.Screen> 
        </Stack.Navigator> 
    );  
}

export default function Routes() {
    const { user } = useAuth();

    if (!user) {
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
                </Stack.Navigator>
            </NavigationContainer>
        );
    }


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false,
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
                component={HomeStack}
            ></Tab.Screen>
    
            <Tab.Screen
                name="Carrinho"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={OrderStack}
            ></Tab.Screen>

            <Tab.Screen
                name="Perfil"
                options={{
                    headerTitleAlign: 'center'
                }}
                component={AccountStack}
            ></Tab.Screen>
    
            </Tab.Navigator>
        </NavigationContainer>
    );

}
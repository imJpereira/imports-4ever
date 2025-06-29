import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import HomeScreen from "../screens/app/HomeScreen";
import ProductScreen from "../screens/app/ProductScreen";
import ProductDetailsScreen from "../screens/app/ProductDetailsScreen";
import ShoppingCartScreen from "../screens/app/ShoppingCartScreen";
import CheckoutScreen from "../screens/app/CheckoutScreen";
import AccountScreen from "../screens/app/AccountScreen";
import AccountDataScreen from "../screens/app/AccountDataScreen";
import OrderScreen from "../screens/app/OrderScreen";
import CreateProduct from "../screens/app/CreateProduct";
import CategoryCreateScreen from "../screens/app/CategoryCreateScreen";
import SportCreateScreen from "../screens/app/SportCreateScreen";
import TeamCreateScreen from "../screens/app/TeamCreateScreen";
import CategoriesScreen from '../screens/app/CategoriesScreen';
import SportsScreen from '../screens/app/SportsScreen';
import TeamsScreen from '../screens/app/TeamsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SportsScreen"
        component={SportsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={({ navigation }) => ({
          headerTitle: "Categorias",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SportsScreen"
        component={SportsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
     
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AccountDataScreen"
        component={AccountDataScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="CategoryCreateScreen"
        component={CategoryCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SportCreateScreen"
        component={SportCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="TeamCreateScreen"
        component={TeamCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
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
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerBackTitle: "Entrar", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerBackTitle: "Cadastrar", headerTitleAlign: "center" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (user.type === "Admin") {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === "Inicio") iconName = focused ? "home" : "home-outline";
              else if (route.name === "Carrinho") iconName = focused ? "cart" : "cart-outline";
              else if (route.name === "Categorias") iconName = focused ? "grid" : "grid-outline";
              else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#06C823",
            tabBarInactiveTintColor: "#c1c1c1",
          })}
        >
          <Tab.Screen name="Inicio" component={HomeStack} />
          <Tab.Screen name="Carrinho" component={OrderStack} />
          <Tab.Screen
            name="Categorias"
            component={CategoriesStack} 
            options={{ title: "Categorias" }}
          />
          <Tab.Screen name="Perfil" component={AccountStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "Inicio") iconName = focused ? "home" : "home-outline";
            else if (route.name === "Carrinho") iconName = focused ? "cart" : "cart-outline";
            else if (route.name === "Categorias") iconName = focused ? "grid" : "grid-outline";
            else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#06C823",
          tabBarInactiveTintColor: "#c1c1c1",
        })}
      >
        <Tab.Screen name="Inicio" component={HomeStack} />
        <Tab.Screen name="Carrinho" component={OrderStack} />
        <Tab.Screen
          name="Categorias"
          component={CategoriesStack} 
          options={{ title: "Categorias" }}
        />
        <Tab.Screen name="Perfil" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

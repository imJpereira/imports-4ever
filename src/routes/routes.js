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
        name="Página Inicial"
        component={HomeScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Produtos"
        component={ProductScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Sobre o produto"
        component={ProductDetailsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Esportes"
        component={SportsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Times"
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
        name="Categorias"
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
        name="Produtos"
        component={ProductScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Sobre o produto"
        component={ProductDetailsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Esportes"
        component={SportsScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Times"
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
        name="Carrinho"
        component={ShoppingCartScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Checkout do Pedido"
        component={CheckoutScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Pedidos"
        component={OrderScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}


function AccountStackAdmin() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={AccountScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Conta"
        component={AccountDataScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Pedidos"
        component={OrderScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Cadastro de Produtos"
        component={CreateProduct}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Cadastro de Categorias"
        component={CategoryCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Cadastro de Esportes"
        component={SportCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Cadastro de Times"
        component={TeamCreateScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}


function AccountStackUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={AccountScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Conta"
        component={AccountDataScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Pedidos"
        component={OrderScreen}
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
            name="Entrar"
            component={SignInScreen}
            options={{ headerBackTitle: "Entrar", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Cadastrar"
            component={SignUpScreen}
            options={{ headerBackTitle: "Cadastrar", headerTitleAlign: "center" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const isAdmin = user.type === "Admin";

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
        <Tab.Screen 
          name="Inicio" 
          component={HomeStack} 
          options={{ title: "Página Inicial" }}
          />
        <Tab.Screen 
          name="Carrinho" 
          component={OrderStack} 
          options={{ title: "Carrinho" }}
          />
        <Tab.Screen
          name="Categorias"
          component={CategoriesStack}
          options={{ title: "Categorias" }}
        />
        <Tab.Screen
          name="Perfil"
          component={isAdmin ? AccountStackAdmin : AccountStackUser}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

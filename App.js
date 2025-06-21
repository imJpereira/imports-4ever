import { StatusBar } from "expo-status-bar";
import AuthProvider from "./src/contexts/AuthContext";
import ShoppingCartProvider from "./src/contexts/ShoppingCartContext"
import Routes from "./src/routes/routes"

export default function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Routes />
        <StatusBar style="auto" />
      </ShoppingCartProvider>
    </AuthProvider>
  );
}
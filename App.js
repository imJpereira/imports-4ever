import { StatusBar } from "expo-status-bar";
import AuthProvider from "./context/AuthContext";
import Routes from "./routes/routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
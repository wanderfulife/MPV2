import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import { AuthProvider } from "./src/Hooks/UseAuth";
import AppNavigator from "./src/AppNavigator/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <AuthProvider>
          {/* Passes down the auth to children. */}
          <AppNavigator />
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}

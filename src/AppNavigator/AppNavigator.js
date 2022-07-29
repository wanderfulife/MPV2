import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/Home/HomeScreen";
import ChatScreen from "../Screens/Chat/ChatScreen";
import LoginScreen from "../Screens/Login/LoginScreen";
import SignUpScreen from "../Screens/Login/SignUpScreen";

import useAuth from "../Hooks/UseAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}

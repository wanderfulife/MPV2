import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/Home/HomeScreen";
import ChatScreen from "../Screens/Chat/ChatScreen";
import LoginScreen from "../Screens/Login/LoginScreen";
import SignUpScreen from "../Screens/Login/SignUpScreen";
import InformationScreen from "../Screens/Information/InformationScreen";

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
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "fullScreenModal"}}>
            <Stack.Screen name="Information" component={InformationScreen}></Stack.Screen>
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}

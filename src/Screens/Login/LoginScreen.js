import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {

const navigation = useNavigation();


  return (
    <SafeAreaView className={safeArea}>
      <KeyboardAvoidingView
        className={container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput className={input} placeholder="Email" />
        <TextInput className={input} placeholder="Password" secureTextEntry />

        <TouchableOpacity className={loginButton}>
          <Text className={topTextInput}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text className={bottomTextInput}>
            Register
          </Text>
          <Text className={logo}>MORE PAY</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const bottomTextInput = "text-center text-white font-bold pt-6";
const container = "flex-1 justify-center items-center";
const input = "text-center bg-white p-4 m-1 rounded-2xl w-52 font-semibold";
const loginButton = "p-2 rounded-2xl my-2 w-36 bg-green-400";
const logo = "text-center text-green-400 font-bold text-4xl pt-10";
const topTextInput = "text-center text-white font-bold m-2";
const safeArea = "flex-1 bg-indigo-600";

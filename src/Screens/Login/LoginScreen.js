import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("pwd", password);
      signInWithEmail(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const getData = async () => {
    try {
      const mail = await AsyncStorage.getItem("email");
      const pwd = await AsyncStorage.getItem("pwd");
      if (mail !== null && pwd !== null) {
        signInWithEmail(mail, pwd);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView className={safeArea}>
      <KeyboardAvoidingView
        className={container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="items-center">
            <Text className="text-center text-white font-bold text-2xl pb-10 pt-6">
              Login
            </Text>
            <TextInput
              className={input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              className={input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <TouchableOpacity
              className={loginButton}
              onPress={() => onSubmit()}
            >
              <Text className={topTextInput}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className={bottomTextInput}>Create new account</Text>
            </TouchableOpacity>
              <Text className={logo}>MORE PAY</Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const bottomTextInput = "text-center text-white font-bold pt-6";
const container = "flex-1 justify-center items-center";
const input = "text-center bg-white p-4 m-1 rounded-2xl w-52 font-semibold";
const loginButton = "p-2 rounded-2xl my-2 w-36 bg-green-400";
const topTextInput = "text-center text-white font-bold m-2";
const logo = "text-center text-green-400 font-bold text-4xl pt-10";
const safeArea = "flex-1 bg-indigo-600";

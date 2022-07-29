import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import useAuth from "../../Hooks/UseAuth";
import {
  AntDesign,
  Entypo,
  Ionicons,
  SimpleLineIcons
} from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className={safeArea}>
      {/* Header */}
      <View className={header}>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="ios-settings-outline" size={30} color="#4ade80" />
        </TouchableOpacity>
        <TouchableOpacity className="">
          <Text className={logo}>MORE PAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const header = "pt-4 items-center justify-around flex-row";
const logo = "text-green-400 font-bold text-2xl";
const safeArea = "flex-1 bg-indigo-600";

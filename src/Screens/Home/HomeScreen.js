import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import useAuth from "../../Hooks/UseAuth";

export default function Home() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>I am Home</Text>
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}

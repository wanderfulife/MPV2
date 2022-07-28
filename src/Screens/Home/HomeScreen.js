import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>I am Home</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate("Chat")}
      />
    </View>
  );
}

import { View, Text, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View className="self-start bg-green-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 ml-14 my-2">
      <Image
        className="h-12 w-12 rounded-full absolute top-0 -left-14"
        source={{ uri: message.photoURL }}
      />
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;

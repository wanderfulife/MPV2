import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../Hooks/UseAuth";
import getMatchedUserInfo from "../Lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const lastMessage = null;

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg "
      onPress={() => navigation.navigate("Message", {
        matchDetails
      })}
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{
          uri: matchedUserInfo?.photoURL
        }}
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

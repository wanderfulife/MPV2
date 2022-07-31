import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;
  return (
    <View style={styles.screnTransparent}>
      <View className="justify-center px-10 pt-20">
        <Text className="text-white text-2xl text-center mt-5 font-extrabold">
          New Match !!
        </Text>
        <Text className="text-white text-bold text-center m-5">
          you and {userSwiped.displayName} want to work together
        </Text>
      </View>
      <View className="flex-row justify-evenly mt-5 ">
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({
  screnTransparent: {
    height: "100%",
    backgroundColor: "#4f46e5",
    paddingTop: "20%",
    opacity: 0.89
  }
});

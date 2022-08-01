import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Header";
import getMatchedUserInfo from "../../Lib/getMatchedUserInfo";
import useAuth from "../../Hooks/UseAuth";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../../Components/SenderMessage";
import ReceiverMessage from "../../Components/ReceiverMessage";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([])

  const { matchDetails } = params;

  const sendMessage = () => {};

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              messages.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
            className="pl-4"
          ></FlatList>
        </TouchableWithoutFeedback>
        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message ..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title="send" color="#4ade80" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import ChatList from '../../Components/ChatList'


const ChatScreen = () => {
  return (
	  <SafeAreaView >
		  <View className="pt-4">
			  
		<Header title='Chat' />
		<ChatList/>
		  </View>
	</SafeAreaView>
  )
}

export default ChatScreen


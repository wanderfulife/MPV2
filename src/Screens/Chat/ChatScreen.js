import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import ChatList from '../../Components/ChatList'


const ChatScreen = () => {
  return (
	<SafeAreaView>
		<Header title='Chat' />
		<ChatList/>
	</SafeAreaView>
  )
}

export default ChatScreen


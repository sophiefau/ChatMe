import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Display the name in the navigation bar
  useEffect(() => {
    navigation.setOptions({ title: `Welcome, ${name}!` });
  }, [navigation, name]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'Welcome to the chat room',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Button to send
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Chat Bubble
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    // Pass the color background
    <View style={[styles.container, { backgroundColor }]}
    accessibilityLabel="Chat screen"
    > 
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
           accessibilityLabel="Chat interface"
           keyboardShouldPersistTaps="handled" 
        />
         { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
         {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// import storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Display the name in the navigation bar
  useEffect(() => {
    navigation.setOptions({ title: `Welcome, ${name}!` });
  }, [navigation, name]);

  // Query messages to database
  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages == null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]); 

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  // Button to send
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  // Chat Bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

   // Hide InputToolbar to prevent users to send messages while offline
   const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  return (
    // Pass the color background
    <View
      style={[styles.container, { backgroundColor }]}
      accessibilityLabel="Chat screen"
    >
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
        accessibilityLabel="Chat interface"
        keyboardShouldPersistTaps="handled"
      />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

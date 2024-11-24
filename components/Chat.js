import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

   // Display the name in the navigation bar
   useEffect(() => {
    navigation.setOptions({ title: `Welcome, ${name}!` });
  }, [navigation, name]);

return (
  // Pass name and background color from start screen
  <View style={[styles.container, { backgroundColor }]}>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Chat;
import { useState } from "react";
import {
  StyleSheet, View, Text, TextInput, 
  ImageBackground, TouchableOpacity, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";

// Import Firebase auth functions
import { getAuth, signInAnonymously } from "firebase/auth"; 

const Start = ({ navigation }) => {
 // Set up anonymous auth
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Navigate to the Chat screen with route parameters
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          backgroundColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  // Set the user name and background color
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // For iOS, use padding, for Android, use height
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/Background.png")}
            style={styles.background}
          >
            {/* Content Container */}
            <View style={styles.contentContainer}>
              <Text style={styles.appTitle}>ChatMe</Text>

              {/* Input Container */}
              <View style={styles.inputContainer}>
                {/* Enter Your Name */}
                <View style={styles.nameInputContainer}>
                  <TextInput
                    style={styles.nameInputText}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    accessibilityLabel="Name input field"
                    accessibilityHint="Type your name here to proceed to the chat"
                    accessibilityState={{
                      disabled: !name, // Disables the button when the name is empty
                    }}
                  />
                </View>

                {/* Choose Background */}
                <Text style={styles.chooseColorText}>
                  Choose Background Color:
                </Text>
                <View style={styles.chooseColorContainer}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        backgroundColor === color && styles.selectedColor,
                      ]}
                      onPress={() => setBackgroundColor(color)}
                      accessibilityRole="radio"
                      accessibilityLabel={`Select background color ${color}`}
                      accessibilityState={{
                        selected: backgroundColor === color,
                      }}
                    />
                  ))}
                </View>

                {/* Enter Chat */}
                <TouchableOpacity
                  onPress={() => {
                    if (name == '') {
                        Alert.alert('Please enter your name');
                    } else {
                        signInUser();
                    }
                }}
                  title="Start Chatting"
                  style={styles.buttonEnterChat}
                  accessibilityRole="button"
                  accessibilityLabel="Enter chat button"
                  accessibilityHint="Navigates to the chat screen"
                  disabled={!backgroundColor} // Require a background color selection
                >
                  <Text style={styles.enterChatText}>
                    Start Chatting
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  appTitle: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "88%",
    height: "44%",
    padding: 20,
    marginBottom: 20,
  },
  nameInputContainer: {
    width: "88%",
    height: 55,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  nameInputText: {
    fontSize: 16,
    fontWeight: "300",
    color: " #757083",
    opacity: 0.5,
    textAlignVertical: "center",
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#171717",
    marginBottom: 10,
  },
  chooseColorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "82%",
    marginBottom: 40,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#757083",
  },
  buttonEnterChat: {
    width: "88%",
    height: 55,
    backgroundColor: "#757083",
    padding: 15,
    alignItems: "center",
  },
  enterChatText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default Start;
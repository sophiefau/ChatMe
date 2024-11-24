import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Start = ({ navigation }) => {
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
            source={require("../img/Background.png")}
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
                    n
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
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
                    />
                  ))}
                </View>

                {/* Enter Chat */}
                <TouchableOpacity
                  title="Start Chatting"
                  onPress={() =>
                    navigation.navigate("Chat", { name, backgroundColor })
                  }
                  style={styles.buttonEnterChat}
                >
                  <Text style={styles.enterChatText}>Enter Chat</Text>
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

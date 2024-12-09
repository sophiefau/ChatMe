import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import functionalities
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  // Send picture
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      console.log("here");
      onSend([
        {
          _id: `${userID}-${new Date().getTime()}`,
          text: "",
          user: {
            _id: userID,
            name: "user name",
          },
          createdAt: new Date(),
          image: imageURL,
        },
      ]);
    });
  };

  // Send location
  const getLocation = async () => {
    console.log("click here");
    let permissions = await Location.requestForegroundPermissionsAsync();
    console.log(permissions);
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      if (location) {
        onSend([
          {
            _id: `${userID}-${new Date().getTime()}`, // Generate a unique ID
            createdAt: new Date(),
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
            user: {
              _id: userID,
              name: "user name",
            },
          },
        ]);
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
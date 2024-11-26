// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Create the navigator
const Stack = createStackNavigator();

// import the screens
import Chat from "./components/Chat";
import Start from "./components/Start";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVw3Pwp3eETBRHUFpdSnuE9g-F0D7oTg0",
  authDomain: "chatme-62d79.firebaseapp.com",
  projectId: "chatme-62d79",
  storageBucket: "chatme-62d79.firebasestorage.app",
  messagingSenderId: "962084871112",
  appId: "1:962084871112:web:dd541e2b242c7d8ec3befd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

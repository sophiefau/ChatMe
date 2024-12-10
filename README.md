# ChatMe

ChatMe is a real-time mobile chat app built with React Native and can run on both iOS and Android devices. The app provides users with a chat interface and options to share images and their location.

## Key Features

- Real-time messaging
- Background customization
- Send a picture, from the galery or taken with the phone
- Location Sharing
- Offline access to cached messages

## Technologies

- React Native → JavaScript framework
- Expo → Development platform
- Android Studio Emulator → Testing
- GiftedChat → React Native chat library
- Firebase → Database & file storage
- AsyncStorage → Caching for offline mode
- React Native Maps → Display shared location
- ImagePicker → Upload and share images

### Start the expo project

You can follow these steps to set up the project locally:

1. Clone the repository:

2. Install dependencies:

>npm install -g expo-cli

You need to have [Node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) already installed. This project runs on Node 23.3.0.

3. Set up Firestore and Storage
- Go to the [Firebase Console](console.firebase.google.com).
- Create a new project.
- Add a Web app to the project.
- Copy the Firebase configuration settings and and them to the "Firebase credentials" section of the "App.js".
- In your Firebase console, navigate to Firestore Database and create a new database for the messages.
- Navigate to Storage and set up Firebase Storage for the pictures.

4. Run the project:
>npx expo start

5. Set up Expo-Go on your own mobile device or a virtual device via Android Studio.

### Preview

![ChatMe Screenshots of the interface](https://github.com/sophiefau/ChatMe/blob/main/assets/ChatMe.png)


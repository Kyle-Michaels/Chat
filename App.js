// Import Screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import React
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Ignore warningmessage
LogBox.ignoreLogs(['@firebase/auth: Auth (10.3.1):']);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCUlYwB9aWUXh7zB1VZ9Fs-27mNfhFxjls",
    authDomain: "chat-app-6b059.firebaseapp.com",
    projectId: "chat-app-6b059",
    storageBucket: "chat-app-6b059.appspot.com",
    messagingSenderId: "331405396880",
    appId: "1:331405396880:web:4b859973f2c704910e8115"
  };

  // Initialize firebase and get a reference to database
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Define a new state for network connectivity
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props =>
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
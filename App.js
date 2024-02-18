// Import Screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import and ignore warning log
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['@firebase/auth: Auth (10.3.1):']);

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
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBGColor] = useState('');

  const handleBGColor = (color) => {
    setBGColor(color);
  };

  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { userID: result.user.uid, name: name, backgroundColor: bgColor });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again later.');
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bgImg.png')} style={styles.bgImg}>
        <Text style={styles.appTitle}>Chat App</Text>
        <View style={styles.loginContainer}>
          <View style={styles.usernameContainer}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.username}
              value={name}
              onChangeText={setName}
              placeholder='Your Name'
            />
          </View>
          <View style={styles.bgColorContainer}>
            <Text style={[styles.username, styles.bgColorText]}>Choose Background Color:</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.bgColorButton, { backgroundColor: '#090C08', opacity: bgColor === '#090C08' ? 1.0 : 0.5 }]}
                onPress={() => handleBGColor('#090C08')}
              />
              <TouchableOpacity style={[styles.bgColorButton, { backgroundColor: '#474056', opacity: bgColor === '#474056' ? 1.0 : 0.5 }]}
                onPress={() => handleBGColor('#474056')}
              />
              <TouchableOpacity style={[styles.bgColorButton, { backgroundColor: '#8A95A5', opacity: bgColor === '#8A95A5' ? 1.0 : 0.5 }]}
                onPress={() => handleBGColor('#8A95A5')}
              />
              <TouchableOpacity style={[styles.bgColorButton, { backgroundColor: '#B9C6AE', opacity: bgColor === '#B9C6AE' ? 1.0 : 0.5 }]}
                onPress={() => handleBGColor('#B9C6AE')}
              />
            </View>
          </View>
          <View style={styles.srtChattingContainer}>
            <TouchableOpacity
              style={styles.srtChattingBtn}
              onPress={signInUser}
            >
              <Text style={[styles.appTitle, styles.srtChattingTxt]}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff'
  },
  loginContainer: {
    height: '44%',
    width: '88%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: '20%'
  },
  usernameContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    height: '20%',
    width: '88%',
    padding: 10
  },
  username: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    height: '100%',
    paddingLeft: 20
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginLeft: 10
  },
  bgColorContainer: {
    justifyContent: 'space-around',
    alignContent: 'flex-start',
    height: '20%',
    width: '88%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
    marginTop: '5%'
  },
  bgColorButton: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  bgColorText: {
    opacity: 1.0,
    height: 'auto'
  },
  srtChattingContainer: {
    height: '20%',
    width: '88%',
    borderWidth: 1,
  },
  srtChattingTxt: {
    fontSize: 16,
  },
  srtChattingBtn: {
    backgroundColor: '#757083',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Start;
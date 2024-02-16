import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text>Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Chat;
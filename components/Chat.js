import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { userID, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        },
        left: {
          backgroundColor: '#fff'
        }
      }}
    />
  }

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })

    //Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }

  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === 'androud' ? <KeyboardAvoidingView behavior='height' /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Chat;
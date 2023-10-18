import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '../../config';

const ChatScreen = ({ route }) => {
  const { otherUserUID, currentUserUID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Функция для получения сообщений из Firebase и установки их в состояние.
    const fetchMessages = async () => {
      const messagesRef = firebase.database().ref('messages');
      const query = messagesRef
        .orderByChild('createdAt')
        .equalTo(`${currentUserUID}_${otherUserUID}`)
        .limitToLast(20);

      query.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.val();
          const messagesArray = Object.values(messagesData);
          setMessages(messagesArray.reverse());
        }
      });

      return () => {
        query.off('value');
      };
    };

    fetchMessages();
  }, [currentUserUID, otherUserUID]);

  const onSend = (newMessages = []) => {
    const messagesRef = firebase.database().ref('messages');
    const newMessage = newMessages[0];

    // Создание сообщения и добавление его в базу данных Firebase.
    const message = {
      _id: newMessage._id,
      text: newMessage.text,
      createdAt: newMessage.createdAt.getTime(),
      user: {
        _id: currentUserUID,
      },
      receiverId: otherUserUID,
    };

    const messageKey = messagesRef.push().key;
    messagesRef.child(messageKey).set(message);
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: currentUserUID,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ChatScreen;

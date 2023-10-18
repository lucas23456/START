import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../config';
import { Picker } from '@react-native-picker/picker';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const registerUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://start-6d4cc.firebaseapp.com',
      });
      alert('Мы отправили письмо вам на почту');

      const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
      await userRef.set({
        displayName,
        lastName,
        email,
        phoneNumber, // Добавляем номер телефона
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Регистрация</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Ваше имя'
        onChangeText={(displayName) => setDisplayName(displayName)}
        autoCorrect={false}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Ваша фамилия'
        onChangeText={(lastName) => setLastName(lastName)}
        autoCorrect={false}
      />
      <TextInput
      style={styles.textInput}
      placeholder='Номер телефона для whatsapp'
      onChangeText={(phone) => setPhoneNumber(phone)}
      autoCorrect={false}
      keyboardType='phone-pad' // Для ввода номера телефона
    />
      <TextInput
        style={styles.textInput}
        placeholder='Почта'
        onChangeText={(email) => setEmail(email)}
        autoCorrect={false}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.textInput}
        placeholder='Пароль'
        onChangeText={(password) => setPassword(password)}
        autoCorrect={false}
        autoCapitalize='none'
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => registerUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white' }}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: 200,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
export default Registration;

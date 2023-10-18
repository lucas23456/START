import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {

      alert(
        'Что-то пошло не так',
        'Наверное вы ввели неправильный логин или пароль'
      );

    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Вход</Text>
      <View style={{ marginTop: 40, backgroundColor: "white" }}>
        <TextInput
          style={styles.textInput}
          placeholder='Почта'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder='Пароль'
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
        <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white' }}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.Regbutton}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Первый раз? Зарегистрируйтесь!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 50,
  },
  Regbutton: {
    marginTop: 50,
    height: 70,
    width: 315,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 50,
  }
})
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';


export default function App() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [about, setAbout] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        setName(snapshot.data().firstName);
        setPhotoURL(snapshot.data().photoURL);
        setAbout(snapshot.data().about);



      } else {
        console.log('Такого пользователя не существует');
      }
    };

    fetchUserData();
  }, []);


  const setUserAbout = async () => {
    const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    await userRef.update({ about: about });

    alert("Спасибо что рассказали о себе")
  }


  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImageSelected(true);

      if (!result.uri) {
        // Если ссылка у картинки пустая, установить другую картинку
        setImage('../assets/START_LOGOS/icon.png');
        return;
      }

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      });

      const imageName = `profile_${firebase.auth().currentUser.uid}.jpg`;
      const ref = firebase.storage().ref().child(`profilePictures/${imageName}`);
      const snapshot = ref.put(blob);

      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true);
        },
        (error) => {
          setUploading(false);
          console.log(error);
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            setUploading(false);
            console.log('Download URL: ', downloadURL);
            setImage(downloadURL);
            blob.close();

            alert('Перезапустите приложение')

            // Save the photoURL in Firestore
            const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
            await userRef.update({ photoURL: downloadURL });

            return downloadURL;
          });
        }
      );
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      
      <TouchableOpacity onPress={handleImageUpload}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.photo} />
        ) : (
          <Image source={require('../assets/START_LOGOS/icon.png')} style={styles.photo} />
        )}
      </TouchableOpacity>

      {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
        Здравствуйте, {name}!
      </Text> */}

      <Text style={styles.text}>О себе:</Text>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={styles.input}
        placeholder={`Расскажите о себе: ${about ? about : ''}`}
        value={about}
        onChangeText={setAbout}
      />

      <TouchableOpacity style={styles.button} onPress={setUserAbout}>
        <Text style={styles.buttonText}>Обновить профиль</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 50,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    height: 200,
    fontSize: 20,
    borderRadius: 11,
    color: "#888787",
    backgroundColor: "#f3f1f1",
    marginBottom: 50,
    textAlign: 'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 20
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});
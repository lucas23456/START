import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBm1BzFHy17y0WolAtg8zAar80Rd0XAYBs",
    authDomain: "start-6d4cc.firebaseapp.com",
    projectId: "start-6d4cc",
    databaseURL: 'https://start-6d4cc-default-rtdb.europe-west1.firebasedatabase.app', 
    storageBucket: "start-6d4cc.appspot.com",
    messagingSenderId: "531745774386",
    appId: "1:531745774386:web:50fe0e85669f880e55552b",
    measurementId: "G-6PDCHKQVP9"
  };

  
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase };
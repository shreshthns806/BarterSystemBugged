import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDfhqke9Zv61Q8Ggxz6-NKj6lyn5qLQQwI",
  authDomain: "bartersystem-7fd15.firebaseapp.com",
  databaseURL: "https://bartersystem-7fd15.firebaseio.com",
  projectId: "bartersystem-7fd15",
  storageBucket: "bartersystem-7fd15.appspot.com",
  messagingSenderId: "813190668483",
  appId: "1:813190668483:web:8f4b37d1d0dc8e213e4276"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
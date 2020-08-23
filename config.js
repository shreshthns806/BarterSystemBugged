import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCRAvbTmqgcbekaBAt3yzXAx070FKQnLHk",
    authDomain: "bartersystem-a376b.firebaseapp.com",
    databaseURL: "https://bartersystem-a376b.firebaseio.com",
    projectId: "bartersystem-a376b",
    storageBucket: "bartersystem-a376b.appspot.com",
    messagingSenderId: "915585310695",
    appId: "1:915585310695:web:e1771f43a8535abb2b6742"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
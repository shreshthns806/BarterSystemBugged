import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCS_GT6_HYkG0PVEVFf10mvxEPDguwmFAI",
  authDomain: "goodsale-43ee7.firebaseapp.com",
  databaseURL: "https://goodsale-43ee7.firebaseio.com",
  projectId: "goodsale-43ee7",
  storageBucket: "goodsale-43ee7.appspot.com",
  messagingSenderId: "847002374703",
  appId: "1:847002374703:web:5b346efb0fe8ec4d556cda"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
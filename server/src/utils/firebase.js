// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyALu-EPKutSVhMoCuW8Kvi2vfDgTmJUwNg",
    authDomain: "prefab-pursuit-299607.firebaseapp.com",
    projectId: "prefab-pursuit-299607",
    storageBucket: "prefab-pursuit-299607.appspot.com",
    messagingSenderId: "358184177220",
    appId: "1:358184177220:web:6aaa2e66a95bbb56877611",
    measurementId: "G-80RT9BHNMJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const functions = require('firebase-functions');

  exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
      .onCreate((snapshot, context) => {
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        return snapshot.ref.parent.child('uppercase').set(uppercase);
      });

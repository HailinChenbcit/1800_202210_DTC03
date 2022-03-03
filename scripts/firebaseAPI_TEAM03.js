// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDB-1XU01E7rUyG9z1mpVg0N9a85xuXk1U",
    authDomain: "dtc03-d7732.firebaseapp.com",
    projectId: "dtc03-d7732",
    storageBucket: "dtc03-d7732.appspot.com",
    messagingSenderId: "206936672546",
    appId: "1:206936672546:web:bd2e5e8c77b385cb427d7b"
  };


  //--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
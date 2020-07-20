import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCdTx55AnwVv8tw_jqoWEDyiVMX7pahn4Y",
  authDomain: "outdoor-vue.firebaseapp.com",
  databaseURL: "https://outdoor-vue.firebaseio.com",
  projectId: "outdoor-vue",
  storageBucket: "outdoor-vue.appspot.com",
  messagingSenderId: "936161685309",
  appId: "1:936161685309:web:cbb20f9716a880a7299f54",
  measurementId: "G-C4675PE78K"
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

export default firestore;

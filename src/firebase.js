import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQuk82XpD7EMOXrlJpjfRO0LWMJVn4lfA",
  authDomain: "snapchat-clone-4cf3d.firebaseapp.com",
  projectId: "snapchat-clone-4cf3d",
  storageBucket: "snapchat-clone-4cf3d.appspot.com",
  messagingSenderId: "860197586443",
  appId: "1:860197586443:web:9a5cafbdd950927a5da90e",
  measurementId: "G-DMNBCMTBJV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, storage, provider };
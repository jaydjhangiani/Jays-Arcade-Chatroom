import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAkg-D-sylglTvFsOrAhq7lZIHsnafOQRU",
  authDomain: "jays-arcade-2eec1.firebaseapp.com",
  databaseURL: "https://jays-arcade-2eec1.firebaseio.com",
  projectId: "jays-arcade-2eec1",
  storageBucket: "jays-arcade-2eec1.appspot.com",
  messagingSenderId: "907753522026",
  appId: "1:907753522026:web:39aea5dd543e1404445b13",
  measurementId: "G-39JQMGHY5Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export {auth};

export default db; 


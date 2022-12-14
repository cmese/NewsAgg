import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCifxtiKw-PUl_9rWaHKVFB_Fyup4nUud0",
  authDomain: "newsagg-6ee94.firebaseapp.com",
  projectId: "newsagg-6ee94",
  storageBucket: "newsagg-6ee94.appspot.com",
  messagingSenderId: "895876007398",
  appId: "1:895876007398:web:b4c6120d5bf49def2a0227",
  measurementId: "G-5GF5BR2D96"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;

//const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore(app);
//const db = getFirestore(app);

//!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// const db = firebase.firestore();
//export const db = getFirestore();
//export default db = firebaseApp.firestore();


// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

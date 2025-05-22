import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Y4-CnxHiJx7o6HV5rVgTMoOvyam7QPk",
  authDomain: "agrotech-bc7d6.firebaseapp.com",
  projectId: "agrotech-bc7d6",
  storageBucket: "agrotech-bc7d6.firebasestorage.app",
  messagingSenderId: "871677468610",
  appId: "1:871677468610:web:ab06ef58dcb9b7d345c05b",
  measurementId: "G-CML9WS9KYW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { app, db };
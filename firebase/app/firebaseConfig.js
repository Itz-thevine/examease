// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5oQdteohm-TN6JqTmyIrWKGx3Ee0QrEE",
  authDomain: "examease-f4dd5.firebaseapp.com",
  projectId: "examease-f4dd5",
  storageBucket: "examease-f4dd5.appspot.com",
  messagingSenderId: "343988863650",
  appId: "1:343988863650:web:3eee33dd051a9f9e17cdfb",
  measurementId: "G-QGPRXZ9VSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcDbgG3RlIbmNC4lzb8aNfTMzv9HjHeC4",
  authDomain: "carpishop-697ac.firebaseapp.com",
  projectId: "carpishop-697ac",
  storageBucket: "carpishop-697ac.firebasestorage.app",
  messagingSenderId: "422346410777",
  appId: "1:422346410777:web:2c5374cb1d87024f6c1388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
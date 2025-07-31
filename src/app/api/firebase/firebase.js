// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuBbgwcJR0wWJMq7CFV-VgZMqNtFzDPko",
  authDomain: "iqlaa-9b951.firebaseapp.com",
  projectId: "iqlaa-9b951",
  storageBucket: "iqlaa-9b951.firebasestorage.app",
  messagingSenderId: "728888284570",
  appId: "1:728888284570:web:af08032d700e028a029623",
  measurementId: "G-YVR4ERB4BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);
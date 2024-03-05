// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.API_DOMAIN,
  projectId: process.env.API_PROJECTID,
  storageBucket: process.env.API_STORAGEBUCKET,
  messagingSenderId: process.env.API_MSGSENDERID,
  appId: process.env.API_APPID,
  measurementId: process.env.API_MEASUREMENTID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
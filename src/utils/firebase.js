// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASpfLMtniYcGP5QbFoc1OHC0bgCW8Gu4A",
  authDomain: "netflixgpt-e6ac2.firebaseapp.com",
  projectId: "netflixgpt-e6ac2",
  storageBucket: "netflixgpt-e6ac2.firebasestorage.app",
  messagingSenderId: "910873569452",
  appId: "1:910873569452:web:8bbf0278e9263f66765709",
  measurementId: "G-HVSTHQCTB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
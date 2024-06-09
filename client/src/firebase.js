// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "link-up-66a28.firebaseapp.com",
  projectId: "link-up-66a28",
  storageBucket: "link-up-66a28.appspot.com",
  messagingSenderId: "550938745972",
  appId: "1:550938745972:web:eb721bbc703ca7e81c0521",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

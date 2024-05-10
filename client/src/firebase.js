import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "imobiliariaproject17.firebaseapp.com",
  projectId: "imobiliariaproject17",
  storageBucket: "imobiliariaproject17.appspot.com",
  messagingSenderId: "574414932844",
  appId: "1:574414932844:web:65c5dafaa159a4f5b2c149",
  measurementId: "G-C43WRGB1J3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
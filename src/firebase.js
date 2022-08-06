// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1e5GRikV7gToEVD6zESJP901Bajh6Jto",
  authDomain: "cocktail-project-ed428.firebaseapp.com",
  projectId: "cocktail-project-ed428",
  storageBucket: "cocktail-project-ed428.appspot.com",
  messagingSenderId: "918755741052",
  appId: "1:918755741052:web:7d74b20e52d7f398f4a8f9",
  measurementId: "G-VTVRC22HD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

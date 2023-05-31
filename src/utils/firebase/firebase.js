// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx80Kl7W8s-GuU_-aALDSWZ49wam3I8gQ",
  authDomain: "todo-36a95.firebaseapp.com",
  projectId: "todo-36a95",
  storageBucket: "todo-36a95.appspot.com",
  messagingSenderId: "149471421734",
  appId: "1:149471421734:web:40a811ec613b8833ef4de7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

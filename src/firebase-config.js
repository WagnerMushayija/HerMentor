// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_EdrYn00ENQMibAqPWgX1hM-ymVwPgas",
  authDomain: "hermentor-2acbf.firebaseapp.com",
  projectId: "hermentor-2acbf",
  storageBucket: "hermentor-2acbf.firebasestorage.app",
  messagingSenderId: "1062919338465",
  appId: "Y1:1062919338465:web:3258c86592868a0a1a7aa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

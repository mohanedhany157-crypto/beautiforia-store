/* firebase-config.js */

// 1. Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMKRC8Fs4C11v5c4M-Slf52wUtA2RTZLw",
  authDomain: "beautiforia-store.firebaseapp.com",
  projectId: "beautiforia-store",
  storageBucket: "beautiforia-store.firebasestorage.app",
  messagingSenderId: "489069244876",
  appId: "1:489069244876:web:ed721861d649fe9b3f6d69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize Database and Export it
const db = getFirestore(app);

console.log("Firebase Connected Successfully");

// Export 'db' so you can use it in your other script files
export { db };
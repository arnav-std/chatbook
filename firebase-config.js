import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzKoyoQpXuV199-pLHvKMiilqzPAnSJs4",
  authDomain: "chatbook-5ae85.firebaseapp.com",
  projectId: "chatbook-5ae85",
  storageBucket: "chatbook-5ae85.firebasestorage.app",
  messagingSenderId: "156285374713",
  appId: "1:156285374713:web:8c901213aa42b1bbb81228",
  measurementId: "G-VWLVWQRQ0N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

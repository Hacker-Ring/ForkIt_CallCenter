
  // src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYXiP79DUTdjrobj1qkYDYbrpdULEVYew",
  authDomain: "fir-forkit.firebaseapp.com",
  projectId: "fir-forkit",
  storageBucket: "fir-forkit.firebasestorage.app",
  messagingSenderId: "521504954289",
  appId: "1:521504954289:web:8851cca70fa20235e04f90",
  measurementId: "G-76LYQ06C3Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { signInWithPopup, signOut };

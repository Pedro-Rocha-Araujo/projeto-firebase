import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore" 

const firebaseConfig = {
  apiKey: "AIzaSyDOoAG6-bYPErBkmjJ7hApYKebqa0iUKls",
  authDomain: "projeto-9db79.firebaseapp.com",
  projectId: "projeto-9db79",
  storageBucket: "projeto-9db79.firebasestorage.app",
  messagingSenderId: "942587393724",
  appId: "1:942587393724:web:3937d87ebfde10b63fc2b9",
  measurementId: "G-2ZRV0DG7EN"
};

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
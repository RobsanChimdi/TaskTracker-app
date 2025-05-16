import { initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey:  ,
  authDomain: "practice-b8957.firebaseapp.com",
  projectId: "practice-b8957",
  storageBucket: "practice-b8957.firebasestorage.app",
  messagingSenderId: "522972616820",
  appId: "1:522972616820:web:d292371a219e1b9725d921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
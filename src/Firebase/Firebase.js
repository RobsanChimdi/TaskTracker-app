
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "tasktracker-bc091.firebaseapp.com",
  projectId: "tasktracker-bc091",
  storageBucket: "tasktracker-bc091.firebasestorage.app",
  messagingSenderId: "1057615919783",
  appId: "1:1057615919783:web:78c664180b12b01f967982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJhEBtzLmor0F2LwL5N48zf3ziSP-30CI",
  authDomain: "todolist-9f416.firebaseapp.com",
  projectId: "todolist-9f416",
  storageBucket: "todolist-9f416.firebasestorage.app",
  messagingSenderId: "151373447728",
  appId: "1:151373447728:web:279bc738ce130f3d7363f5",
  databaseURL:"https://todolist-9f416-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
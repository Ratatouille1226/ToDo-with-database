import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-LrLxQtu51vmqEMq_Evesxa2qTVJphAs",
  authDomain: "todo-a1846.firebaseapp.com",
  projectId: "todo-a1846",
  storageBucket: "todo-a1846.firebasestorage.app",
  messagingSenderId: "546292445638",
  appId: "1:546292445638:web:28cc56d90cc5e19a13c2c7",
  measurementId: "G-M65XTJGRT7",
  databaseURL: "https://todo-a1846-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
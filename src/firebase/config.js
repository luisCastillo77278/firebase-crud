import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHE1d2io5LyyLF7DP9_ujf499lsE7tB_c",
  authDomain: "react-crud-c429a.firebaseapp.com",
  projectId: "react-crud-c429a",
  storageBucket: "react-crud-c429a.appspot.com",
  messagingSenderId: "776633327185",
  appId: "1:776633327185:web:5efa5baefd56c329c56270"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
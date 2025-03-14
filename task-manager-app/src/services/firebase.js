import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDH7Ncckb_DyTNJudqKi2E_UsxIgnkXNcE",
  authDomain: "task-manager-app-3c111.firebaseapp.com",
  projectId: "task-manager-app-3c111",
  storageBucket: "task-manager-app-3c111.firebasestorage.app",
  messagingSenderId: "662833057670",
  appId: "1:662833057670:web:8d40cbdd4b5538b3c0a607",
  measurementId: "G-R0ZV544YYF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
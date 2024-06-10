import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDtPP36LIQFc6T6Nu93S7v8rkQGmr3j5J8",
  authDomain: "expense-tracker-51d28.firebaseapp.com",
  projectId: "expense-tracker-51d28",
  storageBucket: "expense-tracker-51d28.appspot.com",
  messagingSenderId: "816002793722",
  appId: "1:816002793722:web:d8786c1c1dff115c260943",
  measurementId: "G-ZPZEZR7SC5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
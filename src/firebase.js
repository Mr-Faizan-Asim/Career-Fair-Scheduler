import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};



// Initialize Firebase first
const app = initializeApp(firebaseConfig);

// Then initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);

// Add at the end of firebase.js
console.log("Firebase initialized:", app);
console.log("Auth service:", auth);
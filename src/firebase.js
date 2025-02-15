import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-nMgYme40CLoY3D5XX24fGXiPd5zM6Ac",
    authDomain: "careerfair-scheduler.firebaseapp.com",
    projectId: "careerfair-scheduler",
    storageBucket: "careerfair-scheduler.firebasestorage.app",
    messagingSenderId: "396253794657",
    appId: "1:396253794657:web:262b44ed53c9b8d0a27520",
    measurementId: "G-JKH9ZTYYSX"
  };
// Initialize Firebase first
const app = initializeApp(firebaseConfig);

// Then initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add at the end of firebase.js
console.log("Firebase initialized:", app);
console.log("Auth service:", auth);
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDthcNG0nXZm7xNVRkb6zlVL7-Y9vl1UUk",
  authDomain: "ghost-ops-94d9d.firebaseapp.com",
  projectId: "ghost-ops-94d9d",
  storageBucket: "ghost-ops-94d9d.firebasestorage.app",
  messagingSenderId: "489432575365",
  appId: "1:489432575365:web:43835c637663380028a8ec",
  measurementId: "G-ZXD5R5E7M3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Connectivity shifted to Live Cloud Infrastructure.
// Localhost resolution disabled.

export { app, db, auth };

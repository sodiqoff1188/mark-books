// src/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFedSbR_JB7SG-luAdT_0KlnrAoFaDACU",
    authDomain: "bookwebsite-6c50f.firebaseapp.com",
    projectId: "bookwebsite-6c50f",
    storageBucket: "bookwebsite-6c50f.firebasestorage.app",
    messagingSenderId: "660967539054",
    appId: "1:660967539054:web:da3f02e338d82ea135017f",
    measurementId: "G-9FLWBMPBJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
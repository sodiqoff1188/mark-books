// Firebase SDK'dan kerakli modullarni import qilish
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase konfiguratsiya obyekti
// Bu ma'lumotlarni o'zingizning Firebase loyihangizdan olishingiz kerak
// (Project Settings -> General -> Your apps -> Firebase SDK snippet -> Config)
const firebaseConfig = {
    apiKey: "AIzaSyBFedSbR_JB7SG-luAdT_0KlnrAoFaDACU",
    authDomain: "bookwebsite-6c50f.firebaseapp.com",
    projectId: "bookwebsite-6c50f",
    storageBucket: "bookwebsite-6c50f.firebasestorage.app",
    messagingSenderId: "660967539054",
    appId: "1:660967539054:web:da3f02e338d82ea135017f",
    measurementId: "G-9FLWBMPBJS"

};

// Firebase'ni ishga tushirish
const app = initializeApp(firebaseConfig);

// Firestore, Storage va Authentication xizmatlarini olish
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Bu obyektlarni boshqa fayllarda ishlatish uchun eksport qilish
export { db, storage, auth };
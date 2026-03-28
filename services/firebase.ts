import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWz0fGViaIYLw_2mx3RYfm5rYnrPpKAiw",
    authDomain: "adwa-pro.firebaseapp.com",
    projectId: "adwa-pro",
    storageBucket: "adwa-pro.appspot.com",
    messagingSenderId: "850999781031",
    appId: "1:850999781031:web:585a69c9d26961e1f05d82"
};

let db;
let firebaseError = null;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (error) {
    console.error("Firebase initialization failed:", error);
    firebaseError = error;
}

export { db, firebaseError };

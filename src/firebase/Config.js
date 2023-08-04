// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const firebaseConfig = {
    apiKey: "AIzaSyCrUXYMZgnmlh1w9FgF0l_9kGeVqs8QyNU",
    authDomain: "eramzi-98e41.firebaseapp.com",
    projectId: "eramzi-98e41",
    storageBucket: "eramzi-98e41.appspot.com",
    messagingSenderId: "903524436650",
    appId: "1:903524436650:web:2ddc151738ac0d34c59ed3",
    measurementId: "G-8Z26BGPZ82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app


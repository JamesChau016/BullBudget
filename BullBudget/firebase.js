// modular SDK (v9+)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCAAl4TOZcxxdKdIbowRgmVR_f3h8Sv0yI",
    authDomain: "bullbudget-9c4af.firebaseapp.com",
    databaseURL: "https://bullbudget-9c4af-default-rtdb.firebaseio.com",
    projectId: "bullbudget-9c4af",
    storageBucket: "bullbudget-9c4af.firebasestorage.app",
    messagingSenderId: "465060082900",
    appId: "1:465060082900:web:0c7fcb881df1180f4bb741",
    measurementId: "G-9176G8VQH2"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('No user is signed in.');
  }
});
// export the services you need:
export const db = getFirestore(app);         // Cloud Firestore
export const rtdb = getDatabase(app);       // Realtime Database (optional)
export const auth = getAuth(app);           // Authentication
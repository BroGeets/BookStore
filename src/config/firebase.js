import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvBZI1eoE1fYB_3W5cgj86eQiqDcpfGrk",
  authDomain: "booktown-31912.firebaseapp.com",
  projectId: "booktown-31912",
  storageBucket: "booktown-31912.appspot.com",
  messagingSenderId: "771915749342",
  appId: "1:771915749342:web:b8cd8481495c895a9e2f4f",
  measurementId: "G-1CYQ0JWQVB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

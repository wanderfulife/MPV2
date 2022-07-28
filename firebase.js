// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5jBeNLjJTJDUdriliVfiS6OlR-4mrzYE",
  authDomain: "regal-thought-357622.firebaseapp.com",
  projectId: "regal-thought-357622",
  storageBucket: "regal-thought-357622.appspot.com",
  messagingSenderId: "963119873667",
  appId: "1:963119873667:web:46506713d5b2f4a307a5b6"
};

let app;

app = firebase.app();

const auth = firebase.auth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage, ref, uploadBytes, getDownloadURL };

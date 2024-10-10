// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTmlx6cTlx1CMafc1EidPN3CtOkaAw1ag",
  authDomain: "diario-digital-3ec30.firebaseapp.com",
  projectId: "diario-digital-3ec30",
  storageBucket: "diario-digital-3ec30.appspot.com",
  messagingSenderId: "528668576527",
  appId: "1:528668576527:web:519353f0a24552efc40c7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore();

// Operación CRUD
export const createTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTask = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newData) =>
  updateDoc(doc(db, "tasks", id), newData);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

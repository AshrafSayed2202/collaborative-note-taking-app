import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDeXK-q1iKd3uv9OaQ7FZ6ju4ro4lG1k90",
    authDomain: "collaborative-note-takin-1f1e4.firebaseapp.com",
    projectId: "collaborative-note-takin-1f1e4",
    storageBucket: "collaborative-note-takin-1f1e4.appspot.com",
    messagingSenderId: "980909804773",
    appId: "1:980909804773:web:ee66667279392a872b580c",
    measurementId: "G-VGGGNPZNWX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, GoogleAuthProvider, collection, addDoc, doc, getDoc, setDoc, onSnapshot, updateDoc, deleteDoc };
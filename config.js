import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
  apiKey: "AIzaSyCCaNtuEUsjygglt_5E-I9Swn76coeFt6c",
  authDomain: "chatsuccess-c3f38.firebaseapp.com",
  projectId: "chatsuccess-c3f38",
  storageBucket: "chatsuccess-c3f38.appspot.com",
  messagingSenderId: "729756256964",
  appId: "1:729756256964:web:faf24073fb221dbf229791"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const auth = getAuth();
export const database = getFirestore();
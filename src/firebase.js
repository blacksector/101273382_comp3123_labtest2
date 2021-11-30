import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyCUSkYHibsoGUDt3pJeDvqdquwqiGxp_-w",
  authDomain: "labtest2-b5e14.firebaseapp.com",
  projectId: "labtest2-b5e14",
  storageBucket: "labtest2-b5e14.appspot.com",
  messagingSenderId: "958983832083",
  appId: "1:958983832083:web:df6b91de48203fa65df5e6"
});

export function auth() {
  return getAuth();
};

export function firestore() {
  return getFirestore();
}

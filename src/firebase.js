import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCUSkYHibsoGUDt3pJeDvqdquwqiGxp_-w",
  authDomain: "labtest2-b5e14.firebaseapp.com",
  projectId: "labtest2-b5e14",
  storageBucket: "labtest2-b5e14.appspot.com",
  messagingSenderId: "958983832083",
  appId: "1:958983832083:web:df6b91de48203fa65df5e6"
});


export function auth() {
  return firebase.auth();
};

export function firestore() {
  return firebase.firestore();
}

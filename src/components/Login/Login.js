import React from 'react';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { collection, doc, setDoc } from "firebase/firestore";

import { Button } from 'react-bootstrap';

function Login() {

    const provider = new GoogleAuthProvider();
    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);

    const signInWithGoogle = () => {
        signInWithPopup(authService, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                await setDoc(doc(db, "users", user.uid), {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid
                });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <div className={`container text-center`}>
            <div className={`row `}>
                <div className={`d-flex flex-column justify-content-center align-items-center`} style={{height: '100vh'}}>
                    <p className={`display-4`}>Firebase Chat</p>
                    <button className={`btn btn-primary`} onClick={() => {
                        signInWithGoogle();
                    }}>Sign in With Google</button>
                </div>
            </div>
            


        </div>
    )
}

export default Login

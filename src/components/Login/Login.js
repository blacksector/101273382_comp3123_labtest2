import React from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../firebase';

function Login() {

    const provider = new firebase.auth.GoogleAuthProvider();
    const authService = auth();
    const db = firestore();

    const signInWithGoogle = () => {
        authService.signInWithPopup(provider)
            .then(async (result) => {
                const user = result.user;

                // Store the users data in the db
                // so other users can find them!
                const usersRef = db.collection("users").doc(user.uid);
                usersRef
                    .set({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        uid: user.uid
                    })
                    .then((done) => {
                        console.log("Done!", done)
                    })
                    .catch((error) => {
                        // toast.error(error.message);
                    });

            }).catch((error) => {
                // Handle Errors here.
                console.log(error.message);
            });
    }

    return (
        <div className={`container text-center`}>
            <div className={`row `}>
                <div className={`d-flex flex-column justify-content-center align-items-center`} style={{ height: '100vh' }}>
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

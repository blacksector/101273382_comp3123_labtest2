import React from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


import { toast } from 'react-toastify';

function Login() {

    const provider = new firebase.auth.GoogleAuthProvider();
    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);

    const signInWithGoogle = () => {
        authService.signInWithPopup(provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                const user = result.user;
                console.log(user);

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
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                // const credential = provider.credentialFromError(error);
                console.log(error);
                // ...
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

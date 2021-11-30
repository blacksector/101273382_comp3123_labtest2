import React, { useState } from 'react'

import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatInput({ user, chatId }) {

    const authService = auth();
    const db = firestore();


    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(chatId);
        const messagesRef = db.collection("chats").doc(chatId).collection("messages");
        // return;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid
        });

        setFormValue('');
    }

    return (
        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>Send</button>

        </form>
    )
}

export default ChatInput

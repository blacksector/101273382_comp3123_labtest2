import React, { useState } from 'react'

import { firestore } from '../../../firebase';
import { collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";

function ChatInput({ user, chatId }) {

    const db = firestore();


    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(chatId);
        const messagesRef = doc(db, "chats", chatId);
        // return;
        await addDoc(collection(messagesRef, 'messages'), {
            text: formValue,
            createdAt: serverTimestamp(),
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

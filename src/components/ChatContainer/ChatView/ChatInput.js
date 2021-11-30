import React, { useState, useEffect } from 'react'

import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ButtonGroup, DropdownButton } from 'react-bootstrap';

import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';

function ChatInput({ user, chatId }) {

    const authService = auth();
    const db = firestore();

    const [formValue, setFormValue] = useState('');

    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    useEffect(() => {
        if (chosenEmoji !== null) {
            setFormValue(formValue + chosenEmoji.emoji);
            setChosenEmoji(null);
        }
    }, [chosenEmoji])

    const sendMessage = (e) => {
        e.preventDefault();

        if (formValue.length > 1000) {
            toast.error("Message cannot be longer than 1000 characters");
            return;
        }

        const messagesRef = db.collection("chats").doc(chatId).collection("messages");

        messagesRef
            .add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: user.uid
            })
            .then((done) => {
                console.log("Done!", done)
            })
            .catch((error) => {
                toast.error(error.message);
            });

        setFormValue('');
    }

    return (
        <>

            <form onSubmit={sendMessage} className="row justify-content-center mt-2">
                
                <div className="col-auto"><DropdownButton
                    as={ButtonGroup}
                    key={`up`}
                    id={`dropdown-button-drop-up`}
                    drop={`up`}
                    variant="secondary"
                    title={`😄 `}
                >
                    <Picker onEmojiClick={onEmojiClick} />
                </DropdownButton>
                </div>
                <div className="col-8">
                    <input
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder="Type a message"
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <button
                        type="submit"
                        disabled={!formValue}
                        className={`btn btn-dark`}
                    >Send</button>
                </div>
            </form>
        </>

    )
}


export default ChatInput

import React, { useEffect, useState, useRef } from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

function ChatBox({ chatId }) {

    const authService = auth();
    const db = firestore();

    const messagesEndRef = useRef();


    useEffect(() => messagesEndRef.current.scrollIntoView({ behavior: "smooth" }));


    const [user, loading, error] = useAuthState(authService);
    const messagesRef = db.collection("chats").doc(chatId).collection("messages");
    // Limit to the last 100 messages, since this is a lab test
    // I did not implement any complex mechanisms to load more messages
    // as the user scrolls up.
    const query = messagesRef.orderBy('createdAt').limitToLast(100);
    const [messagesCollection, loadingMessagesCollection, errorMessagesCollection] = useCollectionData(
        query,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div
            style={{
                height: '75vh',
                overflowY: 'scroll'
            }}
        >
            {/* List out the messages */}
            {messagesCollection && messagesCollection.map((message) => {
                return <ChatMessage userId={user.uid} message={message} />
            })}
            {/* Used for scrolling to the bottom of the messages... */}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatBox

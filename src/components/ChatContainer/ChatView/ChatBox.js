import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatBox({ chatId }) {

    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);
    const messagesRef = db.collection("chats").doc(chatId).collection("messages");
    const query = messagesRef.orderBy('createdAt').limitToLast(25);
    const [messagesCollection, loadingMessagesCollection, errorMessagesCollection] = useCollectionData(
        query,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // useEffect(() => {
    //     console.log(chatId)
    //     
    //     // const messagesRef = doc(collection(db, "chats"), chatId, "messages");
    //     console.log(messagesRef);
    // }, [])

    useEffect(() => {
        console.log(messagesCollection)
    }, [messagesCollection])

    // if (loadingMessagesCollection) {
    //     return <p>Loading...</p>
    // }

    return (
        <div style={{
            height: '75vh',
            overflowY: 'scroll'
        }}>
            {messagesCollection && messagesCollection.map((message) => {
                return <p>{message.text}</p>
            })}
        </div>
    )
}

export default ChatBox

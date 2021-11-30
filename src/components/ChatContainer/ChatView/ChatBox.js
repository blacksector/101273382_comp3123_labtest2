import React, { useEffect, useState } from 'react';

import { auth, firestore } from '../../../firebase';
import { collection, getDocs, doc, collectionGroup } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatBox({ chatId }) {

    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);
    const messagesRef = doc(db, "chats", chatId);
    const [messagesCollection, loadingMessagesCollection, errorMessagesCollection] = useCollectionData(
        collection(messagesRef, 'messages')
        // collectionGroup(, chatId)
        // collection(chats, 'messages'),
        // {
        //     snapshotListenOptions: { includeMetadataChanges: true },
        // }
    );

    useEffect(() => {
        console.log(messagesCollection)
    }, [messagesCollection])

    if (loadingMessagesCollection) {
        return <p>Loading...</p>
    }

    return (
        <div style={{
            height: '100%',
            overflow: 'scroll'
        }}>
            {/* {messagesCollection && messagesCollection.map((message) => {
                return <p>{message.text}</p>
            })} */}
        </div>
    )
}

export default ChatBox

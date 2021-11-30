import React, { useEffect, useState } from 'react';


import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

function ChatView({ chatUser, setSelectedChat }) {

    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);

    const [chatId, setChatId] = useState(null);

    useEffect(() => {
        if (user) {
            // Lets setup the chat id:
            let user1 = chatUser.uid;
            let user2 = user.uid;
            setChatId('chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1));
        }
    }, [user])

    return (
        <div
            className={`container-fluid bg-white`}
            style={{
                minHeight: '90vh',
                paddingTop: '3vh',
                borderRadius: '25px'
            }}>
            <div className={`row`}>
                <div className={`col-12`}>
                    <button className={`btn btn-link`} onClick={() => { setSelectedChat(null); }}>Close Chat</button>
                    {chatId && <><ChatBox chatId={chatId} />
                    <ChatInput user={user} chatId={chatId} /></>}
                </div>
            </div>

        </div>
    )
}

export default ChatView

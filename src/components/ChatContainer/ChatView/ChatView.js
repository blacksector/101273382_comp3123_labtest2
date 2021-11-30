import React, { useEffect, useState } from 'react';


import firebase from 'firebase/app';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import UserItem from '../UserList/UserItem';

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
            setChatId('chat_' + (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1));
            console.log('chat_' + (user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1))
        }
        return () => {
            setChatId(null);
        }
    }, [chatUser])

    return (
        <div
            className={`container-fluid bg-white`}
            style={{
                minHeight: '88vh',
                paddingTop: '1vh',
                paddingBottom: '1vh',
                borderRadius: '25px'
            }}>
            <div className={`row`}>
                <div className={`col-12`}>
                    <div className={`mb-2 d-flex justify-content-between`}>
                        <div>
                            <UserItem user={chatUser} setSelectedChat={() => { }} />
                        </div>
                        <div>
                            <button className={`btn btn-outline-dark`} onClick={() => { setSelectedChat(null); }}>Close Chat</button>
                        </div>
                    </div>
                    {chatId && <>
                        <ChatBox chatId={chatId} />
                        <ChatInput user={user} chatId={chatId} />
                    </>}
                </div>
            </div>

        </div>
    )
}

export default ChatView

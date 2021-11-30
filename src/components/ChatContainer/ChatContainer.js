import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


import UserChatList from './UserList/UserChatList';
import ChatView from './ChatView/ChatView';


function ChatContainer() {

    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);


    const usersRef = db.collection('users');
    const [usersCollection, loadingUsersCollection, errorUsersCollection] = useCollectionData(usersRef);

    const [userList, setUserList] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        if (usersCollection && usersCollection.length > 0) {
            console.log(usersCollection)
            setUserList(usersCollection.filter((u) => u.uid !== user.uid));
        }
    }, [usersCollection])

    useEffect(() => {
        
    }, [selectedChat])

    return (
        <div className={`container-fluid`} style={{ backgroundColor: '#F5F7FB', minHeight: '100vh' }}>
            <div className={`row`}>
                <nav className="navbar navbar-expand-sm navbar-light bg-white" style={{ marginBottom: 15 }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Firebase Chat</a>
                        <button onClick={() => { authService.signOut(); }} class="btn btn-primary ms-auto">Logout</button>
                    </div>
                </nav>
            </div>
            <div className={`row`}>
                <div className={`col-auto`} style={{minWidth: "300px"}}>
                    {usersCollection && <UserChatList users={userList} setSelectedChat={setSelectedChat} />}
                </div>
                <div className={`col-9`}>
                    {selectedChat === null && <div className={`d-flex flex-column justify-content-center align-items-center`} style={{ height: '80vh' }}>
                        <p className={`display-4`}>Select a Chat to Begin</p>
                    </div>}
                    {selectedChat !== null &&
                        (
                            <ChatView chatUser={selectedChat} setSelectedChat={setSelectedChat} />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatContainer

import React, { useEffect, useState } from 'react';

import { auth, firestore } from '../../firebase';
import { collection } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


import ChatList from './ChatList/ChatList';
import ChatView from './ChatView/ChatView';


function ChatContainer() {

    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);
    const [usersCollection, loadingUsersCollection, errorUsersCollection] = useCollectionData(
        collection(db, 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const [userList, setUserList] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        if (usersCollection && usersCollection.length > 0) {
            setUserList(usersCollection.filter((u) => u.uid !==  user.uid));
        }
    }, [usersCollection])

    return (
        <div className={`container-fluid`} style={{backgroundColor: '#F5F7FB', minHeight: '100vh'}}>
            <div className={`row`}>
                <nav className="navbar navbar-expand-sm navbar-light bg-white" style={{marginBottom: 15}}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Firebase Chat</a>
                        <button onClick={() => { authService.signOut(); }} class="btn btn-primary ms-auto">Logout</button>
                        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </nav>
            </div>
            <div className={`row`}>
                <div className={`col-md-3`}>
                    {usersCollection && <ChatList users={userList} setSelectedChat={setSelectedChat} />}
                </div>
                <div className={`col-md-9`}>
                    {selectedChat === null && <div className={`d-flex flex-column justify-content-center align-items-center`} style={{height: '80vh'}}>
                        <p className={`display-4`}>Select a Chat to Begin</p>    
                    </div>}
                    {selectedChat && 
                        <ChatView chatUser={selectedChat} setSelectedChat={setSelectedChat} />
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatContainer

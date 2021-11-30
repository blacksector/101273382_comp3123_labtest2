import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import { auth, firestore } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import UserChatList from './UserList/UserChatList';
import ChatView from './ChatView/ChatView';

import { Offcanvas } from 'react-bootstrap';

function ChatContainer() {
    const authService = auth();
    const db = firestore();

    const [user, loading, error] = useAuthState(authService);
    const usersRef = db.collection('users');
    const [usersCollection, loadingUsersCollection, errorUsersCollection] = useCollectionData(usersRef);
    const [userList, setUserList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Responsive Resizing
    const getWindowDimensions = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            width,
            height,
        };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter the user list so that we don't count ourselves
    useEffect(() => {
        if (usersCollection && usersCollection.length > 0) {
            console.log(usersCollection)
            setUserList(usersCollection.filter((u) => u.uid !== user.uid));
        }
    }, [usersCollection])

    useEffect(() => {
        if (selectedChat !== null) {
            handleClose();
        }
    }, [selectedChat])

    return (
        <div className={`container-fluid`} style={{ backgroundColor: '#F5F7FB', minHeight: '100vh' }}>
            <div className={`row`}>
                <nav className="navbar navbar-expand-sm navbar-light bg-white" style={{ marginBottom: 15 }}>
                    <div className="container-fluid">
                        <button onClick={() => { handleShow(); }} class="btn btn-outline-dark me-auto d-lg-none">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="#">Firebase Chat</a>
                        <button onClick={() => { authService.signOut(); }} class="btn btn-primary ms-auto">Logout</button>
                    </div>
                </nav>
            </div>
            <div className={`row`}>
                <div className={`col-auto d-none d-lg-block`} style={{ minWidth: "300px" }}>
                    {usersCollection && <UserChatList users={userList} setSelectedChat={setSelectedChat} />}
                </div>
                <div className={`${windowDimensions.width >= 992 ? "col-8" : "col-12"}`}>
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

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Friends</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {usersCollection && <UserChatList users={userList} setSelectedChat={setSelectedChat} />}
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default ChatContainer

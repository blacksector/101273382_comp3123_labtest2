import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth, firestore } from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Login from './components/Login/Login';
import ChatContainer from './components/ChatContainer/ChatContainer';



function App() {

  const [user, loading, error] = useAuthState(auth());

  if (loading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="App">
      {user ? <ChatContainer /> : <Login />}
    </div>
  );
}

export default App;

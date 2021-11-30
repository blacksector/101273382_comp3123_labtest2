import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login/Login';
import ChatContainer from './components/ChatContainer/ChatContainer';



function App() {

  const [user, loading, error] = useAuthState(auth());

  if (loading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {user ? <ChatContainer /> : <Login />}
    </div>
  );
}

export default App;

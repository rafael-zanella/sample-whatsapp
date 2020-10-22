import React, { useEffect, useState } from 'react';
import './App.css';
import Pusher from 'pusher-js';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import api from './api';
import Login from './components/Login';
import io from 'socket.io-client';

function App() {

  const [ user, setUser ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    api.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);
    socket.on('newMessage', newMessage => {
      setMessages([...messages, newMessage]);
    })

    return () => socket.disconnect();

  }, [messages])


  const addUser = ({name, email}) => {
    setUser(name);
    setEmail(email);
  }

  const Room = () => (
    <div className="app">
      <div className="app__body">
        <Chat email={email} user={user} messages={messages} />
      </div>
    </div>
  );

  return !user ? <Login onSend={addUser}/> : <Room />

}

export default App;

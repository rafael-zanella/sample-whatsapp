import React, { useEffect, useState } from 'react';
import './App.css';
import Pusher from 'pusher-js';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import api from './api';
import Login from './components/Login';

function App() {

  const [ user, setUser ] = useState('');
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    api.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('917798f1313ea1977ed8', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', newMessage => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  const addUser = (name) => {
    setUser(name);
    console.log("name ", name);
  }

  const Room = () => (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat user={user} messages={messages} />
      </div>
    </div>
  );

  return !user ? <Login onSend={addUser}/> : <Room />   

}

export default App;

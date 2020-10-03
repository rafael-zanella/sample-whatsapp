import React, { useEffect, useState } from 'react';
import './App.css';
import Pusher from 'pusher-js';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import api from './api';

function App() {

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

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat/>
      </div>
    </div>
  );
}

export default App;

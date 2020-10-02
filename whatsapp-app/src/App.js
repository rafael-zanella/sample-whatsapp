import React, { useEffect } from 'react';
import './App.css';
import Pusher from 'pusher-js';
import Sidebar from "./Sidebar";
import Chat from "./Chat";


function App() {

  useEffect(() => {
    const pusher = new Pusher('917798f1313ea1977ed8', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, [])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import './styles.css';
import {Avatar, IconButton} from "@material-ui/core";
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
import api from '../api';


const Chat = ({ messages }) => {

  const [ input, setInput ] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.post('/messages/new', {
      message: input,
      name: "Rafael",
      timestamp: "Just now",
      received: true
    })

    setInput('');
  }

  return(
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seem at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton >
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">

        {messages.map((msg) => {
          return (
            <p key={msg._id} className={`chat__message ${msg.received && "chat__receiver"}`}>
              <span className="chat__name">{msg.name}</span>
                {msg.message}
              <span className="chat__timestamp">
                {msg.timestamp}
              </span>
            </p>
          )
        })}

      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            placeholder="Type a message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat;

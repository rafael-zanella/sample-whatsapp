import React, { useState, useEffect, useRef } from "react";
import './styles.css';
import {Avatar, IconButton} from "@material-ui/core";
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
import api from '../../api';


const Chat = ({ email, user, messages }) => {

  const [ input, setInput ] = useState('');
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null)

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.post('/messages/new', {
      email: email,
      message: input,
      name: user,
      timestamp: "Just now",
      received: true
    })

    setInput('');
  }

  useEffect(() => {
    inputRef.current.focus();
  })

  return(
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seem at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div ref={chatBodyRef} className="chat__body">

        {messages.map((msg) => {
          return (
            <p key={msg._id} className={`chat__message ${msg.email === email && "chat__receiver"}`}>
              <span className="chat__name">{msg.name}</span>
                {msg.message}
              <span className="chat__timestamp">
                {msg.timestamp}
              </span>
            </p>
          )
        }).reverse()}

      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            ref={inputRef}
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

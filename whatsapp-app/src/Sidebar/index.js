import React from 'react';
import './styles.css';
import { DonutLarge, Chat as ChatIcon, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "../SidebarChat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars2.githubusercontent.com/u/38277018?s=460&u=2023312a3bffc3d121b4ff5313caf4ed6e1911e8&v=4" />

        <div className="sidebar__headerRight">
          <IconButton >
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar;

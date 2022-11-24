import "./SideBar.scss";

import { FC } from "react";

import ChatList from "../chatList/ChatList";
import NavBar from "../navBar/NavBar";
import UserList from "../userList/UserList";

const SideBar: FC = () => {
  return (
    <>
      <div className="sidebar">
        <NavBar />
        <UserList />
        <ChatList />
      </div>
    </>
  )
}

export default SideBar

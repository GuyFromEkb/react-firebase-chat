import "./SideBar.scss"

import { FC } from "react"

import ChatList from "components/chatList/ChatList"
import NavBar from "components/navBar/NavBar"
import UserList from "components/userList/UserList"

const SideBar: FC = () => {
  return (
    <div className="sidebar">
      <NavBar />
      <UserList />
      <ChatList />
    </div>
  )
}

export default SideBar

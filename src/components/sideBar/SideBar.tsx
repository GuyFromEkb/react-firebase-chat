import { FC } from "react"
import ChatList from "../chatList/ChatList"
import NavBar from "../navBar/NavBar"
import UserList from "../userList/UserList"
import "./SideBar.scss"

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

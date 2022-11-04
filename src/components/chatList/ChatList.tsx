import { FC } from "react"
import ChatItem from "../chatItem/ChatItem"
import "./ChatList.scss"

const ChatList: FC = () => {
  return (
    <div className="chat-list">
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </div>
  )
}

export default ChatList

import { FC } from "react"
import ChatInfo from "../chatInfo/ChatInfo"
import ChatInput from "../chatInput/ChatInput"
import MessageList from "../messageList/MessageList"
import "./Chat.scss"

const Chat: FC = () => {
  return (
    <>
      <div className="chat">
        <ChatInfo />
        <MessageList />
        <ChatInput />
      </div>
    </>
  )
}

export default Chat

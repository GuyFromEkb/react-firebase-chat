import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStore } from "../../hooks/useStore"
import ChatInfo from "../chatInfo/ChatInfo"
import ChatInput from "../chatInput/ChatInput"
import Loader from "../loader/Loader"
import MessageList from "../messageList/MessageList"
import "./Chat.scss"

const Chat: FC = () => {
  const { chatStore } = useStore()
  const { isLoading } = chatStore
  return (
    <>
      <div className="chat">
        <ChatInfo />
        <MessageList />
        <ChatInput />

        {isLoading && (
          <div className="chat__loader-wrap">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}

export default observer(Chat)

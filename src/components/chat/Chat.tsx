import "./Chat.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"

import ChatEmptyList from "components/chatEmptyList/ChatEmptyList"
import ChatInfo from "components/chatInfo/ChatInfo"
import ChatInput from "components/chatInput/ChatInput"
import Loader from "components/loader/Loader"
import MessageList from "components/messageList/MessageList"

const Chat: FC = () => {
  const { chatStore } = useStore()
  const { isLoadingCreateNewChat, currentChatInfo } = chatStore

  return (
    <div className="chat">
      {currentChatInfo ? (
        <>
          <ChatInfo />
          <MessageList />
          <ChatInput />
        </>
      ) : (
        <ChatEmptyList isLoadingCreateNewChat={isLoadingCreateNewChat} />
      )}

      {isLoadingCreateNewChat && (
        <div className="chat__loader-wrap">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default observer(Chat)

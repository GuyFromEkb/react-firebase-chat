import "./Chat.scss";

import { observer } from "mobx-react-lite";
import { FC } from "react";

import { useStore } from "../../hooks/useStore";
import ChatEmptyList from "../chatEmptyList/ChatEmptyList";
import ChatInfo from "../chatInfo/ChatInfo";
import ChatInput from "../chatInput/ChatInput";
import Loader from "../loader/Loader";
import MessageList from "../messageList/MessageList";

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

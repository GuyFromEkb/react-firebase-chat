import "./ChatInfo.scss";

import { observer } from "mobx-react-lite";
import { FC } from "react";

import { useStore } from "../../hooks/useStore";

const ChatInfo: FC = () => {
  const { chatStore } = useStore()
  const { isLoadingCreateNewChat, currentChatInfo } = chatStore
  return (
    <div className="chat-info">
      <span>{!isLoadingCreateNewChat && currentChatInfo?.recipientUserInfo.displayName}</span>
    </div>
  )
}

export default observer(ChatInfo)

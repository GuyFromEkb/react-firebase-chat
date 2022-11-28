import "./ChatInfo.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"

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

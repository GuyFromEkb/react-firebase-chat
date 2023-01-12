import "./ChatInfo.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"

const ChatInfo: FC = () => {
  const {
    chatStore: { isLoadingCreateNewChat, currentChatInfo },
  } = useStore()

  return (
    <div className="chat-info">
      <span>{!isLoadingCreateNewChat && currentChatInfo?.recipientUserInfo.displayName}</span>
    </div>
  )
}

export default observer(ChatInfo)

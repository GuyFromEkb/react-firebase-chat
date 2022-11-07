import { observer } from "mobx-react-lite"
import { FC } from "react"
import { chatStore } from "../../stores/chatStore"
import "./ChatInfo.scss"

const ChatInfo: FC = () => {
  const { currentChatInfo } = chatStore
  return (
    <div className="chat-info">
      <span>{currentChatInfo?.recipientUserInfo.displayName || ""}</span>
    </div>
  )
}

export default observer(ChatInfo)

import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStore } from "../../hooks/useStore"
import "./ChatInfo.scss"

const ChatInfo: FC = () => {
  const { chatStore } = useStore()
  return (
    <div className="chat-info">
      <span>{chatStore?.currentChatInfo?.recipientUserInfo.displayName || ""}</span>
    </div>
  )
}

export default observer(ChatInfo)

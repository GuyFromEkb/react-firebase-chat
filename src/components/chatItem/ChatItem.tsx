import { FC } from "react"
import { IUserChatInfo } from "../../stores/chatStore"
import "./ChatItem.scss"

interface IProps extends IUserChatInfo {
  toggleChat: () => void
}

const ChatItem: FC<IProps> = ({ displayName, photoURL, uid, toggleChat }) => {
  return (
    <div onClick={toggleChat} className="chat-item">
      <img src={photoURL} alt="userAvatar" />
      <div className="chat-item__right-side">
        <div className="chat-item__name">{displayName}</div>
        <div className="chat-item__last-message">Ok see you Ok see you Ok see you Ok see you</div>
      </div>
    </div>
  )
}

export default ChatItem

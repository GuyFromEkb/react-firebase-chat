import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ICurrentUserChats } from "../../stores/chatStore"
import "./ChatItem.scss"

interface IProps extends Omit<ICurrentUserChats, "date"> {
  toggleChat: () => void
  isMyLastMessage: boolean
}

const ChatItem: FC<IProps> = ({ userInfo, lastMessage, toggleChat, isMyLastMessage }) => {
  return (
    <div onClick={toggleChat} className="chat-item">
      <img src={userInfo.photoURL} alt="userAvatar" />
      <div className="chat-item__right-side">
        <div className="chat-item__name">{userInfo.displayName}</div>
        <div className="chat-item__last-message">
          {isMyLastMessage && "You:"} {lastMessage?.text}
        </div>
      </div>
    </div>
  )
}

export default observer(ChatItem)

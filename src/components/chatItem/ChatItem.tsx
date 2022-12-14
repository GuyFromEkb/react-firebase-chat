import "./ChatItem.scss"

import cn from "classnames"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ICurrentUserChats } from "stores/chatStore"

import Avatar from "components/avatar/Avatar"

interface IProps extends Omit<ICurrentUserChats, "date"> {
  toggleChat: () => void
  isMyLastMessage: boolean
  isCurrentChat: boolean
}

const ChatItem: FC<IProps> = ({
  userInfo,
  lastMessage,
  toggleChat,
  isMyLastMessage,
  isCurrentChat,
}) => {
  return (
    <div onClick={toggleChat} className={cn("chat-item", isCurrentChat && "current-chat")}>
      <Avatar photoUrl={userInfo.photoURL} />
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

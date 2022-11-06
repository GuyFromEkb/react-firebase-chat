import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
import ChatItem from "../chatItem/ChatItem"
import "./ChatList.scss"

const ChatList: FC = () => {
  const { subToFecthUserChats, chats, toggleCurrentChat } = chatStore
  const { user } = authStore

  useEffect(() => {
    const getChats = async () => {
      const unsub = await subToFecthUserChats(user!)

      return () => {
        unsub()
      }
    }

    user?.uid && getChats()
  }, [subToFecthUserChats, user])

  return (
    <div className="chat-list">
      {chats.map(([chatId, chatRecipientData]) => (
        <ChatItem
          isMyLastMessage={user?.uid === chatRecipientData.lastMessage?.senderId}
          lastMessage={chatRecipientData.lastMessage}
          userInfo={chatRecipientData.userInfo}
          toggleChat={() => toggleCurrentChat(chatId, chatRecipientData.userInfo)}
          key={chatId}
        />
      ))}
    </div>
  )
}

export default observer(ChatList)

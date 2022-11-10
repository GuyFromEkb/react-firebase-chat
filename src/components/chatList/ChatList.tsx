import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { chatStore } from "../../stores/chatStore"
import { rootStore } from "../../stores/rootStore"
import ChatItem from "../chatItem/ChatItem"
import "./ChatList.scss"

const ChatList: FC = () => {
  const { subToFecthUserChats, chats, toggleCurrentChat } = chatStore
  const { user } = rootStore.authStore

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
    <>
      <div className="subtitle">Chat List:</div>
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
    </>
  )
}

export default observer(ChatList)

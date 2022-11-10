import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { useStore } from "../../hooks/useStore"
import ChatItem from "../chatItem/ChatItem"
import "./ChatList.scss"

const ChatList: FC = () => {
  const { chatStore, currentUser } = useStore()
  const { subToFecthUserChats, chats, toggleCurrentChat } = chatStore

  useEffect(() => {
    const getChats = async () => {
      const unsub = await subToFecthUserChats()

      return () => {
        unsub()
      }
    }

    getChats()
  }, [subToFecthUserChats])
  return (
    <>
      <div className="subtitle">Chat List:</div>
      <div className="chat-list">
        {chats.map(([chatId, chatRecipientData]) => (
          <ChatItem
            isMyLastMessage={currentUser?.uid === chatRecipientData.lastMessage?.senderId}
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

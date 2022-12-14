import "./ChatList.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"

import ChatItem from "components/chatItem/ChatItem"

const ChatList: FC = () => {
  const {
    chatStore: { subToFecthUserChats, chats, toggleCurrentChat, currentChatInfo },
    currentUser,
  } = useStore()

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
            isCurrentChat={currentChatInfo?.id === chatId}
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

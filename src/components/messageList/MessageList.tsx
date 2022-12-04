import "./MessageList.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useRef } from "react"

import MessageItem from "components/messageItem/MessageItem"

const MessageList: FC = () => {
  const { chatStore, currentUser, messageStore } = useStore()
  const { currentChatInfo } = chatStore
  const { subToFecthMessages, messages, reset } = messageStore
  const refLastMessage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentChatInfo?.id) return

    const unsub = subToFecthMessages()

    return () => {
      unsub()
      reset()
    }
  }, [currentChatInfo?.id, subToFecthMessages, reset])

  return (
    <div className="message-list">
      {messages.map((message, idx) => (
        <MessageItem
          files={message.files}
          key={message.id}
          date={message.date}
          text={message.text}
          isMyMessage={message.senderId === currentUser?.uid}
          avatarUrl={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL!
              : currentChatInfo?.recipient.photoURL
          }
          refLastMessage={idx === 0 ? refLastMessage : undefined}
        />
      ))}
    </div>
  )
}

export default observer(MessageList)

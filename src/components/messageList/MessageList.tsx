import { observer } from "mobx-react-lite"
import { FC, useEffect, useRef } from "react"
import { useStore } from "../../hooks/useStore"
import MessageItem from "../messageItem/MessageItem"
import "./MessageList.scss"

export interface Date {
  seconds: number
  nanoseconds: number
}

export interface IMessage {
  senderId: string
  text: string
  id: string
  date: {
    seconds: number
    nanoseconds: number
  }
}

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
          key={message.id}
          date={message.date}
          text={message.text}
          isMyMessage={message.senderId === currentUser?.uid}
          avatarUrl={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL!
              : currentChatInfo?.recipientUserInfo.photoURL
          }
          refLastMessage={idx === 0 ? refLastMessage : undefined}
        />
      ))}
    </div>
  )
}

export default observer(MessageList)

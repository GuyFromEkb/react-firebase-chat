import { doc, onSnapshot } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { db } from "../../firebase"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
import { messageStore } from "../../stores/messageStore"
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
  const { user } = authStore
  const { currentChatInfo } = chatStore
  const { subToFecthMessages, messages, reset } = messageStore
  const refLastMessage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentChatInfo?.id) return

    const unsub = subToFecthMessages(currentChatInfo)

    return () => {
      unsub()
      reset()
    }
    // eslint-disable-next-line
  }, [currentChatInfo?.id])

  return (
    <div className="message-list">
      {messages.map((message, idx) => (
        <MessageItem
          key={message.id}
          date={message.date}
          text={message.text}
          isMyMessage={message.senderId === user?.uid}
          avatarUrl={
            message.senderId === user?.uid
              ? user.photoURL!
              : currentChatInfo?.recipientUserInfo.photoURL
          }
          refLastMessage={idx === 0 ? refLastMessage : undefined}
        />
      ))}
    </div>
  )
}

export default observer(MessageList)

import { doc, onSnapshot } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { db } from "../../firebase"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
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
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    if (!currentChatInfo.id) return

    const docRef = doc(db, "chats", currentChatInfo.id)

    onSnapshot(docRef, (doc) => {
      const messages = doc.data()
      setMessages(messages?.messages! as IMessage[])
      console.log("messages", messages)
    })
  }, [currentChatInfo.id])

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          date={message.date}
          text={message.text}
          isMyMessage={message.senderId === user?.uid}
          avatarUrl={
            message.senderId === user?.uid
              ? user.photoURL!
              : currentChatInfo.recipientUserInfo.photoURL
          }
        />
      ))}
    </div>
  )
}

export default observer(MessageList)

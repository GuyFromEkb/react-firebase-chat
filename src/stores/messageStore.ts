import { RootStore } from "./rootStore"
import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"
import { IMessage } from "../components/messageList/MessageList"
import { db } from "../firebase"
import { v4 as uuid } from "uuid"

export class MessageStore {
  private _messages: IMessage[] = []
  private _rootStore: RootStore

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  reset = () => {
    this._messages = []
  }

  subToFecthMessages = () => {
    const currentChatId = this._rootStore.chatStore.currentChatInfo?.id!

    const docRef = doc(db, "chats", currentChatId)

    return onSnapshot(docRef, (doc) => {
      const messages = doc.data()
      runInAction(() => (this._messages = messages?.messages as IMessage[]))
    })
  }

  postMessage = async (text: string) => {
    const currentUserId = this._rootStore.currentUser?.uid!
    const currentChat = this._rootStore.chatStore.currentChatInfo
    if (!currentChat) return

    const docRefChat = doc(db, "chats", currentChat.id)

    await updateDoc(docRefChat, {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUserId,
        date: Timestamp.now(),
      }),
    })

    const docRefCurrentUserInChatList = doc(db, "userChats", currentUserId)

    await updateDoc(docRefCurrentUserInChatList, {
      [currentChat.id + ".date"]: Timestamp.now(),
      [currentChat.id + ".lastMessage"]: {
        senderId: currentUserId,
        text,
      },
    })

    const docRefRecipientUserInChatList = doc(db, "userChats", currentChat.recipientUserInfo.uid)

    await updateDoc(docRefRecipientUserInChatList, {
      [currentChat.id + ".date"]: Timestamp.now(),
      [currentChat.id + ".lastMessage"]: {
        senderId: currentUserId,
        text,
      },
    })
  }

  get messages() {
    return this._messages.slice().reverse()
  }
}

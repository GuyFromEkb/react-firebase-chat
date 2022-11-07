import { User } from "firebase/auth"
import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"
import { IMessage } from "../components/messageList/MessageList"
import { db } from "../firebase"
import { v4 as uuid } from "uuid"
import { ICurrentChatInfo } from "./chatStore"

class MessageStore {
  private _messages: IMessage[] = []
  private _currentChatInfo: ICurrentChatInfo | null = null

  constructor() {
    makeAutoObservable(this)
  }

  reset = () => {
    this._messages = []
  }

  subToFecthMessages = (currentChatInfo: ICurrentChatInfo) => {
    this._currentChatInfo = currentChatInfo

    const docRef = doc(db, "chats", this._currentChatInfo.id)

    return onSnapshot(docRef, (doc) => {
      const messages = doc.data()
      runInAction(() => (this._messages = messages?.messages as IMessage[]))
    })
  }

  postMessage = async (text: string, currentUser: User) => {
    if (!this._currentChatInfo) return

    const docRefChat = doc(db, "chats", this._currentChatInfo.id)

    await updateDoc(docRefChat, {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    })

    const docRefCurrentUserInChatList = doc(db, "userChats", currentUser.uid)

    await updateDoc(docRefCurrentUserInChatList, {
      [this._currentChatInfo.id + ".date"]: Timestamp.now(),
      [this._currentChatInfo.id + ".lastMessage"]: {
        senderId: currentUser.uid,
        text,
      },
    })

    const docRefRecipientUserInChatList = doc(
      db,
      "userChats",
      this._currentChatInfo.recipientUserInfo.uid
    )

    await updateDoc(docRefRecipientUserInChatList, {
      [this._currentChatInfo.id + ".date"]: Timestamp.now(),
      [this._currentChatInfo.id + ".lastMessage"]: {
        senderId: currentUser.uid,
        text,
      },
    })
  }

  get messages() {
    return this._messages.slice().reverse()
  }
}

const messageStore = new MessageStore()

export { messageStore }

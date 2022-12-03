import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from "uuid"

import { IMessage } from "../components/messageList/MessageList"
import { db } from "../firebase"
import { getStoregeImgItemUrls } from "../utils/firebase/storage"
import { RootStore } from "./rootStore"

export class MessageStore {
  private _messages: IMessage[] = []
  private _rootStore: RootStore
  isLoading = {
    files: false,
    message: false,
  }

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

  postMessage = async (text: string, files?: File[]) => {
    const currentUserId = this._rootStore.currentUser?.uid!
    const currentChat = this._rootStore.chatStore.currentChatInfo
    if (!currentChat) return

    const docRefChat = doc(db, "chats", currentChat.id)

    this.isLoading.files = true
    try {
      const filesUrls = files ? await getStoregeImgItemUrls(currentChat.id, files) : []
      runInAction(() => (this.isLoading.files = false))

      updateDoc(docRefChat, {
        messages: arrayUnion({
          id: uuid(),
          date: Timestamp.now(),
          senderId: currentUserId,
          text,
          files: {
            img: filesUrls,
          },
        }),
      })
    } finally {
      this.isLoading.files = false
    }
  }

  updateLastMessageInChats = async (text: string, files?: File[]) => {
    const currentUserId = this._rootStore.currentUser?.uid!
    const currentChat = this._rootStore.chatStore.currentChatInfo
    if (!currentChat) return

    const docRefCurrentUserInChatList = doc(db, "userChats", currentUserId)
    const docRefRecipientUserInChatList = doc(db, "userChats", currentChat.recipient.uid)

    await Promise.all([
      updateDoc(docRefCurrentUserInChatList, {
        [currentChat.id + ".date"]: Timestamp.now(),
        [currentChat.id + ".lastMessage"]: {
          senderId: currentUserId,
          text: text || "attached files",
        },
      }),
      updateDoc(docRefRecipientUserInChatList, {
        [currentChat.id + ".date"]: Timestamp.now(),
        [currentChat.id + ".lastMessage"]: {
          senderId: currentUserId,
          text: text || "attached files",
        },
      }),
    ])
  }

  get messages() {
    return this._messages.slice().reverse()
  }
}

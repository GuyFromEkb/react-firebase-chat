import { doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { IFireBaseDate, IUserChatInfoDb } from "types/IFirebase"

import { db, userChatsCol } from "../firebase"
import { RootStore } from "./rootStore"
import { IUser } from "./usersStore"

export interface IRecipient {
  uid: string
  displayName: string
  photoURL: string
}

export interface IUserChatInfo {
  date: IFireBaseDate
  recipient: IRecipient
  lastMessage?: {
    senderId: string
    text: string
  }
}
export interface ICurrentChatInfo {
  id: string
  recipient: IRecipient
}

export class ChatStore {
  private _chats: [string, IUserChatInfoDb][] = []
  private _rootStore: RootStore
  isLoadingCreateNewChat = false
  currentChatInfo: ICurrentChatInfo | null = null

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  toggleCurrentChat = (chatId: string, recipient: IRecipient) => {
    this.currentChatInfo = {
      id: chatId,
      recipient,
    }
  }

  createChat = async (user: IUser) => {
    const combinedId =
      this._rootStore.currentUser?.uid! > user.uid
        ? this._rootStore.currentUser?.uid + user.uid
        : user.uid + this._rootStore.currentUser?.uid

    try {
      const userChatsRef = doc(userChatsCol, combinedId)
      const userChatsSnap = await getDoc(userChatsRef)

      runInAction(() => {
        this.isLoadingCreateNewChat = true
      })

      if (!userChatsSnap.exists()) {
        await Promise.all([
          setDoc(doc(db, "chats", combinedId), {
            messages: [],
          }),
          updateDoc(doc(userChatsCol, this._rootStore.currentUser?.uid!), {
            [combinedId]: {
              date: Timestamp.now(),
              recipient: {
                uid: user.uid,
              },
            },
          }),
          updateDoc(doc(userChatsCol, user.uid), {
            [combinedId]: {
              date: Timestamp.now(),
              recipient: {
                uid: this._rootStore.currentUser?.uid,
              },
            },
          }),
        ])
      }
    } finally {
      runInAction(() => {
        this.isLoadingCreateNewChat = false
        this.toggleCurrentChat(combinedId, user)
      })
    }
  }

  subToFecthUserChats = async () => {
    const userChatsRef = doc(userChatsCol, this._rootStore.currentUser?.uid!)

    return onSnapshot(userChatsRef, (doc) => {
      const userChats = doc.data()
      if (userChats) {
        runInAction(() => (this._chats = Object.entries(userChats)))
      }
    })

    // if (doc.metadata.hasPendingWrites) {
    //   // Local changes have not yet been written to the backend
    // } else {
    //   // Changes have been written to the backend
    // }
  }

  firstRenderfetchUsersChats = async () => {
    const userChatsRef = doc(userChatsCol, this._rootStore.currentUser?.uid!)
    const userChatsSnap = await getDoc(userChatsRef)

    runInAction(() => {
      if (userChatsSnap.exists()) {
        const userChats = userChatsSnap.data()
        this._chats = Object.entries(userChats)
      }
    })
  }

  get chats(): [string, IUserChatInfo][] {
    return (
      this._chats
        //в чате есть сообщение
        .filter((chat) => chat[1].lastMessage)
        //сортировка по дате получнеия
        .sort((a, b) => b[1].date?.seconds - a[1].date?.seconds)
        //добавление данных об отправителие (photoUrl displayName)
        .map(([chatId, chatInfo]) => {
          console.log("this._rootStore.usersStore.users", toJS(this._rootStore.usersStore.users))
          console.log("chatInfo.recipient.uid", toJS(chatInfo))
          const recipientUser = this._rootStore.usersStore.users.find(
            (user) => user.uid === chatInfo.recipient.uid
          )!
          const ChatInfoWithRecipientData = {
            ...chatInfo,
            recipient: {
              uid: chatInfo.recipient.uid,
              photoURL: recipientUser.photoURL,
              displayName: recipientUser.displayName,
            },
          }

          return [chatId, ChatInfoWithRecipientData]
        })
    )
  }
}

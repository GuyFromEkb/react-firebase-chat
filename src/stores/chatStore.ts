import { User } from "firebase/auth"
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { db } from "../firebase"
import { IUser } from "./usersStore"
import { v4 as uuid } from "uuid"

export interface IUserChatInfo {
  uid: string
  displayName: string
  photoURL: string
}

export interface IUserDateInfo {
  seconds: number
  nanoseconds: number
}

export interface ICurrentUserChats {
  date: IUserDateInfo
  userInfo: IUserChatInfo
  lastMessage: {
    senderId: string
    text: string
  }
}
export interface ICurrentChatInfo {
  id: string
  recipientUserInfo: IUserChatInfo
}

class ChatStore {
  isLoading = false
  private _chats: [string, ICurrentUserChats][] = []
  currentChatInfo: ICurrentChatInfo | null = null

  constructor() {
    makeAutoObservable(this)
  }

  toggleCurrentChat = (chatId: string, recipientUserInfo: IUserChatInfo) => {
    this.currentChatInfo = {
      id: chatId,
      recipientUserInfo: recipientUserInfo,
    }
  }

  createChat = async (user: IUser, currentUser: User | null) => {
    const combinedId =
      currentUser?.uid! > user.uid ? currentUser?.uid + user.uid : user.uid + currentUser?.uid

    const docRef = doc(db, "chats", combinedId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      await Promise.all([
        setDoc(doc(db, "chats", combinedId), {
          messages: [],
        }),
        updateDoc(doc(db, "userChats", currentUser?.uid!), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: Timestamp.now(),
          // [combinedId + ".date"]: serverTimestamp(),
        }),
        updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: Timestamp.now(),
        }),
      ])
    }

    this.toggleCurrentChat(combinedId, user)
  }

  subToFecthUserChats = async (user: User) => {
    const docRef = doc(db, "userChats", user.uid)

    return onSnapshot(docRef, (doc) => {
      // if (!doc.metadata.hasPendingWrites) {
      const userChats = doc.data()
      if (userChats) {
        runInAction(() => (this._chats = Object.entries(userChats)))
        // }
      }
    })

    // if (doc.metadata.hasPendingWrites) {
    //   // Local changes have not yet been written to the backend
    // } else {
    //   // Changes have been written to the backend
    // }
  }

  get chats() {
    return this._chats
      .filter((chat) => chat[1].lastMessage)
      .slice()
      .sort((a, b) => b[1].date?.seconds - a[1].date?.seconds)
  }
}

const chatStore = new ChatStore()
export { chatStore }

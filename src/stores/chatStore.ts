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
}
interface ICurrentChatInfo {
  id: string
  recipientUserInfo: IUserChatInfo
}

interface IMessage {
  senderId: string
  text: string
  date: string
  id: string
}

class ChatStore {
  isLoading = false
  chats: [string, ICurrentUserChats][] = []
  currentChatInfo: ICurrentChatInfo = {} as ICurrentChatInfo
  currentChatMessages: IMessage[] = []

  constructor() {
    makeAutoObservable(this)
  }

  toggleCurrentChat = (chatId: string, recipientUserInfo: IUserChatInfo) => {
    this.currentChatInfo.id = chatId
    this.currentChatInfo.recipientUserInfo = recipientUserInfo
  }

  createChat = async (user: IUser, currentUser: User | null) => {
    const combinedId =
      currentUser?.uid! > user.uid ? currentUser?.uid + user.uid : user.uid + currentUser?.uid

    const docRef = doc(db, "chats", combinedId)
    const docSnap = await getDoc(docRef)
    const a = true
    if (/* !docSnap.exists() */ a) {
      console.log("zawel v if", docSnap.exists())

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
          [combinedId + ".date"]: serverTimestamp(),
        }),
        updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }),
      ])
    }
  }

  subToFecthUserChats = async (user: User) => {
    const docRef = doc(db, "userChats", user.uid)

    return onSnapshot(docRef, (doc) => {
      if (!doc.metadata.hasPendingWrites) {
        const userChats = doc.data()
        if (userChats) {
          runInAction(() => (this.chats = Object.entries(userChats)))
        }
      }
    })

    // if (doc.metadata.hasPendingWrites) {
    //   // Local changes have not yet been written to the backend
    // } else {
    //   // Changes have been written to the backend
    // }
  }

  postMessage = async (text: string, currentUser: User) => {
    if (!this.currentChatInfo.id) return

    const docRef = doc(db, "chats", this.currentChatInfo.id)

    await updateDoc(docRef, {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    })
  }
}

const chatStore = new ChatStore()
export { chatStore }

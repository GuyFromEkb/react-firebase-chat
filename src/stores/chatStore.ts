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
  private _chats: [string, ICurrentUserChats][] = []
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

  postMessage = async (text: string, currentUser: User) => {
    if (!this.currentChatInfo.id) return

    const docRefChat = doc(db, "chats", this.currentChatInfo.id)

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
      [this.currentChatInfo.id + ".date"]: Timestamp.now(),
      [this.currentChatInfo.id + ".lastMessage"]: {
        senderId: currentUser.uid,
        text,
      },
    })

    const docRefRecipientUserInChatList = doc(
      db,
      "userChats",
      this.currentChatInfo.recipientUserInfo.uid
    )

    await updateDoc(docRefRecipientUserInChatList, {
      [this.currentChatInfo.recipientUserInfo.uid + ".date"]: Timestamp.now(),
      [this.currentChatInfo.recipientUserInfo.uid + ".lastMessage"]: {
        senderId: currentUser.uid,
        text,
      },
    })
  }

  get chats() {
    console.log("Getter")
    return this._chats.slice().sort((a, b) => b[1].date.seconds - a[1].date.seconds)

    // console.log('this._chats',toJS(this._chats))
    // return this._chats
  }
}

const chatStore = new ChatStore()
export { chatStore }

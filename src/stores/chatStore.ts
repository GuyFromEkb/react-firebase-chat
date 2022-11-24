import { doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";

import { db } from "../firebase";
import { RootStore } from "./rootStore";
import { IUser } from "./usersStore";

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

export class ChatStore {
  private _chats: [string, ICurrentUserChats][] = []
  private _rootStore: RootStore
  isLoading = false
  currentChatInfo: ICurrentChatInfo | null = null

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  toggleCurrentChat = (chatId: string, recipientUserInfo: IUserChatInfo) => {
    this.currentChatInfo = {
      id: chatId,
      recipientUserInfo: recipientUserInfo,
    }
  }

  createChat = async (user: IUser) => {
    const combinedId =
      this._rootStore.currentUser?.uid! > user.uid
        ? this._rootStore.currentUser?.uid + user.uid
        : user.uid + this._rootStore.currentUser?.uid

    try {
      console.log("zawel v try")
      const docRef = doc(db, "chats", combinedId)
      const docSnap = await getDoc(docRef)

      this.isLoading = true

      if (!docSnap.exists()) {
        await Promise.all([
          setDoc(doc(db, "chats", combinedId), {
            messages: [],
          }),
          updateDoc(doc(db, "userChats", this._rootStore.currentUser?.uid!), {
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
              uid: this._rootStore.currentUser?.uid,
              displayName: this._rootStore.currentUser?.displayName,
              photoURL: this._rootStore.currentUser?.photoURL,
            },
            [combinedId + ".date"]: Timestamp.now(),
          }),
        ])
      }
    } finally {
      console.log("zawel v final")
      runInAction(() => {
        this.isLoading = false
        this.toggleCurrentChat(combinedId, user)
      })
    }
  }

  subToFecthUserChats = async () => {
    const docRef = doc(db, "userChats", this._rootStore.currentUser?.uid!)

    return onSnapshot(docRef, (doc) => {
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

  get chats() {
    return this._chats
      .filter((chat) => chat[1].lastMessage)
      .slice()
      .sort((a, b) => b[1].date?.seconds - a[1].date?.seconds)
  }
}

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { collection, CollectionReference, DocumentData, getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { IUserChatDb, IUserDb } from "types/IFirebase"

const firebaseConfig = {
  apiKey: "AIzaSyAlg8IkwKI_fxN2z3_cM4XgR1EaHbMC4LE",
  authDomain: "react-chat-f98d0.firebaseapp.com",
  projectId: "react-chat-f98d0",
  storageBucket: "react-chat-f98d0.appspot.com",
  messagingSenderId: "547309974720",
  appId: "1:547309974720:web:8de7ac1fa4361c9ca5e925",
}
initializeApp(firebaseConfig)

export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

export const usersCol = createCollection<IUserDb>("users")
export const userChatsCol = createCollection<IUserChatDb>("userChats")
// export const сhatsCol = createCollection<IChatDB>("chats")

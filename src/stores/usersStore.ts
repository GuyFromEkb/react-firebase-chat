import { User } from "firebase/auth"
import { getDocs, collection } from "firebase/firestore"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { db } from "../firebase"
import { authStore } from "./authStore"

export interface IUser {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

class UsersStore {
  currentUser: User | null = null
  private _users: IUser[] = []
  isLoading = false

  constructor() {
    makeAutoObservable(this)
    this._fetchUsers()
  }

  private _fetchUsers = async () => {
    console.log("feth")
    const querySnapshot = await getDocs(collection(db, "users"))

    runInAction(() => {
      querySnapshot.forEach((doc) => {
        const user = doc.data() as IUser
        this._users.push(user)
      })
    })
  }

  setCurrentUser = (user: User | null) => {
    console.log("set")
    this.currentUser = user
  }

  get users() {
    return this._users.filter((user) => user.uid !== this.currentUser?.uid)
  }
}

const usersStore = new UsersStore()
export { usersStore }

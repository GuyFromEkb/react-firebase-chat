import { collection, getDocs } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";

import { db } from "../firebase";
import { RootStore } from "./rootStore";

export interface IUser {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

export class UsersStore {
  private _users: IUser[] = []
  private _rootStore: RootStore
  isLoading = false

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    this._fetchUsers()

    makeAutoObservable(this)
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

  get users() {
    return this._users.filter((user) => user.uid !== this._rootStore.authStore.user?.uid)
  }
}

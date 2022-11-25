import { collection, getDocs } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"

import { db } from "../firebase"
import { RootStore } from "./rootStore"

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
  //TODO : подписка на юзеров!
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  // private _fetchUsers = async () => {
  //   this.isLoading = true
  //   const querySnapshot = await getDocs(collection(db, "users"))

  //   runInAction(() => {
  //     querySnapshot.forEach((doc) => {
  //       const user = doc.data() as IUser
  //       this._users.push(user)
  //     })
  //     this.isLoading = false
  //   })
  // }

  firstRenderfetchUsers = async () => {
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

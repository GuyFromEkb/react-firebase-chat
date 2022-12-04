import { collection, getDocs, onSnapshot, query } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"
import { IUserDb } from "types/IFirebase"

import { db, usersCol } from "../firebase"
import { RootStore } from "./rootStore"

export class UsersStore {
  private _users: IUserDb[] = []
  private _rootStore: RootStore
  isLoading = false
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  subToFecthUser = () => {
    const querySnapshotUsers = query(usersCol)

    return onSnapshot(querySnapshotUsers, (querySnapshot) => {
      const buffUsers: IUserDb[] = []

      querySnapshot.forEach((doc) => {
        const user = doc.data()
        buffUsers.push(user)
      })

      runInAction(() => {
        this._users = buffUsers
      })
    })
  }

  firstRenderfetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))

    runInAction(() => {
      querySnapshot.forEach((doc) => {
        const user = doc.data() as IUserDb
        this._users.push(user)
      })
    })
  }

  get users() {
    return this._users.filter((user) => user.uid !== this._rootStore.authStore.user?.uid)
  }
}

import { User } from "firebase/auth"
import { getDocs, collection } from "firebase/firestore"
import { makeAutoObservable } from "mobx"
import { db } from "../firebase"

interface IUser {
  displayName: string
  email: string
  photoURL?: string
  uid: string
}

class UsersStore {
  users: IUser[] = []
  isLoading = false

  constructor() {
    makeAutoObservable(this)
    this._fetchUsers()
  }

  private _fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      this.users.push(doc.data() as IUser)
    })
  }
}
const usersStore = new UsersStore()

export { usersStore }

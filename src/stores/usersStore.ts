import { getDocs, collection } from "firebase/firestore"
import { makeAutoObservable, runInAction } from "mobx"
import { db } from "../firebase"

export interface IUser {
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
    
    runInAction(() => {
      querySnapshot.forEach((doc) => {
        this.users.push(doc.data() as IUser)
      })
    })
  }
}

const usersStore = new UsersStore()
export { usersStore }

import { AuthStore } from "./authStore"
import { UsersStore } from "./usersStore"

export class RootStore {
  authStore: AuthStore
  usersStore: UsersStore


  constructor() {
    this.authStore = new AuthStore()
    this.usersStore = new UsersStore(this)

  }
}
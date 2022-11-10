import { makeAutoObservable } from "mobx"
import { AuthStore } from "./authStore"
import { ChatStore } from "./chatStore"
import { UsersStore } from "./usersStore"

export class RootStore {
  authStore: AuthStore
  usersStore: UsersStore
  chatStore: ChatStore

  constructor() {
    this.authStore = new AuthStore()
    this.usersStore = new UsersStore(this)
    this.chatStore = new ChatStore(this)
    makeAutoObservable(this)
  }

  get currentUser() {
    return this.authStore.user
  }
}

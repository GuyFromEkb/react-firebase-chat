import { makeAutoObservable, runInAction, when } from "mobx"

import { AuthStore } from "./authStore"
import { ChatStore } from "./chatStore"
import { MessageStore } from "./messageStore"
import { ProfileStore } from "./profileStore"
import { UsersStore } from "./usersStore"

export class RootStore {
  authStore: AuthStore
  profileStore: ProfileStore
  usersStore: UsersStore
  chatStore: ChatStore
  messageStore: MessageStore
  firstRenderIsLoading = false

  constructor() {
    this.authStore = new AuthStore()
    this.profileStore = new ProfileStore(this)
    this.usersStore = new UsersStore(this)
    this.chatStore = new ChatStore(this)
    this.messageStore = new MessageStore(this)
    makeAutoObservable(this)

    this._firstRender()
  }

  get currentUser() {
    return this.authStore.user
  }

  get firstRenderLoading() {
    return this.authStore.isLoading || this.firstRenderIsLoading
  }

  private _firstRender = () => {
    this.authStore.firstRenderCheckAuth()

    when(
      () => !!this.authStore?.user,
      async () => {
        this.firstRenderIsLoading = true
        await Promise.all([
          this.chatStore.firstRenderfetchUsersChats(),
          this.usersStore.firstRenderfetchUsers(),
        ])
        runInAction(() => {
          this.firstRenderIsLoading = false
        })
      }
    )
  }
}

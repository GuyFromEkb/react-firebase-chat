import { makeAutoObservable } from "mobx";

import { AuthStore } from "./authStore";
import { ChatStore } from "./chatStore";
import { MessageStore } from "./messageStore";
import { UsersStore } from "./usersStore";

export class RootStore {
  authStore: AuthStore
  usersStore: UsersStore
  chatStore: ChatStore
  messageStore: MessageStore

  constructor() {
    this.authStore = new AuthStore()
    this.usersStore = new UsersStore(this)
    this.chatStore = new ChatStore(this)
    this.messageStore = new MessageStore(this)
    makeAutoObservable(this)
  }

  get currentUser() {
    return this.authStore.user
  }

  get firstRenderLoading() {
    // this.chatStore.isLoading
    return this.authStore.isLoading || this.usersStore.isLoading /*||  this.chatStore.isFirstLoad */
  }
}

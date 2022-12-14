import { makeAutoObservable } from "mobx"

import { ModalStateStore } from "./modalStateStore"
import { RootStore } from "./rootStore"

export class ProfileStore {
  private _rootStore: RootStore
  modal = new ModalStateStore()

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore
    makeAutoObservable(this)
  }

  get displayName() {
    return this._rootStore.authStore.user?.displayName!
  }

  get photoUrl() {
    return this._rootStore.authStore.user?.photoURL
  }
}

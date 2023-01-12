import { makeAutoObservable } from "mobx"

export class ModalStateStore {
  isOpen = false
  private onClose?: () => void

  constructor(onClose?: () => void) {
    makeAutoObservable(this)
    this.onClose = onClose
  }

  open = () => {
    this.isOpen = true
  }

  close = () => {
    this.isOpen = false
    this.onClose?.()
  }
}

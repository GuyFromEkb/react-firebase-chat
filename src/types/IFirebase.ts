export interface IUserChatDb {
  [chatId: string]: IUserChatInfoDb
}

export interface IFireBaseDate {
  seconds: number
  nanoseconds: number
}

export interface IUserChatInfoDb {
  date: IFireBaseDate
  recipient: {
    uid: string
  }
  lastMessage?: {
    senderId: string
    text: string
  }
}

export interface IUserDb {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

export interface IChatDb {
  [chatId: string]: {
    messages: IMessageDb[]
  }
}

export interface IMessageDb {
  senderId: string
  text: string
  id: string
  files: {
    img: string[]
  }
  date: IFireBaseDate
}

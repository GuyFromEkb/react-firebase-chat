import { IMessage } from "components/messageList/MessageList"

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

export interface IChatDB {
  messages: IMessage[]
}

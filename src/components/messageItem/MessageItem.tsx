import { FC } from "react"
import cn from "classnames"
import "./MessageItem.scss"
import { getDateAndTime } from "../../utils/formatDate/getDateAndTime"

interface IProps {
  isMyMessage: boolean
  avatarUrl: string
  text: string
  date: {
    seconds: number
    nanoseconds: number
  }
}

const MessageItem: FC<IProps> = ({ avatarUrl, isMyMessage, text, date }) => {
  const messageTime = getDateAndTime(date.seconds)
  return (
    <div className={cn("message-item", isMyMessage && "owner")}>
      <div className="message-item__info">
        <img src={avatarUrl} alt="avatar" />
        <span>{messageTime}</span>
      </div>
      <div className=" message-item__content ">
        <p>{text}</p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  )
}

export default MessageItem

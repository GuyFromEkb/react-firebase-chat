import { FC } from "react"
import cn from "classnames"
import "./MessageItem.scss"

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
  console.log("datavrema", date.seconds)

  // const dateProps = date.seconds as number
  // console.log("dateProps", dateProps)
  // const time = new Date(dateProps * 1000)
  const messageTime = new Date(date.seconds * 1000).toString()
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

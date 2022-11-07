import { FC, RefObject, useEffect } from "react"
import cn from "classnames"
import { getDateAndTime } from "../../utils/formatDate/getDateAndTime"
import "./MessageItem.scss"

interface IProps {
  isMyMessage: boolean
  avatarUrl?: string
  text: string
  date: {
    seconds: number
    nanoseconds: number
  }
  refLastMessage?: RefObject<HTMLDivElement>
}

const MessageItem: FC<IProps> = ({ avatarUrl, isMyMessage, text, date, refLastMessage }) => {
  useEffect(() => {
    if (refLastMessage) {
      refLastMessage.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [refLastMessage])

  const messageTime = getDateAndTime(date.seconds)
  return (
    <div ref={refLastMessage} className={cn("message-item", isMyMessage && "owner")}>
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

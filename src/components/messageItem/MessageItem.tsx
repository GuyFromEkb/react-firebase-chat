import "./MessageItem.scss";

import cn from "classnames";
import { FC, RefObject, useEffect } from "react";

import { getDateAndTime } from "../../utils/formatDate/getDateAndTime";

interface IProps {
  isMyMessage: boolean
  avatarUrl?: string
  text: string
  files: {
    img: string[]
  }
  date: {
    seconds: number
    nanoseconds: number
  }
  refLastMessage?: RefObject<HTMLDivElement>
}

const MessageItem: FC<IProps> = ({ avatarUrl, isMyMessage, text, date, refLastMessage, files }) => {
  useEffect(() => {
    if (refLastMessage) {
      refLastMessage.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [refLastMessage])

  const { messageFullDate, messageTime } = getDateAndTime(date.seconds)
  return (
    <div ref={refLastMessage} className={cn("message-item", isMyMessage && "owner")}>
      <div title={messageFullDate} className="message-item__info">
        <img src={avatarUrl} alt="avatar" />
        <span className="message-item__time">{messageTime}</span>
      </div>
      <div className="message-item__content ">
        {!!text && <p>{text}</p>}
        {!!files?.img.length && (
          <div className="message-item__img">
            {files.img.map((imgUrl, idx) => (
              <img key={idx} src={imgUrl} alt="attachment img" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageItem

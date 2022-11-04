import { FC } from "react"
import cn from "classnames"
import "./MessageItem.scss"

interface IProps {
  isMyMessage?: boolean
}

const MessageItem: FC<IProps> = ({ isMyMessage = false }) => {
  return (
    <div className={cn("message-item", isMyMessage && "owner")}>
      <div className="message-item__info">
        <img
          src={
            "https://avatars.mds.yandex.net/i?id=abf32680af07f995106870120035fe948f2aeebd-7012254-images-thumbs&n=13"
          }
          alt="avatar"
        />
        <span>just now</span>
      </div>
      <div className=" message-item__content ">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum dolores non molestiae
          dolorum et porro ipsum suscipit, distinctio numquam?
        </p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  )
}

export default MessageItem

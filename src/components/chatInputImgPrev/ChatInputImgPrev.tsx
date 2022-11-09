import { FC } from "react"
import "./ChatInputImgPrev.scss"

interface IProps {
  imgSrc: string
  remove?: () => void
}
const ChatInputImgPrev: FC<IProps> = ({ imgSrc, remove }) => {
  return (
    <div className="img-prev">
      <img src={imgSrc} alt="prev Img" />
      <span onClick={remove} className="img-prev__remove" />
    </div>
  )
}

export default ChatInputImgPrev

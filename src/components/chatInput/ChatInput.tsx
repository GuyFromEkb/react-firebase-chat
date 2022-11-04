import { FC, useState } from "react"
import ImgIcon from "../../assets/img/img.png"
import "./ChatInput.scss"

const ChatInput: FC = () => {
  const [text, setText] = useState("")
  const onSend = () => {
    console.log("send")
  }
  return (
    <div className="chat-input">
      <input
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="chat-input__send">
        <label>
          <input type="file" onChange={(e) => null} />
          <img src={ImgIcon} alt="Img Icon" />
        </label>
        <button onClick={onSend}>Send</button>
      </div>
    </div>
  )
}

export default ChatInput

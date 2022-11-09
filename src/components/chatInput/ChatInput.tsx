import { observer } from "mobx-react-lite"
import { FC, useEffect, useRef, useState } from "react"
import ImgIcon from "../../assets/img/img.png"
import { authStore } from "../../stores/authStore"
import { messageStore } from "../../stores/messageStore"
import { readAllFilesAsUrl } from "../../utils/fileReader/prevImgs"
import ChatInputImgPrev from "../chatInputImgPrev/ChatInputImgPrev"
import "./ChatInput.scss"

export interface IPervImg {
  name: string
  url: string
}
const ChatInput: FC = () => {
  const { postMessage } = messageStore
  const { user } = authStore

  const refInputFile = useRef<HTMLInputElement>(null)
  const [text, setText] = useState("")
  const [imgs, setImgs] = useState<File[]>([])
  const [prevImg, setPrevImg] = useState<IPervImg[]>([])

  const onSend = () => {
    console.log("send")
    postMessage(text, user!)
  }

  const handleAddImgs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const imgUrlArr = await readAllFilesAsUrl(e.target.files)
    setImgs([...e.target.files])
    setPrevImg(imgUrlArr)
  }

  const handleRemoveImg = (fileName: string) => () => {
    setPrevImg((prevState) => prevState.filter((img) => img.name !== fileName))
    setImgs((prevState) => prevState.filter((file) => file.name !== fileName))

    if (refInputFile.current?.files) {
      const dt = new DataTransfer()

      for (const key in refInputFile.current.files) {
        const element = refInputFile.current.files[key]
        if (
          Object.prototype.hasOwnProperty.call(refInputFile.current.files, key) &&
          element.name !== fileName
        ) {
          dt.items.add(element)
        }
      }

      refInputFile.current.files = dt.files
    }
  }

  return (
    <div className="chat-input">
      {!!prevImg.length && (
        <div className="chat-input__imgs">
          {prevImg.map((img) => (
            <ChatInputImgPrev key={img.name} remove={handleRemoveImg(img.name)} imgSrc={img.url} />
          ))}
        </div>
      )}
      <div className="chat-input__wrap">
        <input
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="chat-input__send">
          <label>
            <input
              ref={refInputFile}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddImgs}
            />
            <img src={ImgIcon} alt="Img Icon" />
          </label>
          <button onClick={onSend}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default observer(ChatInput)

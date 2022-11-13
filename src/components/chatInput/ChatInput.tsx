import { observer } from "mobx-react-lite"
import { FC, useRef, useState } from "react"
import ImgIcon from "../../assets/img/img.png"
import { useStore } from "../../hooks/useStore"
import { clearInputFileList } from "../../utils/chatInput/clearInputFileList"
import { readAllFilesAsUrl } from "../../utils/chatInput/readAllFilesAsUrl"
import ChatInputImgPrev from "../chatInputImgPrev/ChatInputImgPrev"
import "./ChatInput.scss"

export interface IPervImg {
  name: string
  url: string
}

const ChatInput: FC = () => {
  const { messageStore } = useStore()
  const { postMessage, updateLastMessageInChats, isLoading } = messageStore

  const refInputFile = useRef<HTMLInputElement>(null)
  const [text, setText] = useState("")
  const [fileImgs, setFileImgs] = useState<File[]>([])
  const [prevImg, setPrevImg] = useState<IPervImg[]>([])

  const onSend = async () => {
    if (!(text || fileImgs.length)) {
      return
    }

    await postMessage(text, fileImgs)

    setText("")
    setFileImgs([])
    setPrevImg([])
    if (refInputFile.current) refInputFile.current.value = ""

    !!fileImgs.length ? await updateLastMessageInChats(text) : updateLastMessageInChats(text)
  }

  const handleAddImgs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const imgUrlArr = await readAllFilesAsUrl(e.target.files)
    setFileImgs([...e.target.files])
    setPrevImg(imgUrlArr)
  }

  const handleRemoveImg = (fileName: string) => () => {
    setPrevImg((prevState) => prevState.filter((img) => img.name !== fileName))
    setFileImgs((prevState) => prevState.filter((file) => file.name !== fileName))

    clearInputFileList(refInputFile.current, fileName)
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
          <button onClick={onSend}>{isLoading.files ? "Loading" : "Send"}</button>
        </div>
      </div>
    </div>
  )
}

export default observer(ChatInput)

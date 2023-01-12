import "./ChatInput.scss"

import emptyAvatarIcon from "assets/img/img.png"
import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { clearInputFileList } from "utils/chatInput/clearInputFileList"
import { readAllFilesAsUrl } from "utils/chatInput/readAllFilesAsUrl"

import ChatInputImgPrev from "components/chatInputImgPrev/ChatInputImgPrev"

export interface IPervImg {
  name: string
  url: string
}

const ChatInput: FC = () => {
  const {
    messageStore: { postMessage, updateLastMessageInChats, isLoading },
  } = useStore()

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

  const handleKeyInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.ctrlKey && e.key === "Enter" && onSend()
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
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyInput}
          placeholder="Type something..."
          maxRows={4}
          className="chat-input__text-area"
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
            <img src={emptyAvatarIcon} alt="Img Icon" />
          </label>
          <button onClick={onSend}>{isLoading.files ? "Loading" : "Send"}</button>
        </div>
      </div>
    </div>
  )
}

export default observer(ChatInput)

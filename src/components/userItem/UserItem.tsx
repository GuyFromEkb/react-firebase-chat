import "./UserItem.scss"

import { FC, SyntheticEvent } from "react"
import errorImgSrc from "../../assets/img/emptyAvatar.png"

interface IUserItem {
  displayName: string
  photoUrl?: string
  onCreateChat: () => void
}

const UserItem: FC<IUserItem> = ({ displayName, photoUrl, onCreateChat }) => {
  return (
    <div onClick={onCreateChat} className="user-item">
      <img
        src={"http://semeynaya-kuchka.ru/wp-content/uploads/2019/07/milye-kotiki-26111111111.jpg"}
        alt="avatar"
        onError={handleImgError}
      />
      <div>{displayName}</div>
    </div>
  )
}

export default UserItem

const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = errorImgSrc
  e.currentTarget.onerror = null
}

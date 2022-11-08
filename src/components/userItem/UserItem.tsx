import { FC } from "react"
import "./UserItem.scss"

interface IUserItem {
  displayName: string
  photoUrl?: string
  onCreateChat: () => void
}

const UserItem: FC<IUserItem> = ({ displayName, photoUrl, onCreateChat }) => {
  return (
    <div onClick={onCreateChat} className="user-item">
      <img src={photoUrl ? photoUrl : ""} alt={`${displayName} avatar`} />
      <div>{displayName}</div>
    </div>
  )
}

export default UserItem

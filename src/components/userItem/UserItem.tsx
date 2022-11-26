import "./UserItem.scss";

import { FC } from "react";

import Avatar from "../avatar/Avatar";

interface IUserItem {
  displayName: string
  photoUrl?: string
  onCreateChat: () => void
}

const UserItem: FC<IUserItem> = ({ displayName, photoUrl, onCreateChat }) => {
  return (
    <div onClick={onCreateChat} className="user-item">
      <Avatar photoUrl={photoUrl} />
      <div>{displayName}</div>
    </div>
  )
}

export default UserItem

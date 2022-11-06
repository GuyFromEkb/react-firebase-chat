import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { db } from "../../firebase"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
import { IUser, usersStore } from "../../stores/usersStore"
import UserItem from "../userItem/UserItem"
import "./UserList.scss"
// ts!

const UserList: FC = () => {
  const { users } = usersStore
  const { createChat } = chatStore
  const { user: currentUser } = authStore

  const handleClick = (user: IUser) => () => {
    createChat(user, currentUser)
  }

  return (
    <>
      <h5>users:</h5>
      <div className="user-list">
        {users.map((user) => (
          <UserItem
            onCreateChat={handleClick(user)}
            key={user.uid}
            photoUrl={user.photoURL}
            displayName={user.displayName}
          />
        ))}
      </div>
    </>
  )
}

export default observer(UserList)

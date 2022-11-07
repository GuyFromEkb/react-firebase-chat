import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
import { IUser, usersStore } from "../../stores/usersStore"
import UserItem from "../userItem/UserItem"
import "./UserList.scss"
// ts!

const UserList: FC = () => {
  const { users, setCurrentUser } = usersStore
  const { createChat } = chatStore
  const { user: currentUser } = authStore

  const handleClick = (user: IUser) => () => {
    createChat(user, currentUser)
  }

  useEffect(() => {
    setCurrentUser(currentUser)
  }, [currentUser, setCurrentUser])

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

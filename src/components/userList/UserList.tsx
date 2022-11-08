import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { authStore } from "../../stores/authStore"
import { chatStore } from "../../stores/chatStore"
import { IUser, usersStore } from "../../stores/usersStore"
import Accordion from "../accordion/Accordion"
import UserItem from "../userItem/UserItem"
import "./UserList.scss"

const UserList: FC = () => {
  const { user: currentUser } = authStore
  const { users, setCurrentUser } = usersStore
  const { createChat } = chatStore

  const handleClick = (user: IUser) => () => {
    createChat(user, currentUser)
  }

  useEffect(() => {
    setCurrentUser(currentUser)
  }, [currentUser, setCurrentUser])

  return (
    <>
      <Accordion title="Show all users" isOpenTitle="Hide all users">
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
      </Accordion>
    </>
  )
}

export default observer(UserList)

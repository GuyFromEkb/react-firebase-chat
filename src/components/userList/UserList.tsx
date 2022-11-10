import { observer } from "mobx-react-lite"
import { FC } from "react"
import { IUser } from "../../stores/usersStore"
import Accordion from "../accordion/Accordion"
import UserItem from "../userItem/UserItem"
import "./UserList.scss"
import { useStore } from "../../hooks/useStore"

const UserList: FC = () => {
  const { usersStore, chatStore } = useStore()
  const { users } = usersStore
  const { createChat } = chatStore

  const handleClick = (user: IUser) => () => {
    createChat(user)
  }

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

import "./UserList.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { IUser } from "stores/usersStore"

import Accordion from "components/accordion/Accordion"
import UserItem from "components/userItem/UserItem"

const UserList: FC = () => {
  const {
    usersStore: { users },
    chatStore: { createChat },
  } = useStore()

  const handleClick = (user: IUser) => () => {
    createChat(user)
  }

  return (
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
  )
}

export default observer(UserList)

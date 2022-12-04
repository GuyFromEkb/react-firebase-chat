import "./UserList.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { IUserDb } from "types/IFirebase"

import Accordion from "components/accordion/Accordion"
import UserItem from "components/userItem/UserItem"

const UserList: FC = () => {
  const { usersStore, chatStore } = useStore()
  const { users, subToFecthUser } = usersStore
  const { createChat } = chatStore

  useEffect(() => {
    const unsub = subToFecthUser()

    return () => {
      unsub()
    }
  }, [subToFecthUser])

  const handleClick = (user: IUserDb) => () => {
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

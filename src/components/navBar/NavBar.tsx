import "./NavBar.scss"

import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"

import Avatar from "components/avatar/Avatar"
import ModalProfileSetting from "components/modal/Modal"

const NavBar: FC = () => {
  const {
    authStore: { logOut, user },
    profileStore: {
      modal: { open },
    },
  } = useStore()

  return (
    <>
      <div className="navbar">
        <div className="navbar__profile-wrap">
          <Avatar className="navbar__avatar" photoUrl={user?.photoURL} />
          <div>{user?.displayName}</div>
        </div>
        <button onClick={open}>test</button>
        <button onClick={logOut} className="navbar__logout">
          Logout
        </button>
      </div>

      <ModalProfileSetting />
    </>
  )
}

export default observer(NavBar)

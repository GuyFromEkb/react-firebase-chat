import "./NavBar.scss"

import { useStore } from "hooks/useStore"
import { FC, useState } from "react"

import Avatar from "components/avatar/Avatar"
import ModalProfileSetting from "components/modal/Modal"

const NavBar: FC = () => {
  const { authStore } = useStore()
  const { logOut, user } = authStore
  const [edditProfileModal, setEdditProfileModal] = useState(false)
  return (
    <>
      <div className="navbar">
        <div className="navbar__profile-wrap">
          <Avatar className="navbar__avatar" photoUrl={user?.photoURL} />
          <div>{user?.displayName}</div>
        </div>
        <button onClick={() => setEdditProfileModal(!edditProfileModal)}>test</button>
        <button onClick={logOut} className="navbar__logout">
          Logout
        </button>
      </div>

      <ModalProfileSetting
        isShow={edditProfileModal}
        onClose={() => setEdditProfileModal(!edditProfileModal)}
      />
    </>
  )
}

export default NavBar

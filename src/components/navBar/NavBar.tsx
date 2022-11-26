import "./NavBar.scss";

import { FC } from "react";

import { useStore } from "../../hooks/useStore";
import Avatar from "../avatar/Avatar";

const NavBar: FC = () => {
  const { authStore } = useStore()
  const { logOut, user } = authStore
  return (
    <div className="navbar">
      <div className="navbar__profile-wrap">
        <Avatar className="navbar__avatar" photoUrl={user?.photoURL} />
        <div>{user?.displayName}</div>
      </div>
      <button onClick={logOut} className="navbar__logout">
        Logout
      </button>
    </div>
  )
}

export default NavBar

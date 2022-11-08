import { FC } from "react"
import { authStore } from "../../stores/authStore"
import "./NavBar.scss"

const NavBar: FC = () => {
  const { logOut, user } = authStore
  return (
    <div className="navbar">
      <div className="navbar__profile-wrap">
        <img src={user?.photoURL ? user?.photoURL : ""} alt="avatar" />
        <div>{user?.displayName}</div>
      </div>
      <button onClick={logOut} className="navbar__logout">
        Logout
      </button>
    </div>
  )
}

export default NavBar

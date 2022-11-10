import { FC } from "react"
import { rootStore } from "../../stores/rootStore"
import "./NavBar.scss"

const NavBar: FC = () => {
  const { logOut, user } = rootStore.authStore
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

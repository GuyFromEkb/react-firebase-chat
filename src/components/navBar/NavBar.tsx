import { FC } from "react";

import "./NavBar.scss";

const NavBar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">React Chat</div>
      <div className="navbar__right-side">
        <div className="navbar__profile-wrap">
          <img
            src="https://avatars.mds.yandex.net/i?id=6cefb0f4ad555f4d38d3f4fdb266c5d0f178df88-5441329-images-thumbs&n=13"
            alt="avatar"
          />
          <div>John</div>
        </div>
        <button className="navbar__logout">Logout</button>
      </div>
    </div>
  );
};

export default NavBar;

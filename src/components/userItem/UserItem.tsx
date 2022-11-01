import { FC } from "react";
import "./UserItem.scss";

const UserItem: FC = () => {
  return (
    <div className="user-item">
      <img src="https://s1.1zoom.me/big3/168/Cats_Cosmonauts_Uniform_473764.jpg" alt="userAvatar" />
      <div>Jane</div>
    </div>
  );
};

export default UserItem;

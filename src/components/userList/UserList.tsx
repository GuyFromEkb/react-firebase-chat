import { FC } from "react";
import UserItem from "../userItem/UserItem";

import "./UserList.scss";

const UserList: FC = () => {
  return (
    <div className="user-list">
      <UserItem />
      <UserItem />
      <UserItem />
    </div>
  );
};

export default UserList;

import "./ChatEmptyList.scss";

import { FC } from "react";

interface IProps {
  isLoadingCreateNewChat: boolean
}

const ChatEmptyList: FC<IProps> = ({ isLoadingCreateNewChat }) => {
  return (
    <div className="empty-list">
      {!isLoadingCreateNewChat && "Choose who you would like to write"}
    </div>
  )
}

export default ChatEmptyList

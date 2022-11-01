import { FC } from "react";
import MessageItem from "../messageItem/MessageItem";
import "./MessageList.scss";

const MessageList: FC = () => {
  return (
    <div className="message-list">
      <MessageItem />
      <MessageItem isMyMessage />
      <MessageItem />
      <MessageItem />
      <MessageItem isMyMessage />
    </div>
  );
};

export default MessageList;

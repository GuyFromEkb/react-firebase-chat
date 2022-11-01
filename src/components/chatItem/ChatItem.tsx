import { FC } from "react";
import "./ChatItem.scss";

const ChatItem: FC = () => {
  return (
    <div className="chat-item">
      <img
        src="https://catherineasquithgallery.com/uploads/posts/2021-02/1612275766_173-p-kot-na-fioletovom-fone-206.jpg"
        alt="userAvatar"
      />
      <div className="chat-item__right-side">
        <div className="chat-item__name">Tom</div>
        <div className="chat-item__last-message">Ok see you Ok see you Ok see you Ok see you</div>
      </div>
    </div>
  );
};

export default ChatItem;

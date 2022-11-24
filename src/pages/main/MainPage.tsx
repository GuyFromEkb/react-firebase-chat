import "./MainPage.scss";

import { FC } from "react";

import Chat from "../../components/chat/Chat";
import SideBar from "../../components/sideBar/SideBar";

const MainPage: FC = () => {
  return (
    <main className="main">
      <div className="container">
        <SideBar />
        <Chat />
      </div>
    </main>
  )
}

export default MainPage

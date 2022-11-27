import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "../../pages/login/LoginPage";
import MainPage from "../../pages/main/MainPage";
import RegisterPage from "../../pages/register/RegisterPage";
import ProtectedRouteV2 from "../protectedRoute/ProtectedRouteV2";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRouteV2 outlet={<MainPage />} />} />
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default observer(App)

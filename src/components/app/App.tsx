import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main/MainPage";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import "./App.scss";
import { observer } from "mobx-react-lite";
import { authStore } from "../../stores/authStore";
import ProtectedRouteV2 from "../protectedRoute/ProtectedRouteV2";

const App: FC = () => {
  const { user, isLoading } = authStore;

  if (isLoading) return <>LOADING</>;

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRouteV2 user={user} outlet={<MainPage />} />} />
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default observer(App);

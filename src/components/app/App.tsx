import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main/MainPage";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";

import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

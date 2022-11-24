import "./style/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";
import { RootStoreContext } from "./hooks/useStore";
import { RootStore } from "./stores/rootStore";

const rootStore = new RootStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootStoreContext.Provider>
)

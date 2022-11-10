import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.scss"
import App from "./components/app/App"
import { BrowserRouter } from "react-router-dom"
import { RootStoreContext } from "./hooks/useStore"
import { RootStore } from "./stores/rootStore"

const rootStore = new RootStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootStoreContext.Provider>
)

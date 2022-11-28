import "style/index.scss"

import { RootStoreContext } from "hooks/useStore"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { RootStore } from "stores/rootStore"

import App from "components/app/App"

const rootStore = new RootStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootStoreContext.Provider>
)

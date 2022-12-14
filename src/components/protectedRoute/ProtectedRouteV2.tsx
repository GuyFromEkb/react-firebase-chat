import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"

import Loader from "components/loader/Loader"

interface IProtectedRoute {
  outlet: JSX.Element
}

export const ProtectedRouteV2: FC<IProtectedRoute> = ({ outlet }) => {
  const { authStore, firstRenderLoading } = useStore()
  const { user } = authStore

  if (firstRenderLoading) {
    return <Loader />
  }

  if (user) {
    return outlet
  }

  return <Navigate to="/login" />
}

export default observer(ProtectedRouteV2)

/* 
###
Old Version, from docs
###

interface IProtectedRoute {
  user: User | null;
  outlet: JSX.Element;
}

export const ProtectedRouteV2: FC<IProtectedRoute> = ({ user, outlet }) => {
  if (user) {
    return outlet;
  }

  return <Navigate to="/login" />;
};
*/

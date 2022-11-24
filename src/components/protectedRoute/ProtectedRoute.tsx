import { User } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  user: User | null
  children: React.ReactNode
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default observer(ProtectedRoute)
